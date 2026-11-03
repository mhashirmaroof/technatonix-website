export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  modules: ProductModule[];
  screenshots: string[];
  datasheetUrl?: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductModule {
  name: string;
  description: string;
  features?: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  offerings: string[];
  tags: string[];
  published: boolean;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  clientLogo?: string;
  problem: string;
  solution: string;
  results: string;
  metrics?: CaseStudyMetric[];
  techStack: string[];
  images: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  featuredImage?: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  readTime?: number;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company?: string;
  country: string;
  phone?: string;
  shortMessage: string;
  budgetBracket?: string;
  timeframe?: string;
  details?: string;
  attachments?: string[];
  source?: string;
  utm?: Record<string, string>;
  status?: 'new' | 'qualified' | 'contacted' | 'converted';
  createdAt: Date;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  phoneNumbers: PhoneNumber[];
  socialLinks: SocialLink[];
  offices: Office[];
  gaMeasurementId?: string;
  defaultLocale: string;
}

export interface PhoneNumber {
  label: string;
  number: string;
  country: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Office {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
  jsonLd?: Record<string, any>;
}

export interface PageProps {
  seo: SEOProps;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}
