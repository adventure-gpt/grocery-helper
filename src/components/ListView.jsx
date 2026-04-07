import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { lists as listsApi } from '../api';
import { Check, Share2, Edit3, ArrowLeft, Copy, CheckCircle2, Circle, ShoppingCart, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function ListView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    listsApi.get(id)
      .then(data => setList(data.list))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

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

  const progress = useMemo(() => {
    if (!list || list.items.length === 0) return { checked: 0, total: 0, percent: 0 };
    const checked = list.items.filter(i => i.checked).length;
    return { checked, total: list.items.length, percent: Math.round((checked / list.items.length) * 100) };
  }, [list]);

  async function toggleCheck(listItemId, currentChecked) {
    await listsApi.updateItem(id, listItemId, { checked: !currentChecked });
    setList(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === listItemId ? { ...i, checked: !currentChecked ? 1 : 0 } : i)
    }));
  }

  async function handleShare() {
    try {
      const { token } = await listsApi.share(id);
      const link = `${window.location.origin}/share/${token}`;
      setShareLink(link);
      setShareModal(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = shareLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!list) return null;

  const allDone = progress.total > 0 && progress.checked === progress.total;

  return (
    <div>
      {/* Back + Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-stone-700 mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lists
        </button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-800">{list.name}</h1>
            <p className="text-stone-500 font-medium mt-1">
              {format(new Date(list.created_at), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link
              to={`/list/${id}/edit`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-sm transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-stone-700 text-sm">Shopping Progress</span>
          <span className="font-bold text-sm text-stone-500">
            {progress.checked} / {progress.total}
          </span>
        </div>
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.percent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${allDone ? 'bg-green-500' : 'bg-orange-400'}`}
          />
        </div>
        {allDone && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-bold text-sm mt-2 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            All done! Great shopping trip! 🎉
          </motion.p>
        )}
      </div>

      {/* Items by category */}
      {list.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🛒</div>
          <h3 className="text-lg font-bold text-stone-700 mb-2">This list is empty</h3>
          <p className="text-stone-500 mb-4">Add some items to get started.</p>
          <Link
            to={`/list/${id}/edit`}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold transition-all"
          >
            <Edit3 className="w-5 h-5" />
            Add Items
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                <h3 className="flex items-center gap-2 font-bold text-stone-700 text-sm">
                  <span className="text-base">{CATEGORY_EMOJIS[category] || '📦'}</span>
                  {category}
                  <span className="text-xs font-semibold text-stone-400 bg-stone-200 px-2 py-0.5 rounded-full">
                    {items.filter(i => i.checked).length}/{items.length}
                  </span>
                </h3>
              </div>
              <div>
                {items.map(item => (
                  <motion.button
                    key={item.id}
                    onClick={() => toggleCheck(item.id, item.checked)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-stone-50 last:border-b-0 transition-all text-left ${
                      item.checked ? 'bg-green-50/30' : 'hover:bg-stone-50'
                    }`}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.checked
                        ? 'bg-green-500 border-green-500'
                        : 'border-stone-300'
                    }`}>
                      {item.checked ? <Check className="w-3.5 h-3.5 text-white" /> : null}
                    </div>
                    <span className={`flex-1 font-semibold transition-all ${
                      item.checked
                        ? 'text-stone-400 line-through'
                        : 'text-stone-700'
                    }`}>
                      {item.name}
                    </span>
                    {item.quantity && item.quantity !== '1' && (
                      <span className="text-sm font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-lg">
                        x{item.quantity}
                      </span>
                    )}
                    {item.is_favorite ? (
                      <span className="text-orange-400 text-sm">★</span>
                    ) : null}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {shareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">Share This List</h3>
              </div>
              <p className="text-stone-500 text-sm mb-4">
                Anyone with this link can view your list (read-only).
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm font-mono truncate"
                />
                <button
                  onClick={copyLink}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={() => setShareModal(false)}
                className="w-full mt-4 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
