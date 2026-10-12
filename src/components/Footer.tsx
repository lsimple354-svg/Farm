import React, { useState } from 'react';
import { Sprout, Mail, ShieldCheck, CheckCircle2, Globe, Heart, Phone, HelpCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Page } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const { language, setLanguage } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-12 w-full overflow-x-hidden">
      {/* Compact Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand & Attribution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white shrink-0">
                <Sprout className="w-4 h-4 text-emerald-200" />
              </div>
              <span className="text-base font-bold text-white tracking-tight font-serif">AgriKnowledge</span>
              <span className="text-base font-bold text-emerald-500 font-serif">Hub</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              <strong>Trusted Agricultural Knowledge. Stronger Farming. Better Markets.</strong>
              <br />
              An international farming intelligence and social platform founded by{' '}
              <strong className="text-stone-200">Adams Kipkoech Kering</strong>.
            </p>
            <div className="pt-1">
              <PWAInstallButton variant="footer" />
            </div>
          </div>

          {/* Contact & Farmer Desk */}
          <div className="space-y-2.5 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Contact & Support</h3>
            <p className="text-stone-400">Headquarters: Eldoret, Kenya • Worldwide Network</p>
            <div className="flex items-center gap-2 text-stone-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href="mailto:advisory@agriknowledgehub.org" className="hover:text-emerald-400 transition">
                advisory@agriknowledgehub.org
              </a>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>0800 720 021 (Toll-Free Kenya)</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>East Africa & Global Agro-Alliances</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-2.5 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform Navigation</h3>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-emerald-400 transition cursor-pointer">
                  About & Founder Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('learning')} className="hover:text-emerald-400 transition cursor-pointer">
                  AgriAcademy (14 Curriculums)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('calculators')} className="hover:text-emerald-400 transition cursor-pointer">
                  26 Precision Calculators
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('community')} className="hover:text-emerald-400 transition cursor-pointer">
                  AgriFeed & Community Baraza
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('markets')} className="hover:text-emerald-400 transition cursor-pointer">
                  Wholesale AgriMarket
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('legal')} className="hover:text-emerald-400 transition cursor-pointer">
                  Kenya DPA 2019 & Terms of Use
                </button>
              </li>
            </ul>
          </div>

          {/* Seasonal Advisory Newsletter */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Agro-Weather Newsletter</h3>
            <p className="text-xs text-stone-400">
              Weekly seasonal planting forecasts, market price trends, and pest alerts.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Asante! Subscribed to seasonal updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}

            {/* Language Selector in Footer */}
            <div className="pt-1 flex items-center gap-2 text-xs text-stone-400">
              <span className="text-[11px]">Language:</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded cursor-pointer ${language === 'en' ? 'bg-emerald-800 text-white font-bold' : 'hover:text-white'}`}
              >
                English
              </button>
              <span>•</span>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-2 py-0.5 rounded cursor-pointer ${language === 'sw' ? 'bg-emerald-800 text-white font-bold' : 'hover:text-white'}`}
              >
                Kiswahili
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with attribution & legal links */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} AgriKnowledge Hub Worldwide • Founded & Developed by{' '}
            <strong className="text-stone-400">Adams Kipkoech Kering</strong>.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setCurrentPage('about')} className="hover:text-stone-300 cursor-pointer">
              About
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('legal')} className="hover:text-stone-300 cursor-pointer">
              Privacy Policy (ODPC)
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('legal')} className="hover:text-stone-300 cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('about')} className="hover:text-stone-300 cursor-pointer">
              Help Centre
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
