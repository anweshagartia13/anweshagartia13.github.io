"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadItem } from "@/types/lead";
import { updateLeadStatusAction } from "@/app/actions/lead-actions";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { LeadDeleteModal } from "./LeadDeleteModal";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  CheckCircle2,
  Eye,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface LeadKanbanBoardProps {
  leads: LeadItem[];
  onRefresh: () => void;
}

const COLUMNS = [
  { id: "NEW", title: "New", icon: Sparkles, color: "text-blue-400 border-blue-500/30 bg-blue-500/5" },
  { id: "QUALIFIED", title: "Qualified", icon: ShieldCheck, color: "text-purple-400 border-purple-500/30 bg-purple-500/5" },
  { id: "CONTACTED", title: "Contacted", icon: Clock, color: "text-amber-400 border-amber-500/30 bg-amber-500/5" },
  { id: "PROPOSAL_SENT", title: "Proposal Sent", icon: Send, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5" },
  { id: "CLOSED", title: "Closed", icon: CheckCircle2, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
];

export function LeadKanbanBoard({ leads, onRefresh }: LeadKanbanBoardProps) {
  const [selectedLeadForView, setSelectedLeadForView] = React.useState<LeadItem | null>(null);
  const [selectedLeadForDelete, setSelectedLeadForDelete] = React.useState<LeadItem | null>(null);
  const [movingId, setMovingId] = React.useState<string | null>(null);

  const moveStatus = async (lead: LeadItem, direction: "next" | "prev") => {
    const currentIndex = COLUMNS.findIndex((c) => c.id === lead.status);
    if (currentIndex === -1) return;

    const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex < 0 || targetIndex >= COLUMNS.length) return;

    const targetStatus = COLUMNS[targetIndex].id;
    setMovingId(lead.id);

    try {
      const res = await updateLeadStatusAction(lead.id, targetStatus);
      if (res.success) {
        toast.success(`Moved "${lead.name}" to ${COLUMNS[targetIndex].title}`);
        onRefresh();
      } else {
        toast.error("Failed to update status.");
      }
    } catch {
      toast.error("An error occurred moving lead.");
    } finally {
      setMovingId(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full min-h-[500px]">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          const Icon = col.icon;

          return (
            <div
              key={col.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-xl backdrop-blur-md"
            >
              {/* Column Header */}
              <div className={`flex items-center justify-between p-3 rounded-xl border mb-3 ${col.color}`}>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">{col.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 text-xs font-extrabold text-slate-300">
                  {colLeads.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-1">
                <AnimatePresence>
                  {colLeads.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-slate-800/80 rounded-xl">
                      <p className="text-xs text-slate-500 font-medium">No leads in {col.title}</p>
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <motion.div
                        key={lead.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 shadow-md hover:shadow-indigo-950/20 transition-all duration-200"
                      >
                        {/* Card Header: Name + Badge */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4
                              onClick={() => setSelectedLeadForView(lead)}
                              className="text-sm font-bold text-white hover:text-indigo-300 cursor-pointer transition-colors line-clamp-1"
                            >
                              {lead.name}
                            </h4>
                            <p className="text-xs text-slate-400 font-mono truncate max-w-[160px]">
                              {lead.email}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                            {lead.budget}
                          </span>
                        </div>

                        {/* Message Preview */}
                        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                          {lead.message}
                        </p>

                        {/* Card Footer: Date + Move Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-500">
                          <span>{formatDate(lead.createdAt)}</span>

                          <div className="flex items-center gap-1">
                            {/* Previous Column Button */}
                            {COLUMNS.findIndex((c) => c.id === col.id) > 0 && (
                              <button
                                onClick={() => moveStatus(lead, "prev")}
                                disabled={movingId === lead.id}
                                title="Move Previous Stage"
                                className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* View Button */}
                            <button
                              onClick={() => setSelectedLeadForView(lead)}
                              title="View Details"
                              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => setSelectedLeadForDelete(lead)}
                              title="Delete Lead"
                              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Next Column Button */}
                            {COLUMNS.findIndex((c) => c.id === col.id) < COLUMNS.length - 1 && (
                              <button
                                onClick={() => moveStatus(lead, "next")}
                                disabled={movingId === lead.id}
                                title="Move Next Stage"
                                className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      <LeadDetailsModal
        lead={selectedLeadForView}
        isOpen={!!selectedLeadForView}
        onClose={() => setSelectedLeadForView(null)}
        onStatusUpdated={onRefresh}
      />

      {/* Delete Modal */}
      <LeadDeleteModal
        lead={selectedLeadForDelete}
        isOpen={!!selectedLeadForDelete}
        onClose={() => setSelectedLeadForDelete(null)}
        onDeleted={onRefresh}
      />
    </>
  );
}
