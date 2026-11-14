import React from 'react';
import Head from 'next/head';
import { SEOProps } from '@/types';
import { canonicalUrl, LANDING_SOCIAL, SITE_METADATA } from '@/lib/site-metadata';

interface SEOHeadProps {
  seo: SEOProps;
}

const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  const canonical = canonicalUrl(seo.canonical);
  const path = canonical ? new URL(canonical).pathname : '';
  const landing = LANDING_SOCIAL[path];
  const title = landing?.title || seo.openGraph?.title || seo.title;
  const description = landing?.description || seo.openGraph?.description || seo.description || SITE_METADATA.description;
  const generatedImage = seo.openGraph?.generatedImage;
  const socialImage = seo.openGraph?.socialImage;
  const image = socialImage?.url || `${SITE_METADATA.origin}${generatedImage || landing?.image || SITE_METADATA.defaultImage}`;
  const imageType = socialImage?.type || (generatedImage ? 'image/png' : 'image/jpeg');
  const type = seo.openGraph?.type || 'website';

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_METADATA.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content={String(socialImage?.width || 1200)} />
      <meta property="og:image:height" content={String(socialImage?.height || 630)} />
      <meta property="og:locale" content={SITE_METADATA.locale} />
      {type === 'article' && seo.openGraph?.publishedTime && <meta property="article:published_time" content={seo.openGraph.publishedTime} />}
      {type === 'article' && seo.openGraph?.modifiedTime && <meta property="article:modified_time" content={seo.openGraph.modifiedTime} />}
      {type === 'article' && seo.openGraph?.author && <meta name="author" content={seo.openGraph.author} />}

      <meta name="twitter:card" content={SITE_METADATA.twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      {seo.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
