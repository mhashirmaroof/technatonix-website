import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import Layout from '@/components/Layout';
import ProjectImage from '@/components/ProjectImage';
import { getProjectExperience, ProjectExperience } from '@/lib/project-experience';
import { SEOProps } from '@/types';
import styles from '@/styles/CaseStudies.module.scss';

interface CaseStudiesProps {
  projects: ProjectExperience[];
  loadError: boolean;
}

const seo: SEOProps = {
  title: 'Projects & Case Studies | The Technatonix',
  description: 'Explore Technatonix projects and products alongside our team’s personal software engineering experience.',
  canonical: 'https://technatonix.com/case-studies',
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ projects, loadError }) => (
  <Layout seo={seo}>
    <div className={styles.caseStudiesPage}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Projects &amp; Experience</h1>
            <p className={styles.subtitle}>
              Explore Technatonix projects and products alongside our team's personal project experience.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.caseStudiesSection}>
        <div className="container">
          {loadError ? (
            <p role="alert">Projects are temporarily unavailable. Please try again later.</p>
          ) : projects.length === 0 ? (
            <p>No projects have been published yet.</p>
          ) : (
            <div className={styles.caseStudiesGrid}>
              {projects.map((project) => (
                <article key={project.slug} className={styles.caseStudyCard}>
                  <ProjectImage imageUrl={project.imageUrl} title={project.title} />
                  <div className={styles.cardHeader}>
                    <h2 className={styles.caseTitle}>{project.title}</h2>
                    <p className={styles.clientName}>{project.attribution}</p>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.section}><p>{project.overview}</p></div>
                  </div>
                  <div className={styles.cardFooter}>
                    <Link href={`/case-studies/${project.slug}`} className={styles.readMoreButton}>
                      View Project <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Project?</h2>
            <p>Tell us about your business and the software you want to build.</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn-primary" data-analytics-cta="Start Your Project" data-analytics-location="case_studies_cta">Start Your Project <FaExternalLinkAlt /></Link>
              <Link href="/products" className="btn-secondary">Explore Solutions</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<CaseStudiesProps> = async ({ res }) => {
  try {
    return { props: { projects: await getProjectExperience(), loadError: false } };
  } catch (error) {
    console.error('Failed to fetch project experience:', error);
    res.statusCode = 503;
    return { props: { projects: [], loadError: true } };
  }
};

export default CaseStudies;
