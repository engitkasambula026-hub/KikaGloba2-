import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; // Ensure 'lib' and 'prisma' are all lowercase


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Validate required inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 2. Normalize input data
    const normalizedEmail = email.toLowerCase().trim();

    // 3. Check if user already exists to avoid duplicates
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 400 }
      );
    }

    // 4. Create the new user record in Prisma
    // Note: It is highly recommended to hash passwords before saving (e.g., using bcrypt)
    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        email: normalizedEmail,
        password: password, // Raw text (Switch to a hashing library when ready!)
      },
    });

    // 5. Success response (Do not return the password string back to the browser!)
    return NextResponse.json(
      {
        message: 'Account created successfully.',
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing registration.' },
      { status: 500 }
    );
  }
}
