import React, { useState, useMemo, useEffect } from 'react';
import type { Page } from '../types';
import { MOCK_CROPS, MOCK_LIVESTOCK, MOCK_PESTS, MOCK_MARKETS, MOCK_EVENTS } from '../data/mockData';
import {
  Search,
  X,
  Sprout,
  Layers,
  ShieldAlert,
  TrendingUp,
  Calendar,
  Calculator,
  Cpu,
  ArrowRight,
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (page: Page) => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Crops' | 'Livestock' | 'Pest' | 'Market' | 'Tool' | 'Event';
  targetPage: Page;
  badge?: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allItems: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [];

    // Crops
    MOCK_CROPS.forEach((c) => {
      list.push({
        id: `crop-${c.id}`,
        title: `${c.name} (${c.swahiliName})`,
        subtitle: `${c.category} • Yield: ${c.expectedYield}`,
        category: 'Crops',
        targetPage: 'crops',
        badge: c.category,
      });
    });

    // Livestock
    MOCK_LIVESTOCK.forEach((l) => {
      list.push({
        id: `live-${l.id}`,
        title: `${l.name} (${l.swahiliName})`,
        subtitle: `${l.category} • ${l.yieldBenchmark}`,
        category: 'Livestock',
        targetPage: 'livestock',
        badge: l.category,
      });
    });

    // Pests
    MOCK_PESTS.forEach((p) => {
      list.push({
        id: `pest-${p.id}`,
        title: p.name,
        subtitle: `Affects: ${p.affectedCrops.join(', ')} • Severity: ${p.severity}`,
        category: 'Pest',
        targetPage: 'pests',
        badge: p.severity,
      });
    });

    // Markets
    MOCK_MARKETS.forEach((m) => {
      list.push({
        id: `mkt-${m.id}`,
        title: `${m.commodity} Price`,
        subtitle: `Wholesale: KES ${m.wholesalePriceKES.toLocaleString()} / ${m.unit} @ ${m.keyMarket}`,
        category: 'Market',
        targetPage: 'markets',
        badge: 'Live Price',
      });
    });

    // Events
    MOCK_EVENTS.forEach((e) => {
      list.push({
        id: `ev-${e.id}`,
        title: e.title,
        subtitle: `${e.date} • ${e.county} • ${e.category}`,
        category: 'Event',
        targetPage: 'events',
        badge: e.category,
      });
    });

    // Static Tools
    list.push(
      {
        id: 'tool-calc',
        title: 'Seed & Fertilizer Rate Calculator',
        subtitle: 'Calculate exact bags of DAP/CAN and certified seed per acre',
        category: 'Tool',
        targetPage: 'calculators',
        badge: 'Tool',
      },
      {
        id: 'tool-ai',
        title: 'Ask AI Daktari wa Shamba',
        subtitle: 'Intelligent crop pest diagnosis and veterinary advice',
        category: 'Tool',
        targetPage: 'ai-assistant',
        badge: 'AI Doctor',
      },
      {
        id: 'tool-soil',
        title: 'Soil Testing & Drip Irrigation Guide',
        subtitle: 'pH balance, NPK testing, and solar drip layouts',
        category: 'Tool',
        targetPage: 'soil-water',
        badge: 'Soil',
      },
      {
        id: 'tool-subsidies',
        title: 'Government Fertilizer Subsidy & E-Vouchers',
        subtitle: 'KNTC and NCPB fertilizer registration guidelines',
        category: 'Tool',
        targetPage: 'opportunities',
        badge: 'Subsidy',
      }
    );

    return list;
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FAF7F0] text-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search maize, armyworm, fertilizer calculator, milk price..."
            autoFocus
            className="w-full text-base bg-transparent focus:outline-hidden text-stone-800 placeholder-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 ml-1 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-stone-100">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="text-sm">No results found for "{query}".</p>
              <p className="text-xs mt-1 text-stone-400">
                Try searching for "Maize", "Tomatoes", "Mastitis", "CAN", or "Weather".
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const getIcon = () => {
                switch (item.category) {
                  case 'Crops':
                    return <Sprout className="w-4 h-4 text-emerald-600" />;
                  case 'Livestock':
                    return <Layers className="w-4 h-4 text-amber-600" />;
                  case 'Pest':
                    return <ShieldAlert className="w-4 h-4 text-rose-600" />;
                  case 'Market':
                    return <TrendingUp className="w-4 h-4 text-emerald-600" />;
                  case 'Event':
                    return <Calendar className="w-4 h-4 text-purple-600" />;
                  default:
                    return <Calculator className="w-4 h-4 text-sky-600" />;
                }
              };

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item.targetPage);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-emerald-50/70 transition flex items-center justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-stone-100 group-hover:bg-white shrink-0 mt-0.5">
                      {getIcon()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-stone-900 group-hover:text-emerald-800">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-700 shrink-0 opacity-0 group-hover:opacity-100 transition" />
                </button>
              );
            })
          )}
        </div>

        {/* Modal footer shortcut guide */}
        <div className="p-2.5 bg-stone-100 border-t border-stone-200 text-stone-500 text-[11px] flex items-center justify-between px-4">
          <span>Quick search across 120+ crops, pests & East African agro-services</span>
          <span className="font-medium text-emerald-800">Click any result to jump directly</span>
        </div>
      </div>
    </div>
  );
};
