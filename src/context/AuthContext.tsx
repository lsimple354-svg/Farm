import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserCounty: (county: string) => void;
  awardPoints: (pts: number) => void;
}

const defaultProfile: UserProfile = {
  id: 'usr-101',
  name: 'John Kiprono Kipchoge',
  handle: '@kipchoge_farm',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
  role: 'Smallholder Farmer',
  county: 'Uasin Gishu',
  farmSizeAcres: 5.5,
  primaryEnterprises: ['Maize (H6213)', 'Dairy Cattle (Friesian)', 'Silage Making', 'Indigenous Poultry'],
  reputationPoints: 1240,
  badges: ['Master Composter', 'Top Contributor', 'Pest Scout 2026', 'Verified Producer'],
  joinedDate: 'Jan 2024',
  phone: '+254 722 000 888',
  bio: 'Mixed crop & dairy farmer based in Soy, Uasin Gishu. Passionate about silage preservation, soil balancing, and regenerative soil carbon.',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('agri_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  useEffect(() => {
    try {
      localStorage.setItem('agri_user_profile', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  const updateUserCounty = (county: string) => {
    setUser((prev) => ({ ...prev, county }));
  };

  const awardPoints = (pts: number) => {
    setUser((prev) => ({ ...prev, reputationPoints: prev.reputationPoints + pts }));
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUserCounty, awardPoints }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
