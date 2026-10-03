"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LivePreview } from './LivePreview';
import { useEditor } from './EditorContext';
import { Loader2, ChevronLeft, ChevronRight, SlidersHorizontal, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEditorAssets } from '@/hooks/useEditorAssets';
import { resolveCanonicalInvitation } from '@/lib/canonical-invitation';
import { getTemplateById } from '@/lib/template-definitions';
import { Skeleton } from '@/components/Skeleton';

export const EditorLayout = () => {
  const { data: dbData, loading } = useEditorAssets();
  const [isSaving, setIsSaving] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const router = useRouter();
  const { setSelectedTemplateId, setSelectedAnimationId, selectedTemplateId, selectedAnimationId, eventData, typographyStyles, layoutPresetId } = useEditor();

  useEffect(() => {
    // If desktop, open panel by default; on mobile keep closed so preview is prominent
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsPanelOpen(true);
    }
  }, []);

  // Set default initial template & animation once on load
  useEffect(() => {
    if (dbData) {
      if (dbData.templates?.length > 0 && !selectedTemplateId) {
        setSelectedTemplateId(dbData.templates[0].id);
      }
      if (dbData.animations?.length > 0 && !selectedAnimationId) {
        setSelectedAnimationId(dbData.animations[0].id);
      }
    }
  }, [dbData, selectedTemplateId, selectedAnimationId, setSelectedTemplateId, setSelectedAnimationId]);

  if (loading || !dbData) {
    return (
      <div className="h-screen flex flex-col bg-[#FAF8F5] overflow-hidden">
        {/* Editor Top Bar Skeleton */}
        <div className="h-14 border-b border-[#D4AF37]/20 px-4 sm:px-6 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md hidden sm:block" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
        </div>

        {/* Editor Body Skeleton */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Tabs Skeleton */}
          <div className="hidden md:flex flex-col w-80 lg:w-96 border-r border-[#D4AF37]/20 bg-white p-4 gap-4">
            <div className="flex gap-2 pb-2 border-b border-gray-100">
              <Skeleton className="h-9 flex-1 rounded-xl" />
              <Skeleton className="h-9 flex-1 rounded-xl" />
              <Skeleton className="h-9 flex-1 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Skeleton className="aspect-[4/5] rounded-xl" />
              <Skeleton className="aspect-[4/5] rounded-xl" />
              <Skeleton className="aspect-[4/5] rounded-xl" />
              <Skeleton className="aspect-[4/5] rounded-xl" />
            </div>
          </div>

          {/* Canvas Preview Skeleton */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-[#FAF8F5]">
            <div className="w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[80vh] bg-white rounded-3xl p-6 shadow-soft-surface flex flex-col items-center justify-center gap-4">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <div className="w-full mt-8 flex flex-col items-center gap-2">
                <Skeleton className="h-10 w-full rounded-2xl" />
                <Skeleton className="h-10 w-3/4 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleConfirmDesign = async () => {
    if (!selectedTemplateId || !dbData?.durations?.length) return;
    
    setIsSaving(true);
    try {
      const defaultDuration = dbData.durations.find((d: any) => d.isDefault) || dbData.durations[0];
      const animId = selectedAnimationId || dbData.animations?.[0]?.id || "default_anim";
      
      // Resolve canonical template definition
      const def = getTemplateById(selectedTemplateId);
      const targetSlug = def?.slug || selectedTemplateId;

      // Find best match in database templates
      const matchedDbTemplate = 
        dbData?.templates?.find((t: any) => t.id === selectedTemplateId) ||
        dbData?.templates?.find((t: any) => t.slug === targetSlug) ||
        dbData?.templates?.find((t: any) => t.slug === selectedTemplateId) ||
        dbData?.templates?.find((t: any) => t.experienceType === def?.experienceType) ||
        dbData?.templates?.[0];

      const targetTemplateId = matchedDbTemplate?.id || selectedTemplateId;

      // Canonical packaging preserving all user choices
      const canonical = resolveCanonicalInvitation({
        template: { ...(matchedDbTemplate || {}), ...(def || {}) },
        selectedTemplateId,
        eventData,
        typographyStyles,
        layoutPresetId
      });

      const payload = {
        templateId: targetTemplateId,
        animationId: animId,
        durationId: defaultDuration.id,
        title: `${eventData?.brideName || 'Lary'} & ${eventData?.groomName || 'John'} Invitation`,
        contentData: { 
          ...eventData, 
          typographyStyles, 
          layoutPresetId: canonical.layoutPresetId, 
          selectedScrollTheme: selectedTemplateId,
          templateSlug: canonical.template.slug,
          templateDefinitionId: canonical.template.id,
          cardAsset: canonical.template.assetManifest?.cardAsset,
          music: canonical.music
        },
        revealMode: "auto",
        customImage: eventData?.couplePhoto || null,
        bgBlur: 0
      };

      const res = await fetch('/api/user/invitations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data?.slug) {
          router.push(`/checkout/${result.data.slug}`);
          return;
        }
      }
      alert("Failed to confirm design. Please try again.");
    } catch (e) {
      console.error(e);
      alert("An error occurred while saving your design.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#FAF8F5]">
      {/* Header */}
      <header className="h-16 md:h-20 bg-white border-b border-[#D4AF37]/20 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-50">
        <div className="flex items-center gap-3 sm:gap-4">
          <h1 className="font-bold text-[#8C4A52] text-xl sm:text-2xl" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>উৎসব</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => router.push('/')} className="px-4 sm:px-5 py-2 rounded-full text-sm font-bold text-[#7C7267] hover:bg-gray-100 transition-colors disabled:opacity-50" disabled={isSaving}>
            Exit
          </button>
          <button onClick={handleConfirmDesign} disabled={isSaving} className="px-5 sm:px-6 py-2 rounded-full text-sm font-bold bg-[#2C2623] text-white shadow-sm hover:bg-[#1a1614] transition-colors flex items-center gap-2">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>Confirm</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        {/* Mobile Slide-over Drawer / Desktop Sticky Sidebar */}
        <aside 
          className={`fixed md:relative inset-y-16 md:inset-y-0 left-0 w-[94vw] max-w-[420px] md:w-[420px] h-[calc(100dvh-4rem)] md:h-full flex-shrink-0 bg-white border-r border-[#D4AF37]/30 z-40 shadow-2xl md:shadow-soft-surface flex flex-col transition-transform duration-300 ease-in-out ${
            isPanelOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar dbData={dbData} />
        </aside>

        {/* Backdrop for Mobile Drawer when Open */}
        {isPanelOpen && (
          <div 
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 top-16 bg-black/50 backdrop-blur-xs z-30 md:hidden animate-fade-in"
          />
        )}

        {/* Dedicated Slide Toggle Button Docked on the Left Edge on Mobile */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`md:hidden fixed top-1/2 -translate-y-1/2 z-50 bg-[#2C2623] text-[#D4AF37] p-2.5 rounded-r-2xl shadow-2xl border border-l-0 border-[#D4AF37]/50 flex items-center justify-center transition-all duration-300 ${
            isPanelOpen ? 'left-[min(94vw,420px)]' : 'left-0'
          }`}
          title={isPanelOpen ? "Collapse Editor" : "Open Editor"}
        >
          {isPanelOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Canvas / Live Preview: Full-bleed edge-to-edge on mobile, framed on desktop */}
        <main className="flex-1 h-full bg-[#FAF8F5] md:bg-[#E8D8D0]/30 relative overflow-hidden flex items-center justify-center p-0 md:p-6 lg:p-12">
          <LivePreview dbData={dbData} />
        </main>


      </div>
    </div>
  );
};
