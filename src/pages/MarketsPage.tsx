import React, { useState } from 'react';
import type { MarketCommodity, MarketListing, Page } from '../types';
import { MOCK_MARKETS } from '../data/mockData';
import { useInternational } from '../context/InternationalContext';
import { useAuth } from '../context/AuthContext';
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
  MapPin,
  ShieldCheck,
  MessageSquare,
  Phone,
  Filter,
  CheckCircle,
  ExternalLink,
  AlertTriangle,
  X,
  Sparkles,
} from 'lucide-react';

interface MarketsPageProps {
  setCurrentPage?: (page: Page) => void;
}

const INITIAL_LISTINGS: MarketListing[] = [
  {
    id: 'list-1',
    title: 'Dry Maize (H6213) — Moisture Tested <=13.5%',
    category: 'Produce',
    price: 3400,
    currency: 'KES',
    unit: 'per 90kg bag',
    quantity: '45 Bags ready for dispatch',
    location: 'Soy, Uasin Gishu',
    country: 'Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    description: 'Freshly threshed hybrid maize, dried on hermetic tarpaulins. Clean grain, zero weevil infestation, KEPHIS certified origin.',
    sellerId: 'usr-101',
    sellerName: 'John Kipchoge',
    sellerAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
    sellerPhone: '+254 722 000 888',
    sellerRating: 4.9,
    isVerifiedSeller: true,
    createdAt: '2 hours ago',
  },
  {
    id: 'list-2',
    title: 'Hass Avocado (Export Grade 16-24 count)',
    category: 'Produce',
    price: 110,
    currency: 'KES',
    unit: 'per kg',
    quantity: '3.5 Metric Tons',
    location: 'Thika, Kiambu',
    country: 'Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    description: 'GlobalGAP certified orchard Hass avocados. 24% dry matter reached, zero pesticide residue (MRL compliant). Minimum off-taker order 500kg.',
    sellerId: 'usr-muriuki',
    sellerName: 'Agnes Muriuki',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    sellerPhone: '+254 700 889 900',
    sellerRating: 5.0,
    isVerifiedSeller: true,
    createdAt: '5 hours ago',
  },
  {
    id: 'list-3',
    title: 'Pedigree In-Calf Friesian Heifer (Dam 32L/day)',
    category: 'Livestock',
    price: 125000,
    currency: 'KES',
    unit: 'per animal',
    quantity: '2 Heifers (6 months in-calf)',
    location: 'Eldoret, Uasin Gishu',
    country: 'Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    description: 'Pedigree artificial insemination (Semex Alta genetics). Vaccinated for FMD, ECF, and Anthrax. Complete veterinary health book provided.',
    sellerId: 'usr-cheruiyot',
    sellerName: 'Dr. Joseph Cheruiyot',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    sellerPhone: '+254 712 345 678',
    sellerRating: 4.9,
    isVerifiedSeller: true,
    createdAt: '1 day ago',
  },
  {
    id: 'list-4',
    title: 'Certified Certified Organic Neem & Biochar Compost',
    category: 'Seeds & Inputs',
    price: 1200,
    currency: 'KES',
    unit: 'per 50kg bag',
    quantity: '200 Bags in warehouse',
    location: 'Nakuru Town',
    country: 'Kenya',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Enriched compost with 20% biochar and botanical neem cake to suppress soil-borne nematodes and boost cation exchange capacity.',
    sellerId: 'usr-organic-1',
    sellerName: 'EcoSoil Organics',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    sellerPhone: '+254 733 999 111',
    sellerRating: 4.8,
    isVerifiedSeller: true,
    createdAt: '2 days ago',
  },
];

export const MarketsPage: React.FC<MarketsPageProps> = ({ setCurrentPage }) => {
  const { formatCurrency } = useInternational();
  const { user, awardPoints } = useAuth();

  const [activeTab, setActiveTab] = useState<'listings' | 'wholesale'>('listings');
  const [markets, setMarkets] = useState<MarketCommodity[]>(MOCK_MARKETS);
  const [listings, setListings] = useState<MarketListing[]>(() => {
    try {
      const saved = localStorage.getItem('agri_market_listings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LISTINGS;
  });

  // Filter state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHub, setSelectedHub] = useState('All');

  // Create Listing Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MarketListing['category']>('Produce');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('per 90kg bag');
  const [newQty, setNewQty] = useState('');
  const [newLocation, setNewLocation] = useState('Uasin Gishu');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const hubs = ['All', 'Eldoret Wholesale Hub', 'Wakulima Market (Nairobi)', 'Kongowea Market (Mombasa)', 'Nakuru Top Market'];
  const categories = ['All', 'Produce', 'Livestock', 'Seeds & Inputs', 'Machinery', 'Services'];

  const filteredMarkets = markets.filter((m) => {
    const matchHub = selectedHub === 'All' || m.keyMarket.includes(selectedHub.split(' ')[0]);
    const matchSearch =
      m.commodity.toLowerCase().includes(search.toLowerCase()) ||
      m.variety.toLowerCase().includes(search.toLowerCase()) ||
      m.keyMarket.toLowerCase().includes(search.toLowerCase());
    return matchHub && matchSearch;
  });

  const filteredListings = listings.filter((l) => {
    const matchCategory = selectedCategory === 'All' || l.category === selectedCategory;
    const matchSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase()) ||
      l.sellerName.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const item: MarketListing = {
      id: `list-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      price: parseFloat(newPrice) || 1000,
      currency: 'KES',
      unit: newUnit,
      quantity: newQty || 'Negotiable batch',
      location: newLocation,
      country: 'Kenya',
      imageUrl:
        newImage.trim() ||
        'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
      description: newDesc.trim() || 'Verified quality agricultural produce.',
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      sellerPhone: user.phone || '+254 722 000 888',
      sellerRating: 5.0,
      isVerifiedSeller: user.role.includes('Commercial') || user.role.includes('Dealer'),
      createdAt: 'Just now',
    };

    const updated = [item, ...listings];
    setListings(updated);
    try {
      localStorage.setItem('agri_market_listings', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewTitle('');
    setNewPrice('');
    setNewQty('');
    setNewImage('');
    setNewDesc('');
    setShowCreateModal(false);
    awardPoints(40);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              AgriMarket & Wholesale Board
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Direct produce trading, certified agro-inputs, pedigree livestock, and daily wholesale commodity prices.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List Produce or Livestock</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-amber-950">Direct Trader Security Protocol:</strong>{' '}
          AgriKnowledge Hub facilitates direct transactions with zero broker commissions. Always inspect grain moisture content (KEPHIS threshold &le;13.5% for maize) and verify physical warehouse location prior to final bank transfer or dispatch.
        </div>
      </div>

      {/* Primary Switcher Tabs */}
      <div className="flex items-center gap-3 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Direct Marketplace Listings ({listings.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('wholesale')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'wholesale'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Today's Wholesale Price Ticker (Kenya)</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder={
              activeTab === 'listings'
                ? 'Search produce, heifers, certified seeds, location...'
                : 'Search commodities across wholesale hubs...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
        </div>

        {activeTab === 'listings' ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#183D29] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {hubs.map((hub) => (
              <button
                key={hub}
                onClick={() => setSelectedHub(hub)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition cursor-pointer ${
                  selectedHub === hub
                    ? 'bg-[#183D29] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {hub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Direct Marketplace Listings Grid */}
      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredListings.length === 0 ? (
            <div className="col-span-2 bg-white rounded-3xl p-12 text-center text-stone-400 text-xs">
              No trade listings found in this category. Click 'List Produce or Livestock' to post your harvest!
            </div>
          ) : (
            filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-3xl p-5 border border-stone-200 shadow-2xs hover:border-emerald-300 transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  {/* Photo & Category Badge */}
                  <div className="h-44 rounded-2xl overflow-hidden relative bg-stone-100">
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {listing.category}
                    </span>
                    {listing.isVerifiedSeller && (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Seller</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-base sm:text-lg font-bold text-emerald-800">
                        {formatCurrency(listing.price)}{' '}
                        <span className="text-xs text-stone-500 font-normal">{listing.unit}</span>
                      </span>
                      <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-lg">
                        {listing.quantity}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-stone-900 leading-snug mt-1">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                      {listing.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{listing.location}</span>
                    <span>•</span>
                    <span>{listing.createdAt}</span>
                  </div>
                </div>

                {/* Seller Row & Action Buttons */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={listing.sellerAvatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-stone-900 truncate">
                        {listing.sellerName}
                      </p>
                      <p className="text-[10px] text-stone-400">Rating {listing.sellerRating} ★</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {setCurrentPage && (
                      <button
                        onClick={() => setCurrentPage('messages')}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </button>
                    )}
                    <a
                      href={`tel:${listing.sellerPhone}`}
                      className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition cursor-pointer"
                      title="Call Seller"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wholesale Live Commodity Price Ticker */}
      {activeTab === 'wholesale' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-bold text-sm text-stone-900">
              National Wholesale Benchmarks (Updated Daily)
            </h3>
            <span className="text-[11px] text-stone-500">Source: County Agribusiness Units & Market Desks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="p-3 font-semibold">Commodity & Variety</th>
                  <th className="p-3 font-semibold">Wholesale Price</th>
                  <th className="p-3 font-semibold">Retail Price</th>
                  <th className="p-3 font-semibold">Trend</th>
                  <th className="p-3 font-semibold">Primary Wholesale Market</th>
                  <th className="p-3 font-semibold">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMarkets.map((m) => {
                  const diff = m.wholesalePriceKES - m.previousPriceKES;
                  return (
                    <tr key={m.id} className="hover:bg-stone-50/80 transition">
                      <td className="p-3">
                        <strong className="text-stone-900 block">{m.commodity}</strong>
                        <span className="text-[10px] text-stone-500">{m.variety} • {m.unit}</span>
                      </td>
                      <td className="p-3 font-bold text-emerald-800">
                        {formatCurrency(m.wholesalePriceKES)}
                      </td>
                      <td className="p-3 text-stone-700 font-medium">
                        {formatCurrency(m.retailPriceKES)}
                      </td>
                      <td className="p-3">
                        {m.trend === 'up' && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold text-[11px]">
                            <ArrowUpRight className="w-3.5 h-3.5" /> +KES {diff}
                          </span>
                        )}
                        {m.trend === 'down' && (
                          <span className="inline-flex items-center gap-0.5 text-rose-600 font-bold text-[11px]">
                            <ArrowDownRight className="w-3.5 h-3.5" /> KES {diff}
                          </span>
                        )}
                        {m.trend === 'stable' && (
                          <span className="inline-flex items-center gap-0.5 text-stone-400 text-[11px]">
                            <Minus className="w-3.5 h-3.5" /> Stable
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-stone-600 font-medium">{m.keyMarket}</td>
                      <td className="p-3 text-[10px] text-stone-400">{m.updatedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <form
            onSubmit={handleCreateListing}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-3.5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-emerald-700" />
                <span>Publish Produce or Livestock Listing</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. 50 Bags Clean Shangi Seed Potatoes (Size 1)"
                className="w-full text-xs p-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MarketListing['category'])}
                  className="w-full text-xs p-2 rounded-xl border border-stone-300"
                >
                  <option value="Produce">🌾 Fresh Produce / Grain</option>
                  <option value="Livestock">🐄 Cattle, Poultry, Goats</option>
                  <option value="Seeds & Inputs">🌱 Certified Seeds & Inputs</option>
                  <option value="Machinery">🚜 Machinery & Hire</option>
                  <option value="Services">🛠️ Agronomy & Soil Testing</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Price (KES) *
                </label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 3400"
                  className="w-full text-xs p-2 rounded-xl border border-stone-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Unit Pricing
                </label>
                <input
                  type="text"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  placeholder="e.g. per 90kg bag / per kg"
                  className="w-full text-xs p-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Batch Quantity
                </label>
                <input
                  type="text"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  placeholder="e.g. 45 Bags / 2 Tons"
                  className="w-full text-xs p-2 rounded-xl border border-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Farm Gate Location (County / Town) *
              </label>
              <input
                type="text"
                required
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="e.g. Soy, Uasin Gishu"
                className="w-full text-xs p-2 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Produce Photo URL (optional)
              </label>
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="https://... photo link"
                className="w-full text-xs p-2 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Detailed Quality Description
              </label>
              <textarea
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe moisture content, grade, variety, packaging, and dispatch availability..."
                className="w-full text-xs p-2 rounded-xl border border-stone-300 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Publish to AgriMarket (+40 Pts)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
