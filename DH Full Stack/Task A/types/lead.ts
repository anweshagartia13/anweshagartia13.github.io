export type LeadStatus =
  | "NEW"
  | "QUALIFIED"
  | "CONTACTED"
  | "PROPOSAL_SENT"
  | "CLOSED";

export type BudgetRange =
  | "Under $500"
  | "$500-$1000"
  | "$1000-$5000"
  | "Above $5000";

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AuditLogItem {
  id: string;
  adminId: string;
  adminEmail?: string | null;
  leadId?: string | null;
  action: string;
  details?: string | null;
  timestamp: string | Date;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  contactedLeads: number;
  proposalLeads: number;
  closedLeads: number;
  conversionRate: number;
  todayLeads: number;
  thisWeekLeads: number;
  avgBudget: string;
}
