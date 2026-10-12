import React, { useState } from 'react';
import {
  Compass,
  PlayCircle,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Download,
  Sparkles,
} from 'lucide-react';

export const LearningPage: React.FC = () => {
  const [modules, setModules] = useState([
    {
      id: 'm-1',
      title: 'Commercial Silage Preservation & Pit Compaction',
      instructor: 'Dr. Joseph Cheruiyot (KDB / KALRO)',
      duration: '45 mins • 4 Lessons',
      category: 'Dairy Cattle',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
      description: 'Master the 32% Dry Matter harvesting window, molasses fermentation dilution, and airtight hermetic sealing techniques.',
    },
    {
      id: 'm-2',
      title: 'Hass Avocado Export Protocol & GlobalGAP Certification',
      instructor: 'Agnes Muriuki (Horticultural Crops Directorate)',
      duration: '60 mins • 5 Lessons',
      category: 'Horticulture',
      progress: 60,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
      description: 'Step-by-step guidance on pesticide spray records, Maximum Residue Limits (MRL), fruit fly trapping, and export packhouse audits.',
    },
    {
      id: 'm-3',
      title: 'Drip Fertigation & Solar Water Optimization',
      instructor: 'Eng. Peter Kimani (Water & Irrigation Institute)',
      duration: '35 mins • 3 Lessons',
      category: 'Soil & Water',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      description: 'Calculate emitter flow uniformity, filter maintenance, and water-soluble NPK/Calcium nitrate tank mixtures.',
    },
    {
      id: 'm-4',
      title: 'Push-Pull Technology: Climate-Resilient Stemborer & Striga Control',
      instructor: 'Prof. Zeyaur Khan (icipe)',
      duration: '50 mins • 4 Lessons',
      category: 'Sustainable Agronomy',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
      description: 'How intercropping Greenleaf Desmodium with maize traps moth larvae and releases suicidal root exudates against Striga weed.',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-700" />
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Agri Academy & Farmer Masterclasses
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Certified Good Agricultural Practices (GAP) training courses developed with icipe, KALRO, and Kenya Dairy Board.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>1 Certificate Earned</span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:border-emerald-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative overflow-hidden">
                <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {m.category}
                </span>
                {m.progress === 100 && (
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{m.duration}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-emerald-800 font-medium">Instructor: {m.instructor}</p>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">{m.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-3">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[11px] text-stone-500 mb-1">
                  <span>Course Progress</span>
                  <span className="font-bold text-stone-900">{m.progress}%</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                {m.progress === 100 ? (
                  <button
                    onClick={() => alert(`Downloading Certificate of Completion for "${m.title}"`)}
                    className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download GAP Certificate (PDF)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setModules((prev) =>
                        prev.map((item) =>
                          item.id === m.id
                            ? { ...item, progress: Math.min(100, item.progress + 25) }
                            : item
                        )
                      );
                    }}
                    className="w-full py-2 rounded-xl bg-[#183D29] hover:bg-[#112a1c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{m.progress > 0 ? 'Resume Course Lesson' : 'Start Free Course'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
