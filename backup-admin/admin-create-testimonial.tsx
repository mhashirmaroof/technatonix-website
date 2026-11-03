import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '../components/AdminLayout';
import ImageUploader from '../components/ImageUploader';
import { FaSave, FaArrowLeft, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/AdminForm.module.scss';

const AdminCreateTestimonial: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    testimonial: '',
    avatar: '',
    rating: 5,
    featured: false,
    published: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
             name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleImageUpload = (base64: string, fileName: string) => {
    setFormData(prev => ({
      ...prev,
      avatar: base64
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.testimonial.trim() || !formData.company.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Testimonial created successfully!');
        router.push('/admin-testimonials');
      } else {
        alert(result.error || 'Failed to create testimonial');
      }
    } catch (error) {
      console.error('Creation error:', error);
      alert('Error creating testimonial');
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            style={{
              color: star <= formData.rating ? '#fbbf24' : '#e5e7eb',
              cursor: 'pointer',
              fontSize: '1.25rem'
            }}
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
          />
        ))}
        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
        </span>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create Testimonial | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Create New Testimonial" currentPage="create-testimonial">
        <div className={styles.formHeader}>
          <Link href="/admin-testimonials" className={styles.backButton}>
            <FaArrowLeft />
            Back to Testimonials
          </Link>
        </div>

        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Client Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter client's full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="position">Position/Title</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="e.g., CEO, CTO, Project Manager"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <ImageUploader
              onImageUpload={handleImageUpload}
              label="Client Avatar/Photo"
              maxSizeMB={2}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="testimonial">Testimonial Text *</label>
              <textarea
                id="testimonial"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleInputChange}
                placeholder="Enter the client's testimonial..."
                rows={6}
                required
                style={{ fontStyle: 'italic' }}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Client Rating</label>
              {renderStarRating()}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <span className={styles.checkboxText}>Mark as featured testimonial</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                />
                <span className={styles.checkboxText}>Publish immediately</span>
              </label>
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/admin-testimonials" className={styles.cancelButton}>
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  Creating...
                </>
              ) : (
                <>
                  <FaSave />
                  Create Testimonial
                </>
              )}
            </button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminCreateTestimonial;
