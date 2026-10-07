import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

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
      where: { id }
    });

    if (!animation) {
      return NextResponse.json({ error: 'Animation not found' }, { status: 404 });
    }

    // 1. Find all invitations linked to this animation
    const invitations = await prisma.invitation.findMany({
      where: { animationId: id },
      select: { id: true }
    });
    const invitationIds = invitations.map(i => i.id);

    if (invitationIds.length > 0) {
      // Find orders linked to these invitations
      const orders = await prisma.paymentOrder.findMany({
        where: { invitationId: { in: invitationIds } },
        select: { id: true }
      });
      const orderIds = orders.map(o => o.id);

      if (orderIds.length > 0) {
        await prisma.paymentTransaction.deleteMany({
          where: { paymentOrderId: { in: orderIds } }
        });
        await prisma.paymentOrder.deleteMany({
          where: { id: { in: orderIds } }
        });
      }

      await prisma.invitation.deleteMany({
        where: { id: { in: invitationIds } }
      });
    }

    // 2. Clean up animation compatibilities
    await prisma.animationCompatibility.deleteMany({
      where: { animationId: id }
    });

    // 3. Delete the animation
    await prisma.animation.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete animation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete animation' }, { status: 500 });
  }
}
