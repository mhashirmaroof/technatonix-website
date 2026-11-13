import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaDatabase, FaBrain, FaUsers } from 'react-icons/fa';
import styles from '@/styles/Automation.module.scss';

const AutomationFeature: React.FC = () => (
  <section className={styles.feature} aria-labelledby="automation-feature-title">
    <div className="container">
      <div className={styles.featureIntro}>
        <div>
          <h2 id="automation-feature-title">AI Automation &amp; Intelligent Systems</h2>
          <p className={styles.lead}>Turn disconnected work into intelligent, connected operations.</p>
          <p className={styles.featureDescription}>
            From AI assistants and workflows to voice experiences and integrations, we design systems
            around your processes to reduce repetitive work and help your team move forward.
          </p>
          <div className={styles.actions}>
            <Link href="/contact?inquiry=automation" className={styles.primaryAction}>Discuss an Automation Project <FaArrowRight aria-hidden="true" /></Link>
            <Link href="/ai-automation" className={styles.secondaryAction}>Explore Our Capabilities</Link>
          </div>
        </div>
        <div className={styles.workflow}>
          <p className={styles.workflowLabel}>A connected way of working</p>
          <p className={styles.workflowIntro}>From business data to informed action</p>
          <ol className={styles.workflowSteps}>
            <li className={styles.workflowStep}>
              <span className={styles.workflowIcon}><FaDatabase aria-hidden="true" /></span>
              <div><span className={styles.workflowStage}>01 · Connect</span><strong>Business systems</strong><small>Bring together your applications and data</small></div>
            </li>
            <li className={styles.workflowStep}>
              <span className={styles.workflowIcon}><FaBrain aria-hidden="true" /></span>
              <div><span className={styles.workflowStage}>02 · Automate</span><strong>Intelligent workflows</strong><small>Process information and coordinate tasks</small></div>
            </li>
            <li className={styles.workflowStep}>
              <span className={styles.workflowIcon}><FaUsers aria-hidden="true" /></span>
              <div><span className={styles.workflowStage}>03 · Review &amp; act</span><strong>Your people</strong><small>Review exceptions and take the next step</small></div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default AutomationFeature;
