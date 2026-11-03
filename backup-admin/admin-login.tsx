import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { setAdminSession, isAdminLoggedIn } from '../lib/admin-auth';
import styles from '../styles/AdminLogin.module.scss';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    if (isAdminLoggedIn()) {
      router.replace('/admin-dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAdminSession(email);
        router.push('/admin-dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Technatonix</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.header}>
              <h1>Admin Login</h1>
              <p>Access the Technatonix admin dashboard</p>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your admin email"
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className={styles.footer}>
              <p>Secure admin access for content management</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
