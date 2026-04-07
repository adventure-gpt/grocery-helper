import { getAuthenticatedUser, unauthorizedResponse, jsonResponse } from '../../auth-helper.js';

export async function onRequestPut(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id } = context.params;
  const body = await context.request.json();

  const item = await context.env.DB.prepare(
    'SELECT id FROM items WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first();

  if (!item) {
    return jsonResponse({ error: 'Item not found' }, 404);
  }

  const updates = [];
  const values = [];

  if (body.name !== undefined) {
    updates.push('name = ?');
    values.push(body.name.trim());
  }
  if (body.category !== undefined) {
    updates.push('category = ?');
    values.push(body.category);
  }
  if (body.is_favorite !== undefined) {
    updates.push('is_favorite = ?');
    values.push(body.is_favorite ? 1 : 0);
  }
  if (body.price !== undefined) {
    updates.push('price = ?');
    values.push(body.price != null ? body.price : null);
  }

  if (updates.length === 0) {
    return jsonResponse({ error: 'No updates provided' }, 400);
  }

  values.push(id, user.id);
  await context.env.DB.prepare(
    `UPDATE items SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();

  const updated = await context.env.DB.prepare(
    'SELECT id, name, category, is_favorite, price, created_at FROM items WHERE id = ?'
  ).bind(id).first();

  return jsonResponse({ item: updated });
}

export async function onRequestDelete(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id } = context.params;

  await context.env.DB.prepare(
    'DELETE FROM items WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return jsonResponse({ success: true });
}
