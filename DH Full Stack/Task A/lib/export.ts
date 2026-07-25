import { LeadItem } from "@/types/lead";

export function exportLeadsToCSV(leads: LeadItem[], filename = "leaddesk-leads.csv") {
  if (!leads || leads.length === 0) {
    return;
  }

  const headers = ["ID", "Full Name", "Email Address", "Budget", "Status", "Message", "Created At"];

  const rows = leads.map((lead) => [
    lead.id,
    `"${lead.name.replace(/"/g, '""')}"`,
    `"${lead.email.replace(/"/g, '""')}"`,
    `"${lead.budget.replace(/"/g, '""')}"`,
    `"${lead.status}"`,
    `"${(lead.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    `"${new Date(lead.createdAt).toISOString()}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
