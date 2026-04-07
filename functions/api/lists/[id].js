import { getAuthenticatedUser, unauthorizedResponse, jsonResponse } from '../../auth-helper.js';

export async function onRequestGet(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id } = context.params;

  const list = await context.env.DB.prepare(
    'SELECT id, name, created_at FROM lists WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first();

  if (!list) {
    return jsonResponse({ error: 'List not found' }, 404);
  }

  const { results: listItems } = await context.env.DB.prepare(
    `SELECT li.id, li.item_id, li.quantity, li.checked, i.name, i.category, i.is_favorite, i.price
     FROM list_items li
     JOIN items i ON li.item_id = i.id
     WHERE li.list_id = ?
     ORDER BY i.category, i.name`
  ).bind(id).all();

  const shareToken = await context.env.DB.prepare(
    'SELECT token FROM share_tokens WHERE list_id = ?'
  ).bind(id).first();

  return jsonResponse({
    list: {
      ...list,
      items: listItems,
      share_token: shareToken ? shareToken.token : null
    }
  });
}

export async function onRequestPut(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id } = context.params;
  const { name } = await context.request.json();

  const list = await context.env.DB.prepare(
    'SELECT id FROM lists WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).first();

  if (!list) {
    return jsonResponse({ error: 'List not found' }, 404);
  }

  if (name) {
    await context.env.DB.prepare(
      'UPDATE lists SET name = ? WHERE id = ?'
    ).bind(name.trim(), id).run();
  }

  return jsonResponse({ success: true });
}

export async function onRequestDelete(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();

  const { id } = context.params;

  await context.env.DB.prepare(
    'DELETE FROM lists WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run();

  return jsonResponse({ success: true });
}
