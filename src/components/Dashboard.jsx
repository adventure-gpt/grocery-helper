import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { lists as listsApi } from '../api';
import { Plus, ShoppingCart, ChevronRight, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function Dashboard() {
  const [allLists, setAllLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    listsApi.list()
      .then(data => setAllLists(data.lists))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(e, listId) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm('Delete this list?')) return;
    await listsApi.remove(listId);
    setAllLists(prev => prev.filter(l => l.id !== listId));
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
      {/* Hero section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-800">My Grocery Lists</h1>
          <p className="text-stone-500 font-medium mt-1">
            {allLists.length === 0
              ? 'Create your first list to get started!'
              : `${allLists.length} list${allLists.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <Link
          to="/new"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-md shadow-green-200 transition-all active:scale-[0.97]"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New List</span>
        </Link>
      </div>

      {allLists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-stone-700 mb-2">
            Your cart is empty!
          </h2>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            Start by creating your first grocery list. As you add items, they'll be saved so next time you can just pick from what you already know you need.
          </p>
          <Link
            to="/new"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-green-200 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Your First List
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-3">
          {allLists.map((list, i) => {
            const progress = list.item_count > 0 ? Math.round((list.checked_count / list.item_count) * 100) : 0;
            const isComplete = list.item_count > 0 && list.checked_count === list.item_count;

            return (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/list/${list.id}`}
                  className="block bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-md hover:border-green-200 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isComplete ? 'bg-green-100' : 'bg-stone-100'
                        }`}>
                          {isComplete ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <ShoppingCart className="w-5 h-5 text-stone-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-stone-800 truncate">{list.name}</h3>
                          <p className="text-sm text-stone-400">
                            {format(new Date(list.created_at), 'MMM d, yyyy')}
                            {' · '}
                            {list.item_count} item{list.item_count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      {list.item_count > 0 && (
                        <div className="hidden sm:flex items-center gap-2">
                          <div className="w-24 h-2 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isComplete ? 'bg-green-500' : 'bg-orange-400'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-stone-400 w-8">{progress}%</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, list.id)}
                        className="p-2 rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Delete list"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-green-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
