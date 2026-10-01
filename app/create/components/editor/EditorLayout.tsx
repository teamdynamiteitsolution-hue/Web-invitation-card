"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LivePreview } from './LivePreview';
import { useEditor } from './EditorContext';
import { Loader2, ChevronLeft, ChevronRight, SlidersHorizontal, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const EditorLayout = () => {
  const [dbData, setDbData] = useState<{ templates: any[], animations: any[], durations: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const router = useRouter();
  const { setSelectedTemplateId, setSelectedAnimationId, selectedTemplateId, selectedAnimationId, eventData, typographyStyles, layoutPresetId } = useEditor();

  useEffect(() => {
    // Fetch available templates and animations
    const fetchAssets = async () => {
      try {
        const res = await fetch('/api/create');
        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            setDbData(result.data);
            if (result.data.templates?.length > 0) {
              setSelectedTemplateId(result.data.templates[0].id);
            }
            if (result.data.animations?.length > 0) {
              setSelectedAnimationId(result.data.animations[0].id);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load assets", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [setSelectedTemplateId, setSelectedAnimationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader2 className="w-10 h-10 animate-spin text-[#8C4A52]" />
      </div>
    );
  }

  const handleConfirmDesign = async () => {
    if (!selectedTemplateId || !selectedAnimationId || !dbData?.durations?.length) return;
    
    setIsSaving(true);
    try {
      const defaultDuration = dbData.durations.find((d: any) => d.isDefault) || dbData.durations[0];
      
      const payload = {
        templateId: selectedTemplateId,
        animationId: selectedAnimationId,
        durationId: defaultDuration.id,
        title: `${eventData?.brideName || 'Lary'} & ${eventData?.groomName || 'John'} Wedding`,
        contentData: { ...eventData, typographyStyles, layoutPresetId },
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
      alert("An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#FAF8F5]">
      {/* Header */}
      <header className="h-14 bg-white border-b border-[#D4AF37]/20 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-50">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-[#8C4A52] text-xl" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>উৎসব</h1>
          
          {/* Mobile View Toggle Button in Header */}
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/40 bg-stone-100 text-[#2C2623] hover:bg-[#F9F0EC] transition-all"
          >
            {isPanelOpen ? (
              <>
                <Eye className="w-3.5 h-3.5 text-[#8C4A52]" />
                <span>View Card</span>
              </>
            ) : (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C4A52]" />
                <span>Edit Options</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => router.push('/')} className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-[#7C7267] hover:bg-gray-100 transition-colors disabled:opacity-50" disabled={isSaving}>
            Exit
          </button>
          <button onClick={handleConfirmDesign} disabled={isSaving} className="px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#2C2623] text-white shadow-sm hover:bg-[#1a1614] transition-colors flex items-center gap-1.5 sm:gap-2">
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            <span>Confirm</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        {/* Mobile Slide-over Drawer / Desktop Sticky Sidebar */}
        <aside 
          className={`fixed md:relative inset-y-14 md:inset-y-0 left-0 w-[92vw] max-w-[420px] md:w-[420px] h-[calc(100dvh-3.5rem)] md:h-full flex-shrink-0 bg-white border-r border-[#D4AF37]/30 z-40 shadow-2xl md:shadow-soft-surface flex flex-col transition-transform duration-300 ease-in-out ${
            isPanelOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <Sidebar dbData={dbData} />
        </aside>

        {/* Backdrop for Mobile Drawer when Open */}
        {isPanelOpen && (
          <div 
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 top-14 bg-black/40 backdrop-blur-xs z-30 md:hidden animate-fade-in"
          />
        )}

        {/* Dedicated Slide Toggle Button Docked on the Left Edge on Mobile */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`md:hidden fixed top-1/2 -translate-y-1/2 z-50 bg-[#2C2623] text-[#D4AF37] p-2.5 rounded-r-2xl shadow-2xl border border-l-0 border-[#D4AF37]/50 flex items-center justify-center transition-all duration-300 ${
            isPanelOpen ? 'left-[min(92vw,420px)]' : 'left-0'
          }`}
          title={isPanelOpen ? "Collapse Editor" : "Open Editor"}
        >
          {isPanelOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Canvas / Live Preview */}
        <main className="flex-1 h-full bg-[#E8D8D0]/30 relative overflow-hidden flex items-center justify-center p-2 sm:p-4 lg:p-12">
          <LivePreview dbData={dbData} />
        </main>
      </div>
    </div>
  );
};
