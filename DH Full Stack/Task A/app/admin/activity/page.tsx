"use client";

import * as React from "react";
import { getAuditLogsAction } from "@/app/actions/audit-actions";
import { AuditLogItem } from "@/types/lead";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Activity,
  UserPlus,
  RefreshCw,
  Eye,
  Trash2,
  Download,
  ShieldAlert,
  Clock,
} from "lucide-react";

export default function ActivityTimelinePage() {
  const [logs, setLogs] = React.useState<AuditLogItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filterAction, setFilterAction] = React.useState("ALL");

  const fetchLogs = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAuditLogsAction(100);
      if (res.success) {
        setLogs(res.logs);
      }
    } catch {
      console.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = logs.filter((log) => {
    if (filterAction === "ALL") return true;
    return log.action === filterAction;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case "LEAD_CREATED":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Lead Created</span>
          </div>
        );
      case "STATUS_UPDATED":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Status Updated</span>
          </div>
        );
      case "LEAD_VIEWED":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Eye className="w-3.5 h-3.5" />
            <span>Lead Viewed</span>
          </div>
        );
      case "LEAD_DELETED":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Lead Deleted</span>
          </div>
        );
      case "EXPORT_GENERATED":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Download className="w-3.5 h-3.5" />
            <span>Export Generated</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{action}</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Audit Trail & Security Protocol</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Activity & Audit Logs</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time chronological timeline tracking administrative changes, status updates, views, and exports.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
        {["ALL", "LEAD_CREATED", "STATUS_UPDATED", "LEAD_VIEWED", "LEAD_DELETED", "EXPORT_GENERATED"].map(
          (act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterAction === act
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {act === "ALL" ? "All Activity" : act.replace("_", " ")}
            </button>
          )
        )}
      </div>

      {/* Timeline Stream */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800 animate-pulse">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
          ))
        ) : filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Clock className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold">No audit logs found</p>
            <p className="text-xs text-slate-500">No actions recorded for the selected filter option.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative pl-6 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      {getActionBadge(log.action)}
                      <span className="text-xs text-slate-400 font-mono">
                        Admin: {log.adminEmail || log.adminId}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-slate-200">
                      {log.details || `Executed ${log.action} action`}
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 font-mono shrink-0">
                    {formatDate(log.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
