import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Globe, AlertCircle } from 'lucide-react';

export const HeroSection = ({ onAnalyze, isLoading }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const sampleUrls = [
    'https://google.com',
    'https://github.com',
    'https://openai.com',
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputUrl.trim()) {
      setErrorMsg('Please enter a website URL to analyze.');
      return;
    }
    setErrorMsg('');
    onAnalyze(inputUrl.trim());
  };

  const handleSampleClick = (url) => {
    setInputUrl(url);
    setErrorMsg('');
    onAnalyze(url);
  };

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Glow effect backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 shadow-inner"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Next-Gen Auditing Engine</span>
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto"
      >
        Website Health & <span className="gradient-text">SEO Analyzer</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
      >
        Analyze any website in seconds and discover SEO, performance, and technical insights.
      </motion.p>

      {/* URL Input Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="mt-8 max-w-2xl mx-auto"
      >
        <div className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl focus-within:border-blue-500/80 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all duration-300">
          <div className="flex items-center w-full pl-4 pr-2 py-2">
            <Globe className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter URL (e.g., https://example.com or github.com)"
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none font-medium"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto mt-2 sm:mt-0 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center space-x-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
          >
            <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Local Error Notice */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center justify-center space-x-1.5 text-xs text-rose-400"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Quick Sample Links */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-500">Try examples:</span>
          {sampleUrls.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => handleSampleClick(sample)}
              disabled={isLoading}
              className="px-3 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-colors duration-150 cursor-pointer font-mono"
            >
              {sample}
            </button>
          ))}
        </div>
      </motion.form>
    </section>
  );
};
