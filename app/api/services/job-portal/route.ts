import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET ROUTE: Dynamically queries verified opportunities across the globe
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get("type"); // "JOB", "SCHOLARSHIP", or "RESEARCH_INTERNSHIP"

    const dataPayload = await prisma.opportunity.findMany({
      where: {
        isVetted: true, // Safeguard: Only return legally approved vacancies
        ...(filterType && { type: filterType }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(dataPayload, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Ecosystem read timeout: ${error.message}` }, { status: 500 });
  }
}

// 2. POST ROUTE: Captures incoming user application metrics cleanly
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userEmail, opportunityId, resumeUrl, proposalText } = body;

    if (!userId || !userEmail || !opportunityId || !resumeUrl) {
      return NextResponse.json(
        { error: "Validation Rejected: Missing application documentation or profile keys." },
        { status: 400 }
      );
    }

    const secureApplication = await prisma.jobApplication.create({
      data: {
        userId,
        userEmail,
        opportunityId,
        resumeUrl,
        proposalText: proposalText || "Submitted via KiKa Global Portal Intermediary Node.",
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application metrics logged cleanly. Dossier transmitted to host network.",
      applicationId: secureApplication.id,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: `Transaction aborted: ${error.message}` }, { status: 500 });
  }
}
