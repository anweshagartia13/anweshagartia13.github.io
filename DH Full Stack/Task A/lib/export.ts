import { LeadItem } from "@/types/lead";
import { recordExportAction } from "@/app/actions/lead-actions";

export function exportLeadsToCSV(leads: LeadItem[], filename: string = "leaddesk-pro-leads.csv") {
  if (!leads || leads.length === 0) return;

  const headers = ["ID", "Name", "Email", "Budget", "Status", "Message", "Created At"];

  const rows = leads.map((lead) => [
    lead.id,
    `"${lead.name.replace(/"/g, '""')}"`,
    `"${lead.email.replace(/"/g, '""')}"`,
    `"${lead.budget}"`,
    `"${lead.status}"`,
    `"${lead.message.replace(/"/g, '""')}"`,
    `"${new Date(lead.createdAt).toISOString()}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  recordExportAction(leads.length, "CSV").catch(() => {});
}

export function exportLeadsToExcel(leads: LeadItem[], filename: string = "leaddesk-pro-leads.xls") {
  if (!leads || leads.length === 0) return;

  const headers = ["ID", "Name", "Email", "Budget", "Status", "Message", "Created At"];

  const rows = leads.map((lead) => [
    lead.id,
    lead.name,
    lead.email,
    lead.budget,
    lead.status,
    lead.message,
    new Date(lead.createdAt).toLocaleString(),
  ]);

  const tsvContent = [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n");

  const blob = new Blob([tsvContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  recordExportAction(leads.length, "EXCEL").catch(() => {});
}
