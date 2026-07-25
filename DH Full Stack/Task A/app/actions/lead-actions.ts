"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { leadSchema, updateLeadStatusSchema, LeadFormData } from "@/lib/validations/lead";
import { sendLeadNotificationEmail } from "@/lib/email";
import { LeadItem, LeadStats } from "@/types/lead";

export async function createLeadAction(data: LeadFormData) {
  try {
    const validatedData = leadSchema.parse(data);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name.trim(),
        email: validatedData.email.trim().toLowerCase(),
        budget: validatedData.budget,
        message: validatedData.message.trim(),
        status: "NEW",
      },
    });

    // Send email notification asynchronously via Resend
    try {
      await sendLeadNotificationEmail({
        name: lead.name,
        email: lead.email,
        budget: lead.budget,
        message: lead.message,
        createdAt: lead.createdAt,
      });
    } catch (emailErr) {
      console.error("Failed to send lead email notification:", emailErr);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/analytics");

    return {
      success: true,
      message: "Your request has been submitted successfully!",
      leadId: lead.id,
    };
  } catch (error: any) {
    console.error("Error creating lead:", error);
    if (error?.errors) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation failed.",
      };
    }
    return {
      success: false,
      error: "Failed to submit lead. Please try again later.",
    };
  }
}

export async function updateLeadStatusAction(id: string, newStatus: string) {
  try {
    const validated = updateLeadStatusSchema.parse({ id, status: newStatus });

    const updatedLead = await prisma.lead.update({
      where: { id: validated.id },
      data: { status: validated.status },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/analytics");

    return {
      success: true,
      lead: updatedLead,
    };
  } catch (error: any) {
    console.error("Error updating lead status:", error);
    return {
      success: false,
      error: "Failed to update lead status.",
    };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    await prisma.lead.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/analytics");

    return {
      success: true,
      message: "Lead deleted successfully.",
    };
  } catch (error: any) {
    console.error("Error deleting lead:", error);
    return {
      success: false,
      error: "Failed to delete lead.",
    };
  }
}

export async function getLeadsAction(params?: {
  search?: string;
  status?: string;
  budget?: string;
  sortBy?: "latest" | "oldest" | "alphabetical";
  page?: number;
  pageSize?: number;
}) {
  try {
    const search = params?.search?.trim() || "";
    const status = params?.status || "ALL";
    const budget = params?.budget || "ALL";
    const sortBy = params?.sortBy || "latest";
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
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

    const leads = await prisma.lead.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalLeads / pageSize) || 1;

    return {
      success: true,
      leads: leads as LeadItem[],
      totalLeads,
      totalPages,
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return {
      success: false,
      leads: [],
      totalLeads: 0,
      totalPages: 1,
      currentPage: 1,
      error: "Failed to load leads from database.",
    };
  }
}

export async function getLeadStatsAction(): Promise<{
  success: boolean;
  stats: LeadStats;
  statusDistribution: { status: string; count: number; color: string }[];
  budgetDistribution: { budget: string; count: number }[];
  monthlyData: { month: string; leads: number; closed: number }[];
}> {
  try {
    const allLeads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    const totalLeads = allLeads.length;
    const newLeads = allLeads.filter((l) => l.status === "NEW").length;
    const contactedLeads = allLeads.filter((l) => l.status === "CONTACTED").length;
    const closedLeads = allLeads.filter((l) => l.status === "CLOSED").length;
    const conversionRate = totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0;

    const statusDistribution = [
      { status: "New", count: newLeads, color: "#3b82f6" },
      { status: "Contacted", count: contactedLeads, color: "#eab308" },
      { status: "Closed", count: closedLeads, color: "#10b981" },
    ];

    const budgetCounts: Record<string, number> = {
      "Under $500": 0,
      "$500-$1000": 0,
      "$1000-$5000": 0,
      "Above $5000": 0,
    };

    allLeads.forEach((lead) => {
      if (budgetCounts[lead.budget] !== undefined) {
        budgetCounts[lead.budget]++;
      }
    });

    const budgetDistribution = Object.keys(budgetCounts).map((key) => ({
      budget: key,
      count: budgetCounts[key],
    }));

    // Group by month for chart
    const monthMap: Record<string, { leads: number; closed: number }> = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Default last 6 months
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = `${months[d.getMonth()]}`;
      monthMap[label] = { leads: 0, closed: 0 };
    }

    allLeads.forEach((lead) => {
      const created = new Date(lead.createdAt);
      const label = months[created.getMonth()];
      if (monthMap[label]) {
        monthMap[label].leads++;
        if (lead.status === "CLOSED") {
          monthMap[label].closed++;
        }
      }
    });

    const monthlyData = Object.keys(monthMap).map((m) => ({
      month: m,
      leads: monthMap[m].leads,
      closed: monthMap[m].closed,
    }));

    return {
      success: true,
      stats: {
        totalLeads,
        newLeads,
        contactedLeads,
        closedLeads,
        conversionRate,
      },
      statusDistribution,
      budgetDistribution,
      monthlyData,
    };
  } catch (error: any) {
    console.error("Error calculating lead stats:", error);
    return {
      success: false,
      stats: { totalLeads: 0, newLeads: 0, contactedLeads: 0, closedLeads: 0, conversionRate: 0 },
      statusDistribution: [],
      budgetDistribution: [],
      monthlyData: [],
    };
  }
}
