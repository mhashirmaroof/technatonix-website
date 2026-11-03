import type { NextApiRequest, NextApiResponse } from 'next';

const FIRESTORE_TIMEOUT_MS = 8000;

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
    errors.push('State and country are required');
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

const toFirestoreValue = (value: any): any => {
  if (value === null || value === undefined) return { nullValue: null };
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'number') return { doubleValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  return {
    mapValue: {
      fields: Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, toFirestoreValue(v)])
      )
    }
  };
};

// Uses the Firestore REST API so the request cannot hang on a streaming connection
const saveLeadData = async (leadData: any): Promise<{ success: boolean; id?: string; error?: string }> => {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!projectId || !apiKey) {
    return { success: false, error: 'Firebase is not configured' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FIRESTORE_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contact-us?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: Object.fromEntries(
            Object.entries(leadData).map(([k, v]) => [k, toFirestoreValue(v)])
          )
        }),
        signal: controller.signal
      }
    );

    if (!response.ok) {
      const body = await response.text();
      console.error('❌ Firestore REST error:', response.status, body);
      return { success: false, error: `Firestore error ${response.status}` };
    }

    const doc = await response.json();
    return { success: true, id: String(doc.name).split('/').pop() };
  } catch (error: any) {
    console.error('❌ Firestore request failed:', error);
    return { success: false, error: error.name === 'AbortError' ? 'Request timed out' : error.message };
  } finally {
    clearTimeout(timer);
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
    
    const leadData: LeadData & { createdAt: Date; status: string; id: string } = {
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
      createdAt: new Date(),
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
