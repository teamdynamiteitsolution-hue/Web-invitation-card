import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json(); // identifier can be username or email

    if (!identifier || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const cleanIdentifier = identifier.trim();
    const cleanLowerIdentifier = cleanIdentifier.toLowerCase();

    // Check for hardcoded Admin
    if (cleanIdentifier === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      let adminUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: cleanIdentifier },
            { email: "admin@utsab.com" }
          ]
        }
      });

      if (!adminUser) {
        adminUser = await prisma.user.create({
          data: {
            username: cleanIdentifier,
            email: "admin@utsab.com",
            passwordHash: await bcrypt.hash(password, 10),
            name: "Administrator",
            role: "ADMIN"
          }
        });
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
      const token = await new SignJWT({ id: adminUser.id, username: cleanIdentifier, role: "ADMIN" })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret);

      const response = NextResponse.json({ success: true, user: { username: cleanIdentifier, role: "ADMIN" } });
      
      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });
      return response;
    }

    // Normal User Login
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanIdentifier },
          { email: cleanLowerIdentifier },
          { username: cleanIdentifier },
          { username: cleanLowerIdentifier }
        ]
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
    const token = await new SignJWT({ id: user.id, username: user.username, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    const response = NextResponse.json({ success: true, user: { username: user.username, email: user.email } });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
