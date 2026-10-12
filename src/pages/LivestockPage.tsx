import React, { useState } from 'react';
import type { LivestockGuide } from '../types';
import { MOCK_LIVESTOCK } from '../data/mockData';
import { useFarm } from '../context/FarmContext';
import {
  Layers,
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ShieldCheck,
  HeartPulse,
  Activity,
  Droplet,
} from 'lucide-react';

export const LivestockPage: React.FC = () => {
  const { toggleBookmark, isBookmarked } = useFarm();
  const [search, setSearch] = useState('');
  const [activeAnimal, setActiveAnimal] = useState<LivestockGuide | null>(MOCK_LIVESTOCK[0]);

  const filtered = MOCK_LIVESTOCK.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.category.toLowerCase().includes(search.toLowerCase()) ||
    l.swahiliName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Livestock Husbandry & Feeding Manuals
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Zero-grazing dairy cattle, improved Kienyeji poultry, dairy goats, and modern apiculture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dairy, poultry, goats..."
            className="text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cards List */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((item) => {
            const bookmarked = isBookmarked(item.id);
            const isSelected = activeAnimal?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveAnimal(item)}
                className={`bg-white rounded-2xl border transition overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-md ${
                  isSelected ? 'border-2 border-amber-600 ring-2 ring-amber-100' : 'border-stone-200'
                }`}
              >
                <div>
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-stone-700 hover:text-amber-700 shadow-sm"
                      title="Bookmark guide"
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-700 fill-amber-100" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <div>
                      <h3 className="font-bold text-sm text-stone-900">{item.name}</h3>
                      <p className="text-xs text-amber-900 font-medium italic">
                        Kiswahili: {item.swahiliName}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Yield:</span>
                        <span className="font-bold text-stone-900">{item.yieldBenchmark}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Breeds:</span>
                        <span className="truncate max-w-[140px]">{item.popularBreeds.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-amber-800 font-semibold border-t border-stone-50">
                  <span>View Animal Protocol</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Animal Deep-Dive */}
        {activeAnimal && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md space-y-5 lg:sticky lg:top-20 h-fit">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                {activeAnimal.category}
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900">{activeAnimal.name}</h2>
              <p className="text-xs text-amber-900 font-medium">Jina la Kiswahili: {activeAnimal.swahiliName}</p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 divide-y divide-stone-100">
              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Recommended Breeds:</p>
                <div className="flex flex-wrap gap-1">
                  {activeAnimal.popularBreeds.map((breed, i) => (
                    <span key={i} className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-medium">
                      {breed}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Daily Feed & Nutritional Requirements:</p>
                <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">{activeAnimal.dailyFeedRequirement}</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Housing & Floor Space Standards:</p>
                <p className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">{activeAnimal.spaceRequirement}</p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Key Vaccination Schedule:</p>
                <div className="space-y-1 mt-1">
                  {activeAnimal.keyVaccinations.map((vac, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-stone-700 bg-emerald-50/70 p-1.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{vac}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Common Diseases & Watchouts:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeAnimal.commonDiseases.map((dis, i) => (
                    <span key={i} className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                      ⚠️ {dis}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1">Management Pro-Tips:</p>
                <p className="text-stone-600 italic">{activeAnimal.managementTips}</p>
              </div>
            </div>

            <button
              onClick={() => toggleBookmark(activeAnimal.id)}
              className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>{isBookmarked(activeAnimal.id) ? 'Remove Bookmark' : 'Save Animal Guide to Profile'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
