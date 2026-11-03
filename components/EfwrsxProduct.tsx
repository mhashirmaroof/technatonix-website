import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Products.module.scss';
import {
  FaPlay,
  FaCheckCircle,
  FaCamera,
  FaClipboardCheck,
  FaFilePdf,
  FaShareAlt,
  FaWifi,
  FaShieldAlt,
  FaMobileAlt,
  FaUsers,
} from 'react-icons/fa';

const benefits = [
  { icon: FaCamera, title: 'Evidence Capture', text: 'Capture photos, checklist answers and notes on site, right from your phone.' },
  { icon: FaClipboardCheck, title: 'Required-Evidence Validation', text: 'Checklists make sure the required evidence is present before a job can be completed.' },
  { icon: FaFilePdf, title: 'Branded PDF Reports', text: 'Generate a customer-ready PDF report with your own branding.' },
  { icon: FaShareAlt, title: 'Secure Share Links', text: 'Share an expiring, revocable web link so customers can view the report.' },
  { icon: FaWifi, title: 'Offline-First', text: 'Keep working without signal. Drafts are saved locally and synced safely when you are back online.' },
  { icon: FaShieldAlt, title: 'Tenant Isolation', text: 'Every account is isolated on the server from day one, with private storage for evidence.' },
];

const roadmap = [
  {
    name: 'V1.0 — Solo-First',
    description: 'Fast onboarding and self-service for individual service professionals.',
    features: [
      'Email, Google and Apple sign-up',
      '5 prebuilt industry templates',
      'Quick-report flow built for speed',
      'Offline drafts with safe sync',
      'Background PDF rendering',
      'Expiring share links',
    ],
  },
  {
    name: 'V2.0 — Teams & Enterprise',
    description: 'Coordination and oversight for growing field teams.',
    features: [
      'Roles and permissions',
      'Invitations and team management',
      'Customer and site directory with CSV import/export',
      'Visual template builder with versioning',
      'Review and approval queue',
      'Audit trail, webhooks and API',
    ],
  },
];

const audiences = ['Cleaners', 'Handymen', 'Mobile Detailers', 'Airbnb Turnover', 'HVAC', 'Plumbing'];

const EfwrsxProduct: React.FC = () => (
  <>
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>EFWRSX Cloud</h1>
            <p className={styles.subtitle}>Electronic Field Work Reporting System eXchange</p>
            <p className={styles.description}>
              A mobile-first field evidence and job-completion reporting platform. Contractors
              capture photos, checklist answers and notes on site, validate that the required
              evidence is present, and generate a branded PDF report plus a secure, expiring web
              link for the customer.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className="btn-primary">
                <FaPlay /> Join the Early Access List
              </Link>
            </div>
            <span className={styles.statusBadge}>In planning &amp; design</span>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.productPreview}>
              <div className={styles.platformList}>
                <FaMobileAlt className={styles.benefitIcon} />
                <h3>iOS · Android · Web/PWA</h3>
                <p>Built to be used on the job site, on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.benefits}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Why EFWRSX Cloud?</h2>
          <p>
            Field evidence is often scattered across personal phones, messages, email and paper.
            EFWRSX brings it into one focused workflow that produces a consistent report.
          </p>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className={styles.benefitCard}>
              <Icon className={styles.benefitIcon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.modules}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Product Roadmap</h2>
          <p>Starting with solo operators, growing into team and enterprise workflows</p>
        </div>
        <div className={styles.modulesGrid}>
          {roadmap.map((phase) => (
            <div key={phase.name} className={styles.moduleCard}>
              <h3>{phase.name}</h3>
              <p>{phase.description}</p>
              <ul className={styles.featureList}>
                {phase.features.map((feature) => (
                  <li key={feature}>
                    <FaCheckCircle className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.benefits}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Built For Service Professionals</h2>
          <p>Solo operators first, then small teams of roughly 2–20+ workers</p>
        </div>
        <div className={styles.audienceList}>
          {audiences.map((a) => (
            <span key={a} className={styles.audienceChip}>
              <FaUsers /> {a}
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Want to Shape EFWRSX Cloud?</h2>
          <p>
            EFWRSX is currently in the planning and design stage. Get in touch to share your
            workflow, give feedback, or be among the first to try it.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default EfwrsxProduct;
