import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6">
      {/* Top 2 Gauge Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-1/3"></div>
          <div className="w-32 h-32 rounded-full border-4 border-slate-700 mx-auto"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-1/3"></div>
          <div className="h-24 bg-slate-700 rounded-xl w-3/4 mx-auto mt-4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 animate-pulse space-y-2">
            <div className="h-3 bg-slate-700 rounded w-2/3"></div>
            <div className="h-6 bg-slate-600 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
