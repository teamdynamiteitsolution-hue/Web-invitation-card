"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Sparkles, RotateCcw } from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

const ScratchZone = ({ width, height, text, onComplete }: { width: number, height: number, text: string, onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with a nice gold/copper texture color
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, 0, width, height);
    
    // Add some scratch instructions text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', width / 2, height / 2);
  }, [width, height, isScratched]);

  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    
    checkCompletion();
  };

  const checkCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, width, height);
    let transparentPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] === 0) transparentPixels++;
    }
    
    const totalPixels = width * height;
    if (transparentPixels / totalPixels > 0.5 && !isScratched) { // 50% scratched
      setIsScratched(true);
      gsap.to(canvas, { opacity: 0, duration: 0.5, onComplete });
    }
  };

  return (
    <div className="relative inline-block" style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center text-[#8C4A52] font-bold tracking-widest bg-white/50 rounded-lg">
        {text}
      </div>
      {!isScratched && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={handleDraw}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={handleDraw}
          className="absolute inset-0 cursor-pointer rounded-lg shadow-inner"
        />
      )}
    </div>
  );
};

export default function MultiScratch({ template, eventData, skipAnimation }: { template?: any; eventData?: any; skipAnimation?: boolean }) {
  const totalZones = 3;
  const [zonesCompleted, setZonesCompleted] = useState(skipAnimation ? totalZones : 0);
  
  useEffect(() => {
    setZonesCompleted(skipAnimation ? totalZones : 0);
  }, [skipAnimation]);

  const handleReplay = () => {
    setZonesCompleted(0);
  };

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: 'Cinzel, serif' };

  return (
    <div className="relative w-full max-w-md mx-auto h-[80vh] md:h-[85vh] md:max-h-[800px] bg-gradient-to-br from-[#FFF9F2] to-[#FFE6CC] rounded-[32px] overflow-hidden shadow-2xl flex flex-col items-center p-8 border border-[#D4AF37]/30">
      <div className="w-24 h-24 rounded-full overflow-hidden border-[4px] border-[#D4AF37] shadow-xl p-1 bg-white mb-6">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img src={eventData?.couplePhoto || "/assets/categories/haldi.webp"} alt="Couple" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-[#D4AF37] mb-2" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>
        শুভ বিবাহ
      </h1>
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-xl font-bold text-[#2C2623] uppercase tracking-widest" style={groomStyle as any}>
          {eventData?.groomName || "Rahul"}
        </h2>
        <span className="text-xl font-serif italic text-[#7C7267]">&amp;</span>
        <h2 className="text-xl font-bold text-[#2C2623] uppercase tracking-widest" style={brideStyle as any}>
          {eventData?.brideName || "Priyanka"}
        </h2>
      </div>
      
      <p className="text-sm font-serif italic text-[#7C7267] mb-6 text-center">
        Scratch the cards below to reveal the details of our joyous beginning.
      </p>

      <div className="flex flex-col gap-6 w-full items-center mt-4">
        {/* Date Zone */}
        {zonesCompleted === 0 ? (
          <div className="text-center w-full">
             <p className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">The Date</p>
             <ScratchZone width={200} height={40} text={eventData?.date ? eventData.date.toUpperCase() : "14TH DEC 2024"} onComplete={() => setZonesCompleted(prev => prev + 1)} />
          </div>
        ) : (
          <div className="text-center w-full animate-fade-in">
             <p className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">The Date</p>
             <div className="w-[200px] h-[40px] flex items-center justify-center mx-auto text-[#8C4A52] font-bold tracking-widest border border-[#D4AF37]/30 rounded-lg bg-white/50 uppercase">
               {eventData?.date || "14TH DEC 2024"}
             </div>
          </div>
        )}

        {/* Time Zone */}
        {zonesCompleted === 1 ? (
          <div className="text-center w-full">
             <p className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">The Time</p>
             <ScratchZone width={200} height={40} text={eventData?.time ? eventData.time.toUpperCase() : "11:00 AM"} onComplete={() => setZonesCompleted(prev => prev + 1)} />
          </div>
        ) : zonesCompleted > 1 ? (
          <div className="text-center w-full animate-fade-in">
             <p className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">The Time</p>
             <div className="w-[200px] h-[40px] flex items-center justify-center mx-auto text-[#8C4A52] font-bold tracking-widest border border-[#D4AF37]/30 rounded-lg bg-white/50 uppercase">
               {eventData?.time || "11:00 AM"}
             </div>
          </div>
        ) : (
          <div className="w-[200px] h-[40px] mx-auto border-2 border-dashed border-[#D4AF37]/30 rounded-lg opacity-50" />
        )}

        {/* Venue Zone */}
        {zonesCompleted === 2 ? (
          <div className="text-center w-full">
             <p className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">The Venue</p>
             <ScratchZone width={250} height={50} text={eventData?.venue ? eventData.venue.toUpperCase() : "THE IMPERIAL GARDEN"} onComplete={() => setZonesCompleted(prev => prev + 1)} />
          </div>
        ) : zonesCompleted > 2 ? (
          <div className="text-center w-full animate-fade-in">
             <p className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-2">The Venue</p>
             <div className="w-[250px] h-[50px] flex items-center justify-center mx-auto text-[#8C4A52] font-bold tracking-widest border border-[#D4AF37]/30 rounded-lg bg-white/50 text-xs uppercase text-center px-2 leading-tight">
               {eventData?.venue || "THE IMPERIAL GARDEN"}
             </div>
          </div>
        ) : (
          <div className="w-[250px] h-[50px] mx-auto border-2 border-dashed border-[#D4AF37]/30 rounded-lg opacity-50" />
        )}
      </div>

      {zonesCompleted === totalZones && (
        <button 
          onClick={handleReplay}
          className="absolute bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-[#F9F0EC] text-[#8C4A52] flex items-center justify-center shadow-lg border border-[#D4AF37]/30 hover:scale-110 transition-transform animate-bounce"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
