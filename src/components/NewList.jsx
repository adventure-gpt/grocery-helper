import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { items as itemsApi, lists as listsApi } from '../api';
import { Plus, Search, Star, ShoppingCart, Check, X, ChevronDown, ChevronRight, Minus, DollarSign } from 'lucide-react';
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

export default function NewList() {
  const navigate = useNavigate();
  const { id: editListId } = useParams();
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Map()); // item_id -> { quantity }
  const [listName, setListName] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set(CATEGORIES.map(c => c.name)));
  const searchRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const itemsData = await itemsApi.list();
        setAllItems(itemsData.items);

        if (editListId) {
          const listData = await listsApi.get(editListId);
          setListName(listData.list.name);
          const sel = new Map();
          listData.list.items.forEach(li => {
            sel.set(li.item_id, { quantity: li.quantity, list_item_id: li.id });
          });
          setSelectedItems(sel);
        } else {
          const today = new Date();
          setListName(`Grocery Run - ${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [editListId]);

  const favorites = useMemo(
    () => allItems.filter(i => i.is_favorite),
    [allItems]
  );

  const filteredItems = useMemo(() => {
    if (!search.trim()) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(i => i.name.toLowerCase().includes(q));
  }, [allItems, search]);

  const groupedItems = useMemo(() => {
    const groups = {};
    CATEGORIES.forEach(c => { groups[c.name] = []; });
    filteredItems.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      } else {
        groups['Other'].push(item);
      }
    });
    return groups;
  }, [filteredItems]);

  function toggleItem(itemId) {
    setSelectedItems(prev => {
      const next = new Map(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.set(itemId, { quantity: '1' });
      }
      return next;
    });
  }

  function updateQuantity(itemId, quantity) {
    setSelectedItems(prev => {
      const next = new Map(prev);
      const existing = next.get(itemId) || {};
      next.set(itemId, { ...existing, quantity });
      return next;
    });
  }

  function toggleCategory(catName) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(catName)) next.delete(catName);
      else next.add(catName);
      return next;
    });
  }

  async function toggleFavorite(e, item) {
    e.stopPropagation();
    const updated = await itemsApi.update(item.id, { is_favorite: !item.is_favorite });
    setAllItems(prev => prev.map(i => i.id === item.id ? { ...i, is_favorite: updated.item.is_favorite } : i));
  }

  async function handleAddNewItem(e) {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      const priceVal = newItemPrice.trim() ? parseFloat(newItemPrice) : null;
      const { item } = await itemsApi.create(newItemName.trim(), newItemCategory, priceVal);
      setAllItems(prev => [...prev, item]);
      setSelectedItems(prev => {
        const next = new Map(prev);
        next.set(item.id, { quantity: '1' });
        return next;
      });
      setNewItemName('');
      setNewItemPrice('');
      setShowAddItem(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    if (selectedItems.size === 0 || !listName.trim()) return;
    setSaving(true);

    try {
      const listItems = Array.from(selectedItems.entries()).map(([item_id, data]) => ({
        item_id,
        quantity: data.quantity || '1',
      }));

      if (editListId) {
        await listsApi.update(editListId, listName);
        // Remove existing items and re-add
        const existingList = await listsApi.get(editListId);
        for (const li of existingList.list.items) {
          await listsApi.removeItem(editListId, li.id);
        }
        if (listItems.length > 0) {
          await listsApi.addItems(editListId, listItems);
        }
        navigate(`/list/${editListId}`);
      } else {
        const { list } = await listsApi.create(listName, listItems);
        navigate(`/list/${list.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const selectedCount = selectedItems.size;

  const estimatedTotal = useMemo(() => {
    let total = 0;
    let hasAnyPrice = false;
    selectedItems.forEach((data, itemId) => {
      const item = allItems.find(i => i.id === itemId);
      if (item?.price != null) {
        hasAnyPrice = true;
        const qty = parseInt(data.quantity) || 1;
        total += item.price * qty;
      }
    });
    return hasAnyPrice ? total : null;
  }, [selectedItems, allItems]);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="mb-6">
        <input
          type="text"
          value={listName}
          onChange={e => setListName(e.target.value)}
          placeholder="List name..."
          className="text-2xl font-extrabold text-stone-800 bg-transparent border-none outline-none w-full placeholder-stone-300"
        />
        <p className="text-stone-500 font-medium mt-1">
          Browse your items and tap to add them to this list
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-medium"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); searchRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-4 h-4 text-stone-400" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowAddItem(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Item</span>
        </button>
      </div>

      {/* Add New Item Modal */}
      <AnimatePresence>
        {showAddItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddItem(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-bold text-stone-800 mb-4">Add New Item</h3>
              <form onSubmit={handleAddNewItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1.5">Item Name</label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    placeholder="e.g., Organic Bananas"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1.5">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={e => setNewItemCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-1.5">Price <span className="text-stone-400 font-normal">(optional)</span></label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newItemPrice}
                      onChange={e => setNewItemPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddItem(false)}
                    className="flex-1 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newItemName.trim()}
                    className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold transition-colors"
                  >
                    Add & Select
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Section */}
      {favorites.length > 0 && !search && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-orange-600 uppercase tracking-wider mb-3">
            <Star className="w-4 h-4 fill-orange-400" />
            Favorites
          </h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map(item => {
              const isSelected = selectedItems.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    isSelected
                      ? 'bg-green-100 text-green-700 border-2 border-green-400 shadow-sm'
                      : 'bg-white text-stone-600 border-2 border-stone-200 hover:border-green-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Items by Category */}
      {allItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🥑</div>
          <h3 className="text-lg font-bold text-stone-700 mb-2">No items yet!</h3>
          <p className="text-stone-500 mb-4">
            Add your first item to start building your personal grocery library.
          </p>
          <button
            onClick={() => setShowAddItem(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {CATEGORIES.map(cat => {
            const catItems = groupedItems[cat.name] || [];
            if (catItems.length === 0) return null;
            const isExpanded = expandedCategories.has(cat.name);

            return (
              <div key={cat.name} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-bold text-stone-700">
                    <span className="text-lg">{cat.emoji}</span>
                    {cat.name}
                    <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      {catItems.length}
                    </span>
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-stone-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-stone-400" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-stone-100">
                        {catItems.map(item => {
                          const isSelected = selectedItems.has(item.id);
                          const sel = selectedItems.get(item.id);

                          return (
                            <div
                              key={item.id}
                              className={`flex items-center gap-3 px-4 py-3 border-b border-stone-50 last:border-b-0 transition-colors ${
                                isSelected ? 'bg-green-50/50' : 'hover:bg-stone-50'
                              }`}
                            >
                              <button
                                onClick={() => toggleItem(item.id)}
                                className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-stone-300 hover:border-green-400'
                                }`}
                              >
                                {isSelected && <Check className="w-4 h-4 text-white" />}
                              </button>

                              <span
                                onClick={() => toggleItem(item.id)}
                                className={`flex-1 font-semibold cursor-pointer ${
                                  isSelected ? 'text-green-800' : 'text-stone-700'
                                }`}
                              >
                                {item.name}
                                {item.price != null && (
                                  <span className="ml-2 text-xs font-semibold text-green-600">${Number(item.price).toFixed(2)}</span>
                                )}
                              </span>

                              <button
                                onClick={(e) => toggleFavorite(e, item)}
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

                              {isSelected && (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={sel?.quantity || '1'}
                                    onChange={e => updateQuantity(item.id, e.target.value)}
                                    className="w-16 text-center text-sm font-semibold px-2 py-1 rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Qty"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Save Bar */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-4 z-40"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-stone-800">
                    {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
                    {estimatedTotal != null && (
                      <span className="ml-2 text-green-600">~${estimatedTotal.toFixed(2)}</span>
                    )}
                  </p>
                  <p className="text-xs text-stone-500">{listName}</p>
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={saving || !listName.trim()}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-green-200 transition-all"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {editListId ? 'Update List' : 'Create List'}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
