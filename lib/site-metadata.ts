export const SITE_METADATA = {
  companyName: 'THE TECHNATONIX PVT. LTD.',
  siteName: 'The Technatonix',
  origin: 'https://www.technatonix.com',
  description: 'Custom software, business applications, AI automation and integrated technology solutions.',
  defaultImage: '/images/og/default.jpg',
  logo: '/logo.png',
  locale: 'en_US',
  twitterCard: 'summary_large_image',
} as const;

export const LANDING_SOCIAL: Record<string, { title: string; description: string; image: string }> = {
  '/': {
    title: 'The Technatonix | Custom Software, AI Automation & Intelligent Systems',
    description: 'The Technatonix helps businesses grow through custom software development, intelligent automation, business applications and integrated technology solutions.',
    image: '/images/og/home.jpg',
  },
  '/ai-automation': {
    title: 'AI Automation & Intelligent Systems | The Technatonix',
    description: 'Explore AI agents, intelligent workflows, sales automation, voice systems, document processing and enterprise integrations.',
    image: '/images/og/ai-automation.jpg',
  },
  '/services': {
    title: 'Software Development & IT Services | The Technatonix',
    description: 'Explore custom software development, ERP solutions, web and mobile applications, integrations and intelligent business technology services.',
    image: '/images/og/services.jpg',
  },
  '/products': {
    title: 'Our Software Products | KREVIX ERP & EFWRSX Cloud',
    description: 'Explore The Technatonix’s software products in development for manufacturing operations and field-work reporting.',
    image: '/images/og/products.jpg',
  },
  '/about': {
    title: 'About The Technatonix | Technology & Software Solutions',
    description: 'Learn about The Technatonix, our technology capabilities, engineering approach and commitment to building solutions around business needs.',
    image: '/images/og/about.jpg',
  },
  '/service-history': {
    title: 'Service History | The Technatonix Projects & Experience',
    description: 'Explore The Technatonix service history, software projects, products and our team’s verified project experience.',
    image: '/images/og/service-history.jpg',
  },
  '/contact': {
    title: 'Contact The Technatonix | Discuss Your Project',
    description: 'Connect with The Technatonix to discuss software development, AI automation, integrations and business technology projects.',
    image: '/images/og/contact.jpg',
  },
};

export function canonicalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, SITE_METADATA.origin);
    if (url.hostname !== 'technatonix.com' && url.hostname !== 'www.technatonix.com') return undefined;
    return `${SITE_METADATA.origin}${url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '')}`;
  } catch {
    return undefined;
  }
}
