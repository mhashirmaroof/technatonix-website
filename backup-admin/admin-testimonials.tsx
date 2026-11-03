import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaStar, FaSearch, FaFilter, FaQuoteLeft } from 'react-icons/fa';
import styles from '../styles/AdminContent.module.scss';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  avatar: string;
  rating: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete testimonial from "${name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/testimonials?testimonialId=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
        alert('Testimonial deleted successfully');
      } else {
        alert('Failed to delete testimonial');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting testimonial');
    }
  };

  const togglePublished = async (testimonial: Testimonial) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testimonial,
          published: !testimonial.published,
        }),
      });

      if (response.ok) {
        setTestimonials(testimonials.map(t => 
          t.id === testimonial.id 
            ? { ...t, published: !t.published }
            : t
        ));
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testimonial,
          featured: !testimonial.featured,
        }),
      });

      if (response.ok) {
        setTestimonials(testimonials.map(t => 
          t.id === testimonial.id 
            ? { ...t, featured: !t.featured }
            : t
        ));
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && testimonial.published) ||
                         (filter === 'draft' && !testimonial.published) ||
                         (filter === 'featured' && testimonial.featured);
    
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} style={{ color: i < rating ? '#fbbf24' : '#e5e7eb' }} />
    ));
  };

  if (loading) {
    return (
      <AdminLayout title="Testimonials" currentPage="testimonials">
        <div className={styles.loading}>Loading testimonials...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Testimonials Management | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Testimonials Management" currentPage="testimonials">
        <div className={styles.contentHeader}>
          <div className={styles.headerLeft}>
            <h2>All Testimonials ({filteredTestimonials.length})</h2>
          </div>
          <div className={styles.headerRight}>
            <Link href="/admin-create-testimonial" className={styles.createButton}>
              <FaPlus />
              Create Testimonial
            </Link>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterBox}>
            <FaFilter className={styles.filterIcon} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Testimonials</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>

        {filteredTestimonials.length === 0 ? (
          <div className={styles.emptyState}>
            <FaQuoteLeft className={styles.emptyIcon} />
            <h3>No testimonials found</h3>
            <p>Create your first testimonial to showcase client feedback</p>
            <Link href="/admin-create-testimonial" className={styles.createButton}>
              Create Testimonial
            </Link>
          </div>
        ) : (
          <div className={styles.contentGrid}>
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.contentCard}>
                {testimonial.avatar && (
                  <div className={styles.cardImage} style={{ height: '120px' }}>
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      style={{ borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{testimonial.name}</h3>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.status} ${testimonial.published ? styles.published : styles.draft}`}>
                        {testimonial.published ? 'Published' : 'Draft'}
                      </span>
                      {testimonial.featured && (
                        <span className={`${styles.status} ${styles.featured}`}>
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <strong>{testimonial.position}</strong> at <strong>{testimonial.company}</strong>
                  </div>

                  <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.25rem' }}>
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className={styles.cardExcerpt}>"{testimonial.testimonial}"</p>
                  
                  <div className={styles.cardDetails}>
                    <span className={styles.category}>{testimonial.rating} Stars</span>
                    <span className={styles.date}>
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className={styles.cardActions}>
                    <Link href={`/admin-edit-testimonial/${testimonial.id}`} className={styles.editButton}>
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => togglePublished(testimonial)}
                      className={styles.toggleButton}
                    >
                      {testimonial.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => toggleFeatured(testimonial)}
                      className={`${styles.toggleButton} ${testimonial.featured ? styles.featuredBtn : ''}`}
                    >
                      {testimonial.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id, testimonial.name)}
                      className={styles.deleteButton}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminTestimonials;
