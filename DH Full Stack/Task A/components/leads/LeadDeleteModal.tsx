"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { LeadItem } from "@/types/lead";
import { deleteLeadAction } from "@/app/actions/lead-actions";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface LeadDeleteModalProps {
  lead: LeadItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export function LeadDeleteModal({
  lead,
  isOpen,
  onClose,
  onDeleted,
}: LeadDeleteModalProps) {
  const [deleting, setDeleting] = React.useState(false);

  if (!lead) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteLeadAction(lead.id);
      if (res.success) {
        toast.success(`Lead "${lead.name}" deleted successfully.`);
        onDeleted();
        onClose();
      } else {
        toast.error(res.error || "Failed to delete lead.");
      }
    } catch {
      toast.error("Error deleting lead.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Lead Confirmation"
      maxWidth="md"
    >
      <div className="space-y-4 text-slate-200">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
          <p className="text-xs sm:text-sm">
            This action cannot be undone. This will permanently remove{" "}
            <strong className="text-white">{lead.name}</strong> ({lead.email}) from the CRM database.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete} isLoading={deleting}>
            Confirm Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
