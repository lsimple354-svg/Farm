import React, { useState } from 'react';
import {
  TrendingUp,
  Tag,
  CheckCircle2,
  ExternalLink,
  Phone,
  FileText,
  DollarSign,
  Users,
} from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subsidy' | 'grants' | 'credit' | 'contracts'>('subsidy');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Agricultural Subsidies, Grants & Off-Taker Contracts
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Access Government of Kenya fertilizer e-vouchers, matching youth grants, and guaranteed off-take contracts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('subsidy')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'subsidy'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Fertilizer E-Voucher Subsidy (KES 2,500)
        </button>

        <button
          onClick={() => setActiveTab('grants')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'grants'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Youth & Women Agri-Grants
        </button>

        <button
          onClick={() => setActiveTab('credit')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'credit'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          AFC Low-Interest Ag-Loans
        </button>

        <button
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'contracts'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          Guaranteed Buyer Off-Takers
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'subsidy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Active GoK Program 2026
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 mt-2">
                Government Subsidized Fertilizer Program (NCPB / KNTC)
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-serif font-black text-emerald-800">KES 2,500</span>
              <p className="text-[11px] text-stone-500">Per 50kg bag (DAP / CAN / NPK)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-900">Step 1: Farmer Registration</span>
              <p className="text-xs text-stone-700">
                Register with your County Assistant Chief or Agricultural Extension Officer. Provide your National ID and land parcel number/acreage.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-900">Step 2: Check E-Voucher via USSD</span>
              <p className="text-xs text-stone-700">
                Dial <strong>*288#</strong> on your Safaricom or Airtel phone line to verify your fertilizer allocation quota and token message.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-emerald-900">Step 3: Depot Collection</span>
              <p className="text-xs text-stone-700">
                Present your National ID and SMS token at your nearest NCPB depot or participating registered agro-dealer stockist.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-700">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Ministry of Agriculture Support Helpline: <strong>0800 720 021</strong> (Toll Free)</span>
            </div>
            <button
              onClick={() => alert('Dial *288# on your mobile phone to check subsidized quota!')}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
            >
              Verify My Quota
            </button>
          </div>
        </div>
      )}

      {activeTab === 'grants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
              Matching Grant: KES 500,000 – 1.5M
            </span>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Agri-Biz Youth & Women Innovation Challenge
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Provides catalytic funding and technical incubation for agricultural enterprises run by youth under 35 and female farmers. Covers greenhouses, solar drying, and cold storage.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Deadline: 15 Nov 2026</span>
              <button
                onClick={() => alert('Application form packet requested. Check your email!')}
                className="px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-bold"
              >
                Apply Online
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
              Equipment Grant: 70% Subsidy
            </span>
            <h3 className="font-serif font-bold text-base text-stone-900">
              KCEP-CRAL Smallholder Irrigation Facility
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Matching funding for drip irrigation kits, solar water pumping sets, and dam liners for smallholders cultivating between 0.5 and 3 acres.
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Continuous Rolling Basis</span>
              <button
                onClick={() => alert('Brochure sent!')}
                className="px-3 py-1.5 rounded-xl bg-purple-800 text-white font-bold"
              >
                Request Guidelines
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credit' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-base text-stone-900">
            Agricultural Finance Corporation (AFC) Concessional Lending
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Borrow at single-digit agricultural interest rates (8% - 10% per annum) with repayment
            schedules structured to match harvest cycles rather than arbitrary monthly penalties.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <h4 className="font-bold text-stone-900">Crop Seasonal Credit</h4>
              <p className="text-stone-500 mt-1">Covers seeds, land preparation, fertilizer. Repayment upon harvest.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <h4 className="font-bold text-stone-900">Dairy Development Loan</h4>
              <p className="text-stone-500 mt-1">Finance purchase of in-calf heifers, silage bunkers & milking machines.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <h4 className="font-bold text-stone-900">Horticulture & Solar</h4>
              <p className="text-stone-500 mt-1">Long-term 3-5 year tenure for greenhouses, boreholes & orchards.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-base text-stone-900">
            Certified Off-Takers & Contract Farming Schemes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                EABL Sorghum
              </span>
              <h4 className="font-bold text-sm text-stone-900">White Sorghum (Gadam)</h4>
              <p className="text-xs text-stone-600">Guaranteed buyback @ KES 48/kg with free extension agronomist support.</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                New KCC & Brookside
              </span>
              <h4 className="font-bold text-sm text-stone-900">Chilled Bulk Milk</h4>
              <p className="text-xs text-stone-600">Minimum KES 45/Liter farmgate with bi-monthly automated bank payouts.</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Keitt & Kakuzi
              </span>
              <h4 className="font-bold text-sm text-stone-900">Hass Avocado Export</h4>
              <p className="text-xs text-stone-600">Direct packhouse sorting @ KES 110-140/kg for sizes 14 to 22.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
