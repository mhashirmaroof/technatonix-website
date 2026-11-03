import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === 'GET') {
      // Fetch all case studies
      try {
        const q = query(collection(db, 'case-studies'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const caseStudies = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate().toISOString() || new Date().toISOString(),
        }));

        return res.status(200).json({ success: true, caseStudies });
      } catch (error) {
        console.error('Case Studies API error:', error);
        // Fallback to empty array if Firebase fails
        return res.status(200).json({ 
          success: true, 
          caseStudies: []
        });
      }
    }

    if (method === 'POST') {
      // Create new case study
      const { title, clientName, clientLogo, problem, solution, results, metrics, techStack, images, tags, published } = req.body;
      
      if (!title || !clientName || !problem || !solution) {
        return res.status(400).json({ error: 'Title, client name, problem, and solution are required' });
      }

      if (!results || (typeof results === 'string' ? results.trim() === '' : false)) {
        return res.status(400).json({ error: 'Results description is required' });
      }

      const newCaseStudy = {
        title,
        clientName: clientName || '',
        clientLogo: clientLogo || '',
        problem: problem || '',
        solution: solution || '',
        results: typeof results === 'string' ? results : (Array.isArray(results) ? results.join('\n') : ''),
        metrics: Array.isArray(metrics) ? metrics : [],
        techStack: Array.isArray(techStack) ? techStack : (typeof techStack === 'string' ? techStack.split(',').map(t => t.trim()) : []),
        images: Array.isArray(images) ? images : (images ? [images] : []),
        tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []),
        published: Boolean(published),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        const docRef = await addDoc(collection(db, 'case-studies'), newCaseStudy);
        return res.status(201).json({ 
          success: true, 
          message: 'Case study created successfully',
          id: docRef.id 
        });
      } catch (error) {
        console.error('Create case study error:', error);
        return res.status(500).json({ error: 'Failed to create case study' });
      }
    }

    if (method === 'PUT') {
      // Update case study
      const { id, ...updateData } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Case study ID is required' });
      }

      const updatedCaseStudy = {
        ...updateData,
        updatedAt: new Date(),
      };

      try {
        await updateDoc(doc(db, 'case-studies', id), updatedCaseStudy);
        return res.status(200).json({ 
          success: true, 
          message: 'Case study updated successfully' 
        });
      } catch (error) {
        console.error('Update case study error:', error);
        return res.status(500).json({ error: 'Failed to update case study' });
      }
    }

    if (method === 'DELETE') {
      // Delete case study
      const { caseStudyId } = req.query;
      
      if (!caseStudyId || typeof caseStudyId !== 'string') {
        return res.status(400).json({ error: 'Case study ID is required' });
      }

      try {
        await deleteDoc(doc(db, 'case-studies', caseStudyId));
        return res.status(200).json({ 
          success: true, 
          message: 'Case study deleted successfully' 
        });
      } catch (error) {
        console.error('Delete case study error:', error);
        return res.status(500).json({ error: 'Failed to delete case study' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Case Studies API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    });
  }
}
