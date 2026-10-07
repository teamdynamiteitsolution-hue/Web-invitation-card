import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      // Return success anyway to prevent email enumeration/harvesting attacks
      return NextResponse.json({ 
        success: true, 
        message: "If an account matches that email, instructions have been sent." 
      });
    }

    // Generate a secure 8-character temporary password
    const tempPassword = Math.random().toString(36).substring(2, 10).toUpperCase();
    const passwordHash = await hash(tempPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Send the password via SMTP Email
    await sendPasswordResetEmail({
      to: user.email,
      username: user.username,
      tempPassword,
    });

    // DO NOT return tempPassword in response for security
    return NextResponse.json({ 
      success: true, 
      message: "If an account matches that email, instructions have been sent." 
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to process password reset" }, { status: 500 });
  }
}
