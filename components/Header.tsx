import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.scss';

// Request Demo is hidden for now; flip to true to show it again
const SHOW_REQUEST_DEMO = false;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <Link href="/">
                <div className={styles.logoContainer}>
                  <div className={styles.logoImage}>
                    <Image
                      src="/logo.png"
                      alt="Technatonix"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className={styles.desktopNav}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              {SHOW_REQUEST_DEMO && (
                <Link href="/contact" className="btn-secondary">
                  Request Demo
                </Link>
              )}
              <Link href="/contact?inquiry=quote" className="btn-primary">
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={styles.mobileNav}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.active : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className={styles.mobileCta}>
                {SHOW_REQUEST_DEMO && (
                  <Link href="/contact" className="btn-secondary">
                    Request Demo
                  </Link>
                )}
                <Link href="/contact?inquiry=quote" className="btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Get Quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
