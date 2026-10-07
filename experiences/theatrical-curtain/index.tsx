"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, RotateCcw } from "lucide-react";
import { DynamicLayout } from "@/app/create/components/editor/DynamicLayout";

export default function TheatricalCurtain({ 
  template, 
  eventData, 
  skipAnimation 
}: { 
  template?: any; 
  eventData?: any; 
  skipAnimation?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(skipAnimation || false);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const couplePhoto = eventData?.couplePhoto || "/assets/categories/boubhat.webp";
  
  useEffect(() => {
    if (skipAnimation) {
      setIsOpen(true);
      gsap.set(leftCurtainRef.current, { x: "-100%" });
      gsap.set(rightCurtainRef.current, { x: "100%" });
      if (contentRef.current) {
        gsap.set(Array.from(contentRef.current.children), { opacity: 1, y: 0 });
      }
    } else {
      setIsOpen(false);
      gsap.set([leftCurtainRef.current, rightCurtainRef.current], { clearProps: "all" });
      if (contentRef.current) {
        gsap.set(Array.from(contentRef.current.children), { clearProps: "all" });
      }
    }
  }, [skipAnimation]);

  const handleOpenCeremony = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    const tl = gsap.timeline();
    
    // Part the curtains
    tl.to(leftCurtainRef.current, { x: "-100%", duration: 1.5, ease: "power2.inOut" }, 0);
    tl.to(rightCurtainRef.current, { x: "100%", duration: 1.5, ease: "power2.inOut" }, 0);
    
    // Animate content up sequentially
    if (contentRef.current) {
      tl.fromTo(
        Array.from(contentRef.current.children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
        0.8
      );
    }
  };

  const handleReplay = () => {
    setIsOpen(false);
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], { clearProps: "all" });
    if (contentRef.current) {
      gsap.set(Array.from(contentRef.current.children), { clearProps: "all" });
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[80vh] md:h-[85vh] md:max-h-[800px] bg-[#FAF8F5] rounded-[32px] overflow-hidden shadow-2xl flex flex-col items-center justify-center border border-[#D4AF37]/30">
      
      {/* Background Card Details */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
        <div ref={contentRef} className="w-full flex-1 shrink-0 relative py-8 min-h-[400px]">
          <DynamicLayout 
            layoutPresetId={eventData?.layoutPresetId || 'classic_center'} 
            eventData={eventData} 
            typographyStyles={eventData?.typographyStyles || {}} 
          />
        </div>
      </div>

      {/* Curtains */}
      <div 
        ref={leftCurtainRef} 
        className="absolute inset-y-0 left-0 w-1/2 bg-[#8C4A52] z-20 shadow-[10px_0_20px_rgba(0,0,0,0.3)] origin-left"
        style={{ backgroundImage: "url('/assets/textures/handmade-fiber.webp')", backgroundBlendMode: 'multiply' }}
      >
        <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-r from-transparent to-black/30" />
      </div>
      <div 
        ref={rightCurtainRef} 
        className="absolute inset-y-0 right-0 w-1/2 bg-[#8C4A52] z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.3)] origin-right"
        style={{ backgroundImage: "url('/assets/textures/handmade-fiber.webp')", backgroundBlendMode: 'multiply' }}
      >
        <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-l from-transparent to-black/30" />
      </div>

      {/* Tap to open overlay */}
      {!isOpen && (
        <button 
          onClick={handleOpenCeremony}
          className="absolute z-30 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 flex items-center gap-2 text-white font-bold tracking-widest uppercase hover:bg-white/20 transition-all animate-pulse shadow-xl"
        >
          <span>Tap to Open</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* Replay Button */}
      {isOpen && (
        <button 
          onClick={handleReplay}
          className="absolute bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-[#F9F0EC] text-[#8C4A52] flex items-center justify-center shadow-lg border border-[#D4AF37]/30 hover:scale-110 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
