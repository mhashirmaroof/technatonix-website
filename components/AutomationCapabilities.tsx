import React from 'react';
import { automationCapabilities } from '@/data/ai-automation';
import styles from '@/styles/Automation.module.scss';

const AutomationCapabilities: React.FC = () => (
  <div className={styles.capabilityGrid}>
    {automationCapabilities.map(({ id, title, description, examples, icon: Icon }, index) => (
      <article className={styles.capabilityCard} id={id} key={id}>
        <div className={styles.cardTop}>
          <span className={styles.icon}><Icon aria-hidden="true" /></span>
          <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p className={styles.examples}>{examples}</p>
      </article>
    ))}
  </div>
);

export default AutomationCapabilities;
