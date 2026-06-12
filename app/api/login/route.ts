import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
 // Uses the Prisma client from your lib folder
// import bcrypt from 'bcrypt'; // Uncomment this if you are encrypting passwords

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 2. Find user in your Prisma database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Check password 
    // If using bcrypt: const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = user.password === password; // Plain text check (Update to bcrypt later!)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Login Successful
    return NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
