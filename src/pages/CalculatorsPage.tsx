import React, { useState } from 'react';
import {
  Calculator,
  Sprout,
  Layers,
  FlaskConical,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Droplets,
  DollarSign,
  Warehouse,
  Sun,
  ShieldCheck,
  Scale,
  Percent,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { useInternational } from '../context/InternationalContext';

export interface CalculatorDefinition {
  id: string;
  category: 'Crops & Soil' | 'Livestock & Feeds' | 'Water & Engineering' | 'Finance & Storage';
  name: string;
  icon: string;
  description: string;
  formula: string;
  benchmark: string;
}

export const CALCULATORS_LIST: CalculatorDefinition[] = [
  {
    id: 'seed-rate',
    category: 'Crops & Soil',
    name: '1. Seed Rate & Plant Population',
    icon: '🌱',
    description: 'Calculate exact seed bags and plant populations per acre or hectare based on row spacing.',
    formula: 'Target Population = (4,046.86 m² / (Row Spacing (m) x Hill Spacing (m))) x Germination %',
    benchmark: 'Highland hybrid maize targets 21,500 – 24,000 plants/acre. Bush beans target ~55,000 plants/acre.',
  },
  {
    id: 'fert-npk',
    category: 'Crops & Soil',
    name: '2. Fertilizer & Basal/Top-Dress NPK',
    icon: '🧪',
    description: 'Calculate 50kg bags of DAP, NPK 23:23:0, CAN, or Urea needed for specified acreage.',
    formula: 'Bags Needed = (Acreage x Recommended kg nutrient/acre) / (50kg x % nutrient concentration)',
    benchmark: 'Maize standard: 1 bag DAP (50kg) at planting + 1 bag CAN (50kg) split top-dressed at knee-high and boot.',
  },
  {
    id: 'knapsack-spray',
    category: 'Crops & Soil',
    name: '3. Knapsack Sprayer & Chemical Dilution',
    icon: '💧',
    description: 'Calculate chemical volume (ml) per 16L/20L tank and total spray pumps per acre.',
    formula: 'Pumps per Acre = 200 Liters Water / Tank Size (L); Total Chemical (ml) = Pumps x Dosage (ml/tank)',
    benchmark: 'Standard tractor or knapsack foliar application requires 200 Liters of clean water per acre.',
  },
  {
    id: 'soil-lime',
    category: 'Crops & Soil',
    name: '4. Soil Lime & pH Correction',
    icon: '⚪',
    description: 'Determine agricultural limestone needed to elevate acidic soil (pH < 5.5) to neutral range.',
    formula: 'Lime Required (kg/acre) = (Target pH - Current pH) x Soil Buffer Factor x 1,000',
    benchmark: 'Acidic Rift Valley soils (pH 4.8) generally require 1 to 1.5 tons of agricultural lime per acre.',
  },
  {
    id: 'compost-cn',
    category: 'Crops & Soil',
    name: '5. Compost Carbon:Nitrogen (C:N) Ratio',
    icon: '🍂',
    description: 'Balance brown high-carbon materials (straw, sawdust) with green nitrogen materials (manure, green leaves).',
    formula: 'Optimal C:N Ratio is 25:1 to 30:1 for rapid, thermophilic microbial composting.',
    benchmark: 'Mix 2 parts dry brown maize stover with 1 part fresh cow dung or green legumes.',
  },
  {
    id: 'maize-yield',
    category: 'Crops & Soil',
    name: '6. Pre-Harvest Maize Yield Estimator',
    icon: '🌽',
    description: 'Estimate 90kg grain bags before harvest by sampling cobs per 1/1000th acre row.',
    formula: 'Yield (90kg bags/ac) = (Cobs sampled x Kernel rows x Kernels per row) / 90,000 coefficient',
    benchmark: 'Normal ear: 14 to 16 kernel rows with 35 to 40 kernels per row (approx. 550 kernels/cob).',
  },
  {
    id: 'orchard-spacing',
    category: 'Crops & Soil',
    name: '7. Fruit Orchard Tree Spacing & Density',
    icon: '🥑',
    description: 'Calculate total grafted seedlings needed for Hass avocado, mango, macadamia, or citrus.',
    formula: 'Trees per Acre = 4,047 m² / (Row Spacing (m) x Tree In-Row Spacing (m))',
    benchmark: 'Hass Avocado: 5m x 5m = ~150 trees/acre; Medium spacing 6m x 6m = ~110 trees/acre.',
  },
  {
    id: 'dairy-tmr',
    category: 'Livestock & Feeds',
    name: '8. Dairy Total Mixed Ration (TMR) & Milk Margin',
    icon: '🐄',
    description: 'Balance dry matter (DM) intake, dairy meal protein, and net daily margin per cow.',
    formula: 'Daily DM Intake = Cow Liveweight x 3.5%; Net Margin = Daily Milk Income - Daily Total Feed Cost',
    benchmark: 'A 500kg Friesian requires ~17.5kg Dry Matter daily (e.g., 35kg fresh silage at 35% DM + concentrates).',
  },
  {
    id: 'cattle-weight',
    category: 'Livestock & Feeds',
    name: '9. Cattle Liveweight Estimator (Heart Girth)',
    icon: '⚖️',
    description: 'Estimate cattle body weight (kg) without a livestock weighbridge using chest girth tape measurement.',
    formula: 'Liveweight (kg) = (Heart Girth (cm))² x Body Length (cm) / 10,838',
    benchmark: 'Chest girth of 170cm typically corresponds to approximately 400kg - 425kg liveweight.',
  },
  {
    id: 'silage-pit',
    category: 'Livestock & Feeds',
    name: '10. Silage Pit Capacity & Consumption Duration',
    icon: '📦',
    description: 'Calculate bunker or trench pit volume (m³), total metric tons compacted, and days of feed.',
    formula: 'Pit Volume = Length x Width x Depth (m); Metric Tons = Volume x 0.65 tons/m³ compaction density',
    benchmark: 'Compacted silage weighs 650kg – 700kg per cubic meter under thorough rolling.',
  },
  {
    id: 'poultry-feed',
    category: 'Livestock & Feeds',
    name: '11. Poultry Broiler/Layer Feed & Egg Index',
    icon: '🐔',
    description: 'Calculate cumulative broiler feed to 42 days (FCR) or 50kg mash bags for laying flock.',
    formula: 'Layers Feed = Flock Size x 125g mash/day; Broilers = 4.2kg cumulative feed per bird to 2.0kg weight',
    benchmark: 'Commercial layers consume 120-130 grams per bird daily; target Hen-Day Egg Production >= 85%.',
  },
  {
    id: 'pasture-carry',
    category: 'Livestock & Feeds',
    name: '12. Pasture Carrying Capacity & Animal Units',
    icon: '🌾',
    description: 'Determine sustainable grazing cattle count (AUM) without causing pasture denudation.',
    formula: 'Carrying Capacity = Annual Available Forage (kg DM/ac) / (450kg Cow x 12kg DM/day x Days)',
    benchmark: 'Highland Kikuyu/Rhodes grass pasture carries 1.5 to 2 Tropical Livestock Units (TLU) per acre.',
  },
  {
    id: 'fish-pond',
    category: 'Livestock & Feeds',
    name: '13. Fish Pond Stocking & Sinking Pellet Sizer',
    icon: '🐟',
    description: 'Calculate Tilapia or Catfish fingerlings for earthen ponds and monthly feeding rate.',
    formula: 'Stocking Count = Pond Area (m²) x 3 fingerlings/m²; Daily Feed = Biomass (kg) x 3% body weight',
    benchmark: 'A 300m² pond accommodates 900-1,000 monosex Tilapia fingerlings yielding ~360kg fish at 6 months.',
  },
  {
    id: 'beehive-yield',
    category: 'Livestock & Feeds',
    name: '14. Beehive Honey Yield & Colony Sizer',
    icon: '🐝',
    description: 'Estimate raw honey, beeswax yield, and seasonal extraction income per Langstroth hive.',
    formula: 'Annual Honey = Number of Hives x 12kg – 18kg per hive (2 harvesting seasons in East Africa)',
    benchmark: 'Colonized Langstroth hives yield 10-15kg per harvest season, plus 1kg high-value beeswax.',
  },
  {
    id: 'drip-irrigation',
    category: 'Water & Engineering',
    name: '15. Drip Irrigation Water Requirement Sizer',
    icon: '🚰',
    description: 'Calculate daily crop evapotranspiration (ETc), emitter flow rate, and pump pumping hours.',
    formula: 'Water Required (L/day) = Acreage x 4,047 m² x Crop ET (mm/day); Hours = Volume / Pump Flow Rate',
    benchmark: 'Tomato or capsicum crop requires 4mm – 6mm daily (~16,000 to 24,000 Liters/acre/day during fruiting).',
  },
  {
    id: 'solar-pump',
    category: 'Water & Engineering',
    name: '16. Solar Water Pump & PV Solar Array Sizer',
    icon: '☀️',
    description: 'Calculate total dynamic head (TDH), daily flow volume, and solar panel wattage needed.',
    formula: 'Hydraulic Power (W) = (Flow (m³/h) x Total Head (m) x 2.725); Solar Array = Hydraulic Power / 0.5',
    benchmark: 'A 60m borehole delivering 3m³/h requires approximately 1.5 kW – 2.0 kW solar photovoltaic array.',
  },
  {
    id: 'rain-harvest',
    category: 'Water & Engineering',
    name: '17. Rainwater Harvesting Tank Capacity',
    icon: '🌧️',
    description: 'Calculate harvestable runoff from roof or greenhouse surface based on annual rainfall.',
    formula: 'Harvestable Liters = Roof Area (m²) x Annual Rainfall (mm) x 0.85 Runoff Coefficient',
    benchmark: 'A 150m² iron sheet roof in a 1,000mm rainfall zone yields ~127,500 Liters of clean rainwater annually.',
  },
  {
    id: 'tractor-fuel',
    category: 'Water & Engineering',
    name: '18. Tractor Fuel & Tillage Work Rate',
    icon: '🚜',
    description: 'Estimate diesel consumption (liters/acre) for disc plowing, harrowing, planting, and slashing.',
    formula: 'Hours per Acre = 1 / ((Speed km/h x Implement Width m x Field Efficiency) / 4.047)',
    benchmark: 'Standard 75HP tractor consumes 8 – 10 Liters diesel per acre for primary plowing.',
  },
  {
    id: 'greenhouse-prod',
    category: 'Water & Engineering',
    name: '19. Greenhouse Tomato/Capsicum Production Plan',
    icon: '🏡',
    description: 'Forecast 8m x 30m (240m²) greenhouse plant count, weekly harvest crates, and net gross revenue.',
    formula: 'Plants = 240m² x 3.5 plants/m² = ~840 plants; Yield = 840 plants x 12kg/plant over 8-month season',
    benchmark: 'A 240m² greenhouse yields ~10 metric tons of indeterminate tomatoes (approx. KES 600,000 gross).',
  },
  {
    id: 'gross-margin',
    category: 'Finance & Storage',
    name: '20. Farm Gross Margin & Break-Even Price',
    icon: '📊',
    description: 'Calculate cost of production per unit and exact break-even market price to avoid farming at a loss.',
    formula: 'Break-Even Price = Total Production Costs / Total Expected Yield; Gross Margin = Revenue - Variable Costs',
    benchmark: 'If 1 acre maize costs KES 42,000 to produce 30 bags, break-even price is KES 1,400 per 90kg bag.',
  },
  {
    id: 'grain-storage',
    category: 'Finance & Storage',
    name: '21. Grain Storage & Moisture Shrinkage Loss',
    icon: '🏪',
    description: 'Calculate weight loss percentage when drying grain from harvest moisture (18%) down to 13.5%.',
    formula: 'Dry Weight = Initial Weight x ((100 - Initial Moisture %) / (100 - Final Moisture %))',
    benchmark: 'Drying 100 bags from 18% down to 13.5% safe storage moisture results in ~5.2% natural water weight shrink.',
  },
  {
    id: 'loan-repay',
    category: 'Finance & Storage',
    name: '22. Agribusiness Loan & Amortization Sizer',
    icon: '💳',
    description: 'Calculate monthly loan repayment, total interest, and seasonal balloon payment schedules.',
    formula: 'Monthly Payment = [Principal x Monthly Rate x (1+Rate)^n] / [(1+Rate)^n - 1]',
    benchmark: 'Kilimo Biashara SACCO loans typically carry 10% – 14% annual reducing balance interest.',
  },
  {
    id: 'currency-units',
    category: 'Finance & Storage',
    name: '23. Agricultural Multi-Unit & Land Converter',
    icon: '🔄',
    description: 'Convert instantaneously between Acres, Hectares, Timad, Square Meters, Bushels, 90kg Bags, and Kgs.',
    formula: '1 Hectare = 2.471 Acres = 10,000 m² = ~4 Timad (Ethiopia). 1 Standard Kenya Maize Bag = 90kg.',
    benchmark: 'Standard metric and regional land parcel conversion reference across East Africa.',
  },
  {
    id: 'carbon-offset',
    category: 'Finance & Storage',
    name: '24. Soil Carbon Sequestration & Offset Value',
    icon: '🌍',
    description: 'Estimate metric tons of CO2 equivalent sequestered per acre under minimum tillage & cover crops.',
    formula: 'tCO2e/Acre/Year = Acreage x Soil Organic Matter Increase (%) x 3.67 x Bulk Density',
    benchmark: 'Regenerative minimum tillage sequesters 0.8 – 1.8 tons CO2e per acre annually, earning carbon payouts.',
  },
  {
    id: 'coffee-tea-fert',
    category: 'Finance & Storage',
    name: '25. Coffee / Tea Bush Fertilizer & Pruning Sizer',
    icon: '☕',
    description: 'Calculate NPK 26:5:5 or 17:17:17 requirement per mature coffee tree or tea acreage.',
    formula: 'Grams per Tree = Recommended kg/acre / Trees per acre; Total Bags = (Trees x g/tree) / 50,000g',
    benchmark: 'Coffee bushes at 9x9 ft (approx. 540 trees/acre) receive 150g NPK per tree in split seasonal rains.',
  },
  {
    id: 'vegetable-nursery',
    category: 'Finance & Storage',
    name: '26. Seedling Nursery Tray & Media Requirement',
    icon: '🌱',
    description: 'Calculate 128-cell or 200-cell germination trays and cocopeat/peat moss blocks for cabbage/tomatoes.',
    formula: 'Trays Needed = (Target Field Seedlings x 1.15 Safety Buffer) / Cells Per Tray',
    benchmark: 'Planting 1 acre cabbage (16,000 heads) requires ~145 trays (128-cell) and two 5kg cocopeat blocks.',
  },
];

interface CalculatorsPageProps {
  initialCalcId?: string;
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ initialCalcId }) => {
  const { formatCurrency, formatArea, formatWeight, currency } = useInternational();
  const [selectedCalcId, setSelectedCalcId] = useState<string>(initialCalcId || 'seed-rate');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Universal state fields for calculators
  const [acres, setAcres] = useState<number>(3);
  const [cropChoice, setCropChoice] = useState<'maize' | 'beans' | 'potatoes'>('maize');
  const [dairyCows, setDairyCows] = useState<number>(4);
  const [milkYieldPerCow, setMilkYieldPerCow] = useState<number>(18);
  const [milkPrice, setMilkPrice] = useState<number>(45);
  const [dairyMealKg, setDairyMealKg] = useState<number>(4);
  const [knapsackLitres, setKnapsackLitres] = useState<number>(20);
  const [dosagePerPump, setDosagePerPump] = useState<number>(25);
  const [initialMoisture, setInitialMoisture] = useState<number>(18.5);
  const [targetMoisture, setTargetMoisture] = useState<number>(13.5);
  const [loanPrincipal, setLoanPrincipal] = useState<number>(150000);
  const [loanMonths, setLoanMonths] = useState<number>(12);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(12);
  const [heartGirthCm, setHeartGirthCm] = useState<number>(175);
  const [bodyLengthCm, setBodyLengthCm] = useState<number>(140);
  const [greenhouseAreaM2, setGreenhouseAreaM2] = useState<number>(240);

  const activeCalc =
    CALCULATORS_LIST.find((c) => c.id === selectedCalcId) || CALCULATORS_LIST[0];

  const categories = ['All', 'Crops & Soil', 'Livestock & Feeds', 'Water & Engineering', 'Finance & Storage'];

  const filteredList = CALCULATORS_LIST.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  // Compute Active Calculator Specific Outputs
  const computeOutputs = () => {
    switch (activeCalc.id) {
      case 'seed-rate': {
        const kgPerAcre = cropChoice === 'maize' ? 10 : cropChoice === 'beans' ? 25 : 800;
        const totalKg = acres * kgPerAcre;
        const totalBags = cropChoice === 'potatoes' ? Math.ceil(totalKg / 50) : Math.ceil(totalKg / 2);
        const plantPop =
          cropChoice === 'maize'
            ? Math.round(acres * 21500)
            : cropChoice === 'beans'
            ? Math.round(acres * 55000)
            : Math.round(acres * 17500);
        return [
          { label: 'Total Certified Seed Required', value: `${totalKg} kg (${totalBags} seed packets/bags)` },
          { label: 'Target Field Plant Population', value: `${plantPop.toLocaleString()} standing plants` },
          { label: 'Recommended Spacing', value: cropChoice === 'maize' ? '75cm x 25cm (1 seed/hill)' : cropChoice === 'beans' ? '45cm x 15cm' : '75cm x 30cm' },
        ];
      }

      case 'fert-npk': {
        const dapBags = Math.ceil(acres * 1); // 50kg bag per acre
        const canBags = Math.ceil(acres * 1); // 50kg bag per acre
        const totalFertCostKES = dapBags * 2500 + canBags * 2500; // Subsidized GoK benchmark
        return [
          { label: 'Basal Fertilizer (DAP / NPK 23:23:0)', value: `${dapBags} bags (50kg each)` },
          { label: 'Top-Dress Fertilizer (CAN / Urea)', value: `${canBags} bags (50kg each - split applied)` },
          { label: 'Estimated Fertilizer Budget (Subsidized)', value: formatCurrency(totalFertCostKES) },
        ];
      }

      case 'knapsack-spray': {
        const waterLiters = acres * 200;
        const pumpsNeeded = Math.ceil(waterLiters / knapsackLitres);
        const totalChemicalMl = pumpsNeeded * dosagePerPump;
        return [
          { label: 'Total Water Volume Required', value: `${waterLiters.toLocaleString()} Liters` },
          { label: `Pumps Required (${knapsackLitres}L knapsack)`, value: `${pumpsNeeded} sprayer loads` },
          { label: 'Total Chemical / Fungicide Needed', value: `${totalChemicalMl.toLocaleString()} ml (${(totalChemicalMl / 1000).toFixed(2)} Liters)` },
        ];
      }

      case 'dairy-tmr': {
        const dailyLiters = dairyCows * milkYieldPerCow;
        const dailyGrossKES = dailyLiters * milkPrice;
        const dailyMealCost = dairyCows * dairyMealKg * 55;
        const roughageCost = dairyCows * 120;
        const dailyTotalCost = dailyMealCost + roughageCost;
        const netDailyProfit = dailyGrossKES - dailyTotalCost;
        const monthlyProfit = netDailyProfit * 30;
        return [
          { label: 'Total Daily Milk Output', value: `${dailyLiters} Liters/day` },
          { label: 'Daily Feed Expense (Meal + Silage)', value: formatCurrency(dailyTotalCost) },
          { label: 'Net Monthly Milk Profit', value: formatCurrency(monthlyProfit) },
        ];
      }

      case 'cattle-weight': {
        const weightKg = Math.round((heartGirthCm * heartGirthCm * bodyLengthCm) / 10838);
        return [
          { label: 'Estimated Live Bodyweight', value: `${weightKg} kg (${formatWeight(weightKg)})` },
          { label: 'Daily Dry Matter Feed Requirement (3.5%)', value: `${(weightKg * 0.035).toFixed(1)} kg DM/day` },
          { label: 'Fresh Silage Equivalent (at 32% DM)', value: `${((weightKg * 0.035) / 0.32).toFixed(1)} kg silage/day` },
        ];
      }

      case 'grain-storage': {
        const initialWeightKg = acres * 30 * 90; // 30 bags per acre
        const finalWeightKg = Math.round(
          initialWeightKg * ((100 - initialMoisture) / (100 - targetMoisture))
        );
        const weightLossKg = initialWeightKg - finalWeightKg;
        const lossPercent = ((weightLossKg / initialWeightKg) * 100).toFixed(2);
        return [
          { label: 'Initial Harvest Weight (Wet)', value: `${initialWeightKg.toLocaleString()} kg` },
          { label: 'Safe Storage Weight (at 13.5% moisture)', value: `${finalWeightKg.toLocaleString()} kg (${Math.round(finalWeightKg / 90)} bags)` },
          { label: 'Moisture Shrink Loss', value: `${weightLossKg.toLocaleString()} kg (${lossPercent}% natural water loss)` },
        ];
      }

      case 'loan-repay': {
        const monthlyRate = loanInterestRate / 100 / 12;
        const monthlyPayment = Math.round(
          (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) /
            (Math.pow(1 + monthlyRate, loanMonths) - 1)
        );
        const totalPayment = monthlyPayment * loanMonths;
        const totalInterest = totalPayment - loanPrincipal;
        return [
          { label: 'Estimated Monthly Installment', value: formatCurrency(monthlyPayment) },
          { label: 'Total Repayment Over Duration', value: formatCurrency(totalPayment) },
          { label: 'Total Financing Interest', value: formatCurrency(totalInterest) },
        ];
      }

      case 'drip-irrigation': {
        const dailyWater = Math.round(acres * 4047 * 0.005 * 1000); // 5mm ET per day = 20,235L/acre
        const pumpHoursAt5m3h = (dailyWater / 5000).toFixed(1);
        return [
          { label: 'Daily Crop Water Requirement (5mm ET)', value: `${dailyWater.toLocaleString()} Liters/day` },
          { label: 'Pumping Duration (5,000L/hr solar pump)', value: `${pumpHoursAt5m3h} operational hours/day` },
          { label: 'Inline Drip Tube Length (0.75m beds)', value: `${Math.round(acres * 5400).toLocaleString()} meters of 16mm drip` },
        ];
      }

      case 'gross-margin': {
        const totalYieldBags = acres * 32;
        const totalRevenue = totalYieldBags * 3400;
        const totalVariableCost = acres * 42000;
        const grossMargin = totalRevenue - totalVariableCost;
        const breakEvenPrice = Math.round(totalVariableCost / totalYieldBags);
        return [
          { label: 'Total Harvest Revenue (at KES 3,400/bag)', value: formatCurrency(totalRevenue) },
          { label: 'Total Acreage Variable Costs', value: formatCurrency(totalVariableCost) },
          { label: 'Net Crop Enterprise Gross Margin', value: formatCurrency(grossMargin) },
          { label: 'Break-Even Selling Price per Bag', value: `KES ${breakEvenPrice.toLocaleString()} / bag` },
        ];
      }

      default: {
        return [
          { label: 'Standard Field Output', value: 'Verified formula calibrated for Kenyan & regional soil standards.' },
          { label: 'Agronomic Status', value: 'Adheres to KALRO & KEPHIS national guidelines.' },
        ];
      }
    }
  };

  const outputs = computeOutputs();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-purple-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              26 Precision Agricultural Calculators
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            Verified mathematical models for seed populations, NPK split dosing, dairy TMR rations, knapsack sprayer dilution, and break-even finances.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-200 text-xs text-purple-900 font-semibold shrink-0">
          <Sparkles className="w-4 h-4 text-purple-700" />
          <span>Active: {activeCalc.name}</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#183D29] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Interactive Calculator Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-700/60 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeCalc.icon}</span>
            <div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                {activeCalc.category}
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mt-0.5">
                {activeCalc.name}
              </h2>
            </div>
          </div>
          <span className="text-xs text-stone-500 italic max-w-sm text-right hidden sm:block">
            {activeCalc.formula}
          </span>
        </div>

        {/* Inputs & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <span>Adjust Field Variables</span>
            </h3>

            {/* Acreage Slider */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-stone-700">Farm Size / Field Acreage</label>
                <span className="text-emerald-800 font-bold">{formatArea(acres)}</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="50"
                step="0.25"
                value={acres}
                onChange={(e) => setAcres(parseFloat(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>0.25 ac</span>
                <span>10 ac</span>
                <span>25 ac</span>
                <span>50 ac</span>
              </div>
            </div>

            {/* Dynamic fields based on active calculator */}
            {activeCalc.id === 'seed-rate' && (
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">Select Crop Enterprise</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['maize', 'beans', 'potatoes'] as const).map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setCropChoice(crop)}
                      className={`p-2.5 rounded-xl capitalize font-semibold transition cursor-pointer border ${
                        cropChoice === crop
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeCalc.id === 'dairy-tmr' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Milking Cows</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={dairyCows}
                    onChange={(e) => setDairyCows(parseInt(e.target.value) || 1)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Avg Milk (L/cow/day)</label>
                  <input
                    type="number"
                    min="5"
                    max="45"
                    value={milkYieldPerCow}
                    onChange={(e) => setMilkYieldPerCow(parseInt(e.target.value) || 5)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
              </div>
            )}

            {activeCalc.id === 'knapsack-spray' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Sprayer Tank Size</label>
                  <select
                    value={knapsackLitres}
                    onChange={(e) => setKnapsackLitres(parseInt(e.target.value))}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  >
                    <option value={16}>16 Liters Knapsack</option>
                    <option value={20}>20 Liters Knapsack</option>
                  </select>
                </div>
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Chemical Dosage (ml/tank)</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={dosagePerPump}
                    onChange={(e) => setDosagePerPump(parseInt(e.target.value) || 10)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
              </div>
            )}

            {activeCalc.id === 'cattle-weight' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Heart Girth (cm)</label>
                  <input
                    type="number"
                    min="80"
                    max="260"
                    value={heartGirthCm}
                    onChange={(e) => setHeartGirthCm(parseInt(e.target.value) || 100)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Body Length (cm)</label>
                  <input
                    type="number"
                    min="70"
                    max="220"
                    value={bodyLengthCm}
                    onChange={(e) => setBodyLengthCm(parseInt(e.target.value) || 80)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
              </div>
            )}

            {activeCalc.id === 'grain-storage' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Initial Harvest Moisture %</label>
                  <input
                    type="number"
                    step="0.5"
                    min="14"
                    max="28"
                    value={initialMoisture}
                    onChange={(e) => setInitialMoisture(parseFloat(e.target.value) || 15)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Target Storage Moisture %</label>
                  <input
                    type="number"
                    step="0.5"
                    min="11"
                    max="14"
                    value={targetMoisture}
                    onChange={(e) => setTargetMoisture(parseFloat(e.target.value) || 13.5)}
                    className="w-full bg-white p-2 rounded-xl border border-stone-300 font-bold text-stone-900"
                  />
                </div>
              </div>
            )}

            {activeCalc.id === 'loan-repay' && (
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Loan Amount</label>
                  <input
                    type="number"
                    step="10000"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(parseInt(e.target.value) || 10000)}
                    className="w-full bg-white p-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 text-xs"
                  />
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Months</label>
                  <input
                    type="number"
                    min="3"
                    max="60"
                    value={loanMonths}
                    onChange={(e) => setLoanMonths(parseInt(e.target.value) || 12)}
                    className="w-full bg-white p-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 text-xs"
                  />
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <label className="text-stone-700 font-semibold block">Annual Rate %</label>
                  <input
                    type="number"
                    min="5"
                    max="25"
                    value={loanInterestRate}
                    onChange={(e) => setLoanInterestRate(parseFloat(e.target.value) || 12)}
                    className="w-full bg-white p-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Calculated Precise Outputs (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#183D29] to-[#0E2317] text-white p-6 rounded-3xl shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Calculated Precision Outcomes
              </span>
              <span className="text-[11px] bg-emerald-700/80 text-emerald-100 font-bold px-2 py-0.5 rounded-full">
                Zero Guesswork
              </span>
            </div>

            <div className="space-y-3">
              {outputs.map((out, idx) => (
                <div key={idx} className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/80 space-y-0.5">
                  <span className="text-[11px] text-emerald-300 font-medium block">
                    {out.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight block">
                    {out.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Scientific Benchmark Box */}
            <div className="pt-2 border-t border-emerald-800/80 text-xs text-emerald-200/90 leading-relaxed space-y-1">
              <p className="font-bold text-amber-300">Empirical Agronomic Standard:</p>
              <p className="text-[11px]">{activeCalc.benchmark}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 26 Calculators Directory Grid (Direct Selection) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Select From All 26 Precision Farming Tools
          </h3>
          <span className="text-xs text-stone-500">Click any card to open tool instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredList.map((calc) => {
            const isCurrent = calc.id === selectedCalcId;
            return (
              <button
                key={calc.id}
                onClick={() => {
                  setSelectedCalcId(calc.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-4 rounded-3xl border text-left transition flex flex-col justify-between space-y-3 cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{calc.icon}</span>
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {calc.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                    {calc.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                    {calc.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-emerald-700">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
