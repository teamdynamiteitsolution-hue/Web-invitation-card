import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let userId: string | null = null;
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('auth_token')?.value;
      if (token) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
        const { payload } = await jwtVerify(token, secret);
        userId = (payload.id as string) || null;
      }
    } catch {
      // Unauthenticated contact submission
    }

    // If no token, check if a registered user exists with this email
    if (!userId && email) {
      const existingUser = await prisma.user.findFirst({
        where: { email: { equals: email.trim() } }
      });
      if (existingUser) {
        userId = existingUser.id;
      }
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email: email.trim(),
        phone: phone || null,
        message,
        userId,
        status: 'UNREAD'
      }
    });

    return NextResponse.json({ success: true, contactMessage });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
