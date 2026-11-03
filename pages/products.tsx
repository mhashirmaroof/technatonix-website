import React, { useState } from 'react';
import EfwrsxProduct from '@/components/EfwrsxProduct';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { Product, SEOProps } from '@/types';
import styles from '@/styles/Products.module.scss';
import Link from 'next/link';
import { FaDownload, FaPlay, FaCheckCircle, FaCog, FaChartLine, FaShieldAlt, FaDollarSign, FaRocket, FaClock, FaUsers, FaIndustry, FaSync } from 'react-icons/fa';

interface ProductsProps {
  products: Array<Omit<Product, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  }>;
  seo: SEOProps;
}

const Products: React.FC<ProductsProps> = ({ products, seo }) => {
  const krevixProduct = products[0]; // Main product
  const [activeTab, setActiveTab] = useState<'krevix' | 'efwrsx'>('krevix');

  const activeSeo: SEOProps = activeTab === 'efwrsx'
    ? {
        ...seo,
        title: 'EFWRSX Cloud - Field Work Reporting Software | Technatonix Software House',
        description: 'EFWRSX Cloud (Electronic Field Work Reporting System eXchange) - mobile-first field evidence capture, checklists, branded PDF reports and secure share links for service professionals. Built by Technatonix.',
        openGraph: {
          ...seo.openGraph!,
          title: 'EFWRSX Cloud - Field Work Reporting Platform by Technatonix',
          description: 'Capture photos, checklists and notes on site and share branded reports with customers in seconds.',
        },
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'EFWRSX Cloud',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'iOS, Android, Web',
          description: 'Mobile-first field evidence and job-completion reporting platform.',
        },
      }
    : seo;

  return (
    <Layout seo={activeSeo}>
      <div className={styles.productsPage}>
        <div className={styles.tabsBar}>
          <div className="container">
            <div className={styles.tabs} role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'krevix'}
                className={`${styles.tab} ${activeTab === 'krevix' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('krevix')}
              >
                KREVIX ERP
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'efwrsx'}
                className={`${styles.tab} ${activeTab === 'efwrsx' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('efwrsx')}
              >
                EFWRSX Cloud
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'efwrsx' ? (
          <EfwrsxProduct />
        ) : (
        <>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.title}>KREVIX ERP</h1>
                <p className={styles.subtitle}>
                  Inventory-First ERP Solution Built for Modern Manufacturing
                </p>
                <p className={styles.description}>
                  {krevixProduct.longDescription}
                </p>
                <div className={styles.heroButtons}>
                  <Link href="/contact" className="btn-primary">
                    <FaPlay /> Request Demo
                  </Link>
                  {krevixProduct.datasheetUrl && (
                    <Link href={krevixProduct.datasheetUrl} className="btn-secondary" target="_blank">
                      <FaDownload /> Download Datasheet
                    </Link>
                  )}
                </div>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.productPreview}>
                  <div className={styles.screenshot}>
                    <img src="/images/krevix-dashboard-preview.jpg" alt="KREVIX ERP Dashboard" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className={styles.benefits}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Why Choose KREVIX ERP?</h2>
              <p>Built specifically for manufacturers who need real-time visibility and control over their entire operation. 
              Experience the power of 100% automation with zero-code configuration that gets you operational in days, not months.</p>
            </div>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <FaRocket className={styles.benefitIcon} />
                <h3>Zero-Code Configuration</h3>
                <p>Get operational in days, not months. No complex setup or programming required - business logic works automatically</p>
              </div>
              <div className={styles.benefitCard}>
                <FaCog className={styles.benefitIcon} />
                <h3>100% Automation</h3>
                <p>Revolutionary automation engine eliminates manual work. From PO→Instock→Sales to financial transactions - everything is automatic</p>
              </div>
              <div className={styles.benefitCard}>
                <FaIndustry className={styles.benefitIcon} />
                <h3>Manufacturing-First Design</h3>
                <p>Built specifically for manufacturing with BOM management, work orders, batch tracking, and complete traceability</p>
              </div>
              <div className={styles.benefitCard}>
                <FaChartLine className={styles.benefitIcon} />
                <h3>Real-Time Intelligence</h3>
                <p>Live production metrics, inventory levels, and financial data with advanced analytics and forecasting</p>
              </div>
              <div className={styles.benefitCard}>
                <FaShieldAlt className={styles.benefitIcon} />
                <h3>Enterprise Security</h3>
                <p>Bank-level security with multi-tenant architecture, role-based access control, and automatic audit trails</p>
              </div>
              <div className={styles.benefitCard}>
                <FaUsers className={styles.benefitIcon} />
                <h3>Multi-Warehouse Ready</h3>
                <p>Perfect data segregation across warehouses with organization-level admin controls and team management</p>
              </div>
              <div className={styles.benefitCard}>
                <FaClock className={styles.benefitIcon} />
                <h3>Instant ROI</h3>
                <p>Eliminate manual inventory management, reduce errors by 90%, and increase efficiency from day one</p>
              </div>
              <div className={styles.benefitCard}>
                <FaSync className={styles.benefitIcon} />
                <h3>Seamless Integration</h3>
                <p>Universal API, cross-module automation, and ready-to-integrate architecture for third-party systems</p>
              </div>
              <div className={styles.benefitCard}>
                <FaDollarSign className={styles.benefitIcon} />
                <h3>Intelligent BOM & Work Orders</h3>
                <p>Smart Bill of Materials with auto-costing, multi-level BOMs, and dynamic work order scheduling with resource optimization</p>
              </div>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className={styles.modules}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Complete ERP Modules</h2>
              <p>Everything you need to run your manufacturing business efficiently</p>
            </div>
            <div className={styles.modulesGrid}>
              {krevixProduct.modules.map((module, index) => (
                <div key={index} className={styles.moduleCard}>
                  <h3>{module.name}</h3>
                  <p>{module.description}</p>
                  {module.features && (
                    <ul className={styles.featureList}>
                      {module.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <FaCheckCircle className={styles.checkIcon} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className={styles.screenshots}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>See KREVIX in Action</h2>
              <p>Explore the intuitive interface designed for manufacturing professionals</p>
            </div>
            <div className={styles.screenshotsGrid}>
              {krevixProduct.screenshots.map((screenshot, index) => (
                <div key={index} className={styles.screenshotCard}>
                  <img src={screenshot} alt={`KREVIX ERP Screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Matrix */}
        <section className={styles.featureMatrix}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Feature Comparison</h2>
              <p>See what sets KREVIX apart from traditional ERP solutions</p>
            </div>
            <div className={styles.matrixTable}>
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Traditional ERP</th>
                    <th>KREVIX ERP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Real-time Inventory Tracking</td>
                    <td>❌ Limited</td>
                    <td>✅ Complete</td>
                  </tr>
                  <tr>
                    <td>Automated Reordering</td>
                    <td>❌ Basic</td>
                    <td>✅ AI-Powered</td>
                  </tr>
                  <tr>
                    <td>Quality Management</td>
                    <td>❌ Separate System</td>
                    <td>✅ Integrated</td>
                  </tr>
                  <tr>
                    <td>Mobile Access</td>
                    <td>❌ Limited</td>
                    <td>✅ Full Mobile App</td>
                  </tr>
                  <tr>
                    <td>Deployment Time</td>
                    <td>❌ 6-12 months</td>
                    <td>✅ 4-8 weeks</td>
                  </tr>
                  <tr>
                    <td>Industry-Specific Features</td>
                    <td>❌ Generic</td>
                    <td>✅ Manufacturing-First</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Ready to See KREVIX in Action?</h2>
              <p>
                Schedule a personalized demo and discover how KREVIX ERP can transform 
                your manufacturing operations.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className="btn-primary">
                  Schedule Demo
                </Link>
                <Link href="/case-studies" className="btn-secondary">
                  View Success Stories
                </Link>
              </div>
            </div>
          </div>
        </section>
        </>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = [{
    id: 'krevix-erp',
    name: 'KREVIX ERP',
    tagline: 'Inventory-First ERP for Manufacturing Excellence',
    shortDescription: 'Revolutionary ERP solution designed specifically for manufacturing companies, featuring real-time inventory tracking and automated workflows.',
    longDescription: 'KREVIX ERP is a comprehensive enterprise resource planning solution built from the ground up for manufacturing companies. Our inventory-first approach ensures real-time visibility into stock levels, automated reordering, and seamless integration with production planning. From small manufacturers to large enterprises, KREVIX scales with your business.',
    version: '2.1.4',
    published: true,
    featured: true,
    category: 'ERP',
    pricing: {
      model: 'subscription',
      startingPrice: 149,
      currency: 'USD',
      period: 'month'
    },
    features: [
      'Real-time Inventory Management',
      'Automated Purchase Orders', 
      'Production Planning & Scheduling',
      'Quality Management System',
      'Financial Reporting & Analytics',
      'Multi-location Support',
      'Barcode & RFID Integration',
      'Mobile Access'
    ],
    modules: [
      {
        name: 'Inventory Management',
        description: 'Real-time inventory tracking with automated reordering and stock optimization.',
        features: ['Real-time Stock Levels', 'Automated Reordering', 'ABC Analysis', 'Stock Forecasting']
      },
      {
        name: 'Production Planning',
        description: 'Advanced production scheduling and capacity planning tools.',
        features: ['Production Scheduling', 'Capacity Planning', 'Work Order Management', 'Resource Allocation']
      },
      {
        name: 'Quality Management',
        description: 'Comprehensive quality control and assurance system.',
        features: ['Quality Inspections', 'Non-Conformance Tracking', 'Corrective Actions', 'Statistical Analysis']
      },
      {
        name: 'Financial Management',
        description: 'Complete financial management with real-time reporting.',
        features: ['General Ledger', 'Accounts Payable/Receivable', 'Cost Accounting', 'Financial Reports']
      },
      {
        name: 'Purchase Management',
        description: 'Streamlined procurement and vendor management.',
        features: ['Purchase Orders', 'Vendor Management', 'RFQ Processing', 'Supplier Performance']
      },
      {
        name: 'Sales Management',
        description: 'End-to-end sales process management.',
        features: ['Order Management', 'Customer Portal', 'Sales Analytics', 'CRM Integration']
      }
    ],
    screenshots: [
      '/images/krevix-dashboard.jpg',
      '/images/krevix-inventory.jpg',
      '/images/krevix-production.jpg',
      '/images/krevix-reports.jpg'
    ],
    industries: ['Manufacturing', 'Distribution', 'Assembly'],
    integrations: ['QuickBooks', 'SAP', 'Salesforce', 'Shopify'],
    datasheetUrl: '/downloads/krevix-erp-datasheet.pdf',
    demoUrl: '/demo/krevix-erp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }];

  const seo: SEOProps = {
    title: 'Products | KREVIX ERP & EFWRSX Cloud | Technatonix Software House',
    description: 'Explore Technatonix products: KREVIX ERP for manufacturing (inventory, production, quality, finance) and EFWRSX Cloud, a field work evidence and reporting platform for service professionals.',
    canonical: 'https://technatonix.com/products',
    openGraph: {
      title: 'KREVIX ERP & EFWRSX Cloud - Software Products by Technatonix',
      description: 'KREVIX ERP for manufacturing excellence and EFWRSX Cloud for field work reporting, built by Technatonix.',
      type: 'website',
      image: '/images/og-krevix-erp.jpg'
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'KREVIX ERP',
      applicationCategory: 'Enterprise Resource Planning',
      operatingSystem: 'Web-based',
      description: 'Inventory-first ERP solution designed specifically for manufacturing industries',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    }
  };

  return {
    props: {
      products,
      seo,
    },
  };
};

export default Products;
