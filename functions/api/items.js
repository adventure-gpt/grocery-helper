import { getAuthenticatedUser, unauthorizedResponse, jsonResponse, generateId } from '../auth-helper.js';

export async function onRequestGet(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { results } = await context.env.DB.prepare(
    'SELECT id, name, category, is_favorite, price, created_at FROM items WHERE user_id = ? ORDER BY category, name'
  ).bind(user.id).all();

  return jsonResponse({ items: results });
}

export async function onRequestPost(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { name, category, price } = await context.request.json();

  if (!name || !name.trim()) {
    return jsonResponse({ error: 'Item name is required' }, 400);
  }

  const itemCategory = category || 'Other';
  const itemPrice = price != null ? price : null;
  const id = generateId();

  await context.env.DB.prepare(
    'INSERT INTO items (id, user_id, name, category, price) VALUES (?, ?, ?, ?, ?)'
  ).bind(id, user.id, name.trim(), itemCategory, itemPrice).run();

  return jsonResponse({
    item: { id, name: name.trim(), category: itemCategory, is_favorite: 0, price: itemPrice }
  }, 201);
}
