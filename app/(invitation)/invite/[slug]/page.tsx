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
