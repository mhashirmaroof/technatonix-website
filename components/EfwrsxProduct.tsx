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
  FaBriefcase,
  FaListAlt,
  FaCommentDots,
  FaBell,
  FaRocket,
} from 'react-icons/fa';

const benefits = [
  { icon: FaCamera, title: 'Evidence Capture', text: 'Capture photos with the camera or gallery, add checklist answers, notes and dictated notes, with device-reported capture time kept.' },
  { icon: FaClipboardCheck, title: 'Required-Evidence Validation', text: 'An evidence gate flags missing checklist items or photos before submission, and the server validates the requirements again.' },
  { icon: FaFilePdf, title: 'Branded PDF Reports', text: 'Generate a PDF with your logo, accent colour and sign-off text, plus job details, checklist results, notes and photos.' },
  { icon: FaShareAlt, title: 'Secure Share Links', text: 'Share a report through a public link that expires after 1–90 days and can be revoked at any time.' },
  { icon: FaWifi, title: 'Offline Drafts & Sync', text: 'Save report drafts and photos locally. A sync queue retries safely and shows Saved Locally, Syncing, Synced or Action Required.' },
  { icon: FaShieldAlt, title: 'Secure by Design', text: 'Per-account data isolation, backend authorization on protected records, and hashed, expiring, revocable invitation tokens.' },
  { icon: FaUsers, title: 'Client–Worker Connections', text: 'Connect by email invitation or personal code, with a separate text conversation for each active connection.' },
  { icon: FaBriefcase, title: 'Jobs & Proposals', text: 'Clients create work requests and invite a worker. Proposals can be revised, accepted or rejected, and acceptance assigns the worker.' },
  { icon: FaListAlt, title: 'Report Templates', text: 'Five built-in industry templates plus private custom templates with 0–50 minimum photos and up to 50 required or optional steps.' },
  { icon: FaCommentDots, title: 'Messaging', text: 'Text conversations for job invitations, active jobs and connections, with unread badges. Completed jobs become read-only.' },
  { icon: FaBell, title: 'In-App Notifications', text: 'A notification bell covers invitations, proposals, status changes, report reviews and incoming messages, with optional sound.' },
  { icon: FaCheckCircle, title: 'Review & Completion', text: 'Clients review the report, request changes or acknowledge it, and then separately complete the job.' },
];

const currentFeatures = [
  'Email and password accounts with email verification and password reset',
  'Separate client and worker dashboards, with light, dark and system themes',
  'Client–worker connections by email invitation or connection code',
  'Work requests with templates, expiring invitation links and worker assignment',
  'Proposals with revision history, acceptance and assignment',
  '5 built-in industry templates and private custom templates',
  'Photo and checklist evidence capture with a required-evidence gate',
  'Offline drafts with a persistent, retrying sync queue',
  'Signed photo uploads with size and checksum verification',
  'Background branded PDF generation with preview, download and sharing',
  'Expiring, revocable public report links',
  'Worker branding: logo, accent colour and sign-off text',
];

const futureGoals = [
  'Organizations, employee hierarchies, roles and permissions',
  'Multi-worker jobs, team scheduling and manager-controlled assignment',
  'Customer and site directory with CSV import and export',
  'Visual template builder with conditional requirements, sharing and versioning',
  'Manager review queue with approval rules and correction requests',
  'Faster updates, push notifications and optional SMS invitations',
  'Customer report portal with acknowledgements, signatures or ratings',
  'Multi-factor authentication, audit interface and configurable data retention',
  'Webhooks, external API access, reporting and analytics',
  'Cloud storage and a durable background job queue',
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
              <Link href="/contact?inquiry=product-efwrsx" className="btn-primary" data-analytics-cta="Join the Early Access List" data-analytics-location="product_hero" data-analytics-category="efwrsx">
                <FaPlay /> Join the Early Access List
              </Link>
            </div>
            <span className={styles.statusBadge}>
              In planning, design, development &amp; testing
            </span>
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
          <p>Starting with solo operators and client–worker jobs, growing into team and enterprise workflows</p>
        </div>
        <div className={styles.modulesGrid}>
          <div className={styles.moduleCard}>
            <h3>V1 — Current Features</h3>
            <p>Implemented in the current product while native-device, email delivery and deployment testing continue.</p>
            <ul className={styles.featureList}>
              {currentFeatures.map((feature) => (
                <li key={feature}>
                  <FaCheckCircle className={styles.checkIcon} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.moduleCard}>
            <h3>V2 — Future Goals</h3>
            <p>Proposed direction for teams and organizations. These are goals, not release commitments or dates.</p>
            <ul className={styles.featureList}>
              {futureGoals.map((feature) => (
                <li key={feature}>
                  <FaRocket className={styles.checkIcon} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
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
            <Link href="/contact?inquiry=product-efwrsx" className="btn-primary" data-analytics-cta="Contact Us" data-analytics-location="product_cta" data-analytics-category="efwrsx">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default EfwrsxProduct;
