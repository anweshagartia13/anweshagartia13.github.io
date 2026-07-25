import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const STEPS = [
  { id: 1, text: 'Connecting to target host...' },
  { id: 2, text: 'Downloading HTML payload...' },
  { id: 3, text: 'Parsing Metadata & Cheerio DOM...' },
  { id: 4, text: 'Calculating SEO Score & Performance...' },
  { id: 5, text: 'Generating Audit Dashboard Report...' },
];

export const LoadingSteps = ({ targetUrl }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 650);

    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="max-w-xl mx-auto my-8 p-6 sm:p-8 glass-panel-glow rounded-3xl text-center border border-blue-500/30"
    >
      <div className="flex items-center justify-center space-x-2 text-blue-400 mb-3">
        <Sparkles className="w-5 h-5 animate-spin" />
        <span className="font-semibold text-sm uppercase tracking-wider">Scanning Website</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate px-4">
        {targetUrl || 'Analyzing target site'}
      </h3>
      <p className="text-xs text-slate-400 mb-6">Running automated 30+ metric security and SEO audit</p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-6 p-0.5 border border-slate-700">
        <motion.div
          className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full"
          initial={{ width: '10%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3 text-left max-w-md mx-auto">
        {STEPS.map((step, index) => {
          const isDone = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isCurrent
                  ? 'bg-blue-500/10 border border-blue-500/30 text-white font-medium shadow-inner'
                  : isDone
                  ? 'bg-slate-800/40 text-emerald-400'
                  : 'text-slate-500 opacity-60'
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold">
                    {step.id}
                  </div>
                )}
              </div>
              <span className="text-xs sm:text-sm">{step.text}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
