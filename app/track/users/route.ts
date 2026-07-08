import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Handles loading logs or returning active members
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdStr = searchParams.get("userId");
    
    if (!userIdStr) {
      const allActiveMembers = await db.user.findMany({
        orderBy: { id: "desc" },
      });
      return NextResponse.json({ success: true, members: allActiveMembers });
    }

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

// Handles tracking clicks on the homepage AND managing Voice Link Onboarding requests safely
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, password, nodeRegion, userId, action } = body;

    // 🛡️ PATHWAY A: Handles Diaspora Voice Link Member Registrations Safely
    if (name && phone && password) {
      const targetEmail = `${phone.trim()}@kika.global`;

      // 1. SAFESTEP: Check if a user with this linked phone/email profile already exists in SQLite
      const existingUser = await db.user.findUnique({
        where: { email: targetEmail },
      });

      if (existingUser) {
        // If they already exist, don't crash! Simply verify the password matches and unlock terminal
        if (existingUser.password === password) {
          return NextResponse.json({ 
            success: true, 
            message: "Existing Proxy Terminal Session Re-synchronized.", 
            member: existingUser 
          }, { status: 200 });
        } else {
          return NextResponse.json({ error: "Invalid password for this active node key." }, { status: 401 });
        }
      }

      // 2. If it's a completely brand new unique number, write it to the ledger
      const newMember = await db.user.create({
        data: {
          name: name,
          email: targetEmail,
          password: password,
          originCountry: nodeRegion || "Uganda",
          hostCountry: "Diaspora Node",
        },
      });

      return NextResponse.json({ 
        success: true, 
        message: "New Proxy Member saved to existing core User model.", 
        member: newMember 
      }, { status: 201 });
    }

    // 📊 PATHWAY B: Original Logic - Tracking general clicks and traffic
    if (!userId || !action) {
      return NextResponse.json({ error: "Missing inputs" }, { status: 400 });
    }

    const newLog = await db.activity.create({
      data: {
        userId: parseInt(userId, 10),
        action: action,
      },
    });
    return NextResponse.json({ success: true, log: newLog }, { status: 201 });

  } catch (err) {
    console.error("Database tracking system operation failure:", err);
    return NextResponse.json({ error: "Database mapping process failed" }, { status: 500 });
  }
}
