import React from 'react';
import styles from './ProjectImage.module.scss';

interface ProjectImageProps {
  imageUrl: string;
  title: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ imageUrl, title }) => (
  <div className={styles.imageFrame}>
    {imageUrl ? (
      <img src={imageUrl} alt={`${title} project`} width={1920} height={1080} loading="lazy" />
    ) : (
      <span>Project image coming soon</span>
    )}
  </div>
);

export default ProjectImage;
