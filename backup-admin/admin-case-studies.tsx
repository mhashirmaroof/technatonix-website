import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaBuilding } from 'react-icons/fa';
import styles from '../styles/AdminContent.module.scss';

interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  clientLogo?: string;
  problem: string;
  solution: string;
  results: string;
  metrics?: Array<{label: string; value: string; description?: string}>;
  techStack: string[];
  images: string[];
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminCaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch('/api/admin/case-studies');
      const data = await response.json();
      setCaseStudies(data.caseStudies || []);
    } catch (error) {
      console.error('Failed to fetch case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/case-studies?caseStudyId=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCaseStudies(caseStudies.filter(cs => cs.id !== id));
        alert('Case study deleted successfully');
      } else {
        alert('Failed to delete case study');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting case study');
    }
  };

  const togglePublished = async (caseStudy: CaseStudy) => {
    try {
      const response = await fetch('/api/admin/case-studies', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...caseStudy,
          published: !caseStudy.published,
        }),
      });

      if (response.ok) {
        setCaseStudies(caseStudies.map(cs => 
          cs.id === caseStudy.id 
            ? { ...cs, published: !cs.published }
            : cs
        ));
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    const matchesSearch = caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && caseStudy.published) ||
                         (filter === 'draft' && !caseStudy.published);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <AdminLayout title="Case Studies" currentPage="case-studies">
        <div className={styles.loading}>Loading case studies...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Case Studies Management | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Case Studies Management" currentPage="case-studies">
        <div className={styles.contentHeader}>
          <div className={styles.headerLeft}>
            <h2>All Case Studies ({filteredCaseStudies.length})</h2>
          </div>
          <div className={styles.headerRight}>
            <Link href="/admin-create-case-study" className={styles.createButton}>
              <FaPlus />
              Create Case Study
            </Link>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search case studies..."
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
              <option value="all">All Case Studies</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {filteredCaseStudies.length === 0 ? (
          <div className={styles.emptyState}>
            <FaBuilding className={styles.emptyIcon} />
            <h3>No case studies found</h3>
            <p>Create your first case study to showcase client success</p>
            <Link href="/admin-create-case-study" className={styles.createButton}>
              Create Case Study
            </Link>
          </div>
        ) : (
          <div className={styles.contentGrid}>
            {filteredCaseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className={styles.contentCard}>
                <div className={styles.imageContainer}>
                  {caseStudy.images && caseStudy.images.length > 0 && (
                    <div className={styles.image}>
                      <img src={caseStudy.images[0]} alt={caseStudy.title} />
                    </div>
                  )}
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{caseStudy.title}</h3>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.status} ${caseStudy.published ? styles.published : styles.draft}`}>
                        {caseStudy.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  
                  <p className={styles.cardExcerpt}>
                    <strong>Client:</strong> {caseStudy.clientName}<br />
                    <strong>Problem:</strong> {caseStudy.problem}
                  </p>
                  
                  <div className={styles.cardDetails}>
                    <span className={styles.category}>
                      {caseStudy.tags && caseStudy.tags.length > 0 ? caseStudy.tags[0] : 'Case Study'}
                    </span>
                    <span className={styles.date}>
                      {new Date(caseStudy.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className={styles.cardActions}>
                    <Link href={`/admin-edit-case-study/${caseStudy.id}`} className={styles.editButton}>
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => togglePublished(caseStudy)}
                      className={styles.toggleButton}
                    >
                      {caseStudy.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(caseStudy.id, caseStudy.title)}
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

export default AdminCaseStudies;
