"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Sparkles, Moon, Star, Navigation
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function CelestialMidnightScroll({
  template,
  eventData,
  skipAnimation = false
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const {
    brideName = "Aria",
    groomName = "Zayn",
    date = "Saturday, 14 November 2026",
    time = "7:30 PM",
    venue = "The Starlight Ballroom & Observatory",
    venueAddress = "Radisson Blu Water Garden, Airport Road, Dhaka",
    googleMapsUrl = "",
    eventLabel = "Underneath The Starlit Sky",
    groomPhoto = "/assets/categories/birthday.webp",
    bridePhoto = "/assets/categories/birthday.webp",
    couplePhoto = "/assets/categories/birthday.webp",
    invitationMessage = "Written in the stars, bound by love. We invite you to an enchanting candlelit evening of starry celebrations, divine music, and unforgettable memories.",
    rsvpContact = "+880 1900-333444",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: "'Cinzel Decorative', 'Cinzel', serif" };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: "'Cinzel Decorative', 'Cinzel', serif" };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: "'Cinzel', serif" };

  const initials = getMonogram(brideName, groomName, 'circle');
  const heroBannerImg = couplePhoto || bridePhoto || "/assets/categories/birthday.webp";

  const [timeLeft, setTimeLeft] = useState({ days: 105, hours: 19, minutes: 30, seconds: 10 });
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

  return (
    <div className="w-full min-h-screen bg-[#080B12] text-[#E2E8F0] font-sans selection:bg-[#FCD34D] selection:text-[#080B12] pb-24 relative overflow-x-hidden">
      
      {/* Background Starfield Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(#FCD34D_0.8px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/20 via-indigo-900/30 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. CELESTIAL HERO ARCH BANNER */}
      <section className="relative z-10 w-full min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-14 sm:py-18">
        
        <div className="max-w-xl mx-auto flex flex-col items-center w-full">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-[#FCD34D]/30 text-[#FCD34D] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Moon className="w-3.5 h-3.5" />
            <span>{eventLabel}</span>
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>

          {/* STARLIT ARCH HERO CARD BANNER */}
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[4/5] rounded-[50%_50%_24px_24px] p-2 bg-gradient-to-b from-[#FCD34D] via-indigo-600 to-[#FCD34D] shadow-[0_0_40px_rgba(252,211,77,0.2)] mb-8">
            <div className="relative w-full h-full rounded-[48%_48%_20px_20px] overflow-hidden bg-indigo-950 border-2 border-indigo-300/40">
              <img 
                src={heroBannerImg} 
                alt="Celestial Night" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              
              {/* Top Stardust Icon */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-indigo-950/80 backdrop-blur-md border border-[#FCD34D]/40 flex items-center justify-center text-[#FCD34D]">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "10s" }} />
              </div>

              {/* Bottom Constellation Monogram Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-indigo-950 text-[#FCD34D] flex items-center justify-center font-serif text-base font-bold shadow-xl border border-[#FCD34D]">
                  {initials || "A&Z"}
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 flex flex-col items-center gap-2">
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#F59E0B] tracking-wide" style={brideStyle}>
              {brideName}
            </h1>
            <span className="text-lg sm:text-xl font-serif italic text-indigo-300">&amp;</span>
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#F59E0B] tracking-wide" style={groomStyle}>
              {groomName}
            </h1>
          </div>

          {/* Starlit Event Badge */}
          <div className="mt-6 p-4 sm:p-5 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-[#FCD34D]/30 shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-center gap-2 text-[#FCD34D] font-bold text-sm sm:text-base mb-1" style={headingStyle}>
              <Calendar className="w-4 h-4 text-[#FCD34D]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-indigo-200 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 text-[#FCD34D]" />
              <span>{time}</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-center gap-2 text-slate-300 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#FCD34D] shrink-0" />
              <span className="truncate">{venue}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOVE NOTE & INVITATION */}
      <section className="relative z-10 py-14 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#FCD34D] to-transparent mx-auto mb-6" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={headingStyle}>
          An Evening of Celestial Magic
        </h2>
        <p className="text-base font-serif italic text-slate-300 leading-relaxed mb-6 px-4">
          "{invitationMessage}"
        </p>
      </section>

      {/* 3. COUPLE SPOTLIGHT IN GLASS FRAMES */}
      <section className="relative z-10 py-10 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-5 border border-[#FCD34D]/30 shadow-2xl text-center flex flex-col items-center">
            <div className="w-40 h-52 rounded-2xl overflow-hidden border-2 border-[#FCD34D]/40 mb-3 relative shadow-[0_0_15px_rgba(252,211,77,0.15)]">
              <img src={bridePhoto || "/assets/categories/birthday.webp"} alt={brideName} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FCD34D]" style={brideStyle}>{brideName}</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">The Bride</span>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-5 border border-[#FCD34D]/30 shadow-2xl text-center flex flex-col items-center">
            <div className="w-40 h-52 rounded-2xl overflow-hidden border-2 border-[#FCD34D]/40 mb-3 relative shadow-[0_0_15px_rgba(252,211,77,0.15)]">
              <img src={groomPhoto || "/assets/categories/birthday.webp"} alt={groomName} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FCD34D]" style={groomStyle}>{groomName}</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">The Groom</span>
          </div>
        </div>
      </section>

      {/* 4. LUMINOUS COUNTDOWN */}
      <section className="relative z-10 py-14 px-4 sm:px-6 my-10 bg-gradient-to-b from-indigo-950/40 via-purple-950/40 to-indigo-950/40 border-y border-[#FCD34D]/20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FCD34D] block mb-1">Counting The Stars Until Tonight</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={headingStyle}>Moments Remaining</h2>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINS", val: timeLeft.minutes },
              { label: "SECS", val: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="p-3 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-[#FCD34D]/30 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#FDE68A]">{String(item.val).padStart(2, '0')}</span>
                <span className="text-[9px] text-indigo-300 font-semibold tracking-wider mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NIGHT ITINERARY */}
      <section className="relative z-10 py-14 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FCD34D] block mb-1">The Night's Flow</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white" style={headingStyle}>Evening Itinerary</h2>
        </div>

        <div className="space-y-3">
          {[
            { time: "7:30 PM", title: "Candlelit Welcome", desc: "Arrival of guests with twilight cocktails and celestial ambient strings." },
            { time: "8:30 PM", title: "The Starlight Vows", desc: "Solemn ceremony and vows exchange under starlight canopy." },
            { time: "9:45 PM", title: "Imperial Banquet", desc: "Exquisite banquet dining experience curated with gourmet flavors." },
            { time: "11:00 PM", title: "Midnight Toast", desc: "Celebration cake cutting, live music, and fireworks beneath the sky." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FCD34D]/50 transition-colors flex items-start gap-3">
              <div className="px-2.5 py-1 rounded-xl bg-indigo-950/80 border border-[#FCD34D]/40 text-[#FCD34D] font-mono text-[11px] font-bold shrink-0">
                {item.time}
              </div>
              <div>
                <h4 className="font-bold text-base text-white mb-0.5">{item.title}</h4>
                <p className="text-xs font-serif italic text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VENUE GUIDE */}
      <section className="relative z-10 py-14 px-4 sm:px-6">
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-[#FCD34D]/30 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-indigo-950 text-[#FCD34D] border border-[#FCD34D] mx-auto flex items-center justify-center shadow-lg mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1" style={headingStyle}>{venue}</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-serif mb-6">{venueAddress}</p>

          <a
            href={googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue + ' ' + venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-[#080B12] font-bold text-xs shadow-xl hover:scale-105 transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Navigate on Google Maps</span>
          </a>
        </div>
      </section>

      {/* 7. RSVP */}
      <section className="relative z-10 py-10 px-4 sm:px-6 text-center max-w-md mx-auto">
        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-1" style={headingStyle}>RSVP</h3>
          <p className="text-xs text-slate-400 font-serif mb-4">Kindly confirm your presence with our hospitality desk:</p>
          <div className="px-5 py-2.5 rounded-2xl bg-indigo-950/60 border border-[#FCD34D]/40 text-base font-mono font-bold text-[#FCD34D] mb-3">
            {rsvpContact}
          </div>
          <p className="text-[11px] text-slate-400 font-serif italic">May your presence illuminate our special night! ✨</p>
        </div>
      </section>

    </div>
  );
}
