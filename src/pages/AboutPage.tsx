import React, { useState } from 'react';
import {
  Sprout,
  ShieldCheck,
  Heart,
  Users,
  MapPin,
  Phone,
  Mail,
  Award,
  Globe,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PlaySquare,
  Calculator,
  TrendingUp,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does AgriKnowledge Hub ensure recommendations are accurate and safe?',
      a: 'All agronomic guidelines, dosage calculations, and pest identification keys are cross-referenced with official research manuals published by KALRO (Kenya Agricultural and Livestock Research Organization), KEPHIS, the Pest Control Products Board (PCPB), and the Kenya Meteorological Department. High-impact advice is verified by certified agronomists.',
    },
    {
      q: 'How do the 26 Agricultural Calculators work?',
      a: 'Each calculator utilizes verified mathematical and agronomic formulas tailored for East African and international growing conditions—such as plant populations per acre, NPK fertilizer split applications, knapsack sprayer water ratios, Pearson square livestock feeds, and storage moisture loss.',
    },
    {
      q: 'Can I sell my produce or farm inputs on AgriMarket?',
      a: 'Yes! Registered growers, livestock keepers, cooperatives, and verified agro-dealers can publish trade listings on AgriMarket. Buyers can send direct messages or call sellers directly without brokerage markups.',
    },
    {
      q: 'Is AgriKnowledge Hub available offline?',
      a: 'Yes. AgriKnowledge Hub is built as an installable Progressive Web App (PWA). Once installed on your phone or computer, calculators, core crop guides, and saved offline data remain accessible without an active internet connection.',
    },
    {
      q: 'What is the role of AI Daktari in farm diagnostics?',
      a: 'AI Daktari is powered by Google Gemini and trained on regional agronomy datasets to assist farmers with rapid symptom analysis, planting schedules, and crop protection decisions. In emergencies, it advises on reaching local sub-county extension officers.',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center mx-auto shadow-md">
          <Sprout className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          About AgriKnowledge Hub Worldwide
        </h1>

        <p className="text-emerald-700 font-bold text-sm tracking-wide uppercase">
          Trusted Agricultural Knowledge • Stronger Farming • Better Markets
        </p>

        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          An integrated digital agricultural platform founded and developed by{' '}
          <strong className="text-stone-900">Adams Kipkoech Kering</strong>, dedicated to empowering smallholders,
          commercial growers, livestock keepers, and agribusinesses across Kenya, East Africa, and worldwide.
        </p>
      </div>

      {/* Founder Profile & Story */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
          <Award className="w-6 h-6 text-emerald-700 shrink-0" />
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900">Founder & Architectural Vision</h2>
            <p className="text-xs text-stone-500">Adams Kipkoech Kering • Founder, Engineer & Agricultural Innovator</p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
          <p>
            AgriKnowledge Hub was founded by <strong>Adams Kipkoech Kering</strong> with a singular mission: to bridge the critical agricultural extension gap that leaves millions of smallholder farmers and agribusinesses without timely, empirical agronomic advisory, transparent market prices, and precision farm planning tools.
          </p>
          <p>
            Having observed the acute challenges of soil degradation, pest outbreaks such as Fall Armyworm and Tuta absoluta, climate volatility, and exploitative produce middlemen in Kenya and East Africa, Adams architected AgriKnowledge Hub to deliver an end-to-end digital ecosystem combining:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>1. Peer-to-Peer Baraza & Video (AgriFeed & Reels)</span>
              </span>
              <p className="text-[11px] text-emerald-900">
                A social knowledge network where farmers share photographic observations, short farming video reels, and peer solutions verified by agronomists.
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>2. 26 Mathematical Farm Calculators</span>
              </span>
              <p className="text-[11px] text-emerald-900">
                Precision tools eliminating guesswork in seed quantities, split fertilizer budgeting, dairy TMR rations, and knapsack sprayer dilution.
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>3. Direct Produce Marketplace (AgriMarket)</span>
              </span>
              <p className="text-[11px] text-emerald-900">
                Direct wholesale listings linking grain, milk, and vegetable growers with commercial off-takers and vetted suppliers with zero broker friction.
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>4. 14 Curriculums in AgriAcademy</span>
              </span>
              <p className="text-[11px] text-emerald-900">
                Good Agricultural Practices (GAP) masterclasses across crops, livestock, regenerative soil carbon, and agribusiness finance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">45,000+</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Registered Farmers</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">26</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Precision Calculators</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">14</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Academy Curriculums</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">47</div>
          <p className="text-xs text-stone-500 mt-1 font-medium">Counties & Beyond</p>
        </div>
      </div>

      {/* Institutional Collaborations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-lg font-serif font-bold text-stone-900">
          Institutional Collaborations & Empirical Grounding
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          All agronomic pest thresholds, certified seed listings, fertilizer formulations, and veterinary protocols on AgriKnowledge Hub are grounded in empirical research from:
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
              <p className="text-stone-500">Kenya Plant Health Inspectorate Service (Seed Certification)</p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <span className="text-xl">⛅</span>
            <div>
              <strong className="text-stone-900">KMD</strong>
              <p className="text-stone-500">Kenya Meteorological Department (Agro-Weather Forecasts)</p>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
            <span className="text-xl">🌿</span>
            <div>
              <strong className="text-stone-900">icipe</strong>
              <p className="text-stone-500">International Centre of Insect Physiology and Ecology (Push-Pull)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Centre & FAQ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-serif font-bold text-stone-900">Frequently Asked Questions & Help Centre</h2>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 bg-stone-50 hover:bg-stone-100 transition cursor-pointer text-xs sm:text-sm font-semibold text-stone-900"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-[#183D29] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-lg font-serif font-bold text-[#FAF7F0]">Farmer Support Desk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Hotline: 0800 720 021 (Toll-Free)</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Email: advisory@agriknowledgehub.org</span>
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
