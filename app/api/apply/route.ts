import { prisma } from '../../../lib/prisma'; //  This is correct

import { cookies } from "next/headers";

export async function POST(req: Request) {
  const email = cookies().get("userEmail")?.value;

  if (!email) {
    return Response.json(
      { success: false, message: "Not logged in" },
      { status: 401 }
    );
  }

  const { jobId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return Response.json({ success: false }, { status: 404 });
  }

  await prisma.application.create({
    data: {
      userId: user.id,
      jobId,
    },
  });

  return Response.json({ success: true });
}