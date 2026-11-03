import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import styles from '../styles/AdminContent.module.scss';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  authorImage?: string;
  tags: string[];
  readTime: number;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminBlogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      setPosts(data.blogs || []);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/blogs?blogId=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
        alert('Blog deleted successfully');
      } else {
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting blog');
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          published: !post.published,
        }),
      });

      if (response.ok) {
        setPosts(posts.map(p => 
          p.id === post.id 
            ? { ...p, published: !p.published }
            : p
        ));
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'published' && post.published) ||
                         (filter === 'draft' && !post.published);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <AdminLayout title="Blogs" currentPage="blogs">
        <div className={styles.loading}>Loading blogs...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Blog Management | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Blog Management" currentPage="blogs">
        <div className={styles.contentHeader}>
          <div className={styles.headerLeft}>
            <h2>All Blogs ({filteredPosts.length})</h2>
          </div>
          <div className={styles.headerRight}>
            <Link href="/admin-create-blog" className={styles.createButton}>
              <FaPlus />
              Create Blog
            </Link>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search blogs..."
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
              <option value="all">All Blogs</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className={styles.emptyState}>
            <FaPlus className={styles.emptyIcon} />
            <h3>No blogs found</h3>
            <p>Create your first blog to get started</p>
            <Link href="/admin-create-blog" className={styles.createButton}>
              Create Blog
            </Link>
          </div>
        ) : (
          <div className={styles.contentGrid}>
            {filteredPosts.map((post) => (
              <div key={post.id} className={styles.contentCard}>
                {post.featuredImage && (
                  <div className={styles.cardImage}>
                    <img src={post.featuredImage} alt={post.title} />
                  </div>
                )}
                
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.status} ${post.published ? styles.published : styles.draft}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  
                  <div className={styles.cardDetails}>
                    <span className={styles.author}>{post.author}</span>
                    <span className={styles.readTime}>
                      <FaEye /> {post.readTime || 5} min read
                    </span>
                    <span className={styles.date}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className={styles.cardActions}>
                    <Link href={`/admin-edit-blog/${post.id}`} className={styles.editButton}>
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => togglePublished(post)}
                      className={styles.toggleButton}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
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

export default AdminBlogs;
