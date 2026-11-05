import type { ApiRequest, ApiResponse } from '../_lib/types.ts';
import { handleCors } from '../_lib/cors.ts';
import { fetchGitHubReposList } from '../_lib/github.ts';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (handleCors(req, res)) return;

  const search = typeof req.query?.search === 'string' ? req.query.search : undefined;
  const language = typeof req.query?.language === 'string' ? req.query.language : undefined;
  const sort = typeof req.query?.sort === 'string' ? req.query.sort : undefined;

  try {
    const result = await fetchGitHubReposList({ search, language, sort });
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (error: any) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      error: 'Failed to retrieve GitHub repositories',
      message: error?.message || 'Internal server error',
    });
  }
}
