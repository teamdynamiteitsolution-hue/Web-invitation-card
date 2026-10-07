import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const transactions = await prisma.paymentTransaction.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        paymentOrder: {
          include: {
            user: {
              select: { id: true, name: true, email: true, phone: true },
            },
            invitation: {
              select: { id: true, title: true, slug: true, status: true, expiresAt: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, transactions });
  } catch (error: any) {
    console.error("Admin payments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { transactionId, action } = body;

    if (!transactionId || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ error: "Invalid action or transactionId" }, { status: 400 });
    }

    const transaction = await prisma.paymentTransaction.findUnique({
      where: { id: transactionId },
      include: { paymentOrder: true },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    if (action === "APPROVE") {
      let durationDays = 15;
      try {
        const itemBreakdown = JSON.parse(transaction.paymentOrder.itemBreakdown || "{}");
        if (itemBreakdown.durationDays) {
          durationDays = Number(itemBreakdown.durationDays) || 15;
        }
      } catch {}

      const activatedAt = new Date();
      const expiresAt = new Date(activatedAt.getTime() + durationDays * 24 * 60 * 60 * 1000);

      await prisma.$transaction([
        prisma.paymentTransaction.update({
          where: { id: transactionId },
          data: { status: "APPROVED" },
        }),
        prisma.paymentOrder.update({
          where: { id: transaction.paymentOrderId },
          data: { status: "SUCCESS" },
        }),
        prisma.invitation.update({
          where: { id: transaction.paymentOrder.invitationId },
          data: { 
            status: "ACTIVE",
            activatedAt,
            expiresAt,
          },
        }),
      ]);
    } else if (action === "REJECT") {
      await prisma.$transaction([
        prisma.paymentTransaction.update({
          where: { id: transactionId },
          data: { status: "REJECTED" },
        }),
        prisma.paymentOrder.update({
          where: { id: transaction.paymentOrderId },
          data: { status: "FAILED" },
        }),
        prisma.invitation.update({
          where: { id: transaction.paymentOrder.invitationId },
          data: { status: "PENDING_PAYMENT" },
        }),
      ]);
    }

    return NextResponse.json({ success: true, message: `Transaction marked as ${action}D` });
  } catch (error: any) {
    console.error("Admin update payment error:", error);
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 });
  }
}
