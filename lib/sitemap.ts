import { allServices } from '@/data/services';
import { getPublishedBlogs } from '@/lib/blogs';
import { getProjectExperience } from '@/lib/project-experience';
import { createSitemapDocuments, SitemapEntry } from '@/lib/sitemap-xml';

export async function getSitemapDocuments(): Promise<string[]> {
  const [projects, blogs] = await Promise.all([getProjectExperience(), getPublishedBlogs()]);
  const entries: SitemapEntry[] = [
    '/', '/services', '/ai-automation', '/products', '/case-studies', '/blog',
    '/about', '/contact', '/privacy', '/terms', '/cookies',
  ].map((path) => ({ path }));

  entries.push(...allServices.map((service) => ({ path: `/services/${service.slug}` })));
  entries.push(...projects.map((project) => ({
    path: `/case-studies/${project.slug}`,
    lastModified: project.lastModified,
  })));
  entries.push(...blogs.map((blog) => ({
    path: `/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
  })));
  return createSitemapDocuments(entries);
}
