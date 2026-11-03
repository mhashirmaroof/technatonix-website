import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadAllData } from '../../scripts/uploadToFirebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple authentication (in production, use proper auth)
  const { adminKey } = req.body;
  if (adminKey !== 'upload-data-2025') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('📤 Starting data upload to Firebase...');
    await uploadAllData();
    
    res.status(200).json({ 
      success: true, 
      message: 'All data uploaded to Firebase successfully!',
      collections: {
        products: 'Uploaded',
        services: 'Uploaded', 
        caseStudies: 'Uploaded',
        posts: 'Uploaded',
        settings: 'Uploaded'
      }
    });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    res.status(500).json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
