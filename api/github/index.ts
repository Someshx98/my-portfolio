import type { ApiRequest, ApiResponse } from '../_lib/types.ts';
import { handleCors } from '../_lib/cors.ts';
import { fetchGitHubTelemetry } from '../_lib/github.ts';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (handleCors(req, res)) return;

  const forceRefresh = req.query?.refresh === 'true';

  try {
    const data = await fetchGitHubTelemetry(forceRefresh);

    if (forceRefresh) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (error: any) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      error: 'Failed to retrieve GitHub telemetry',
      message: error?.message || 'Internal server error',
    });
  }
}
