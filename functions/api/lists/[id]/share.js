import { getAuthenticatedUser, unauthorizedResponse, jsonResponse, generateToken } from '../../../auth-helper.js';

export async function onRequestPost(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id: listId } = context.params;

  const list = await context.env.DB.prepare(
    'SELECT id FROM lists WHERE id = ? AND user_id = ?'
  ).bind(listId, user.id).first();

  if (!list) {
    return jsonResponse({ error: 'List not found' }, 404);
  }

  const existing = await context.env.DB.prepare(
    'SELECT token FROM share_tokens WHERE list_id = ?'
  ).bind(listId).first();

  if (existing) {
    return jsonResponse({ token: existing.token });
  }

  const token = generateToken().substring(0, 12);

  await context.env.DB.prepare(
    'INSERT INTO share_tokens (token, list_id, created_by) VALUES (?, ?, ?)'
  ).bind(token, listId, user.id).run();

  return jsonResponse({ token }, 201);
}
