import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as jose from "jose";
import { cookies } from "next/headers";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_jwt_key_that_is_long_enough");

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jose.jwtVerify(token.value, JWT_SECRET);
    if (!payload.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { templateId, animationId, durationId, title, contentData, revealMode, customImage, bgBlur } = body;

    // Check references
    const template = await prisma.template.findUnique({ where: { id: templateId } });
    const animation = await prisma.animation.findUnique({ where: { id: animationId } });
    const durationTier = await prisma.durationTier.findUnique({ where: { id: durationId } });
    const user = await prisma.user.findUnique({ where: { id: payload.id as string } });

    if (!template || !animation || !durationTier || !user) {
      return NextResponse.json({ error: "Invalid data references" }, { status: 400 });
    }

    // Default background fallback
    const background = await prisma.background.findFirst();
    if (!background) {
      return NextResponse.json({ error: "No backgrounds available" }, { status: 500 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationTier.days);

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    const invitation = await prisma.invitation.create({
      data: {
        userId: user.id,
        templateId: template.id,
        animationId: animation.id,
        durationTierId: durationTier.id,
        backgroundId: background.id,
        slug,
        title,
        eventData: JSON.stringify(contentData),
        revealMode: revealMode || null,
        customImage: customImage || null,
        bgBlur: bgBlur ? parseInt(bgBlur, 10) : 0,
        styleConfig: "{}",
        status: "DRAFT",
        expiresAt,
      },
    });

    return NextResponse.json({ success: true, data: invitation });
  } catch (error: any) {
    console.error("Error creating invitation:", error);
    return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  }
}
