import React, { useState } from 'react';
import type { PestAlert } from '../types';
import { MOCK_PESTS } from '../data/mockData';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  Leaf,
  Bug,
  MapPin,
} from 'lucide-react';

export const PestsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [activePest, setActivePest] = useState<PestAlert | null>(MOCK_PESTS[0]);

  const filtered = MOCK_PESTS.filter((p) => {
    const matchSev = selectedSeverity === 'All' || p.severity === selectedSeverity;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      p.affectedCrops.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchSev && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Pest & Crop Disease Diagnostic Doctor
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Visual symptoms identification, IPM biological solutions, and recommended chemical modes of action.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search armyworm, tuta, blight, maize..."
            className="text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden w-64"
          />
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Critical', 'High', 'Moderate'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSelectedSeverity(sev)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition ${
              selectedSeverity === sev
                ? 'bg-rose-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Grid: Pest Cards & Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((pest) => {
            const isSelected = activePest?.id === pest.id;

            return (
              <div
                key={pest.id}
                onClick={() => setActivePest(pest)}
                className={`bg-white rounded-2xl p-5 border transition cursor-pointer flex flex-col sm:flex-row gap-4 hover:shadow-md ${
                  isSelected ? 'border-2 border-rose-600 ring-2 ring-rose-100' : 'border-stone-200'
                }`}
              >
                <img
                  src={pest.imageUrl}
                  alt={pest.name}
                  className="w-full sm:w-44 h-36 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        pest.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {pest.severity} Alert
                    </span>
                    <span className="text-[11px] text-stone-400 italic">{pest.scientificName}</span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900">{pest.name}</h3>

                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className="font-semibold text-stone-500 mr-1">Affects:</span>
                    {pest.affectedCrops.map((c, i) => (
                      <span key={i} className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {pest.symptoms[0]}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-rose-700 font-medium pt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Reported in: {pest.countyPrevalence.join(', ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Pest Full Dossier */}
        {activePest && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md space-y-4 lg:sticky lg:top-20 h-fit">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full">
                Diagnostic File
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900">{activePest.name}</h2>
              <p className="text-xs text-stone-500 italic">{activePest.scientificName}</p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 divide-y divide-stone-100">
              {/* Symptoms */}
              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1.5 flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Key Visual Symptoms:</span>
                </p>
                <ul className="space-y-1 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  {activePest.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Biological / Organic Control */}
              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1 flex items-center gap-1.5 text-emerald-800">
                  <Leaf className="w-4 h-4" />
                  <span>Biological & Cultural Control:</span>
                </p>
                <p className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 text-stone-800">
                  {activePest.biologicalControl}
                </p>
              </div>

              {/* Chemical Control */}
              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1 flex items-center gap-1.5 text-indigo-800">
                  <FlaskConical className="w-4 h-4" />
                  <span>Recommended Chemical Active Ingredients:</span>
                </p>
                <p className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-200 text-stone-800">
                  {activePest.chemicalControl}
                </p>
              </div>

              {/* Prevention */}
              <div className="pt-2">
                <p className="font-bold text-stone-900 mb-1 flex items-center gap-1.5 text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Preventive Farming Measures:</span>
                </p>
                <p className="text-stone-600">{activePest.preventiveMeasures}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
