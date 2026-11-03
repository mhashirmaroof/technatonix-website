import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  country: string;
  phone?: string;
  budgetBracket?: string;
  timeframe?: string;
  shortMessage: string;
  details?: string;
  source?: string;
  utm?: Record<string, string>;
}

// Simple validation function
const validateLeadData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
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
  
  if (!data.country || typeof data.country !== 'string' || data.country.trim().length === 0) {
    errors.push('Country is required');
  }
  
  if (!data.shortMessage || typeof data.shortMessage !== 'string' || data.shortMessage.trim().length === 0) {
    errors.push('Short message is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // Max 5 submissions per window

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const clientData = rateLimitStore.get(ip);
  
  if (!clientData || now - clientData.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, lastReset: now });
    return true;
  }
  
  if (clientData.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  clientData.count++;
  return true;
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
    
    // Prepare lead data
    const leadData: LeadData & { createdAt: any; status: string } = {
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      company: req.body.company?.trim() || '',
      country: req.body.country.trim(),
      phone: req.body.phone?.trim() || '',
      budgetBracket: req.body.budgetBracket || '',
      timeframe: req.body.timeframe || '',
      shortMessage: req.body.shortMessage.trim(),
      details: req.body.details?.trim() || '',
      source: 'website_contact_form',
      utm: {
        ip: ip,
        userAgent: req.headers['user-agent'] || '',
        referer: req.headers.referer || ''
      },
      createdAt: serverTimestamp(),
      status: 'new'
    };
    
    // Save to Firestore
    const docRef = await addDoc(collection(db, 'contact-us'), leadData);
    
    console.log('Lead saved successfully:', docRef.id);
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Lead submitted successfully',
      id: docRef.id
    });
    
  } catch (error) {
    console.error('Error saving lead:', error);
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}
