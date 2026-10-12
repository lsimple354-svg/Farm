import React from 'react';
import type { Page } from '../types';
import { Sprout, PhoneCall, ShieldCheck, Mail, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-[#122A1C] text-stone-200 border-t border-emerald-950/80 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-emerald-900/60">
          {/* Brand & mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-white">AgriKnowledge Hub</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed pr-6">
              Empowering smallholder and commercial farmers across Kenya and East Africa with localized
              climate-smart agronomy, verified agro-dealers, community problem solving, and real-time market transparency.
            </p>
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-800/80 text-emerald-300">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">
                  Toll-Free Farmer Hotline (24/7)
                </p>
                <p className="text-sm font-bold text-white">0800 720 021 / +254 20 271 8870</p>
              </div>
            </div>
          </div>

          {/* Column 1: Agronomy & Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Agronomy & Guides
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => setCurrentPage('crops')} className="hover:text-emerald-300">
                  Crops Directory
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('livestock')} className="hover:text-emerald-300">
                  Dairy & Poultry Care
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('soil-water')} className="hover:text-emerald-300">
                  Soil Testing & Drip
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pests')} className="hover:text-emerald-300">
                  Pest & Disease Doctor
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('sustainable')} className="hover:text-emerald-300">
                  Push-Pull & Regenerative
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Markets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Tools & Markets
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => setCurrentPage('markets')} className="hover:text-emerald-300">
                  Live Commodity Prices
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('calculators')} className="hover:text-emerald-300">
                  Seed & Fertilizer Calculators
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('weather')} className="hover:text-emerald-300">
                  Agro-Weather Forecast
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('farm-manager')} className="hover:text-emerald-300">
                  Farm Log & Chores
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('ai-assistant')} className="hover:text-emerald-300">
                  AI Daktari Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Network & Officers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Community & Advisory
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => setCurrentPage('community')} className="hover:text-emerald-300">
                  Farmer Discussion Feed
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('events')} className="hover:text-emerald-300">
                  ASK Shows & Field Days
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('expert')} className="hover:text-emerald-300">
                  Consult Extension Officers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('opportunities')} className="hover:text-emerald-300">
                  GoK Fertilizer E-Vouchers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin-cms')} className="hover:text-emerald-300">
                  Officer CMS Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 AgriKnowledge Hub • In collaboration with KALRO, KEPHIS & County Agribusiness Units.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('about')} className="hover:underline">
              About
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with care for African farmers <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
