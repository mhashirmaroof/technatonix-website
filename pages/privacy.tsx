import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Legal.module.scss';
import { SEOProps } from '../types';

interface PrivacyProps {
  seo: SEOProps;
}

const Privacy: React.FC<PrivacyProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <div className={styles.legalPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1>Privacy Policy</h1>
              <p>How we collect, use, and protect your personal information</p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.content}>
          <div className="container">
            <div className={styles.legalContent}>
              <div className={styles.lastUpdated}>
                <p>Last updated: September 25, 2025</p>
              </div>

              <div className={styles.section}>
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  request a demo, contact us, or use our services. This may include:
                </p>
                <ul>
                  <li>Name, email address, and contact information</li>
                  <li>Company name and job title</li>
                  <li>Business requirements and project details</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Communicate with you about products, services, and events</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>3. Information Sharing</h2>
                <p>
                  We do not sell, rent, or share your personal information with third parties except 
                  as described in this policy. We may share your information:
                </p>
                <ul>
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and property</li>
                  <li>With service providers who assist us in operating our business</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. We use 
                  industry-standard encryption and security protocols.
                </p>
              </div>

              <div className={styles.section}>
                <h2>5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to improve your experience 
                  on our website. You can control cookies through your browser settings.
                </p>
              </div>

              <div className={styles.section}>
                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className={styles.contact}>
                  <p>Email: info@technatonix.com</p>
                  <p>Address: International Market, M Block, Model Town, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const seo: SEOProps = {
    title: 'Privacy Policy - Technatonix',
    description: 'Learn how Technatonix collects, uses, and protects your personal information. Read our comprehensive privacy policy.',
    canonical: 'https://technatonix.com/privacy',
    openGraph: {
      title: 'Privacy Policy - Technatonix',
      description: 'Learn how Technatonix collects, uses, and protects your personal information.',
      type: 'website'
    }
  };

  return {
    props: {
      seo,
    },
  };
}

export default Privacy;
