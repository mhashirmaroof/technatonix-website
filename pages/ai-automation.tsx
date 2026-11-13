import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Layout from '@/components/Layout';
import AutomationCapabilities from '@/components/AutomationCapabilities';
import { SEOProps } from '@/types';
import styles from '@/styles/Automation.module.scss';

const seo: SEOProps = {
  title: 'AI Automation & Intelligent Systems | Technatonix',
  description: 'Explore AI agents, intelligent workflows, voice automation and business system integrations designed to streamline operations with appropriate human oversight.',
  canonical: 'https://technatonix.com/ai-automation',
  openGraph: {
    title: 'AI Automation & Intelligent Systems | Technatonix',
    description: 'Connect your systems and automate business processes with intelligent, human-centered solutions.',
    type: 'website',
  },
};

const useCases = [
  ['Sales teams', 'Capture and route leads, update CRM records and prepare follow-ups.'],
  ['Customer support', 'Classify enquiries, draft responses and route complex cases to people.'],
  ['Finance', 'Extract invoice information and send exceptions for approval.'],
  ['Manufacturing', 'Coordinate purchase-order intake, supplier updates and operational alerts.'],
  ['Real estate', 'Qualify enquiries, support scheduling and update customer records.'],
  ['Professional services', 'Coordinate onboarding, document collection and status updates.'],
  ['E-commerce', 'Connect order exceptions, customer notifications and inventory updates.'],
  ['Field operations', 'Coordinate assignments, evidence submissions and reporting workflows.'],
];

const principles = [
  ['Reliability', 'Plan for timeouts, retries, failure paths and recovery.'],
  ['Duplicate protection', 'Use idempotency safeguards where events or actions may be retried.'],
  ['Operational visibility', 'Scope useful execution logs, alerts and monitoring.'],
  ['Security', 'Design for appropriate access, secret management and data handling.'],
  ['Human oversight', 'Include approval or escalation for sensitive or irreversible actions.'],
  ['Maintainability', 'Document workflows, handover and ongoing support needs.'],
  ['Scale', 'Consider queues and concurrency controls as volume requires.'],
];

const steps = [
  ['Discover', 'Understand your process, systems, constraints and goals.'],
  ['Design', 'Map data flows, decisions, exceptions and human approvals.'],
  ['Build', 'Implement the workflows, integrations and custom components.'],
  ['Test', 'Exercise realistic scenarios, failure paths and permissions.'],
  ['Deploy & Improve', 'Plan deployment, documentation, monitoring and iteration.'],
];

const faqs = [
  ['What is AI automation?', 'It combines AI, software integrations and workflow orchestration to help teams process information and coordinate tasks, with appropriate human oversight.'],
  ['Can you work with our existing software?', 'We first assess available APIs, webhooks, connectors, permissions and process requirements to determine a suitable integration approach.'],
  ['Are workflow platforms the only option?', 'No. Depending on the project, an implementation may use workflow tools, AI APIs, direct integrations or custom backend services. The technology is selected for the requirements.'],
  ['Can AI agents use our business data?', 'Task-specific assistants can be designed to access approved information and tools, subject to defined permissions, safeguards and human escalation.'],
  ['What about voice automation and privacy?', 'Voice use cases such as enquiry handling and scheduling require discovery of platform capabilities, consent, disclosure, recording and applicable privacy and telecom requirements.'],
  ['Will automation replace human decisions?', 'The goal is to support people and reduce repetitive work. Approval and escalation can be included for sensitive or high-impact decisions.'],
  ['Is ongoing support available?', 'Maintenance, monitoring and improvements can be scoped as part of an engagement.'],
];

const AiAutomationPage: React.FC = () => (
  <Layout seo={seo}>
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.heroInner}>
            <h1>AI Automation &amp; Intelligent Systems</h1>
            <p className={styles.lead}>Make your systems work together, so your people can focus on work that matters.</p>
            <p>We design AI-assisted workflows, integrations and custom software around your business processes, with practical safeguards and room for human judgment.</p>
            <div className={styles.actions}>
              <Link href="/contact?inquiry=automation" className={styles.primaryAction}>Discuss an Automation Project <FaArrowRight aria-hidden="true" /></Link>
              <a href="#capabilities" className={styles.secondaryAction}>Explore Capabilities</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.kicker}>The opportunity</p><h2>Less friction between your people, processes and systems</h2><p>When information lives in different tools, teams spend time copying data, chasing updates and resolving avoidable handoffs. We start with the process and design an approach that fits.</p></div>
          <div className={styles.problemGrid}>
            <article><h3>Reduce repetitive work</h3><p>Coordinate routine steps and give teams more time for decisions and customer relationships.</p></article>
            <article><h3>Connect information</h3><p>Move relevant data between systems using integration methods suited to your environment.</p></article>
            <article><h3>Keep people in control</h3><p>Make approvals, exceptions and escalation part of the workflow where they matter.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.tintedSection} id="capabilities">
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.kicker}>What we can design</p><h2>Capabilities that work together</h2><p>Each engagement is scoped around your goals, systems and constraints.</p></div>
          <AutomationCapabilities />
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Practical applications</p><h2>Start with a process, not a platform</h2><p>These are examples of workflows we can explore with your team, not claims of past delivery.</p></div>
          <div className={styles.useCaseGrid}>{useCases.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.engineering}>
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Engineered for real operations</p><h2>Dependability belongs in the design</h2><p>We consider the controls your workflow needs, from failure handling to the moments that require a person in the loop. Specific safeguards are defined and implemented per project.</p></div>
          <div className={styles.principleGrid}>{principles.map(([title, text]) => <article key={title}><FaCheckCircle aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.kicker}>The right approach</p><h2>Technology in service of your process</h2><p>Depending on your requirements, a solution may combine workflow orchestration, AI services, APIs, webhooks, databases and custom backend software. We assess platform fit, access and support needs before recommending a stack.</p></div>
          <div className={styles.tags}><span>Workflow orchestration</span><span>AI &amp; data</span><span>APIs &amp; webhooks</span><span>Custom software</span><span>Human approvals</span></div>
        </div>
      </section>

      <section className={styles.tintedSection}>
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Our approach</p><h2>From discovery to day-to-day operations</h2><p>We build around how your business works, with scope and deliverables agreed for your project.</p></div>
          <div className={styles.stepsGrid}>{steps.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className="container">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Questions &amp; answers</p><h2>Planning your automation</h2></div>
          <div className={styles.faqGrid}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className="container">
          <h2>Have a process your team repeats every day?</h2>
          <p>Tell us how it works today. Together, we can explore where automation could make a meaningful difference.</p>
          <Link href="/contact?inquiry=automation" className={styles.primaryAction}>Discuss an Automation Project <FaArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  </Layout>
);

export default AiAutomationPage;
