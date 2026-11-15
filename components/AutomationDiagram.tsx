import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Automation.module.scss';

interface AutomationDiagramProps {
  src: string;
  alt: string;
  priority?: boolean;
  mobileSrc?: string;
}

const AutomationDiagram: React.FC<AutomationDiagramProps> = ({ src, alt, priority = false, mobileSrc }) => (
  <figure className={styles.diagram}>
    <picture>
      {mobileSrc && <source media="(max-width: 600px)" srcSet={mobileSrc} width={400} height={1380} />}
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className={styles.diagramImage}
        priority={priority}
        unoptimized
      />
    </picture>
  </figure>
);

export default AutomationDiagram;
