"use client";

import React, { useState, useEffect } from "react";
import { Copy, CheckCircle2, Link2, Clock, CalendarDays } from "lucide-react";

export default function SuccessClient({ invitation, daysLeft }: { invitation: any, daysLeft: number }) {
  const [copied, setCopied] = useState(false);
  const [liveUrl, setLiveUrl] = useState("");

  useEffect(() => {
    // Generate the full URL correctly on the client side
    setLiveUrl(`${window.location.origin}/invite/${invitation.slug}`);
  }, [invitation.slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-12 items-center lg:items-start">
      
      {/* Left side: Preview */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#D4AF37]/20 flex flex-col items-center p-8 group animate-slide-up">
          <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
          <img 
            src={invitation.template.previewImageUrl} 
            alt="Preview" 
            className="w-full h-full object-contain filter drop-shadow-xl"
          />
        </div>
      </div>

      {/* Right side: Options */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center animate-fade-in">
        <div className="w-16 h-16 bg-[#F9F0EC] text-[#8C4A52] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-[#2C2623] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
          Payment Successful!
        </h1>
        <p className="text-[#7C7267] font-serif text-lg italic mb-8">
          Your invitation is now live and ready to be shared with your guests.
        </p>

        {/* Link Box */}
        <div className="bg-white rounded-3xl p-8 shadow-soft-surface border border-[#D4AF37]/30 mb-8">
          <h3 className="text-xs font-bold text-[#7C7267] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Your Live Link
          </h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={liveUrl} 
              disabled 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#2C2623] font-mono text-sm"
            />
            <button 
              onClick={handleCopy}
              className="px-6 py-3 rounded-xl bg-[#8C4A52] text-white font-bold hover:bg-[#7a3e45] transition-colors flex items-center gap-2"
            >
              {copied ? "Copied!" : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Validity Box */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 border-2 border-dashed border-[#D4AF37]/30 flex items-center gap-6">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#D4AF37]">
             <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2C2623] mb-1 uppercase tracking-widest">Validity Remaining</h4>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-[#8C4A52]" style={{ fontFamily: 'Cinzel, serif' }}>{daysLeft}</span>
              <span className="text-[#7C7267] font-serif italic mb-1">Days Left</span>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
