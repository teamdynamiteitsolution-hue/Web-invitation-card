"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { triggerConfettiBurst, playTactileSound } from "@/lib/experience-engine";
import { Sparkles, Heart, MapPin, Calendar, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";
import { DynamicLayout } from "@/app/create/components/editor/DynamicLayout";

export default function EnvelopeRoyal({ template, eventData, animation, skipAnimation }: { template?: any; eventData?: any; animation?: any; skipAnimation?: boolean }) {
  const [isOpen, setIsOpen] = useState(skipAnimation || false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const envelopeBackRef = useRef<HTMLDivElement>(null);
  const envelopeFrontRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 48, hours: 12, minutes: 36, seconds: 14 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (skipAnimation) {
      setIsOpen(true);
      gsap.set(sealRef.current, { scale: 1.5, opacity: 0 });
      gsap.set(flapRef.current, { rotationX: 180 });
      gsap.set(cardRef.current, { y: -300, scale: 1.2, zIndex: 50 });
      gsap.set(envelopeFrontRef.current, { opacity: 0 });
      gsap.set(envelopeBackRef.current, { opacity: 0 });
      if (cardContentRef.current) {
        gsap.set(Array.from(cardContentRef.current.children), { opacity: 1, y: 0 });
      }
    } else {
      setIsOpen(false);
      gsap.set(sealRef.current, { clearProps: "all" });
      gsap.set(flapRef.current, { clearProps: "all" });
      gsap.set(cardRef.current, { clearProps: "all" });
      gsap.set(envelopeFrontRef.current, { clearProps: "all" });
      gsap.set(envelopeBackRef.current, { clearProps: "all" });
      if (cardContentRef.current) {
        gsap.set(Array.from(cardContentRef.current.children), { clearProps: "all" });
      }
    }
  }, [skipAnimation]);

  const handleOpenCeremony = () => {
    if (isOpen) return;

    if (!isAudioMuted) {
      playTactileSound("/assets/audio/envelope-open.mp3");
    }

    setIsOpen(true);
    
    // Set perspective for 3D flip (already handled via css perspective-1000 on container)
    gsap.set(flapRef.current, { transformOrigin: "top center", transformStyle: "preserve-3d" });

    const tl = gsap.timeline({
      onComplete: () => {
        triggerConfettiBurst("gold");
      }
    });

    // 1. Seal pops and fades
    tl.to(sealRef.current, { scale: 1.5, opacity: 0, duration: 0.3, ease: "back.in(1.7)" }, 0);
    
    // 2. Flap opens (rotates back)
    tl.to(flapRef.current, { rotationX: 180, duration: 0.8, ease: "power2.inOut" }, 0.2);
    
    // 3. Card slides out vertically
    tl.to(cardRef.current, { y: -220, duration: 0.8, ease: "power2.out" }, 0.6);
    // Bring card above the envelope flap midway
    tl.set(cardRef.current, { zIndex: 50 }, 1.0); 
    
    // 4. Envelope falls away downwards
    tl.to([envelopeBackRef.current, envelopeFrontRef.current, flapRef.current], { y: "+=250", opacity: 0, duration: 0.6, ease: "power2.in" }, 1.2);
    
    // 5. Card moves to center and scales up to fill the viewport
    tl.to(cardRef.current, { 
      y: 0, 
      width: "100%", 
      height: "100%", 
      borderRadius: 0, 
      duration: 0.8, 
      ease: "power3.inOut" 
    }, 1.2);
    
    // 6. Fade in card content sequentially
    if (cardContentRef.current) {
      tl.fromTo(
        Array.from(cardContentRef.current.children), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
        1.6
      );
    }
  };

  const handleReplay = () => {
    setIsOpen(false);
    gsap.set([sealRef.current, flapRef.current, cardRef.current, envelopeBackRef.current, envelopeFrontRef.current], { clearProps: "all" });
    if (cardContentRef.current) {
      gsap.set(Array.from(cardContentRef.current.children), { clearProps: "all" });
    }
  };
  
  // Extract assets from the template manifest, fallback to default assets
  const bodyAsset = template?.assetManifest?.openingActor?.assets?.primaryBase || "/assets/envelopes/blush-square/body.svg";
  const flapAsset = template?.assetManifest?.openingActor?.assets?.animatedPart || "/assets/envelopes/blush-square/flap-top.svg";
  const bgAsset = template?.assetManifest?.backgroundAsset || "/assets/backgrounds/blush-warm/soft-cream-wash.webp";
  const frameAsset = template?.assetManifest?.framing?.frameAsset || "/assets/frames/handdrawn-minimal.svg";
  const sealAsset = template?.assetManifest?.openingActor?.assets?.fastener || "";

  // Extract event data, fallback to placeholder data for preview
  const brideName = eventData?.brideName || "Lary";
  const groomName = eventData?.groomName || "John";
  const venueName = eventData?.venue || "Radisson Blu Grand Ballroom";
  const venueAddress = ""; // We only collect 'venue' in the studio currently
  const ceremonyDateText = (eventData?.date || "Sunday, 15 November 2026") + (eventData?.time ? ` • ${eventData.time}` : " • 7:00 PM");
  const sacredVerse = "Together with their families";
  const invitationMessage = "Cordially request the honor of your gracious presence to celebrate their wedding ceremony.";
  
  // Photo
  const couplePhoto = eventData?.couplePhoto || "/assets/categories/wedding.webp";
  const typographyStyles = eventData?.typographyStyles || {};
  const layoutPresetId = eventData?.layoutPresetId || 'classic_center';

  return (
    <div className="w-full max-w-md h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between shadow-floating-ceremony font-serif mx-auto" ref={containerRef}>
      
      {/* Floating Controls */}
      <div className="absolute top-4 right-4 z-[60] flex items-center gap-2">
        {isOpen && (
          <button onClick={handleReplay} className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#2C2623] flex items-center justify-center shadow-soft-surface active:scale-95 transition-all">
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
        <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#2C2623] flex items-center justify-center shadow-soft-surface active:scale-95 transition-all">
          {isAudioMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#8C4A52]" />}
        </button>
      </div>

      {/* Background Texture Layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F9F0EC] to-[#E8D8D0] opacity-80" style={{ backgroundImage: bgAsset ? `url(${bgAsset})` : undefined, backgroundSize: 'cover' }} />
      <div className="absolute inset-0 z-1 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />

      {/* Interactive Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 perspective-1000">
        
        {/* Envelope Back */}
        <div ref={envelopeBackRef} className="absolute w-[300px] h-[220px] bg-[#E8D8D0] rounded-xl shadow-inner z-[1]" />
        
        {/* Invitation Card */}
        <div 
          ref={cardRef} 
          className="absolute w-[280px] h-[200px] bg-[#FFFDF9] shadow-soft-surface rounded-xl overflow-hidden flex flex-col z-[2]"
        >
          {/* The Actual Invitation Content */}
          <div 
            ref={cardContentRef} 
            className={`absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col opacity-0 ${isOpen ? '' : 'pointer-events-none'} overflow-y-auto overflow-x-hidden`}
          >
            <div className="min-h-full flex flex-col justify-start space-y-8 pb-12">
              {/* Header Blessings */}
              <div className="text-center pt-2 shrink-0">
                <div className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-serif uppercase tracking-widest text-[#8C4A52] font-bold mb-2">
                  <Heart className="w-3 h-3 fill-[#8C4A52]" />
                  <span>Bismillahir Rahmanir Raheem</span>
                  <Heart className="w-3 h-3 fill-[#8C4A52]" />
                </div>
                <p className="text-xs text-[#7C7267] italic mt-1">{sacredVerse}</p>
              </div>

              {/* Core Typographic Composition */}
              <div className="w-full flex-1 shrink-0 relative py-8 min-h-[400px]">
                <DynamicLayout 
                  layoutPresetId={layoutPresetId} 
                  eventData={eventData} 
                  typographyStyles={typographyStyles} 
                />
              </div>

              {/* Ceremony Countdown Widget */}
              <div className="p-5 rounded-2xl bg-[#F9F0EC]/80 border border-[#D4AF37]/30 text-center shadow-inner-emboss backdrop-blur-sm shrink-0">
                <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C4A52] mb-4">
                  Ceremony Countdown
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="p-3 rounded-xl bg-white shadow-soft-surface flex flex-col items-center justify-center border border-white">
                      <div className="text-xl font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>{value}</div>
                      <div className="text-[9px] uppercase tracking-wider text-[#7C7267] mt-1 font-sans">{unit}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Details & Utilities */}
              <div className="space-y-4 shrink-0">
                <div className="p-5 rounded-xl bg-white border border-[#D4AF37]/30 shadow-soft-surface text-center flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">Date :</span>
                    <div className="text-sm font-bold text-[#2C2623]">{ceremonyDateText}</div>
                  </div>
                  <div className="w-12 h-px bg-[#D4AF37]/30 mx-auto"></div>
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">Venue =</span>
                    <div className="text-xs text-[#8C4A52] font-medium uppercase tracking-wide">{venueName}</div>
                    <div className="text-[11px] text-[#7C7267] mt-1">{venueAddress}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="py-3 px-4 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2C2623] text-xs font-bold flex items-center justify-center gap-2 shadow-soft-surface hover:bg-[#F9F0EC] active:scale-95 transition-all">
                    <MapPin className="w-4 h-4 text-[#8C4A52]" />
                    <span>View Map</span>
                  </a>
                  <button className="py-3 px-4 rounded-xl bg-[#8C4A52] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-elevated-card hover:bg-[#7a3e45] active:scale-95 transition-all">
                    <Calendar className="w-4 h-4 text-[#F9F0D0]" />
                    <span>Calendar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Minimal Frame SVG applied as absolute overlay outside scroll container */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isOpen ? 'opacity-30' : 'opacity-0'}`} style={{ transitionDelay: '1.5s' }}>
             <img src={frameAsset} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Envelope Front Body Overlay */}
        <div ref={envelopeFrontRef} className="absolute w-[300px] h-[140px] z-[3] overflow-hidden rounded-b-xl translate-y-[40px]">
           <img src={bodyAsset} alt="Envelope Body" className="w-full h-full object-cover object-bottom drop-shadow-lg" />
        </div>

        {/* Envelope Flap Overlay */}
        <div 
          ref={flapRef}
          className="absolute w-[300px] h-[120px] z-[4] flex justify-center drop-shadow-md translate-y-[-50px]"
          style={{ transformOrigin: "top center" }}
        >
          <img src={flapAsset} alt="Envelope Flap" className="w-full h-full object-cover" />
          
          {/* The Wax Seal */}
          <div 
            ref={sealRef}
            onClick={handleOpenCeremony}
            className="absolute -bottom-5 w-14 h-14 rounded-full bg-gradient-to-br from-[#A0555E] to-[#7A3E45] border-[3px] border-[#D4AF37] flex flex-col items-center justify-center text-[#F9F0D0] shadow-wax-seal cursor-pointer hover:scale-105 active:scale-95 transition-transform group"
          >
            {sealAsset ? (
              <img src={sealAsset} alt="Seal" className="w-full h-full object-cover rounded-full" />
            ) : (
              <>
                <div className="absolute inset-0 rounded-full bg-black/10 mix-blend-overlay"></div>
                <span className="font-bold text-lg tracking-widest relative z-10" style={{ fontFamily: 'Cinzel, serif', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>SA</span>
                <Sparkles className="absolute right-1 top-2 w-3 h-3 text-[#F9F0D0] opacity-80" />
              </>
            )}
          </div>
        </div>
        
        {/* Onboarding Interaction Prompt */}
        {!isOpen && (
          <div className="absolute bottom-16 flex flex-col items-center gap-2 animate-bounce z-20 pointer-events-none">
            <span className="text-[13px] font-serif italic font-semibold text-[#8C4A52] tracking-wide bg-white/50 px-4 py-1.5 rounded-full backdrop-blur-sm border border-[#8C4A52]/20 shadow-sm">
              Tap the wax seal to open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
