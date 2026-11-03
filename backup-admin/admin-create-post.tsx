import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '../components/AdminLayout';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import styles from '../styles/AdminPostForm.module.scss';

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    readTime: '',
    tags: '',
    category: '',
    featured: false,
    published: false,
    image: '',
    metaDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Auto-generate slug from title
      ...(name === 'title' && { slug: value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          content: formData.content || '<p>Content coming soon...</p>'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Post created successfully!');
        router.push('/admin-posts');
      } else {
        alert(result.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Create post error:', error);
      alert('Error creating post');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    'ERP Systems',
    'Cloud Solutions',
    'AI & Machine Learning',
    'Manufacturing',
    'Software Development',
    'Digital Transformation',
    'Cybersecurity',
    'Technology Trends'
  ];

  return (
    <>
      <Head>
        <title>Create New Post | Admin | Technatonix</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Create New Post" currentPage="create-post">
        <div className={styles.postForm}>
          {/* Header */}
          <div className={styles.formHeader}>
            <button onClick={() => router.back()} className={styles.backButton}>
              <FaArrowLeft /> Back to Posts
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title & Slug */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter post title"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="slug">Slug *</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="post-url-slug"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className={styles.formGroup}>
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Brief description of the post (shown in blog listing)"
              />
            </div>

            {/* Content */}
            <div className={styles.formGroup}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                placeholder="Write your post content here (HTML allowed)..."
                className={styles.contentEditor}
              />
              <small>You can use HTML tags for formatting</small>
            </div>

            {/* Author & Read Time */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="author">Author *</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Author name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="readTime">Read Time</label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="5 min read"
                />
              </div>
            </div>

            {/* Category & Tags */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="ERP, Manufacturing, Technology (comma-separated)"
                />
              </div>
            </div>

            {/* Image & Meta Description */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="image">Featured Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/blog/post-image.jpg"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="metaDescription">Meta Description</label>
                <input
                  type="text"
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO description (max 160 characters)"
                  maxLength={160}
                />
              </div>
            </div>

            {/* Options */}
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span>Featured Post</span>
              </label>
              
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                />
                <span>Publish Immediately</span>
              </label>
            </div>

            {/* Submit */}
            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.saveButton}
              >
                <FaSave />
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreatePost;
