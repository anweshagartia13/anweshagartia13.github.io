import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert, CheckCircle } from 'lucide-react';

export const SeoScoreCircle = ({ score = 0 }) => {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'text-emerald-500';
  let strokeColor = '#22C55E';
  let statusBadge = 'Excellent';
  let bgGlow = 'rgba(34, 197, 94, 0.15)';

  if (score < 50) {
    colorClass = 'text-rose-500';
    strokeColor = '#EF4444';
    statusBadge = 'Needs Improvement';
    bgGlow = 'rgba(239, 68, 68, 0.15)';
  } else if (score < 80) {
    colorClass = 'text-amber-500';
    strokeColor = '#F59E0B';
    statusBadge = 'Moderate';
    bgGlow = 'rgba(245, 158, 11, 0.15)';
  }

  return (
    <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
      {/* Dynamic Background Radial Light */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${bgGlow} 0%, transparent 70%)` }}
      />

      <div className="flex items-center space-x-2 text-slate-300 mb-4 z-10">
        <Award className="w-5 h-5 text-blue-400" />
        <h3 className="font-bold text-base tracking-wide uppercase">SEO Health Score</h3>
      </div>

      {/* SVG Radial Gauge */}
      <div className="relative w-44 h-44 flex items-center justify-center z-10">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-slate-700/60"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>

        {/* Center Display Number */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-4xl font-extrabold tracking-tight ${colorClass}`}
          >
            {score}
          </motion.span>
          <span className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">
            out of 100
          </span>
        </div>
      </div>

      {/* Score Status Pill */}
      <div className="mt-4 z-10">
        <span
          className={`inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
            score >= 80
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : score >= 50
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {score >= 80 ? <CheckCircle className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
          <span>{statusBadge}</span>
        </span>
      </div>
    </div>
  );
};
