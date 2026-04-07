export async function getAuthenticatedUser(request, env) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('session='));
  const token = match ? match.split('=')[1] : null;
  if (!token) return null;

  const session = await env.DB.prepare(
    'SELECT user_id, expires_at FROM sessions WHERE token = ?'
  ).bind(token).first();

  if (!session || new Date(session.expires_at) < new Date()) {
    if (session) {
      await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    }
    return null;
  }

  const user = await env.DB.prepare(
    'SELECT id, email FROM users WHERE id = ?'
  ).bind(session.user_id).first();

  return user;
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function generateId() {
  return crypto.randomUUID();
}

export function generateToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}
