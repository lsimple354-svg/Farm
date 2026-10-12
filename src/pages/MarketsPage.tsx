import React, { useState } from 'react';
import type { MarketCommodity } from '../types';
import { MOCK_MARKETS } from '../data/mockData';
import {
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Store,
  PlusCircle,
  Tag,
  Clock,
} from 'lucide-react';

export const MarketsPage: React.FC = () => {
  const [markets, setMarkets] = useState<MarketCommodity[]>(MOCK_MARKETS);
  const [search, setSearch] = useState('');
  const [selectedHub, setSelectedHub] = useState('All');

  // Produce Listing State
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellCommodity, setSellCommodity] = useState('');
  const [sellQty, setSellQty] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellLocation, setSellLocation] = useState('Uasin Gishu');
  const [myListings, setMyListings] = useState([
    {
      id: 'list-1',
      crop: 'Dry Maize (H6213)',
      qty: '45 Bags (90kg)',
      price: 'KES 3,400 / bag',
      location: 'Soy, Uasin Gishu',
      contact: '+254 722 000 888 (John Kipchoge)',
    },
  ]);

  const hubs = ['All', 'Eldoret Wholesale Hub', 'Wakulima Market (Nairobi)', 'Kongowea Market (Mombasa)', 'Nakuru Top Market'];

  const filtered = markets.filter((m) => {
    const matchHub = selectedHub === 'All' || m.keyMarket.includes(selectedHub.split(' ')[0]);
    const matchSearch =
      m.commodity.toLowerCase().includes(search.toLowerCase()) ||
      m.variety.toLowerCase().includes(search.toLowerCase()) ||
      m.keyMarket.toLowerCase().includes(search.toLowerCase());
    return matchHub && matchSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellCommodity || !sellQty || !sellPrice) return;
    setMyListings([
      {
        id: `list-${Date.now()}`,
        crop: sellCommodity,
        qty: sellQty,
        price: `KES ${sellPrice}`,
        location: sellLocation,
        contact: '+254 722 000 888 (You)',
      },
      ...myListings,
    ]);
    setShowSellModal(false);
    setSellCommodity('');
    setSellQty('');
    setSellPrice('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Live Agricultural Commodity Market Board
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Verified farmgate and wholesale commodity prices updated daily across East Africa.
          </p>
        </div>

        <button
          onClick={() => setShowSellModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md flex items-center gap-2 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-emerald-300" />
          <span>Post Produce for Sale</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
          {hubs.map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHub(h)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
                selectedHub === h
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commodity or variety..."
            className="w-full text-xs px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Commodity Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-300 transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                <span>{item.keyMarket}</span>
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  {item.updatedDate}
                </span>
              </div>

              <h3 className="font-bold text-sm text-stone-900">{item.commodity}</h3>
              <p className="text-xs text-stone-500">{item.variety}</p>

              <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-stone-500">Wholesale:</span>
                  <span className="font-serif font-black text-base text-stone-900">
                    KES {item.wholesalePriceKES.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-stone-400">Retail / unit:</span>
                  <span className="text-stone-700 font-semibold">
                    KES {item.retailPriceKES.toLocaleString()} / {item.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                Prev: KES {item.previousPriceKES.toLocaleString()}
              </span>

              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  item.trend === 'up'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.trend === 'down'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {item.trend === 'up' ? (
                  <>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+KES {item.wholesalePriceKES - item.previousPriceKES}</span>
                  </>
                ) : item.trend === 'down' ? (
                  <>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    <span>-KES {item.previousPriceKES - item.wholesalePriceKES}</span>
                  </>
                ) : (
                  <>
                    <Minus className="w-3 h-3" />
                    <span>Steady</span>
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Farmer-to-Buyer Marketplace Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-serif font-bold text-stone-900">
              Direct Farmer Produce Marketplace
            </h2>
          </div>
          <span className="text-xs text-stone-500">Zero middleman fees</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myListings.map((l) => (
            <div
              key={l.id}
              className="p-4 rounded-2xl bg-[#FAF7F0] border border-stone-200 flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Active Listing
                </span>
                <h4 className="font-bold text-sm text-stone-900">{l.crop}</h4>
                <p className="text-xs text-stone-600">Quantity: <strong>{l.qty}</strong> • Location: {l.location}</p>
                <p className="text-xs text-emerald-800 font-semibold">{l.contact}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-stone-900">{l.price}</div>
                <button
                  onClick={() => alert(`Calling seller at ${l.contact}`)}
                  className="mt-2 text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-700 text-white"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sell Modal */}
      {showSellModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateListing}
            className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-stone-200 animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif font-bold text-base text-stone-900">List Produce For Sale</h3>
              <button
                type="button"
                onClick={() => setShowSellModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Crop / Commodity</label>
              <input
                type="text"
                required
                placeholder="e.g. Dry Maize, Red Onions, French Beans"
                value={sellCommodity}
                onChange={(e) => setSellCommodity(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Quantity Available</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50 bags, 2 tons"
                  value={sellQty}
                  onChange={(e) => setSellQty(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Asking Price</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3,400 per bag"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Pickup County / Town</label>
              <input
                type="text"
                value={sellLocation}
                onChange={(e) => setSellLocation(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSellModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Post Listing
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
