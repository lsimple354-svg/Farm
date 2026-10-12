import React from 'react';
import {
  Sparkles,
  Leaf,
  Layers,
  CheckCircle2,
  TrendingUp,
  TreeDeciduous,
  ShieldCheck,
} from 'lucide-react';

export const SustainablePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Regenerative Agriculture & Climate Resilience
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Build permanent living topsoil, slash synthetic fertilizer expenses, and earn verified carbon offset revenue.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Carbon Credit Eligible</span>
        </div>
      </div>

      {/* Sustainable Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Push-Pull */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
            icipe Biological Breakthrough
          </span>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Push-Pull Technology for Maize & Sorghum
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Intercropping Greenleaf or Silverleaf Desmodium between maize rows repels ("pushes") stemborer
            and fall armyworm moths, while border Napier or Brachiaria grass attracts ("pulls") them into a sticky trap.
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pt-1">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Fixes up to 100 kg of atmospheric nitrogen per acre annually.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Completely eliminates noxious parasitic Striga (witchweed) through suicidal root germination.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provides year-round 22% crude protein dairy fodder cuttings.</span>
            </li>
          </ul>
        </div>

        {/* Vermiculture */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
            Soil Biology Booster
          </span>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Vermicomposting & Vermi-Liquid Tea
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Red Californian Earthworms (Eisenia fetida) consume livestock manure and crop chaff, converting
            them into microbe-rich black casting humus and liquid worm tea within 45 days.
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pt-1">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Contains 5x more available nitrogen and 7x more phosphorus than standard compost.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Vermi-tea foliar spray acts as natural repellent against aphids and powdery mildew.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>Starter colony (1kg worms) reproduces 4x every 60 days.</span>
            </li>
          </ul>
        </div>

        {/* Agroforestry */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
            Trees on Farms
          </span>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Agroforestry Windbreaks & Fodder Banks
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Strategic boundary planting of <em>Calliandra calothyrsus</em> and <em>Grevillea robusta</em> protects
            crops from desiccating winds and soil erosion while providing timber and animal feed.
          </p>
          <ul className="text-xs text-stone-700 space-y-1.5 pt-1">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Calliandra leaves replace expensive commercial dairy meal (3kg leaves ≈ 1kg meal).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Grevillea deep taproots pump subsoil minerals without competing with surface crop roots.</span>
            </li>
          </ul>
        </div>

        {/* Carbon Credits */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
            New Income Stream
          </span>
          <h3 className="font-serif font-bold text-base text-stone-900">
            Smallholder Soil Carbon Credits
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Through agroforestry, minimal soil tillage, and permanent biochar/compost cover, farmers in
            the Kenya Agricultural Carbon Project (KACP) sequester 1.5 to 3.0 tons of CO₂ equivalent per acre annually.
          </p>
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between text-xs">
            <span className="text-purple-900 font-semibold">Average Carbon Payout:</span>
            <span className="font-bold text-purple-900">KES 2,800 – 4,500 / acre / yr</span>
          </div>
        </div>
      </div>
    </div>
  );
};
