"use client";

import * as React from "react";
import { Search, Download, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BUDGET_OPTIONS } from "@/lib/validations/lead";

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
  totalCount: _totalCount,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
      {/* Left Search Bar */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads by name or email..."
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-800 bg-slate-950/70 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
        />
      </div>

      {/* Right Filters & CSV Export */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Select Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-slate-400 font-medium hidden sm:inline">Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-slate-900 text-slate-100">
              All Statuses
            </option>
            <option value="NEW" className="bg-slate-900 text-slate-100">
              New (Blue)
            </option>
            <option value="CONTACTED" className="bg-slate-900 text-slate-100">
              Contacted (Yellow)
            </option>
            <option value="CLOSED" className="bg-slate-900 text-slate-100">
              Closed (Green)
            </option>
          </select>
        </div>

        {/* Budget Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <span className="text-slate-400 font-medium hidden sm:inline">Budget:</span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-slate-900 text-slate-100">
              All Budgets
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-slate-900 text-slate-100">
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-slate-400 font-medium hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="latest" className="bg-slate-900 text-slate-100">
              Latest First
            </option>
            <option value="oldest" className="bg-slate-900 text-slate-100">
              Oldest First
            </option>
            <option value="alphabetical" className="bg-slate-900 text-slate-100">
              Alphabetical (A-Z)
            </option>
          </select>
        </div>

        {/* Export CSV Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onExportCSV}
          className="gap-1.5 border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export CSV</span>
        </Button>
      </div>
    </div>
  );
}
