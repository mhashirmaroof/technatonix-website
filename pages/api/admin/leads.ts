import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === 'GET') {
      // Fetch all leads/contact form submissions
      try {
        const q = query(collection(db, 'contact-us'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const leads = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            // Map the actual data structure to what the UI expects
            firstName: data.name ? data.name.split(' ')[0] || data.name : '',
            lastName: data.name ? data.name.split(' ').slice(1).join(' ') || '' : '',
            email: data.email || '',
            phone: data.phone || '',
            company: data.company || '',
            country: data.country || '',
            message: data.shortMessage || data.message || '',
            details: data.details || '',
            source: data.source || 'website_contact_form',
            createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
            status: data.status || 'new',
            isRead: data.status === 'read' || data.isRead || false,
          };
        });

        return res.status(200).json({ success: true, leads });
      } catch (error) {
        console.error('Leads API error:', error);
        // Fallback to empty array if Firebase fails
        return res.status(200).json({ 
          success: true, 
          leads: []
        });
      }
    }

    if (method === 'PUT') {
      // Update lead (mark as read, etc.)
      const { id, ...updateData } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Lead ID is required' });
      }

      try {
        await updateDoc(doc(db, 'contact-us', id), updateData);
        return res.status(200).json({ 
          success: true, 
          message: 'Lead updated successfully' 
        });
      } catch (error) {
        console.error('Update lead error:', error);
        return res.status(500).json({ error: 'Failed to update lead' });
      }
    }

    if (method === 'DELETE') {
      // Delete lead
      const { leadId } = req.query;
      
      if (!leadId || typeof leadId !== 'string') {
        return res.status(400).json({ error: 'Lead ID is required' });
      }

      try {
        await deleteDoc(doc(db, 'contact-us', leadId));
        return res.status(200).json({ 
          success: true, 
          message: 'Lead deleted successfully' 
        });
      } catch (error) {
        console.error('Delete lead error:', error);
        return res.status(500).json({ error: 'Failed to delete lead' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Admin Leads API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    });
  }
}
