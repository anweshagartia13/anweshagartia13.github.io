import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, Clock, Users } from 'lucide-react';

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(25);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(15);
  const [avgHourlyRate, setAvgHourlyRate] = useState(55);

  // Calculations
  const totalWeeklyManualHours = teamSize * manualHoursPerWeek;
  const annualManualCost = totalWeeklyManualHours * avgHourlyRate * 52;
  const estimatedTimeSavedPercent = 0.65; // 65% reduction with NeuraFlow AI
  const annualSavings = Math.round(annualManualCost * estimatedTimeSavedPercent);
  const hoursSavedPerYear = Math.round(totalWeeklyManualHours * 52 * estimatedTimeSavedPercent);
  const estimatedRoiMultiple = (annualSavings / 90000).toFixed(1); // Based on enterprise implementation cost

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-widest">Interactive Intelligence</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            NeuraFlow Enterprise ROI Calculator
          </h3>
        </div>
      </div>

      <p className="text-slate-300 text-xs sm:text-sm mb-8 max-w-2xl">
        Estimate how much money and engineering hours your team can save by replacing repetitive operational workflows with NeuraFlow AI agents.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Slider 1: Team Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-300 font-semibold flex items-center space-x-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Team Size (Knowledge Workers)</span>
              </span>
              <span className="font-extrabold text-cyan-300 bg-slate-800 px-3 py-1 rounded-lg border border-white/10">
                {teamSize} Employees
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Slider 2: Hours spent on manual repetitive tasks */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-300 font-semibold flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Manual Repetitive Hours / Week / Person</span>
              </span>
              <span className="font-extrabold text-purple-300 bg-slate-800 px-3 py-1 rounded-lg border border-white/10">
                {manualHoursPerWeek} Hours
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              step="1"
              value={manualHoursPerWeek}
              onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Slider 3: Hourly Cost */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-300 font-semibold flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Average Hourly Compensation</span>
              </span>
              <span className="font-extrabold text-emerald-300 bg-slate-800 px-3 py-1 rounded-lg border border-white/10">
                ${avgHourlyRate} / hr
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={avgHourlyRate}
              onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

        </div>

        {/* Calculated Results Display */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-white/15 rounded-2xl p-6 text-center space-y-4 relative shadow-glow-primary">
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Projected Annual Impact</span>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider text-slate-400">Estimated Annual Cost Savings</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 font-heading my-1">
              ${annualSavings.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-left">
            <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
              <span className="block text-[11px] text-slate-400">Hours Reclaimed</span>
              <span className="text-lg font-bold text-white font-heading">{hoursSavedPerYear.toLocaleString()} hrs/yr</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
              <span className="block text-[11px] text-slate-400">Estimated ROI</span>
              <span className="text-lg font-bold text-cyan-400 font-heading">{estimatedRoiMultiple}x Return</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
