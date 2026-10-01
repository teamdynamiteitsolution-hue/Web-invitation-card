import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const animation = await prisma.animation.findUnique({
      where: { id },
      include: { _count: { select: { invitations: true } } }
    });

    if (!animation) {
      return NextResponse.json({ error: 'Animation not found' }, { status: 404 });
    }

    if (animation._count.invitations > 0) {
      return NextResponse.json({ error: 'Cannot delete animation because it is being used by users.' }, { status: 400 });
    }

    await prisma.animation.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete animation error:', error);
    return NextResponse.json({ error: 'Failed to delete animation' }, { status: 500 });
  }
}
