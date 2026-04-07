import { useState, useEffect, useMemo } from 'react';
import { items as itemsApi } from '../api';
import { Search, Star, Plus, Trash2, Edit3, Check, X, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { name: 'Produce', emoji: '🥬' },
  { name: 'Dairy & Eggs', emoji: '🥛' },
  { name: 'Meat & Seafood', emoji: '🥩' },
  { name: 'Bakery', emoji: '🍞' },
  { name: 'Frozen', emoji: '🧊' },
  { name: 'Pantry & Canned', emoji: '🥫' },
  { name: 'Snacks', emoji: '🍿' },
  { name: 'Beverages', emoji: '🥤' },
  { name: 'Household', emoji: '🧹' },
  { name: 'Personal Care', emoji: '🧴' },
  { name: 'Other', emoji: '📦' },
];

export default function ItemLibrary() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Other');
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    itemsApi.list()
      .then(data => setAllItems(data.items))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let items = allItems;
    if (filter === 'favorites') items = items.filter(i => i.is_favorite);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [allItems, search, filter]);

  const grouped = useMemo(() => {
    const groups = {};
    CATEGORIES.forEach(c => { groups[c.name] = []; });
    filtered.forEach(item => {
      if (groups[item.category]) groups[item.category].push(item);
      else groups['Other'].push(item);
    });
    return groups;
  }, [filtered]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const { item } = await itemsApi.create(newName.trim(), newCategory);
      setAllItems(prev => [...prev, item]);
      setNewName('');
      setShowAdd(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleFavorite(item) {
    const { item: updated } = await itemsApi.update(item.id, { is_favorite: !item.is_favorite });
    setAllItems(prev => prev.map(i => i.id === item.id ? { ...i, is_favorite: updated.is_favorite } : i));
  }

  async function handleDelete(item) {
    if (!confirm(`Remove "${item.name}" from your items?`)) return;
    await itemsApi.remove(item.id);
    setAllItems(prev => prev.filter(i => i.id !== item.id));
  }

  function startEdit(item) {
    setEditingItem(item.id);
    setEditName(item.name);
    setEditCategory(item.category);
  }

  async function saveEdit() {
    if (!editName.trim() || !editingItem) return;
    const { item: updated } = await itemsApi.update(editingItem, {
      name: editName.trim(),
      category: editCategory,
    });
    setAllItems(prev => prev.map(i => i.id === editingItem ? { ...i, name: updated.name, category: updated.category } : i));
    setEditingItem(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-800">My Items</h1>
          <p className="text-stone-500 font-medium mt-1">
            {allItems.length} item{allItems.length !== 1 ? 's' : ''} in your library
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-md shadow-green-200 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Item</span>
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
          />
        </div>
        <div className="flex bg-stone-100 rounded-xl p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              filter === 'all' ? 'bg-white text-stone-700 shadow-sm' : 'text-stone-500'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${
              filter === 'favorites' ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-500'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Faves
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-bold text-stone-800 mb-4">Add New Item</h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1.5">Item Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g., Organic Bananas"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1.5">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="flex-1 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newName.trim()}
                    className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items */}
      {allItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🧺</div>
          <h2 className="text-xl font-bold text-stone-700 mb-2">Your item library is empty</h2>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            As you create grocery lists and add items, they'll be saved here. You can also add items directly.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Your First Item
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-stone-500 font-medium">No items match your search</p>
        </div>
      ) : (
        <div className="space-y-4">
          {CATEGORIES.map(cat => {
            const catItems = grouped[cat.name] || [];
            if (catItems.length === 0) return null;

            return (
              <div key={cat.name} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                  <h3 className="flex items-center gap-2 font-bold text-stone-700 text-sm">
                    <span className="text-base">{cat.emoji}</span>
                    {cat.name}
                    <span className="text-xs font-semibold text-stone-400 bg-stone-200 px-2 py-0.5 rounded-full">
                      {catItems.length}
                    </span>
                  </h3>
                </div>
                <div>
                  {catItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-3 border-b border-stone-50 last:border-b-0 hover:bg-stone-50 transition-colors"
                    >
                      {editingItem === item.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                            autoFocus
                          />
                          <select
                            value={editCategory}
                            onChange={e => setEditCategory(e.target.value)}
                            className="px-2 py-1.5 rounded-lg border border-stone-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            {CATEGORIES.map(c => (
                              <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                          <button onClick={saveEdit} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingItem(null)} className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1 font-semibold text-stone-700">{item.name}</span>
                          <button
                            onClick={() => toggleFavorite(item)}
                            className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                            aria-label={item.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            <Star
                              className={`w-4 h-4 transition-colors ${
                                item.is_favorite
                                  ? 'text-orange-400 fill-orange-400'
                                  : 'text-stone-300 hover:text-orange-300'
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => startEdit(item)}
                            className="p-1.5 rounded-lg text-stone-300 hover:text-stone-500 hover:bg-stone-100 transition-colors"
                            aria-label="Edit item"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-1.5 rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                            aria-label="Delete item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
