import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isAdminLoggedIn, getAdminSession, clearAdminSession } from '../lib/admin-auth';
import { FaHome, FaFileAlt, FaPlus, FaSignOutAlt, FaUser, FaFolderOpen, FaEnvelope, FaStar, FaImage } from 'react-icons/fa';
import styles from '../styles/AdminDashboard.module.scss';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  currentPage?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title = 'Admin Dashboard',
  currentPage = 'dashboard'
}) => {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      router.replace('/admin-login');
    } else {
      setAdminEmail(session.email);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    clearAdminSession();
    router.push('/admin-login');
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaHome, href: '/admin-dashboard' },
    { id: 'blogs', label: 'Blogs', icon: FaFileAlt, href: '/admin-blogs' },
    { id: 'create-blog', label: 'Create Blog', icon: FaPlus, href: '/admin-create-blog' },
    { id: 'case-studies', label: 'Case Studies', icon: FaFolderOpen, href: '/admin-case-studies' },
    { id: 'create-case-study', label: 'Create Case Study', icon: FaPlus, href: '/admin-create-case-study' },
    { id: 'testimonials', label: 'Testimonials', icon: FaStar, href: '/admin-testimonials' },
    { id: 'create-testimonial', label: 'Create Testimonial', icon: FaPlus, href: '/admin-create-testimonial' },
    { id: 'contact-forms', label: 'Contact Forms', icon: FaEnvelope, href: '/admin-contact-forms' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Technatonix</h2>
          <p>Admin Panel</p>
        </div>

        <nav className={styles.navigation}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href} className={`${styles.navItem} ${currentPage === item.id ? styles.active : ''}`}>
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <FaUser className={styles.userIcon} />
            <div>
              <p className={styles.userEmail}>{adminEmail}</p>
              <p className={styles.userRole}>Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h1>{title}</h1>
          <div className={styles.headerActions}>
            <span className={styles.timestamp}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
};
