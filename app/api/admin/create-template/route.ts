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
    const { name, categoryId, price, previewImageUrl, experienceType, description, revealMode, photoFrameStyle } = body;

    if (!name || !categoryId || !previewImageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
    const chosenRevealMode = revealMode || "sequential";

    const template = await prisma.template.create({
      data: {
        slug,
        name,
        description: description || "Custom template created via Admin Panel",
        categoryId,
        price: parseFloat(price) || 0,
        previewImageUrl,
        archetype: photoFrameStyle || "arch_portrait",
        experienceType: experienceType || "dynamic_card",
        assetManifest: JSON.stringify({ 
          cardAsset: previewImageUrl, 
          decorations: [],
          revealMode: chosenRevealMode,
          photoFrameStyle: photoFrameStyle || "arch_portrait"
        }),
        visualIdentity: JSON.stringify({ theme: "royal" }),
        openingConfig: JSON.stringify({ revealMode: chosenRevealMode }),
        layoutConfig: JSON.stringify({ nodes: [], layoutPresetId: photoFrameStyle || 'arch_portrait' }),
        fieldsSchema: JSON.stringify({}),
        styleConstraints: JSON.stringify({}),
        supportedRevealModes: JSON.stringify([chosenRevealMode]),
      },
    });

    return NextResponse.json({ success: true, data: template });
  } catch (err: any) {
    console.error("Create template error:", err);
    return NextResponse.json({ error: err.message || "Failed to create card template" }, { status: 500 });
  }
}
