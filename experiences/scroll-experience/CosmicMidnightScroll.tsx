"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Sparkles, Moon, Star, Navigation, Compass
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function CosmicMidnightScroll({
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
    eventLabel = "A Celestial Starlight Gala",
    groomPhoto = "/assets/categories/birthday.webp",
    bridePhoto = "/assets/categories/birthday.webp",
    couplePhoto = "/assets/categories/birthday.webp",
    invitationMessage = "Underneath an infinite expanse of constellations, two paths converge. We invite you to an enchanting evening of starlight, fine melodies, and celestial celebrations.",
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
    <div className="w-full min-h-screen bg-[#05070E] text-[#E2E8F0] font-sans selection:bg-[#FCD34D] selection:text-[#05070E] pb-24 relative overflow-x-hidden">
      
      {/* 🌌 COSMIC STARFIELD & NEBULA BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(#FCD34D_0.75px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-950/40 via-purple-900/30 to-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP CELESTIAL ORBIT COORDINATES BAR */}
      <div className="w-full border-b border-white/10 px-4 py-3 text-center bg-white/[0.02] backdrop-blur-md">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#FCD34D]">
          ✦ CELESTIAL ALIGNMENT • LAT 23.8103° N • LON 90.4125° E ✦
        </span>
      </div>

      {/* 2. CIRCULAR LUNAR TELESCOPE LENS HERO BANNER */}
      <section className="relative z-10 px-4 sm:px-6 pt-12 pb-16 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-[#FCD34D]/40 text-[#FCD34D] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-8 shadow-sm">
          <Moon className="w-3.5 h-3.5" />
          <span>{eventLabel}</span>
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>

        {/* ROTATING CONSTELLATION RING & LUNAR LENS PORTRAIT */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-10 flex items-center justify-center">
          
          {/* Outer Rotating Dotted Constellation Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FCD34D]/40 animate-spin" style={{ animationDuration: '45s' }} />
          <div className="absolute -inset-3 rounded-full border border-indigo-400/20" />
          
          {/* Lunar Lens Couple Portrait */}
          <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-[#FCD34D] shadow-[0_0_50px_rgba(252,211,77,0.25)] relative bg-slate-900">
            <img 
              src={heroBannerImg} 
              alt="Celestial Gala" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            
            {/* Monogram Seal */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-950/90 border border-[#FCD34D] text-[#FCD34D] font-serif text-xs font-bold tracking-widest">
              {initials || "A&Z"}
            </div>
          </div>
        </div>

        {/* Couple Headline */}
        <div className="my-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#F59E0B] tracking-wide" style={brideStyle}>
            {brideName}
          </h1>
          <span className="text-xl sm:text-2xl font-serif italic text-indigo-300 block my-1">&amp;</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#F59E0B] tracking-wide" style={groomStyle}>
            {groomName}
          </h1>
        </div>

        {/* Date & Time Glass Card */}
        <div className="mt-8 p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-[#FCD34D]/30 shadow-2xl max-w-sm w-full">
          <div className="flex items-center justify-center gap-2 text-[#FCD34D] font-bold text-base mb-1" style={headingStyle}>
            <Calendar className="w-4 h-4 text-[#FCD34D]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-indigo-200 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#FCD34D]" />
            <span>{time}</span>
          </div>
        </div>
      </section>

      {/* 3. GLOWING STAR TRAJECTORY TIMELINE */}
      <section className="relative z-10 px-4 sm:px-6 py-14 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FCD34D] block mb-1">Starlight Path</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white" style={headingStyle}>Evening Gala Itinerary</h2>
        </div>

        <div className="relative border-l-2 border-indigo-500/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {[
            { time: "19:30", title: "Twilight Reception & Cosmic Cocktails", desc: "Ambient string quartet and illuminated starlight welcome." },
            { time: "20:30", title: "The Starlit Solemn Vows", desc: "Exchange of vows under celestial canopy." },
            { time: "21:45", title: "Imperial Candlelit Banquet", desc: "Gourmet dining experience under glowing chandeliers." },
            { time: "23:00", title: "Midnight Toast & Stargazing", desc: "Champagne reflections, music, and midnight lantern release." }
          ].map((item, i) => (
            <div key={i} className="relative group">
              {/* Glowing Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#FCD34D] shadow-[0_0_12px_#FCD34D] border-2 border-[#05070E]" />
              
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FCD34D]/50 transition-colors">
                <span className="font-mono text-xs font-bold text-[#FCD34D] block mb-1">{item.time} HOURS</span>
                <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs font-serif italic text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LUMINOUS HUD COUNTDOWN */}
      <section className="relative z-10 px-4 sm:px-6 py-12 max-w-xl mx-auto text-center">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FCD34D] block mb-3">Countdown to Starlight</span>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: "DAYS", val: timeLeft.days },
            { label: "HOURS", val: timeLeft.hours },
            { label: "MINS", val: timeLeft.minutes },
            { label: "SECS", val: timeLeft.seconds }
          ].map((t, i) => (
            <div key={i} className="p-3 sm:p-4 rounded-xl bg-black/60 border border-[#FCD34D]/30 shadow-[0_0_15px_rgba(252,211,77,0.1)] flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#FDE68A]">{String(t.val).padStart(2, '0')}</span>
              <span className="text-[9px] text-indigo-300 font-mono mt-0.5">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OBSERVATORY VENUE & NAVIGATION */}
      <section className="relative z-10 px-4 sm:px-6 py-12 max-w-2xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-[#FCD34D]/30 text-center shadow-2xl">
          <MapPin className="w-8 h-8 text-[#FCD34D] mx-auto mb-2" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1" style={headingStyle}>{venue}</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-serif mb-6">{venueAddress}</p>
          
          <a
            href={googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue + ' ' + venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] text-[#05070E] font-bold text-xs shadow-xl hover:scale-105 transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </section>

      {/* 6. DRESS CODE & RSVP */}
      <section className="relative z-10 px-4 sm:px-6 text-center max-w-md mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-950 border border-indigo-400/40 text-indigo-200 text-xs font-mono mb-4">
          ✨ DRESS CODE: BLACK TIE / STARLIGHT ELEGANCE
        </div>
        <p className="text-xs text-slate-400 font-serif">RSVP &amp; Attendance: <span className="font-mono font-bold text-[#FCD34D]">{rsvpContact}</span></p>
      </section>

    </div>
  );
}
