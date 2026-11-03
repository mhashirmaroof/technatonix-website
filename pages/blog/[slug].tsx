import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { BlogPost, SEOProps } from '../../types';
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaTag } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface BlogDetailProps {
  post: BlogPost;
  seo: SEOProps;
  relatedPosts: BlogPost[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, seo, relatedPosts }) => {
  if (!post) {
    return (
      <Layout seo={seo}>
        <div className="container">
          <h1>Post Not Found</h1>
          <Link href="/blog">Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout seo={seo}>
      <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#0066cc', textDecoration: 'none' }}>
          <FaArrowLeft /> Back to Blog
        </Link>
        
        <article>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{post.title}</h1>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: '#666' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FaCalendar /> {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FaUser /> {post.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <FaClock /> {post.readTime || 5} min read
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            {post.tags.map((tag, index) => (
              <span key={index} style={{ background: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                <FaTag style={{ marginRight: '0.25rem' }} /> {tag}
              </span>
            ))}
          </div>
          
          {post.featuredImage && (
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '2rem' }} 
            />
          )}
          
          <div style={{ lineHeight: '1.6' }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
        
        {relatedPosts && relatedPosts.length > 0 && (
          <section style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
            <h2>Related Posts</h2>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
                  <Link href={`/blog/${relatedPost.slug}`} style={{ textDecoration: 'none', color: '#0066cc' }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{relatedPost.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.875rem' }}>{relatedPost.excerpt}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.params!;
    
    // Fetch blog posts from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/blogs`);
    const data = await response.json();
    
    // Find post by slug
    const post = data.blogs?.find((p: any) => p.slug === slug) || null;

    if (!post) {
      return {
        notFound: true,
      };
    }

    // Get related posts (exclude current post, limit to 3)
    const relatedPosts = data.blogs
      ?.filter((p: any) => p.slug !== post.slug && p.published)
      ?.slice(0, 3) || [];

    const seo: SEOProps = {
      title: `${post.title} - Technatonix Blog`,
      description: post.excerpt,
      canonical: `https://technatonix.com/blog/${post.slug}`,
      openGraph: {
        title: `${post.title} - Technatonix Blog`,
        description: post.excerpt,
        type: 'article'
      }
    };

    return {
      props: {
        post,
        relatedPosts,
        seo,
      },
    };
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return {
      notFound: true,
    };
  }
};

export default BlogDetail;
