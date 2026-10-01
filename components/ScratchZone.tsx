"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface ScratchZoneProps {
  children: React.ReactNode;
  onComplete?: () => void;
  width?: string;
  height?: string;
  className?: string;
}

export function ScratchZone({ children, onComplete, width = "100%", height = "100%", className = "" }: ScratchZoneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set real size based on display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with "scratch coating" color (e.g. gold foil or matte cream)
    ctx.fillStyle = "#EAE2D6"; // matte cream
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle texture or text
    ctx.fillStyle = "#C3B19A";
    ctx.font = "italic 14px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to reveal", canvas.width / 2, canvas.height / 2);

    ctx.globalCompositeOperation = "destination-out";

    let lastX = 0;
    let lastY = 0;
    
    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const bcr = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - bcr.left,
          y: e.touches[0].clientY - bcr.top
        };
      } else {
        return {
          x: (e as MouseEvent).clientX - bcr.left,
          y: (e as MouseEvent).clientY - bcr.top
        };
      }
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      const coords = getCoordinates(e);
      lastX = coords.x;
      lastY = coords.y;
      scratch(e);
    };

    const stopDraw = () => {
      isDrawing.current = false;
      checkProgress();
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault(); // Prevent scrolling while scratching
      
      const coords = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(coords.x, coords.y);
      ctx.lineWidth = 25; // brush size
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      lastX = coords.x;
      lastY = coords.y;
    };

    const checkProgress = () => {
      if (isRevealed) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      
      const percent = transparent / (pixels.length / 4);
      if (percent > 0.5) {
        // 50% scratched, reveal completely
        setIsRevealed(true);
        gsap.to(canvas, { opacity: 0, duration: 0.5, onComplete: () => {
          if (onComplete) onComplete();
        }});
        
        // simple success particle effect
        if (containerRef.current) {
          const particle = document.createElement("div");
          particle.className = "absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#D4AF37] blur-[2px] pointer-events-none";
          containerRef.current.appendChild(particle);
          gsap.fromTo(particle, { scale: 0, opacity: 1 }, { scale: 3, opacity: 0, duration: 0.8, onComplete: () => particle.remove() });
        }
      }
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", scratch, { passive: false });
    canvas.addEventListener("touchend", stopDraw);
    canvas.addEventListener("touchcancel", stopDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", stopDraw);
      canvas.removeEventListener("touchcancel", stopDraw);
    };
  }, [isRevealed, onComplete]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} style={{ width, height }}>
      <div className="relative z-0">
        {children}
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 w-full h-full cursor-pointer touch-none"
        />
      )}
    </div>
  );
}
