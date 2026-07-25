"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { LeadItem } from "@/types/lead";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { formatDate } from "@/lib/utils";
import { updateLeadStatusAction } from "@/app/actions/lead-actions";
import { toast } from "sonner";
import { User, Mail, DollarSign, Calendar, MessageSquare } from "lucide-react";

interface LeadDetailsModalProps {
  lead: LeadItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export function LeadDetailsModal({
  lead,
  isOpen,
  onClose,
  onStatusUpdated,
}: LeadDetailsModalProps) {
  const [updating, setUpdating] = React.useState(false);

  if (!lead) return null;

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const res = await updateLeadStatusAction(lead.id, newStatus);
      if (res.success) {
        toast.success(`Lead status updated to ${newStatus}`);
        if (onStatusUpdated) onStatusUpdated();
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lead Details"
      description={`Captured on ${formatDate(lead.createdAt)}`}
      maxWidth="lg"
    >
      <div className="space-y-6 text-slate-200">
        {/* Top Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Status:</span>
            <LeadStatusBadge status={lead.status} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quick Change:</span>
            <select
              value={lead.status}
              disabled={updating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="NEW">New (Blue)</option>
              <option value="CONTACTED">Contacted (Yellow)</option>
              <option value="CLOSED">Closed (Green)</option>
            </select>
          </div>
        </div>

        {/* Lead Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <User className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Full Name</p>
              <p className="text-sm font-semibold text-white mt-0.5">{lead.name}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <Mail className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
              <a
                href={`mailto:${lead.email}`}
                className="text-sm font-semibold text-indigo-400 hover:underline mt-0.5 block truncate"
              >
                {lead.email}
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Budget Range</p>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5">{lead.budget}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Created Date</p>
              <p className="text-sm font-medium text-slate-300 mt-0.5">{formatDate(lead.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Message / Brief */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Lead Message / Requirement Brief</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </p>
        </div>
      </div>
    </Modal>
  );
}
