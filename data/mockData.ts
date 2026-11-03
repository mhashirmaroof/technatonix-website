import { Product, Service, CaseStudy, BlogPost, SiteSettings, Industry } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'krevix-erp',
    slug: 'krevix-erp',
    title: 'KREVIX ERP',
    shortDescription: 'Advanced Manufacturing ERP - The Complete Manufacturing & Business Management Solution',
    longDescription: `KREVIX is a comprehensive Enterprise Resource Planning (ERP) system built with the MEAN stack (Angular, NestJS, MicroServices, PostgreSQL, MongoDB, Node.js) specifically designed for modern manufacturing operations. 

From raw materials to finished products, from single orders to complex production workflows, KREVIX provides complete visibility and control over your entire business with zero-code configuration and 100% automation features.`,
    modules: [
      {
        name: 'Advanced Manufacturing & BOM System',
        description: 'Complete recipe-to-production workflow with multi-level BOM support, cost calculation engine, and automated work order management',
        features: [
          'Bill of Materials (BOM) Management with version control',
          'Work Order Management with phase-based trackaing',
          'Department & Team Management with hierarchical structure',
          'Batch & Lot Tracking with complete traceability',
          'Unit Types & Conversions with automatic calculations',
          'Serial Number Generation with batch linking'
        ]
      },
      {
        name: 'Enterprise Security & Access Control',
        description: 'Advanced Role-Based Access Control (RBAC) with multi-tenant architecture and automatic security enforcement',
        features: [
          'Dynamic Role Assignment with smart admin detection',
          'Three-Tier Hierarchy (Super Admin → Org Admin → Warehouse Users)',
          'Granular Permissions with Role-Module-Warehouse control',
          'Multi-Tenant Architecture with perfect data segregation',
          'JWT-Based Authentication with refresh tokens',
          'Automatic Security Enforcement at API level'
        ]
      },
      {
        name: 'Advanced Inventory Management',
        description: 'Revolutionary inventory system with end-to-end traceability, automatic adjustments, and real-time availability tracking',
        features: [
          'Revolutionary Serial Number Tracking from raw materials',
          'Automatic Inventory Adjustments with evidence-based changes',
          'INSTOCK Management System with automatic PO→Instock flow',
          'Product Catalog Management with multi-image support',
          'Real-time Stock Level Monitoring with alerts',
          'Bulk Operations with efficient processing'
        ]
      },
      {
        name: 'Intelligent Order Management',
        description: 'Automated order processing with multi-item support, workflow automation, and real-time integration across all modules',
        features: [
          'Purchase Order Automation with vendor integration',
          'Sales Order Processing with inventory validation',
          'Order Lifecycle Management with status tracking',
          'Approval Workflows with configurable processes',
          'Partial Fulfillment tracking',
          'Automatic Financial Integration'
        ]
      },
      {
        name: 'Automated Financial Management',
        description: 'Zero-manual-work finance system with automatic transaction creation and read-only security for tamper-proof records',
        features: [
          'Automatic Transaction Creation from business events',
          'Read-Only Security with tamper-proof financial data',
          'Real-Time Financial Analytics and reporting',
          'Revenue Analytics with forecasting',
          'Expense Management with categorization',
          'Tax Integration with automatic calculation'
        ]
      },
      {
        name: 'Multi-Warehouse Operations',
        description: 'Enterprise-grade multi-warehouse management with complete data segregation and capacity planning',
        features: [
          'Warehouse-Specific Data with complete segregation',
          'Person-in-Charge designation for each warehouse',
          'Location Management with address and contacts',
          'Capacity Tracking and utilization planning',
          'Inter-Warehouse Transfers',
          'Warehouse Performance Analytics'
        ]
      },
      {
        name: 'Advanced Analytics & Reporting',
        description: 'Comprehensive business intelligence with manufacturing analytics, inventory reports, and real-time dashboards',
        features: [
          'Manufacturing Analytics with production metrics',
          'Inventory Analytics with stock movement analysis',
          'Business Intelligence with sales analytics',
          'Audit & Compliance with complete audit trail',
          'Custom Dashboards with configurable views',
          'Trend Analysis with forecasting'
        ]
      },
      {
        name: '100% Automation Features',
        description: 'Zero-code business logic with automatic workflows, event-driven processing, and seamless integration',
        features: [
          'Zero-Code Business Logic automation',
          'Event-Driven Processing with automatic responses',
          'Smart Defaults with intelligent behaviors',
          'Cross-Module Automation',
          'Workflow Orchestration for complex processes',
          'API Integration ready for third-party systems'
        ]
      }
    ],
    screenshots: [
      '/images/krevix-dashboard.jpg',
      '/images/krevix-inventory.jpg',
      '/images/krevix-production.jpg',
      '/images/krevix-analytics.jpg',
      '/images/krevix-mobile.jpg'
    ],
    datasheetUrl: '/downloads/krevix-complete-datasheet.pdf',
    tags: ['ERP', 'Manufacturing', 'Inventory', 'Production', 'MEAN Stack', 'Angular', 'MongoDB', 'Automation'],
    published: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockServices: Service[] = [
  {
    id: 'custom-software-development',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortDescription: 'Tailored software solutions built to your exact specifications',
    description: 'We develop custom software applications that perfectly align with your business processes and requirements. Our experienced team uses modern technologies and agile methodologies to deliver scalable, maintainable solutions.',
    offerings: [
      'Web Application Development',
      'Mobile App Development',
      'Desktop Application Development',
      'API Development and Integration',
      'Database Design and Optimization',
      'Cloud-Native Solutions'
    ],
    tags: ['Development', 'Custom', 'Web', 'Mobile'],
    published: true,
    icon: 'FaCode',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'erp-implementation',
    slug: 'erp-implementation',
    title: 'ERP Implementation & Migration',
    shortDescription: 'Seamless ERP implementation and legacy system migration services',
    description: 'Our ERP implementation services ensure smooth transitions from legacy systems to modern ERP solutions. We handle everything from data migration to user training.',
    offerings: [
      'ERP System Selection',
      'Implementation Planning',
      'Data Migration',
      'System Integration',
      'User Training',
      'Post-Implementation Support'
    ],
    tags: ['ERP', 'Implementation', 'Migration'],
    published: true,
    icon: 'FaCogs',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'system-integration',
    slug: 'system-integration',
    title: 'System Integration',
    shortDescription: 'Connect your business systems for seamless data flow',
    description: 'We integrate disparate business systems to create a unified technology ecosystem that improves efficiency and data accuracy.',
    offerings: [
      'API Development',
      'Third-party Integrations',
      'Legacy System Connectivity',
      'Real-time Data Synchronization',
      'Workflow Automation',
      'Integration Testing'
    ],
    tags: ['Integration', 'API', 'Automation'],
    published: true,
    icon: 'FaLink',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'cloud-migration',
    slug: 'cloud-migration',
    title: 'Cloud Migration Services',
    shortDescription: 'Migrate your applications and data to the cloud securely',
    description: 'Our cloud migration services help you move to modern cloud platforms with minimal disruption to your business operations.',
    offerings: [
      'Cloud Strategy Planning',
      'Application Migration',
      'Data Migration',
      'Security Implementation',
      'Performance Optimization',
      'Cost Optimization'
    ],
    tags: ['Cloud', 'Migration', 'AWS', 'Azure'],
    published: true,
    icon: 'FaCloud',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'managed-services',
    slug: 'managed-services',
    title: 'Managed IT Services',
    shortDescription: '24/7 monitoring and maintenance of your IT infrastructure',
    description: 'Our managed services team provides round-the-clock monitoring, maintenance, and support for your IT systems.',
    offerings: [
      '24/7 System Monitoring',
      'Preventive Maintenance',
      'Security Management',
      'Backup and Disaster Recovery',
      'Performance Optimization',
      'Technical Support'
    ],
    tags: ['Managed Services', 'Support', 'Monitoring'],
    published: true,
    icon: 'FaShieldAlt',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'consulting',
    slug: 'consulting',
    title: 'Technology Consulting',
    shortDescription: 'Strategic technology guidance for digital transformation',
    description: 'Our technology consultants help you make informed decisions about your IT strategy and digital transformation initiatives.',
    offerings: [
      'Technology Strategy',
      'Digital Transformation',
      'System Architecture Design',
      'Technology Assessment',
      'Vendor Selection',
      'Project Management'
    ],
    tags: ['Consulting', 'Strategy', 'Digital Transformation'],
    published: true,
    icon: 'FaLightbulb',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDescription: 'Native and cross-platform mobile applications for iOS and Android',
    description: 'Build powerful mobile applications that connect with your business systems and provide seamless user experiences across all devices.',
    offerings: [
      'iOS App Development',
      'Android App Development',
      'Cross-Platform Solutions (Flutter/React Native)',
      'Mobile UI/UX Design',
      'App Store Optimization',
      'Mobile Backend Services'
    ],
    tags: ['Mobile', 'iOS', 'Android', 'Flutter'],
    published: true,
    icon: 'FaMobile',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'iot-solutions',
    slug: 'iot-solutions',
    title: 'IoT Solutions',
    shortDescription: 'Connected devices and smart manufacturing solutions',
    description: 'Implement Internet of Things solutions to connect your manufacturing equipment, monitor operations in real-time, and optimize production processes.',
    offerings: [
      'Industrial IoT Implementation',
      'Sensor Integration',
      'Real-time Monitoring Systems',
      'Predictive Maintenance Solutions',
      'Data Analytics Platforms',
      'Edge Computing Solutions'
    ],
    tags: ['IoT', 'Manufacturing', 'Sensors', 'Industry 4.0'],
    published: true,
    icon: 'FaWifi',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'ai-ml-solutions',
    slug: 'ai-ml-solutions',
    title: 'AI & Machine Learning',
    shortDescription: 'Intelligent automation and predictive analytics solutions',
    description: 'Leverage artificial intelligence and machine learning to automate processes, predict outcomes, and gain valuable insights from your business data.',
    offerings: [
      'Predictive Analytics',
      'Process Automation',
      'Computer Vision Solutions',
      'Natural Language Processing',
      'Recommendation Systems',
      'Anomaly Detection'
    ],
    tags: ['AI', 'Machine Learning', 'Analytics', 'Automation'],
    published: true,
    icon: 'FaBrain',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockIndustries: Industry[] = [
  { id: 'healthcare', name: 'Healthcare', description: 'Complete solutions for healthcare providers', icon: 'FaHeartbeat', slug: 'healthcare' },
  { id: 'finance', name: 'Finance', description: 'Secure financial technology solutions', icon: 'FaDollarSign', slug: 'finance' },
  { id: 'restaurant', name: 'Restaurant', description: 'Digital solutions for restaurant industry', icon: 'FaUtensils', slug: 'restaurant' },
  { id: 'ecommerce', name: 'E-Commerce', description: 'Scalable e-commerce platforms', icon: 'FaShoppingCart', slug: 'ecommerce' },
  { id: 'education', name: 'Education', description: 'Educational technology platforms', icon: 'FaGraduationCap', slug: 'education' },
  { id: 'logistics', name: 'Logistics', description: 'Supply chain and logistics management', icon: 'FaTruck', slug: 'logistics' },
  { id: 'transportation', name: 'Transportation', description: 'Transportation management systems', icon: 'FaBus', slug: 'transportation' },
  { id: 'warehousing', name: 'Warehousing', description: 'Warehouse management solutions', icon: 'FaWarehouse', slug: 'warehousing' },
  { id: 'advertising', name: 'Advertising & Marketing', description: 'Digital marketing platforms', icon: 'FaAd', slug: 'advertising' },
  { id: 'real-estate', name: 'Real Estate', description: 'Property management platforms', icon: 'FaBuilding', slug: 'real-estate' },
  { id: 'retail', name: 'Retail', description: 'Retail management solutions', icon: 'FaStore', slug: 'retail' },
  { id: 'construction', name: 'Construction', description: 'Construction project management', icon: 'FaHardHat', slug: 'construction' },
];

export const siteSettings: SiteSettings = {
  siteTitle: 'Technatonix - Enterprise Software Solutions',
  siteDescription: 'Leading software house providing KREVIX ERP and custom software development services for manufacturing industries worldwide.',
  contactEmail: 'info@technatonix.com',
  phoneNumbers: [
    { label: 'US Office', number: '+1 (555) 123-4567', country: 'US' },
    { label: 'UK Office', number: '+44 20 1234 5678', country: 'UK' },
    { label: 'DE Office', number: '+49 30 12345678', country: 'DE' }
  ],
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/technatonix', icon: 'FaLinkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/technatonix', icon: 'FaTwitter' },
    { platform: 'GitHub', url: 'https://github.com/technatonix', icon: 'FaGithub' }
  ],
  offices: [
    {
      name: 'Headquarters',
      address: '1500 Technology Drive, Suite 100',
      city: 'San Francisco, CA 94105',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      email: 'us@technatonix.com'
    },
    {
      name: 'European Office',
      address: '123 Tech Street',
      city: 'London SW1A 1AA',
      country: 'United Kingdom',
      phone: '+44 20 1234 5678',
      email: 'eu@technatonix.com'
    }
  ],
  defaultLocale: 'en-US'
};
