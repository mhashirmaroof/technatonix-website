import type { NextApiRequest, NextApiResponse } from 'next';

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

// Simple Firebase-like data storage (for testing)
const saveLeadData = async (leadData: LeadData & { createdAt: string; status: string; id: string }) => {
  try {
    // Log the lead data (in production, this would save to Firebase)
    console.log('=== NEW LEAD SUBMISSION ===');
    console.log('ID:', leadData.id);
    console.log('Name:', leadData.name);
    console.log('Email:', leadData.email);
    console.log('Company:', leadData.company);
    console.log('Country:', leadData.country);
    console.log('Phone:', leadData.phone);
    console.log('Message:', leadData.shortMessage);
    console.log('Details:', leadData.details);
    console.log('Created:', leadData.createdAt);
    console.log('===========================');
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return { success: true, id: leadData.id };
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
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
    
    // Generate unique ID
    const leadId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Prepare lead data
    const leadData: LeadData & { createdAt: string; status: string; id: string } = {
      id: leadId,
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      company: req.body.company?.trim() || '',
      country: req.body.country.trim(),
      phone: req.body.phone?.trim() || '',
      shortMessage: req.body.shortMessage.trim(),
      details: req.body.details?.trim() || '',
      source: 'website_contact_form',
      utm: {
        ip: ip,
        userAgent: req.headers['user-agent'] || '',
        referer: req.headers.referer || ''
      },
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    // Save lead data
    const result = await saveLeadData(leadData);
    
    if (!result.success) {
      throw new Error('Failed to save lead');
    }
    
    console.log(`Lead submitted successfully: ${leadData.email} (ID: ${leadData.id})`);
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      id: leadData.id
    });
    
  } catch (error) {
    console.error('Error processing lead submission:', error);
    
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}
