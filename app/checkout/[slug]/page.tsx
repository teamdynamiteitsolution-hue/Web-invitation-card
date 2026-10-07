import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { Header } from "@/components/Header";
import { getOrSeedPaymentMethods } from "@/lib/payment-methods";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect("/login?redirect=/checkout/" + params.slug);
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
  try {
    await jwtVerify(token, secret);
  } catch (err) {
    redirect("/login?redirect=/checkout/" + params.slug);
  }

  const [invitation, durationTiers, paymentMethods] = await Promise.all([
    prisma.invitation.findUnique({
      where: { slug: params.slug },
      include: { 
        template: true,
        animation: true,
        durationTier: true
      }
    }),
    prisma.durationTier.findMany({
      where: { isActive: true },
      orderBy: { days: 'asc' }
    }),
    getOrSeedPaymentMethods()
  ]);

  if (!invitation) return notFound();

  // Calculate default base price
  const total = (invitation.template?.price || 0) + (invitation.animation?.price || 0) + (invitation.durationTier?.price || 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      <Header />
      <CheckoutClient 
        invitation={invitation} 
        total={total} 
        durationTiers={durationTiers}
        initialPaymentMethods={paymentMethods}
      />
    </div>
  );
}
