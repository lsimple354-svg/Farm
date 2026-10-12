import React, { useState } from 'react';
import type { Page } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { COUNTIES } from '../data/mockData';
import {
  Sprout,
  Search,
  MapPin,
  Globe,
  Menu,
  X,
  ChevronDown,
  CloudSun,
  TrendingUp,
  Cpu,
  Calendar,
  Users,
  Layers,
  ShieldAlert,
  Calculator,
  User,
  Store,
  Compass,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  openSearchModal: () => void;
  selectedCounty: string;
  setSelectedCounty: (county: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openSearchModal,
  selectedCounty,
  setSelectedCounty,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<'guides' | 'tools' | 'more' | null>(null);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <nav className="bg-[#183D29] text-[#FAF7F0] border-b border-emerald-900/60 sticky top-10 sm:top-10 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-black text-lg tracking-tight text-[#FAF7F0]">
                    AgriKnowledge
                  </span>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                    HUB
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200/80 tracking-wide font-medium hidden sm:block">
                  East Africa Smart Farming Advisory
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentPage === 'home'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              {t('home')}
            </button>

            <button
              onClick={() => handleNav('community')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                currentPage === 'community'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-300" />
              <span>{t('community')}</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </button>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === 'guides' ? null : 'guides')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                  ['crops', 'livestock', 'soil-water', 'pests'].includes(currentPage)
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                <span>Farming Guides</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {dropdownOpen === 'guides' && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-700/80 p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={() => handleNav('crops')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('crops')}</div>
                      <div className="text-[10px] text-stone-400">Maize, avocado, tubers & horticulture</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('livestock')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('livestock')}</div>
                      <div className="text-[10px] text-stone-400">Dairy, poultry, goats, bees</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('soil-water')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('soilWater')}</div>
                      <div className="text-[10px] text-stone-400">Drip, pH testing, rainwater</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('pests')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-semibold text-rose-300">{t('pests')}</div>
                      <div className="text-[10px] text-stone-400">Armyworm, Tuta, Blight control</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('weather')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                currentPage === 'weather'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <CloudSun className="w-4 h-4 text-sky-300" />
              <span>Weather</span>
            </button>

            <button
              onClick={() => handleNav('markets')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                currentPage === 'markets'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <span>{t('markets')}</span>
            </button>

            {/* AI Assistant */}
            <button
              onClick={() => handleNav('ai-assistant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition border ${
                currentPage === 'ai-assistant'
                  ? 'bg-emerald-500 text-emerald-950 font-bold border-emerald-400 shadow-md'
                  : 'bg-emerald-900/80 text-emerald-200 border-emerald-700/60 hover:bg-emerald-800 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-amber-300" />
              <span>AI Daktari</span>
            </button>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === 'tools' ? null : 'tools')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                  ['calculators', 'farm-manager', 'suppliers', 'events', 'learning'].includes(currentPage)
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-emerald-100/90 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                <span>Tools & Hub</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {dropdownOpen === 'tools' && (
                <div
                  className="absolute right-0 mt-2 w-60 bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-700/80 p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={() => handleNav('calculators')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('calculators')}</div>
                      <div className="text-[10px] text-stone-400">Seed, fertilizer & feed rations</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('farm-manager')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Layers className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('farmManager')}</div>
                      <div className="text-[10px] text-stone-400">Track tasks & harvest finances</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('suppliers')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Store className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('suppliers')}</div>
                      <div className="text-[10px] text-stone-400">Verified agro-dealers & vets</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('events')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('events')}</div>
                      <div className="text-[10px] text-stone-400">Field days, clinics & ASK shows</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('learning')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Compass className="w-4 h-4 text-emerald-300" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('learning')}</div>
                      <div className="text-[10px] text-stone-400">Masterclasses & GAP guides</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('opportunities')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('opportunities')}</div>
                      <div className="text-[10px] text-stone-400">Fertilizer e-voucher & youth grants</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('farm-business')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Store className="w-4 h-4 text-emerald-300" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('farmBusiness')}</div>
                      <div className="text-[10px] text-stone-400">Contract farming & value addition</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('sustainable')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('sustainable')}</div>
                      <div className="text-[10px] text-stone-400">Regenerative soil & carbon credits</div>
                    </div>
                  </button>
                  <div className="border-t border-stone-800 my-1 pt-1">
                    <button
                      onClick={() => handleNav('admin-cms')}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-emerald-950 flex items-center justify-between text-xs text-stone-300"
                    >
                      <span>Extension Officer Portal</span>
                      <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded">CMS</span>
                    </button>
                    <button
                      onClick={() => handleNav('about')}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-emerald-950 text-xs text-stone-400"
                    >
                      About the Hub
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons: County Selector, Language Toggle, Search, Profile */}
          <div className="flex items-center gap-2">
            {/* County Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-[#112d1e] border border-emerald-800/80 px-2 py-1.5 rounded-xl text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="bg-transparent text-emerald-100 text-xs font-medium focus:outline-hidden cursor-pointer"
                title="Select County"
              >
                {COUNTIES.map((county) => (
                  <option key={county} value={county} className="bg-stone-900 text-stone-100">
                    {county}
                  </option>
                ))}
              </select>
            </div>

            {/* Global Search Button */}
            <button
              onClick={openSearchModal}
              className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 hover:text-white transition"
              title="Search Hub"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#112d1e] hover:bg-emerald-900/80 border border-emerald-800/80 text-xs font-semibold text-emerald-200 transition"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? 'SW' : 'EN'}</span>
            </button>

            {/* User Profile avatar */}
            <button
              onClick={() => handleNav('profile')}
              className={`flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl border transition ${
                currentPage === 'profile'
                  ? 'bg-emerald-700 border-white text-white'
                  : 'bg-[#112d1e] hover:bg-emerald-900/80 border-emerald-800/80 text-emerald-100'
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-emerald-400"
              />
              <span className="text-xs font-medium hidden md:inline truncate max-w-[90px]">
                {user.name.split(' ')[0]}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-900/80 text-emerald-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#112d1e] border-t border-emerald-900 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="bg-stone-900 text-stone-100 text-xs px-2 py-1 rounded-lg border border-emerald-700"
              >
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="flex items-center gap-1 text-xs bg-emerald-950 px-2 py-1 rounded-lg text-emerald-200 border border-emerald-800"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Swahili' : 'English'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNav('home')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'home' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              🌱 {t('home')}
            </button>
            <button
              onClick={() => handleNav('community')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'community' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              👥 {t('community')}
            </button>
            <button
              onClick={() => handleNav('crops')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'crops' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              🌾 {t('crops')}
            </button>
            <button
              onClick={() => handleNav('livestock')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'livestock' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              🐄 {t('livestock')}
            </button>
            <button
              onClick={() => handleNav('pests')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'pests' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              🐛 {t('pests')}
            </button>
            <button
              onClick={() => handleNav('weather')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'weather' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              ⛅ Weather
            </button>
            <button
              onClick={() => handleNav('markets')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'markets' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              📊 {t('markets')}
            </button>
            <button
              onClick={() => handleNav('ai-assistant')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'ai-assistant' ? 'bg-emerald-500 text-emerald-950 font-bold' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              🤖 AI Daktari
            </button>
            <button
              onClick={() => handleNav('calculators')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'calculators' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              🧮 Calculators
            </button>
            <button
              onClick={() => handleNav('farm-manager')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'farm-manager' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              📋 Farm Records
            </button>
            <button
              onClick={() => handleNav('events')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'events' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              📅 {t('events')}
            </button>
            <button
              onClick={() => handleNav('profile')}
              className={`p-2.5 rounded-lg text-left font-medium ${currentPage === 'profile' ? 'bg-emerald-700 text-white' : 'bg-emerald-950/60 text-emerald-100'}`}
            >
              👨‍🌾 {t('profile')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
