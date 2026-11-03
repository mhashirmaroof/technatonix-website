import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { SEOProps } from '@/types';
import styles from '@/styles/Blog.module.scss';
import Link from 'next/link';
import { FaCalendar, FaUser, FaTag, FaArrowRight, FaClock } from 'react-icons/fa';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  published: boolean;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogProps {
  blogPosts: BlogPost[];
  seo: SEOProps;
}

const Blog: React.FC<BlogProps> = ({ blogPosts, seo }) => {
  const featuredPost = blogPosts?.[0]; // Use first post as featured
  const regularPosts = blogPosts?.slice(1) || []; // Rest of the posts

  return (
    <Layout seo={seo}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Technology Insights & Expertise</h1>
            <p>
              Stay updated with the latest trends, best practices, and insights in enterprise software development, 
              manufacturing technology, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className={styles.featuredPost}>
          <div className="container">
            <div className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                <img src={featuredPost.featuredImage || '/images/blog-default.jpg'} alt={featuredPost.title} />
                <div className={styles.featuredBadge}>Featured</div>
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.postMeta}>
                  <span className={styles.metaItem}>
                    <FaUser /> {featuredPost.author}
                  </span>
                  <span className={styles.metaItem}>
                    <FaCalendar /> {new Date(featuredPost.publishedAt).toLocaleDateString()}
                  </span>
                  <span className={styles.metaItem}>
                    <FaClock /> {featuredPost.readTime} min read
                  </span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className={styles.postTags}>
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      <FaTag /> {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${featuredPost.slug}`} className="btn-primary">
                  Read Article <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Latest Articles</h2>
            <p>Insights and expertise from our technology team</p>
          </div>
          <div className={styles.postsGrid}>
            {regularPosts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postImage}>
                  <img src={post.featuredImage || '/images/blog-default.jpg'} alt={post.title} />
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={styles.metaItem}>
                      <FaCalendar /> {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className={styles.metaItem}>
                      <FaClock /> {post.readTime} min read
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.postFooter}>
                    <span className={styles.author}>
                      <FaUser /> {post.author}
                    </span>
                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                      Read More <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2>Stay Updated</h2>
            <p>Get the latest insights and updates delivered directly to your inbox</p>
            <form className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.emailInput}
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className={styles.topics}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Explore Topics</h2>
            <p>Discover content organized by key technology areas</p>
          </div>
          <div className={styles.topicsGrid}>
            <Link href="/blog/category/erp" className={styles.topicCard}>
              <h3>ERP Systems</h3>
              <p>Enterprise resource planning insights and best practices</p>
              <span className={styles.postCount}>12 articles</span>
            </Link>
            <Link href="/blog/category/manufacturing" className={styles.topicCard}>
              <h3>Manufacturing</h3>
              <p>Digital transformation in manufacturing industries</p>
              <span className={styles.postCount}>8 articles</span>
            </Link>
            <Link href="/blog/category/cloud" className={styles.topicCard}>
              <h3>Cloud Solutions</h3>
              <p>Cloud migration and infrastructure guidance</p>
              <span className={styles.postCount}>15 articles</span>
            </Link>
            <Link href="/blog/category/development" className={styles.topicCard}>
              <h3>Software Development</h3>
              <p>Custom development trends and technologies</p>
              <span className={styles.postCount}>20 articles</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<BlogProps> = async () => {
  try {
    // Fetch blog posts from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/blogs`);
    const data = await response.json();
    
    // Filter only published blog posts
    const blogPosts: BlogPost[] = data.blogs
      ?.filter((blog: any) => blog.published)
      ?.map((blog: any) => ({
        ...blog,
        publishedAt: blog.publishedAt || blog.createdAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      })) || [];

    const seo: SEOProps = {
      title: 'Software Development Blog | ERP Systems & Technology Insights - Technatonix',
      description: 'Expert software development blog covering ERP systems, custom software development, mobile apps, web development, and latest technology trends. Written by professional software house team.',
      canonical: 'https://technatonix.com/blog',
      openGraph: {
        title: 'Software Development & ERP Technology Blog | Technatonix Software House',
        description: 'Expert insights on software development, ERP systems, mobile apps, web development, and technology trends from leading software house.',
        image: '/images/blog-og.jpg',
        type: 'website'
      }
    };

    return {
      props: {
        blogPosts,
        seo,
      },
    };
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    
    // Return empty array on error
    return {
      props: {
        blogPosts: [],
        seo: {
          title: 'Technology Blog | Technatonix',
          description: 'Stay updated with the latest insights in enterprise software development, manufacturing technology, and digital transformation.',
          canonical: 'https://technatonix.com/blog',
        }
      },
    };
  }
};

export default Blog;
