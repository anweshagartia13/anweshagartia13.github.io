export type LeadStatus = "NEW" | "CONTACTED" | "CLOSED";
export type BudgetRange = "Under $500" | "$500-$1000" | "$1000-$5000" | "Above $5000";

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

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  closedLeads: number;
  conversionRate: number;
}
