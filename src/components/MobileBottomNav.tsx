import React from 'react';
import type { Page } from '../types';
import { Home, Users, Cpu, TrendingUp, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setCurrentPage('home')}
        className={`flex flex-col items-center py-1 transition ${
          currentPage === 'home' ? 'text-[#183D29] font-bold' : 'text-stone-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      <button
        onClick={() => setCurrentPage('community')}
        className={`flex flex-col items-center py-1 transition ${
          currentPage === 'community' ? 'text-[#183D29] font-bold' : 'text-stone-500'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Feed</span>
      </button>

      <button
        onClick={() => setCurrentPage('ai-assistant')}
        className={`flex flex-col items-center py-1 transition ${
          currentPage === 'ai-assistant' ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-800 -mt-3 shadow-sm border border-emerald-300">
          <Cpu className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5">AI Daktari</span>
      </button>

      <button
        onClick={() => setCurrentPage('markets')}
        className={`flex flex-col items-center py-1 transition ${
          currentPage === 'markets' ? 'text-[#183D29] font-bold' : 'text-stone-500'
        }`}
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Markets</span>
      </button>

      <button
        onClick={() => setCurrentPage('profile')}
        className={`flex flex-col items-center py-1 transition ${
          currentPage === 'profile' ? 'text-[#183D29] font-bold' : 'text-stone-500'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Profile</span>
      </button>
    </div>
  );
};
