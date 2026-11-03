import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminLogin } from '../../../lib/admin-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const matchesEnvironmentCredentials =
      Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) &&
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;
    const isValid = matchesEnvironmentCredentials || await verifyAdminLogin(email, password);
    
    if (isValid) {
      res.status(200).json({ 
        success: true, 
        message: 'Login successful',
        email 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
