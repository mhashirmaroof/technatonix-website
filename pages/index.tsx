import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import CountUp from '@/components/home/CountUp';
import AutomationFeature from '@/components/AutomationFeature';
import { useReveal } from '@/components/home/useReveal';
import { SEOProps } from '@/types';
import { getProjectExperience, ProjectExperience } from '@/lib/project-experience';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FaArrowRight, FaCheckCircle, FaIndustry, FaCog, FaHeartbeat, FaDollarSign, FaUtensils,
  FaShoppingCart, FaCar, FaGraduationCap, FaCode, FaCloud, FaMobile, FaWifi, FaBrain,
  FaAddressBook, FaProjectDiagram, FaCity, FaUserTie, FaCoins, FaLayerGroup, FaGlobe,
  FaSearch, FaPencilRuler, FaLaptopCode, FaRocket, FaPlay, FaClipboardCheck,
} from 'react-icons/fa';

const HeroScene = dynamic(() => import('@/components/home/HeroScene'), { ssr: false });

interface HomeProps {
  caseStudies: ProjectExperience[];
  seo: SEOProps;
}

const serviceIcons: Record<string, IconType> = {
  FaCode, FaCogs: FaCog, FaMobile, FaWifi, FaBrain, FaCloud, FaAddressBook, FaProjectDiagram,
  FaCity, FaUserTie, FaCoins, FaLayerGroup, FaGlobe, FaMedical: FaHeartbeat,
};

const industryIcons: Record<string, IconType> = {
  FaHeartbeat, FaDollarSign, FaUtensils, FaShoppingCart, FaCar, FaGraduationCap,
};

const techStack = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'Flutter', 'React Native', 'Angular',
  'NestJS', 'PostgreSQL', 'MongoDB', 'Firebase', 'AWS', 'Azure', 'Google Cloud', 'Docker',
  'Kubernetes', 'TensorFlow', 'Three.js', 'GraphQL',
];

const processSteps = [
  { icon: FaSearch, title: 'Discover', text: 'We learn your business, users and goals, then define a clear scope and roadmap.' },
  { icon: FaPencilRuler, title: 'Design', text: 'UX flows, architecture and a clickable prototype you can react to before we build.' },
  { icon: FaLaptopCode, title: 'Build', text: 'Agile sprints with demos every two weeks, automated testing and CI/CD.' },
  { icon: FaRocket, title: 'Launch & Grow', text: 'Secure deployment, monitoring and ongoing support as your product scales.' },
];

const products = [
  {
    name: 'KREVIX ERP',
    tag: 'ERP for Manufacturing',
    text: 'Inventory-first ERP with automated workflows, production planning, quality and finance in one platform.',
    points: ['Real-time inventory', 'Production & BOM', 'Finance & reporting'],
  },
  {
    name: 'EFWRSX Cloud',
    tag: 'Field Work Reporting',
    text: 'Mobile-first evidence capture that turns on-site photos and checklists into branded customer reports.',
    points: ['Offline-first capture', 'Branded PDF reports', 'Secure share links'],
  },
];

const Home: React.FC<HomeProps> = ({ caseStudies, seo }) => {
  useReveal(styles.visible);

  // Featured services shown in "Our Expertise"
  const featuredServices = [
    {
      id: 'custom-software-development',
      title: 'Custom Software Development',
      shortDescription: 'Tailored software solutions designed specifically for your business needs.',
      icon: 'FaCode',
      tags: ['Web Apps', 'Desktop Software']
    },
    {
      id: 'erp-implementation',
      title: 'ERP Implementation',
      shortDescription: 'ERP solutions for manufacturing and enterprise, including our KREVIX ERP platform.',
      icon: 'FaCogs',
      tags: ['KREVIX ERP', 'SAP']
    },
    {
      id: 'web-development',
      title: 'Web Development',
      shortDescription: 'Fast, secure and SEO-friendly websites, portals and web applications.',
      icon: 'FaGlobe',
      tags: ['React', 'Next.js']
    },
    {
      id: 'healthcare-software',
      title: 'Healthcare & Medical Software',
      shortDescription: 'Clinic, hospital and medical product software built with privacy and reliability in mind.',
      icon: 'FaMedical',
      tags: ['Healthcare IT', 'Medical Products']
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      shortDescription: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: 'FaMobile',
      tags: ['iOS', 'Android']
    },
    {
      id: 'iot-solutions',
      title: 'IoT Solutions',
      shortDescription: 'Internet of Things solutions for smart manufacturing and automation.',
      icon: 'FaWifi',
      tags: ['Industrial IoT', 'Smart Sensors']
    },
    {
      id: 'ai-ml-solutions',
      title: 'AI & ML Solutions',
      shortDescription: 'Artificial Intelligence and Machine Learning solutions for predictive analytics.',
      icon: 'FaBrain',
      tags: ['Predictive Analytics', 'Automation']
    },
    {
      id: 'cloud-migration',
      title: 'Cloud Migration',
      shortDescription: 'Seamless migration of your applications and data to cloud platforms.',
      icon: 'FaCloud',
      tags: ['AWS', 'Azure']
    },
    {
      id: 'crm-applications',
      title: 'CRM Applications',
      shortDescription: 'Customer relationship management systems to manage leads, sales pipelines and customer service.',
      icon: 'FaAddressBook',
      tags: ['Sales Pipeline', 'Customer 360']
    },
    {
      id: 'cpm-applications',
      title: 'CPM Applications',
      shortDescription: 'Project and performance management tools for planning, scheduling and tracking delivery.',
      icon: 'FaProjectDiagram',
      tags: ['Project Planning', 'Performance Tracking']
    },
    {
      id: 'proptech-applications',
      title: 'PropTech Applications',
      shortDescription: 'Property technology platforms for real estate listings, leasing and facility management.',
      icon: 'FaCity',
      tags: ['Real Estate', 'Property Management']
    },
    {
      id: 'hrtech-applications',
      title: 'HRTech Applications',
      shortDescription: 'HR technology for recruitment, onboarding, payroll, attendance and workforce analytics.',
      icon: 'FaUserTie',
      tags: ['Recruitment', 'Payroll']
    },
    {
      id: 'fintech-applications',
      title: 'Fintech Applications',
      shortDescription: 'Secure financial technology solutions for payments, lending, wallets and trading platforms.',
      icon: 'FaCoins',
      tags: ['Payments', 'Digital Banking']
    },
    {
      id: 'saas-development',
      title: 'SaaS Development',
      shortDescription: 'Scalable multi-tenant SaaS products with subscription billing, from MVP to enterprise scale.',
      icon: 'FaLayerGroup',
      tags: ['Multi-Tenant', 'Subscription Billing']
    }
  ];
  
  const mockIndustries = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Medical equipment manufacturing and healthcare IT solutions.',
      icon: 'FaHeartbeat'
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Financial technology and trading platform solutions.',
      icon: 'FaDollarSign'
    },
    {
      id: 'food-beverage',
      name: 'Food & Beverage',
      description: 'Food processing and beverage manufacturing systems.',
      icon: 'FaUtensils'
    },
    {
      id: 'retail',
      name: 'Retail',
      description: 'E-commerce platforms and retail management systems.',
      icon: 'FaShoppingCart'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      description: 'Automotive manufacturing and supply chain solutions.',
      icon: 'FaCar'
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Educational technology and learning management systems.',
      icon: 'FaGraduationCap'
    }
  ];
  
  const featuredCaseStudies = caseStudies; // Use case studies from API

  return (
    <Layout seo={seo}>
      <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <HeroScene />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              <span className={styles.pulse} /> Software Development &amp; IT Services
            </span>
            <h1 className={styles.heroTitle}>
              Custom <span className={styles.gradientText}>Software</span> Solutions Built Around Your Business
            </h1>
            <p className={styles.heroSubtitle}>
              We design and develop custom software, business applications and intelligent automation
              solutions that help businesses streamline operations, connect systems and scale with confidence.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className={styles.btnGlow} data-analytics-cta="Start Your Project" data-analytics-location="home_hero">
                Start Your Project <FaArrowRight />
              </Link>
              <Link href="/services" className={styles.btnGhost} data-analytics-cta="Explore Services" data-analytics-location="home_hero">
                <FaPlay /> Explore Services
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <strong><CountUp end={28} suffix="+" /></strong>
                <span>Projects Delivered</span>
              </div>
              <div className={styles.heroStat}>
                <strong><CountUp end={8} suffix="+" /></strong>
                <span>Industries Served</span>
              </div>
              <div className={styles.heroStat}>
                <strong><CountUp end={5} suffix="+" /></strong>
                <span>Years in Services</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollHint} aria-hidden="true"><span /></div>
      </section>

      <AutomationFeature />

      {/* Tech marquee */}
      <section className={styles.marquee} aria-label="Technologies we work with">
        <div className={styles.marqueeTrack}>
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className={styles.marqueeItem}>{tech}</span>
          ))}
        </div>
      </section>

      {/* Our Expertise */}
      <section className={styles.servicesSection} id="expertise">
        <div className="container">
          <div className={styles.sectionHeader} data-reveal>
            <span className={styles.kicker}>What We Do</span>
            <h2>Our Expertise</h2>
            <p>End-to-end software, SaaS and IT services that drive digital transformation</p>
          </div>
          <div className={styles.servicesGrid}>
            {featuredServices.map((service, index) => {
              const IconComponent = serviceIcons[service.icon || 'FaCogs'] || FaCog;
              return (
                <Link
                  href="/services"
                  key={service.id}
                  className={styles.serviceCard}
                  data-reveal
                  style={{ transitionDelay: `${(index % 3) * 80}ms` }}
                >
                  <div className={styles.serviceIcon}>
                    <IconComponent />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <div className={styles.serviceTags}>
                    {service.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <span className={styles.serviceArrow}><FaArrowRight /></span>
                </Link>
              );
            })}
          </div>
          <div className={styles.servicesFooter}>
            <Link href="/services" className={styles.btnGlow}>
              View All Services <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeader} data-reveal>
            <span className={styles.kicker}>Our Products</span>
            <h2>Products Built by Technatonix</h2>
            <p>Ready-to-use platforms, shaped by the same engineering standards we bring to client projects</p>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.name} className={styles.productCard} data-reveal>
                <span className={styles.productTag}>{product.tag}</span>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
                <ul>
                  {product.points.map((point) => (
                    <li key={point}><FaCheckCircle /> {point}</li>
                  ))}
                </ul>
                <Link href="/products" className={styles.textLink}>
                  Learn more <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader} data-reveal>
            <span className={styles.kicker}>How We Work</span>
            <h2>From Idea to Launch</h2>
            <p>A transparent process that keeps you in control at every stage</p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <div key={step.title} className={styles.processStep} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <span className={styles.stepNumber}>0{i + 1}</span>
                <step.icon className={styles.stepIcon} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className={styles.industries}>
        <div className="container">
          <div className={styles.sectionHeader} data-reveal>
            <span className={styles.kicker}>Industries</span>
            <h2>Industries We Are Transforming</h2>
            <p>Innovative solutions across diverse industry sectors</p>
          </div>
          <div className={styles.industriesGrid}>
            {mockIndustries.map((industry) => {
              const IconComponent = industryIcons[industry.icon] || FaIndustry;
              return (
                <div key={industry.id} className={styles.industryCard} data-reveal>
                  <IconComponent className={styles.industryIcon} />
                  <h4>{industry.name}</h4>
                  <p>{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case studies (only when available) */}
      {featuredCaseStudies.length > 0 && (
        <section id="success-stories" className={styles.casesSection}>
          <div className="container">
            <div className={styles.sectionHeader} data-reveal>
              <span className={styles.kicker}>Service History</span>
              <h2>Software Projects We've Worked On</h2>
              <p>Explore Technatonix projects, products and our team's project experience.</p>
            </div>
            <div className={styles.caseStudiesGrid}>
              {featuredCaseStudies.map((project) => (
                <div key={project.slug} className={styles.caseStudyCard} data-reveal>
                  <h3>{project.title}</h3>
                  <p className={styles.clientName}>{project.attribution}</p>
                  <p className={styles.caseStudyExcerpt}>{project.overview}</p>
                  <Link href={`/service-history/${project.slug}`} className={styles.textLink}>
                    View Service History <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent} data-reveal>
            <FaClipboardCheck className={styles.ctaIcon} />
            <h2>Ready to Build Your Next Software Product?</h2>
            <p>
              Join businesses worldwide who trust Technatonix for custom software, SaaS and IT services.
              Get started with a free consultation today.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className={styles.btnGlow}>
                Get Started Today <FaArrowRight />
              </Link>
              <Link href="/service-history" className={styles.btnGhost}>
                View Service History
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
  const seo: SEOProps = {
    title: 'The Technatonix | Custom Software, AI Automation & Intelligent Systems',
    description: 'The Technatonix helps businesses grow through custom software development, intelligent automation, business applications and integrated technology solutions.',
    canonical: 'https://technatonix.com',
    openGraph: {
      title: 'Technatonix - Software Development & IT Services | SaaS, CRM, ERP & Custom Software',
      description: 'Full-service software house delivering custom software, SaaS products, web and mobile apps, CRM, ERP and industry solutions. Trusted by businesses worldwide.',
      type: 'website'
    },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Technatonix',
        alternateName: 'Technatonix Software House',
        description: 'Full-service software development and IT services company offering custom software, SaaS products, web and mobile applications, CRM, ERP, HRTech, PropTech, Fintech, healthcare software, cloud, AI and IoT solutions.',
        url: 'https://www.technatonix.com/',
        logo: 'https://www.technatonix.com/logo.png',
        foundingDate: '2021',
        numberOfEmployees: '50-100',
        industry: 'Software Development',
        sameAs: [
          'https://www.linkedin.com/company/the-technatonix-pvt/',
          'https://www.instagram.com/thetechnatonix/',
          'https://www.facebook.com/thetechnatonix'
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+923027163067',
            contactType: 'customer service',
            areaServed: 'PK'
          }
        ],
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'International Market, M Block, Model Town',
            addressLocality: 'Lahore',
            addressCountry: 'PK'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'The Technatonix',
            url: 'https://www.technatonix.com/',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: '30 N Gould St Ste N',
            addressLocality: 'Sheridan',
            addressRegion: 'WY',
            postalCode: '82801',
            addressCountry: 'US'
          }
        ],
        serviceArea: 'Worldwide'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Software Development Services',
        provider: {
          '@type': 'Organization',
          name: 'Technatonix'
        },
        serviceType: ['Custom Software Development', 'SaaS Development', 'Web Development', 'Mobile App Development', 'CRM Applications', 'ERP Systems', 'Cloud Solutions', 'AI & ML Solutions', 'IoT Solutions', 'IT Consulting'],
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Software Development',
                description: 'Tailored software solutions for business needs'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SaaS Development',
                description: 'Scalable multi-tenant SaaS products with subscription billing'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Development',
                description: 'Websites, portals and web applications'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'CRM, ERP and Industry Software',
                description: 'CRM, ERP, HRTech, PropTech, Fintech and healthcare applications'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App Development',
                description: 'iOS and Android mobile application development'
              }
            }
          ]
        }
      }
    ]
  };

  try {
    const caseStudies = (await getProjectExperience()).slice(0, 3);

    return {
      props: {
        caseStudies,
        seo,
      },
    };
  } catch (error) {
    console.error('Failed to fetch case studies for homepage:', error);
    
    // Return empty array on error
    return {
      props: {
        caseStudies: [],
        seo,
      },
    };
  }
};

export default Home;
