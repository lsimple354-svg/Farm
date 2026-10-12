import React, { useState } from 'react';
import type { Page } from '../types';
import {
  Sparkles,
  Droplets,
  Layers,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface SoilWaterPageProps {
  setCurrentPage: (page: Page) => void;
}

export const SoilWaterPage: React.FC<SoilWaterPageProps> = ({ setCurrentPage }) => {
  // Soil pH Liming Calculator state
  const [currentPh, setCurrentPh] = useState<number>(5.0);
  const [targetPh, setTargetPh] = useState<number>(6.5);
  const [acres, setAcres] = useState<number>(2);
  const [soilTexture, setSoilTexture] = useState<'Sandy' | 'Loam' | 'Clay'>('Loam');

  // Calculate lime requirement (approx kg per acre)
  const phDiff = Math.max(0, targetPh - currentPh);
  const factor = soilTexture === 'Sandy' ? 1200 : soilTexture === 'Loam' ? 1800 : 2400;
  const limePerAcre = Math.round(phDiff * factor);
  const totalLime = limePerAcre * acres;
  const lime50kgBags = Math.ceil(totalLime / 50);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-cyan-600" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Soil Health & Water Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            pH correction, agricultural lime, precision drip irrigation, and rainwater harvesting.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('calculators')}
          className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-semibold text-xs flex items-center gap-1.5 transition shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>More Farm Calculators</span>
        </button>
      </div>

      {/* Interactive Soil pH & Lime Requirement Tool */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-600/30 shadow-md">
        <div className="flex items-center gap-2 text-cyan-800 mb-2">
          <Sparkles className="w-5 h-5 text-cyan-600" />
          <h2 className="text-lg font-serif font-bold">Interactive Agricultural Lime Estimator</h2>
        </div>
        <p className="text-xs text-stone-600 mb-6">
          Highland soils in Uasin Gishu, Trans Nzoia, and Kisii are frequently acidic (pH &lt; 5.2) due to
          continuous DAP fertilizer usage and high rainfall leaching. Restoring pH unlocks trapped phosphorus!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Current Soil pH</label>
            <input
              type="number"
              step="0.1"
              min="3.5"
              max="7.5"
              value={currentPh}
              onChange={(e) => setCurrentPh(parseFloat(e.target.value) || 5.0)}
              className="w-full text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
            />
            <span className="text-[10px] text-stone-400">From lab test report</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Target Soil pH</label>
            <input
              type="number"
              step="0.1"
              min="5.5"
              max="7.5"
              value={targetPh}
              onChange={(e) => setTargetPh(parseFloat(e.target.value) || 6.5)}
              className="w-full text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
            />
            <span className="text-[10px] text-stone-400">Ideal for maize & beans (6.2 - 6.5)</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Soil Texture Type</label>
            <select
              value={soilTexture}
              onChange={(e) => setSoilTexture(e.target.value as any)}
              className="w-full text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
            >
              <option value="Sandy">Sandy Loam (Low buffering)</option>
              <option value="Loam">Medium Clay Loam</option>
              <option value="Clay">Heavy Volcanic Clay (High buffering)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Plot Area (Acres)</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
              className="w-full text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Calculation Result Board */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-emerald-50 border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-cyan-900 uppercase tracking-wider">
              Calculated Lime Requirement
            </div>
            <div className="text-2xl font-serif font-black text-stone-900 mt-0.5">
              {totalLime.toLocaleString()} kg of Agricultural Lime (Calcitic / Dolomitic)
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Equivalent to <strong>{lime50kgBags} bags (50kg)</strong>. Apply 3-4 weeks before planting
              and incorporate 15cm into topsoil.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-xs bg-cyan-700 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs">
              Est. Cost: KES {(lime50kgBags * 500).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Drip Irrigation & Water Harvesting Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-cyan-700">
            <Droplets className="w-5 h-5" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Low-Pressure Gravity Drip Irrigation
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Drip delivers water straight to root zones, cutting water usage by up to 60% compared to
            furrow irrigation while eliminating fungal leaf splash.
          </p>

          <ul className="text-xs text-stone-700 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Tank Elevation:</strong> Minimum 1.5m to 2.0m tower height for 0.2 bar gravity pressure.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Disc Filtration:</strong> Install a 120-mesh disc filter at header outlet to stop emitter clogging.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Emitter Spacing:</strong> 15cm or 20cm emitters (1.2 - 2.0 L/hr) for tomatoes, onions, capsicum.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Sun className="w-5 h-5" />
            <h3 className="font-serif font-bold text-base text-stone-900">
              Solar Water Pumping & Dam Lining
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Eliminate diesel generator fuel bills with direct solar DC submersible and surface pumps,
            paired with UV-treated 0.8mm HDPE dam liners for rainwater storage.
          </p>

          <ul className="text-xs text-stone-700 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Dam Liner Spec:</strong> 0.8mm or 1.0mm thickness with hot-wedge welding for 15+ years lifespan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Silt Traps:</strong> Construct twin stone silt traps along intake canals to prevent siltation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Solar Sizing:</strong> 600W - 1200W solar array pumps 15,000L to 30,000L daily on sunny days.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
