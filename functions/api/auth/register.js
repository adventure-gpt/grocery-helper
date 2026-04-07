import bcrypt from 'bcryptjs';
import { generateId, generateToken, jsonResponse } from '../../auth-helper.js';

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return jsonResponse({ error: 'Email and password are required' }, 400);
    }

    if (password.length < 6) {
      return jsonResponse({ error: 'Password must be at least 6 characters' }, 400);
    }

    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (existing) {
      return jsonResponse({ error: 'An account with that email already exists' }, 409);
    }

    const id = generateId();
    const passwordHash = await bcrypt.hash(password, 10);

    await env.DB.prepare(
      'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)'
    ).bind(id, email.toLowerCase().trim(), passwordHash).run();

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
      'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(token, id, expiresAt).run();

    return new Response(JSON.stringify({ user: { id, email: email.toLowerCase().trim() } }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
      }
    });
  } catch (err) {
    return jsonResponse({ error: 'Something went wrong. Please try again.' }, 500);
  }
}
