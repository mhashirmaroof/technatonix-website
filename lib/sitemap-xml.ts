export const SITE_URL = 'https://www.technatonix.com';
const MAX_URLS = 50_000;
const MAX_BYTES = 50 * 1024 * 1024;
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>\n';
const URLSET_OPEN = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
const URLSET_CLOSE = '</urlset>\n';

export interface SitemapEntry {
  path: string;
  lastModified?: string | null;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  }[character] || character));
}

export function createSitemapDocuments(entries: SitemapEntry[]): string[] {
  const documents: string[] = [];
  let items: string[] = [];
  let bytes = Buffer.byteLength(XML_HEADER + URLSET_OPEN + URLSET_CLOSE);
  const seen = new Set<string>();

  for (const entry of entries) {
    if (seen.has(entry.path)) continue;
    seen.add(entry.path);
    const loc = escapeXml(`${SITE_URL}${entry.path}`);
    const lastmod = entry.lastModified ? `<lastmod>${escapeXml(entry.lastModified)}</lastmod>` : '';
    const item = `  <url><loc>${loc}</loc>${lastmod}</url>\n`;
    const itemBytes = Buffer.byteLength(item);
    if (itemBytes + Buffer.byteLength(XML_HEADER + URLSET_OPEN + URLSET_CLOSE) > MAX_BYTES) {
      throw new Error('A sitemap URL exceeds the sitemap size limit');
    }
    if (items.length >= MAX_URLS || bytes + itemBytes > MAX_BYTES) {
      documents.push(XML_HEADER + URLSET_OPEN + items.join('') + URLSET_CLOSE);
      items = [];
      bytes = Buffer.byteLength(XML_HEADER + URLSET_OPEN + URLSET_CLOSE);
    }
    items.push(item);
    bytes += itemBytes;
  }
  if (items.length || documents.length === 0) {
    documents.push(XML_HEADER + URLSET_OPEN + items.join('') + URLSET_CLOSE);
  }
  return documents;
}

export function createSitemapIndex(count: number): string {
  if (count > MAX_URLS) throw new Error('Sitemap index exceeds the sitemap count limit');
  const items = Array.from({ length: count }, (_, index) =>
    `  <sitemap><loc>${SITE_URL}/sitemap/${index + 1}.xml</loc></sitemap>\n`
  ).join('');
  const xml = `${XML_HEADER}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}</sitemapindex>\n`;
  if (Buffer.byteLength(xml) > MAX_BYTES) throw new Error('Sitemap index exceeds the sitemap size limit');
  return xml;
}
