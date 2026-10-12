import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { NotificationProvider } from './context/NotificationContext';
import { InternationalProvider } from './context/InternationalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PhoneMockup } from './components/PhoneMockup';
import { MobileBottomNav } from './components/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { CropsPage } from './pages/CropsPage';
import { LivestockPage } from './pages/LivestockPage';
import { SoilWaterPage } from './pages/SoilWaterPage';
import { PestsPage } from './pages/PestsPage';
import { WeatherPage } from './pages/WeatherPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { MarketsPage } from './pages/MarketsPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { FarmDashboardPage } from './pages/FarmDashboardPage';
import { LearningPage } from './pages/LearningPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ExpertPage } from './pages/ExpertPage';
import { CommunityPage } from './pages/CommunityPage';
import { ReelsPage } from './pages/ReelsPage';
import { MessagesPage } from './pages/MessagesPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { FarmBusinessPage } from './pages/FarmBusinessPage';
import { SustainablePage } from './pages/SustainablePage';
import { AdminCmsPage } from './pages/AdminCmsPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';
import { EventsPage } from './pages/EventsPage';
import { ProfilePage } from './pages/ProfilePage';
import type { Page } from './types';
import { Smartphone, Monitor, ArrowLeft } from 'lucide-react';

export default function App() {
  // Check URL parameters for direct deep-linking
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('page') as Page;
      if (p) return p;
    } catch {
      // ignore
    }
    return 'community';
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu');
  const [viewMode, setViewMode] = useState<'phone' | 'desktop'>('desktop');

  // Sync page state with browser history and scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('page', currentPage);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  }, [currentPage]);

  const handleSelectSearchResult = (page: Page) => {
    setCurrentPage(page);
  };

  const renderCurrentContent = (isMobile = false) => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openSearchModal={() => setSearchModalOpen(true)}
            selectedCounty={selectedCounty}
          />
        );
      case 'community':
        return <CommunityPage isMobileFrame={isMobile} />;
      case 'reels':
        return <ReelsPage setCurrentPage={setCurrentPage} />;
      case 'messages':
        return <MessagesPage setCurrentPage={setCurrentPage} />;
      case 'events':
        return <EventsPage isMobileFrame={isMobile} />;
      case 'profile':
        return <ProfilePage isMobileFrame={isMobile} />;
      case 'crops':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <CropsPage />
          </div>
        );
      case 'livestock':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <LivestockPage />
          </div>
        );
      case 'soil-water':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <SoilWaterPage setCurrentPage={setCurrentPage} />
          </div>
        );
      case 'pests':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <PestsPage />
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <WeatherPage
              selectedCounty={selectedCounty}
              setSelectedCounty={setSelectedCounty}
            />
          </div>
        );
      case 'calculators':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <CalculatorsPage />
          </div>
        );
      case 'markets':
        return <MarketsPage setCurrentPage={setCurrentPage} />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'farm-manager':
        return <FarmDashboardPage />;
      case 'learning':
        return <LearningPage />;
      case 'ai-assistant':
        return <AiAssistantPage selectedCounty={selectedCounty} />;
      case 'expert':
        return <ExpertPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'farm-business':
        return <FarmBusinessPage />;
      case 'sustainable':
        return <SustainablePage />;
      case 'admin-cms':
        return <AdminCmsPage />;
      case 'about':
        return <AboutPage />;
      case 'legal':
        return <LegalPage setCurrentPage={setCurrentPage} />;
      default:
        return <CommunityPage isMobileFrame={isMobile} />;
    }
  };

  return (
    <LanguageProvider>
      <InternationalProvider>
        <AuthProvider>
          <NotificationProvider>
            <FarmProvider>
              <div className="min-h-screen bg-[#F4F1EA] text-stone-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950 overflow-x-hidden">
                {/* Top View Mode Switcher Header */}
                <header className="sticky top-0 z-50 bg-[#183D29] text-[#FAF7F0] px-4 py-2 shadow-md flex items-center justify-between border-b border-emerald-900/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="font-bold text-sm tracking-tight font-serif hidden sm:inline">
                      AgriKnowledge Hub Worldwide
                    </span>
                    <span className="text-xs text-emerald-200/80 hidden sm:inline">|</span>
                    <span className="text-xs text-emerald-100 font-medium">
                      {viewMode === 'phone' ? 'Phone Mode Preview' : 'Responsive Web Application'}
                    </span>
                  </div>

                  {/* View Mode Controls */}
                  <div className="flex items-center gap-2">
                    <div className="bg-[#112d1e] p-1 rounded-xl flex items-center gap-1 border border-emerald-900/60">
                      <button
                        onClick={() => setViewMode('phone')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          viewMode === 'phone'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-emerald-200 hover:text-white'
                        }`}
                        title="Simulate Mobile Phone Experience"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Phone Preview</span>
                      </button>

                      <button
                        onClick={() => setViewMode('desktop')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          viewMode === 'desktop'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-emerald-200 hover:text-white'
                        }`}
                        title="Full Responsive Web View"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>Responsive Web</span>
                      </button>
                    </div>
                  </div>
                </header>

                {/* VIEWPORT PRESENTATION */}
                {viewMode === 'phone' ? (
                  /* Interactive Phone Shell for Mobile Simulation */
                  <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 bg-gradient-to-b from-[#EDE8DE] to-[#E3DDD1]">
                    <div className="text-center mb-2 hidden sm:block">
                      <p className="text-xs text-stone-600 font-medium">
                        Mobile preview with native bottom navigation dock, status bar, and responsive touch controls
                      </p>
                    </div>

                    <PhoneMockup
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    >
                      {renderCurrentContent(true)}
                    </PhoneMockup>
                  </div>
                ) : (
                  /* Standard Full Application Viewport */
                  <div className="flex-1 flex flex-col min-h-screen">
                    <Navbar
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      openSearchModal={() => setSearchModalOpen(true)}
                      selectedCounty={selectedCounty}
                      setSelectedCounty={setSelectedCounty}
                    />

                    {/* Main Content: pb-24 ensures fixed mobile navigation never covers forms/buttons */}
                    <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 md:pb-16">
                      {renderCurrentContent(false)}
                    </main>

                    <Footer setCurrentPage={setCurrentPage} />
                  </div>
                )}

                {/* Native Mobile Bottom Navigation (Visible on actual physical phone displays < 768px in responsive web mode) */}
                {viewMode === 'desktop' && (
                  <MobileBottomNav
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}

                {/* Global Search Modal */}
                <GlobalSearchModal
                  isOpen={searchModalOpen}
                  onClose={() => setSearchModalOpen(false)}
                  onSelectResult={handleSelectSearchResult}
                />
              </div>
            </FarmProvider>
          </NotificationProvider>
        </AuthProvider>
      </InternationalProvider>
    </LanguageProvider>
  );
}
