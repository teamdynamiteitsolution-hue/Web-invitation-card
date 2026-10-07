"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PlayCircle, Sparkles, Heart, ArrowRight } from "lucide-react";
import { playTactileSound, triggerConfettiBurst } from "@/lib/experience-engine";

import RoyalHeritageScroll from "./RoyalHeritageScroll";
import BotanicalEmeraldScroll from "./BotanicalEmeraldScroll";
import GoldenHaldiScroll from "./GoldenHaldiScroll";
import CelestialBirthdayScroll from "./CelestialBirthdayScroll";
import CorporatePrestigeScroll from "./CorporatePrestigeScroll";
import RubyVelvetScroll from "./RubyVelvetScroll";
import FloralRomanceScroll from "./FloralRomanceScroll";
import EditorialBotanicalScroll from "./EditorialBotanicalScroll";
import CinematicStoryScroll from "./CinematicStoryScroll";
import BotanicalMagazineScroll from "./BotanicalMagazineScroll";

export default function ScrollExperience({
  template,
  animation,
  eventData,
  revealMode = 'auto',
  customImage,
  bgBlur = 0,
  skipAnimation = false
}: {
  template: any;
  animation?: any;
  eventData: any;
  revealMode?: string;
  customImage?: string | null;
  bgBlur?: number;
  skipAnimation?: boolean;
}) {
  const [isRevealed, setIsRevealed] = useState(skipAnimation);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isOpeningInteractive, setIsOpeningInteractive] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const envelopeBoxRef = useRef<HTMLDivElement>(null);

  const animKey = (
    animation?.pluginKey ||
    animation?.slug ||
    animation?.interactionType ||
    animation?.id ||
    ""
  ).toLowerCase();

  const isVideoAnim = Boolean(animation?.videoUrl || animKey === "video");
  const isCurtainAnim = animKey.includes("curtain");
  const isScratchAnim = animKey.includes("scratch") || animKey.includes("haldi");
  const isEnvelopeAnim = animKey.includes("envelope") || animKey.includes("wax") || animKey.includes("seal") || (!isVideoAnim && !isCurtainAnim && !isScratchAnim && Boolean(animation));

  // Reset reveal state whenever skipAnimation or animation changes
  useEffect(() => {
    setIsRevealed(skipAnimation);
    setIsPlayingVideo(false);
    setIsOpeningInteractive(false);
  }, [skipAnimation, animation?.id, animation?.slug, animation?.videoUrl]);

  const handleVideoPlay = () => {
    if (!videoRef.current) return;
    setIsPlayingVideo(true);
    videoRef.current.play().catch(console.error);
  };

  const handleVideoEnded = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setIsRevealed(true);
        }
      });
    } else {
      setIsRevealed(true);
    }
  };

  const handleOpenEnvelope = () => {
    if (isOpeningInteractive) return;
    setIsOpeningInteractive(true);
    playTactileSound("/assets/audio/envelope-open.mp3");

    const tl = gsap.timeline({
      onComplete: () => {
        triggerConfettiBurst("gold");
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            y: -40,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => setIsRevealed(true)
          });
        } else {
          setIsRevealed(true);
        }
      }
    });

    if (sealRef.current) {
      tl.to(sealRef.current, { scale: 1.4, opacity: 0, duration: 0.3, ease: "back.in(1.7)" }, 0);
    }
    if (flapRef.current) {
      tl.to(flapRef.current, { rotationX: 180, duration: 0.7, ease: "power2.inOut" }, 0.2);
    }
    if (envelopeBoxRef.current) {
      tl.to(envelopeBoxRef.current, { scale: 0.92, opacity: 0, duration: 0.5, ease: "power2.in" }, 0.8);
    }
  };

  const handleOpenCurtain = () => {
    if (isOpeningInteractive) return;
    setIsOpeningInteractive(true);
    playTactileSound("/assets/audio/curtain-part.mp3");

    const tl = gsap.timeline({
      onComplete: () => {
        triggerConfettiBurst("gold");
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setIsRevealed(true)
          });
        } else {
          setIsRevealed(true);
        }
      }
    });

    if (leftCurtainRef.current) {
      tl.to(leftCurtainRef.current, { x: "-100%", duration: 1.3, ease: "power2.inOut" }, 0);
    }
    if (rightCurtainRef.current) {
      tl.to(rightCurtainRef.current, { x: "100%", duration: 1.3, ease: "power2.inOut" }, 0);
    }
  };

  const handleOpenScratch = () => {
    if (isOpeningInteractive) return;
    setIsOpeningInteractive(true);
    playTactileSound("/assets/audio/gentle-chime.mp3");
    triggerConfettiBurst("turmeric");

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => setIsRevealed(true)
      });
    } else {
      setIsRevealed(true);
    }
  };

  const slug = template?.slug || eventData?.templateSlug || "";
  const id = template?.id || eventData?.templateDefinitionId || "";
  const category = eventData?.category || template?.category || "";

  // Render Scroll Component
  let scrollContent: React.ReactNode = null;

  if (slug === "floral-romance-scroll" || id === "tmpl-17-floral-romance-scroll") {
    scrollContent = (
      <FloralRomanceScroll
        template={template}
        animation={animation}
        eventData={eventData}
        revealMode={revealMode}
        customImage={customImage}
        bgBlur={bgBlur}
        skipAnimation={true}
      />
    );
  } else if (slug === "editorial-botanical-scroll" || id === "tmpl-18-editorial-botanical-scroll") {
    scrollContent = (
      <EditorialBotanicalScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "cinematic-story-scroll" || id === "tmpl-19-cinematic-story-scroll") {
    scrollContent = (
      <CinematicStoryScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "botanical-magazine-scroll" || id === "tmpl-20-botanical-magazine-scroll") {
    scrollContent = (
      <BotanicalMagazineScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "botanical-scroll" || id === "tmpl-09-botanical-scroll") {
    scrollContent = (
      <BotanicalEmeraldScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "haldi-scroll" || id === "tmpl-13-haldi-scroll" || category === "holud") {
    scrollContent = (
      <GoldenHaldiScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "birthday-scroll" || id === "tmpl-14-birthday-scroll" || category === "birthday") {
    scrollContent = (
      <CelestialBirthdayScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "corporate-scroll" || id === "tmpl-15-corporate-scroll" || category === "corporate") {
    scrollContent = (
      <CorporatePrestigeScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else if (slug === "velvet-scroll" || id === "tmpl-16-velvet-scroll" || category === "reception") {
    scrollContent = (
      <RubyVelvetScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  } else {
    scrollContent = (
      <RoyalHeritageScroll
        template={template}
        eventData={eventData}
        skipAnimation={true}
      />
    );
  }

  const brideName = eventData?.brideName || "Lary";
  const groomName = eventData?.groomName || "John";
  const personName = eventData?.personName || eventData?.brideName || "Guest of Honor";
  const isBirthday = category === "birthday";

  return (
    <div className={`relative w-full min-h-full ${!isRevealed ? "overflow-hidden" : ""}`}>
      {/* Scroll Experience Content */}
      <div className="w-full min-h-full">
        {scrollContent}
      </div>

      {/* Opening Animation Overlay */}
      {!isRevealed && (
        <div 
          ref={overlayRef} 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181312] select-none"
        >
          {/* 1. Video Animation Overlay */}
          {isVideoAnim && animation?.videoUrl && (
            <div 
              className="relative w-full max-w-[420px] aspect-[9/16] max-h-[100dvh] flex items-center justify-center bg-black cursor-pointer overflow-hidden shadow-2xl rounded-none md:rounded-3xl"
              onClick={!isPlayingVideo ? handleVideoPlay : undefined}
            >
              <video
                ref={videoRef}
                src={animation.videoUrl}
                poster={animation?.previewPosterUrl}
                className="w-full h-full object-cover"
                playsInline
                onEnded={handleVideoEnded}
              />
              {!isPlayingVideo && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-4 text-white">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <PlayCircle className="w-9 h-9 text-[#8C4A52]" />
                  </div>
                  <span className="text-xs font-serif tracking-widest uppercase bg-black/50 px-4 py-1.5 rounded-full border border-white/20">
                    Tap to Open Invitation
                  </span>
                </div>
              )}
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsRevealed(true); 
                }}
                className="absolute top-4 right-4 z-20 text-[11px] text-white/70 hover:text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10"
              >
                Skip
              </button>
            </div>
          )}

          {/* 2. Curtain Animation Overlay */}
          {isCurtainAnim && !isVideoAnim && (
            <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[100dvh] overflow-hidden flex items-center justify-center rounded-none md:rounded-3xl shadow-2xl border border-[#D4AF37]/30 bg-[#2C2623]">
              <div 
                ref={leftCurtainRef} 
                className="absolute inset-y-0 left-0 w-1/2 bg-[#8C4A52] z-20 shadow-[10px_0_20px_rgba(0,0,0,0.5)] origin-left"
                style={{ backgroundImage: "url('/assets/textures/handmade-fiber.webp')", backgroundBlendMode: 'multiply' }}
              >
                <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-r from-transparent to-black/40" />
              </div>
              <div 
                ref={rightCurtainRef} 
                className="absolute inset-y-0 right-0 w-1/2 bg-[#8C4A52] z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] origin-right"
                style={{ backgroundImage: "url('/assets/textures/handmade-fiber.webp')", backgroundBlendMode: 'multiply' }}
              >
                <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-l from-transparent to-black/40" />
              </div>
              
              <div className="relative z-30 flex flex-col items-center gap-4 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F9F0D0] text-2xl font-serif">
                  ✦
                </div>
                <h3 className="text-white text-lg font-serif tracking-widest uppercase">
                  {isBirthday ? personName : `${brideName} & ${groomName}`}
                </h3>
                <button 
                  onClick={handleOpenCurtain}
                  className="bg-white/15 backdrop-blur-md border border-white/40 rounded-full px-6 py-3 flex items-center gap-2 text-white font-bold tracking-widest uppercase hover:bg-white/25 transition-all animate-pulse shadow-xl text-xs"
                >
                  <span>Tap to Open</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 3. Scratch Animation Overlay */}
          {isScratchAnim && !isVideoAnim && (
            <div 
              onClick={handleOpenScratch}
              className="relative w-full max-w-[420px] aspect-[9/16] max-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9F2] to-[#FFE6CC] rounded-none md:rounded-3xl shadow-2xl p-8 border border-[#D4AF37]/40 cursor-pointer text-center select-none"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl p-1 bg-white mb-6 animate-pulse">
                <img 
                  src={eventData?.couplePhoto || "/assets/categories/haldi.webp"} 
                  alt="Couple" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-2 font-serif">
                শুভ বিবাহ
              </h3>
              <p className="text-sm font-serif italic text-[#7C7267] mb-6">
                {isBirthday ? personName : `${brideName} & ${groomName}`}
              </p>
              <div className="bg-[#D4AF37] text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg animate-bounce flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Tap to Reveal Invitation</span>
              </div>
            </div>
          )}

          {/* 4. Wax Seal & Envelope Animation Overlay (Default Interactive) */}
          {isEnvelopeAnim && !isVideoAnim && !isCurtainAnim && !isScratchAnim && (
            <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[100dvh] flex flex-col items-center justify-center bg-[#FAF8F5] rounded-none md:rounded-3xl shadow-2xl p-6 border border-[#D4AF37]/30 select-none">
              <div ref={envelopeBoxRef} className="relative w-[300px] h-[220px] flex items-center justify-center [perspective:1000px]">
                {/* Envelope Body */}
                <div className="absolute inset-0 bg-[#E8D8D0] rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C4A52] font-semibold mb-1">
                    Royal Invitation
                  </div>
                  <div className="text-base font-bold text-[#2C2623] font-serif tracking-wide">
                    {isBirthday ? personName : `${brideName} & ${groomName}`}
                  </div>
                </div>

                {/* Envelope Flap */}
                <div 
                  ref={flapRef}
                  className="absolute top-0 inset-x-0 h-1/2 bg-[#DFBCB5] rounded-t-2xl origin-top border-b border-[#D4AF37]/30 z-10 shadow-md"
                  style={{ transformStyle: "preserve-3d" }}
                />

                {/* Wax Seal Button */}
                <button
                  ref={sealRef}
                  onClick={handleOpenEnvelope}
                  className="absolute z-20 w-16 h-16 rounded-full bg-[#8C4A52] text-[#F9F0D0] shadow-2xl flex flex-col items-center justify-center border-2 border-[#D4AF37] hover:scale-105 active:scale-95 transition-transform animate-pulse"
                >
                  <Heart className="w-6 h-6 fill-[#F9F0D0]" />
                  <span className="text-[8px] font-bold tracking-widest uppercase mt-0.5">OPEN</span>
                </button>
              </div>

              <span className="text-xs font-serif text-[#7C7267] mt-8 italic animate-bounce">
                Tap wax seal to open invitation
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
