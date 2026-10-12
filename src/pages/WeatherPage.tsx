import React from 'react';
import { COUNTIES } from '../data/mockData';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface WeatherPageProps {
  selectedCounty: string;
  setSelectedCounty: (county: string) => void;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({
  selectedCounty,
  setSelectedCounty,
}) => {
  const forecastDays = [
    { day: 'Today', temp: '23°C', low: '13°C', rainChance: '65%', condition: 'Scattered Showers', icon: 'rain' },
    { day: 'Tomorrow', temp: '25°C', low: '14°C', rainChance: '30%', condition: 'Partly Sunny', icon: 'sun-cloud' },
    { day: 'Wednesday', temp: '22°C', low: '12°C', rainChance: '80%', condition: 'Heavy Afternoon Rain', icon: 'rain' },
    { day: 'Thursday', temp: '24°C', low: '13°C', rainChance: '20%', condition: 'Clear Sky', icon: 'sun' },
    { day: 'Friday', temp: '26°C', low: '14°C', rainChance: '15%', condition: 'Warm & Dry', icon: 'sun' },
    { day: 'Saturday', temp: '25°C', low: '13°C', rainChance: '45%', condition: 'Light Showers', icon: 'rain' },
    { day: 'Sunday', temp: '23°C', low: '12°C', rainChance: '60%', condition: 'Cloudy with Rain', icon: 'rain' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with County Switcher */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-sky-600" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Agricultural Weather & Spray Advisory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Hyperlocal meteorological insights to optimize planting, fertilizer timing, and spraying.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-200">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="text-xs font-semibold text-stone-700">County:</span>
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="text-xs font-bold text-stone-900 bg-white border border-stone-300 rounded-xl px-3 py-1.5 focus:outline-hidden"
          >
            {COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Today Weather Card */}
      <div className="bg-gradient-to-br from-sky-900 via-sky-800 to-emerald-950 rounded-3xl text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs backdrop-blur-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>Current Weather • {selectedCounty} County (Eldoret Hub)</span>
            </div>
            <div className="text-5xl sm:text-6xl font-serif font-bold tracking-tight">23°C</div>
            <p className="text-lg text-sky-100 font-medium">Scattered Afternoon Showers • High Humidity</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="text-center p-2">
              <Droplets className="w-5 h-5 mx-auto text-sky-300 mb-1" />
              <div className="text-xs text-sky-200">Rain Prob.</div>
              <div className="text-sm font-bold">65%</div>
            </div>
            <div className="text-center p-2">
              <Thermometer className="w-5 h-5 mx-auto text-amber-300 mb-1" />
              <div className="text-xs text-sky-200">Humidity</div>
              <div className="text-sm font-bold">78%</div>
            </div>
            <div className="text-center p-2">
              <Wind className="w-5 h-5 mx-auto text-sky-300 mb-1" />
              <div className="text-xs text-sky-200">Wind</div>
              <div className="text-sm font-bold">11 km/h SE</div>
            </div>
            <div className="text-center p-2">
              <CloudSun className="w-5 h-5 mx-auto text-amber-300 mb-1" />
              <div className="text-xs text-sky-200">Soil Moisture</div>
              <div className="text-sm font-bold">Optimal</div>
            </div>
          </div>
        </div>
      </div>

      {/* 72-Hour Farmer Operations Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm">Top-Dressing & Fertilizing</h3>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            <strong>Optimal:</strong> High soil moisture present. Apply CAN / NPK now so nitrogen
            dissolves smoothly into the root zone without scorching or volatilizing.
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm">Chemical Spraying Window</h3>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Caution:</strong> Rain expected around 2:30 PM. Spray systemic fungicides/insecticides
            before 9:00 AM to allow 3-hour rainfast drying period, or hold until Thursday morning.
          </p>
        </div>

        <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200 space-y-2">
          <div className="flex items-center gap-2 text-sky-800">
            <CloudSun className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-sm">Hay & Silage Harvesting</h3>
          </div>
          <p className="text-xs text-sky-900 leading-relaxed">
            <strong>Window Notice:</strong> Thursday through Friday will see uninterrupted sunshine—ideal
            for wilting pasture grass or compacting maize silage bunkers.
          </p>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900">
          7-Day Forecast for {selectedCounty}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecastDays.map((f, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl text-center space-y-1.5 border ${
                i === 0
                  ? 'bg-sky-50/70 border-sky-300 font-semibold'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="text-xs text-stone-700 font-bold">{f.day}</div>
              <div className="py-1">
                {f.icon === 'rain' ? (
                  <CloudRain className="w-6 h-6 mx-auto text-sky-600" />
                ) : f.icon === 'sun' ? (
                  <Sun className="w-6 h-6 mx-auto text-amber-500" />
                ) : (
                  <CloudSun className="w-6 h-6 mx-auto text-sky-500" />
                )}
              </div>
              <div className="text-sm font-bold text-stone-900">{f.temp}</div>
              <div className="text-[10px] text-stone-400">Low {f.low}</div>
              <div className="text-[10px] text-sky-700 font-medium">{f.rainChance} rain</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
