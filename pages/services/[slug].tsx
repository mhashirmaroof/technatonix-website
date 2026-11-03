import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/ServiceDetail.module.scss';
import { Service, SEOProps } from '../../types';
import { FaArrowLeft, FaCheckCircle, FaRocket, FaUsers, FaCog } from 'react-icons/fa';

interface ServiceDetailProps {
  service: Service;
  seo: SEOProps;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, seo }) => {
  if (!service) {
    return (
      <Layout seo={seo}>
        <div className={styles.notFound}>
          <div className="container">
            <h1>Service Not Found</h1>
            <Link href="/services" legacyBehavior>
              <a className={styles.backLink}>← Back to Services</a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout seo={seo}>
      <div className={styles.serviceDetail}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <Link href="/services" legacyBehavior>
              <a className={styles.backLink}>
                <FaArrowLeft />
                Back to Services
              </a>
            </Link>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1>{service.title}</h1>
                <p>{service.description}</p>
                <div className={styles.serviceTags}>
                  {service.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className={styles.overview}>
          <div className="container">
            <div className={styles.overviewGrid}>
              <div className={styles.overviewText}>
                <h2>Service Overview</h2>
                <p>{service.description}</p>
                <div className={styles.highlights}>
                  <div className={styles.highlight}>
                    <FaRocket className={styles.highlightIcon} />
                    <div>
                      <h4>Fast Implementation</h4>
                      <p>Quick deployment with minimal disruption to your business operations</p>
                    </div>
                  </div>
                  <div className={styles.highlight}>
                    <FaUsers className={styles.highlightIcon} />
                    <div>
                      <h4>Expert Team</h4>
                      <p>Experienced professionals dedicated to your project success</p>
                    </div>
                  </div>
                  <div className={styles.highlight}>
                    <FaCog className={styles.highlightIcon} />
                    <div>
                      <h4>Customizable</h4>
                      <p>Tailored solutions that fit your specific business requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section className={styles.offerings}>
          <div className="container">
            <h2>What We Deliver</h2>
            <div className={styles.offeringsGrid}>
              {service.offerings.map((offering, index) => (
                <div key={index} className={styles.offeringCard}>
                  <FaCheckCircle className={styles.offeringIcon} />
                  <h3>{offering}</h3>
                  <p>Comprehensive solution designed to meet your business needs and drive growth.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.process}>
          <div className="container">
            <h2>Our Process</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Discovery & Analysis</h3>
                  <p>We analyze your current systems and understand your business requirements</p>
                </div>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Solution Design</h3>
                  <p>Create a customized solution architecture tailored to your needs</p>
                </div>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Implementation</h3>
                  <p>Deploy the solution with minimal disruption to your operations</p>
                </div>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Training & Support</h3>
                  <p>Provide comprehensive training and ongoing support for your team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Ready to Get Started?</h2>
              <p>Let's discuss how {service.title.toLowerCase()} can benefit your business.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" legacyBehavior>
                  <a className={styles.primaryButton}>Get Free Consultation</a>
                </Link>
                <Link href="/contact" legacyBehavior>
                  <a className={styles.secondaryButton}>Request Quote</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  
  // Hardcoded services data
  const allServices = [
    {
      id: 'erp-development',
      slug: 'erp-development',
      title: 'ERP System Development',
      shortDescription: 'Leading software house delivering comprehensive ERP systems and enterprise resource planning solutions for manufacturing businesses.',
      description: 'Professional ERP development services from Technatonix software house, specializing in custom ERP systems for manufacturing and enterprise businesses.',
      longDescription: 'As a premier software house, Technatonix provides end-to-end ERP system development services for manufacturing companies looking to streamline their operations. Our custom software development team specializes in creating robust ERP systems that integrate all aspects of your business, from inventory management to financial reporting. Trust our software development expertise to transform your business operations.',
      icon: 'FaIndustry',
      tags: ['ERP Systems', 'Manufacturing', 'Integration'],
      offerings: ['Custom ERP Development', 'System Integration', 'Migration Services', 'Training & Support'],
      benefits: ['Streamlined Operations', 'Real-time Data', 'Cost Reduction', 'Improved Decision Making']
    },
    {
      id: 'web-development',
      slug: 'web-development',
      title: 'Web Development Services',
      shortDescription: 'Professional software house offering custom web development, modern web applications, and responsive websites built with cutting-edge technologies.',
      description: 'Expert web development services from Technatonix software house, delivering custom web applications and responsive websites using modern technologies.',
      longDescription: 'Technatonix software house creates responsive, scalable web applications using the latest software development technologies. Our web development services include everything from simple websites to complex web applications that can handle thousands of users. As a trusted software development company, we deliver high-quality web solutions that drive business growth.',
      icon: 'FaGlobe',
      tags: ['React', 'Next.js', 'Web Apps'],
      offerings: ['Custom Web Development', 'E-commerce Solutions', 'Progressive Web Apps', 'API Development'],
      benefits: ['Responsive Design', 'Fast Performance', 'SEO Optimized', 'Mobile-First Approach']
    },
    {
      id: 'mobile-development',
      slug: 'mobile-development',
      title: 'Mobile App Development',
      shortDescription: 'Expert software house specializing in native and cross-platform mobile app development for iOS and Android platforms.',
      description: 'Professional mobile app development services from Technatonix software house, creating high-performance iOS and Android applications.',
      longDescription: 'Our software development team at Technatonix creates high-performance mobile applications for both iOS and Android platforms. As a leading software house, we use modern frameworks to ensure your mobile app works perfectly across all devices. Trust our custom software development expertise for your mobile app needs.',
      icon: 'FaMobile',
      tags: ['iOS', 'Android', 'React Native'],
      offerings: ['Native iOS Apps', 'Native Android Apps', 'Cross-platform Apps', 'App Store Deployment'],
      benefits: ['Cross-platform Compatibility', 'Native Performance', 'User-friendly Design', 'Offline Functionality']
    },
    {
      id: 'custom-software-development',
      slug: 'custom-software-development',
      title: 'Custom Software Development',
      shortDescription: 'Leading software house providing tailored custom software development solutions designed specifically for your unique business requirements.',
      description: 'Expert custom software development services from Technatonix software house, delivering bespoke solutions tailored to your business needs.',
      longDescription: 'Technatonix software house develops custom software solutions that are perfectly aligned with your business requirements. Our software development team works closely with you to understand your needs and create software that gives you a competitive advantage. As an experienced software development company, we deliver scalable, efficient software solutions.',
      icon: 'FaCode',
      tags: ['Web Apps', 'Desktop Software', 'API Development'],
      offerings: ['Web Applications', 'Desktop Software', 'Mobile Apps', 'API Development', 'Database Design'],
      benefits: ['Increased Efficiency', 'Cost Reduction', 'Competitive Advantage', 'Scalability']
    }
  ];
  
  // Find service by slug
  const service = allServices.find(s => s.slug === slug) || null;

  if (!service) {
    return {
      notFound: true,
    };
  }

  const seo: SEOProps = {
    title: `${service.title} - Technatonix Software House`,
    description: service.shortDescription,
    canonical: `https://technatonix.com/services/${service.slug}`,
    openGraph: {
      title: `${service.title} - Technatonix Software House`,
      description: service.shortDescription,
      type: 'website'
    }
  };

  return {
    props: {
      service,
      seo,
    },
  };
};

export default ServiceDetail;
