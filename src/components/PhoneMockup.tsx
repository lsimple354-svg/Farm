import React from 'react';
import type { Page } from '../types';
import { Wifi, Battery, Signal, Home, Users, Cpu, CloudSun, User, Sparkles } from 'lucide-react';

interface PhoneMockupProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  currentPage,
  setCurrentPage,
  children,
}) => {
  return (
    <div className="relative mx-auto my-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] rounded-[48px] p-3 bg-gradient-to-b from-stone-800 via-stone-900 to-black border-4 border-stone-700/80 max-w-[410px] w-full">
      {/* Outer Phone Bezel Buttons */}
      <div className="absolute -left-1 top-24 w-1 h-10 bg-stone-600 rounded-l-md" />
      <div className="absolute -left-1 top-38 w-1 h-12 bg-stone-600 rounded-l-md" />
      <div className="absolute -left-1 top-53 w-1 h-12 bg-stone-600 rounded-l-md" />
      <div className="absolute -right-1 top-32 w-1 h-16 bg-stone-600 rounded-r-md" />

      {/* Screen Frame */}
      <div className="relative bg-[#FAF7F0] text-stone-900 rounded-[40px] overflow-hidden flex flex-col h-[760px] max-h-[82vh] border border-stone-800 shadow-inner">
        {/* Mobile Top Status Bar & Dynamic Island */}
        <div className="bg-[#183D29] text-[#FAF7F0] px-6 pt-3 pb-2 flex items-center justify-between text-xs select-none shrink-0 z-30">
          <span className="font-semibold text-[13px] tracking-tight">09:41</span>

          {/* Dynamic Island Notch */}
          <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] flex items-center gap-2 border border-stone-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-medium tracking-tight">AgriHub • Active</span>
          </div>

          <div className="flex items-center gap-1.5 opacity-90">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-medium">98%</span>
              <Battery className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Mini App Top Brand Header inside phone */}
        <div className="bg-[#183D29] text-white px-4 py-2 flex items-center justify-between border-b border-emerald-900 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-sm tracking-tight text-[#FAF7F0]">
              AgriKnowledge
            </span>
            <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.2 rounded">
              KE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage('ai-assistant')}
              className="text-[11px] bg-emerald-800/90 text-emerald-200 hover:text-white px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-700"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Daktari</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body inside phone */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4 bg-[#F4F1EA]">
          {children}
        </div>

        {/* Bottom Navigation Dock in Mobile View */}
        <div className="bg-white/95 backdrop-blur-md border-t border-stone-200 px-1.5 py-1.5 flex items-center justify-around shrink-0 z-30">
          <button
            onClick={() => setCurrentPage('community')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition cursor-pointer ${
              currentPage === 'community'
                ? 'text-[#183D29] font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Feed</span>
          </button>

          <button
            onClick={() => setCurrentPage('reels')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition cursor-pointer ${
              currentPage === 'reels'
                ? 'text-amber-600 font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Reels</span>
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition cursor-pointer ${
              currentPage === 'home'
                ? 'text-[#183D29] font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Home</span>
          </button>

          <button
            onClick={() => setCurrentPage('calculators')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition cursor-pointer ${
              currentPage === 'calculators'
                ? 'text-purple-700 font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <div className="p-1 rounded-full bg-emerald-100 text-emerald-800 -mt-2 shadow-xs">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-[9px] mt-0.5">Tools</span>
          </button>

          <button
            onClick={() => setCurrentPage('messages')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition cursor-pointer ${
              currentPage === 'messages'
                ? 'text-[#183D29] font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Chat</span>
          </button>

          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl transition cursor-pointer ${
              currentPage === 'profile'
                ? 'text-[#183D29] font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[9px] mt-0.5">Profile</span>
          </button>
        </div>

        {/* iPhone Home Indicator bar */}
        <div className="bg-white pb-2 pt-1 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-stone-400/80 rounded-full" />
        </div>
      </div>
    </div>
  );
};
