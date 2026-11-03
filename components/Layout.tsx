import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';
import { SEOProps } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  seo: SEOProps;
}

const Layout: React.FC<LayoutProps> = ({ children, seo }) => {
  return (
    <>
      <SEOHead seo={seo} />
      <div className="min-h-screen flex flex-col" style={{ background: '#020617' }}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
