import React from 'react';

export const StatCard = ({ icon: Icon, title, value, status, subtitle, badgeColor }) => {
  let badgeStyles = 'bg-slate-700/50 text-slate-300 border-slate-600/50';
  
  if (status === 'success' || status === true) {
    badgeStyles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  } else if (status === 'warning') {
    badgeStyles = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (status === 'danger' || status === false) {
    badgeStyles = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/70 shadow-lg hover:border-slate-600/80 transition-all duration-200 flex flex-col justify-between group">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          {Icon && (
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-700/50 text-blue-400 group-hover:scale-105 transition-transform duration-200">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-semibold text-slate-400 tracking-wide">{title}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xl font-bold text-white tracking-tight truncate">{value}</div>
        {subtitle && (
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className={`inline-block px-2 py-0.5 rounded-md font-medium border text-[11px] ${badgeStyles}`}>
              {subtitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
