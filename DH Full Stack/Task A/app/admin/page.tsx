"use client";

import * as React from "react";
import { getLeadsAction, getLeadStatsAction } from "@/app/actions/lead-actions";
import { LeadFilters } from "@/components/leads/LeadFilters";
import { LeadTable } from "@/components/leads/LeadTable";
import { LeadItem, LeadStats } from "@/types/lead";
import { exportLeadsToCSV } from "@/lib/export";
import { toast } from "sonner";
import { Users, Sparkles, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminDashboardPage() {
  const [leads, setLeads] = React.useState<LeadItem[]>([]);
  const [stats, setStats] = React.useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    closedLeads: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = React.useState(true);

  // Filters State
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("ALL");
  const [budget, setBudget] = React.useState("ALL");
  const [sortBy, setSortBy] = React.useState<"latest" | "oldest" | "alphabetical">("latest");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalLeads, setTotalLeads] = React.useState(0);

  const fetchDashboardData = React.useCallback(async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await getLeadStatsAction();
      if (statsRes.success) {
        setStats(statsRes.stats);
      }

      // Fetch table leads
      const leadsRes = await getLeadsAction({
        search,
        status,
        budget,
        sortBy,
        page: currentPage,
        pageSize: 10,
      });

      if (leadsRes.success) {
        setLeads(leadsRes.leads);
        setTotalPages(leadsRes.totalPages);
        setTotalLeads(leadsRes.totalLeads);
      } else {
        toast.error("Failed to load leads from database.");
      }
    } catch {
      toast.error("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  }, [search, status, budget, sortBy, currentPage]);

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads available to export.");
      return;
    }
    exportLeadsToCSV(leads, `leaddesk-leads-page-${currentPage}.csv`);
    toast.success(`Exported ${leads.length} leads to CSV.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lead Pipeline Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time lead acquisition dashboard, status toggling, search filters, and exports.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{stats.totalLeads}</p>
            )}
            <span className="text-[11px] text-slate-500 font-medium block">All-time lead volume</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* New Leads (Blue) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">New Leads</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">{stats.newLeads}</p>
            )}
            <span className="text-[11px] text-slate-500 font-medium block">Requires initial outreach</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Contacted Leads (Yellow) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Contacted</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{stats.contactedLeads}</p>
            )}
            <span className="text-[11px] text-slate-500 font-medium block">In active conversation</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Closed Leads (Green) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Closed Deals</span>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{stats.closedLeads}</p>
            )}
            <span className="text-[11px] text-emerald-400/80 font-medium block">
              {stats.conversionRate}% Conversion Rate
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <LeadFilters
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        status={status}
        setStatus={(val) => {
          setStatus(val);
          setCurrentPage(1);
        }}
        budget={budget}
        setBudget={(val) => {
          setBudget(val);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        setSortBy={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
        onExportCSV={handleExportCSV}
        totalCount={totalLeads}
      />

      {/* Main Leads Data Table */}
      <LeadTable
        leads={leads}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalLeads={totalLeads}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={fetchDashboardData}
      />
    </div>
  );
}
