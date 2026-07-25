import React from 'react';
import { Heading, CheckCircle2, AlertCircle } from 'lucide-react';

export const HeadingHierarchy = ({ h1Count = 0, h2Count = 0, h3Count = 0 }) => {
  const maxVal = Math.max(h1Count, h2Count, h3Count, 1);

  return (
    <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-slate-200">
          <Heading className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-base">Heading Structure Hierarchy</h3>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            h1Count === 1
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
        >
          {h1Count === 1 ? 'Optimal H1 Tag' : h1Count === 0 ? 'Missing H1 Tag' : 'Multiple H1 Tags'}
        </span>
      </div>

      <div className="space-y-4">
        {/* H1 Row */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-blue-400 font-mono">H1 Headings</span>
            <span className="text-white">{h1Count} tag(s)</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (h1Count / maxVal) * 100)}%` }}
            />
          </div>
        </div>

        {/* H2 Row */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-cyan-400 font-mono">H2 Subheadings</span>
            <span className="text-white">{h2Count} tag(s)</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (h2Count / maxVal) * 100)}%` }}
            />
          </div>
        </div>

        {/* H3 Row */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-400 font-mono">H3 Sub-sections</span>
            <span className="text-white">{h3Count} tag(s)</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="bg-slate-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (h3Count / maxVal) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center space-x-2 text-xs text-slate-400">
        {h1Count === 1 ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Single H1 title detected. Excellent heading semantics for search engine crawling.</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Recommended: Maintain exactly one H1 tag per page for clear topic hierarchy.</span>
          </>
        )}
      </div>
    </div>
  );
};
