"use client";

import * as React from "react";
import { getLeadsAction, getAllLeadsForKanbanAction, getLeadStatsAction } from "@/app/actions/lead-actions";
import { LeadFilters } from "@/components/leads/LeadFilters";
import { LeadTable } from "@/components/leads/LeadTable";
import { LeadKanbanBoard } from "@/components/leads/LeadKanbanBoard";
import { LeadItem, LeadStats } from "@/types/lead";
import { exportLeadsToCSV, exportLeadsToExcel } from "@/lib/export";
import { toast } from "sonner";
import {
  Users,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  LayoutGrid,
  ListFilter,
  TrendingUp,
  ShieldCheck,
  Send,
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminDashboardPage() {
  const [viewMode, setViewMode] = React.useState<"table" | "kanban">("table");
  const [leads, setLeads] = React.useState<LeadItem[]>([]);
  const [kanbanLeads, setKanbanLeads] = React.useState<LeadItem[]>([]);
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
      }

      // Fetch kanban leads
      const kanbanRes = await getAllLeadsForKanbanAction();
      if (kanbanRes.success) {
        setKanbanLeads(kanbanRes.leads);
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
    exportLeadsToCSV(leads, `leaddesk-pro-leads-${currentPage}.csv`);
    toast.success(`Exported ${leads.length} leads to CSV.`);
  };

  const handleExportExcel = () => {
    if (leads.length === 0) {
      toast.error("No leads available to export.");
      return;
    }
    exportLeadsToExcel(leads, `leaddesk-pro-leads-${currentPage}.xls`);
    toast.success(`Exported ${leads.length} leads to Excel.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Title Bar + View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lead Pipeline Command Center</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time lead capture management, 5-stage Kanban board, search filters, and exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === "table"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === "kanban"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Leads */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Volume</span>
            {loading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-extrabold text-white">{stats.totalLeads}</p>
            )}
            <span className="text-[10px] text-slate-500 font-medium block">+{stats.todayLeads} captured today</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* New Leads (Blue) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">New Stage</span>
            {loading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-extrabold text-blue-400">{stats.newLeads}</p>
            )}
            <span className="text-[10px] text-slate-500 font-medium block">Initial outreach</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Qualified Leads (Purple) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Qualified</span>
            {loading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-extrabold text-purple-400">{stats.qualifiedLeads}</p>
            )}
            <span className="text-[10px] text-slate-500 font-medium block">Passed lead score</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Proposal Sent (Cyan) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Proposal Sent</span>
            {loading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-extrabold text-cyan-400">{stats.proposalLeads}</p>
            )}
            <span className="text-[10px] text-slate-500 font-medium block">Awaiting signature</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Send className="w-5 h-5" />
          </div>
        </div>

        {/* Closed Deals (Green) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Closed Deals</span>
            {loading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-extrabold text-emerald-400">{stats.closedLeads}</p>
            )}
            <span className="text-[10px] text-emerald-400/80 font-medium block flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {stats.conversionRate}% Conv.
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Only shown in Table View) */}
      {viewMode === "table" && (
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
          onExportExcel={handleExportExcel}
          totalCount={totalLeads}
        />
      )}

      {/* Dynamic View Mode Content */}
      {viewMode === "table" ? (
        <LeadTable
          leads={leads}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalLeads={totalLeads}
          onPageChange={(page) => setCurrentPage(page)}
          onRefresh={fetchDashboardData}
        />
      ) : (
        <LeadKanbanBoard leads={kanbanLeads} onRefresh={fetchDashboardData} />
      )}
    </div>
  );
}
