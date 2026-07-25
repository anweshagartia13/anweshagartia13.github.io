import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, CheckCircle2, Clock, Send, ShieldCheck } from "lucide-react";

interface LeadStatusBadgeProps {
  status: string;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const normalized = status?.toUpperCase() || "NEW";

  switch (normalized) {
    case "NEW":
      return (
        <Badge variant="blue">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>New</span>
        </Badge>
      );
    case "QUALIFIED":
      return (
        <Badge variant="purple">
          <ShieldCheck className="w-3 h-3 text-purple-400" />
          <span>Qualified</span>
        </Badge>
      );
    case "CONTACTED":
      return (
        <Badge variant="warning">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Contacted</span>
        </Badge>
      );
    case "PROPOSAL_SENT":
      return (
        <Badge variant="info">
          <Send className="w-3 h-3 text-cyan-400" />
          <span>Proposal Sent</span>
        </Badge>
      );
    case "CLOSED":
      return (
        <Badge variant="success">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Closed</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="neutral">
          <span>{status}</span>
        </Badge>
      );
  }
}
