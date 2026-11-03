import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        // Fetch all blog posts
        const querySnapshot = await getDocs(
          query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
        );
        
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
          publishedAt: doc.data().publishedAt?.toDate()?.toISOString() || new Date().toISOString()
        }));

        return res.status(200).json({ posts });

      case 'POST':
        // Create new blog post
        const newPost = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: req.body.published ? new Date() : null,
          slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
        };

        const docRef = await addDoc(collection(db, 'posts'), newPost);
        
        return res.status(201).json({ 
          success: true, 
          id: docRef.id, 
          message: 'Post created successfully' 
        });

      case 'PUT':
        // Update blog post
        const { id, ...updateData } = req.body;
        
        if (!id) {
          return res.status(400).json({ error: 'Post ID is required' });
        }

        const updatePayload = {
          ...updateData,
          updatedAt: new Date(),
          publishedAt: updateData.published ? (updateData.publishedAt ? new Date(updateData.publishedAt) : new Date()) : null
        };

        await updateDoc(doc(db, 'posts', id), updatePayload);
        
        return res.status(200).json({ 
          success: true, 
          message: 'Post updated successfully' 
        });

      case 'DELETE':
        // Delete blog post
        const { postId } = req.query;
        
        if (!postId || typeof postId !== 'string') {
          return res.status(400).json({ error: 'Post ID is required' });
        }

        await deleteDoc(doc(db, 'posts', postId));
        
        return res.status(200).json({ 
          success: true, 
          message: 'Post deleted successfully' 
        });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Posts API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
