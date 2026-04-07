import bcrypt from 'bcryptjs';
import { generateToken, jsonResponse } from '../../auth-helper.js';

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return jsonResponse({ error: 'Email and password are required' }, 400);
    }

    const user = await env.DB.prepare(
      'SELECT id, email, password_hash FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (!user) {
      return jsonResponse({ error: "That email/password combination didn't work" }, 401);
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return jsonResponse({ error: "That email/password combination didn't work" }, 401);
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
      'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(token, user.id, expiresAt).run();

    return new Response(JSON.stringify({ user: { id: user.id, email: user.email } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
      }
    });
  } catch (err) {
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500);
  }
}
