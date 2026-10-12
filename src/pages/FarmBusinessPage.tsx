import React, { useState } from 'react';
import {
  TrendingUp,
  Store,
  DollarSign,
  PieChart,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const FarmBusinessPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Agribusiness Management & Value Addition
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Transforming smallholder subsistence into profitable, bankable agricultural businesses with value addition.
          </p>
        </div>
      </div>

      {/* Value Addition Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            🥛
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900">
            On-Farm Dairy Processing (Mala & Yogurt)
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Raw bulk milk earns KES 45/L. Pasteurizing and culturing into probiotic fermented milk (Lala) or strawberry yogurt boosts value to KES 120 - 160/L.
          </p>
          <ul className="text-xs text-stone-600 space-y-1 pt-1">
            <li>• Stainless 100L batch pasteurizer (KES 120,000)</li>
            <li>• KEBS standardization certification protocol</li>
            <li>• Direct sales to schools & local retail kiosks</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            🥑
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Cold-Pressed Extra Virgin Avocado Oil
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Reject and cosmetic defect avocados sell locally for only KES 20/kg. Cold-pressing 10kg yields 1 Liter of cosmetic/culinary oil selling for KES 850/L.
          </p>
          <ul className="text-xs text-stone-600 space-y-1 pt-1">
            <li>• Hydraulic / screw press mechanical extraction</li>
            <li>• Unlocking cosmetic exporter off-take contracts</li>
            <li>• Nil waste: avocado seed and skin composted</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            🍅
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Solar Tunnel Dehydrated Vegetables & Herbs
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            During seasonal market gluts, tomatoes and kales rot in open markets. Solar drying into sundried tomato flakes extends shelf life to 12 months with 4x margin.
          </p>
          <ul className="text-xs text-stone-600 space-y-1 pt-1">
            <li>• Passive parabolic solar dryer (KES 45,000)</li>
            <li>• Vacuum food sealer & moisture meter check</li>
            <li>• Premium culinary market in Nairobi supermarkets</li>
          </ul>
        </div>
      </div>

      {/* Farm Budgeting Rules */}
      <div className="bg-[#FAF7F0] rounded-3xl p-6 sm:p-8 border border-stone-300 space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900">
          The 4 Pillars of Agribusiness Farm Financial Health
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
            <span className="font-bold text-emerald-800">1. Separate Personal & Farm Wallets</span>
            <p className="text-stone-600">Register a dedicated M-Pesa Till or bank account for farm income to track true profitability.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
            <span className="font-bold text-emerald-800">2. Record Family Labor</span>
            <p className="text-stone-600">Even unpaid labor has opportunity cost. Factor wage benchmarks to avoid false profit impressions.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
            <span className="font-bold text-emerald-800">3. Equipment Depreciation</span>
            <p className="text-stone-600">Set aside 10% annual maintenance sinking fund for tractors, chaff cutters, and drip pumps.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
            <span className="font-bold text-emerald-800">4. Staggered Planting Cycles</span>
            <p className="text-stone-600">Plant leafy vegetables and tubers in 3-week successions to avoid feast-or-famine price crashes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
