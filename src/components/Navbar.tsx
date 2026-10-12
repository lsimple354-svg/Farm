import React, { useState } from 'react';
import type { Page } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useInternational } from '../context/InternationalContext';
import { COUNTIES } from '../data/mockData';
import { NotificationPanel } from './NotificationPanel';
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
  Bell,
  MessageSquare,
  PlaySquare,
  DollarSign,
  Info,
  Scale,
  LogOut,
  PhoneCall,
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
  const { unreadCount } = useNotifications();
  const { country, setCountry, currency, setCurrency, units, setUnits } = useInternational();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<'guides' | 'tools' | 'more' | 'user' | null>(null);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    setNotificationsOpen(false);
  };

  const handleNotificationNavigate = (page: Page, targetId?: string) => {
    setCurrentPage(page);
    setNotificationsOpen(false);
  };

  return (
    <nav className="bg-[#183D29] text-[#FAF7F0] border-b border-emerald-900/60 sticky top-0 sm:top-10 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo - Strictly independent layout space with shrink-0 */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-xl p-1"
              aria-label="AgriKnowledge Hub Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-serif font-black text-base sm:text-lg tracking-tight text-[#FAF7F0]">
                    AgriKnowledge
                  </span>
                  <span className="text-emerald-400 font-bold text-[10px] sm:text-xs bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-800">
                    HUB
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-emerald-300 tracking-wide font-medium hidden xs:block">
                  Worldwide Farming Advisory
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              {t('home')}
            </button>

            {/* AgriFeed Community */}
            <button
              onClick={() => handleNav('community')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'community'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-300" />
              <span>AgriFeed</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {/* AgriReels (Phase 4) */}
            <button
              onClick={() => handleNav('reels')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'reels'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <PlaySquare className="w-4 h-4 text-amber-300" />
              <span>AgriReels</span>
            </button>

            {/* AgriAcademy (Phase 6) */}
            <button
              onClick={() => handleNav('learning')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'learning'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Academy</span>
            </button>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === 'guides' ? null : 'guides')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                  ['crops', 'livestock', 'soil-water', 'pests'].includes(currentPage)
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                <span>Guides</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {dropdownOpen === 'guides' && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-700/80 p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={() => handleNav('crops')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('crops')}</div>
                      <div className="text-[10px] text-stone-400">Maize, avocado, tubers & legumes</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('livestock')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('livestock')}</div>
                      <div className="text-[10px] text-stone-400">Dairy, poultry, goats, pigs, bees</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('soil-water')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('soilWater')}</div>
                      <div className="text-[10px] text-stone-400">Soil fertility & precision drip</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('pests')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-semibold text-rose-300">{t('pests')}</div>
                      <div className="text-[10px] text-stone-400">Pest doctor & disease diagnosis</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Calculators (26 Direct Precision Tools) */}
            <button
              onClick={() => handleNav('calculators')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'calculators'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span>Calculators (26)</span>
            </button>

            {/* Markets */}
            <button
              onClick={() => handleNav('markets')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                currentPage === 'markets'
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <span>AgriMarket</span>
            </button>

            {/* AI Assistant */}
            <button
              onClick={() => handleNav('ai-assistant')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition border cursor-pointer ${
                currentPage === 'ai-assistant'
                  ? 'bg-emerald-500 text-emerald-950 font-bold border-emerald-400 shadow-sm'
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
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                  ['farm-manager', 'suppliers', 'events', 'opportunities', 'farm-business', 'sustainable'].includes(
                    currentPage
                  )
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {dropdownOpen === 'tools' && (
                <div
                  className="absolute right-0 mt-2 w-60 bg-stone-900 text-stone-100 rounded-xl shadow-2xl border border-stone-700/80 p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    onClick={() => handleNav('farm-manager')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('farmManager')}</div>
                      <div className="text-[10px] text-stone-400">Track tasks & harvest budgets</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('suppliers')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="font-semibold text-stone-100">Certified Agro-Dealers</div>
                      <div className="text-[10px] text-stone-400">Verified seed & equipment</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('events')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('events')}</div>
                      <div className="text-[10px] text-stone-400">Field days, clinics & ASK shows</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('opportunities')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">{t('opportunities')}</div>
                      <div className="text-[10px] text-stone-400">Grants, subsidies & youth funding</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNav('sustainable')}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2.5 text-xs font-medium cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-stone-100">Regenerative Farming</div>
                      <div className="text-[10px] text-stone-400">Soil carbon & push-pull</div>
                    </div>
                  </button>
                  <div className="border-t border-stone-800 my-1 pt-1">
                    <button
                      onClick={() => handleNav('about')}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-emerald-950 flex items-center gap-2 text-xs text-stone-300 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-stone-400" />
                      <span>About AgriKnowledge Hub</span>
                    </button>
                    <button
                      onClick={() => handleNav('legal')}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-emerald-950 flex items-center gap-2 text-xs text-stone-300 cursor-pointer"
                    >
                      <Scale className="w-3.5 h-3.5 text-stone-400" />
                      <span>Kenya DPA 2019 & Terms</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons: Independent layout spaces */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative">
            {/* Country / Location Selector */}
            <div className="hidden md:flex items-center gap-1 bg-[#112d1e] border border-emerald-800/80 px-2 py-1.5 rounded-xl text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="bg-transparent text-emerald-100 text-xs font-medium focus:outline-none cursor-pointer max-w-[110px] truncate"
                title="Select County / Region"
                aria-label="Select County / Region"
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
              className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 hover:text-white transition cursor-pointer"
              title="Global Search"
              aria-label="Search AgriKnowledge Hub"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Messages Icon Button (Phase 5) */}
            <button
              onClick={() => handleNav('messages')}
              className={`p-2 rounded-xl border transition relative cursor-pointer ${
                currentPage === 'messages'
                  ? 'bg-emerald-700 border-white text-white'
                  : 'bg-[#112d1e] hover:bg-emerald-900/80 border-emerald-800/80 text-emerald-200 hover:text-white'
              }`}
              title="Direct Messages & Farming Groups"
              aria-label="Direct Messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-stone-900" />
            </button>

            {/* Notification Bell Button (Fixes defect: independent position, non-overlapping) */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationsOpen(!notificationsOpen);
                }}
                className={`p-2 rounded-xl border transition relative cursor-pointer ${
                  notificationsOpen
                    ? 'bg-emerald-600 border-white text-white'
                    : 'bg-[#112d1e] hover:bg-emerald-900/80 border-emerald-800/80 text-emerald-200 hover:text-white'
                }`}
                title="View Notifications"
                aria-label={`Notifications (${unreadCount} unread)`}
                aria-expanded={notificationsOpen}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-stone-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Panel Mount */}
              <NotificationPanel
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                onNavigate={handleNotificationNavigate}
              />
            </div>

            {/* Currency & Unit Switcher */}
            <div className="hidden xl:flex items-center gap-1 bg-[#112d1e] border border-emerald-800/80 px-2 py-1 rounded-xl text-[11px] font-semibold text-emerald-200">
              <button
                onClick={() => setCurrency(currency === 'KES' ? 'USD' : currency === 'USD' ? 'EUR' : 'KES')}
                className="hover:text-white cursor-pointer px-1"
                title="Toggle Currency"
              >
                {currency}
              </button>
              <span className="text-emerald-700">|</span>
              <button
                onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}
                className="hover:text-white cursor-pointer px-1"
                title="Toggle Metric/Imperial"
              >
                {units === 'metric' ? 'Metric' : 'Imp'}
              </button>
            </div>

            {/* User Profile Avatar with Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(dropdownOpen === 'user' ? null : 'user')}
                className={`flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-xl border transition cursor-pointer ${
                  currentPage === 'profile'
                    ? 'bg-emerald-700 border-white text-white'
                    : 'bg-[#112d1e] hover:bg-emerald-900/80 border-emerald-800/80 text-emerald-100'
                }`}
                aria-label="User Profile Menu"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-400 shrink-0"
                />
                <span className="text-xs font-semibold hidden md:inline truncate max-w-[80px]">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70 hidden sm:inline" />
              </button>

              {dropdownOpen === 'user' && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-stone-900 text-stone-100 rounded-2xl shadow-2xl border border-stone-700 p-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <div className="px-3 py-2 border-b border-stone-800">
                    <p className="font-bold text-xs text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-emerald-400 truncate">{user.role}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{user.county} • {user.reputationPoints} pts</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => handleNav('profile')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2 text-xs font-medium cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      <span>My Farm Profile</span>
                    </button>
                    <button
                      onClick={() => handleNav('farm-manager')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2 text-xs font-medium cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Farm Management Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNav('admin-cms')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2 text-xs font-medium cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Extension Officer Portal</span>
                    </button>
                    <button
                      onClick={() => handleNav('about')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-950 flex items-center gap-2 text-xs font-medium cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-stone-400" />
                      <span>About Adams K. Kering & Mission</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#112d1e] border-t border-emerald-900 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Mobile Region & Language Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 gap-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="bg-stone-900 text-stone-100 text-xs px-2 py-1 rounded-lg border border-emerald-700 w-full truncate"
              >
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
                className="flex items-center gap-1 text-xs bg-emerald-950 px-2.5 py-1 rounded-lg text-emerald-200 border border-emerald-800 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'SW' : 'EN'}</span>
              </button>
              <button
                onClick={() => setCurrency(currency === 'KES' ? 'USD' : 'KES')}
                className="text-xs bg-emerald-950 px-2 py-1 rounded-lg text-emerald-200 border border-emerald-800 font-semibold cursor-pointer"
              >
                {currency}
              </button>
            </div>
          </div>

          {/* Quick Grid Navigation */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNav('home')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'home' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🌱 {t('home')}
            </button>
            <button
              onClick={() => handleNav('community')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'community' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              👥 AgriFeed Community
            </button>
            <button
              onClick={() => handleNav('reels')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'reels' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              ▶️ AgriReels Videos
            </button>
            <button
              onClick={() => handleNav('learning')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'learning' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🎓 AgriAcademy (14)
            </button>
            <button
              onClick={() => handleNav('calculators')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'calculators' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🧮 26 Calculators
            </button>
            <button
              onClick={() => handleNav('markets')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'markets' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              📊 AgriMarket Place
            </button>
            <button
              onClick={() => handleNav('messages')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'messages' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              💬 Direct Messages
            </button>
            <button
              onClick={() => handleNav('ai-assistant')}
              className={`p-2.5 rounded-xl text-left font-bold cursor-pointer transition ${
                currentPage === 'ai-assistant' ? 'bg-emerald-500 text-emerald-950 shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🤖 AI Daktari
            </button>
            <button
              onClick={() => handleNav('crops')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'crops' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🌾 Crops Guide
            </button>
            <button
              onClick={() => handleNav('livestock')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'livestock' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🐄 Livestock Care
            </button>
            <button
              onClick={() => handleNav('pests')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'pests' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              🐛 Pest Doctor
            </button>
            <button
              onClick={() => handleNav('weather')}
              className={`p-2.5 rounded-xl text-left font-semibold cursor-pointer transition ${
                currentPage === 'weather' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900'
              }`}
            >
              ⛅ Weather Radar
            </button>
          </div>

          <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300">
            <button onClick={() => handleNav('about')} className="hover:text-white cursor-pointer">
              About Platform
            </button>
            <span>•</span>
            <button onClick={() => handleNav('legal')} className="hover:text-white cursor-pointer">
              Kenya DPA 2019
            </button>
            <span>•</span>
            <button onClick={() => handleNav('profile')} className="hover:text-white cursor-pointer">
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
