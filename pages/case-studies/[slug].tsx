import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import Layout from '@/components/Layout';
import ProjectImage from '@/components/ProjectImage';
import { getProjectExperience, ProjectExperience } from '@/lib/project-experience';
import { SEOProps } from '@/types';
import styles from '@/styles/CaseStudy.module.scss';

interface ProjectProps {
  project: ProjectExperience | null;
}

const CaseStudyDetail: React.FC<ProjectProps> = ({ project }) => {
  const seo: SEOProps = project ? {
    title: `${project.title} | Project Experience - Technatonix`,
    description: project.seoDescription || project.overview,
    canonical: `https://technatonix.com/case-studies/${project.slug}`,
  } : {
    title: 'Projects temporarily unavailable | Technatonix',
    description: 'Project information is temporarily unavailable.',
  };

  return (
    <Layout seo={seo}>
      <div className={styles.caseStudyDetail}>
        <section className={styles.hero}>
          <div className="container">
            <Link href="/case-studies" className={styles.backLink}>
              <FaArrowLeft /> Back to Projects &amp; Experience
            </Link>
            {project ? (
              <div className={styles.heroContent}>
                <h1 className={styles.title}>{project.title}</h1>
                <p className={styles.clientInfo}>{project.attribution}</p>
                <p className={styles.summary}>{project.overview}</p>
              </div>
            ) : <p role="alert">Project information is temporarily unavailable. Please try again later.</p>}
          </div>
        </section>
        {project && (
          <section className={styles.content}>
            <div className="container">
              <div className={styles.contentGrid}>
                <div className={styles.mainContent}>
                  <div className={styles.section}>
                    <h2>Project Overview</h2>
                    <p>{project.details || project.overview}</p>
                    {project.industry && <p><strong>Industry:</strong> {project.industry}</p>}
                    {project.capabilities.length > 0 && (
                      <>
                        <h2>Product Focus</h2>
                        <ul>
                          {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                        </ul>
                      </>
                    )}
                    {project.website && (
                      <p><a href={project.website} target="_blank" rel="noopener noreferrer">
                        Visit project website <FaExternalLinkAlt />
                      </a></p>
                    )}
                    {project.companyWebsite && (
                      <p><a href={project.companyWebsite} target="_blank" rel="noopener noreferrer">
                        Visit company website <FaExternalLinkAlt />
                      </a></p>
                    )}
                  </div>
                </div>
                <ProjectImage imageUrl={project.imageUrl} title={project.title} />
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectProps> = async ({ params, res }) => {
  try {
    const projects = await getProjectExperience();
    const project = projects.find((item) => item.slug === params?.slug);
    if (!project) return { notFound: true };
    return { props: { project } };
  } catch (error) {
    console.error('Failed to fetch project experience:', error);
    res.statusCode = 503;
    return { props: { project: null } };
  }
};

export default CaseStudyDetail;
