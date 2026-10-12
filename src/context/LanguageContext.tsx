import React, { createContext, useContext, useState } from 'react';
import type { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    hubTitle: 'AgriKnowledge Hub',
    tagline: 'Farmer-to-farmer knowledge, extension advisory & market intelligence',
    home: 'Home',
    community: 'Community Feed',
    events: 'Events & Field Days',
    profile: 'My Farm Profile',
    crops: 'Crops Guide',
    livestock: 'Livestock Care',
    soilWater: 'Soil & Irrigation',
    pests: 'Pest & Disease Doctor',
    weather: 'Agri-Weather Forecast',
    calculators: 'Farm Calculators',
    markets: 'Live Market Prices',
    suppliers: 'Agro-Dealers Directory',
    farmManager: 'Farm Log & Records',
    learning: 'Agri Academy',
    aiAssistant: 'Ask AI Daktari',
    expert: 'Talk to Agronomist',
    opportunities: 'Subsidies & Grants',
    farmBusiness: 'Agribusiness Hub',
    sustainable: 'Regenerative Farming',
    adminCms: 'Extension Officer CMS',
    about: 'About Hub',
    searchPlaceholder: 'Search crops, diseases, markets, livestock...',
    countySelector: 'Select County / Region',
    postQuestion: 'Share an update or ask a farm question...',
    verifiedAgronomist: 'Verified Agronomist',
    saveGuide: 'Bookmark Guide',
  },
  sw: {
    hubTitle: 'AgriKnowledge Hub',
    tagline: 'Ujuzi wa mkulima kwa mkulima, ushauri wa kitaalamu na bei za masoko',
    home: 'Mwanzo',
    community: 'Mtandao wa Wakulima',
    events: 'Makongamano & Siku za Nyanjani',
    profile: 'Wasifu wa Shamba Langu',
    crops: 'Mwongozo wa Mazao',
    livestock: 'Ufugaji wa Mifugo',
    soilWater: 'Udongo & Umwagiliaji',
    pests: 'Daktari wa Wadudu & Magonjwa',
    weather: 'Hali ya Hewa ya Kilimo',
    calculators: 'Vikokotozi vya Shamba',
    markets: 'Bei za Masoko Leo',
    suppliers: 'Wauzaji Pembejeo',
    farmManager: 'Kumbukumbu za Shamba',
    learning: 'Chuo cha Kilimo',
    aiAssistant: 'Uliza AI Daktari wa Shamba',
    expert: 'Ongea na Mtaalamu',
    opportunities: 'Ruzuku & Fursa za Mkopo',
    farmBusiness: 'Biashara ya Kilimo',
    sustainable: 'Kilimo Hifadhi Asilia',
    adminCms: 'Mfumo wa Afisa Ugani',
    about: 'Kuhusu Hub',
    searchPlaceholder: 'Tafuta mazao, magonjwa, masoko, mifugo...',
    countySelector: 'Chagua Kaunti / Eneo',
    postQuestion: 'Shiriki taarifa au uliza swali kuhusu shamba...',
    verifiedAgronomist: 'Mtaalamu wa Kilimo Aliyethibitishwa',
    saveGuide: 'Hifadhi Mwongozo',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, defaultText?: string): string => {
    return translations[language][key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
