import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { Header } from "@/components/Header";
import SuccessClient from "./SuccessClient";

const prisma = new PrismaClient();

export default async function SuccessPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect("/login");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
  try {
    await jwtVerify(token, secret);
  } catch (err) {
    redirect("/login");
  }

  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    include: { template: true }
  });

  if (!invitation) return notFound();

  // Determine days left based on expiration date
  const now = new Date();
  const expiresAt = new Date(invitation.expiresAt || new Date());
  const msDiff = expiresAt.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(msDiff / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans">
      <Header />
      <SuccessClient invitation={invitation} daysLeft={daysLeft} />
    </div>
  );
}
