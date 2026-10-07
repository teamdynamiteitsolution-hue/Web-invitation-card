"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  music?: {
    url: string;
    name?: string;
    loop?: boolean;
    volume?: number;
    enabled?: boolean;
  } | null;
  triggerPlay?: boolean;
}

export function AudioPlayer({ music, triggerPlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const musicUrl = music?.url;
  const isEnabled = music?.enabled !== false && Boolean(musicUrl);
  const volume = music?.volume !== undefined ? music.volume : 0.7;
  const loop = music?.loop !== false;

  const startAudio = useCallback(() => {
    if (!audioRef.current || !isEnabled) return;
    audioRef.current.volume = isMuted ? 0 : volume;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      })
      .catch(() => {
        // Autoplay policy prevented playback, wait for explicit tap
      });
  }, [isEnabled, isMuted, volume]);

  // Autoplay on first touch/interaction or triggerPlay
  useEffect(() => {
    if (!isEnabled) return;

    if (triggerPlay && !isPlaying) {
      startAudio();
    }

    if (!hasInteracted) {
      const handleFirstGesture = () => {
        startAudio();
        window.removeEventListener("click", handleFirstGesture);
        window.removeEventListener("touchstart", handleFirstGesture);
        window.removeEventListener("scroll", handleFirstGesture);
      };

      window.addEventListener("click", handleFirstGesture, { passive: true });
      window.addEventListener("touchstart", handleFirstGesture, { passive: true });
      window.addEventListener("scroll", handleFirstGesture, { passive: true });

      return () => {
        window.removeEventListener("click", handleFirstGesture);
        window.removeEventListener("touchstart", handleFirstGesture);
        window.removeEventListener("scroll", handleFirstGesture);
      };
    }
  }, [isEnabled, triggerPlay, hasInteracted, isPlaying, startAudio]);

  if (!isEnabled || !musicUrl) return null;

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.volume = volume;
      setIsMuted(false);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop={loop}
        preload="auto"
        onEnded={() => {
          if (!loop) setIsPlaying(false);
        }}
      />

      {/* Floating Audio Controller */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none group"
        onMouseEnter={() => setShowTitle(true)}
        onMouseLeave={() => setShowTitle(false)}
      >
        {/* Track Title Tooltip */}
        {(showTitle || isPlaying) && music?.name && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs rounded-full border border-white/20 shadow-lg animate-fade-in">
            <Music className="w-3 h-3 text-[#D4AF37] animate-bounce" />
            <span className="truncate max-w-[150px]">{music.name}</span>
          </div>
        )}

        <button
          onClick={toggleMute}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border ${
            isMuted || !isPlaying
              ? "bg-white/80 text-gray-700 border-gray-300 hover:bg-white"
              : "bg-[#8C4A52] text-white border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          }`}
          aria-label={isMuted ? "Unmute Ceremonial Music" : "Mute Ceremonial Music"}
          title={isMuted ? "Click to Play Music" : "Click to Mute Music"}
        >
          {isMuted || !isPlaying ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
