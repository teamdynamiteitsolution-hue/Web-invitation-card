"use client";

import React, { useMemo } from 'react';
import { useEditor } from './EditorContext';
import EnvelopeRoyal from '@/experiences/envelope-royal';
import TheatricalCurtain from '@/experiences/theatrical-curtain';
import MultiScratch from '@/experiences/multi-scratch';
import DynamicCardExperience from '@/experiences/dynamic-card';
import ScrollExperience from '@/experiences/scroll-experience/ScrollExperience';

export const LivePreview = ({ dbData }: { dbData: any }) => {
  const { selectedTemplateId, selectedAnimationId, eventData, typographyStyles, layoutPresetId, activeTab } = useEditor();

  const template = useMemo(() => {
    return dbData?.templates?.find((t: any) => t.id === selectedTemplateId) || null;
  }, [dbData, selectedTemplateId]);

  const animation = useMemo(() => {
    return dbData?.animations?.find((a: any) => a.id === selectedAnimationId) || null;
  }, [dbData, selectedAnimationId]);

  if (!template) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#7C7267] font-serif italic text-lg">
        Please select a design to preview
      </div>
    );
  }

  const expType = template.experienceType;
  
  let ExperienceComponent: any = EnvelopeRoyal;
  if (expType === 'curtain') ExperienceComponent = TheatricalCurtain;
  if (expType === 'multi_scratch') ExperienceComponent = MultiScratch;
  if (expType === 'dynamic_card') ExperienceComponent = DynamicCardExperience;
  if (expType === 'SCROLL' || expType === 'scroll_story' || expType === 'scroll') {
    ExperienceComponent = ScrollExperience;
  }

  const isScroll = expType === 'SCROLL' || expType === 'scroll_story' || expType === 'scroll';
  const isImmersive = expType === 'IMMERSIVE' || expType === 'immersive';
  
  const containerClass = isScroll
    ? "w-full h-full max-w-[420px] max-h-[850px] relative shadow-2xl rounded-[32px] overflow-y-auto overflow-x-hidden bg-[#FAF8F5] ring-8 ring-[#D4AF37]/20 transform transition-all mx-auto scroll-smooth"
    : !isImmersive
    ? "w-full h-full max-w-[420px] max-h-[850px] relative shadow-2xl rounded-[32px] overflow-hidden bg-[#FAF8F5] ring-8 ring-[#D4AF37]/20 transform transition-all mx-auto"
    : "w-full h-full relative overflow-hidden bg-[#FAF8F5] transform transition-all";

  // Pass everything so the experience component can react to live data
  return (
    <div className={containerClass}>
      {/* 
        The ExperienceComponent is responsible for rendering the correct layout
        (Card, Scroll, Immersive) based on its internal design.
        We pass eventData directly which includes custom photos, texts, etc. 
      */}
      <ExperienceComponent 
        template={template} 
        animation={animation}
        eventData={{ ...eventData, typographyStyles, layoutPresetId }} 
        revealMode="auto"
        skipAnimation={activeTab !== 'animation'}
      />
    </div>
  );
};
