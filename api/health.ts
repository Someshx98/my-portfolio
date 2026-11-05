import type { ApiRequest, ApiResponse } from './_lib/types.ts';
import { handleCors } from './_lib/cors.ts';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (handleCors(req, res)) return;

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    status: 'healthy',
    runtime: 'Node.js / Vercel Serverless Function',
    profile: 'Somesh Chandra Behera',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
}
