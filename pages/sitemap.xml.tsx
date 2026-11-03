import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://technatonix.com';
  
  // Static pages with priorities optimized for software house SEO
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/products', priority: '0.9', changefreq: 'monthly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/case-studies', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog', priority: '0.6', changefreq: 'daily' },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  for (const page of staticPages) {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  try {
    // Fetch blog posts
    const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/blogs`);
    if (blogResponse.ok) {
      const blogData = await blogResponse.json();
      const blogs = blogData.blogs?.filter((blog: any) => blog.published) || [];
      
      for (const blog of blogs) {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt || blog.createdAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      }
    }

    // Fetch case studies
    const caseStudiesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/case-studies`);
    if (caseStudiesResponse.ok) {
      const caseStudiesData = await caseStudiesResponse.json();
      const caseStudies = caseStudiesData.caseStudies?.filter((cs: any) => cs.published) || [];
      
      for (const caseStudy of caseStudies) {
        sitemap += `
  <url>
    <loc>${baseUrl}/case-studies/${caseStudy.slug}</loc>
    <lastmod>${caseStudy.updatedAt || caseStudy.createdAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  sitemap += `
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
