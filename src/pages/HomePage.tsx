import React from 'react';
import type { Page } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { MOCK_CROPS, MOCK_MARKETS, MOCK_PESTS, MOCK_EVENTS } from '../data/mockData';
import {
  Sprout,
  Users,
  Search,
  TrendingUp,
  CloudSun,
  ShieldAlert,
  Cpu,
  Layers,
  Calculator,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Droplets,
  BookOpen,
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  openSearchModal: () => void;
  selectedCounty: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  openSearchModal,
  selectedCounty,
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#183D29] via-[#1f4a33] to-[#26583d] text-white p-6 sm:p-10 shadow-xl border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/70 text-xs text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Seasonal Advisory • County: <strong>{selectedCounty}</strong></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FAF7F0] leading-tight">
            Climate-Smart Knowledge for Thriving Harvests.
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            Access verified crop & livestock protocols, instant disease identification, wholesale
            market prices, and a vibrant community of over 45,000 East African farmers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('community')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md flex items-center gap-2 transition"
            >
              <Users className="w-4 h-4" />
              <span>Join Farmer Feed</span>
            </button>

            <button
              onClick={() => setCurrentPage('ai-assistant')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-sm border border-emerald-500/50 flex items-center gap-2 transition"
            >
              <Cpu className="w-4 h-4 text-emerald-300" />
              <span>Ask AI Daktari</span>
            </button>

            <button
              onClick={openSearchModal}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-xs flex items-center gap-2 transition"
            >
              <Search className="w-4 h-4 text-emerald-300" />
              <span>Search Database</span>
            </button>
          </div>
        </div>

        {/* Ambient background deco */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      </section>

      {/* Quick Action Category Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-serif font-bold text-[#183D29] flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <span>Essential Agricultural Portals</span>
          </h2>
          <span className="text-xs text-stone-500">Pick an enterprise or tool</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setCurrentPage('community')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition text-left group flex flex-col justify-between cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-800">
                AgriFeed
              </h3>
              <p className="text-[11px] text-stone-500">Peer Baraza & QA</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('reels')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-500 hover:shadow-md transition text-left group flex flex-col justify-between cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-amber-800">
                AgriReels
              </h3>
              <p className="text-[11px] text-stone-500">60s Farming Videos</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('calculators')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-purple-500 hover:shadow-md transition text-left group flex flex-col justify-between cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-purple-800">
                Calculators (26)
              </h3>
              <p className="text-[11px] text-stone-500">Precision Field Math</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('learning')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition text-left group flex flex-col justify-between cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-800">
                AgriAcademy
              </h3>
              <p className="text-[11px] text-stone-500">14 Verified Curriculums</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('markets')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition text-left group flex flex-col justify-between cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-800">
                AgriMarket
              </h3>
              <p className="text-[11px] text-stone-500">Direct Produce Trade</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition text-left group flex flex-col justify-between cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-800">
                AI Daktari
              </h3>
              <p className="text-[11px] text-stone-500">Smart Pest Diagnostics</p>
            </div>
          </button>
        </div>
      </section>

      {/* Two Column Section: Live Market Ticker & Pest Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Highlights (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <h2 className="font-serif font-bold text-base text-stone-900">
                Today's Wholesale Commodity Prices
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('markets')}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Full Market Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOCK_MARKETS.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-[#F4F1EA]/60 border border-stone-200 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{m.commodity}</h4>
                  <p className="text-[10px] text-stone-500">{m.keyMarket}</p>
                  <p className="text-[10px] text-emerald-800 font-medium">Unit: {m.unit}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-stone-900">
                    KES {m.wholesalePriceKES.toLocaleString()}
                  </div>
                  <span
                    className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      m.trend === 'up'
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.trend === 'down'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {m.trend === 'up' ? '▲ Rising' : m.trend === 'down' ? '▼ Easing' : '━ Steady'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Pest Alert Callout */}
        <div className="bg-[#FFF8F6] rounded-2xl p-6 border border-rose-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-700">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span className="font-bold text-xs uppercase tracking-wider">High Advisory Alert</span>
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Fall Armyworm Active in {selectedCounty}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Recent warm showers have accelerated moth egg hatching in young maize whorls. Inspect
              funnels for sawdust frass and windowing.
            </p>
          </div>

          <div className="pt-2 border-t border-rose-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Recommended: Spinetoram or Bt drench at dusk</span>
            </div>
            <button
              onClick={() => setCurrentPage('pests')}
              className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition"
            >
              Open Diagnostic & Spray Guide
            </button>
          </div>
        </div>
      </section>

      {/* Featured Crops & Upcoming Events */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crops Directory Spotlight */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-[#183D29] flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <span>Top Production Guides for {selectedCounty}</span>
            </h2>
            <button
              onClick={() => setCurrentPage('crops')}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>View all crops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_CROPS.slice(0, 2).map((crop) => (
              <div
                key={crop.id}
                onClick={() => setCurrentPage('crops')}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition cursor-pointer group"
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {crop.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-stone-900 group-hover:text-emerald-800">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">{crop.fertilizerRegime}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-emerald-900 font-medium">
                    <span>Target: {crop.expectedYield}</span>
                    <span className="text-emerald-700 font-semibold">View Guide →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agricultural Events & Field Days */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-700" />
              <h2 className="font-serif font-bold text-base text-stone-900">Field Days & Clinics</h2>
            </div>
            <button
              onClick={() => setCurrentPage('events')}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              All
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_EVENTS.slice(0, 2).map((ev) => (
              <div
                key={ev.id}
                onClick={() => setCurrentPage('events')}
                className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 hover:bg-purple-50 transition cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] text-purple-800 font-bold mb-1">
                  <span>{ev.date}</span>
                  <span className="bg-purple-200 px-1.5 py-0.2 rounded">{ev.county}</span>
                </div>
                <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{ev.title}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1">{ev.location}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage('events')}
            className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-xs transition"
          >
            Explore County Agricultural Events
          </button>
        </div>
      </section>

      {/* Sustainable & Agribusiness Teaser */}
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Farm Business & Opportunities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold">
            Government Fertilizer Subsidy & Matching Grants
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Registered farmers can redeem certified DAP & CAN at KES 2,500 per bag at local NCPB
            depots. Check eligibility and e-voucher status now.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => setCurrentPage('opportunities')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition"
          >
            Check E-Voucher Info
          </button>
          <button
            onClick={() => setCurrentPage('sustainable')}
            className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs border border-stone-600 transition"
          >
            Soil Carbon Programs
          </button>
        </div>
      </section>
    </div>
  );
};
