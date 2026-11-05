import type { ApiRequest, ApiResponse } from './_lib/types.ts';
import { handleCors } from './_lib/cors.ts';

const contactMessages: Array<{ name: string; email: string; message: string; date: string }> = [];

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method Not Allowed. Please send a POST request.' });
  }

  const { name, email, message } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: 'Please enter your name.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
  }

  const record = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  };

  contactMessages.push(record);
  console.log(`[Contact Form Received] From: ${record.name} <${record.email}>`);

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    success: true,
    message: 'Message dispatched into runtime. Thank you for connecting, Somesh will respond promptly!',
    record,
  });
}
