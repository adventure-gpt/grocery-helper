async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

// Auth
export const auth = {
  me: () => request('/api/auth/me'),
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password) => request('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
};

// Items
export const items = {
  list: () => request('/api/items'),
  create: (name, category) => request('/api/items', { method: 'POST', body: JSON.stringify({ name, category }) }),
  update: (id, data) => request(`/api/items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/items/${id}`, { method: 'DELETE' }),
};

// Lists
export const lists = {
  list: () => request('/api/lists'),
  get: (id) => request(`/api/lists/${id}`),
  create: (name, listItems) => request('/api/lists', { method: 'POST', body: JSON.stringify({ name, items: listItems }) }),
  update: (id, name) => request(`/api/lists/${id}`, { method: 'PUT', body: JSON.stringify({ name }) }),
  remove: (id) => request(`/api/lists/${id}`, { method: 'DELETE' }),
  addItems: (id, listItems) => request(`/api/lists/${id}/items`, { method: 'POST', body: JSON.stringify({ items: listItems }) }),
  updateItem: (id, listItemId, data) => request(`/api/lists/${id}/items`, { method: 'PUT', body: JSON.stringify({ list_item_id: listItemId, ...data }) }),
  removeItem: (id, listItemId) => request(`/api/lists/${id}/items?list_item_id=${listItemId}`, { method: 'DELETE' }),
  share: (id) => request(`/api/lists/${id}/share`, { method: 'POST' }),
};

// Shared
export const shared = {
  get: (token) => request(`/api/share/${token}`),
};
