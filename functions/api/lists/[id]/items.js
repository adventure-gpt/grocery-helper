import { getAuthenticatedUser, unauthorizedResponse, jsonResponse, generateId } from '../../../auth-helper.js';

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

  const { items } = await context.request.json();

  if (!items || items.length === 0) {
    return jsonResponse({ error: 'No items provided' }, 400);
  }

  const stmt = context.env.DB.prepare(
    'INSERT INTO list_items (id, list_id, item_id, quantity, user_id) VALUES (?, ?, ?, ?, ?)'
  );
  const batch = items.map(item =>
    stmt.bind(generateId(), listId, item.item_id, item.quantity || '1', user.id)
  );
  await context.env.DB.batch(batch);

  return jsonResponse({ success: true }, 201);
}

export async function onRequestPut(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id: listId } = context.params;
  const { list_item_id, checked, quantity } = await context.request.json();

  if (!list_item_id) {
    return jsonResponse({ error: 'list_item_id is required' }, 400);
  }

  const listItem = await context.env.DB.prepare(
    'SELECT li.id FROM list_items li JOIN lists l ON li.list_id = l.id WHERE li.id = ? AND l.user_id = ?'
  ).bind(list_item_id, user.id).first();

  if (!listItem) {
    return jsonResponse({ error: 'List item not found' }, 404);
  }

  const updates = [];
  const values = [];

  if (checked !== undefined) {
    updates.push('checked = ?');
    values.push(checked ? 1 : 0);
  }
  if (quantity !== undefined) {
    updates.push('quantity = ?');
    values.push(quantity);
  }

  if (updates.length > 0) {
    values.push(list_item_id);
    await context.env.DB.prepare(
      `UPDATE list_items SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...values).run();
  }

  return jsonResponse({ success: true });
}

export async function onRequestDelete(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const url = new URL(context.request.url);
  const listItemId = url.searchParams.get('list_item_id');

  if (!listItemId) {
    return jsonResponse({ error: 'list_item_id query parameter is required' }, 400);
  }

  await context.env.DB.prepare(
    `DELETE FROM list_items WHERE id = ? AND user_id = ?`
  ).bind(listItemId, user.id).run();

  return jsonResponse({ success: true });
}
