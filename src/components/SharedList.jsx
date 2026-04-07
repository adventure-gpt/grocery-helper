import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { shared } from '../api';
import { ShoppingCart, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const CATEGORY_EMOJIS = {
  'Produce': '🥬',
  'Dairy & Eggs': '🥛',
  'Meat & Seafood': '🥩',
  'Bakery': '🍞',
  'Frozen': '🧊',
  'Pantry & Canned': '🥫',
  'Snacks': '🍿',
  'Beverages': '🥤',
  'Household': '🧹',
  'Personal Care': '🧴',
  'Other': '📦',
};

export default function SharedList() {
  const { token } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    shared.get(token)
      .then(data => setList(data.list))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const groupedItems = useMemo(() => {
    if (!list) return {};
    const groups = {};
    list.items.forEach(item => {
      const cat = item.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [list]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-xl font-bold text-stone-700 mb-2">List Not Found</h1>
          <p className="text-stone-500">This shared list may have been deleted or the link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-2xl shadow-lg shadow-green-200 mb-4">
            <ShoppingCart className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-stone-800">{list.name}</h1>
          <p className="text-stone-500 font-medium mt-1">
            Shared grocery list · {format(new Date(list.created_at), 'MMM d, yyyy')}
          </p>
          <p className="text-sm text-stone-400 mt-1">
            {list.items.length} item{list.items.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                <h3 className="flex items-center gap-2 font-bold text-stone-700 text-sm">
                  <span className="text-base">{CATEGORY_EMOJIS[category] || '📦'}</span>
                  {category}
                </h3>
              </div>
              <div>
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 px-4 py-3 border-b border-stone-50 last:border-b-0 ${
                      item.checked ? 'bg-green-50/30' : ''
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      item.checked ? 'bg-green-500 border-green-500' : 'border-stone-300'
                    }`}>
                      {item.checked ? <Check className="w-3 h-3 text-white" /> : null}
                    </div>
                    <span className={`flex-1 font-semibold ${
                      item.checked ? 'text-stone-400 line-through' : 'text-stone-700'
                    }`}>
                      {item.name}
                    </span>
                    {item.quantity && item.quantity !== '1' && (
                      <span className="text-sm font-semibold text-stone-400">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-stone-400 text-sm">
            Made with <span className="text-green-600 font-bold">Grocery Helper</span>
          </p>
        </div>
      </div>
    </div>
  );
}
