import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch {
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.status || !["NEW", "CONTACTED", "CLOSED"].includes(body.status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value. Must be NEW, CONTACTED, or CLOSED." },
        { status: 400 }
      );
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
