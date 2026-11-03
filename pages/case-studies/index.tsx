import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { CaseStudy, SEOProps } from '@/types';
import styles from '@/styles/CaseStudies.module.scss';
import Link from 'next/link';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

interface CaseStudiesProps {
  caseStudies: Array<Omit<CaseStudy, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  }>;
  seo: SEOProps;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ caseStudies, seo }) => {
  return (
    <Layout seo={seo}>
      <div className={styles.caseStudiesPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.title}>Success Stories</h1>
              <p className={styles.subtitle}>
                Discover how we've helped businesses across industries transform their operations 
                and achieve remarkable results through innovative software solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className={styles.caseStudiesSection}>
          <div className="container">
            <div className={styles.caseStudiesGrid}>
              {caseStudies.map((caseStudy) => (
                <article key={caseStudy.id} className={styles.caseStudyCard}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.caseTitle}>{caseStudy.title}</h2>
                    <p className={styles.clientName}>{caseStudy.clientName}</p>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.section}>
                      <h3>Challenge</h3>
                      <p>{caseStudy.problem.substring(0, 150)}...</p>
                    </div>

                    <div className={styles.section}>
                      <h3>Solution</h3>
                      <p>{caseStudy.solution.substring(0, 150)}...</p>
                    </div>

                    {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                      <div className={styles.metrics}>
                        <h3>Key Results</h3>
                        <div className={styles.metricsGrid}>
                          {caseStudy.metrics.slice(0, 3).map((metric, index) => (
                            <div key={index} className={styles.metric}>
                              <span className={styles.metricValue}>{metric.value}</span>
                              <span className={styles.metricLabel}>{metric.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.techStack}>
                      <h4>Technologies Used</h4>
                      <div className={styles.techTags}>
                        {caseStudy.techStack.slice(0, 4).map((tech, index) => (
                          <span key={index} className={styles.techTag}>{tech}</span>
                        ))}
                        {caseStudy.techStack.length > 4 && (
                          <span className={styles.techTag}>+{caseStudy.techStack.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <Link href={`/case-studies/${caseStudy.slug}`} className={styles.readMoreButton}>
                      Read Full Story <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Ready to Create Your Success Story?</h2>
              <p>
                Join our portfolio of successful clients and transform your business 
                with our proven software solutions and expertise.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className="btn-primary">
                  Start Your Project <FaExternalLinkAlt />
                </Link>
                <Link href="/products" className="btn-secondary">
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch case studies from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/case-studies`);
    const data = await response.json();
    
    // Filter only published case studies
    const caseStudies = data.caseStudies
      ?.filter((cs: CaseStudy) => cs.published)
      ?.map((cs: any) => ({
        ...cs,
        createdAt: cs.createdAt,
        updatedAt: cs.updatedAt,
      })) || [];

    const seo: SEOProps = {
      title: 'Software Development Case Studies | Client Success Stories - Technatonix',
      description: 'Real software development case studies and success stories from Technatonix. See how our custom software, SaaS, web and mobile apps, and enterprise systems transformed businesses worldwide.',
      canonical: 'https://technatonix.com/case-studies',
      openGraph: {
        title: 'Software Development Success Stories | Case Studies - Technatonix',
        description: 'Discover how Technatonix has delivered successful custom software, SaaS products, mobile apps and enterprise systems for clients worldwide.',
        type: 'website',
        image: '/images/og-case-studies.jpg'
      }
    };

    return {
      props: {
        caseStudies,
        seo,
      },
    };
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    
    // Return empty array on error
    return {
      props: {
        caseStudies: [],
        seo: {
          title: 'Case Studies & Success Stories | Technatonix',
          description: 'Discover how Technatonix has helped businesses across industries achieve success through innovative software solutions.',
          canonical: 'https://technatonix.com/case-studies',
        }
      },
    };
  }
};

export default CaseStudies;
