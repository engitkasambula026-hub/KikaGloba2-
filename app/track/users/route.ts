import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handles loading the logs onto the Dashboard
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdStr = searchParams.get("userId");
    if (!userIdStr) return NextResponse.json({ error: "Missing User ID" }, { status: 401 });

    const userId = parseInt(userIdStr, 10);
    const userLogs = await db.activity.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
    });
    return NextResponse.json({ logs: userLogs });
  } catch (err) {
    return NextResponse.json({ error: "Database reading failed" }, { status: 500 });
  }
}

// Handles tracking clicks on the homepage
export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json();
    if (!userId || !action) return NextResponse.json({ error: "Missing inputs" }, { status: 400 });

    const newLog = await db.activity.create({
      data: {
        userId: parseInt(userId, 10),
        action: action,
      },
    });
    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Database logging failed" }, { status: 500 });
  }
}
