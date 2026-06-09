import { prisma } from '../../../lib/prisma'; //  This is correct

import { cookies } from "next/headers";

export async function GET() {
  const email = cookies().get("userEmail")?.value;

  if (!email) {
    return Response.json(
      { success: false, message: "Not logged in" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return Response.json({ success: false }, { status: 404 });
  }

  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    include: { job: true },
  });

  return Response.json({ success: true, applications });
}