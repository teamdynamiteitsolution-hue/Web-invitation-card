import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { id, name, categoryId, price, previewImageUrl, description, music } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing template ID" }, { status: 400 });
    }

    const existing = await prisma.template.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (categoryId) updateData.categoryId = categoryId;
    if (price !== undefined) updateData.price = parseFloat(price) || 0;
    if (description !== undefined) updateData.description = description;
    if (previewImageUrl) updateData.previewImageUrl = previewImageUrl;

    let currentManifest: any = {};
    try {
      currentManifest = JSON.parse(existing.assetManifest || "{}");
    } catch {
      currentManifest = {};
    }

    if (previewImageUrl) {
      currentManifest.cardAsset = previewImageUrl;
    }

    if (music !== undefined) {
      currentManifest.music = music; // null if removed, or object
    }

    updateData.assetManifest = JSON.stringify(currentManifest);

    const template = await prisma.template.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: template });
  } catch (err: any) {
    console.error("Update template error:", err);
    return NextResponse.json({ error: err.message || "Failed to update card template" }, { status: 500 });
  }
}
