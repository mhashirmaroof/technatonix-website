import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';
import { FaFileAlt, FaEye, FaEnvelope, FaPlus, FaPen, FaTrash, FaBuilding, FaStar, FaQuoteLeft } from 'react-icons/fa';
import styles from '../styles/AdminDashboard.module.scss';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalCaseStudies: 0,
    totalTestimonials: 0,
    totalLeads: 0,
    unreadLeads: 0,
    loading: true
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [blogsRes, caseStudiesRes, testimonialsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/blogs'),
        fetch('/api/admin/case-studies'),
        fetch('/api/admin/testimonials'),
        fetch('/api/admin/leads')
      ]);

      const [blogsData, caseStudiesData, testimonialsData, leadsData] = await Promise.all([
        blogsRes.json(),
        caseStudiesRes.json(),
        testimonialsRes.json(),
        leadsRes.json()
      ]);

      const unreadLeads = leadsData.leads?.filter((lead: any) => !lead.isRead).length || 0;

      setStats({
        totalBlogs: blogsData.blogs?.length || 0,
        totalCaseStudies: caseStudiesData.caseStudies?.length || 0,
        totalTestimonials: testimonialsData.testimonials?.length || 0,
        totalLeads: leadsData.leads?.length || 0,
        unreadLeads,
        loading: false
      });

      // Generate recent activity from the data
      const activities = [];
      
      // Add recent blogs
      if (blogsData.blogs && blogsData.blogs.length > 0) {
        const recentBlog = blogsData.blogs[0];
        activities.push({
          id: `blog-${recentBlog.id}`,
          type: 'blog_created',
          message: `New blog post "${recentBlog.title}" created`,
          time: getTimeAgo(recentBlog.createdAt),
          icon: FaFileAlt
        });
      }

      // Add recent leads
      if (unreadLeads > 0) {
        activities.push({
          id: 'leads-new',
          type: 'lead_received',
          message: `${unreadLeads} new contact form submission${unreadLeads > 1 ? 's' : ''}`,
          time: 'Recently',
          icon: FaEnvelope
        });
      }

      // Add recent case studies
      if (caseStudiesData.caseStudies && caseStudiesData.caseStudies.length > 0) {
        const recentCase = caseStudiesData.caseStudies[0];
        activities.push({
          id: `case-${recentCase.id}`,
          type: 'case_study_created',
          message: `New case study "${recentCase.title}" created`,
          time: getTimeAgo(recentCase.createdAt),
          icon: FaBuilding
        });
      }

      // Add recent testimonials
      if (testimonialsData.testimonials && testimonialsData.testimonials.length > 0) {
        const recentTestimonial = testimonialsData.testimonials[0];
        activities.push({
          id: `testimonial-${recentTestimonial.id}`,
          type: 'testimonial_created',
          message: `New testimonial from "${recentTestimonial.name}" added`,
          time: getTimeAgo(recentTestimonial.createdAt),
          icon: FaStar
        });
      }

      setRecentActivity(activities.slice(0, 4));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Technatonix</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Dashboard" currentPage="dashboard">
        {/* Stats Cards */}
        <div className={styles.dashboardGrid}>
          <div className={styles.statsCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.posts}`}>
                <FaFileAlt />
              </div>
              <p className={styles.cardTitle}>Blog Posts</p>
            </div>
            <div className={styles.cardValue}>{stats.loading ? '...' : stats.totalBlogs}</div>
            <div className={styles.cardChange}>Total published</div>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.cases}`}>
                <FaBuilding />
              </div>
              <p className={styles.cardTitle}>Case Studies</p>
            </div>
            <div className={styles.cardValue}>{stats.loading ? '...' : stats.totalCaseStudies}</div>
            <div className={styles.cardChange}>Client success stories</div>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.testimonials}`}>
                <FaStar />
              </div>
              <p className={styles.cardTitle}>Testimonials</p>
            </div>
            <div className={styles.cardValue}>{stats.loading ? '...' : stats.totalTestimonials}</div>
            <div className={styles.cardChange}>Client reviews</div>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.leads}`}>
                <FaEnvelope />
              </div>
              <p className={styles.cardTitle}>Contact Forms</p>
            </div>
            <div className={styles.cardValue}>
              {stats.loading ? '...' : stats.totalLeads}
              {stats.unreadLeads > 0 && (
                <span style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem'
                }}>
                  {stats.unreadLeads} new
                </span>
              )}
            </div>
            <div className={styles.cardChange}>Total submissions</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h3>Quick Actions</h3>
          <div className={styles.actionsGrid}>
            <Link href="/admin-create-blog" className={styles.actionCard}>
              <FaPlus className={styles.actionIcon} />
              <span>Create Blog</span>
            </Link>
            <Link href="/admin-create-case-study" className={styles.actionCard}>
              <FaBuilding className={styles.actionIcon} />
              <span>Add Case Study</span>
            </Link>
            <Link href="/admin-create-testimonial" className={styles.actionCard}>
              <FaStar className={styles.actionIcon} />
              <span>Add Testimonial</span>
            </Link>
            <Link href="/admin-contact-forms" className={styles.actionCard}>
              <FaEnvelope className={styles.actionIcon} />
              <span>View Contact Forms</span>
              {stats.unreadLeads > 0 && (
                <span className={styles.badge}>{stats.unreadLeads}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.recentActivity}>
          <h3>Recent Activity</h3>
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <Icon />
                </div>
                <div className={styles.activityContent}>
                  <p>{activity.message}</p>
                  <p className={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <a 
            href="/admin-create-post" 
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaPlus /> Create New Post
          </a>
          
          <a 
            href="/admin-posts" 
            style={{
              background: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaFileAlt /> Manage Posts
          </a>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
