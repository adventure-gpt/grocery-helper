import { getAuthenticatedUser, unauthorizedResponse, jsonResponse } from '../../auth-helper.js';

export async function onRequestGet(context) {
  const user = await getAuthenticatedUser(context.request, context.env);
  if (!user) return unauthorizedResponse();
  return jsonResponse({ user });
}
