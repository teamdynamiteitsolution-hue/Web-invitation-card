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
    const { id, name, price, previewPosterUrl, videoUrl, description } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing animation ID" }, { status: 400 });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (price !== undefined) updateData.price = parseFloat(price) || 0;
    if (description !== undefined) updateData.description = description;
    if (previewPosterUrl) updateData.previewPosterUrl = previewPosterUrl;
    if (videoUrl) updateData.videoUrl = videoUrl;

    const animation = await prisma.animation.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: animation });
  } catch (err: any) {
    console.error("Update animation error:", err);
    return NextResponse.json({ error: err.message || "Failed to update animation" }, { status: 500 });
  }
}
