import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { SEOProps } from '@/types';
import styles from '@/styles/Contact.module.scss';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaFacebook, FaInstagram, FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';

interface ContactProps {
  seo: SEOProps;
}

const Contact: React.FC<ContactProps> = ({ seo }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    shortMessage: '',
    details: ''
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || router.query.inquiry !== 'quote') return;
    setFormData(prev => ({
      ...prev,
      shortMessage: prev.shortMessage || 'I would like to request a quote for my project.'
    }));
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [router.isReady, router.query.inquiry]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'State and country are required';
    }

    if (!formData.shortMessage.trim()) {
      newErrors.shortMessage = 'Please provide a brief message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          country: '',
          phone: '',
          shortMessage: '',
          details: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      region: 'South Asia',
      city: 'Lahore, Pakistan',
      address: 'International Market, M Block, Model Town\nLahore, Pakistan',
      phone: '03448515675',
      email: 'info@technatonix.com',
      hours: 'Mon-Fri 9AM-6PM PKT'
    }
  ];

  return (
    <Layout seo={seo}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Get in Touch</h1>
            <p>
              Have questions about our solutions or want to explore how we can help your business? 
              We're here to discuss your needs and find the right path forward.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2>Get in Touch</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <FaPaperPlane />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <FaExclamationTriangle />
                  <h3>Message Failed to Send</h3>
                  <p>{errorMessage}</p>
                </div>
              )}

              {submitStatus !== 'success' && (
                <form id="contact-form" onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className={errors.name ? styles.error : ''}
                      />
                      {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className={errors.email ? styles.error : ''}
                      />
                      {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="country">State &amp; Country *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Punjab, Pakistan"
                        className={errors.country ? styles.error : ''}
                      />
                      {errors.country && <span className={styles.errorMessage}>{errors.country}</span>}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="shortMessage">Your Message *</label>
                    <textarea
                      id="shortMessage"
                      name="shortMessage"
                      value={formData.shortMessage}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Tell us how we can help you or what you'd like to discuss"
                      className={errors.shortMessage ? styles.error : ''}
                    />
                    {errors.shortMessage && <span className={styles.errorMessage}>{errors.shortMessage}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="details">Additional Details</label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Provide any additional information, questions, or specific topics you'd like to discuss..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <FaPaperPlane />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <div className={styles.contactCard}>
                <h3>Quick Contact</h3>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <div>
                    <strong>Phone</strong>
                    <p>Pakistan: 03448515675</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <div>
                    <strong>General Inquiries</strong>
                    <p>info@technatonix.com</p>
                    <strong>Demo Requests</strong>
                    <p>demo@technatonix.com</p>
                    <strong>Business Inquiries</strong>
                    <p>business@technatonix.com</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <FaClock className={styles.contactIcon} />
                  <div>
                    <strong>Response Time</strong>
                    <p>Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialCard}>
                <h3>Connect With Us</h3>
                <div className={styles.socialLinks}>
                  <a href="https://www.linkedin.com/company/the-technatonix-pvt" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                    LinkedIn
                  </a>
                  <a href="https://www.facebook.com/thetechnatonix" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/thetechnatonix/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                    Instagram
                  </a>
                </div>
              </div>

              <div className={styles.scheduleCard}>
                <h3>Schedule a Demo</h3>
                <p>Book a call to discuss your project or see our products, such as KREVIX ERP and EFWRSX Cloud, in action.</p>
                <button className="btn-secondary">
                  Book Demo Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className={styles.offices}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Global Offices</h2>
            <p>We're here to serve you across multiple time zones and regions</p>
          </div>
          <div className={styles.officesGrid}>
            {offices.map((office, index) => (
              <div key={index} className={styles.officeCard}>
                <h3>{office.region}</h3>
                <h4>{office.city}</h4>
                <div className={styles.officeDetails}>
                  <div className={styles.officeItem}>
                    <FaMapMarkerAlt />
                    <span>{office.address}</span>
                  </div>
                  <div className={styles.officeItem}>
                    <FaPhone />
                    <span>{office.phone}</span>
                  </div>
                  <div className={styles.officeItem}>
                    <FaEnvelope />
                    <span>{office.email}</span>
                  </div>
                  <div className={styles.officeItem}>
                    <FaClock />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our services and processes</p>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>How long does a typical software project take?</h3>
              <p>It depends on scope and complexity. An MVP or small web/mobile app typically takes 6-12 weeks, while larger SaaS, CRM or ERP projects take longer. We share a clear timeline after discovery.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you provide ongoing support after deployment?</h3>
              <p>Yes, we offer comprehensive support packages including 24/7 technical support, regular updates, training, and maintenance services.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Can you integrate with our existing systems?</h3>
              <p>Absolutely. Our solutions are built with integration in mind and can connect with most existing enterprise systems through APIs and standard protocols.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>What industries do you specialize in?</h3>
              <p>We serve 15+ industries including healthcare, finance, real estate, HR, retail, education, manufacturing and more, with solutions such as SaaS, CRM, ERP, HRTech, PropTech and Fintech.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<ContactProps> = async () => {
  const seo: SEOProps = {
    title: 'Contact Technatonix - Leading Software House | Get Custom Software Development Quote',
    description: 'Contact Technatonix for custom software development, SaaS products, web and mobile apps, CRM, ERP and IT services. Free consultation, 24-hour response. Based in Lahore, Pakistan.',
    canonical: 'https://technatonix.com/contact',
    openGraph: {
      title: 'Contact Leading Software House - Technatonix | Software Development Services',
      description: 'Get in touch with expert software developers. Free consultation for custom software, SaaS, web and mobile apps, and enterprise solutions.',
      image: '/images/contact-og.jpg',
      type: 'website'
    }
  };

  return {
    props: {
      seo,
    },
  };
};

export default Contact;
