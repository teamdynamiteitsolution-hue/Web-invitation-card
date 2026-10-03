"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { useEditor } from './EditorContext';
import EnvelopeRoyal from '@/experiences/envelope-royal';
import TheatricalCurtain from '@/experiences/theatrical-curtain';
import MultiScratch from '@/experiences/multi-scratch';
import DynamicCardExperience from '@/experiences/dynamic-card';
import ScrollExperience from '@/experiences/scroll-experience/ScrollExperience';
import { getTemplateById } from '@/lib/template-definitions';
import { resolveCanonicalInvitation } from '@/lib/canonical-invitation';
import { AudioPlayer } from '@/components/AudioPlayer';
import { RotateCcw } from 'lucide-react';

export const LivePreview = ({ dbData }: { dbData: any }) => {
  const { selectedTemplateId, selectedAnimationId, eventData, typographyStyles, layoutPresetId, activeTab } = useEditor();
  const [replayKey, setReplayKey] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);

  // Trigger animation replay when animation changes or user switches to animation tab
  useEffect(() => {
    if (activeTab === 'animation') {
      setIsReplaying(true);
      setReplayKey(prev => prev + 1);
    } else {
      setIsReplaying(false);
    }
  }, [activeTab, selectedAnimationId]);

  const handleManualReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReplaying(true);
    setReplayKey(prev => prev + 1);
  };

  const canonical = useMemo(() => {
    const rawTemplate = dbData?.templates?.find((t: any) => t.id === selectedTemplateId) || 
                       getTemplateById(selectedTemplateId) ||
                       dbData?.templates?.[0] || 
                       null;
    const rawAnimation = dbData?.animations?.find((a: any) => a.id === selectedAnimationId) || null;

    return resolveCanonicalInvitation({
      template: rawTemplate,
      selectedTemplateId,
      animation: rawAnimation,
      eventData,
      typographyStyles,
      layoutPresetId
    });
  }, [dbData, selectedTemplateId, selectedAnimationId, eventData, typographyStyles, layoutPresetId]);

  const { template, animation, isScroll, experienceType } = canonical;

  if (!template) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#7C7267] font-serif italic text-lg">
        Please select a design to preview
      </div>
    );
  }

  let ExperienceComponent: any = EnvelopeRoyal;
  if (experienceType === 'curtain') ExperienceComponent = TheatricalCurtain;
  if (experienceType === 'multi_scratch') ExperienceComponent = MultiScratch;
  if (experienceType === 'dynamic_card') ExperienceComponent = DynamicCardExperience;
  if (isScroll || experienceType === 'scroll' || experienceType === 'scroll_story') {
    ExperienceComponent = ScrollExperience;
  }

  const isImmersive = experienceType === 'immersive';
  const shouldSkipAnimation = activeTab !== 'animation' && !isReplaying;

  const containerClass = isScroll
    ? "w-full h-full md:max-w-[420px] md:max-h-[860px] relative shadow-none md:shadow-2xl rounded-none md:rounded-[32px] overflow-y-auto overflow-x-hidden bg-[#FAF8F5] ring-0 md:ring-8 md:ring-[#D4AF37]/20 transform transition-all mx-auto scroll-smooth group"
    : !isImmersive
    ? "w-full h-full md:max-w-[420px] md:max-h-[860px] relative shadow-none md:shadow-2xl rounded-none md:rounded-[32px] overflow-hidden bg-[#FAF8F5] ring-0 md:ring-8 md:ring-[#D4AF37]/20 transform transition-all mx-auto group"
    : "w-full h-full relative overflow-hidden bg-[#FAF8F5] transform transition-all group";

  return (
    <div className={containerClass}>
      {/* Floating Replay Opening Button */}
      <button
        onClick={handleManualReplay}
        className="absolute top-3 right-3 z-40 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white/90 hover:text-white px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-lg border border-white/20 active:scale-95 cursor-pointer opacity-80 hover:opacity-100"
        title="Replay Opening Animation"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Replay Opening</span>
      </button>

      <ExperienceComponent 
        key={`${selectedAnimationId}-${selectedTemplateId}-${replayKey}`}
        template={template} 
        animation={animation}
        eventData={{ ...eventData, typographyStyles, layoutPresetId: canonical.layoutPresetId }} 
        revealMode="auto"
        skipAnimation={shouldSkipAnimation}
      />
      {canonical.music && <AudioPlayer music={canonical.music} />}
    </div>
  );
};
