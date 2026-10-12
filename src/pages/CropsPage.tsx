import React, { useState } from 'react';
import type { CropGuide } from '../types';
import { MOCK_CROPS } from '../data/mockData';
import { useFarm } from '../context/FarmContext';
import {
  Sprout,
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  TrendingUp,
  Droplets,
  Calendar,
  Layers,
  ShieldAlert,
} from 'lucide-react';

export const CropsPage: React.FC = () => {
  const { toggleBookmark, isBookmarked } = useFarm();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCrop, setActiveCrop] = useState<CropGuide | null>(MOCK_CROPS[0]);

  const categories = ['All', 'Cereals', 'Horticulture', 'Fruits', 'Tubers', 'Cash Crops'];

  const filtered = MOCK_CROPS.filter((c) => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.swahiliName.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Crop Production Manuals
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Agronomic protocols tailored for Kenyan highland, medium, and low-altitude ecologies.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search maize, avocado, potato..."
            className="text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden w-64"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Crop Grid & Detail Modal/Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Crop Cards List (2 cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((crop) => {
            const bookmarked = isBookmarked(crop.id);
            const isSelected = activeCrop?.id === crop.id;

            return (
              <div
                key={crop.id}
                onClick={() => setActiveCrop(crop)}
                className={`bg-white rounded-2xl border transition overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-md ${
                  isSelected ? 'border-2 border-emerald-600 ring-2 ring-emerald-100' : 'border-stone-200'
                }`}
              >
                <div>
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {crop.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(crop.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-stone-700 hover:text-emerald-700 shadow-sm"
                      title="Bookmark guide"
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-700 fill-emerald-100" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{crop.name}</h3>
                      <p className="text-xs text-emerald-800 font-medium italic">
                        Kiswahili: {crop.swahiliName}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600 bg-[#FAF7F0] p-2.5 rounded-xl border border-stone-100">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Altitude:</span>
                        <span className="font-medium">{crop.optimalAltitude}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Maturity:</span>
                        <span className="font-medium">{crop.maturityPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Target Yield:</span>
                        <span className="font-bold text-emerald-800">{crop.expectedYield}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-emerald-700 font-semibold border-t border-stone-50">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Crop Deep-Dive Dossier */}
        {activeCrop && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md space-y-5 lg:sticky lg:top-20 h-fit">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {activeCrop.category}
                </span>
                <span className="text-xs font-bold text-stone-500">
                  Ref: {activeCrop.id}
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">{activeCrop.name}</h2>
              <p className="text-xs text-emerald-800 font-medium">Jina la Kiswahili: {activeCrop.swahiliName}</p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 divide-y divide-stone-100">
              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Planting Spacing & Density:</p>
                <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">{activeCrop.spacing}</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Recommended Seed Rate & Varieties:</p>
                <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">{activeCrop.seedRatePerAcre}</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Fertilizer Application Regime:</p>
                <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">{activeCrop.fertilizerRegime}</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Harvesting & Post-Harvest Care:</p>
                <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">{activeCrop.harvestingTips}</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Prevalent Pests & Diseases:</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeCrop.commonPests.map((pest, i) => (
                    <span key={i} className="text-[11px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                      ⚠️ {pest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">Current Market Price:</span>
                <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {activeCrop.marketPriceRange}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleBookmark(activeCrop.id)}
              className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>{isBookmarked(activeCrop.id) ? 'Remove Bookmark' : 'Save Crop Guide to Profile'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
