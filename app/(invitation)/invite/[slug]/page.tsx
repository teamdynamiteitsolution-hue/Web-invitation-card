import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { resolveCanonicalInvitation } from "@/lib/canonical-invitation";
import GuestInvitationClient from "./GuestInvitationClient";

export default async function GuestInvitationPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams?: { preview?: string };
}) {
  const isPreview = searchParams?.preview === "true";

  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    include: { template: true, animation: true }
  });

  if (!invitation) return notFound();

  const now = new Date();
  const isExpired = invitation.status === "EXPIRED" || (invitation.expiresAt && now > new Date(invitation.expiresAt));

  // If card is expired and not in preview mode, display royal Date Expired screen and lazily mark status
  if (isExpired && !isPreview) {
    if (invitation.status !== "EXPIRED") {
      // Lazy background cleanup of heavy data
      try {
        let cleanedEventData = invitation.eventData;
        if (invitation.eventData) {
          const parsed = JSON.parse(invitation.eventData);
          if (parsed.couplePhoto?.startsWith("data:")) parsed.couplePhoto = "/assets/categories/wedding.webp";
          if (parsed.bridePhoto?.startsWith("data:")) parsed.bridePhoto = "/assets/categories/wedding.webp";
          if (parsed.groomPhoto?.startsWith("data:")) parsed.groomPhoto = "/assets/categories/wedding.webp";
          if (parsed.gallery1?.startsWith("data:")) parsed.gallery1 = "/assets/categories/wedding.webp";
          if (parsed.gallery2?.startsWith("data:")) parsed.gallery2 = "/assets/categories/wedding.webp";
          if (parsed.gallery3?.startsWith("data:")) parsed.gallery3 = "/assets/categories/wedding.webp";
          if (parsed.gallery4?.startsWith("data:")) parsed.gallery4 = "/assets/categories/wedding.webp";
          cleanedEventData = JSON.stringify(parsed);
        }
        await prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            status: "EXPIRED",
            customImage: null,
            eventData: cleanedEventData,
          },
        });
      } catch (e) {}
    }

    return (
      <main className="min-h-screen w-full bg-[#FAF8F5] text-[#2C2623] flex items-center justify-center p-6 select-none relative overflow-hidden">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 border border-[#D4AF37]/30 shadow-2xl text-center space-y-6 relative z-10 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-[#D4AF37] text-3xl flex items-center justify-center mx-auto border border-[#D4AF37]/30 shadow-inner-emboss">
            ⌛
          </div>
          
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8C4A52] bg-[#FAF8F5] px-4 py-1.5 rounded-full border border-[#D4AF37]/20">
              Validity Period Expired
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2C2623] pt-2" style={{ fontFamily: 'Cinzel, serif' }}>
              {invitation.title || "Digital Invitation"}
            </h2>
          </div>

          <p className="text-sm text-[#7C7267] font-serif italic leading-relaxed px-2">
            This digital invitation card has reached the end of its active validity duration. The link is no longer accessible.
          </p>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <a 
              href="/" 
              className="w-full py-3.5 px-6 rounded-full bg-[#2C2623] text-white font-bold text-sm hover:bg-[#1a1614] transition-all shadow-elevated-card text-center"
            >
              Explore Our Website
            </a>
          </div>
        </div>
      </main>
    );
  }

  // If card is not yet approved by admin and not in preview mode, display elegant pending approval screen
  if (invitation.status !== "ACTIVE" && !isPreview) {
    return (
      <main className="min-h-screen w-full bg-[#FAF8F5] text-[#2C2623] flex items-center justify-center p-6 select-none">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#D4AF37]/30 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 text-2xl flex items-center justify-center mx-auto border border-amber-200 shadow-xs">
            ⏳
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#2C2623]">
            {invitation.status === "PENDING_PAYMENT" ? "Approval Pending" : "Invitation Inactive"}
          </h2>
          <p className="text-sm text-[#7C7267] font-serif italic leading-relaxed">
            {invitation.status === "PENDING_PAYMENT"
              ? "This invitation card's payment and Transaction ID (TrxID) are currently under review by an administrator. The card will become live as soon as the transaction is approved."
              : "This invitation card is currently not active."}
          </p>
        </div>
      </main>
    );
  }
  
  const canonical = resolveCanonicalInvitation(invitation);
  const revealMode = invitation.revealMode || "auto";
  const customImage = invitation.customImage || canonical.eventData?.couplePhoto;
  const bgBlur = invitation.bgBlur;

  return (
    <GuestInvitationClient 
      canonical={canonical}
      revealMode={revealMode}
      customImage={customImage}
      bgBlur={bgBlur}
      isPreview={isPreview}
    />
  );
}
