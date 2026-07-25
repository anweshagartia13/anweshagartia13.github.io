import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export const ChecklistCard = ({ warnings = [], recommendations = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Warnings List (Orange Cards) */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-amber-500/20 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">Detected Warnings ({warnings.length})</h3>
        </div>

        {warnings.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Zero critical warnings found! Your site passed all key technical checks.</span>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {warnings.map((warn, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs font-medium flex items-start space-x-3"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{warn}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actionable Recommendations (Checklist) */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-blue-500/20 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-blue-400">
          <Lightbulb className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">Actionable Recommendations ({recommendations.length})</h3>
        </div>

        {recommendations.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>No immediate SEO optimizations required. Outstanding implementation!</span>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-slate-200 text-xs font-medium flex items-start space-x-3 hover:border-blue-500/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
