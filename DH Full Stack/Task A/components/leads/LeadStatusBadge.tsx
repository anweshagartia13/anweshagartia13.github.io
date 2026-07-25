import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Circle, Clock, CheckCircle2 } from "lucide-react";

interface LeadStatusBadgeProps {
  status: string;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const normalized = (status || "NEW").toUpperCase();

  if (normalized === "NEW") {
    return (
      <Badge variant="blue" className="gap-1 px-2.5 py-1">
        <Circle className="w-2 h-2 fill-blue-400 text-blue-400 animate-pulse" />
        <span>New</span>
      </Badge>
    );
  }

  if (normalized === "CONTACTED") {
    return (
      <Badge variant="yellow" className="gap-1 px-2.5 py-1">
        <Clock className="w-3 h-3 text-amber-400" />
        <span>Contacted</span>
      </Badge>
    );
  }

  if (normalized === "CLOSED") {
    return (
      <Badge variant="green" className="gap-1 px-2.5 py-1">
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        <span>Closed</span>
      </Badge>
    );
  }

  return <Badge variant="slate">{status}</Badge>;
}
