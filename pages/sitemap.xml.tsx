import { GetServerSideProps } from 'next';
import { getSitemapDocuments } from '@/lib/sitemap';
import { createSitemapIndex } from '@/lib/sitemap-xml';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const documents = await getSitemapDocuments();
    const xml = documents.length === 1 ? documents[0] : createSitemapIndex(documents.length);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.end(xml);
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Sitemap temporarily unavailable');
  }
  return { props: {} };
};

export default Sitemap;
