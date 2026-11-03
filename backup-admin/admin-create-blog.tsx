import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '../components/AdminLayout';
import ImageUploader from '../components/ImageUploader';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/AdminForm.module.scss';

const AdminCreateBlog: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Admin',
    tags: '',
    readTime: 5,
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
      featuredImage: base64
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Blog created successfully!');
        router.push('/admin-blogs');
      } else {
        alert(result.error || 'Failed to create blog');
      }
    } catch (error) {
      console.error('Creation error:', error);
      alert('Error creating blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Blog | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Create New Blog" currentPage="create-blog">
        <div className={styles.formHeader}>
          <Link href="/admin-blogs" className={styles.backButton}>
            <FaArrowLeft />
            Back to Blogs
          </Link>
        </div>

        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of the blog post"
                rows={3}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <ImageUploader
              onImageUpload={handleImageUpload}
              label="Featured Image"
              maxSizeMB={5}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="content">Content *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                rows={15}
                required
                className={styles.contentEditor}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="readTime">Read Time (minutes)</label>
              <input
                type="number"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                min="1"
                max="60"
                placeholder="5"
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
                placeholder="ai, technology, innovation"
              />
            </div>
          </div>

          <div className={styles.formRow}>
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
            <Link href="/admin-blogs" className={styles.cancelButton}>
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
                  Create Blog
                </>
              )}
            </button>
          </div>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminCreateBlog;
