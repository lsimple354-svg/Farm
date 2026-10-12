import React from 'react';
import { Sprout, ShieldCheck, Heart, Users, MapPin, Phone, Mail } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center mx-auto shadow-md">
          <Sprout className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          About AgriKnowledge Hub
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Bridging the critical agricultural extension gap in East Africa through localized, climate-resilient
          agronomic science, peer-to-peer farmer problem solving, transparent market intelligence, and AI-powered diagnostic tools.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">45,000+</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Registered Smallholders</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">16</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Counties Covered</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">120+</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Verified Crop Protocols</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">24/7</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">AI Daktari Availability</p>
        </div>
      </div>

      {/* Institutional Partnerships */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <h2 className="text-lg font-serif font-bold text-stone-900">
          Institutional Collaborations & Grounding
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          All agronomic pest thresholds, certified seed listings, fertilizer formulations, and veterinary protocols
          on this platform adhere to the empirical research standards established by:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <span className="text-xl">🏛️</span>
            <div>
              <strong className="text-stone-900">KALRO</strong>
              <p className="text-stone-500">Kenya Agricultural & Livestock Research Organization</p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <span className="text-xl">🌱</span>
            <div>
              <strong className="text-stone-900">KEPHIS</strong>
              <p className="text-stone-500">Kenya Plant Health Inspectorate Service</p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <span className="text-xl">🥛</span>
            <div>
              <strong className="text-stone-900">Kenya Dairy Board (KDB)</strong>
              <p className="text-stone-500">National milk quality, hygiene & silage standards</p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <span className="text-xl">🌿</span>
            <div>
              <strong className="text-stone-900">icipe</strong>
              <p className="text-stone-500">International Centre of Insect Physiology and Ecology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-[#183D29] text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#FAF7F0]">Farmer Support Desk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Hotline: 0800 720 021 (Toll-Free)</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Email: advisory@agrihub.go.ke</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Offices: Eldoret, Nairobi & Kitale</span>
          </div>
        </div>
      </div>
    </div>
  );
};
