import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, RefreshCw } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LoadingSteps } from './components/LoadingSteps';
import { SkeletonLoader } from './components/SkeletonLoader';
import { Dashboard } from './components/Dashboard';
import { useAnalyzer } from './hooks/useAnalyzer';

export default function App() {
  const { status, data, error, activeUrl, runAnalysis, reset, isLoading, isError } = useAnalyzer();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero & URL Input */}
        <HeroSection onAnalyze={runAnalysis} isLoading={isLoading} />

        {/* Content Area Switcher */}
        <main className="mt-4">
          <AnimatePresence mode="wait">
            {/* 1. Loading Experience */}
            {isLoading && (
              <motion.div key="loading" exit={{ opacity: 0 }}>
                <LoadingSteps targetUrl={activeUrl} />
                <SkeletonLoader />
              </motion.div>
            )}

            {/* 2. Error State */}
            {isError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-center shadow-2xl space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                  <AlertOctagon className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-white">Analysis Request Failed</h3>
                <p className="text-sm text-rose-200 leading-relaxed font-medium">
                  {error}
                </p>
                <button
                  onClick={() => runAnalysis(activeUrl)}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-600/30 inline-flex items-center space-x-2 transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Audit</span>
                </button>
              </motion.div>
            )}

            {/* 3. Successful Audit Dashboard */}
            {status === 'success' && data && (
              <motion.div key="dashboard">
                <Dashboard data={data} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Required Footer with Digital Heroes link */}
      <Footer />
    </div>
  );
}
