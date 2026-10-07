import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import DynamicCardExperience from "@/experiences/dynamic-card";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";

import { resolveCanonicalInvitation } from "@/lib/canonical-invitation";
import { AudioPlayer } from "@/components/AudioPlayer";

export default async function GuestInvitationPage({ params }: { params: { slug: string } }) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    include: { template: true, animation: true }
  });

  if (!invitation) return notFound();

  // If card is not yet approved by admin, display elegant pending approval screen
  if (invitation.status !== "ACTIVE") {
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
  const { template: canonicalTemplate, animation: canonicalAnimation, eventData: canonicalEventData, isScroll, experienceType } = canonical;
  const revealMode = invitation.revealMode || "auto";
  const customImage = invitation.customImage || canonicalEventData?.couplePhoto;
  const bgBlur = invitation.bgBlur;

  if (isScroll || experienceType === 'scroll' || experienceType === 'scroll_story') {
    return (
      <main className="w-full min-h-screen bg-[#FAF8F5]">
        <ScrollExperience 
          template={canonicalTemplate}
          animation={canonicalAnimation}
          eventData={canonicalEventData}
          skipAnimation={false}
        />
        {canonical.music && <AudioPlayer music={canonical.music} triggerPlay={true} />}
      </main>
    );
  }

  let ExperienceComponent: any = EnvelopeRoyal;
  if (experienceType === 'curtain') ExperienceComponent = TheatricalCurtain;
  if (experienceType === 'multi_scratch') ExperienceComponent = MultiScratch;
  if (experienceType === 'dynamic_card') ExperienceComponent = DynamicCardExperience;

  return (
    <main className="min-h-screen w-full bg-[#181312] overflow-hidden flex items-center justify-center p-0 md:p-4 select-none relative">
      <div className="relative w-full max-w-[420px] aspect-[4/5] max-h-[92vh] flex items-center justify-center">
        <ExperienceComponent 
          template={canonicalTemplate} 
          animation={canonicalAnimation}
          eventData={canonicalEventData} 
          revealMode={revealMode}
          customImage={customImage}
          bgBlur={bgBlur}
        />
      </div>
      {canonical.music && <AudioPlayer music={canonical.music} triggerPlay={true} />}
    </main>
  );
}
