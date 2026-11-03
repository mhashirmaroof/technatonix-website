import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Legal.module.scss';
import { SEOProps } from '../types';

interface CookiesProps {
  seo: SEOProps;
}

const Cookies: React.FC<CookiesProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <div className={styles.legalPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1>Cookie Policy</h1>
              <p>How we use cookies to improve your experience</p>
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
                <h2>1. What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when 
                  you visit our website. They are widely used to make websites work more efficiently 
                  and to provide information to website owners.
                </p>
              </div>

              <div className={styles.section}>
                <h2>2. How We Use Cookies</h2>
                <p>We use cookies for the following purposes:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>3. Types of Cookies We Use</h2>
                
                <div className={styles.cookieType}>
                  <h3>Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you which amount to a 
                    request for services, such as setting your privacy preferences or filling in forms.
                  </p>
                </div>

                <div className={styles.cookieType}>
                  <h3>Analytics Cookies</h3>
                  <p>
                    We use Google Analytics to understand how visitors use our website. These cookies 
                    collect information in an anonymous form, including the number of visitors to the 
                    site and where visitors have come to the site from.
                  </p>
                </div>

                <div className={styles.cookieType}>
                  <h3>Marketing Cookies</h3>
                  <p>
                    These cookies may be set through our site by our advertising partners. They may be 
                    used by those companies to build a profile of your interests and show you relevant 
                    adverts on other sites.
                  </p>
                </div>
              </div>

              <div className={styles.section}>
                <h2>4. Managing Cookies</h2>
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that 
                  are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
                
                <div className={styles.browserInstructions}>
                  <h3>Browser Settings:</h3>
                  <ul>
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
                  </ul>
                </div>
              </div>

              <div className={styles.section}>
                <h2>5. Third-Party Cookies</h2>
                <p>
                  Our website may contain links to other websites. We are not responsible for the 
                  cookie policies of these external sites. Please check their cookie policies directly.
                </p>
                <p>Third-party services we use that may set cookies include:</p>
                <ul>
                  <li>Google Analytics</li>
                  <li>Google Fonts</li>
                  <li>Social media platforms (when embedded content is displayed)</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h2>6. Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. We will notify you of any 
                  changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div className={styles.section}>
                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us:
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
    title: 'Cookie Policy - Technatonix',
    description: 'Learn about how Technatonix uses cookies to improve your browsing experience and website functionality.',
    canonical: 'https://technatonix.com/cookies',
    openGraph: {
      title: 'Cookie Policy - Technatonix',
      description: 'Learn about how Technatonix uses cookies to improve your browsing experience and website functionality.',
      type: 'website'
    }
  };

  return {
    props: {
      seo,
    },
  };
}

export default Cookies;
