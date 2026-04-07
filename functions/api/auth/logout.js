import { jsonResponse } from '../../auth-helper.js';

export async function onRequestPost(context) {
  const { env, request } = context;

  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('session='));
  const token = match ? match.split('=')[1] : null;

  if (token) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
    }
  });
}
