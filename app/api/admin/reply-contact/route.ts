import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, reply } = await req.json();

    if (!id || !reply) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: {
        adminReply: reply,
        status: 'REPLIED'
      }
    });

    return NextResponse.json({ success: true, message: updatedMessage });
  } catch (error) {
    console.error('Reply contact error:', error);
    return NextResponse.json({ error: 'Failed to reply to message' }, { status: 500 });
  }
}
