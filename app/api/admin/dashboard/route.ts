import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const users = await prisma.user.findMany({ 
      include: {
        invitations: { select: { id: true, status: true, calculatedPrice: true } },
        payments: { select: { amount: true, createdAt: true, status: true } }
      } 
    });
    const categories = await prisma.eventCategory.findMany({ select: { id: true, name: true, slug: true } });
    const templates = await prisma.template.findMany({ 
      select: { 
        id: true, 
        slug: true,
        name: true, 
        price: true, 
        previewImageUrl: true, 
        experienceType: true,
        archetype: true,
        assetManifest: true,
        category: { select: { id: true, name: true, slug: true } } 
      } 
    });
    const animations = await prisma.animation.findMany({ select: { id: true, name: true, price: true, previewPosterUrl: true, videoUrl: true } });
    const durations = await prisma.durationTier.findMany({ select: { id: true, name: true, days: true, price: true } });
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });

    return NextResponse.json({ success: true, data: { users, categories, templates, animations, durations, messages } });

  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: "Unauthorized or Internal Server Error" }, { status: 401 });
  }
}
