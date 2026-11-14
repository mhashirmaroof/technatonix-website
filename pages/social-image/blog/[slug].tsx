import React from 'react';
import { GetServerSideProps } from 'next';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getPublishedBlogs } from '@/lib/blogs';

const BlogSocialImage = () => null;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  try {
    const post = (await getPublishedBlogs()).find((blog) => blog.slug === params?.slug);
    if (!post) return { notFound: true };

    const logo = await readFile(path.join(process.cwd(), 'public', 'logo.png'));
    const logoUrl = `data:image/png;base64,${logo.toString('base64')}`;
    const response = new ImageResponse(
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f7f9fd', color: '#0b1b3d', padding: '56px 70px', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={logoUrl} width="175" height="100" alt="The Technatonix" />
          <div style={{ display: 'flex', color: '#2367db', fontSize: 20, letterSpacing: 2 }}>INSIGHTS &amp; EXPERTISE</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: 70, height: 6, background: '#2670e8', marginBottom: 30 }} />
          <div style={{ display: 'flex', fontSize: post.title.length > 75 ? 48 : 58, lineHeight: 1.15, fontWeight: 700, maxHeight: 265, overflow: 'hidden' }}>{post.title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #d5deed', paddingTop: 24, color: '#526480', fontSize: 20 }}>
          <span>The Technatonix Blog</span><span>www.technatonix.com</span>
        </div>
      </div>,
      { width: 1200, height: 630 },
    );
    const image = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=300');
    res.end(image);
  } catch (error) {
    console.error('Failed to generate blog social image:', error);
    res.statusCode = 503;
    res.end('Social image temporarily unavailable');
  }
  return { props: {} };
};

export default BlogSocialImage;
