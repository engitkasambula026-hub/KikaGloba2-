import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const activeJobs = await db.job.findMany();
    return NextResponse.json({ jobs: activeJobs }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to read data stream from SQLite database." }, { status: 500 });
  }
}
