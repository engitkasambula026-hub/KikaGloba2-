import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Look up the user
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password credentials." }, { status: 400 });
    }

    // Check if the password matches the hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password credentials." }, { status: 400 });
    }

    // SUCCESS: Record this login event directly into our Activity table for the Dashboard
    await db.activity.create({
      data: {
        userId: user.id,
        action: "User logged into the platform",
      },
    });

    return NextResponse.json({
      message: "Access granted",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}
