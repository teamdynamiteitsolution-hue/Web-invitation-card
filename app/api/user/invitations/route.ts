import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true, email: true, createdAt: true }
    });

    if (!user) {
      const res = NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
      res.cookies.delete('auth_token');
      return res;
    }

    const invitations = await prisma.invitation.findMany({
      where: { userId },
      include: {
        template: true,
        animation: true,
        durationTier: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    const payments = await prisma.paymentOrder.findMany({
      where: { userId },
      include: {
        invitation: {
          select: { title: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const messages = await prisma.contactMessage.findMany({
      where: {
        OR: [
          { userId },
          { email: user.email },
          { email: user.email.toLowerCase() },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    const subscription = await prisma.userSubscription.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: {
        user,
        invitations,
        payments,
        messages,
        subscription,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
