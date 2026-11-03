import { collection, getDocs, doc, getDoc, query, where, orderBy, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { Product, Service, CaseStudy, BlogPost, SiteSettings } from '@/types';

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'products'), where('published', '==', true))
    );
    return querySnapshot.docs.map(doc => ({ 
      ...doc.data(), 
      id: doc.id 
    })) as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'products'), where('slug', '==', slug), limit(1))
    );
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { ...doc.data(), id: doc.id } as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Services
export async function getServices(): Promise<Service[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'services'), where('published', '==', true), orderBy('order', 'asc'))
    );
    return querySnapshot.docs.map(doc => ({ 
      ...doc.data(), 
      id: doc.id 
    })) as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'services'), where('slug', '==', slug), limit(1))
    );
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { ...doc.data(), id: doc.id } as Service;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Case Studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'caseStudies'), 
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      )
    );
    return querySnapshot.docs.map(doc => ({ 
      ...doc.data(), 
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as CaseStudy[];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'caseStudies'), where('slug', '==', slug), limit(1))
    );
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { 
      ...doc.data(), 
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    } as CaseStudy;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

// Blog Posts
export async function getBlogPosts(pageSize: number = 10, lastDoc?: DocumentSnapshot): Promise<{ posts: BlogPost[], lastDoc?: DocumentSnapshot }> {
  try {
    let q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(
        collection(db, 'posts'),
        where('published', '==', true),
        orderBy('publishedAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      publishedAt: doc.data().publishedAt?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as unknown as BlogPost[];

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { posts, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [] };
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'posts'), where('slug', '==', slug), limit(1))
    );
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { 
      ...doc.data(), 
      id: doc.id,
      publishedAt: doc.data().publishedAt?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    } as unknown as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getFeaturedBlogPosts(limitNum: number = 3): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'posts'),
        where('published', '==', true),
        where('featured', '==', true),
        orderBy('publishedAt', 'desc'),
        limit(limitNum)
      )
    );
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      publishedAt: doc.data().publishedAt?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'posts'),
        where('published', '==', true),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      )
    );
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      publishedAt: doc.data().publishedAt?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data() } as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}
