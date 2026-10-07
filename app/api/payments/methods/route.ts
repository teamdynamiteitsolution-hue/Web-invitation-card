import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrSeedPaymentMethods } from "@/lib/payment-methods";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const methods = await getOrSeedPaymentMethods();
    return NextResponse.json({ success: true, methods });
  } catch (error: any) {
    console.error("Failed to fetch payment methods:", error);
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
    const items = Array.isArray(body) ? body : [body];

    for (const item of items) {
      if (!item.methodId) continue;

      // Ensure fallback sync between legacy and active type
      const activeType = item.accountType || "MERCHANT";
      let resolvedNumber = item.number ?? "";
      let resolvedCounter = item.counter ?? "1";
      let resolvedInstructions = item.instructions ?? "";

      if (activeType === "MERCHANT") {
        resolvedNumber = item.merchantNumber ?? item.number ?? "";
        resolvedCounter = item.merchantCounter ?? item.counter ?? "1";
        resolvedInstructions = item.merchantInstructions ?? item.instructions ?? "";
      } else if (activeType === "PERSONAL") {
        resolvedNumber = item.personalNumber ?? item.number ?? "";
        resolvedInstructions = item.personalInstructions ?? item.instructions ?? "";
      } else if (activeType === "AGENT") {
        resolvedNumber = item.agentNumber ?? item.number ?? "";
        resolvedInstructions = item.agentInstructions ?? item.instructions ?? "";
      }

      await prisma.paymentMethodSetting.upsert({
        where: { methodId: item.methodId },
        update: {
          name: item.name,
          isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
          accountType: activeType,
          number: resolvedNumber,
          counter: resolvedCounter,
          instructions: resolvedInstructions,
          merchantNumber: item.merchantNumber ?? resolvedNumber,
          merchantCounter: item.merchantCounter ?? resolvedCounter,
          merchantInstructions: item.merchantInstructions ?? resolvedInstructions,
          personalNumber: item.personalNumber ?? resolvedNumber,
          personalInstructions: item.personalInstructions ?? resolvedInstructions,
          agentNumber: item.agentNumber ?? resolvedNumber,
          agentInstructions: item.agentInstructions ?? resolvedInstructions,
          displayOrder: Number(item.displayOrder ?? 0),
        },
        create: {
          methodId: item.methodId,
          name: item.name || item.methodId.toUpperCase(),
          isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
          accountType: activeType,
          number: resolvedNumber,
          counter: resolvedCounter,
          instructions: resolvedInstructions,
          merchantNumber: item.merchantNumber ?? resolvedNumber,
          merchantCounter: item.merchantCounter ?? resolvedCounter,
          merchantInstructions: item.merchantInstructions ?? resolvedInstructions,
          personalNumber: item.personalNumber ?? resolvedNumber,
          personalInstructions: item.personalInstructions ?? resolvedInstructions,
          agentNumber: item.agentNumber ?? resolvedNumber,
          agentInstructions: item.agentInstructions ?? resolvedInstructions,
          displayOrder: Number(item.displayOrder ?? 0),
        },
      });
    }

    const updated = await prisma.paymentMethodSetting.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ success: true, methods: updated });
  } catch (error: any) {
    console.error("Failed to update payment methods:", error);
    return NextResponse.json({ error: "Failed to update payment methods" }, { status: 500 });
  }
}
