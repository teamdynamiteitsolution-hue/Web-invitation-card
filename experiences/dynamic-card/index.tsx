"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { PlayCircle } from "lucide-react";
import { ScratchZone } from "@/components/ScratchZone";
import { DynamicLayout } from "@/app/create/components/editor/DynamicLayout";

export default function DynamicCardExperience({ template, animation, eventData, revealMode, customImage, bgBlur, skipAnimation }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(skipAnimation || !animation?.videoUrl);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const manifest = template?.assetManifest 
    ? (typeof template.assetManifest === 'string' ? JSON.parse(template.assetManifest) : template.assetManifest) 
    : {};
  const layout = template?.layoutConfig 
    ? (typeof template.layoutConfig === 'string' ? JSON.parse(template.layoutConfig) : template.layoutConfig) 
    : { nodes: [] };
  // Fallback to template preview image only when manifest.cardAsset is missing or invalid
  const cardAsset = (manifest.cardAsset && typeof manifest.cardAsset === 'string' && manifest.cardAsset.trim() !== '')
    ? manifest.cardAsset
    : (template?.previewImageUrl || "/assets/Cards/card 1.png");
  const decorations = manifest.decorations || [];
  const videoUrl = animation?.videoUrl;

  useEffect(() => {
    setIsVideoFinished(skipAnimation || !videoUrl);
    setIsPlaying(false);
  }, [videoUrl, skipAnimation]);

  useEffect(() => {
    // Reveal nodes based on revealMode if video is finished
    if (isVideoFinished && nodesRef.current) {
      const nodes = Array.from(nodesRef.current.children);
      if (revealMode === "sequential") {
        gsap.fromTo(nodes, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.5 });
      } else if (revealMode === "fade") {
        gsap.fromTo(nodes, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.inOut", delay: 0.5 });
      } else {
        // default instant or unhandled mode
        gsap.set(nodes, { opacity: 1 });
      }
    }
  }, [isVideoFinished, revealMode]);

  const handlePlay = () => {
    if (!videoRef.current) return;
    setIsPlaying(true);
    videoRef.current.play().catch(console.error);
  };

  const handleVideoEnded = () => {
    // Transition to the card
    setIsVideoFinished(true);
    
    // A quick white flash transition matching the video's end state
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(containerRef.current, { backgroundColor: "#ffffff" }, { backgroundColor: "transparent", duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[412px] mx-auto h-[100dvh] md:h-[85vh] md:max-h-[915px] bg-[#FAF8F5] overflow-hidden md:rounded-[32px] md:shadow-2xl flex flex-col items-center justify-center font-serif">
      
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

      {/* Card Phase - Solid and instantly displayed without underlying ghost image flash */}
      <div 
        ref={cardRef} 
        className="absolute inset-0 z-10 w-full h-full flex flex-col bg-[#FAF8F5]"
      >
        {/* Card Artwork */}
        {cardAsset && (
          <img src={cardAsset} alt="Card Background" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        )}

        {/* Dynamic Nodes - Confined strictly to the card inner safe printable zone */}
        <div ref={nodesRef} className="absolute inset-x-8 top-[14%] bottom-[14%] flex items-center justify-center pointer-events-auto">
          <DynamicLayout 
            layoutPresetId={eventData?.layoutPresetId || 'classic_editorial'} 
            eventData={eventData} 
            typographyStyles={eventData?.typographyStyles || {}} 
          />
        </div>
      </div>
    </div>
  );
}
