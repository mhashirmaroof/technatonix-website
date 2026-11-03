import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '../components/AdminLayout';
import ImageUploader from '../components/ImageUploader';
import { FaSave, FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/AdminForm.module.scss';

const AdminCreateCaseStudy: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    clientLogo: '',
    problem: '',
    solution: '',
    results: '',
    metrics: [{ label: '', value: '', description: '' }],
    techStack: '',
    images: [''],
    tags: '',
    published: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = (base64: string, fileName: string) => {
    setFormData(prev => ({
      ...prev,
      images: [base64, ...prev.images.slice(1)] // Replace first image
    }));
  };

  const handleMetricChange = (index: number, field: string, value: string) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      metrics: newMetrics
    }));
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '', description: '' }]
    }));
  };

  const removeMetric = (index: number) => {
    if (formData.metrics.length > 1) {
      setFormData(prev => ({
        ...prev,
        metrics: prev.metrics.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.clientName.trim() || !formData.problem.trim() || !formData.solution.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.results.trim()) {
      alert('Please provide case study results');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          techStack: formData.techStack.split(',').map(t => t.trim()).filter(t => t),
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
          metrics: formData.metrics.filter(m => m.label && m.value),
          images: formData.images.filter(img => img.trim())
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Case study created successfully!');
        router.push('/admin-case-studies');
      } else {
        alert(result.error || 'Failed to create case study');
      }
    } catch (error) {
      console.error('Creation error:', error);
      alert('Error creating case study');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Case Study | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Create New Case Study" currentPage="create-case-study">
        <div className={styles.formHeader}>
          <Link href="/admin-case-studies" className={styles.backButton}>
            <FaArrowLeft />
            Back to Case Studies
          </Link>
        </div>

        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Case Study Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter case study title"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="clientName">Client Name *</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Client or company name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="clientLogo">Client Logo URL</label>
              <input
                type="text"
                id="clientLogo"
                name="clientLogo"
                value={formData.clientLogo}
                onChange={handleInputChange}
                placeholder="URL to client logo image"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <ImageUploader
              onImageUpload={handleImageUpload}
              label="Case Study Images"
              maxSizeMB={5}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="problem">Challenge/Problem *</label>
              <textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
                placeholder="Describe the client's challenge or problem"
                rows={6}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="solution">Solution *</label>
              <textarea
                id="solution"
                name="solution"
                value={formData.solution}
                onChange={handleInputChange}
                placeholder="Describe your solution"
                rows={6}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="results">Results & Impact *</label>
              <textarea
                id="results"
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                placeholder="Describe the results and impact of your solution"
                rows={6}
                required
              />
            </div>
          </div>

          {/* Metrics Section */}
          <div className={styles.formSection}>
            <h3>Key Metrics</h3>
            <p>Add measurable results and achievements</p>
            
            {formData.metrics.map((metric, index) => (
              <div key={index} className={styles.dynamicField}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Metric value (e.g., 40%, $2M, 6 months)"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Metric label (e.g., Efficiency Increase, Cost Savings)"
                      value={metric.label}
                      onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={metric.description}
                      onChange={(e) => handleMetricChange(index, 'description', e.target.value)}
                    />
                  </div>
                  {formData.metrics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className={styles.removeButton}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addMetric}
              className={styles.addButton}
            >
              <FaPlus /> Add Metric
            </button>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="techStack">Technology Stack (comma-separated)</label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="React, Node.js, PostgreSQL, AWS"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="ERP, Manufacturing, Digital Transformation"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
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
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              <FaSave />
              {loading ? 'Creating...' : 'Create Case Study'}
            </button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminCreateCaseStudy;
