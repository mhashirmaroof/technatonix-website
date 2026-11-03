import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
import styles from '../styles/AdminPosts.module.scss';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  image?: string;
  category: string;
}

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/posts?postId=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
        alert('Post deleted successfully');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting post');
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...post,
          published: !post.published
        })
      });

      if (response.ok) {
        setPosts(posts.map(p => 
          p.id === post.id 
            ? { ...p, published: !p.published } 
            : p
        ));
      } else {
        alert('Failed to update post status');
      }
    } catch (error) {
      console.error('Toggle published error:', error);
      alert('Error updating post');
    }
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'published') return matchesSearch && post.published;
    if (filter === 'draft') return matchesSearch && !post.published;
    return matchesSearch;
  });

  if (loading) {
    return (
      <AdminLayout title="Blog Posts" currentPage="posts">
        <div className={styles.loading}>Loading posts...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Posts | Admin | Technatonix</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Blog Posts" currentPage="posts">
        {/* Header Actions */}
        <div className={styles.postsHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as 'all' | 'published' | 'draft')}
              className={styles.filterSelect}
            >
              <option value="all">All Posts ({posts.length})</option>
              <option value="published">Published ({posts.filter(p => p.published).length})</option>
              <option value="draft">Drafts ({posts.filter(p => !p.published).length})</option>
            </select>
          </div>

          <Link href="/admin-create-post" className={styles.createButton}>
            <FaPlus /> Create New Post
          </Link>
        </div>

        {/* Posts Table */}
        <div className={styles.postsTable}>
          {filteredPosts.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No posts found</h3>
              <p>
                {searchTerm ? 'No posts match your search criteria.' : 'Start by creating your first blog post.'}
              </p>
              <Link href="/admin-create-post" className={styles.createButton}>
                <FaPlus /> Create New Post
              </Link>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className={styles.postTitle}>
                        <h4>{post.title}</h4>
                        <p>{post.excerpt.substring(0, 100)}...</p>
                        {post.featured && <span className={styles.featuredBadge}>Featured</span>}
                      </div>
                    </td>
                    <td>{post.author}</td>
                    <td>
                      <button
                        className={`${styles.statusBadge} ${post.published ? styles.published : styles.draft}`}
                        onClick={() => togglePublished(post)}
                        title={`Click to ${post.published ? 'unpublish' : 'publish'}`}
                      >
                        {post.published ? <FaEye /> : <FaEyeSlash />}
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td>{post.category}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <Link href={`/admin-edit-post/${post.id}`} className={styles.editButton}>
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className={styles.deleteButton}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminPosts;
