import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return res.status(500).json({ error: 'Admin credentials are not configured' });
    }

    // Create admin login credentials
    const adminCredentials = { email, password };

    // Upload to Firebase
    await setDoc(doc(collection(db, 'admin-login'), 'admin'), adminCredentials);

    console.log('✅ Admin login credentials uploaded to Firebase');
    
    res.status(200).json({ 
      success: true, 
      message: 'Admin credentials uploaded successfully!' 
    });
  } catch (error) {
    console.error('❌ Error uploading admin credentials:', error);
    res.status(500).json({ 
      error: 'Failed to upload admin credentials',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
