"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations/lead";
import { sendLeadNotificationEmail } from "@/lib/email";
import { createAuditLog } from "@/lib/audit";
import { LeadItem, LeadStats } from "@/types/lead";

/**
 * Server Action: Submit a new Lead
 */
export async function createLeadAction(formData: {
  name: string;
  email: string;
  budget: string;
  message: string;
}) {
  try {
    const validatedData = leadSchema.parse(formData);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name.trim(),
        email: validatedData.email.trim().toLowerCase(),
        budget: validatedData.budget,
        message: validatedData.message.trim(),
        status: "NEW",
      },
    });

    // Write Audit Log
    await createAuditLog({
      action: "LEAD_CREATED",
      leadId: lead.id,
      details: `New lead created by ${lead.name} (${lead.email})`,
    });

    // Send email alert asynchronously
    sendLeadNotificationEmail(lead).catch((err) =>
      console.error("Server Action Email send error:", err)
    );

    revalidatePath("/admin");
    revalidatePath("/admin/activity");
    return { success: true, lead };
  } catch (error: any) {
    if (error?.errors) {
      return { success: false, error: error.errors[0]?.message || "Validation Error" };
    }
    return { success: false, error: "Failed to submit lead." };
  }
}

/**
 * Server Action: Get Paginated and Filtered Leads
 */
export async function getLeadsAction(params?: {
  search?: string;
  status?: string;
  budget?: string;
  sortBy?: "latest" | "oldest" | "alphabetical";
  page?: number;
  pageSize?: number;
}) {
  try {
    const {
      search = "",
      status = "ALL",
      budget = "ALL",
      sortBy = "latest",
      page = 1,
      pageSize = 10,
    } = params || {};

    const where: any = {};

    if (search.trim()) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { message: { contains: search } },
      ];
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (budget && budget !== "ALL") {
      where.budget = budget;
    }

    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (sortBy === "alphabetical") {
      orderBy = { name: "asc" };
    }

    const totalLeads = await prisma.lead.count({ where });
    const totalPages = Math.max(1, Math.ceil(totalLeads / pageSize));

    const leads = await prisma.lead.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      success: true,
      leads: leads as LeadItem[],
      totalLeads,
      totalPages,
      currentPage: page,
    };
  } catch {
    return { success: false, error: "Failed to fetch leads", leads: [], totalLeads: 0, totalPages: 1, currentPage: 1 };
  }
}

/**
 * Server Action: Get All Leads for Kanban Board (Unpaginated)
 */
export async function getAllLeadsForKanbanAction() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, leads: leads as LeadItem[] };
  } catch {
    return { success: false, error: "Failed to fetch kanban leads", leads: [] };
  }
}

/**
 * Server Action: Update Lead Status
 */
export async function updateLeadStatusAction(id: string, status: string) {
  try {
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Lead not found" };

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    // Write Audit Log
    await createAuditLog({
      action: "STATUS_UPDATED",
      leadId: id,
      details: `Updated status of ${updatedLead.name} from "${existing.status}" to "${status}"`,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/activity");
    return { success: true, lead: updatedLead as LeadItem };
  } catch {
    return { success: false, error: "Failed to update lead status" };
  }
}

/**
 * Server Action: Record Lead View Event
 */
export async function recordLeadViewAction(id: string) {
  try {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (lead) {
      await createAuditLog({
        action: "LEAD_VIEWED",
        leadId: id,
        details: `Opened lead details modal for ${lead.name} (${lead.email})`,
      });
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * Server Action: Record CSV / Excel Export Event
 */
export async function recordExportAction(count: number, format: "CSV" | "EXCEL" = "CSV") {
  try {
    await createAuditLog({
      action: "EXPORT_GENERATED",
      details: `Generated ${format} report export of ${count} leads`,
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * Server Action: Delete Lead
 */
export async function deleteLeadAction(id: string) {
  try {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) return { success: false, error: "Lead not found" };

    await prisma.lead.delete({ where: { id } });

    // Write Audit Log
    await createAuditLog({
      action: "LEAD_DELETED",
      details: `Deleted lead ${lead.name} (${lead.email})`,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/activity");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete lead" };
  }
}

/**
 * Server Action: Get Dashboard 5-Stage Statistics & Metrics
 */
export async function getLeadStatsAction(): Promise<{ success: boolean; stats: LeadStats }> {
  const fallbackStats: LeadStats = {
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    contactedLeads: 0,
    proposalLeads: 0,
    closedLeads: 0,
    conversionRate: 0,
    todayLeads: 0,
    thisWeekLeads: 0,
    avgBudget: "$1000-$5000",
  };

  try {
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({ where: { status: "NEW" } });
    const qualifiedLeads = await prisma.lead.count({ where: { status: "QUALIFIED" } });
    const contactedLeads = await prisma.lead.count({ where: { status: "CONTACTED" } });
    const proposalLeads = await prisma.lead.count({ where: { status: "PROPOSAL_SENT" } });
    const closedLeads = await prisma.lead.count({ where: { status: "CLOSED" } });

    // Today's leads
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayLeads = await prisma.lead.count({
      where: { createdAt: { gte: startOfToday } },
    });

    // This week's leads
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const thisWeekLeads = await prisma.lead.count({
      where: { createdAt: { gte: startOfWeek } },
    });

    const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

    return {
      success: true,
      stats: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        contactedLeads,
        proposalLeads,
        closedLeads,
        conversionRate,
        todayLeads,
        thisWeekLeads,
        avgBudget: "$2,500 - $5,000",
      },
    };
  } catch {
    return { success: false, stats: fallbackStats };
  }
}
