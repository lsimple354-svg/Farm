import React, { useState } from 'react';
import {
  Calculator,
  Sprout,
  Layers,
  FlaskConical,
  TrendingUp,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const CalculatorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seed' | 'fert' | 'dairy' | 'spray'>('seed');

  // Seed Calc State
  const [cropType, setCropType] = useState<'maize' | 'beans' | 'potatoes'>('maize');
  const [seedAcres, setSeedAcres] = useState<number>(3);

  // Fert Calc State
  const [fertAcres, setFertAcres] = useState<number>(2);
  const [useSubsidy, setUseSubsidy] = useState<boolean>(true);

  // Dairy Calc State
  const [dairyCows, setDairyCows] = useState<number>(4);
  const [avgMilkPerCow, setAvgMilkPerCow] = useState<number>(18);
  const [milkPriceKES, setMilkPriceKES] = useState<number>(45);
  const [dairyMealKgPerCow, setDairyMealKgPerCow] = useState<number>(4);

  // Spray Calc State
  const [sprayAcres, setSprayAcres] = useState<number>(1.5);
  const [knapsackSize, setKnapsackSize] = useState<number>(20); // 16L or 20L
  const [dosageMlPerTank, setDosageMlPerTank] = useState<number>(25);

  // Calculated values
  // Seed
  const seedRatePerAcre = cropType === 'maize' ? 10 : cropType === 'beans' ? 25 : 800; // kg
  const totalSeedKg = seedAcres * seedRatePerAcre;
  const plantPopulationPerAcre = cropType === 'maize' ? 21500 : cropType === 'beans' ? 55000 : 17500;

  // Fertilizer
  const basalBags = fertAcres * 1; // 50kg bags DAP
  const topdressBags = fertAcres * 1; // 50kg bags CAN
  const dapBagPrice = useSubsidy ? 2500 : 5800;
  const canBagPrice = useSubsidy ? 2500 : 4200;
  const totalFertCost = basalBags * dapBagPrice + topdressBags * canBagPrice;

  // Dairy Margin
  const totalDailyMilk = dairyCows * avgMilkPerCow;
  const dailyMilkRevenue = totalDailyMilk * milkPriceKES;
  const dailyDairyMealCost = dairyCows * dairyMealKgPerCow * 55; // KES 55/kg
  const roughageEstCost = dairyCows * 120; // KES 120/cow/day
  const dailyTotalFeedCost = dailyDairyMealCost + roughageEstCost;
  const dailyNetProfit = dailyMilkRevenue - dailyTotalFeedCost;

  // Spray Knapsack
  const litersPerAcre = 200; // standard water volume
  const totalWaterLiters = sprayAcres * litersPerAcre;
  const knapsackPumpsNeeded = Math.ceil(totalWaterLiters / knapsackSize);
  const totalChemicalMl = knapsackPumpsNeeded * dosageMlPerTank;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-purple-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Farm Input & Profitability Calculators
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Precision mathematical calculations for seed rates, fertilizer budgets, dairy margins, and sprayer tank mixing.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('seed')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'seed'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Seed Rate & Plant Population</span>
        </button>

        <button
          onClick={() => setActiveTab('fert')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'fert'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Fertilizer DAP / CAN Budget</span>
        </button>

        <button
          onClick={() => setActiveTab('dairy')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'dairy'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Dairy Feed & Milk Margin</span>
        </button>

        <button
          onClick={() => setActiveTab('spray')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'spray'
              ? 'bg-indigo-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Knapsack Spray Calibration</span>
        </button>
      </div>

      {/* Calculator Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        {activeTab === 'seed' && (
          <div className="space-y-6">
            <h2 className="text-base font-serif font-bold text-stone-900">
              Certified Seed Rate & Density Calculator
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Crop Type</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                >
                  <option value="maize">Maize (e.g. H6213, DK777, Duma 43)</option>
                  <option value="beans">Dry Beans (Rosecoco, Nyota, Chelalang)</option>
                  <option value="potatoes">Irish Potatoes (Shangi, Dutch Robjin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Planting Area (Acres)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={seedAcres}
                  onChange={(e) => setSeedAcres(parseFloat(e.target.value) || 1)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-emerald-800 font-medium">Total Seed Required</div>
                <div className="text-2xl font-serif font-bold text-stone-900">{totalSeedKg} kg</div>
                <div className="text-[11px] text-stone-500">
                  {cropType === 'maize'
                    ? `${Math.ceil(totalSeedKg / 2)} packets of 2kg`
                    : cropType === 'potatoes'
                    ? `${Math.ceil(totalSeedKg / 50)} bags of 50kg`
                    : `${totalSeedKg} kg`}
                </div>
              </div>

              <div>
                <div className="text-xs text-emerald-800 font-medium">Estimated Plant Population</div>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {(plantPopulationPerAcre * seedAcres).toLocaleString()} plants
                </div>
                <div className="text-[11px] text-stone-500">
                  ~{plantPopulationPerAcre.toLocaleString()} plants / acre
                </div>
              </div>

              <div>
                <div className="text-xs text-emerald-800 font-medium">Estimated Seed Cost</div>
                <div className="text-2xl font-serif font-bold text-emerald-800">
                  KES {(totalSeedKg * (cropType === 'maize' ? 240 : cropType === 'beans' ? 180 : 65)).toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-500">Based on KEPHIS certified prices</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fert' && (
          <div className="space-y-6">
            <h2 className="text-base font-serif font-bold text-stone-900">
              Fertilizer DAP & CAN Requirement Estimator
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Land Size (Acres)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={fertAcres}
                  onChange={(e) => setFertAcres(parseFloat(e.target.value) || 1)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="subsidy"
                  checked={useSubsidy}
                  onChange={(e) => setUseSubsidy(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="subsidy" className="text-xs font-semibold text-stone-800 cursor-pointer">
                  Use Kenya GoK Subsidized Rate (KES 2,500 / 50kg bag)
                </label>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-emerald-800 font-medium">Basal Planting DAP (50kg bags)</div>
                <div className="text-2xl font-serif font-bold text-stone-900">{basalBags} bags</div>
                <div className="text-[11px] text-stone-500">Apply at planting in furrow</div>
              </div>

              <div>
                <div className="text-xs text-emerald-800 font-medium">Topdressing CAN (50kg bags)</div>
                <div className="text-2xl font-serif font-bold text-stone-900">{topdressBags} bags</div>
                <div className="text-[11px] text-stone-500">Apply knee-high (split recommended)</div>
              </div>

              <div>
                <div className="text-xs text-emerald-800 font-medium">Total Fertilizer Investment</div>
                <div className="text-2xl font-serif font-bold text-emerald-800">
                  KES {totalFertCost.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-500">
                  {useSubsidy ? 'Saved KES ' + ((fertAcres * 5000) - totalFertCost).toLocaleString() + ' with subsidy' : 'Commercial retail rate'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dairy' && (
          <div className="space-y-6">
            <h2 className="text-base font-serif font-bold text-stone-900">
              Dairy Herd Feed Cost & Milk Margin Calculator
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Number of Lactating Cows</label>
                <input
                  type="number"
                  min="1"
                  value={dairyCows}
                  onChange={(e) => setDairyCows(parseInt(e.target.value) || 1)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Daily Liters / Cow</label>
                <input
                  type="number"
                  min="5"
                  value={avgMilkPerCow}
                  onChange={(e) => setAvgMilkPerCow(parseFloat(e.target.value) || 10)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Milk Sale Price (KES/L)</label>
                <input
                  type="number"
                  value={milkPriceKES}
                  onChange={(e) => setMilkPriceKES(parseFloat(e.target.value) || 45)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Dairy Meal (kg/cow/day)</label>
                <input
                  type="number"
                  step="0.5"
                  value={dairyMealKgPerCow}
                  onChange={(e) => setDairyMealKgPerCow(parseFloat(e.target.value) || 3)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-amber-800 font-medium">Daily Milk Yield & Revenue</div>
                <div className="text-2xl font-serif font-bold text-stone-900">{totalDailyMilk} Liters</div>
                <div className="text-sm font-semibold text-emerald-800">
                  KES {dailyMilkRevenue.toLocaleString()} / day
                </div>
              </div>

              <div>
                <div className="text-xs text-amber-800 font-medium">Estimated Daily Feed Cost</div>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  KES {dailyTotalFeedCost.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-500">Meal + Fodder & Mineral salt</div>
              </div>

              <div>
                <div className="text-xs text-amber-800 font-medium">Net Margin / Profit (Daily)</div>
                <div className="text-2xl font-serif font-bold text-emerald-800">
                  KES {dailyNetProfit.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-500">
                  Monthly: KES {(dailyNetProfit * 30).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spray' && (
          <div className="space-y-6">
            <h2 className="text-base font-serif font-bold text-stone-900">
              Knapsack Sprayer Mixing & Calibration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Spray Target Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={sprayAcres}
                  onChange={(e) => setSprayAcres(parseFloat(e.target.value) || 1)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Knapsack Tank Size</label>
                <select
                  value={knapsackSize}
                  onChange={(e) => setKnapsackSize(parseInt(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                >
                  <option value={16}>16 Liters Standard Knapsack</option>
                  <option value={20}>20 Liters Heavy Knapsack</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Chemical Dosage (ml per tank)</label>
                <input
                  type="number"
                  value={dosageMlPerTank}
                  onChange={(e) => setDosageMlPerTank(parseInt(e.target.value) || 20)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-indigo-800 font-medium">Total Spray Volume</div>
                <div className="text-2xl font-serif font-bold text-stone-900">{totalWaterLiters} Liters</div>
                <div className="text-[11px] text-stone-500">Based on 200L / acre standard</div>
              </div>

              <div>
                <div className="text-xs text-indigo-800 font-medium">Knapsack Refills Needed</div>
                <div className="text-2xl font-serif font-bold text-stone-900">{knapsackPumpsNeeded} Refills</div>
                <div className="text-[11px] text-stone-500">Tanks to fill and walk</div>
              </div>

              <div>
                <div className="text-xs text-indigo-800 font-medium">Total Chemical Required</div>
                <div className="text-2xl font-serif font-bold text-indigo-800">{totalChemicalMl} ml</div>
                <div className="text-[11px] text-stone-500">
                  {Math.ceil(totalChemicalMl / 250)} bottles of 250ml
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
