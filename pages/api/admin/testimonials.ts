import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === 'GET') {
      // Fetch all testimonials
      try {
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const testimonials = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate().toISOString() || new Date().toISOString(),
        }));

        return res.status(200).json({ success: true, testimonials });
      } catch (error) {
        console.error('Testimonials API error:', error);
        // Fallback to empty array if Firebase fails
        return res.status(200).json({ 
          success: true, 
          testimonials: []
        });
      }
    }

    if (method === 'POST') {
      // Create new testimonial
      const { name, position, company, testimonial, avatar, rating, featured, published } = req.body;
      
      if (!name || !testimonial || !company) {
        return res.status(400).json({ error: 'Name, testimonial text, and company are required' });
      }

      const ratingNum = parseInt(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }

      const newTestimonial = {
        name: name.trim(),
        position: position?.trim() || '',
        company: company.trim(),
        testimonial: testimonial.trim(),
        avatar: avatar || '',
        rating: ratingNum,
        featured: Boolean(featured),
        published: Boolean(published),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        const docRef = await addDoc(collection(db, 'testimonials'), newTestimonial);
        return res.status(201).json({ 
          success: true, 
          message: 'Testimonial created successfully',
          id: docRef.id 
        });
      } catch (error) {
        console.error('Create testimonial error:', error);
        return res.status(500).json({ error: 'Failed to create testimonial' });
      }
    }

    if (method === 'PUT') {
      // Update testimonial
      const { id, ...updateData } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Testimonial ID is required' });
      }

      // Validate rating if provided
      if (updateData.rating !== undefined) {
        const ratingNum = parseInt(updateData.rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
          return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }
        updateData.rating = ratingNum;
      }

      const updatedTestimonial = {
        ...updateData,
        updatedAt: new Date(),
      };

      try {
        await updateDoc(doc(db, 'testimonials', id), updatedTestimonial);
        return res.status(200).json({ 
          success: true, 
          message: 'Testimonial updated successfully' 
        });
      } catch (error) {
        console.error('Update testimonial error:', error);
        return res.status(500).json({ error: 'Failed to update testimonial' });
      }
    }

    if (method === 'DELETE') {
      // Delete testimonial
      const { testimonialId } = req.query;
      
      if (!testimonialId || typeof testimonialId !== 'string') {
        return res.status(400).json({ error: 'Testimonial ID is required' });
      }

      try {
        await deleteDoc(doc(db, 'testimonials', testimonialId));
        return res.status(200).json({ 
          success: true, 
          message: 'Testimonial deleted successfully' 
        });
      } catch (error) {
        console.error('Delete testimonial error:', error);
        return res.status(500).json({ error: 'Failed to delete testimonial' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Testimonials API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    });
  }
}
