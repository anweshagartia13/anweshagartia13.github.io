import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, Clock, AlertTriangle } from 'lucide-react';

export const Speedometer = ({ responseTime = 0, rating = 'Fast' }) => {
  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let needleColor = '#22C55E';
  let angle = -60; // Fast

  if (rating === 'Average') {
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    needleColor = '#F59E0B';
    angle = 0; // Average
  } else if (rating === 'Slow') {
    badgeBg = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    needleColor = '#EF4444';
    angle = 60; // Slow
  }

  return (
    <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="flex items-center space-x-2 text-slate-300 mb-4">
        <Gauge className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold text-base tracking-wide uppercase">Performance Speedometer</h3>
      </div>

      {/* Speedometer Gauge Visual */}
      <div className="relative w-48 h-28 flex items-end justify-center overflow-hidden my-2">
        {/* Semi-circle Gauge Arc */}
        <svg className="w-44 h-44 -mb-16" viewBox="0 0 100 50">
          {/* Fast segment (Green) */}
          <path
            d="M 10 50 A 40 40 0 0 1 34 18"
            fill="none"
            stroke="#22C55E"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Average segment (Yellow) */}
          <path
            d="M 38 15 A 40 40 0 0 1 62 15"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="10"
          />
          {/* Slow segment (Red) */}
          <path
            d="M 66 18 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#EF4444"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>

        {/* Needle Indicator */}
        <motion.div
          className="absolute bottom-1 left-1/2 w-1.5 h-16 origin-bottom rounded-full -ml-[3px]"
          style={{ backgroundColor: needleColor }}
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.3 }}
        />
        {/* Needle Center Pivot */}
        <div className="absolute bottom-0 w-4 h-4 bg-slate-200 rounded-full border-2 border-slate-900 shadow-md"></div>
      </div>

      {/* Response Time Counter */}
      <div className="mt-2 flex items-baseline space-x-1">
        <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
          {responseTime}
        </span>
        <span className="text-xs font-semibold text-slate-400">ms</span>
      </div>

      {/* Rating Pill */}
      <div className="mt-3">
        <span className={`inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
          {rating === 'Fast' && <Zap className="w-3.5 h-3.5" />}
          {rating === 'Average' && <Clock className="w-3.5 h-3.5" />}
          {rating === 'Slow' && <AlertTriangle className="w-3.5 h-3.5" />}
          <span>{rating} Response Speed</span>
        </span>
      </div>
    </div>
  );
};
