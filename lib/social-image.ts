import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SITE_METADATA } from '@/lib/site-metadata';

export interface SocialImage {
  url: string;
  type: 'image/png' | 'image/jpeg';
  width: number;
  height: number;
}

function dimensions(data: Buffer): Omit<SocialImage, 'url'> | null {
  if (data.length >= 24 && data.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) {
    return { type: 'image/png', width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  if (data.length < 4 || data[0] !== 0xff || data[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < data.length) {
    if (data[offset] !== 0xff) return null;
    const marker = data[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const size = data.readUInt16BE(offset + 2);
    if (size < 2 || offset + size + 2 > data.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { type: 'image/jpeg', height: data.readUInt16BE(offset + 5), width: data.readUInt16BE(offset + 7) };
    }
    offset += size + 2;
  }
  return null;
}

export async function getFeaturedSocialImage(source: string): Promise<SocialImage | null> {
  if (!source) return null;
  try {
    const url = new URL(source, SITE_METADATA.origin);
    let data: Buffer;
    if (url.origin === SITE_METADATA.origin && url.pathname.startsWith('/images/')) {
      const base = path.join(process.cwd(), 'public', 'images');
      const file = path.resolve(base, `.${decodeURIComponent(url.pathname.slice('/images'.length))}`);
      if (!file.startsWith(`${base}${path.sep}`)) return null;
      data = await readFile(file);
    } else if (url.protocol === 'https:' && url.hostname === 'firebasestorage.googleapis.com' && !url.port) {
      const response = await fetch(url, { signal: AbortSignal.timeout(4000), redirect: 'error' });
      if (!response.ok || !response.body) throw new Error(`Image HTTP ${response.status}`);
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let total = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > 5 * 1024 * 1024) {
          await reader.cancel();
          throw new Error('Image exceeds the social preview size limit');
        }
        chunks.push(value);
      }
      data = Buffer.concat(chunks);
    } else {
      return null;
    }
    const info = dimensions(data);
    if (!info || info.width < 600 || info.height < 315) return null;
    return { url: url.href, ...info };
  } catch (error) {
    console.warn('Featured social image unavailable:', source.split('?')[0], error);
    return null;
  }
}
