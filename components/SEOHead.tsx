import React from 'react';
import Head from 'next/head';
import { SEOProps } from '@/types';

interface SEOHeadProps {
  seo: SEOProps;
}

const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  const {
    title,
    description,
    canonical,
    openGraph,
    jsonLd
  } = seo;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={openGraph?.title || title} />
      <meta property="og:description" content={openGraph?.description || description} />
      <meta property="og:type" content={openGraph?.type || 'website'} />
      {openGraph?.image && <meta property="og:image" content={openGraph.image} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={openGraph?.title || title} />
      <meta name="twitter:description" content={openGraph?.description || description} />
      {openGraph?.image && <meta name="twitter:image" content={openGraph.image} />}
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
