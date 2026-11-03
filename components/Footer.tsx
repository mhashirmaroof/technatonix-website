import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const siteSettings = {
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/the-technatonix-pvt/', icon: 'FaLinkedin' },
      { platform: 'Instagram', url: 'https://www.instagram.com/thetechnatonix/', icon: 'FaInstagram' },
      { platform: 'Facebook', url: 'https://www.facebook.com/thetechnatonix', icon: 'FaFacebook' }
    ],
    phoneNumbers: [
      { number: '03448515675', country: 'Pakistan' }
    ],
    contactEmail: 'info@technatonix.com',
    offices: [
      { address: 'International Market, M Block, Model Town', city: 'Lahore, Pakistan', country: 'Pakistan' }
    ]
  };

  const footerLinks = {
    services: [
      { name: 'Custom Software Development', href: '/services/custom-software-development' },
      { name: 'SaaS Development', href: '/services' },
      { name: 'Web & Mobile App Development', href: '/services' },
      { name: 'CRM, ERP & Industry Solutions', href: '/services' },
      { name: 'System Integration', href: '/services/system-integration' },
      { name: 'Cloud Migration', href: '/services/cloud-migration' },
      { name: 'Managed Services', href: '/services/managed-services' },
      { name: 'Technology Consulting', href: '/services/consulting' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <h3>Technatonix</h3>
              <p className={styles.tagline}>
                Full-service software house delivering custom software, SaaS products and IT services to businesses worldwide.
              </p>
            </div>
            
            <div className={styles.socialLinks}>
              {siteSettings.socialLinks.map((social) => {
                const IconComponent = social.icon === 'FaLinkedin' ? FaLinkedin : 
                                    social.icon === 'FaInstagram' ? FaInstagram : FaFacebook;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.platform}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4>Services</h4>
            <ul className={styles.linkList}>
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerSection}>
            <h4>Company</h4>
            <ul className={styles.linkList}>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4>Global Offices</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaEnvelope />
                <span>{siteSettings.contactEmail}</span>
              </div>
              {siteSettings.offices.map((office, index) => (
                <div key={index} className={styles.officeInfo}>
                  <div className={styles.contactItem}>
                    <FaMapMarkerAlt />
                    <span>
                      <strong>{office.country}</strong><br />
                      {office.address}<br />
                      {office.city}
                    </span>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <span>{siteSettings.phoneNumbers[index]?.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p>&copy; {currentYear} Technatonix. All rights reserved.</p>
            <div className={styles.legalLinks}>
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link href={link.href} className={styles.legalLink}>
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
