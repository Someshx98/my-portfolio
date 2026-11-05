import type { ApiRequest, ApiResponse } from './types.ts';

export function handleCors(req: ApiRequest, res: ApiResponse): boolean {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200);
    if (res.end) {
      res.end();
    } else if (res.send) {
      res.send('');
    }
    return true;
  }

  return false;
}
