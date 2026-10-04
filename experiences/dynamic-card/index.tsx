"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { PlayCircle, Sparkles, Wand2, PartyPopper, CheckCircle2, ChevronRight, Volume2, MoveHorizontal } from "lucide-react";
import { DynamicLayout } from "@/app/create/components/editor/DynamicLayout";

interface BalloonItem {
  id: number;
  color: string;
  gradient: string;
  glow: string;
  size: number;
  x: number;
  y: number;
  delay: number;
  label?: string;
}

const INITIAL_BALLOONS: BalloonItem[] = [
  { id: 1, color: "#E11D48", gradient: "from-rose-400 via-rose-500 to-rose-700", glow: "rgba(225,29,72,0.4)", size: 74, x: 20, y: 35, delay: 0, label: "🎈" },
  { id: 2, color: "#D4AF37", gradient: "from-amber-300 via-amber-400 to-amber-600", glow: "rgba(212,175,55,0.4)", size: 82, x: 68, y: 28, delay: 0.2, label: "✨" },
  { id: 3, color: "#8B5CF6", gradient: "from-purple-400 via-purple-500 to-purple-700", glow: "rgba(139,92,246,0.4)", size: 78, x: 45, y: 48, delay: 0.4, label: "🎂" },
  { id: 4, color: "#10B981", gradient: "from-emerald-400 via-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.4)", size: 70, x: 18, y: 62, delay: 0.1, label: "🎉" },
  { id: 5, color: "#F59E0B", gradient: "from-yellow-300 via-amber-400 to-orange-500", glow: "rgba(245,158,11,0.4)", size: 76, x: 72, y: 58, delay: 0.3, label: "💖" },
];

export default function DynamicCardExperience({ template, animation, eventData, revealMode, customImage, bgBlur, skipAnimation }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(skipAnimation || !animation?.videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse manifest and layout
  const manifest = template?.assetManifest 
    ? (typeof template.assetManifest === 'string' ? JSON.parse(template.assetManifest) : template.assetManifest) 
    : {};
  const layoutPresetId = eventData?.layoutPresetId || manifest.photoFrameStyle || template?.archetype || 'classic_editorial';

  // Fallback to template preview image only when manifest.cardAsset is missing or invalid
  const cardAsset = (manifest.cardAsset && typeof manifest.cardAsset === 'string' && manifest.cardAsset.trim() !== '')
    ? manifest.cardAsset
    : (template?.previewImageUrl || "/assets/Cards/card 1.png");

  const videoUrl = animation?.videoUrl;

  // Determine active reveal mode
  let effectiveRevealMode = revealMode || manifest.revealMode || template?.revealMode || "sequential";
  if (effectiveRevealMode === "auto") {
    try {
      const sup = template?.supportedRevealModes ? JSON.parse(template.supportedRevealModes) : [];
      if (sup.length > 0) effectiveRevealMode = sup[0];
      else effectiveRevealMode = manifest.revealMode || "sequential";
    } catch {
      effectiveRevealMode = "sequential";
    }
  }

  // State for interactive overlays
  const [balloons, setBalloons] = useState<BalloonItem[]>(INITIAL_BALLOONS);
  const [isBalloonCleared, setIsBalloonCleared] = useState(false);
  const [isRibbonUntied, setIsRibbonUntied] = useState(false);
  const [isFloralBloomed, setIsFloralBloomed] = useState(false);
  const [isScratchDone, setIsScratchDone] = useState(false);

  // Parabola gesture state
  const [parabolaProgress, setParabolaProgress] = useState(0);
  const [isDraggingParabola, setIsDraggingParabola] = useState(false);
  const [isParabolaUnlocked, setIsParabolaUnlocked] = useState(false);
  const startXRef = useRef(0);

  // Parallax 3D tilt state
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });

  // Ribbon refs
  const ribbonContainerRef = useRef<HTMLDivElement>(null);
  const leftRibbonRef = useRef<HTMLDivElement>(null);
  const rightRibbonRef = useRef<HTMLDivElement>(null);
  const centerBowRef = useRef<HTMLDivElement>(null);

  // Check if current mode is interactive and whether content is unlocked
  const isInteractiveMode = 
    effectiveRevealMode === "ribbon_untie" ||
    effectiveRevealMode === "balloon_pop" ||
    effectiveRevealMode === "floral_bloom" ||
    effectiveRevealMode === "scratch" ||
    effectiveRevealMode === "parabola_arc";

  const isContentUnlocked = 
    (effectiveRevealMode === "ribbon_untie" && isRibbonUntied) ||
    (effectiveRevealMode === "balloon_pop" && isBalloonCleared) ||
    (effectiveRevealMode === "floral_bloom" && isFloralBloomed) ||
    (effectiveRevealMode === "scratch" && isScratchDone) ||
    (effectiveRevealMode === "parabola_arc" && isParabolaUnlocked) ||
    !isInteractiveMode;

  useEffect(() => {
    setIsVideoFinished(skipAnimation || !videoUrl);
    setIsPlaying(false);
  }, [videoUrl, skipAnimation]);

  // Card items reveal sequence triggering down to date & venue
  const triggerCardContentReveal = useCallback(() => {
    if (!nodesRef.current) return;
    gsap.set(nodesRef.current, { visibility: "visible", opacity: 1 });
    const items = nodesRef.current.querySelectorAll('.reveal-item');
    const targetNodes = items.length > 0 ? Array.from(items) : Array.from(nodesRef.current.children);

    if (effectiveRevealMode === "fade") {
      gsap.fromTo(targetNodes, 
        { opacity: 0, filter: "blur(6px)", y: 14 }, 
        { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.28, duration: 2.2, ease: "power2.out", delay: 0.2 }
      );
    } else {
      gsap.fromTo(targetNodes, 
        { opacity: 0, y: 26, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, stagger: 0.32, duration: 1.6, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [effectiveRevealMode]);

  // Sequential & Fade animations trigger when video finishes
  useEffect(() => {
    if (isVideoFinished) {
      if (effectiveRevealMode === "sequential" || effectiveRevealMode === "fade" || effectiveRevealMode === "parallax_3d") {
        triggerCardContentReveal();
      }
    }
  }, [isVideoFinished, effectiveRevealMode, triggerCardContentReveal]);

  // Ribbon Untie / Cut Handler with Two-Side Strap Separation
  const handleUntieRibbon = () => {
    if (isRibbonUntied) return;

    // 1. Burst & pop center golden bow
    if (centerBowRef.current) {
      gsap.to(centerBowRef.current, {
        scale: 1.45,
        rotation: 20,
        opacity: 0,
        duration: 0.45,
        ease: "back.in(1.7)"
      });
    }

    // 2. Slide left and right satin ribbons away to 2 sides
    if (leftRibbonRef.current && rightRibbonRef.current) {
      gsap.to(leftRibbonRef.current, {
        x: "-140%",
        rotation: -8,
        opacity: 0,
        duration: 0.85,
        ease: "power3.inOut"
      });

      gsap.to(rightRibbonRef.current, {
        x: "140%",
        rotation: 8,
        opacity: 0,
        duration: 0.85,
        ease: "power3.inOut"
      });
    }

    // 3. Fade backdrop overlay
    if (ribbonContainerRef.current) {
      gsap.to(ribbonContainerRef.current, {
        opacity: 0,
        duration: 0.45,
        delay: 0.2,
        ease: "power2.out",
        onComplete: () => {
          setIsRibbonUntied(true);
        }
      });
    }

    // 4. Reveal the card content underneath as ribbon parts
    if (nodesRef.current) {
      gsap.set(nodesRef.current, { visibility: "visible", opacity: 1 });
      const items = nodesRef.current.querySelectorAll('.reveal-item');
      const targetNodes = items.length > 0 ? Array.from(items) : Array.from(nodesRef.current.children);
      gsap.fromTo(targetNodes, 
        { opacity: 0, y: 30, scale: 0.94 }, 
        { opacity: 1, y: 0, scale: 1, stagger: 0.32, duration: 1.6, ease: "power2.out", delay: 0.35 }
      );
    }
  };

  // Balloon pop / fly handler
  const handleFlyBalloon = (id: number) => {
    const el = document.getElementById(`balloon-${id}`);
    if (el) {
      gsap.to(el, {
        y: -500,
        x: "+=" + (Math.random() * 80 - 40),
        rotation: (Math.random() - 0.5) * 60,
        opacity: 0,
        scale: 1.2,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => {
          setBalloons(prev => {
            const next = prev.filter(b => b.id !== id);
            if (next.length === 0) {
              setIsBalloonCleared(true);
              triggerCardContentReveal();
            }
            return next;
          });
        }
      });
    }
  };

  const handleFlyAllBalloons = () => {
    balloons.forEach((b, idx) => {
      const el = document.getElementById(`balloon-${b.id}`);
      if (el) {
        gsap.to(el, {
          y: -500,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: 0.7 + idx * 0.1,
          ease: "power2.in"
        });
      }
    });
    setTimeout(() => {
      setBalloons([]);
      setIsBalloonCleared(true);
      triggerCardContentReveal();
    }, 600);
  };

  // Parabola touch / mouse drag handlers
  const handleParabolaStart = (clientX: number) => {
    if (isParabolaUnlocked) return;
    setIsDraggingParabola(true);
    startXRef.current = clientX;
  };

  const handleParabolaMove = (clientX: number) => {
    if (!isDraggingParabola || isParabolaUnlocked) return;
    const delta = clientX - startXRef.current;
    const progress = Math.min(1, Math.max(0, delta / 220));
    setParabolaProgress(progress);
    if (progress >= 0.92) {
      setIsParabolaUnlocked(true);
      setIsDraggingParabola(false);
      setParabolaProgress(1);
      triggerCardContentReveal();
    }
  };

  const handleParabolaEnd = () => {
    if (isParabolaUnlocked) return;
    setIsDraggingParabola(false);
    if (parabolaProgress < 0.92) {
      gsap.to({ p: parabolaProgress }, {
        p: 0,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: function() {
          setParabolaProgress(this.targets()[0].p);
        }
      });
    }
  };

  // Parallax 3D mouse move handler
  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    if (effectiveRevealMode !== "parallax_3d" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`
    });
  };

  const handleMouseLeave3D = () => {
    if (effectiveRevealMode !== "parallax_3d") return;
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    });
  };

  const handlePlay = () => {
    if (!videoRef.current) return;
    setIsPlaying(true);
    videoRef.current.play().catch(console.error);
  };

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(containerRef.current, { backgroundColor: "#ffffff" }, { backgroundColor: "transparent", duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove3D}
      onMouseLeave={handleMouseLeave3D}
      className="relative w-full max-w-[412px] mx-auto h-[100dvh] md:h-[85vh] md:max-h-[915px] bg-[#FAF8F5] overflow-hidden md:rounded-[32px] md:shadow-2xl flex flex-col items-center justify-center font-serif select-none"
    >
      
      {/* Video Phase */}
      {!isVideoFinished && videoUrl && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 cursor-pointer"
          onClick={!isPlaying ? handlePlay : undefined}
        >
          <video 
            ref={videoRef}
            src={videoUrl}
            poster={animation?.previewPosterUrl}
            className="w-full h-full object-cover"
            playsInline
            onEnded={handleVideoEnded}
            style={{ opacity: 1 }}
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl hover:scale-105 transition-transform">
                <PlayCircle className="w-8 h-8 text-[#8C4A52]" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Card Phase */}
      <div 
        ref={cardRef} 
        style={effectiveRevealMode === "parallax_3d" ? tiltStyle : undefined}
        className="absolute inset-0 z-10 w-full h-full flex flex-col bg-[#FAF8F5] transition-transform duration-200 ease-out"
      >
        {/* Card Artwork */}
        {cardAsset && (
          <img 
            src={cardAsset} 
            alt="Card Background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          />
        )}

        {/* Dynamic Nodes */}
        <div 
          ref={nodesRef} 
          style={{
            opacity: isInteractiveMode 
              ? (isContentUnlocked ? 1 : (effectiveRevealMode === "parabola_arc" ? parabolaProgress : 0))
              : undefined,
            pointerEvents: isContentUnlocked ? "auto" : "none",
            transform: effectiveRevealMode === "parabola_arc" && !isParabolaUnlocked
              ? `translateY(${Math.sin((1 - parabolaProgress) * Math.PI) * 40}px) scale(${0.88 + parabolaProgress * 0.12})`
              : undefined,
            visibility: isInteractiveMode && !isContentUnlocked && effectiveRevealMode !== "parabola_arc" ? "hidden" : "visible"
          }}
          className="absolute inset-x-8 top-[14%] bottom-[14%] flex items-center justify-center transition-all duration-300"
        >
          <DynamicLayout 
            layoutPresetId={layoutPresetId} 
            eventData={eventData} 
            typographyStyles={eventData?.typographyStyles || {}} 
          />
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE OVERLAY 01: FLOATING BALLOONS (balloon_pop) */}
        {/* ========================================================= */}
        {effectiveRevealMode === "balloon_pop" && !isBalloonCleared && (
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex flex-col justify-between p-6 animate-fade-in pointer-events-auto">
            {/* Top Prompt */}
            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 text-[#8C4A52] font-bold text-xs shadow-lg border border-[#D4AF37]/40">
                <PartyPopper className="w-3.5 h-3.5 text-amber-500" />
                <span>Tap balloons to fly them away! ({balloons.length} left)</span>
              </div>
            </div>

            {/* Interactive Balloons Arena */}
            <div className="relative flex-1 w-full my-4">
              {balloons.map(b => (
                <div
                  key={b.id}
                  id={`balloon-${b.id}`}
                  onClick={() => handleFlyBalloon(b.id)}
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.size}px`,
                    height: `${b.size * 1.22}px`,
                    boxShadow: `0 12px 28px ${b.glow}`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br ${b.gradient} cursor-pointer hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-white font-bold select-none group animate-pulse`}
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">{b.label}</span>
                  {/* Balloon knot & string */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-inherit" />
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-white/70" />
                </div>
              ))}
            </div>

            {/* Bottom Clear All Button */}
            <div className="text-center pb-4">
              <button
                onClick={handleFlyAllBalloons}
                className="px-6 py-2 rounded-full bg-white/90 hover:bg-white text-[#2C2623] text-xs font-bold shadow-md border border-[#D4AF37]/40 hover:scale-105 transition-all"
              >
                Fly All Balloons 🎈
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE OVERLAY 02: PARABOLIC ARC GESTURE (parabola_arc) */}
        {/* ========================================================= */}
        {effectiveRevealMode === "parabola_arc" && !isParabolaUnlocked && (
          <div 
            onMouseDown={(e) => handleParabolaStart(e.clientX)}
            onMouseMove={(e) => handleParabolaMove(e.clientX)}
            onMouseUp={handleParabolaEnd}
            onTouchStart={(e) => handleParabolaStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleParabolaMove(e.touches[0].clientX)}
            onTouchEnd={handleParabolaEnd}
            className="absolute inset-0 z-40 bg-black/35 backdrop-blur-[2px] flex flex-col justify-between p-6 animate-fade-in cursor-grab active:cursor-grabbing pointer-events-auto"
          >
            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 text-[#8C4A52] font-bold text-xs shadow-lg border border-[#D4AF37]/40">
                <MoveHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Swipe along the arc to unlock card</span>
              </div>
            </div>

            {/* Parabolic visual track */}
            <div className="relative flex-1 flex flex-col items-center justify-center my-4">
              <svg className="w-64 h-32 text-[#D4AF37]/80 overflow-visible" viewBox="0 0 200 100">
                <path d="M 10 90 Q 100 10 190 90" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
                {/* Glowing dragger circle */}
                <circle 
                  cx={10 + parabolaProgress * 180} 
                  cy={90 - Math.sin(parabolaProgress * Math.PI) * 80} 
                  r="14" 
                  className="fill-[#8C4A52] stroke-white stroke-2 shadow-2xl filter drop-shadow-md" 
                />
              </svg>
              <span className="text-white text-xs font-bold tracking-wider uppercase mt-4 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                {Math.round(parabolaProgress * 100)}% Unlocked
              </span>
            </div>

            <div className="text-center pb-4">
              <button
                onClick={() => setIsParabolaUnlocked(true)}
                className="text-[11px] text-white/90 underline font-semibold hover:text-white"
              >
                Skip Gesture & Reveal →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE OVERLAY 03: ROYAL SATIN RIBBON (ribbon_untie) */}
        {/* ========================================================= */}
        {effectiveRevealMode === "ribbon_untie" && !isRibbonUntied && (
          <div 
            ref={ribbonContainerRef}
            onClick={handleUntieRibbon}
            className="absolute inset-0 z-40 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-6 animate-fade-in cursor-pointer pointer-events-auto group overflow-hidden select-none"
          >
            {/* Split Satin Ribbons (Left & Right halves) */}
            <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
              {/* Left Satin Band */}
              <div 
                ref={leftRibbonRef}
                className="w-1/2 h-16 bg-gradient-to-r from-[#701A24] via-[#8C4A52] to-[#AA3A48] border-y-2 border-[#D4AF37] shadow-2xl relative flex items-center justify-end pr-2"
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent absolute top-1.5" />
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent absolute bottom-1.5" />
              </div>

              {/* Right Satin Band */}
              <div 
                ref={rightRibbonRef}
                className="w-1/2 h-16 bg-gradient-to-r from-[#AA3A48] via-[#8C4A52] to-[#701A24] border-y-2 border-[#D4AF37] shadow-2xl relative flex items-center justify-start pl-2"
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent absolute top-1.5" />
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent absolute bottom-1.5" />
              </div>

              {/* Center Royal Bow & Scissors Medallion */}
              <div 
                ref={centerBowRef}
                className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#996515] border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 pointer-events-auto"
              >
                {/* Floating Ribbon Tails */}
                <div className="absolute -bottom-6 left-2 w-4 h-9 bg-gradient-to-b from-[#AA3A48] to-[#701A24] -rotate-12 rounded-b-md shadow-md -z-10" />
                <div className="absolute -bottom-6 right-2 w-4 h-9 bg-gradient-to-b from-[#AA3A48] to-[#701A24] rotate-12 rounded-b-md shadow-md -z-10" />
                
                <span className="text-3xl filter drop-shadow-md">🎀</span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2C2623] mt-0.5 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
                  ✂️ Cut Ribbon
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 px-5 py-2 rounded-full bg-white/95 text-[#8C4A52] text-xs font-bold shadow-xl border border-[#D4AF37]/50 flex items-center gap-1.5 animate-bounce">
              <span>✂️</span>
              <span>Tap the golden bow to cut the ribbon!</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE OVERLAY 04: FLORAL BLOSSOM BURST (floral_bloom) */}
        {/* ========================================================= */}
        {effectiveRevealMode === "floral_bloom" && !isFloralBloomed && (
          <div 
            onClick={() => {
              setIsFloralBloomed(true);
              triggerCardContentReveal();
            }}
            className="absolute inset-0 z-40 bg-black/35 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 animate-fade-in cursor-pointer pointer-events-auto group"
          >
            <div className="w-32 h-32 rounded-full bg-white/90 border-2 border-[#D4AF37] shadow-2xl flex flex-col items-center justify-center text-center p-4 group-hover:scale-110 transition-transform">
              <span className="text-4xl animate-bounce">🌸</span>
              <span className="text-xs font-bold text-[#8C4A52] mt-1 font-serif">Touch to Bloom</span>
            </div>
            <div className="mt-6 px-4 py-1.5 rounded-full bg-white/90 text-[#2C2623] text-xs font-bold shadow-md border border-[#D4AF37]/40">
              Tap to scatter blossoms & reveal card
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTIVE OVERLAY 05: GOLDEN STARDUST WIPE (scratch) */}
        {/* ========================================================= */}
        {effectiveRevealMode === "scratch" && !isScratchDone && (
          <div 
            onClick={() => {
              setIsScratchDone(true);
              triggerCardContentReveal();
            }}
            className="absolute inset-0 z-40 bg-gradient-to-b from-[#D4AF37]/95 via-[#AA771C]/90 to-[#6E4F10]/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 animate-fade-in cursor-pointer pointer-events-auto"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
              <Wand2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white text-lg font-bold font-serif mb-1">Golden Stardust Shield</h3>
            <p className="text-amber-100 text-xs text-center max-w-xs mb-6">
              Swipe or tap across the screen to clear the golden stardust veil.
            </p>
            <button className="px-6 py-2 rounded-full bg-white text-[#8C4A52] text-xs font-bold shadow-xl hover:scale-105 transition-transform">
              Reveal Invitation ✨
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
