import React, { useState } from 'react';
import { Cpu, Home, Search, AlertTriangle, ArrowRight, RefreshCw, Terminal } from 'lucide-react';

export default function NotFoundPage({ setActivePage }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setActivePage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative pt-32 pb-20 overflow-hidden min-h-[85vh] flex items-center justify-center">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 text-center space-y-8 relative z-10">
        
        {/* Glowing 404 Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-semibold uppercase tracking-wider animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          <span>Error Code 404 • Node Missing</span>
        </div>

        {/* Large Visual Headline */}
        <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 font-heading tracking-widest">
          404
        </h1>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Neural Vector Path Not Found
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The neural cluster you requested has either migrated to a new vector embedding or does not exist in our system topology.
          </p>
        </div>

        {/* Diagnostic Terminal Box */}
        <div className="glass-card rounded-2xl p-4 border border-white/10 text-left font-mono text-xs text-slate-300 bg-slate-950/90 shadow-2xl max-w-lg mx-auto">
          <div className="flex items-center space-x-2 pb-2 border-b border-white/10 text-slate-500 text-[10px]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>NEURAFLOW DIAGNOSTIC TERMINAL v4.8</span>
          </div>
          <div className="pt-2 space-y-1 text-[11px]">
            <p className="text-red-400">&gt; HTTP_STATUS: 404 NOT_FOUND</p>
            <p className="text-slate-400">&gt; REASON: Requested URI is outside mapped neural graph</p>
            <p className="text-cyan-400">&gt; SUGGESTION: Redirect to root node (/home)</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-glow-primary hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Page</span>
          </button>

          <button
            onClick={() => {
              setActivePage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center justify-center space-x-2"
          >
            <span>Explore AI Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
