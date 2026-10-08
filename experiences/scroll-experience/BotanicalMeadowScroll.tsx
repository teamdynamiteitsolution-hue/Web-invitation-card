"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Sparkles, Heart, 
  Navigation, Flower2
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function BotanicalMeadowScroll({
  template,
  eventData,
  skipAnimation = false
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const {
    brideName = "Marium",
    groomName = "Samiul",
    date = "Sunday, 08 November 2026",
    time = "4:30 PM (Sunset)",
    venue = "The Emerald Greenhouse & Lawn",
    venueAddress = "Sreemangal Resort & Spa, Sylhet",
    googleMapsUrl = "",
    eventLabel = "A Botanical Celebration of Love",
    groomPhoto = "/assets/categories/boubhat.webp",
    bridePhoto = "/assets/categories/boubhat.webp",
    couplePhoto = "/assets/categories/boubhat.webp",
    invitationMessage = "Surrounded by blossoming florals and the gentle whisper of nature, we invite you to celebrate our union in a romantic garden ceremony filled with love, laughter, and lifelong memories.",
    rsvpContact = "+880 1600-778899",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: "'Cormorant Garamond', serif" };

  const initials = getMonogram(brideName, groomName, 'circle');
  const heroBannerImg = couplePhoto || bridePhoto || "/assets/categories/boubhat.webp";

  const [timeLeft, setTimeLeft] = useState({ days: 92, hours: 16, minutes: 40, seconds: 20 });
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
    <div className="w-full min-h-screen bg-[#F4F7F4] text-[#2D3E33] font-sans selection:bg-[#3D5A45]/20 pb-20">
      
      {/* 1. BOTANICAL GARDEN HERO ARCH BANNER */}
      <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-14 sm:py-18 bg-gradient-to-b from-[#EAF1EB] via-[#F4F7F4] to-[#FAF8F5]">
        
        {/* Botanical Border Frame */}
        <div className="absolute inset-3 sm:inset-6 border border-[#3D5A45]/20 rounded-[32px] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center w-full">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#3D5A45]/30 text-[#3D5A45] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-xs">
            <Flower2 className="w-3.5 h-3.5 text-[#3D5A45]" />
            <span>{eventLabel}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#6B8F71]" />
          </div>

          {/* BOTANICAL ARCH HERO CARD BANNER */}
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[4/5] rounded-[50%_50%_24px_24px] p-2 bg-gradient-to-b from-[#6B8F71] via-emerald-100 to-[#3D5A45] shadow-2xl mb-8">
            <div className="relative w-full h-full rounded-[48%_48%_20px_20px] overflow-hidden bg-emerald-950 border-2 border-white">
              <img 
                src={heroBannerImg} 
                alt="Garden Celebration" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              
              {/* Monogram Seal at Arch Base */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/95 text-[#2D3E33] flex items-center justify-center font-serif text-base font-bold shadow-lg border border-emerald-300">
                  {initials || "S&M"}
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 flex flex-col items-center gap-1">
            <h1 className="text-4xl sm:text-6xl font-bold text-[#203628] italic tracking-wide" style={brideStyle}>
              {brideName}
            </h1>
            <div className="flex items-center gap-3 my-1">
              <span className="h-px w-10 bg-[#3D5A45]/30" />
              <span className="font-serif italic text-xl text-[#6B8F71]">&amp;</span>
              <span className="h-px w-10 bg-[#3D5A45]/30" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-[#203628] italic tracking-wide" style={groomStyle}>
              {groomName}
            </h1>
          </div>

          {/* Date & Garden Venue Capsule */}
          <div className="mt-6 p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-200/80 shadow-md max-w-md w-full">
            <div className="flex items-center justify-center gap-2 text-[#3D5A45] font-bold text-sm sm:text-base mb-1" style={headingStyle}>
              <Calendar className="w-4 h-4 text-[#6B8F71]" />
              <span>{date}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-stone-500 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 text-[#6B8F71]" />
              <span>{time}</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-emerald-100 flex items-center justify-center gap-2 text-[#2D3E33] text-xs sm:text-sm font-semibold">
              <MapPin className="w-4 h-4 text-[#3D5A45] shrink-0" />
              <span className="truncate">{venue}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INVITATION LOVE NOTE */}
      <section className="py-14 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <div className="w-12 h-1 bg-[#6B8F71] mx-auto rounded-full mb-6" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#203628] mb-4 italic" style={headingStyle}>
          A Garden Celebration
        </h2>
        <p className="text-base font-serif italic text-stone-600 leading-relaxed mb-6 px-4">
          "{invitationMessage}"
        </p>
        <div className="flex items-center justify-center gap-2 text-[#3D5A45]">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-[11px] uppercase tracking-widest font-bold">Grown in Love, Rooted Forever</span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </section>

      {/* 3. COUPLE GARDEN PORTRAITS */}
      <section className="py-10 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-40 h-52 rounded-2xl overflow-hidden border-4 border-[#F4F7F4] shadow-inner mb-3">
              <img src={bridePhoto || "/assets/categories/boubhat.webp"} alt={brideName} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#203628] italic" style={brideStyle}>{brideName}</h3>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B8F71]">The Bride</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-40 h-52 rounded-2xl overflow-hidden border-4 border-[#F4F7F4] shadow-inner mb-3">
              <img src={groomPhoto || "/assets/categories/boubhat.webp"} alt={groomName} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#203628] italic" style={groomStyle}>{groomName}</h3>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B8F71]">The Groom</span>
          </div>
        </div>
      </section>

      {/* 4. BOTANICAL COUNTDOWN */}
      <section className="py-14 px-4 sm:px-6 bg-[#3D5A45] text-white my-10 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 block mb-1">Moments Until We Bloom Together</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 italic" style={headingStyle}>Save The Date</h2>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINS", val: timeLeft.minutes },
              { label: "SECS", val: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-serif font-bold">{String(item.val).padStart(2, '0')}</span>
                <span className="text-[9px] text-emerald-200 font-semibold tracking-wider mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GARDEN TIMELINE */}
      <section className="py-14 px-4 sm:px-6 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B8F71] block mb-1">Garden Program</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#203628] italic" style={headingStyle}>Order of Celebration</h2>
        </div>

        <div className="space-y-3">
          {[
            { time: "4:30 PM", title: "Garden Arrival & Welcome Drinks", desc: "Fresh botanical mocktails, seasonal fruit spreads and live acoustic melodies." },
            { time: "5:15 PM", title: "Sunset Vows & Exchange of Rings", desc: "A heartfelt ceremony under the floral arch overlooking the lawn." },
            { time: "6:30 PM", title: "Lawn Reception & Candid Moments", desc: "Capturing polaroids and candid memories with family and friends." },
            { time: "8:00 PM", title: "Open-Air Garden Feast", desc: "Sumptuous buffet dining under fairy lights and starlit canopy." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-start gap-3">
              <div className="px-2.5 py-1 rounded-full bg-[#EAF1EB] text-[#3D5A45] font-bold text-[11px] shrink-0 border border-emerald-200">
                {item.time}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#203628] mb-0.5">{item.title}</h4>
                <p className="text-xs font-serif text-stone-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VENUE GUIDE */}
      <section className="py-14 px-4 sm:px-6 bg-[#EAF1EB]">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-white text-[#3D5A45] border border-emerald-300 mx-auto flex items-center justify-center shadow-md mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#203628] mb-1 italic" style={headingStyle}>{venue}</h3>
          <p className="text-xs sm:text-sm font-serif text-stone-600 mb-6">{venueAddress}</p>

          <a
            href={googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue + ' ' + venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3D5A45] text-white font-bold text-xs shadow-lg hover:bg-[#2A3F30] transition-all"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </section>

      {/* 7. RSVP */}
      <section className="py-12 px-4 sm:px-6 text-center max-w-md mx-auto">
        <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-md">
          <h3 className="text-xl font-bold text-[#203628] mb-1 italic" style={headingStyle}>RSVP &amp; Attendance</h3>
          <p className="text-xs font-serif text-stone-600 mb-4">We would be honored by your presence. Please contact:</p>
          <div className="px-5 py-2.5 rounded-2xl bg-[#EAF1EB] border border-emerald-200 text-base font-bold text-[#3D5A45] mb-3">
            {rsvpContact}
          </div>
          <p className="text-[11px] text-[#6B8F71] font-serif italic">Your blessings will blossom our new beginning! 🌿</p>
        </div>
      </section>

    </div>
  );
}
