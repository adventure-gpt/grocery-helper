import { getAuthenticatedUser, unauthorizedResponse, jsonResponse, generateId } from '../auth-helper.js';

export async function onRequestGet(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { results: lists } = await context.env.DB.prepare(
    'SELECT id, name, created_at FROM lists WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(user.id).all();

  const listsWithCounts = await Promise.all(lists.map(async (list) => {
    const count = await context.env.DB.prepare(
      'SELECT COUNT(*) as total, SUM(CASE WHEN checked = 1 THEN 1 ELSE 0 END) as checked FROM list_items WHERE list_id = ?'
    ).bind(list.id).first();
    return {
      ...list,
      item_count: count.total,
      checked_count: count.checked || 0
    };
  }));

  return jsonResponse({ lists: listsWithCounts });
}

export async function onRequestPost(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { name, items } = await context.request.json();

  if (!name || !name.trim()) {
    return jsonResponse({ error: 'List name is required' }, 400);
  }

  const listId = generateId();

  await context.env.DB.prepare(
    'INSERT INTO lists (id, user_id, name) VALUES (?, ?, ?)'
  ).bind(listId, user.id, name.trim()).run();

  if (items && items.length > 0) {
    const stmt = context.env.DB.prepare(
      'INSERT INTO list_items (id, list_id, item_id, quantity, user_id) VALUES (?, ?, ?, ?, ?)'
    );
    const batch = items.map(item =>
      stmt.bind(generateId(), listId, item.item_id, item.quantity || '1', user.id)
    );
    await context.env.DB.batch(batch);
  }

  return jsonResponse({ list: { id: listId, name: name.trim() } }, 201);
}
