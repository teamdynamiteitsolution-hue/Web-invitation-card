import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as string;

    const body = await req.json();
    const { slug, gateway } = body;

    if (!slug) {
      return NextResponse.json({ error: "Invitation slug is required" }, { status: 400 });
    }

    const invitation = await prisma.invitation.findUnique({
      where: { slug },
      include: {
        template: true,
        animation: true,
        durationTier: true,
      },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    if (invitation.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const durationDays = Number(body.durationDays) || 15;
    const durationPricing: Record<number, number> = {
      15: 0,
      20: 100,
      30: 200,
      45: 350,
      60: 500,
    };
    const durationPrice = durationPricing[durationDays] ?? 0;

    // Calculate total price
    const templatePrice = invitation.template?.price || 0;
    const animationPrice = invitation.animation?.price || 0;
    const totalAmount = templatePrice + animationPrice + durationPrice;

    const activatedAt = new Date();
    const expiresAt = new Date(activatedAt.getTime() + durationDays * 24 * 60 * 60 * 1000);

    // Generate unique order number and transaction ID
    const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const trxId = `TRX-${(gateway || 'MFS').toUpperCase()}-${Date.now()}`;

    // Create payment order record and update invitation status to ACTIVE
    const [paymentOrder, updatedInvitation] = await prisma.$transaction([
      prisma.paymentOrder.create({
        data: {
          orderNumber,
          invitationId: invitation.id,
          userId,
          amount: totalAmount,
          currency: "BDT",
          gateway: gateway || "bkash",
          status: "SUCCESS",
          itemBreakdown: JSON.stringify({
            cardTitle: invitation.title,
            slug: invitation.slug,
            durationDays,
            template: { name: invitation.template?.name, price: templatePrice },
            animation: { name: invitation.animation?.name, price: animationPrice },
            duration: { name: `${durationDays} Days Active (${durationDays === 15 ? 'Standard' : 'Extended'})`, price: durationPrice },
          }),
          transactions: {
            create: {
              trxId,
              gatewayRef: `${gateway || 'mfs'}_ref_${Date.now()}`,
              status: "SUCCESS",
            },
          },
        },
      }),
      prisma.invitation.update({
        where: { id: invitation.id },
        data: {
          status: "ACTIVE",
          activatedAt,
          expiresAt,
          calculatedPrice: totalAmount,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        invitation: updatedInvitation,
        paymentOrder,
      },
    });
  } catch (error: any) {
    console.error("Payment processing error:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
