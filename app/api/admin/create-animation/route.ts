import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { name, price, previewPosterUrl, videoUrl, description, interactionType } = body;

    if (!name || !videoUrl) {
      return NextResponse.json({ error: "Missing required animation fields (name, videoUrl)" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const animation = await prisma.animation.create({
      data: {
        slug,
        name,
        description: description || "Opening animation created via Admin Panel",
        price: parseFloat(price) || 0,
        previewPosterUrl: previewPosterUrl || "/assets/Opening animation/ChatGPT Image Sep 28, 2026, 10_28_18 PM.png",
        pluginKey: "video",
        interactionType: interactionType || "video",
        videoUrl,
      },
    });

    return NextResponse.json({ success: true, data: animation });
  } catch (err: any) {
    console.error("Create animation error:", err);
    return NextResponse.json({ error: err.message || "Failed to create animation" }, { status: 500 });
  }
}
