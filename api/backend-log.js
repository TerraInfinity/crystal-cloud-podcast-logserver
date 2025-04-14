
import { POST } from '../src/api/backend-log';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Convert the Vercel API request to a standard Request object
  const request = new Request(`https://${req.headers.host}/api/backend-log`, {
    method: 'POST',
    headers: new Headers(req.headers),
    body: JSON.stringify(req.body)
  });

  // Process with our existing handler
  const response = await POST(request);
  
  // Convert Response object to Vercel response
  const result = await response.json();
  res.status(response.status).json(result);
}
