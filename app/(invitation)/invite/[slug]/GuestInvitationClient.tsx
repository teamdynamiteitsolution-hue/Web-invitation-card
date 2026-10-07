"use client";

import React from "react";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import DynamicCardExperience from "@/experiences/dynamic-card";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";
import { AudioPlayer } from "@/components/AudioPlayer";

interface GuestInvitationClientProps {
  canonical: any;
  revealMode?: string;
  customImage?: string | null;
  bgBlur?: number;
  isPreview?: boolean;
}

export default function GuestInvitationClient({
  canonical,
  revealMode = "auto",
  customImage,
  bgBlur = 0,
  isPreview = false,
}: GuestInvitationClientProps) {
  const { template, animation, eventData, isScroll, experienceType, music } = canonical;

  if (isScroll || experienceType === "scroll" || experienceType === "scroll_story") {
    return (
      <main className="w-full min-h-screen bg-[#FAF8F5]">
        <ScrollExperience 
          template={template}
          animation={animation}
          eventData={eventData}
          skipAnimation={isPreview}
        />
        {music && <AudioPlayer music={music} triggerPlay={true} />}
      </main>
    );
  }

  let ExperienceComponent: any = EnvelopeRoyal;
  if (experienceType === "curtain") ExperienceComponent = TheatricalCurtain;
  if (experienceType === "multi_scratch") ExperienceComponent = MultiScratch;
  if (experienceType === "dynamic_card") ExperienceComponent = DynamicCardExperience;

  return (
    <main className="min-h-screen w-full bg-[#181312] overflow-hidden flex items-center justify-center p-0 md:p-4 select-none relative">
      <div className="relative w-full max-w-[420px] aspect-[4/5] max-h-[92vh] flex items-center justify-center">
        <ExperienceComponent 
          template={template} 
          animation={animation}
          eventData={eventData} 
          revealMode={revealMode}
          customImage={customImage || eventData?.couplePhoto}
          bgBlur={bgBlur}
          skipAnimation={isPreview}
        />
      </div>
      {music && <AudioPlayer music={music} triggerPlay={true} />}
    </main>
  );
}
