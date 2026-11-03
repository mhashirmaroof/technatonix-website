import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { SEOProps } from '@/types';
import styles from '@/styles/About.module.scss';
import Link from 'next/link';
import { FaUsers, FaGlobeAmericas, FaAward, FaCog, FaRocket, FaHandshake, FaEye, FaBullseye, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

interface AboutProps {
  seo: SEOProps;
}

const About: React.FC<AboutProps> = ({ seo }) => {
  const stats = [
    { value: '28+', label: 'Projects Delivered', icon: <FaRocket /> },
    { value: '8+', label: 'Industries Served', icon: <FaGlobeAmericas /> },
    { value: '14+', label: 'Global Clients', icon: <FaUsers /> },
    { value: '99%', label: 'Client Satisfaction', icon: <FaAward /> }
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in enterprise software development and technology strategy.',
      image: '/images/team/alex-thompson.jpg',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Technology expert specializing in cloud architecture, SaaS platforms, and enterprise integration.',
      image: '/images/team/sarah-johnson.jpg',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Michael Chen',
      role: 'VP of Engineering',
      bio: 'Full-stack development leader with expertise in web platforms, enterprise software and automation systems.',
      image: '/images/team/michael-chen.jpg',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Emily Foster',
      role: 'Head of Design',
      bio: 'UX/UI expert focused on creating intuitive interfaces for complex enterprise applications.',
      image: '/images/team/emily-foster.jpg',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const values = [
    {
      icon: <FaHandshake />,
      title: 'Client Partnership',
      description: 'We build long-term partnerships with our clients, understanding their unique challenges and growing with their business.'
    },
    {
      icon: <FaRocket />,
      title: 'Innovation First',
      description: 'We stay at the forefront of technology, continuously exploring new solutions to deliver cutting-edge software.'
    },
    {
      icon: <FaCog />,
      title: 'Quality Excellence',
      description: 'Every solution we deliver meets the highest standards of quality, performance, and reliability.'
    },
    {
      icon: <FaGlobeAmericas />,
      title: 'Global Impact',
      description: 'We serve clients worldwide, bringing local expertise with global perspective and reach.'
    }
  ];

  return (
    <Layout seo={seo}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Building Software &amp; IT Solutions That Move Businesses Forward</h1>
            <p>
              Founded in 2021, Technatonix is a full-service software development and IT services company, 
              delivering custom software, SaaS products and digital solutions that drive efficiency, growth, and innovation worldwide.
            </p>
            <div className={styles.heroStats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2>Our Story</h2>
              <p>
                Technatonix was born from a simple observation: businesses were struggling with 
                outdated software systems that couldn't keep pace with modern demands. Our founders, 
                with deep experience in software engineering and enterprise technology, set out to bridge this gap.
              </p>
              <p>
                What started as a small team of passionate developers has grown into a global software house 
                serving clients across the UK, Germany, Switzerland, Singapore, UAE, and beyond. Today, 
                we're proud to be the trusted technology partner for businesses that demand excellence.
              </p>
              <p>
                We build custom software, SaaS products, web and mobile apps, CRM, ERP, HRTech, PropTech, Fintech and 
                healthcare solutions, supported by cloud, AI and IoT expertise. Our own products, such as KREVIX ERP and 
                EFWRSX Cloud, reflect the same engineering standards we bring to every client project.
              </p>
            </div>
            <div className={styles.storyImage}>
              <img src="/images/about/our-story.jpg" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionVision}>
        <div className="container">
          <div className={styles.mvGrid}>
            <div className={styles.mvCard}>
              <div className={styles.mvIcon}>
                <FaBullseye />
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower businesses worldwide with innovative software and IT solutions that streamline 
                operations, reduce costs, and accelerate growth through technology-driven transformation.
              </p>
            </div>
            <div className={styles.mvCard}>
              <div className={styles.mvIcon}>
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be a globally trusted software and IT services partner, setting the standard for 
                innovation, quality, and client success across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team (hidden for now) */}
      {false && (
      <section className={styles.team}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Meet Our Leadership Team</h2>
            <p>Experienced professionals driving innovation and excellence</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <div className={styles.memberSocial}>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Global Presence */}
      <section className={styles.globalPresence}>
        <div className="container">
          <div className={styles.presenceContent}>
            <div className={styles.presenceText}>
              <h2>Global Presence, Local Expertise</h2>
              <p>
                With clients across multiple continents, we understand the unique challenges and 
                opportunities in different markets. Our global perspective combined with deep 
                local knowledge allows us to deliver solutions that work in any business environment.
              </p>
              <div className={styles.regions}>
                <div className={styles.region}>
                  <strong>Europe</strong>
                  <span>United Kingdom, Germany, Switzerland</span>
                </div>
                <div className={styles.region}>
                  <strong>Asia Pacific</strong>
                  <span>Singapore, Australia, Pakistan</span>
                </div>
                <div className={styles.region}>
                  <strong>Middle East</strong>
                  <span>United Arab Emirates, Saudi Arabia</span>
                </div>
              </div>
            </div>
            <div className={styles.presenceMap}>
              <img src="/images/about/global-map.svg" alt="Global Presence" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Next Project?</h2>
            <p>
              Join businesses worldwide who trust Technatonix to power their digital transformation.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn-primary">
                Start Your Journey
              </Link>
              <Link href="/case-studies" className="btn-secondary">
                See Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<AboutProps> = async () => {
  const seo: SEOProps = {
    title: 'About Technatonix - Leading Software House | Software Development Company',
    description: 'Technatonix is a premier software house and software development company delivering custom software development, SaaS products, web and mobile apps, CRM, ERP and IT services across industries. Trusted by 14+ clients worldwide.',
    canonical: 'https://technatonix.com/about',
    openGraph: {
      title: 'About Technatonix - Premier Software House & Development Company',
      description: 'Full-service software house providing custom software, SaaS, web and mobile apps and IT services. Serving 14+ clients globally.',
      image: '/images/about-og.jpg',
      type: 'website'
    }
  };

  return {
    props: {
      seo,
    },
  };
};

export default About;
