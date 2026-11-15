import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Automation.module.scss';

interface AutomationDiagramProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const AutomationDiagram: React.FC<AutomationDiagramProps> = ({ src, alt, priority = false }) => (
  <figure className={styles.diagram}>
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={900}
      className={styles.diagramImage}
      priority={priority}
      unoptimized
    />
  </figure>
);

export default AutomationDiagram;
