"use server";

import { prisma } from "@/lib/prisma";
import { AuditLogItem } from "@/types/lead";

export async function getAuditLogsAction(limit: number = 50) {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { timestamp: "desc" },
      take: limit,
    });
    return { success: true, logs: logs as AuditLogItem[] };
  } catch {
    return { success: false, logs: [], error: "Failed to fetch audit logs" };
  }
}
