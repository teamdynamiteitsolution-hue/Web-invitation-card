import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_jwt_key_that_is_long_enough");

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jose.jwtVerify(token.value, JWT_SECRET);
    if (!payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmPassword } = await req.json();
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Since we can't import bcrypt here for compare without checking if it's there, we'll assume bcryptjs has compare
    const bcrypt = await import("bcryptjs");
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
    }

    const passwordHash = await hash(newPassword, 10);

    await prisma.user.update({
      where: { id: payload.userId as string },
      data: { passwordHash },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
