import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  Star,
  MapPin,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export const ExpertPage: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [consultModal, setConsultModal] = useState<string | null>(null);

  const experts = [
    {
      id: 'exp-1',
      name: 'Dr. Beatrice Wangari, PhD',
      title: 'Senior Highland Agronomist & Cereal Breeder',
      affiliation: 'KALRO Kitale Research Station',
      specialty: 'Crops',
      county: 'Trans Nzoia & Uasin Gishu',
      experienceYears: 16,
      rating: 4.9,
      reviewsCount: 124,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      expertise: ['Maize Hybrid Performance', 'Soil Acidification / Liming', 'Fall Armyworm IPM', 'Wheat Rust Resistance'],
      phone: '+254 722 411 200',
    },
    {
      id: 'exp-2',
      name: 'Dr. Kiprono Langat, BVM',
      title: 'Veterinary Surgeon & Dairy Nutrition Specialist',
      affiliation: 'Rift Valley Livestock Health Directorate',
      specialty: 'Livestock',
      county: 'Uasin Gishu & Nandi',
      experienceYears: 12,
      rating: 4.8,
      reviewsCount: 98,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
      expertise: ['Total Mixed Ration (TMR) Balancing', 'East Coast Fever (ECF) Vaccination', 'Subclinical Mastitis Elimination', 'Artificial Insemination (AI)'],
      phone: '+254 720 998 332',
    },
    {
      id: 'exp-3',
      name: 'Eunice Nyambura, MSc',
      title: 'Horticulture Agronomist & GlobalGAP Auditor',
      affiliation: 'Fresh Produce Exporters Association of Kenya',
      specialty: 'Horticulture',
      county: 'Kiambu & Nakuru',
      experienceYears: 9,
      rating: 4.9,
      reviewsCount: 76,
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
      expertise: ['Hass Avocado Tree Pruning', 'Greenhouse Tomato Tuta Absoluta', 'Export Maximum Residue Limits', 'Drip Fertigation Schedules'],
      phone: '+254 733 112 455',
    },
    {
      id: 'exp-4',
      name: 'Eng. Dennis Ouma',
      title: 'Irrigation & Agricultural Drainage Engineer',
      affiliation: 'National Irrigation Authority (NIA)',
      specialty: 'Soil & Water',
      county: 'Kisumu & Bungoma',
      experienceYears: 14,
      rating: 4.7,
      reviewsCount: 62,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      expertise: ['Solar Pump Head Loss Calculations', 'Dam Liner Hot-Wedge Welding', 'Gravity Drip Pressure Regulators', 'Soil Salinity Leaching'],
      phone: '+254 712 554 899',
    },
  ];

  const specialties = ['All', 'Crops', 'Livestock', 'Horticulture', 'Soil & Water'];

  const filtered = experts.filter(
    (e) => selectedSpecialty === 'All' || e.specialty === selectedSpecialty
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Certified Agronomists & Veterinary Surgeons
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Book on-farm diagnostic visits, soil report reviews, or phone consultations with verified government and institutional officers.
          </p>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSpecialty(s)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition ${
              selectedSpecialty === s
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-emerald-300 transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-base text-stone-900">{exp.name}</h3>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-medium">{exp.title}</p>
                  <p className="text-[11px] text-stone-400">{exp.affiliation}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <div className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Coverage: {exp.county}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{exp.rating} ({exp.reviewsCount})</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  Core Advisory Competencies:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.expertise.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200/60 font-medium"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <span className="text-xs text-stone-500">{exp.experienceYears} Years Exp.</span>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${exp.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>

                <button
                  onClick={() => setConsultModal(exp.name)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Consultation Modal */}
      {consultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in">
            <h3 className="font-serif font-bold text-base text-stone-900">
              Request Advisory Call with {consultModal}
            </h3>
            <p className="text-xs text-stone-600">
              A notification will be dispatched to the officer's field registry. They will contact
              you via phone / WhatsApp within 2 hours.
            </p>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Specific Issue</label>
              <textarea
                rows={3}
                placeholder="e.g. Need physical inspection of 4 acres yellowing maize or dairy cow mastitis check"
                className="w-full text-xs p-3 rounded-xl bg-stone-50 border border-stone-300"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConsultModal(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Consultation request dispatched successfully!');
                  setConsultModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
