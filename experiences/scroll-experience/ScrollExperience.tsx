"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PlayCircle, Sparkles, Heart, ArrowRight } from "lucide-react";
import { playTactileSound, triggerConfettiBurst } from "@/lib/experience-engine";

import RoyalHeritageScroll from "./RoyalHeritageScroll";
import PatachitraRoyalScroll from "./PatachitraRoyalScroll";
import ModernEditorialScroll from "./ModernEditorialScroll";
import CarnivalHaldiScroll from "./CarnivalHaldiScroll";
import CosmicMidnightScroll from "./CosmicMidnightScroll";
import ScrapbookBotanicalScroll from "./ScrapbookBotanicalScroll";
import GoldenHaldiScroll from "./GoldenHaldiScroll";
import BotanicalEmeraldScroll from "./BotanicalEmeraldScroll";
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

  const slug = (template?.slug || eventData?.templateSlug || "").toLowerCase();
  const id = (template?.id || eventData?.templateDefinitionId || "").toLowerCase();
  const category = (eventData?.category || template?.category?.slug || template?.category || "").toLowerCase();

  // Render Scroll Component
  let scrollContent: React.ReactNode = null;

  if (slug === "patachitra-royal-scroll" || slug === "royal-grandeur-scroll" || id === "tmpl-01-patachitra-royal") {
    scrollContent = <PatachitraRoyalScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "modern-editorial-scroll" || id === "tmpl-02-modern-editorial") {
    scrollContent = <ModernEditorialScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "carnival-haldi-scroll" || id === "tmpl-03-carnival-haldi") {
    scrollContent = <CarnivalHaldiScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "cosmic-midnight-scroll" || slug === "celestial-midnight-scroll" || id === "tmpl-04-cosmic-midnight" || id === "tmpl-04-celestial-midnight") {
    scrollContent = <CosmicMidnightScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "scrapbook-botanical-scroll" || slug === "botanical-meadow-scroll" || id === "tmpl-05-scrapbook-botanical" || id === "tmpl-05-botanical-meadow") {
    scrollContent = <ScrapbookBotanicalScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "golden-haldi-scroll" || slug === "haldi-scroll" || id === "tmpl-03-golden-haldi" || id === "tmpl-13-haldi-scroll" || category === "haldi" || category === "holud") {
    scrollContent = <CarnivalHaldiScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "floral-romance-scroll" || id === "tmpl-17-floral-romance-scroll") {
    scrollContent = <FloralRomanceScroll template={template} animation={animation} eventData={eventData} revealMode={revealMode} customImage={customImage} bgBlur={bgBlur} skipAnimation={true} />;
  } else if (slug === "editorial-botanical-scroll" || id === "tmpl-18-editorial-botanical-scroll") {
    scrollContent = <EditorialBotanicalScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "cinematic-story-scroll" || id === "tmpl-19-cinematic-story-scroll") {
    scrollContent = <CinematicStoryScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "botanical-magazine-scroll" || id === "tmpl-20-botanical-magazine-scroll") {
    scrollContent = <BotanicalMagazineScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "botanical-scroll" || id === "tmpl-09-botanical-scroll") {
    scrollContent = <BotanicalEmeraldScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "birthday-scroll" || id === "tmpl-14-birthday-scroll" || category === "birthday") {
    scrollContent = <CelestialBirthdayScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "corporate-scroll" || id === "tmpl-15-corporate-scroll" || category === "corporate") {
    scrollContent = <CorporatePrestigeScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else if (slug === "velvet-scroll" || id === "tmpl-16-velvet-scroll") {
    scrollContent = <RubyVelvetScroll template={template} eventData={eventData} skipAnimation={true} />;
  } else {
    scrollContent = <RoyalHeritageScroll template={template} eventData={eventData} skipAnimation={true} />;
  }

  const brideName = eventData?.brideName || "Bride";
  const groomName = eventData?.groomName || "Groom";
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
                    Tap to Open Video Reveal
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 2. Interactive Curtain Parting */}
          {isCurtainAnim && (
            <div 
              className="relative w-full max-w-[480px] h-[750px] max-h-[90vh] mx-auto overflow-hidden rounded-3xl shadow-2xl bg-[#0F0D0C] flex items-center justify-center cursor-pointer group"
              onClick={handleOpenCurtain}
            >
              <div 
                ref={leftCurtainRef} 
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#63141C] via-[#8C1D28] to-[#4A0E15] border-r border-[#D4AF37]/40 shadow-2xl z-20 flex flex-col justify-between p-6"
              >
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-xs">✦</div>
                <div className="text-right text-[#D4AF37] text-xs font-serif tracking-widest uppercase">The Royal</div>
              </div>

              <div 
                ref={rightCurtainRef} 
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#63141C] via-[#8C1D28] to-[#4A0E15] border-l border-[#D4AF37]/40 shadow-2xl z-20 flex flex-col justify-between p-6"
              >
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-xs self-end">✦</div>
                <div className="text-left text-[#D4AF37] text-xs font-serif tracking-widest uppercase">Ceremony</div>
              </div>

              <div className="relative z-30 flex flex-col items-center gap-4 text-center px-6 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#181312] flex items-center justify-center shadow-xl border-2 border-white">
                  <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-widest uppercase font-serif">
                  {brideName} &amp; {groomName}
                </h3>
                <span className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/30 shadow-lg animate-pulse">
                  Tap to Draw Curtains
                </span>
              </div>
            </div>
          )}

          {/* 3. Interactive Envelope Reveal */}
          {isEnvelopeAnim && !isVideoAnim && !isCurtainAnim && !isScratchAnim && (
            <div 
              ref={envelopeBoxRef}
              className="relative w-full max-w-[420px] aspect-[4/5] mx-auto flex flex-col items-center justify-center p-6 cursor-pointer select-none"
              onClick={handleOpenEnvelope}
            >
              <div className="relative w-full h-[320px] bg-[#2C1D18] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col justify-between p-8 overflow-hidden">
                <div 
                  ref={flapRef}
                  className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#3D2822] to-[#2C1D18] border-b-2 border-[#D4AF37]/40 origin-top shadow-lg z-20 flex items-center justify-center"
                />
                
                <div className="text-center relative z-10 pt-8">
                  <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">Royal Invitation</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-wide">
                    {isBirthday ? personName : `${brideName} & ${groomName}`}
                  </h3>
                </div>

                <div className="relative z-30 flex flex-col items-center justify-center mt-auto">
                  <button 
                    ref={sealRef}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8C4A52] to-[#B85D69] text-[#FAF8F5] border-2 border-[#D4AF37] shadow-2xl flex items-center justify-center font-serif text-xl font-bold transform hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Heart className="w-7 h-7 text-[#D4AF37] fill-current" />
                  </button>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#D4AF37]/80 mt-3 animate-pulse">
                    Tap Wax Seal to Open
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Interactive Scratch Reveal */}
          {isScratchAnim && (
            <div 
              className="relative w-full max-w-[420px] aspect-[4/5] mx-auto flex flex-col items-center justify-center p-6 cursor-pointer select-none"
              onClick={handleOpenScratch}
            >
              <div className="w-full p-8 rounded-3xl bg-gradient-to-b from-[#FEF08A] to-[#FACC15] text-[#713F12] border-4 border-white shadow-2xl flex flex-col items-center text-center">
                <span className="text-4xl mb-4">✨ 🌼 ✨</span>
                <h3 className="text-2xl font-bold mb-2">গায়ে হলুদ ও উৎসব</h3>
                <p className="text-xs font-serif mb-6 opacity-90">Touch anywhere to reveal the colorful celebration</p>
                <div className="px-6 py-2.5 rounded-full bg-white text-[#713F12] font-bold text-xs shadow-lg uppercase tracking-widest animate-bounce">
                  Tap to Reveal
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
