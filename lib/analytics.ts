export const GA_MEASUREMENT_ID = 'G-SW8R2C0VPT';
export const CONSENT_KEY = 'technatonix_analytics_consent';

type AnalyticsEvent =
  | 'page_view' | 'cta_click' | 'ai_automation_cta_click'
  | 'contact_form_start' | 'contact_form_submit' | 'contact_form_success'
  | 'quote_form_start' | 'quote_form_submit' | 'quote_form_success'
  | 'automation_project_enquiry' | 'product_demo_request' | 'product_enquiry';

type AnalyticsParameters = {
  page_location?: string;
  page_path?: string;
  page_title?: string;
  page_referrer?: string;
  button_name?: string;
  button_location?: string;
  service_category?: string;
};

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    technatonixAnalyticsInitialized?: boolean;
    technatonixPendingAnalytics?: Array<[AnalyticsEvent, AnalyticsParameters]>;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'] as const;

export function analyticsLocation(path: string): { page_location: string; page_path: string } {
  const url = new URL(path, window.location.origin);
  const safePath = /^\/(?:[a-z0-9_-]+\/?)*$/i.test(url.pathname) &&
    !/\d{7,}/.test(url.pathname) ? url.pathname : '/';
  const query = new URLSearchParams();
  for (const key of campaignKeys) {
    const value = url.searchParams.get(key);
    if (value && /^[a-z0-9_-]{1,80}$/i.test(value) && !/\d{7,}/.test(value)) query.set(key, value);
  }
  const pagePath = safePath + (query.size ? `?${query}` : '');
  return { page_path: safePath, page_location: window.location.origin + pagePath };
}

export function analyticsEvent(name: AnalyticsEvent, parameters: AnalyticsParameters = {}): void {
  if (typeof window === 'undefined' || window[`ga-disable-${GA_MEASUREMENT_ID}`] || /^\/admin(?:\/|$)/.test(window.location.pathname)) return;
  if (!window.gtag) {
    try {
      if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
        (window.technatonixPendingAnalytics ||= []).push([name, parameters]);
      }
    } catch (error) {
      console.error('Unable to read analytics preferences:', error);
    }
    return;
  }
  window.gtag('event', name, parameters);
}

export function analyticsPageView(path: string, previous?: string): void {
  const location = analyticsLocation(path);
  const referrer = previous
    ? analyticsLocation(previous).page_location.split('?')[0]
    : document.referrer ? new URL(document.referrer).origin + '/' : undefined;
  analyticsEvent('page_view', {
    ...location,
    page_title: 'The Technatonix',
    ...(referrer ? { page_referrer: referrer } : {}),
  });
}
