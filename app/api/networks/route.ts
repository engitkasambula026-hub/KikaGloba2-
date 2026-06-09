import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 1. GET METHOD: Fetches all listed registry entries from SQLite using a safe Raw query to match your system style
export async function GET() {
  try {
    const list = await db.$queryRawUnsafe(
      `SELECT * FROM NetworkRegistry ORDER BY id DESC`
    );
    return NextResponse.json({ members: list }, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Failed to read database records." }, { status: 500 });
  }
}

// 2. POST METHOD: Validates and inserts your multi-service diaspora records into SQLite
export async function POST(req: Request) {
  try {
    const { userId, fullName, email, phone, country, city, postalCode, fullAddress, sector, businessName } = await req.json();

    // Thorough Validation for high-standard data collection
    if (!fullName || !email || !phone || !country || !city || !fullAddress || !sector) {
      return NextResponse.json({ error: "Missing required fields. Please ensure all location and contact blocks are filled." }, { status: 400 });
    }

    // Write the detailed record into your SQLite Registry Table safely
    // Passing clean fallback checks avoids strict SQLite type parameter bottlenecks
    await db.$executeRawUnsafe(
      `INSERT INTO NetworkRegistry (userId, fullName, email, phone, country, city, postalCode, fullAddress, sector, businessName, createdAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      userId ? parseInt(userId, 10) : null, 
      fullName, 
      email, 
      phone, 
      country, 
      city, 
      postalCode || "", 
      fullAddress, 
      sector, 
      businessName || null
    );

    // Log this action to the User's Live Activity Stream Dashboard
    if (userId) {
      await db.activity.create({
        data: {
          userId: parseInt(userId, 10),
          action: `Registered Business Presence: ${businessName || "Independent"} inside ${city}, ${country} Google Maps Location Index.`,
        },
      });
    }

    return NextResponse.json({ 
      message: "Successfully synchronized with the KIKA Diaspora Global Network Registry!" 
    }, { status: 201 });

  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Failed to record network registry parameters." }, { status: 500 });
  }
}
