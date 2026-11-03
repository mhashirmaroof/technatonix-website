import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Legal.module.scss';
import { SEOProps } from '../types';

interface TermsProps {
  seo: SEOProps;
}

const Terms: React.FC<TermsProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <div className={styles.legalPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1>Terms of Service</h1>
              <p>Terms and conditions for using Technatonix services</p>
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
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Technatonix services, you accept and agree to be bound by 
                  the terms and provision of this agreement. These Terms of Service apply to all 
                  visitors, users, and others who access or use our services.
                </p>
              </div>

              <div className={styles.section}>
                <h2>2. Description of Service</h2>
                <p>
                  Technatonix provides software development and IT services, including but not limited to:
                </p>
                <ul>
                  <li>Custom software development and SaaS product development</li>
                  <li>Web and mobile application development</li>
                  <li>Our software products, including KREVIX ERP and EFWRSX Cloud</li>
                  <li>System integration and consulting</li>
                  <li>Cloud migration and managed services</li>
                  <li>Technical support and maintenance</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>3. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding your 
                  account credentials and for all activities that occur under your account.
                </p>
              </div>

              <div className={styles.section}>
                <h2>4. Acceptable Use</h2>
                <p>You agree not to use our services:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>5. Intellectual Property Rights</h2>
                <p>
                  The service and its original content, features, and functionality are and will remain 
                  the exclusive property of Technatonix and its licensors. The service is protected by 
                  copyright, trademark, and other laws.
                </p>
              </div>

              <div className={styles.section}>
                <h2>6. Service Availability</h2>
                <p>
                  We strive to maintain high service availability but cannot guarantee uninterrupted 
                  access. Scheduled maintenance, updates, and unforeseen technical issues may 
                  temporarily affect service availability.
                </p>
              </div>

              <div className={styles.section}>
                <h2>7. Limitation of Liability</h2>
                <p>
                  In no event shall Technatonix, nor its directors, employees, partners, agents, 
                  suppliers, or affiliates, be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising out of your use of the service.
                </p>
              </div>

              <div className={styles.section}>
                <h2>8. Termination</h2>
                <p>
                  We may terminate or suspend your account and access to the service immediately, 
                  without prior notice, for any reason whatsoever, including without limitation 
                  if you breach the Terms.
                </p>
              </div>

              <div className={styles.section}>
                <h2>9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us:
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
    title: 'Terms of Service - Technatonix',
    description: 'Read our terms and conditions for using Technatonix software development and IT services.',
    canonical: 'https://technatonix.com/terms',
    openGraph: {
      title: 'Terms of Service - Technatonix',
      description: 'Read our terms and conditions for using Technatonix software development and IT services.',
      type: 'website'
    }
  };

  return {
    props: {
      seo,
    },
  };
}

export default Terms;
