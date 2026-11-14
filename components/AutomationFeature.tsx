import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import AutomationDiagram from '@/components/AutomationDiagram';
import styles from '@/styles/Automation.module.scss';

const AutomationFeature: React.FC = () => (
  <section className={styles.feature} aria-labelledby="automation-feature-title">
    <div className={styles.wideContainer}>
      <div className={styles.featureIntro}>
        <div className={styles.featureCopy}>
          <p className={styles.kicker}>Connected intelligence</p>
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
        <AutomationDiagram
          src="/images/svg-ai-automation/03-connected-business-systems.svg"
          alt="Business applications and data connected through an integration layer to AI-assisted workflows and coordinated operations."
        />
      </div>
    </div>
  </section>
);

export default AutomationFeature;
