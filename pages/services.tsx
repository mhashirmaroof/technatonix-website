import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { SEOProps } from '@/types';
import styles from '@/styles/Services.module.scss';
import Link from 'next/link';
import { FaArrowRight, FaCog, FaCode, FaCloud, FaMobile, FaShieldAlt, FaChartLine, FaUsers, FaHeadset, FaRocket, FaAddressBook, FaProjectDiagram, FaCity, FaUserTie, FaCoins, FaLayerGroup, FaGlobe, FaBrain, FaWifi, FaHeartbeat } from 'react-icons/fa';

interface ServicesProps {
  seo: SEOProps;
}

const Services: React.FC<ServicesProps> = ({ seo }) => {
  const allServices = [
    {
      id: 'custom-software-development',
      title: 'Custom Software Development',
      shortDescription: 'Tailored software solutions designed specifically for your business needs.',
      description: 'Our custom software development services deliver solutions built from the ground up to address your specific business challenges.',
      icon: 'FaCode',
      tags: ['Web Apps', 'Desktop Software', 'API Development'],
      offerings: ['Web Applications', 'Desktop Software', 'Mobile Apps', 'API Development', 'Database Design']
    },
    {
      id: 'erp-implementation',
      title: 'ERP Implementation',
      shortDescription: 'ERP solutions for manufacturing and enterprise, including our KREVIX ERP platform.',
      description: 'Full-scale ERP implementation services including KREVIX ERP, SAP, and other enterprise systems.',
      icon: 'FaCog',
      tags: ['KREVIX ERP', 'SAP', 'Oracle', 'Microsoft Dynamics'],
      offerings: ['KREVIX ERP Implementation', 'SAP Deployment', 'System Configuration', 'User Training', 'Data Migration']
    },
    {
      id: 'cloud-migration',
      title: 'Cloud Migration',
      shortDescription: 'Seamless migration of your applications and data to cloud platforms.',
      description: 'Complete cloud migration services to move your applications and data to AWS, Azure, or Google Cloud.',
      icon: 'FaCloud',
      tags: ['AWS', 'Azure', 'Google Cloud', 'Hybrid Cloud'],
      offerings: ['Infrastructure Migration', 'Application Modernization', 'Data Migration', 'Security Implementation', 'Cost Optimization']
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
      description: 'Professional mobile app development for iOS and Android platforms using native and cross-platform technologies.',
      icon: 'FaMobile',
      tags: ['iOS', 'Android', 'React Native', 'Flutter'],
      offerings: ['Native iOS Apps', 'Native Android Apps', 'Cross-platform Development', 'App Store Optimization', 'Maintenance & Support']
    },
    {
      id: 'system-integration',
      title: 'System Integration',
      shortDescription: 'Connect and integrate your existing systems for seamless data flow.',
      description: 'Professional system integration services to connect your existing applications and create unified workflows.',
      icon: 'FaChartLine',
      tags: ['API Integration', 'Data Migration', 'Workflow Automation'],
      offerings: ['API Development', 'Data Synchronization', 'Legacy System Integration', 'Workflow Automation', 'Real-time Monitoring']
    },
    {
      id: 'consulting',
      title: 'Technology Consulting',
      shortDescription: 'Strategic technology consulting to guide your digital transformation.',
      description: 'Expert technology consulting services to help you make informed decisions about your IT infrastructure.',
      icon: 'FaUsers',
      tags: ['Digital Strategy', 'Architecture Review', 'Technology Roadmap'],
      offerings: ['Technology Assessment', 'Digital Strategy', 'Architecture Design', 'Vendor Selection', 'Project Management']
    },
    {
      id: 'managed-services',
      title: 'Managed Services',
      shortDescription: '24/7 monitoring and support for your critical systems.',
      description: 'Comprehensive managed services including monitoring, maintenance, and support for your IT infrastructure.',
      icon: 'FaHeadset',
      tags: ['24/7 Support', 'System Monitoring', 'Maintenance'],
      offerings: ['24/7 System Monitoring', 'Proactive Maintenance', 'Help Desk Support', 'Security Management', 'Performance Optimization']
    },
    {
      id: 'crm-applications',
      title: 'CRM Applications',
      shortDescription: 'Customer relationship management systems to manage leads, sales pipelines and customer service.',
      description: 'Custom CRM applications that centralize customer data, automate follow-ups and give your sales and support teams a complete view of every customer.',
      icon: 'FaAddressBook',
      tags: ['Sales Pipeline', 'Lead Management', 'Customer Support'],
      offerings: ['Lead & Pipeline Management', 'Customer 360 View', 'Marketing Automation', 'Support Ticketing', 'Reporting & Analytics']
    },
    {
      id: 'cpm-applications',
      title: 'CPM Applications',
      shortDescription: 'Project and performance management tools for planning, scheduling and tracking delivery.',
      description: 'CPM applications for project planning, critical path scheduling, resource allocation and performance tracking across teams and portfolios.',
      icon: 'FaProjectDiagram',
      tags: ['Project Planning', 'Scheduling', 'Performance Tracking'],
      offerings: ['Project Planning & Scheduling', 'Resource Management', 'Milestone Tracking', 'Budget & Cost Control', 'Dashboards & Reports']
    },
    {
      id: 'proptech-applications',
      title: 'PropTech Applications',
      shortDescription: 'Property technology platforms for real estate listings, leasing and facility management.',
      description: 'PropTech solutions that digitize real estate operations, from listings and tenant management to maintenance and rent collection.',
      icon: 'FaCity',
      tags: ['Real Estate', 'Property Management', 'Leasing'],
      offerings: ['Listing Portals', 'Tenant & Lease Management', 'Maintenance Requests', 'Rent & Payment Tracking', 'Owner & Agent Dashboards']
    },
    {
      id: 'hrtech-applications',
      title: 'HRTech Applications',
      shortDescription: 'HR technology for recruitment, onboarding, payroll, attendance and workforce analytics.',
      description: 'HRTech applications that automate the employee lifecycle, from hiring and onboarding to attendance, payroll and performance reviews.',
      icon: 'FaUserTie',
      tags: ['Recruitment', 'Payroll', 'Workforce Analytics'],
      offerings: ['Applicant Tracking', 'Onboarding Workflows', 'Attendance & Leave', 'Payroll Processing', 'Performance Management']
    },
    {
      id: 'fintech-applications',
      title: 'Fintech Applications',
      shortDescription: 'Secure financial technology solutions for payments, lending, wallets and trading platforms.',
      description: 'Fintech applications built with security and compliance in mind, including payment systems, digital wallets, lending platforms and financial dashboards.',
      icon: 'FaCoins',
      tags: ['Payments', 'Digital Wallets', 'Lending'],
      offerings: ['Payment Gateway Integration', 'Digital Wallets', 'Lending & Loan Management', 'KYC & Compliance Workflows', 'Financial Analytics']
    },
    {
      id: 'saas-development',
      title: 'SaaS Development',
      shortDescription: 'Scalable multi-tenant SaaS products with subscription billing, from MVP to enterprise scale.',
      description: 'End-to-end SaaS product development covering multi-tenant architecture, subscription billing, onboarding flows and cloud deployment, from MVP to enterprise scale.',
      icon: 'FaLayerGroup',
      tags: ['Multi-Tenant', 'Subscription Billing', 'Cloud Native'],
      offerings: ['Multi-Tenant Architecture', 'Subscription & Billing Integration', 'User & Role Management', 'Admin & Analytics Dashboards', 'Cloud Deployment & Scaling']
    },
    {
      id: 'web-development',
      title: 'Web Development',
      shortDescription: 'Fast, secure and SEO-friendly websites, portals and web applications.',
      description: 'Modern web development with React and Next.js, from marketing websites and e-commerce to complex portals and web applications.',
      icon: 'FaGlobe',
      tags: ['React', 'Next.js', 'E-commerce'],
      offerings: ['Business Websites', 'E-commerce Solutions', 'Web Portals & Dashboards', 'Progressive Web Apps', 'SEO & Performance Optimization']
    },
    {
      id: 'ai-ml-solutions',
      title: 'AI & ML Solutions',
      shortDescription: 'Artificial intelligence and machine learning for automation and predictive analytics.',
      description: 'AI and machine learning solutions that automate processes, generate insights and add intelligent features to your products.',
      icon: 'FaBrain',
      tags: ['Machine Learning', 'Automation', 'Predictive Analytics'],
      offerings: ['Predictive Analytics', 'Process Automation', 'Chatbots & Assistants', 'Computer Vision', 'AI Feature Integration']
    },
    {
      id: 'iot-solutions',
      title: 'IoT Solutions',
      shortDescription: 'Connected devices, sensors and dashboards for smart operations and automation.',
      description: 'IoT solutions that connect devices and sensors to the cloud for real-time monitoring, control and automation.',
      icon: 'FaWifi',
      tags: ['Industrial IoT', 'Smart Sensors', 'Real-time Monitoring'],
      offerings: ['Device Connectivity', 'Real-time Dashboards', 'Remote Monitoring', 'Edge & Cloud Integration', 'Alerts & Automation']
    },
    {
      id: 'healthcare-software',
      title: 'Healthcare & Medical Software',
      shortDescription: 'Clinic, hospital and medical product software built with privacy and reliability in mind.',
      description: 'Healthcare software including clinic and hospital management, patient portals and software for medical products, designed for privacy and reliability.',
      icon: 'FaHeartbeat',
      tags: ['Healthcare IT', 'Medical Products', 'Patient Portals'],
      offerings: ['Clinic & Hospital Management', 'Patient Portals & Apps', 'Medical Product Software', 'Appointment & Billing Systems', 'Secure Data Handling']
    }
  ];
  
  const coreIds = ['custom-software-development', 'saas-development', 'web-development'];
  const coreServices = coreIds.map((id) => allServices.find((s) => s.id === id)!);
  const additionalServices = allServices.filter((s) => !coreIds.includes(s.id));

  return (
    <Layout seo={seo}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Comprehensive Software Solutions</h1>
            <p>
              From custom software and SaaS products to web, mobile, cloud and industry solutions, we deliver IT services that 
              transform your business operations and drive growth across global markets.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>500+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>15+</span>
                <span className={styles.statLabel}>Industries Served</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>50+</span>
                <span className={styles.statLabel}>Global Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Core Services</h2>
            <p>Specialized solutions designed to accelerate your digital transformation</p>
          </div>
          <div className={styles.coreServicesGrid}>
            {coreServices.map((service) => (
              <div key={service.id} className={styles.coreServiceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon === 'FaCode' && <FaCode />}
                  {service.icon === 'FaLayerGroup' && <FaLayerGroup />}
                  {service.icon === 'FaGlobe' && <FaGlobe />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.offerings.map((offering: string, index: number) => (
                    <li key={index}>{offering}</li>
                  ))}
                </ul>
                <div className={styles.serviceAction}>
                  <Link href="/contact" className="btn-primary">
                    Get Started <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className={styles.additionalServices}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Additional Services</h2>
            <p>Complete technology solutions to support your business growth</p>
          </div>
          <div className={styles.servicesGrid}>
            {additionalServices.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {service.icon === 'FaCog' && <FaCog />}
                  {service.icon === 'FaCloud' && <FaCloud />}
                  {service.icon === 'FaMobile' && <FaMobile />}
                  {service.icon === 'FaChartLine' && <FaChartLine />}
                  {service.icon === 'FaUsers' && <FaUsers />}
                  {service.icon === 'FaHeadset' && <FaHeadset />}
                  {service.icon === 'FaBrain' && <FaBrain />}
                  {service.icon === 'FaWifi' && <FaWifi />}
                  {service.icon === 'FaHeartbeat' && <FaHeartbeat />}
                  {service.icon === 'FaAddressBook' && <FaAddressBook />}
                  {service.icon === 'FaProjectDiagram' && <FaProjectDiagram />}
                  {service.icon === 'FaCity' && <FaCity />}
                  {service.icon === 'FaUserTie' && <FaUserTie />}
                  {service.icon === 'FaCoins' && <FaCoins />}
                  {service.icon === 'FaLayerGroup' && <FaLayerGroup />}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href="/contact" className={styles.serviceLink}>
                  Learn More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Development Process</h2>
            <p>Proven methodology that ensures successful project delivery</p>
          </div>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>01</div>
              <h3>Discovery & Analysis</h3>
              <p>We thoroughly understand your business requirements, challenges, and objectives through comprehensive analysis.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>02</div>
              <h3>Design & Planning</h3>
              <p>Create detailed technical specifications, system architecture, and project timeline with clear milestones.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>03</div>
              <h3>Development & Testing</h3>
              <p>Agile development with continuous testing, regular updates, and quality assurance at every stage.</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>04</div>
              <h3>Deployment & Support</h3>
              <p>Seamless deployment with comprehensive training and ongoing support to ensure success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChoose}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Choose Technatonix?</h2>
            <p>We deliver exceptional value through expertise, innovation, and commitment</p>
          </div>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <FaRocket className={styles.benefitIcon} />
              <h3>Proven Track Record</h3>
              <p>500+ successful projects delivered across 15+ industries with 99% client satisfaction</p>
            </div>
            <div className={styles.benefitCard}>
              <FaShieldAlt className={styles.benefitIcon} />
              <h3>Enterprise Security</h3>
              <p>Bank-level security standards with compliance certifications and data protection</p>
            </div>
            <div className={styles.benefitCard}>
              <FaChartLine className={styles.benefitIcon} />
              <h3>Scalable Solutions</h3>
              <p>Future-ready architecture that grows with your business and adapts to market changes</p>
            </div>
            <div className={styles.benefitCard}>
              <FaUsers className={styles.benefitIcon} />
              <h3>Expert Team</h3>
              <p>Certified developers and consultants with deep industry knowledge and technical expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how our software solutions can accelerate your growth and improve efficiency.</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn-primary">
                Start Your Project
              </Link>
              <Link href="/case-studies" className="btn-secondary">
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<ServicesProps> = async () => {
  const seo: SEOProps = {
    title: 'Software Development & IT Services | Custom Software, SaaS, Web & Mobile Apps - Technatonix',
    description: 'Technatonix offers end-to-end IT services: custom software development, SaaS products, web and mobile apps, CRM, ERP, HRTech, PropTech, Fintech, healthcare software, cloud migration, AI and IoT solutions.',
    canonical: 'https://technatonix.com/services',
    openGraph: {
      title: 'Software Development & IT Services | Technatonix',
      description: 'Full-service software house providing custom software, SaaS, web and mobile apps, CRM, ERP and industry solutions. Transform your business with our expert IT services.',
      image: '/images/services-og.jpg',
      type: 'website'
    }
  };

  return {
    props: {
      seo,
    },
  };
};

export default Services;
