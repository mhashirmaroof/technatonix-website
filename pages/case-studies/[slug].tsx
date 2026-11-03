import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { CaseStudy, SEOProps } from '@/types';
import styles from '@/styles/CaseStudy.module.scss';
import Link from 'next/link';
import { FaArrowLeft, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';

interface CaseStudyDetailProps {
  caseStudy: Omit<CaseStudy, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
  relatedCaseStudies: Array<Omit<CaseStudy, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  }>;
  seo: SEOProps;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ caseStudy, relatedCaseStudies, seo }) => {
  return (
    <Layout seo={seo}>
      <div className={styles.caseStudyDetail}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <Link href="/#success-stories" className={styles.backLink}>
              <FaArrowLeft /> Back to Success Stories
            </Link>
            <div className={styles.heroContent}>
              <h1 className={styles.title}>{caseStudy.title}</h1>
              <p className={styles.clientInfo}>
                <strong>Client:</strong> {caseStudy.clientName}
              </p>
              <p className={styles.summary}>{caseStudy.results}</p>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className={styles.metrics}>
          <div className="container">
            <div className={styles.metricsGrid}>
              {caseStudy.metrics.map((metric, index) => (
                <div key={index} className={styles.metricCard}>
                  <div className={styles.metricValue}>{metric.value}</div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                  {metric.description && (
                    <div className={styles.metricDescription}>{metric.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Challenge, Solution, Results */}
        <section className={styles.content}>
          <div className="container">
            <div className={styles.contentGrid}>
              <div className={styles.mainContent}>
                <div className={styles.section}>
                  <h2>The Challenge</h2>
                  <p>{caseStudy.problem}</p>
                </div>

                <div className={styles.section}>
                  <h2>Our Solution</h2>
                  <p>{caseStudy.solution}</p>
                </div>

                <div className={styles.section}>
                  <h2>Results & Impact</h2>
                  <p>{caseStudy.results}</p>
                  
                  <div className={styles.keyResults}>
                    <h3>Key Achievements</h3>
                    {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                    <ul>
                      {caseStudy.metrics.map((metric, index) => (
                        <li key={index}>
                          <FaCheckCircle className={styles.checkIcon} />
                          <strong>{metric.value}</strong> {metric.description || metric.label}
                        </li>
                      ))}
                    </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.sidebar}>
                <div className={styles.projectDetails}>
                  <h3>Project Details</h3>
                  
                  <div className={styles.detail}>
                    <strong>Client:</strong>
                    <span>{caseStudy.clientName}</span>
                  </div>

                  <div className={styles.detail}>
                    <strong>Technology Stack:</strong>
                    <div className={styles.techStack}>
                      {caseStudy.techStack.map((tech, index) => (
                        <span key={index} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.detail}>
                    <strong>Project Type:</strong>
                    <span>Custom Software Development</span>
                  </div>
                </div>

                <div className={styles.ctaCard}>
                  <h3>Ready to Transform Your Business?</h3>
                  <p>Let's discuss how we can help you achieve similar results.</p>
                  <Link href="/contact" className="btn-primary">
                    Start Your Project <FaExternalLinkAlt />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Case Studies */}
        <section className={styles.relatedCases}>
          <div className="container">
            <h2>Other Success Stories</h2>
            <div className={styles.relatedGrid}>
              {relatedCaseStudies.map((relatedCase) => (
                <div key={relatedCase.id} className={styles.relatedCard}>
                  <h3>{relatedCase.title}</h3>
                  <p className={styles.relatedClient}>{relatedCase.clientName}</p>
                  <p className={styles.relatedExcerpt}>
                    {relatedCase.results.substring(0, 120)}...
                  </p>
                  <Link href={`/case-studies/${relatedCase.slug}`} className={styles.readMore}>
                    Read Case Study <FaExternalLinkAlt />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    // Fetch case studies from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/case-studies`);
    const data = await response.json();
    
    const caseStudy = data.caseStudies?.find((cs: any) => cs.slug === slug);

    if (!caseStudy) {
      return {
        notFound: true,
      };
    }

    // Convert Date objects to ISO strings for JSON serialization
    const serializedCaseStudy = {
      ...caseStudy,
      createdAt: caseStudy.createdAt,
      updatedAt: caseStudy.updatedAt,
    };

    // Get related case studies (other published case studies excluding current one)
    const relatedCaseStudies = data.caseStudies
      ?.filter((cs: any) => cs.published && cs.id !== caseStudy.id)
      ?.slice(0, 3)
      ?.map((cs: any) => ({
        ...cs,
        createdAt: cs.createdAt,
        updatedAt: cs.updatedAt,
      })) || [];

    const seo: SEOProps = {
      title: `${caseStudy.title} - Case Study | Technatonix`,
      description: `Learn how ${caseStudy.clientName} achieved success with our ${caseStudy.title}. ${caseStudy.results.substring(0, 120)}...`,
      canonical: `https://technatonix.com/case-studies/${caseStudy.slug}`,
      openGraph: {
        title: `${caseStudy.title} - Success Story`,
        description: caseStudy.results,
        type: 'article',
        image: caseStudy.images?.[0] || '/images/og-default.jpg'
      }
    };

    return {
      props: {
        caseStudy: serializedCaseStudy,
        relatedCaseStudies,
        seo,
      },
    };
  } catch (error) {
    console.error('Failed to fetch case study:', error);
    return {
      notFound: true,
    };
  }
};

export default CaseStudyDetail;
