import React from 'react';
import Link from 'next/link';
import {
  FaArrowRight, FaBriefcase, FaBuilding, FaCheckCircle, FaClipboardList,
  FaHeadset, FaIndustry, FaReceipt, FaShoppingCart, FaUserTie,
} from 'react-icons/fa';
import Layout from '@/components/Layout';
import AutomationCapabilities from '@/components/AutomationCapabilities';
import AutomationDiagram from '@/components/AutomationDiagram';
import { SEOProps } from '@/types';
import styles from '@/styles/Automation.module.scss';

const seo: SEOProps = {
  title: 'AI Automation & Intelligent Systems | The Technatonix',
  description: 'Explore AI agents, intelligent workflows, sales automation, voice systems, document processing and enterprise integrations.',
  canonical: 'https://technatonix.com/ai-automation',
  openGraph: {
    title: 'AI Automation & Intelligent Systems | Technatonix',
    description: 'Connect your systems and automate business processes with intelligent, human-centered solutions.',
    type: 'website',
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Automation & Intelligent Systems',
    description: 'AI-assisted workflows, business system integrations and custom software with appropriate human oversight.',
    url: 'https://www.technatonix.com/ai-automation',
    provider: { '@type': 'Organization', name: 'The Technatonix', url: 'https://www.technatonix.com/' },
  },
};

const useCases = [
  { title: 'Sales teams', text: 'Capture and route leads, update CRM records and prepare follow-ups.', icon: FaUserTie, focus: 'Leads & CRM' },
  { title: 'Customer support', text: 'Classify enquiries, draft responses and route complex cases to people.', icon: FaHeadset, focus: 'Enquiries & routing' },
  { title: 'Finance', text: 'Extract invoice information and send exceptions for approval.', icon: FaReceipt, focus: 'Invoices & approvals' },
  { title: 'Manufacturing', text: 'Coordinate purchase-order intake, supplier updates and operational alerts.', icon: FaIndustry, focus: 'Orders & suppliers' },
  { title: 'Real estate', text: 'Qualify enquiries, support scheduling and update customer records.', icon: FaBuilding, focus: 'Enquiries & scheduling' },
  { title: 'Professional services', text: 'Coordinate onboarding, document collection and status updates.', icon: FaBriefcase, focus: 'Onboarding & documents' },
  { title: 'E-commerce', text: 'Connect order exceptions, customer notifications and inventory updates.', icon: FaShoppingCart, focus: 'Orders & inventory' },
  { title: 'Field operations', text: 'Coordinate assignments, evidence submissions and reporting workflows.', icon: FaClipboardList, focus: 'Assignments & reporting' },
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
        <div className={styles.wideContainer}>
          <div className={styles.heroLayout}>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Connected intelligence for your business</p>
              <h1>AI Automation &amp; Intelligent Systems</h1>
              <p className={styles.lead}>Make your systems work together, so your people can focus on work that matters.</p>
              <p>We design AI-assisted workflows, integrations and custom software around your business processes, with practical safeguards and room for human judgment.</p>
              <div className={styles.actions}>
                <Link href="/contact?inquiry=automation" className={styles.primaryAction}>Discuss an Automation Project <FaArrowRight aria-hidden="true" /></Link>
                <a href="#capabilities" className={styles.secondaryAction}>Explore Capabilities</a>
              </div>
            </div>
            <AutomationDiagram
              src="/images/svg-ai-automation/01-ai-intelligence-ecosystem.svg"
              alt="An AI intelligence core connecting models, workflow engines, business systems, data, communication, monitoring and human approvals."
              priority
            />
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
        <div className={styles.wideContainer}>
          <div className={styles.diagramSection}>
            <div className={styles.diagramCopy}>
              <p className={styles.kicker}>Intelligent workflows</p>
              <h2>From trigger to action, with oversight</h2>
              <p>Bring orchestration, AI processing and your existing systems together in a workflow designed around the way your team works.</p>
              <ul>
                <li>Capture and route information as work begins.</li>
                <li>Review sensitive decisions before action is taken.</li>
                <li>Monitor outcomes and handle exceptions.</li>
              </ul>
            </div>
            <AutomationDiagram
              src="/images/svg-ai-automation/02-intelligent-workflow-lifecycle.svg"
              alt="A workflow moving from business triggers through orchestration, AI processing and approvals to actions, with monitoring and recovery."
            />
          </div>
        </div>
      </section>

      <section className={styles.lightSection}>
        <div className={styles.wideContainer}>
          <div className={styles.useCases}>
            <div className={styles.sectionHeading}>
              <p className={styles.kicker}>Practical applications</p>
              <h2>Start with a process, not a platform</h2>
              <p>Explore how connected workflows could support the people and processes across your business. These examples are starting points for discovery, not claims of past delivery.</p>
            </div>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ title, text, icon: Icon, focus }) => (
                <article className={styles.useCaseCard} key={title}>
                  <span className={styles.useCaseIcon}><Icon aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className={styles.useCaseFocus}>{focus}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.wideContainer}>
          <div className={`${styles.diagramSection} ${styles.diagramSectionReverse}`}>
            <div className={styles.diagramCopy}>
              <p className={styles.kicker}>AI agents with oversight</p>
              <h2>Specialized support, guided by your team</h2>
              <p>Design agents around defined tasks in sales, support, finance and operations, while keeping people in control of important decisions.</p>
              <ul>
                <li>Give each agent a clear role and approved tools.</li>
                <li>Apply permissions appropriate to the task.</li>
                <li>Escalate sensitive decisions to your team.</li>
              </ul>
            </div>
            <AutomationDiagram
              src="/images/svg-ai-automation/04-supervised-ai-agent-workforce.svg"
              alt="A central orchestrator coordinates specialized AI agents with shared permissions, monitoring and human oversight."
            />
          </div>
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
          <div className={styles.sectionHeading}><p className={styles.kicker}>The right approach</p><h2>Technology in service of your process</h2><p>Depending on your requirements, a solution may use workflow tools such as n8n, Make or Zapier; AI services such as OpenAI or Claude; and business tools such as Notion, alongside APIs, webhooks and custom software. We assess platform fit, access, security and support needs before recommending a stack.</p></div>
          <div className={styles.tags}><span>n8n</span><span>Make</span><span>Zapier</span><span>OpenAI</span><span>Claude</span><span>Notion</span><span>APIs &amp; webhooks</span><span>Custom software</span><span>Human approvals</span></div>
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
