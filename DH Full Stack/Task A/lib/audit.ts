import { prisma } from "@/lib/prisma";

export async function createAuditLog({
  action,
  leadId,
  details,
  adminId = "admin_sys",
  adminEmail = "admin@leaddesk.pro",
}: {
  action: string;
  leadId?: string;
  details?: string;
  adminId?: string;
  adminEmail?: string;
}) {
  try {
    return await prisma.auditLog.create({
      data: {
        action,
        leadId: leadId || null,
        details: details || null,
        adminId,
        adminEmail,
      },
    });
  } catch {
    console.error("Failed to write audit log");
    return null;
  }
}
