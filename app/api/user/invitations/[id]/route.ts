import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getUser() {
  const token = cookies().get('auth_token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const invitation = await prisma.invitation.findUnique({
      where: { id: params.id }
    });

    if (!invitation || invitation.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: invitation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invitation" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const invitation = await prisma.invitation.findUnique({
      where: { id: params.id }
    });

    if (!invitation || invitation.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    
    // Only allow updating eventData (the content) and other configurable fields
    const updated = await prisma.invitation.update({
      where: { id: params.id },
      data: {
        eventData: body.contentData ? JSON.stringify(body.contentData) : undefined,
        revealMode: body.revealMode !== undefined ? body.revealMode : undefined,
        customImage: body.customImage !== undefined ? body.customImage : undefined,
        bgBlur: body.bgBlur !== undefined ? Number(body.bgBlur) : undefined,
        animationId: body.animationId !== undefined ? body.animationId : undefined,
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update invitation" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const invitation = await prisma.invitation.findUnique({
      where: { id: params.id }
    });

    if (!invitation || invitation.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Cascade delete any transactions & payment orders for this invitation
    const orders = await prisma.paymentOrder.findMany({
      where: { invitationId: params.id },
      select: { id: true },
    });
    const orderIds = orders.map((o) => o.id);

    await prisma.$transaction([
      prisma.paymentTransaction.deleteMany({
        where: { paymentOrderId: { in: orderIds } },
      }),
      prisma.paymentOrder.deleteMany({
        where: { invitationId: params.id },
      }),
      prisma.invitation.delete({
        where: { id: params.id },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("User invitation delete error:", error);
    return NextResponse.json({ error: "Failed to delete invitation" }, { status: 500 });
  }
}
