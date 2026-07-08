import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, jobId } = await req.json();

    if (!userId || !jobId) {
      return NextResponse.json({ error: "Missing applicant or job node links" }, { status: 400 });
    }

    // 1. Automate relational mapping in SQLite table structures
    const activeApplication = await db.application.create({
      data: {
        userId: parseInt(userId, 10),
        jobId: parseInt(jobId, 10)
      },
      include: {
        user: true, // Fetch their diaspora residency parameters automatically
        job: true
      }
    });

    console.log(`[JOB NETWORK] Matchmaking Active! ${activeApplication.user.name} applied to ${activeApplication.job.title}`);

    return NextResponse.json({
      success: true,
      message: "Application matched and transmitted to employer dashboard portal.",
      applicationId: activeApplication.id
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: "Job pipeline connection dropped" }, { status: 500 });
  }
}
