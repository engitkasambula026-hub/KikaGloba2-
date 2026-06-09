import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Please fill in all data fields." }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ message: "Registration successful!", userId: newUser.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong on the server." }, { status: 500 });
  }
}
