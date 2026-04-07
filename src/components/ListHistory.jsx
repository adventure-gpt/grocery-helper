import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { lists as listsApi } from '../api';
import { Clock, ShoppingCart, ChevronRight, CheckCircle2, Trash2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

export default function ListHistory() {
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

  function groupByDate(lists) {
    const groups = { today: [], yesterday: [], thisWeek: [], older: [] };
    lists.forEach(list => {
      const date = new Date(list.created_at);
      if (isToday(date)) groups.today.push(list);
      else if (isYesterday(date)) groups.yesterday.push(list);
      else if (isThisWeek(date)) groups.thisWeek.push(list);
      else groups.older.push(list);
    });
    return groups;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const groups = groupByDate(allLists);
  const sections = [
    { label: 'Today', lists: groups.today },
    { label: 'Yesterday', lists: groups.yesterday },
    { label: 'This Week', lists: groups.thisWeek },
    { label: 'Older', lists: groups.older },
  ].filter(s => s.lists.length > 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-800">List History</h1>
        <p className="text-stone-500 font-medium mt-1">
          {allLists.length === 0
            ? "You haven't created any lists yet"
            : `${allLists.length} list${allLists.length === 1 ? '' : 's'} total`}
        </p>
      </div>

      {allLists.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-stone-700 mb-2">No history yet</h2>
          <p className="text-stone-500 mb-6">Once you create grocery lists, they'll show up here.</p>
          <Link
            to="/new"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Create Your First List
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.label}>
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {section.label}
              </h2>
              <div className="space-y-2">
                {section.lists.map((list, i) => {
                  const isComplete = list.item_count > 0 && list.checked_count === list.item_count;
                  const progress = list.item_count > 0 ? Math.round((list.checked_count / list.item_count) * 100) : 0;

                  return (
                    <motion.div
                      key={list.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        to={`/list/${list.id}`}
                        className="flex items-center gap-4 bg-white rounded-xl border border-stone-200 p-4 hover:shadow-sm hover:border-green-200 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isComplete ? 'bg-green-100' : 'bg-stone-100'
                        }`}>
                          {isComplete ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <ShoppingCart className="w-5 h-5 text-stone-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-stone-800 truncate">{list.name}</h3>
                          <p className="text-sm text-stone-400">
                            {format(new Date(list.created_at), 'MMM d, h:mm a')}
                            {' · '}
                            {list.item_count} item{list.item_count !== 1 ? 's' : ''}
                            {list.item_count > 0 && ` · ${progress}% done`}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDelete(e, list.id)}
                          className="p-2 rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Delete list"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
