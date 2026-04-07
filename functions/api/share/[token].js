import { jsonResponse } from '../../auth-helper.js';

export async function onRequestGet(context) {
  const { token } = context.params;

  const shareRecord = await context.env.DB.prepare(
    'SELECT list_id FROM share_tokens WHERE token = ?'
  ).bind(token).first();

  if (!shareRecord) {
    return jsonResponse({ error: 'Shared list not found' }, 404);
  }

  const list = await context.env.DB.prepare(
    'SELECT id, name, created_at FROM lists WHERE id = ?'
  ).bind(shareRecord.list_id).first();

  if (!list) {
    return jsonResponse({ error: 'List no longer exists' }, 404);
  }

  const { results: listItems } = await context.env.DB.prepare(
    `SELECT li.id, li.quantity, li.checked, i.name, i.category
     FROM list_items li
     JOIN items i ON li.item_id = i.id
     WHERE li.list_id = ?
     ORDER BY i.category, i.name`
  ).bind(shareRecord.list_id).all();

  return jsonResponse({
    list: {
      name: list.name,
      created_at: list.created_at,
      items: listItems
    }
  });
}
