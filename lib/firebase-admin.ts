import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (server-side only)
const initializeFirebaseAdmin = () => {
  // Check if Firebase Admin is already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
      !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
      !privateKey) {
    throw new Error('Firebase Admin credentials are not properly configured');
  }

  const app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });

  return app;
};

// Initialize the admin app
const adminApp = initializeFirebaseAdmin();

// Export Firestore instance for server-side operations
export const adminDb = getFirestore(adminApp);

// Helper function to create a lead document
export const createLead = async (leadData: any) => {
  try {
    const leadsCollection = adminDb.collection('contact-us');
    const docRef = await leadsCollection.add({
      ...leadData,
      createdAt: new Date(),
      status: 'new'
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Helper function to verify reCAPTCHA
export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
};

export default adminApp;
