import React, { useState } from 'react';
import { Shield, FileText, Lock, AlertTriangle, CheckCircle, Scale, Building2, UserCheck, ArrowLeft } from 'lucide-react';
import { Page } from '../types';

interface LegalPageProps {
  setCurrentPage?: (page: Page) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'agronomy'>('privacy');

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm text-center space-y-4">
        {setCurrentPage && (
          <div className="flex justify-start">
            <button
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Farm Hub
            </button>
          </div>
        )}
        <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto shadow-sm">
          <Scale className="w-7 h-7 text-emerald-200" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Legal, Regulatory & Data Protection Framework
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          AgriKnowledge Hub operates in strict accordance with the laws of the Republic of Kenya, including the
          <strong> Kenya Data Protection Act 2019</strong>, the <strong>Pest Control Products Act (Cap 346)</strong>, and <strong>KEPHIS Seed Regulations</strong>.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection (Kenya DPA 2019)</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Use & Marketplace Rules</span>
          </button>
          <button
            onClick={() => setActiveTab('agronomy')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'agronomy'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Agronomic & Veterinary Disclaimer</span>
          </button>
        </div>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <h2 className="font-bold text-base text-stone-900">
                Compliance with Kenya Data Protection Act, 2019 (ODPC)
              </h2>
              <p className="text-xs text-stone-500">Office of the Data Protection Commissioner (ODPC Kenya) Standards</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-stone-900 text-sm">1. Data Controller & Principles of Processing</h3>
            <p>
              AgriKnowledge Hub, founded and operated by Adams Kipkoech Kering in Kenya, acts as a Data Controller and Data Processor for agricultural records, community questions, marketplace listings, and farm telemetry inputted by users. All data processing adheres to the core principles of Section 25 of the Data Protection Act:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
              <li><strong>Lawfulness, Fairness & Transparency:</strong> Farmer data is collected solely with express consent for farm management, personalized advisory, and market linkages.</li>
              <li><strong>Purpose Limitation:</strong> Crop yields, input purchase history, and county locations are never sold to predatory lenders, unauthorized brokers, or unsolicited third parties.</li>
              <li><strong>Data Minimization:</strong> Only essential information (such as county, enterprise type, and contact phone for market buyers) is requested.</li>
              <li><strong>Accuracy & Storage Limitation:</strong> Farmers maintain the right to rectify farm records or request full account deletion at any time.</li>
            </ul>

            <h3 className="font-semibold text-stone-900 text-sm pt-2">2. Farmer Rights under Kenyan Law</h3>
            <p>
              Under Sections 26 and 40 of the Act, registered farmers, agro-dealers, and visitors retain:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900">Right of Access (Section 26a)</span>
                <p className="text-xs text-stone-500 mt-1">Review all your saved farm records, calculator outputs, and forum discussions.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900">Right to Rectification (Section 40)</span>
                <p className="text-xs text-stone-500 mt-1">Update or correct inaccurate farm size, enterprise details, or market listings.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900">Right to Erasure ('Right to be Forgotten')</span>
                <p className="text-xs text-stone-500 mt-1">Permanently delete your profile and private farm budget ledger.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-900">Data Portability (Section 38)</span>
                <p className="text-xs text-stone-500 mt-1">Export your farm financial logs and spray schedules in accessible formats.</p>
              </div>
            </div>

            <h3 className="font-semibold text-stone-900 text-sm pt-2">3. Security & Telemetry Safeguards</h3>
            <p>
              We implement industry-standard encryption in transit (HTTPS / TLS 1.3) and secure browser local storage caching to protect offline PWA cache data stored on farmer mobile devices.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <h2 className="font-bold text-base text-stone-900">Terms of Use & Marketplace Trading Rules</h2>
              <p className="text-xs text-stone-500">Guidelines for farmers, agro-dealers, and extension officers</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-stone-900 text-sm">1. Acceptance of Terms</h3>
            <p>
              By accessing AgriKnowledge Hub via web browser or installed Progressive Web App (PWA), you agree to these Terms of Service. If you do not accept these terms, please do not use the application.
            </p>

            <h3 className="font-semibold text-stone-900 text-sm">2. Community Guidelines & Farmer Conduct</h3>
            <p>
              The AgriKnowledge Hub Farmer Discussion Forum is dedicated to peer education and constructive agro-solutions. The following behaviors are strictly prohibited:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600">
              <li>Posting counterfeit seed or unregistered chemical offers.</li>
              <li>Disseminating unverified home chemical formulations that pose human, livestock, or bee hazards.</li>
              <li>Abusive or defamatory comments directed toward fellow farmers, pastoralists, or county extension staff.</li>
            </ul>

            <h3 className="font-semibold text-stone-900 text-sm">3. Wholesale Marketplace & Direct Trade</h3>
            <p>
              Market prices listed on AgriKnowledge Hub are collected from wholesale centers (Marikiti, Eldoret, Kisumu Kibuye, Mombasa Kongowea). AgriKnowledge Hub facilitates transparency but does not act as escrow. Buyers and sellers are advised to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600">
              <li>Inspect grain moisture content (KEPHIS threshold ≤13.5% for maize) prior to final payment.</li>
              <li>Conduct transactions in person at verifiable farm gates or cooperative aggregation depots.</li>
              <li>Verify the identity and location of commercial aggregators before dispatching bulk produce.</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'agronomy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <h2 className="font-bold text-base text-stone-900">Agricultural & Veterinary Statutory Advisory Disclaimer</h2>
              <p className="text-xs text-stone-500">Pest Control Products Board (PCPB) & Kenya Veterinary Board (KVB) alignment</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs leading-relaxed">
              <strong>Mandatory Notice:</strong> All agronomic calculators, disease diagnostic guides, dosage estimations, and AI responses on AgriKnowledge Hub are curated for educational planning and generalized extension guidance. They do not substitute for on-site diagnostic testing or official agronomic inspection by certified field officers.
            </div>

            <h3 className="font-semibold text-stone-900 text-sm">1. Agrochemicals & Crop Protection</h3>
            <p>
              Chemical active ingredients, application dosages, and pre-harvest intervals (PHI) cited on AgriKnowledge Hub are referenced from published manuals by KALRO, KEPHIS, and PCPB. Always:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600">
              <li>Read the manufacturer product label and confirm active registration on the PCPB registry.</li>
              <li>Wear required Personal Protective Equipment (PPE) during handling, mixing, and spraying.</li>
              <li>Observe pre-harvest intervals strictly, especially for export and domestic fresh produce (capsicums, tomatoes, french beans).</li>
            </ul>

            <h3 className="font-semibold text-stone-900 text-sm">2. Veterinary & Livestock Health</h3>
            <p>
              Information regarding livestock symptoms (East Coast Fever, Mastitis, Newcastle Disease, FMD) is strictly educational. Administration of prescription veterinary antibiotics, vaccines, or invasive procedures must be supervised by a licensed veterinary surgeon registered with the Kenya Veterinary Board (KVB).
            </p>

            <h3 className="font-semibold text-stone-900 text-sm">3. Weather & Climate Projections</h3>
            <p>
              Weather information is integrated for seasonal advisory context. Long-range seasonal forecasts follow advisories issued by the Kenya Meteorological Department (KMD). AgriKnowledge Hub cannot be held liable for micro-climatic anomalies or rainfall timing shifts.
            </p>
          </div>
        </div>
      )}

      {/* Institutional Reference Footer */}
      <div className="bg-stone-900 text-stone-300 rounded-3xl p-6 sm:p-8 space-y-3 text-xs">
        <h4 className="font-bold text-white text-sm">National Agricultural Authorities Referenced:</h4>
        <p className="text-stone-400">
          Kenya Agricultural & Livestock Research Organization (KALRO) • Kenya Plant Health Inspectorate Service (KEPHIS) • Pest Control Products Board (PCPB) • Kenya Dairy Board (KDB) • Kenya Meteorological Department (KMD) • International Centre of Insect Physiology and Ecology (ICIPE).
        </p>
        <div className="pt-2 text-[11px] text-stone-500">
          AgriKnowledge Hub • Founded & Developed by Adams Kipkoech Kering • Republic of Kenya
        </div>
      </div>
    </div>
  );
};
