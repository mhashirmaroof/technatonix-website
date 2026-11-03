import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AdminLayout } from '../components/AdminLayout';
import { FaEnvelope, FaCalendar, FaSearch, FaFilter, FaEye, FaTrash, FaDownload } from 'react-icons/fa';
import styles from '../styles/AdminContent.module.scss';

interface ContactForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message: string;
  details?: string;
  createdAt: string;
  isRead?: boolean;
}

const AdminContactForms: React.FC = () => {
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      setContactForms(data.leads || []);
    } catch (error) {
      console.error('Failed to fetch contact forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the submission from "${name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/leads?leadId=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContactForms(contactForms.filter(form => form.id !== id));
        alert('Contact form deleted successfully');
        if (selectedForm?.id === id) {
          setSelectedForm(null);
        }
      } else {
        alert('Failed to delete contact form');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting contact form');
    }
  };

  const markAsRead = async (form: ContactForm) => {
    if (form.isRead) return;

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          isRead: true,
        }),
      });

      if (response.ok) {
        setContactForms(contactForms.map(f => 
          f.id === form.id 
            ? { ...f, isRead: true }
            : f
        ));
        setSelectedForm({ ...form, isRead: true });
      }
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Company', 'Country', 'Message', 'Additional Details'];
    const csvData = contactForms.map(form => [
      new Date(form.createdAt).toLocaleDateString(),
      `${form.firstName} ${form.lastName}`,
      form.email,
      form.phone || '',
      form.company || '',
      form.country || '',
      `"${form.message.replace(/"/g, '""')}"`,
      `"${(form.details || '').replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-forms-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredForms = contactForms.filter(form => {
    const matchesSearch = 
      `${form.firstName} ${form.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (form.company && form.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (form.country && form.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
      form.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (form.details && form.details.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !form.isRead) ||
                         (filter === 'read' && form.isRead);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = contactForms.filter(form => !form.isRead).length;

  if (loading) {
    return (
      <AdminLayout title="Contact Forms" currentPage="contact-forms">
        <div className={styles.loading}>Loading contact forms...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Forms | Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminLayout title="Contact Form Submissions" currentPage="contact-forms">
        <div className={styles.contentHeader}>
          <div className={styles.headerLeft}>
            <h2>
              Contact Forms ({filteredForms.length})
              {unreadCount > 0 && (
                <span style={{ 
                  background: '#ef4444', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem'
                }}>
                  {unreadCount} new
                </span>
              )}
            </h2>
          </div>
          <div className={styles.headerRight}>
            <button 
              onClick={exportToCSV}
              className={styles.createButton}
              disabled={contactForms.length === 0}
            >
              <FaDownload />
              Export CSV
            </button>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search submissions..."
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
              <option value="all">All Submissions</option>
              <option value="unread">Unread ({unreadCount})</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Forms List */}
          <div style={{ flex: '1', minWidth: '400px' }}>
            {filteredForms.length === 0 ? (
              <div className={styles.emptyState}>
                <FaEnvelope className={styles.emptyIcon} />
                <h3>No contact forms found</h3>
                <p>Contact form submissions will appear here</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredForms.map((form) => (
                  <div 
                    key={form.id} 
                    onClick={() => {
                      setSelectedForm(form);
                      markAsRead(form);
                    }}
                    style={{
                      background: 'white',
                      border: `2px solid ${form.isRead ? '#e5e7eb' : '#3b82f6'}`,
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    className={selectedForm?.id === form.id ? 'selected' : ''}
                  >
                    {!form.isRead && (
                      <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '8px',
                        height: '8px',
                        background: '#ef4444',
                        borderRadius: '50%'
                      }} />
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ color: '#111827', fontWeight: '600' }}>
                        {form.firstName} {form.lastName}
                      </h4>
                      <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        <FaCalendar style={{ marginRight: '0.25rem' }} />
                        {new Date(form.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      {form.email}
                      {form.company && <> • {form.company}</>}
                    </div>
                    
                    <p style={{ 
                      color: '#374151', 
                      fontSize: '0.875rem', 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {form.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Detail View */}
          {selectedForm && (
            <div style={{ 
              flex: '1', 
              minWidth: '400px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '2rem',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'sticky',
              top: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ color: '#111827', marginBottom: '0.5rem' }}>
                    {selectedForm.firstName} {selectedForm.lastName}
                  </h3>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    <FaCalendar style={{ marginRight: '0.5rem' }} />
                    {new Date(selectedForm.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(selectedForm.id, `${selectedForm.firstName} ${selectedForm.lastName}`)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <FaTrash />
                </button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Contact Information
                </h4>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <div><strong>Email:</strong> {selectedForm.email}</div>
                  {selectedForm.phone && <div><strong>Phone:</strong> {selectedForm.phone}</div>}
                  {selectedForm.company && <div><strong>Company:</strong> {selectedForm.company}</div>}
                  {selectedForm.country && <div><strong>Country:</strong> {selectedForm.country}</div>}
                </div>
              </div>

              <div style={{ marginBottom: selectedForm.details ? '1.5rem' : '0' }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                  Message
                </h4>
                <div style={{ 
                  background: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: '#374151',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedForm.message}
                </div>
              </div>

              {selectedForm.details && selectedForm.details.trim() !== '' && (
                <div>
                  <h4 style={{ color: '#374151', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                    Additional Details
                  </h4>
                  <div style={{ 
                    background: '#fef3c7', 
                    border: '1px solid #f59e0b',
                    borderRadius: '6px',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    color: '#92400e',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedForm.details}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminContactForms;
