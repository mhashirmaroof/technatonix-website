import { GetServerSideProps } from 'next';
import { getSitemapDocuments } from '@/lib/sitemap';

const SitemapPart = () => null;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const part = params?.part;
  if (typeof part !== 'string' || !/^[1-9]\d*$/.test(part)) return { notFound: true };
  try {
    const documents = await getSitemapDocuments();
    const index = Number(part) - 1;
    if (!Number.isSafeInteger(index) || documents.length < 2 || index >= documents.length) {
      return { notFound: true };
    }
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.end(documents[index]);
  } catch (error) {
    console.error('Failed to generate sitemap part:', error);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Sitemap temporarily unavailable');
  }
  return { props: {} };
};

export default SitemapPart;
