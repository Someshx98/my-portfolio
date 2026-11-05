import type { ApiRequest, ApiResponse } from './_lib/types.ts';
import { handleCors } from './_lib/cors.ts';
import { fetchLeetCodeStats } from './_lib/leetcode.ts';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (handleCors(req, res)) return;

  const forceRefresh = req.query?.refresh === 'true';

  try {
    const stats = await fetchLeetCodeStats(forceRefresh);

    if (forceRefresh) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(stats);
  } catch (error: any) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      error: 'Failed to retrieve LeetCode statistics',
      message: error?.message || 'Internal server error',
    });
  }
}
