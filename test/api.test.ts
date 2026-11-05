import test from 'node:test';
import assert from 'node:assert';

import healthHandler from '../api/health.ts';
import githubHandler from '../api/github/index.ts';
import githubReposHandler from '../api/github/repos.ts';
import leetcodeHandler from '../api/leetcode.ts';
import contactHandler from '../api/contact.ts';
import { memoryCache } from '../api/_lib/cache.ts';

function createMockRes() {
  const res: any = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: null as any,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: any) {
      this.body = data;
      return this;
    },
    setHeader(name: string, value: any) {
      this.headers[name] = value;
      return this;
    },
    end() {},
  };
  return res;
}

test('GET /api/health returns 200 and healthy status', async () => {
  const res = createMockRes();
  await healthHandler({ method: 'GET' }, res);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.status, 'healthy');
  assert.strictEqual(res.body.profile, 'Somesh Chandra Behera');
});

test('OPTIONS preflight returns 200 with CORS headers', async () => {
  const res = createMockRes();
  await healthHandler({ method: 'OPTIONS' }, res);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['Access-Control-Allow-Origin'], '*');
});

test('GET /api/github retrieves profile and caches response', async () => {
  const res1 = createMockRes();
  await githubHandler({ method: 'GET', query: { refresh: 'true' } }, res1);
  assert.strictEqual(res1.statusCode, 200);
  assert.strictEqual(res1.body.username, 'Someshx98');
  assert.ok(res1.body.public_repos >= 11);
  assert.strictEqual(typeof res1.body.dominant_language, 'string');
  assert.ok(Array.isArray(res1.body.recent_activity));

  // Second call without refresh should use memory cache
  const res2 = createMockRes();
  await githubHandler({ method: 'GET' }, res2);
  assert.strictEqual(res2.statusCode, 200);
  assert.strictEqual(res2.body.username, 'Someshx98');
});

test('GET /api/github/repos supports filtering by search and language', async () => {
  const res = createMockRes();
  await githubReposHandler({ method: 'GET', query: { search: 'LeetCode' } }, res);
  assert.strictEqual(res.statusCode, 200);
  assert.ok(res.body.total >= 1);
  assert.ok(res.body.repos.some((r: any) => r.name.includes('LeetCode')));
});

test('GET /api/leetcode returns full statistics structure', async () => {
  const res = createMockRes();
  await leetcodeHandler({ method: 'GET', query: { refresh: 'true' } }, res);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.username, 'PtVRqr4rhF');
  assert.ok(typeof res.body.solvedNumber === 'number');
  assert.ok(res.body.solvedNumber >= 125);
  assert.ok(res.body.categories.easy.solved > 0);
  assert.ok(res.body.categories.medium.solved > 0);
  assert.ok(res.body.categories.hard.solved > 0);
  assert.ok(Array.isArray(res.body.languages));
  assert.ok(Array.isArray(res.body.recentSubmissions));
});

test('POST /api/contact enforces input validation', async () => {
  // Missing name
  const res1 = createMockRes();
  await contactHandler({ method: 'POST', body: { name: '', email: 'somesh@example.com', message: 'Hello' } }, res1);
  assert.strictEqual(res1.statusCode, 400);

  // Invalid email
  const res2 = createMockRes();
  await contactHandler({ method: 'POST', body: { name: 'Alice', email: 'invalid-email', message: 'Hello' } }, res2);
  assert.strictEqual(res2.statusCode, 400);

  // Short message
  const res3 = createMockRes();
  await contactHandler({ method: 'POST', body: { name: 'Alice', email: 'alice@test.com', message: 'hi' } }, res3);
  assert.strictEqual(res3.statusCode, 400);

  // Valid submission
  const res4 = createMockRes();
  await contactHandler({ method: 'POST', body: { name: 'Alice', email: 'alice@test.com', message: 'Excited to connect regarding opportunities!' } }, res4);
  assert.strictEqual(res4.statusCode, 200);
  assert.strictEqual(res4.body.success, true);
});

test('Memory cache preserves last known good data when expired', () => {
  memoryCache.clear();
  memoryCache.set('test_key', { value: 42 });
  assert.strictEqual(memoryCache.get<{ value: number }>('test_key', 1000)?.value, 42);
  // Last known good remains even if TTL 0 is passed
  assert.strictEqual(memoryCache.getLastKnownGood<{ value: number }>('test_key')?.value, 42);
});
