import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

    const { type, id, price } = await req.json();

    if (!type || !id || price === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newPrice = parseFloat(price);

    if (type === 'template') {
      const existing = await prisma.template.findFirst({
        where: {
          OR: [{ id }, { slug: id }]
        }
      });
      if (existing) {
        await prisma.template.update({ where: { id: existing.id }, data: { price: newPrice } });
      } else {
        const defaultCat = await prisma.eventCategory.findFirst();
        await prisma.template.create({
          data: {
            slug: id,
            name: id,
            price: newPrice,
            previewImageUrl: '/assets/Cards/card 1.png',
            archetype: 'scroll_story',
            experienceType: 'SCROLL',
            categoryId: defaultCat?.id || '',
            assetManifest: '{}',
            visualIdentity: '{}',
            openingConfig: '{}',
            layoutConfig: '{}',
            fieldsSchema: '{}',
            styleConstraints: '{}',
          }
        });
      }
    } else if (type === 'animation') {
      await prisma.animation.update({ where: { id }, data: { price: newPrice } });
    } else if (type === 'duration') {
      await prisma.durationTier.update({ where: { id }, data: { price: newPrice } });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Admin update price error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
