import React from 'react';
import type { Page } from '../types';
import { Home, Users, PlaySquare, Calculator, MessageSquare, User, TrendingUp } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

interface MobileBottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const { unreadCount } = useNotifications();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg select-none"
      aria-label="Mobile Navigation"
    >
      {/* Home */}
      <button
        onClick={() => setCurrentPage('home')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer ${
          currentPage === 'home' ? 'text-[#183D29] font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="Home"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      {/* AgriFeed Community */}
      <button
        onClick={() => setCurrentPage('community')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer relative ${
          currentPage === 'community' ? 'text-[#183D29] font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="AgriFeed"
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Feed</span>
        <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white animate-pulse" />
      </button>

      {/* AgriReels */}
      <button
        onClick={() => setCurrentPage('reels')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer ${
          currentPage === 'reels' ? 'text-amber-600 font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="AgriReels"
      >
        <PlaySquare className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Reels</span>
      </button>

      {/* Calculators */}
      <button
        onClick={() => setCurrentPage('calculators')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer ${
          currentPage === 'calculators' ? 'text-purple-700 font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="Calculators"
      >
        <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 -mt-2.5 shadow-sm border border-emerald-300">
          <Calculator className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5">Tools</span>
      </button>

      {/* AgriMarket */}
      <button
        onClick={() => setCurrentPage('markets')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer ${
          currentPage === 'markets' ? 'text-[#183D29] font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="AgriMarket"
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Market</span>
      </button>

      {/* Direct Messages */}
      <button
        onClick={() => setCurrentPage('messages')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer relative ${
          currentPage === 'messages' ? 'text-[#183D29] font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="Messages"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Chat</span>
        <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
      </button>

      {/* Profile */}
      <button
        onClick={() => setCurrentPage('profile')}
        className={`flex flex-col items-center py-1 px-1.5 transition cursor-pointer ${
          currentPage === 'profile' ? 'text-[#183D29] font-bold' : 'text-stone-400 hover:text-stone-600'
        }`}
        aria-label="Profile"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
