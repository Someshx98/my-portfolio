import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

import healthHandler from './api/health.ts';
import githubHandler from './api/github/index.ts';
import githubReposHandler from './api/github/repos.ts';
import leetcodeHandler from './api/leetcode.ts';
import contactHandler from './api/contact.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Routes mounted from shared Vercel serverless handlers
app.all('/api/health', (req: Request, res: Response) => healthHandler(req, res));
app.all('/api/github', (req: Request, res: Response) => githubHandler(req, res));
app.all('/api/github/repos', (req: Request, res: Response) => githubReposHandler(req, res));
app.all('/api/leetcode', (req: Request, res: Response) => leetcodeHandler(req, res));
app.all('/api/contact', (req: Request, res: Response) => contactHandler(req, res));

// Initialize dev server with Vite middlewares or static files for prod
async function bootstrap() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Somesh Portfolio Runtime listening on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
});
