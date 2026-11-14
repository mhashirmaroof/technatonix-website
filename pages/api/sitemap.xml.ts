import { NextApiRequest, NextApiResponse } from 'next';
import { getSitemapDocuments } from '@/lib/sitemap';
import { createSitemapIndex } from '@/lib/sitemap-xml';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  try {
    const documents = await getSitemapDocuments();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).send(documents.length === 1 ? documents[0] : createSitemapIndex(documents.length));
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return res.status(503).send('Sitemap temporarily unavailable');
  }
}
