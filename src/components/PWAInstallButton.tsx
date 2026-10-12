import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Check, X, Share2, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallButtonProps {
  variant?: 'footer' | 'header' | 'default';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'default', className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsInstalled(isStandalone);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setJustInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setJustInstalled(true);
        setDeferredPrompt(null);
      }
    } else {
      // Show guided instructions for iOS or desktop/mobile browser
      setShowGuideModal(true);
    }
  };

  if (isInstalled && !justInstalled && variant !== 'footer') {
    return null;
  }

  // Footer Variant UI
  if (variant === 'footer') {
    if (isInstalled) {
      return (
        <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-stone-800/80 px-3 py-2 rounded-xl border border-emerald-800/50">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>AgriKnowledge Hub PWA Active</span>
        </div>
      );
    }

    return (
      <>
        <button
          onClick={handleInstall}
          type="button"
          className={`inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-emerald-600/50 text-xs px-3.5 py-2 rounded-xl transition duration-150 font-medium cursor-pointer shadow-xs ${className}`}
          title="Install AgriKnowledge Hub for offline access on your phone or computer"
        >
          <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Install App on Your Phone (PWA)</span>
        </button>

        {/* Modal Guide */}
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
            <div className="bg-stone-900 border border-stone-700 text-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setShowGuideModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Install AgriKnowledge Hub</h3>
                  <p className="text-xs text-emerald-400">Works offline across all 47 counties</p>
                </div>
              </div>

              {isIOS ? (
                <div className="space-y-3 text-xs text-stone-300">
                  <p className="text-stone-300">To install on your iPhone or iPad using Safari:</p>
                  <ol className="list-decimal list-inside space-y-2 bg-stone-800/60 p-3.5 rounded-xl border border-stone-700">
                    <li className="flex items-start gap-2">
                      <Share2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Tap the <strong>Share</strong> button at the bottom of Safari.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <PlusSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                    </li>
                    <li>Tap <strong>Add</strong> in the top-right corner.</li>
                  </ol>
                  <p className="text-[11px] text-stone-400">
                    Once added, open AgriKnowledge Hub from your home screen like any native app.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-xs text-stone-300">
                  <p>Install AgriKnowledge Hub for fast, full-screen offline access to farm calculators, crop guides, and market prices:</p>
                  <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700 space-y-2">
                    <p className="font-semibold text-stone-200">On Android / Chrome:</p>
                    <p className="text-stone-300">Tap the browser menu (⋮) and tap <strong>Add to Home screen</strong> or <strong>Install app</strong>.</p>
                    <p className="font-semibold text-stone-200 pt-1">On Computer:</p>
                    <p className="text-stone-300">Click the install icon in the URL address bar or select <strong>Install AgriKnowledge Hub</strong> in the menu.</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowGuideModal(false)}
                className="mt-5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                Got It, Asante!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Default button variant
  return (
    <>
      <button
        onClick={handleInstall}
        type="button"
        className={`flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition cursor-pointer ${className}`}
      >
        <Download className="w-4 h-4" />
        <span>Install App</span>
      </button>

      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="bg-stone-900 border border-stone-700 text-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Install AgriKnowledge Hub</h3>
                <p className="text-xs text-emerald-400">Offline PWA Installation</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              {isIOS ? (
                <ol className="list-decimal list-inside space-y-2 bg-stone-800/60 p-3.5 rounded-xl border border-stone-700">
                  <li>Tap the <strong>Share</strong> button in Safari.</li>
                  <li>Scroll and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> to finish.</li>
                </ol>
              ) : (
                <p className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700">
                  Tap your browser menu (⋮) and select <strong>Install App</strong> or <strong>Add to Home Screen</strong> to install AgriKnowledge Hub on your device.
                </p>
              )}
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
