import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { analyticsEvent, analyticsLocation, analyticsPageView, CONSENT_KEY, GA_MEASUREMENT_ID } from '@/lib/analytics';
import { regionalAnalyticsRules } from '@/lib/analytics-consent';
import styles from './Analytics.module.scss';

type Consent = 'accepted' | 'rejected' | null;
type RegionPolicy = { analyticsStorage: 'denied' | 'granted'; prompt: boolean };
const conservativePolicy: RegionPolicy = { analyticsStorage: 'denied', prompt: true };
const isPrivate = (path: string) => /^\/admin(?:[/?#]|$)/.test(path);

export default function Analytics() {
  const router = useRouter();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [regionPolicy, setRegionPolicy] = useState<RegionPolicy>(conservativePolicy);
  const previous = useRef<string>();
  const consentPageTracked = useRef(false);
  const allowed = consent === 'accepted' || (consent === null && regionPolicy.analyticsStorage === 'granted');

  useEffect(() => {
    const controller = new AbortController();
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      setConsent(stored === 'accepted' || stored === 'rejected' ? stored : null);
    } catch (error) {
      console.error('Unable to read analytics preferences:', error);
    }
    async function loadRegionPolicy() {
      try {
        const response = await fetch('/api/analytics-consent', { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error(`Analytics region lookup failed: ${response.status}`);
        const policy: unknown = await response.json();
        if (!policy || typeof policy !== 'object' || !('analyticsStorage' in policy) || !('prompt' in policy) ||
            (policy.analyticsStorage !== 'denied' && policy.analyticsStorage !== 'granted') ||
            typeof policy.prompt !== 'boolean') {
          throw new Error('Invalid analytics region policy');
        }
        setRegionPolicy({ analyticsStorage: policy.analyticsStorage, prompt: policy.prompt });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Unable to determine analytics region; analytics defaults to denied:', error);
      }
      if (!controller.signal.aborted) setReady(true);
    }
    void loadRegionPolicy();
    const open = () => setShowPreferences(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      const value = event.newValue === 'accepted' || event.newValue === 'rejected' ? event.newValue : null;
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = value !== 'accepted';
      window.gtag?.('consent', 'update', { analytics_storage: value === 'accepted' ? 'granted' : 'denied' });
      setConsent(value);
    };
    window.addEventListener('open-analytics-preferences', open);
    window.addEventListener('storage', sync);
    return () => {
      controller.abort();
      window.removeEventListener('open-analytics-preferences', open);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    if (!ready || !router.isReady) return;
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = !allowed || isPrivate(router.asPath);
    if (!allowed) { consentPageTracked.current = false; return; }
    if (isPrivate(router.asPath)) return;

    if (!window.technatonixAnalyticsInitialized) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer?.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      for (const rule of regionalAnalyticsRules) {
        window.gtag('consent', 'default', {
          region: [rule.region],
          analytics_storage: rule.analyticsStorage,
        });
      }
      if (consent === 'accepted') window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('set', {
        send_page_view: false,
        ...analyticsLocation(router.asPath),
        page_title: 'The Technatonix',
        page_referrer: document.referrer ? new URL(document.referrer).origin + '/' : '',
      });
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
        ...analyticsLocation(router.asPath),
        page_title: 'The Technatonix',
        page_referrer: document.referrer ? new URL(document.referrer).origin + '/' : '',
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      window.technatonixAnalyticsInitialized = true;
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.onerror = () => console.error('Google Analytics script failed to load.');
      document.head.appendChild(script);
    }
    if (!consentPageTracked.current) {
      analyticsPageView(router.asPath);
      for (const [name, parameters] of window.technatonixPendingAnalytics || []) analyticsEvent(name, parameters);
      window.technatonixPendingAnalytics = [];
      previous.current = router.asPath;
      consentPageTracked.current = true;
    }
  }, [allowed, consent, ready, router.isReady, router.asPath]);

  useEffect(() => {
    if (!ready || !allowed) return;
    const start = (url: string) => { if (isPrivate(url)) window[`ga-disable-${GA_MEASUREMENT_ID}`] = true; };
    const complete = (url: string) => {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = isPrivate(url);
      if (!isPrivate(url) && window.technatonixAnalyticsInitialized) {
        window.gtag?.('set', {
          ...analyticsLocation(url),
          page_title: 'The Technatonix',
          page_referrer: previous.current ? analyticsLocation(previous.current).page_location.split('?')[0] : '',
        });
        window.gtag?.('config', GA_MEASUREMENT_ID, { send_page_view: false, ...analyticsLocation(url), page_title: 'The Technatonix' });
        analyticsPageView(url, previous.current);
      }
      previous.current = isPrivate(url) ? undefined : url;
    };
    const error = () => { window[`ga-disable-${GA_MEASUREMENT_ID}`] = isPrivate(router.asPath); };
    const lastClick = new WeakMap<HTMLElement, number>();
    const click = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-analytics-cta]') : null;
      if (!element || isPrivate(router.asPath)) return;
      const now = Date.now();
      if (now - (lastClick.get(element) || 0) < 800) return;
      lastClick.set(element, now);
      const name = element.dataset.analyticsCta;
      const location = element.dataset.analyticsLocation;
      const category = element.dataset.analyticsCategory;
      if (!name || !location) return;
      const params = { ...analyticsLocation(router.asPath), button_name: name, button_location: location, ...(category ? { service_category: category } : {}) };
      analyticsEvent('cta_click', params);
      if (category === 'ai_automation' && name === 'Discuss an Automation Project') analyticsEvent('ai_automation_cta_click', params);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', complete);
    router.events.on('routeChangeError', error);
    document.addEventListener('click', click, true);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', complete);
      router.events.off('routeChangeError', error);
      document.removeEventListener('click', click, true);
    };
  }, [allowed, ready, router]);

  const choose = (choice: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch (error) {
      console.error('Unable to save analytics preferences:', error);
    }
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = choice !== 'accepted';
    window.gtag?.('consent', 'update', { analytics_storage: choice === 'accepted' ? 'granted' : 'denied' });
    if (choice === 'rejected') {
      window.technatonixPendingAnalytics = [];
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (name === '_ga' || name.startsWith('_ga_')) {
          for (const domain of ['', '; domain=.technatonix.com', '; domain=www.technatonix.com']) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
          }
        }
      }
    }
    setConsent(choice);
    setShowPreferences(false);
  };

  if (!ready || (!showPreferences && !(consent === null && regionPolicy.prompt)) || isPrivate(router.asPath)) return null;
  return (
    <aside className={styles.banner} aria-label="Analytics cookie preferences">
      <div>
        <h2>Analytics preferences</h2>
        <p>With your permission, we use Google Analytics to understand how our website is used. You can change your choice at any time. See our <Link href="/cookies">cookie policy</Link>.</p>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose('rejected')}>Reject analytics</button>
        <button type="button" onClick={() => choose('accepted')}>Accept analytics</button>
      </div>
    </aside>
  );
}
