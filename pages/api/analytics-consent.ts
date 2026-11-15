import type { NextApiRequest, NextApiResponse } from 'next';
import { analyticsRegionPolicy } from '@/lib/analytics-consent';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }
  const country = process.env.VERCEL === '1' ? req.headers['x-vercel-ip-country'] : undefined;
  const subdivision = process.env.VERCEL === '1' ? req.headers['x-vercel-ip-country-region'] : undefined;
  return res.status(200).json(analyticsRegionPolicy(
    typeof country === 'string' ? country : undefined,
    typeof subdivision === 'string' ? subdivision : undefined,
  ));
}
