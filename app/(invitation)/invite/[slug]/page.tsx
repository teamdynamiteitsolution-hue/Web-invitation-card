import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import DynamicCardExperience from "@/experiences/dynamic-card";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";

const prisma = new PrismaClient();

export default async function GuestInvitationPage({ params }: { params: { slug: string } }) {
  const invitation = await prisma.invitation.findUnique({
    where: { slug: params.slug },
    include: { template: true, animation: true }
  });

  if (!invitation) return notFound();
  
  const expType = (invitation.template.experienceType || '').toLowerCase();
  const eventData = invitation.eventData ? JSON.parse(invitation.eventData) : {};
  const revealMode = invitation.revealMode;
  const customImage = invitation.customImage;
  const bgBlur = invitation.bgBlur;

  const isScrollExperience = expType === 'scroll' || expType === 'scroll_story';

  if (isScrollExperience) {
    return (
      <main className="w-full min-h-screen bg-[#FAF8F5]">
        <ScrollExperience 
          template={invitation.template}
          animation={invitation.animation}
          eventData={eventData}
          skipAnimation={false}
        />
      </main>
    );
  }

  let ExperienceComponent: any = EnvelopeRoyal;
  if (expType === 'curtain') ExperienceComponent = TheatricalCurtain;
  if (expType === 'multi_scratch') ExperienceComponent = MultiScratch;
  if (expType === 'dynamic_card') ExperienceComponent = DynamicCardExperience;

  return (
    <main className="min-h-screen w-full bg-[#181312] overflow-hidden flex items-center justify-center p-0 md:p-4 select-none">
      <div className="relative w-full max-w-[420px] aspect-[4/5] max-h-[92vh] flex items-center justify-center">
        <ExperienceComponent 
          template={invitation.template} 
          animation={invitation.animation}
          eventData={eventData} 
          revealMode={revealMode}
          customImage={customImage}
          bgBlur={bgBlur}
        />
      </div>
    </main>
  );
}
