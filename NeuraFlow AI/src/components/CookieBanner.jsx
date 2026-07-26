import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, Settings, X } from 'lucide-react';

export default function CookieBanner({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: true,
    marketing: false,
    personalization: true
  });

  useEffect(() => {
    const consent = localStorage.getItem('neuraflow_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('neuraflow_cookie_consent', JSON.stringify({ all: true, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('neuraflow_cookie_consent', JSON.stringify({ ...preferences, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-md w-[calc(100vw-3rem)]">
      <div className="glass-card rounded-3xl p-5 border border-white/15 shadow-2xl bg-slate-900/95 backdrop-blur-2xl text-slate-200 text-xs sm:text-sm animate-in slide-in-from-bottom-6 duration-500">
        
        {!showSettings ? (
          <div>
            <div className="flex items-start space-x-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white font-heading text-sm">Privacy & Cookie Preferences</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  We use cookies and telemetry to personalize your experience, analyze AI platform performance, and ensure secure SOC2 compliance.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setShowSettings(true)}
                className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <h4 className="font-bold text-white text-sm font-heading flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Cookie Preferences</span>
              </h4>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 mb-4 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <div>
                  <span className="font-semibold text-white">Essential & Security</span>
                  <p className="text-[10px] text-slate-400">Required for authentication and SOC2 compliance</p>
                </div>
                <input type="checkbox" checked disabled className="rounded text-blue-600" />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <div>
                  <span className="font-semibold text-white">Analytics & Performance</span>
                  <p className="text-[10px] text-slate-400">Helps us measure ML response latencies</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500" 
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <div>
                  <span className="font-semibold text-white">AI Personalization</span>
                  <p className="text-[10px] text-slate-400">Remembers customized prompt settings</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.personalization}
                  onChange={(e) => setPreferences({ ...preferences, personalization: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white shadow-glow-primary hover:bg-blue-500 transition-all"
              >
                Save Choice
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
