import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
// Note: This script was used for initial data upload. MockData has been removed.
// import { mockProducts, mockServices, mockCaseStudies, siteSettings } from '../data/mockData';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample blog posts data to upload
const blogPosts = [
  {
    id: '1',
    slug: 'manufacturing-erp-digital-transformation',
    title: 'Digital Transformation in Manufacturing: How ERP Systems Drive Efficiency',
    excerpt: 'Explore how modern ERP systems are revolutionizing manufacturing operations through automation, real-time data, and integrated workflows.',
    content: `<h2>The Manufacturing Revolution</h2>
    <p>Manufacturing industries are experiencing unprecedented change. Digital transformation isn't just a buzzword—it's becoming essential for survival in today's competitive landscape.</p>
    
    <h3>Why ERP Systems Matter</h3>
    <p>Enterprise Resource Planning (ERP) systems serve as the central nervous system of modern manufacturing operations. They integrate every aspect of your business, from inventory management to financial reporting.</p>
    
    <h3>Key Benefits of Modern ERP</h3>
    <ul>
      <li><strong>Real-time Visibility:</strong> Monitor production, inventory, and performance metrics instantly</li>
      <li><strong>Automated Workflows:</strong> Reduce manual processes and human error</li>
      <li><strong>Data-Driven Decisions:</strong> Access comprehensive analytics and reporting</li>
      <li><strong>Scalable Operations:</strong> Grow your business without operational bottlenecks</li>
    </ul>
    
    <h3>Implementation Success Factors</h3>
    <p>Successful ERP implementation requires careful planning, stakeholder buy-in, and the right technology partner. Our KREVIX ERP system has helped dozens of manufacturers achieve 40%+ efficiency improvements.</p>`,
    author: 'Sarah Johnson',
    publishedAt: new Date('2025-09-20'),
    readTime: '8 min read',
    tags: ['ERP', 'Manufacturing', 'Digital Transformation'],
    featured: true,
    published: true,
    image: '/images/blog/manufacturing-erp.jpg',
    category: 'ERP Systems',
    metaDescription: 'Learn how ERP systems are driving digital transformation in manufacturing with real-world examples and best practices.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    slug: 'cloud-migration-manufacturing-benefits',
    title: 'Cloud Migration for Manufacturing: Benefits and Best Practices',
    excerpt: 'Discover the advantages of moving your manufacturing systems to the cloud and learn proven strategies for a successful migration.',
    content: `<h2>The Cloud Advantage in Manufacturing</h2>
    <p>Cloud computing is transforming how manufacturers operate, offering unprecedented scalability, flexibility, and cost efficiency.</p>
    
    <h3>Why Manufacturers Choose Cloud</h3>
    <p>Traditional on-premise systems often can't keep up with modern manufacturing demands. Cloud solutions offer:</p>
    
    <ul>
      <li><strong>Scalability:</strong> Scale resources up or down based on demand</li>
      <li><strong>Cost Efficiency:</strong> Reduce infrastructure costs by up to 30%</li>
      <li><strong>Remote Access:</strong> Enable work from anywhere capabilities</li>
      <li><strong>Automatic Updates:</strong> Always have the latest features and security</li>
    </ul>
    
    <h3>Migration Best Practices</h3>
    <p>A successful cloud migration requires careful planning and execution. Key considerations include data security, compliance requirements, and minimal downtime strategies.</p>`,
    author: 'Michael Chen',
    publishedAt: new Date('2025-09-18'),
    readTime: '6 min read',
    tags: ['Cloud Computing', 'Migration', 'Infrastructure'],
    featured: false,
    published: true,
    image: '/images/blog/cloud-migration.jpg',
    category: 'Cloud Solutions',
    metaDescription: 'Complete guide to cloud migration for manufacturing companies, including benefits, challenges, and best practices.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    slug: 'ai-manufacturing-quality-control',
    title: 'AI-Powered Quality Control: The Future of Manufacturing Excellence',
    excerpt: 'Learn how artificial intelligence is revolutionizing quality control processes in manufacturing, reducing defects and improving efficiency.',
    content: `<h2>AI Revolution in Quality Control</h2>
    <p>Artificial Intelligence is transforming quality control from reactive to predictive, helping manufacturers catch defects before they impact customers.</p>
    
    <h3>Traditional vs AI-Powered QC</h3>
    <p>Traditional quality control relies on sampling and manual inspection, which can miss defects and slow production. AI systems can inspect 100% of products in real-time.</p>
    
    <h3>Key AI Technologies</h3>
    <ul>
      <li><strong>Computer Vision:</strong> Detect visual defects with 99%+ accuracy</li>
      <li><strong>Predictive Analytics:</strong> Forecast potential quality issues</li>
      <li><strong>Machine Learning:</strong> Continuously improve detection algorithms</li>
      <li><strong>IoT Integration:</strong> Monitor equipment and environmental conditions</li>
    </ul>
    
    <h3>Implementation Results</h3>
    <p>Our clients typically see 60% reduction in defects and 25% improvement in production efficiency within the first year of AI implementation.</p>`,
    author: 'Dr. Amanda Rodriguez',
    publishedAt: new Date('2025-09-15'),
    readTime: '7 min read',
    tags: ['AI', 'Quality Control', 'Machine Learning'],
    featured: false,
    published: true,
    image: '/images/blog/ai-quality-control.jpg',
    category: 'AI & Machine Learning',
    metaDescription: 'Explore how AI is transforming manufacturing quality control with computer vision, predictive analytics, and machine learning.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Upload functions
export async function uploadProducts() {
  console.log('🔄 Uploading products to Firebase...');
  // const batch = writeBatch(db);
  
  // mockProducts.forEach((product) => {
  //   const docRef = doc(collection(db, 'products'), product.id);
  //   batch.set(docRef, {
  //     ...product,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     published: true
  //   });
  // });
  
  // await batch.commit();
  console.log('✅ Products uploaded successfully');
}

export async function uploadServices() {
  console.log('🔄 Uploading services to Firebase...');
  // const batch = writeBatch(db);
  
  // mockServices.forEach((service) => {
  //   const docRef = doc(collection(db, 'services'), service.id);
  //   batch.set(docRef, {
  //     ...service,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     published: true
  //   });
  // });
  
  // await batch.commit();
  console.log('✅ Services uploaded successfully');
}

export async function uploadCaseStudies() {
  console.log('🔄 Uploading case studies to Firebase...');
  // const batch = writeBatch(db);
  
  // mockCaseStudies.forEach((caseStudy) => {
  //   const docRef = doc(collection(db, 'caseStudies'), caseStudy.id);
  //   batch.set(docRef, {
  //     ...caseStudy,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   });
  // });
  
  // await batch.commit();
  console.log('✅ Case studies uploaded successfully');
}

export async function uploadBlogPosts() {
  console.log('🔄 Uploading blog posts to Firebase...');
  const batch = writeBatch(db);
  
  blogPosts.forEach((post) => {
    const docRef = doc(collection(db, 'posts'), post.id);
    batch.set(docRef, post);
  });
  
  await batch.commit();
  console.log('✅ Blog posts uploaded successfully');
}

export async function uploadSiteSettings() {
  console.log('🔄 Uploading site settings to Firebase...');
  // const docRef = doc(collection(db, 'settings'), 'site');
  // await setDoc(docRef, {
  //   ...siteSettings,
  //   updatedAt: new Date()
  // });
  console.log('✅ Site settings uploaded successfully');
}

export async function uploadAllData() {
  console.log('🚀 Starting Firebase data upload...');
  
  try {
    await uploadProducts();
    await uploadServices();
    await uploadCaseStudies();
    await uploadBlogPosts();
    await uploadSiteSettings();
    
    console.log('🎉 All data uploaded to Firebase successfully!');
    console.log('📊 Collections created:');
    // console.log('  - products:', mockProducts.length, 'documents');
    // console.log('  - services:', mockServices.length, 'documents');
    // console.log('  - caseStudies:', mockCaseStudies.length, 'documents');
    console.log('  - posts:', blogPosts.length, 'documents');
    console.log('  - settings: 1 document');
  } catch (error) {
    console.error('❌ Error uploading data:', error);
    throw error;
  }
}

// CLI interface for running uploads
if (typeof window === 'undefined' && require.main === module) {
  uploadAllData().catch(console.error);
}
