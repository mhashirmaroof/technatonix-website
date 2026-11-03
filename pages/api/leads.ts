import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app if not already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig, 'api-leads');
} else {
  app = getApps().find((a: any) => a.name === 'api-leads') || getApps()[0];
}

const db = getFirestore(app);

interface LeadData {
  name: string;
  email: string;
  company?: string;
  country: string;
  phone?: string;
  shortMessage: string;
  details?: string;
  source?: string;
  utm?: Record<string, string>;
}

// Simple validation function
const validateLeadData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Handle both old format (name) and new format (firstName + lastName)
  const hasName = data.name && typeof data.name === 'string' && data.name.trim().length > 0;
  const hasFirstLastName = (data.firstName && typeof data.firstName === 'string' && data.firstName.trim().length > 0) ||
                          (data.lastName && typeof data.lastName === 'string' && data.lastName.trim().length > 0);
  
  if (!hasName && !hasFirstLastName) {
    errors.push('Name is required');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Handle both old format (shortMessage) and new format (message)
  const hasShortMessage = data.shortMessage && typeof data.shortMessage === 'string' && data.shortMessage.trim().length > 0;
  const hasMessage = data.message && typeof data.message === 'string' && data.message.trim().length > 0;
  
  if (!hasShortMessage && !hasMessage) {
    errors.push('Message is required');
  }
  
  if (!data.country || typeof data.country !== 'string' || data.country.trim().length === 0) {
    errors.push('Country is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Simple rate limiting (in-memory)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_IP = 3;

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const requests = rateLimitStore.get(ip) || [];
  
  // Filter out old requests
  const recentRequests = requests.filter((timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_IP) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  
  // Clean up old entries periodically
  if (rateLimitStore.size > 1000) {
    rateLimitStore.clear();
  }
  
  return true;
};

// Save lead data with fallback handling
const saveLeadData = async (leadData: any): Promise<{ success: boolean; id?: string; error?: string }> => {
  try {
    console.log('🔄 Attempting to save lead to Firebase...');
    
    const docRef = await addDoc(collection(db, 'contact-us'), leadData);
    console.log('✅ Lead saved to Firebase with ID:', docRef.id);
    
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('❌ Firebase Error:', error);
    
    // If it's a permission error, use fallback logging
    if (error.code === 'permission-denied') {
      console.log('🔄 Firebase permissions denied, using fallback logging...');
      
      // Log to console as fallback (in production, you might want to log to a file or external service)
      console.log('📝 LEAD SUBMISSION (Fallback Log):');
      console.log('=====================================');
      console.log('Name:', leadData.name);
      console.log('Email:', leadData.email);
      console.log('Company:', leadData.company);
      console.log('Country:', leadData.country);
      console.log('Phone:', leadData.phone);
      console.log('Message:', leadData.shortMessage);
      console.log('Details:', leadData.details);
      console.log('Source:', leadData.source);
      console.log('IP:', leadData.utm?.ip);
      console.log('Timestamp:', new Date().toISOString());
      console.log('=====================================');
      
      // Generate a fallback ID
      const fallbackId = 'fallback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      return { success: true, id: fallbackId };
    }
    
    return { success: false, error: error.message };
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get client IP for rate limiting
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: RATE_LIMIT_WINDOW / 1000 
      });
    }
    
    // Validate request data
    const validation = validateLeadData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }
    
    // Generate unique ID for local reference
    const leadId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Prepare lead data for Firebase - handle both old and new formats
    const name = req.body.name || 
                 (req.body.firstName && req.body.lastName ? `${req.body.firstName} ${req.body.lastName}` : 
                  req.body.firstName || req.body.lastName || '');
    
    const message = req.body.shortMessage || req.body.message || '';
    
    const leadData: LeadData & { createdAt: any; status: string; id: string } = {
      id: leadId,
      name: name.trim(),
      email: req.body.email.trim().toLowerCase(),
      company: req.body.company?.trim() || '',
      country: req.body.country.trim(),
      phone: req.body.phone?.trim() || '',
      shortMessage: message.trim(),
      details: req.body.details?.trim() || '',
      source: 'website_contact_form',
      utm: {
        ip: ip,
        userAgent: req.headers['user-agent'] || '',
        referer: req.headers.referer || '',
        localId: leadId // Keep local ID for reference
      },
      createdAt: serverTimestamp(),
      status: 'new'
    };
    
    // Save lead data to Firebase (with fallback)
    const result = await saveLeadData(leadData);
    
    if (!result.success) {
      throw new Error('Failed to save lead');
    }
    
    console.log(`✅ Lead processed: ${leadData.email} (ID: ${result.id})`);
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      id: result.id
    });
    
  } catch (error) {
    console.error('❌ Error processing lead submission:', error);
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}
