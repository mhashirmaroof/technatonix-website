import type { NextApiRequest, NextApiResponse } from 'next';
import { sendLeadNotification } from '@/lib/lead-notification';

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
    const emailRegex = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;
    if (data.email.length > 254 || !emailRegex.test(data.email.trim())) {
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
  
  const maxLengths: Record<string, number> = {
    name: 120, company: 150, country: 150, phone: 40, shortMessage: 2000, message: 2000, details: 5000
  };
  for (const [field, max] of Object.entries(maxLengths)) {
    if (typeof data[field] === 'string' && data[field].length > max) {
      errors.push(`${field} is too long`);
    }
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

// Marks the lead with the email outcome; failure here never affects the response
const updateNotificationStatus = async (docId: string, status: 'sent' | 'failed', error?: string) => {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return;

  const fields: Record<string, any> = {
    notificationStatus: { stringValue: status },
    notificationUpdatedAt: { timestampValue: new Date().toISOString() }
  };
  if (error) fields.notificationError = { stringValue: error.slice(0, 300) };

  const mask = Object.keys(fields).map((f) => `updateMask.fieldPaths=${f}`).join('&');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contact-us/${docId}?${mask}&key=${apiKey}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
        signal: controller.signal
      }
    );
    if (!response.ok) {
      console.error('⚠️ Could not record notification status:', response.status);
    }
  } catch (err: any) {
    console.error('⚠️ Could not record notification status:', err?.message);
  } finally {
    clearTimeout(timer);
  }
};

// Short-lived guard against the same submission being saved twice (double clicks, retries)
const recentSubmissions = new Map<string, { id: string; at: number }>();
const DUPLICATE_WINDOW = 60000;

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
    
    const dedupeKey = `${leadData.email}|${leadData.shortMessage}`;
    const now = Date.now();
    for (const [key, entry] of recentSubmissions) {
      if (now - entry.at > DUPLICATE_WINDOW) recentSubmissions.delete(key);
    }
    const previous = recentSubmissions.get(dedupeKey);
    if (previous) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
        id: previous.id
      });
    }

    // Save lead data to Firebase first; email is only attempted after this succeeds
    const result = await saveLeadData(leadData);
    
    if (!result.success || !result.id) {
      throw new Error('Failed to save lead');
    }

    recentSubmissions.set(dedupeKey, { id: result.id, at: now });

    const notification = await sendLeadNotification({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company,
      stateCountry: leadData.country,
      projectType: typeof req.body.projectType === 'string' ? req.body.projectType.trim() : '',
      message: leadData.shortMessage,
      details: leadData.details,
      submittedAt: new Date()
    });

    if (notification.status === 'failed') {
      console.error(`❌ Lead notification email failed (lead ${result.id}): ${notification.error}`);
    }
    await updateNotificationStatus(result.id, notification.status, notification.error);
    
    console.log(`✅ Lead processed (ID: ${result.id}, notification: ${notification.status})`);
    
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
