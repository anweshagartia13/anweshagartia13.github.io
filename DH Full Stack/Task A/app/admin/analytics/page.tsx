"use client";

import * as React from "react";
import { getLeadStatsAction } from "@/app/actions/lead-actions";
import { MonthlyLeadsChart } from "@/components/analytics/MonthlyLeadsChart";
import { StatusPieChart } from "@/components/analytics/StatusPieChart";
import { BudgetBarChart } from "@/components/analytics/BudgetBarChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { BarChart3, PieChart, TrendingUp, DollarSign, Activity } from "lucide-react";

export default function AnalyticsPage() {
  const [loading, setLoading] = React.useState(true);
  const [monthlyData, setMonthlyData] = React.useState<any[]>([]);
  const [statusDistribution, setStatusDistribution] = React.useState<any[]>([]);
  const [budgetDistribution, setBudgetDistribution] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>({ conversionRate: 0, totalLeads: 0, closedLeads: 0 });

  React.useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const res = await getLeadStatsAction();
        if (res.success) {
          setMonthlyData(res.monthlyData);
          setStatusDistribution(res.statusDistribution);
          setBudgetDistribution(res.budgetDistribution);
          setStats(res.stats);
        }
      } catch (e) {
        console.error("Analytics fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Lead Performance Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Quantitative visual metrics for lead acquisition volume, conversion rates, and budget allocations.
        </p>
      </div>

      {/* Top Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads Captured</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{stats.totalLeads}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Overall Conversion Rate</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">{stats.conversionRate}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Closed Deals Volume</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-400 mt-1">{stats.closedLeads}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Monthly Lead Area Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Monthly Lead Acquisition & Deal Closures</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical trend comparing total inbound leads versus closed deals over time.
            </p>
          </div>
        </div>

        {loading ? (
          <Skeleton className="h-[300px] w-full rounded-xl" />
        ) : (
          <MonthlyLeadsChart data={monthlyData} />
        )}
      </div>

      {/* Two Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie/Donut */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              <span>Lead Status Distribution</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown across New (Blue), Contacted (Yellow), and Closed (Green) statuses.
            </p>
          </div>

          {loading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : (
            <StatusPieChart data={statusDistribution} />
          )}
        </div>

        {/* Budget Distribution Bar Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Budget Range Allocations</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Categorization of lead volume by requested project budget brackets.
            </p>
          </div>

          {loading ? (
            <Skeleton className="h-[280px] w-full rounded-xl" />
          ) : (
            <BudgetBarChart data={budgetDistribution} />
          )}
        </div>
      </div>
    </div>
  );
}
