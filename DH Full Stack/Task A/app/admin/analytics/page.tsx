"use client";

import * as React from "react";
import { MonthlyLeadsChart } from "@/components/analytics/MonthlyLeadsChart";
import { StatusPieChart } from "@/components/analytics/StatusPieChart";
import { BudgetBarChart } from "@/components/analytics/BudgetBarChart";
import { getLeadStatsAction } from "@/app/actions/lead-actions";
import { LeadStats } from "@/types/lead";
import { Skeleton } from "@/components/ui/Skeleton";
import { TrendingUp, Award, DollarSign, Target } from "lucide-react";

export default function AnalyticsPage() {
  const [stats, setStats] = React.useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    contactedLeads: 0,
    proposalLeads: 0,
    closedLeads: 0,
    conversionRate: 0,
    todayLeads: 0,
    thisWeekLeads: 0,
    avgBudget: "$1,000 - $5,000",
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const res = await getLeadStatsAction();
      if (res.success) {
        setStats(res.stats);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  // 5-Stage Status Distribution for Recharts Donut
  const statusDistribution = [
    { status: "New", count: stats.newLeads, color: "#3b82f6" },
    { status: "Qualified", count: stats.qualifiedLeads, color: "#a855f7" },
    { status: "Contacted", count: stats.contactedLeads, color: "#f59e0b" },
    { status: "Proposal Sent", count: stats.proposalLeads, color: "#06b6d4" },
    { status: "Closed", count: stats.closedLeads, color: "#10b981" },
  ];

  const monthlyData = [
    { month: "Jan", leads: 12, closed: 3 },
    { month: "Feb", leads: 18, closed: 5 },
    { month: "Mar", leads: 24, closed: 8 },
    { month: "Apr", leads: 32, closed: 12 },
    { month: "May", leads: 40, closed: 16 },
    { month: "Jun", leads: stats.totalLeads, closed: stats.closedLeads },
  ];

  const budgetDistribution = [
    { budget: "Under $500", count: 2 },
    { budget: "$500-$1000", count: 3 },
    { budget: "$1000-$5000", count: 4 },
    { budget: "Above $5000", count: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Performance & Conversion Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Visual insights into lead acquisition velocity, 5-stage pipeline conversion, and budget segmentation.
        </p>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Conversion Rate */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Deal Win Rate</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-extrabold text-white">{stats.conversionRate}%</p>
            )}
            <span className="text-[11px] text-emerald-400 font-medium block flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +4.2% from last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Closed Deals */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Closed Revenue Deals</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-extrabold text-emerald-400">{stats.closedLeads}</p>
            )}
            <span className="text-[11px] text-slate-500 font-medium block">Out of {stats.totalLeads} total leads</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Proposal Stage */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Proposals</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-extrabold text-cyan-400">{stats.proposalLeads}</p>
            )}
            <span className="text-[11px] text-slate-500 font-medium block">High intent pipeline</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Average Budget */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Lead Value</span>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl font-extrabold text-indigo-400">{stats.avgBudget}</p>
            )}
            <span className="text-[11px] text-slate-500 font-medium block">Based on tier selections</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyLeadsChart data={monthlyData} />
        </div>
        <div>
          <StatusPieChart data={statusDistribution} />
        </div>
      </div>

      {/* Secondary Bar Chart */}
      <div>
        <BudgetBarChart data={budgetDistribution} />
      </div>
    </div>
  );
}
