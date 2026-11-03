import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    if (method === 'GET') {
      // Fetch all blogs
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const blogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate().toISOString() || new Date().toISOString(),
          publishedAt: doc.data().publishedAt?.toDate().toISOString() || null,
        }));

        return res.status(200).json({ success: true, blogs });
      } catch (error) {
        console.error('Blogs API error:', error);
        // Fallback to mock data if Firebase fails
        return res.status(200).json({ 
          success: true, 
          blogs: [] // Return empty array as fallback
        });
      }
    }

    if (method === 'POST') {
      // Create new blog
      const { title, excerpt, content, featuredImage, author, tags, published, readTime } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const newBlog = {
        title,
        excerpt: excerpt || '',
        content,
        featuredImage: featuredImage || '',
        author: author || 'Admin',
        authorImage: '',
        tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : []),
        readTime: readTime || 5,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        const docRef = await addDoc(collection(db, 'blogs'), newBlog);
        return res.status(201).json({ 
          success: true, 
          message: 'Blog created successfully',
          id: docRef.id 
        });
      } catch (error) {
        console.error('Create blog error:', error);
        return res.status(500).json({ error: 'Failed to create blog' });
      }
    }

    if (method === 'PUT') {
      // Update blog
      const { id, ...updateData } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      const updatedBlog = {
        ...updateData,
        updatedAt: new Date(),
        publishedAt: updateData.published && !updateData.publishedAt ? new Date() : updateData.publishedAt,
      };

      try {
        await updateDoc(doc(db, 'blogs', id), updatedBlog);
        return res.status(200).json({ 
          success: true, 
          message: 'Blog updated successfully' 
        });
      } catch (error) {
        console.error('Update blog error:', error);
        return res.status(500).json({ error: 'Failed to update blog' });
      }
    }

    if (method === 'DELETE') {
      // Delete blog
      const { blogId } = req.query;
      
      if (!blogId || typeof blogId !== 'string') {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      try {
        await deleteDoc(doc(db, 'blogs', blogId));
        return res.status(200).json({ 
          success: true, 
          message: 'Blog deleted successfully' 
        });
      } catch (error) {
        console.error('Delete blog error:', error);
        return res.status(500).json({ error: 'Failed to delete blog' });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error: any) {
    console.error('Blogs API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    });
  }
}
