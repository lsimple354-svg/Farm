import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CurrencyCode, RegionCountry, UnitSystem } from '../types';

interface InternationalContextType {
  country: RegionCountry;
  setCountry: (country: RegionCountry) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  units: UnitSystem;
  setUnits: (units: UnitSystem) => void;
  formatCurrency: (amountKES: number) => string;
  formatArea: (acres: number) => string;
  formatWeight: (kg: number) => string;
}

// Exchange rates relative to 1 KES
const KES_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  KES: 1,
  USD: 0.0077,
  EUR: 0.0071,
  GBP: 0.0061,
  NGN: 11.8,
  UGX: 28.5,
  TZS: 20.0,
  ZAR: 0.14,
};

const InternationalContext = createContext<InternationalContextType | undefined>(undefined);

export const InternationalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<RegionCountry>(() => {
    try {
      const saved = localStorage.getItem('agri_country');
      if (saved) return saved as RegionCountry;
    } catch {
      // ignore
    }
    return 'Kenya';
  });

  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('agri_currency');
      if (saved) return saved as CurrencyCode;
    } catch {
      // ignore
    }
    return 'KES';
  });

  const [units, setUnits] = useState<UnitSystem>(() => {
    try {
      const saved = localStorage.getItem('agri_units');
      if (saved) return saved as UnitSystem;
    } catch {
      // ignore
    }
    return 'metric';
  });

  useEffect(() => {
    try {
      localStorage.setItem('agri_country', country);
      localStorage.setItem('agri_currency', currency);
      localStorage.setItem('agri_units', units);
    } catch {
      // ignore
    }
  }, [country, currency, units]);

  const formatCurrency = (amountKES: number): string => {
    const rate = KES_EXCHANGE_RATES[currency] || 1;
    const converted = amountKES * rate;

    if (currency === 'KES') {
      return `KES ${Math.round(converted).toLocaleString()}`;
    }
    if (currency === 'USD') {
      return `$${converted.toFixed(2)}`;
    }
    if (currency === 'EUR') {
      return `€${converted.toFixed(2)}`;
    }
    if (currency === 'GBP') {
      return `£${converted.toFixed(2)}`;
    }
    return `${currency} ${Math.round(converted).toLocaleString()}`;
  };

  const formatArea = (acres: number): string => {
    if (units === 'metric') {
      const hectares = acres * 0.404686;
      return `${hectares.toFixed(1)} ha (${acres.toFixed(1)} ac)`;
    }
    return `${acres.toFixed(1)} acres`;
  };

  const formatWeight = (kg: number): string => {
    if (units === 'imperial') {
      const lbs = kg * 2.20462;
      return `${Math.round(lbs).toLocaleString()} lbs`;
    }
    return `${Math.round(kg).toLocaleString()} kg`;
  };

  return (
    <InternationalContext.Provider
      value={{
        country,
        setCountry,
        currency,
        setCurrency,
        units,
        setUnits,
        formatCurrency,
        formatArea,
        formatWeight,
      }}
    >
      {children}
    </InternationalContext.Provider>
  );
};

export const useInternational = (): InternationalContextType => {
  const context = useContext(InternationalContext);
  if (!context) {
    throw new Error('useInternational must be used within an InternationalProvider');
  }
  return context;
};
