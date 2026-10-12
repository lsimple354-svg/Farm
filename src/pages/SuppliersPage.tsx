import React, { useState } from 'react';
import type { SupplierItem } from '../types';
import { MOCK_SUPPLIERS, COUNTIES } from '../data/mockData';
import {
  Store,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  Search,
} from 'lucide-react';

export const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(MOCK_SUPPLIERS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCounty, setSelectedCounty] = useState('All');

  const categories = [
    'All',
    'Certified Seeds',
    'Fertilizers & Agrochemicals',
    'Animal Feeds & Premixes',
    'Irrigation Equipment',
  ];

  const filtered = suppliers.filter((s) => {
    const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchCounty = selectedCounty === 'All' || s.county === selectedCounty;
    const matchSearch =
      s.businessName.toLowerCase().includes(search.toLowerCase()) ||
      s.town.toLowerCase().includes(search.toLowerCase()) ||
      s.services.some((srv) => srv.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchCounty && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-sky-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Verified Agro-Dealers & Veterinary Stockists
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Genuine KEPHIS certified seeds, GoK fertilizer subsidy redemption points, and veterinary suppliers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dealer, fertilizer, seeds..."
            className="text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden w-64"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
                selectedCategory === c
                  ? 'bg-sky-800 text-white font-semibold'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-stone-500">County:</span>
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="text-xs px-2.5 py-1 rounded-xl bg-stone-50 border border-stone-300 text-stone-800"
          >
            <option value="All">All Counties</option>
            {COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs hover:border-sky-300 transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      {s.businessName}
                    </h3>
                    {s.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-sky-800 font-medium mt-0.5">{s.category}</p>
                </div>

                <div className="flex items-center gap-1 text-xs bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-amber-900 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{s.rating}</span>
                  <span className="text-stone-400 text-[10px]">({s.reviewsCount})</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <MapPin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span>
                  {s.town}, {s.county} County
                </span>
              </div>

              <div>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  Stock & Services Offered:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.services.map((srv, i) => (
                    <span
                      key={i}
                      className="text-xs bg-sky-50 text-sky-900 px-2.5 py-1 rounded-lg border border-sky-200/60 font-medium"
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">{s.phone}</span>

              <a
                href={`tel:${s.phone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Stockist</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
