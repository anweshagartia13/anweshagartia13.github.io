import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validations/lead";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "ALL";

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (status !== "ALL") {
      where.status = status;
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads from database." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name.trim(),
        email: validatedData.email.trim().toLowerCase(),
        budget: validatedData.budget,
        message: validatedData.message.trim(),
        status: "NEW",
      },
    });

    // Fire email alert asynchronously
    sendLeadNotificationEmail(lead).catch((err) =>
      console.error("API Email send error:", err)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        lead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error?.errors) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message || "Invalid payload data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
