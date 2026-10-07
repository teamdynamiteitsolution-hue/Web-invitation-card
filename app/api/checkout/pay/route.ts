import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

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
    const { slug, gateway, senderNumber, trxId, durationDays: rawDurationDays } = body;

    if (!slug) {
      return NextResponse.json({ error: "Invitation slug is required" }, { status: 400 });
    }

    if (!gateway || !["bkash", "nagad", "rocket"].includes(gateway.toLowerCase())) {
      return NextResponse.json({ error: "Valid payment gateway (bKash, Nagad, Rocket) is required" }, { status: 400 });
    }

    if (!senderNumber || typeof senderNumber !== "string" || !senderNumber.trim()) {
      return NextResponse.json({ error: "Sender wallet / mobile number is required" }, { status: 400 });
    }

    if (!trxId || typeof trxId !== "string" || !trxId.trim()) {
      return NextResponse.json({ error: "Transaction ID (TrxID) is required" }, { status: 400 });
    }

    const cleanTrxId = trxId.trim().toUpperCase();
    const cleanSenderNumber = senderNumber.trim();

    // Check if TrxID was already used
    const existingTxn = await prisma.paymentTransaction.findUnique({
      where: { trxId: cleanTrxId },
    });

    if (existingTxn) {
      return NextResponse.json({ 
        error: "This TrxID has already been submitted. Please verify and enter a valid TrxID." 
      }, { status: 400 });
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

    const durationDays = Number(rawDurationDays) || 15;
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

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create payment order record and update invitation status to ACTIVE
    const [paymentOrder, updatedInvitation] = await prisma.$transaction([
      prisma.paymentOrder.create({
        data: {
          orderNumber,
          invitationId: invitation.id,
          userId,
          amount: totalAmount,
          currency: "BDT",
          gateway: gateway.toLowerCase(),
          status: "PENDING",
          itemBreakdown: JSON.stringify({
            cardTitle: invitation.title,
            slug: invitation.slug,
            durationDays,
            senderNumber: cleanSenderNumber,
            trxId: cleanTrxId,
            template: { name: invitation.template?.name, price: templatePrice },
            animation: { name: invitation.animation?.name, price: animationPrice },
            duration: { name: `${durationDays} Days Active (${durationDays === 15 ? 'Standard' : 'Extended'})`, price: durationPrice },
          }),
          transactions: {
            create: {
              trxId: cleanTrxId,
              senderNumber: cleanSenderNumber,
              gatewayRef: `${gateway.toLowerCase()}_ref_${Date.now()}`,
              status: "PENDING",
            },
          },
        },
      }),
      prisma.invitation.update({
        where: { id: invitation.id },
        data: {
          status: "PENDING_PAYMENT",
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
