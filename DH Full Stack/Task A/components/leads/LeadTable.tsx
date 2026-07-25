"use client";

import * as React from "react";
import { LeadItem } from "@/types/lead";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { formatDate } from "@/lib/utils";
import { updateLeadStatusAction } from "@/app/actions/lead-actions";
import { toast } from "sonner";
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { LeadDeleteModal } from "./LeadDeleteModal";

interface LeadTableProps {
  leads: LeadItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalLeads: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export function LeadTable({
  leads,
  loading,
  currentPage,
  totalPages,
  totalLeads,
  onPageChange,
  onRefresh,
}: LeadTableProps) {
  const [selectedLeadForView, setSelectedLeadForView] = React.useState<LeadItem | null>(null);
  const [selectedLeadForDelete, setSelectedLeadForDelete] = React.useState<LeadItem | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  const handleStatusToggle = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    leadId: string
  ) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    setUpdatingId(leadId);

    try {
      const res = await updateLeadStatusAction(leadId, newStatus);
      if (res.success) {
        toast.success(`Status changed to ${newStatus}`);
        onRefresh();
      } else {
        toast.error("Failed to update status.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
        {/* Table Container with Sticky Header */}
        <div className="overflow-x-auto min-h-[360px]">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead className="bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th scope="col" className="py-3.5 px-4 sm:px-6">Name</th>
                <th scope="col" className="py-3.5 px-4">Email</th>
                <th scope="col" className="py-3.5 px-4">Budget</th>
                <th scope="col" className="py-3.5 px-4">Pipeline Stage</th>
                <th scope="col" className="py-3.5 px-4">Created Date</th>
                <th scope="col" className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-4 sm:px-6"><Skeleton className="h-4 w-32" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-4 w-40" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-4 w-28" /></td>
                    <td className="py-4 px-4 text-right"><Skeleton className="h-6 w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Inbox className="w-7 h-7" />
                      </div>
                      <h4 className="text-base font-semibold text-white">No Leads Found</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        No leads match your current search query or active pipeline stage filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLeadForView(lead)}
                    className="group hover:bg-slate-800/40 cursor-pointer transition-colors duration-150"
                  >
                    {/* Name */}
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {lead.name}
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 text-slate-300 font-mono text-xs">
                      {lead.email}
                    </td>

                    {/* Budget */}
                    <td className="py-4 px-4 font-medium text-emerald-400 text-xs">
                      {lead.budget}
                    </td>

                    {/* Status Toggle Badge */}
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <LeadStatusBadge status={lead.status} />
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusToggle(e, lead.id)}
                          className="bg-slate-950/80 text-[11px] font-semibold border border-slate-700 rounded-lg px-2 py-1 text-slate-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="NEW" className="bg-slate-900 text-slate-100">
                            New
                          </option>
                          <option value="QUALIFIED" className="bg-slate-900 text-slate-100">
                            Qualified
                          </option>
                          <option value="CONTACTED" className="bg-slate-900 text-slate-100">
                            Contacted
                          </option>
                          <option value="PROPOSAL_SENT" className="bg-slate-900 text-slate-100">
                            Proposal Sent
                          </option>
                          <option value="CLOSED" className="bg-slate-900 text-slate-100">
                            Closed
                          </option>
                        </select>
                      </div>
                    </td>

                    {/* Created Date */}
                    <td className="py-4 px-4 text-xs text-slate-400">
                      {formatDate(lead.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLeadForView(lead)}
                          title="View Details"
                          className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedLeadForDelete(lead)}
                          title="Delete Lead"
                          className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
          <div>
            Showing <strong className="text-slate-200">{leads.length}</strong> of{" "}
            <strong className="text-slate-200">{totalLeads}</strong> total leads
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-200 px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      <LeadDetailsModal
        lead={selectedLeadForView}
        isOpen={!!selectedLeadForView}
        onClose={() => setSelectedLeadForView(null)}
        onStatusUpdated={onRefresh}
      />

      {/* Delete Confirmation Modal */}
      <LeadDeleteModal
        lead={selectedLeadForDelete}
        isOpen={!!selectedLeadForDelete}
        onClose={() => setSelectedLeadForDelete(null)}
        onDeleted={onRefresh}
      />
    </>
  );
}
