"use client";

import * as React from "react";
import { Search, Download, Filter, FileSpreadsheet } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface LeadFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  budget: string;
  setBudget: (val: string) => void;
  sortBy: "latest" | "oldest" | "alphabetical";
  setSortBy: (val: "latest" | "oldest" | "alphabetical") => void;
  onExportCSV: () => void;
  onExportExcel?: () => void;
  totalCount: number;
}

export function LeadFilters({
  search,
  setSearch,
  status,
  setStatus,
  budget,
  setBudget,
  sortBy,
  setSortBy,
  onExportCSV,
  onExportExcel,
  totalCount,
}: LeadFiltersProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-4 shadow-xl space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <Input
              placeholder="Search leads by name, email, or requirement brief..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Action Controls & Export Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Status Filter */}
          <div className="relative flex items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New (Blue)</option>
              <option value="QUALIFIED">Qualified (Purple)</option>
              <option value="CONTACTED">Contacted (Yellow)</option>
              <option value="PROPOSAL_SENT">Proposal Sent (Cyan)</option>
              <option value="CLOSED">Closed (Green)</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Budget Filter */}
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="h-10 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Budgets</option>
            <option value="Under $500">Under $500</option>
            <option value="$500-$1000">$500-$1000</option>
            <option value="$1000-$5000">$1000-$5000</option>
            <option value="Above $5000">Above $5000</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-10 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="latest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="alphabetical">Sort: Name (A-Z)</option>
          </select>

          {/* CSV Export */}
          <button
            onClick={onExportCSV}
            className="h-10 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Excel Export */}
          {onExportExcel && (
            <button
              onClick={onExportExcel}
              className="h-10 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all duration-200"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Counter pill */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
        <div>
          Showing <strong className="text-slate-200">{totalCount}</strong> leads matching filters
        </div>

        {(search || status !== "ALL" || budget !== "ALL") && (
          <button
            onClick={() => {
              setSearch("");
              setStatus("ALL");
              setBudget("ALL");
            }}
            className="text-indigo-400 hover:underline font-medium text-[11px]"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
