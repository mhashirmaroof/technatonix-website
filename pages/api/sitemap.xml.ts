import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const baseUrl = 'https://technatonix.com';
  
  // Static pages with priorities and change frequencies optimized for SEO
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' }, // Homepage - highest priority
    { url: '/services', priority: '0.9', changefreq: 'weekly' }, // Services - very important for software house SEO
    { url: '/products', priority: '0.9', changefreq: 'monthly' }, // Products/ERP - very important
    { url: '/about', priority: '0.8', changefreq: 'monthly' }, // About - important for trust
    { url: '/contact', priority: '0.8', changefreq: 'monthly' }, // Contact - important for conversion
    { url: '/case-studies', priority: '0.7', changefreq: 'weekly' }, // Case studies - good for SEO
    { url: '/blog', priority: '0.6', changefreq: 'daily' }, // Blog listing
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
    // Fetch blog posts for dynamic URLs
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

    // Fetch case studies for dynamic URLs
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
    console.error('Error fetching dynamic content for sitemap:', error);
  }

  sitemap += `
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 24 hours
  res.status(200).send(sitemap);
}
