import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface PublishedBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  published: true;
  publishedAt: string;
  createdAt: string;
  updatedAt: string | null;
  readTime: number;
  featuredImage: string;
}

function timestamp(value: unknown): string | null {
  if (!(value instanceof Timestamp)) return null;
  const date = value.toDate();
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function getPublishedBlogs(): Promise<PublishedBlog[]> {
  const snapshot = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')));
  const blogs: PublishedBlog[] = [];
  const slugs = new Set<string>();

  for (const document of snapshot.docs) {
    const data = document.data();
    if (data.published !== true) continue;
    const createdAt = timestamp(data.createdAt);
    if (typeof data.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) ||
        typeof data.title !== 'string' || !data.title.trim() || typeof data.content !== 'string' ||
        !createdAt || slugs.has(data.slug)) {
      console.error('Skipping invalid or duplicate published blog:', document.id);
      continue;
    }
    slugs.add(data.slug);
    blogs.push({
      id: document.id,
      slug: data.slug,
      title: data.title,
      excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
      content: data.content,
      author: typeof data.author === 'string' ? data.author : '',
      tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
      published: true,
      publishedAt: timestamp(data.publishedAt) || createdAt,
      createdAt,
      updatedAt: timestamp(data.updatedAt),
      readTime: typeof data.readTime === 'number' ? data.readTime : 5,
      featuredImage: typeof data.featuredImage === 'string' ? data.featuredImage : '',
    });
  }
  return blogs;
}
