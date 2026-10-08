"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Sparkles, Navigation, Music2, Flame
} from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

export default function CarnivalHaldiScroll({
  template,
  eventData,
  skipAnimation = false
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const {
    brideName = "প্রিয়াঙ্কা",
    groomName = "রাহুল",
    date = "Thursday, 22 October 2027",
    time = "5:30 PM Onwards",
    venue = "The Marigold Courtyard",
    venueAddress = "Banani Club Field, Dhaka",
    googleMapsUrl = "",
    eventLabel = "হলুদ ও সঙ্গীত কার্নিভাল",
    groomPhoto = "/assets/categories/haldi.webp",
    bridePhoto = "/assets/categories/haldi.webp",
    couplePhoto = "/assets/categories/haldi.webp",
    invitationMessage = "এক অঞ্জলি হলুদ, হাতের মেহেন্দি আর রাতভর নাচ-গানের ধামাকা! আমাদের গায়ে হলুদ ও সঙ্গীত সন্ধ্যায় আপনাদের সকলের রঙিন উপস্থিতি কামনা করছি।",
    rsvpContact = "+880 1711-223344",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: "'Noto Serif Bengali', 'Playfair Display', serif" };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: "'Noto Serif Bengali', 'Playfair Display', serif" };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: "'Noto Serif Bengali', 'Cinzel', serif" };

  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 8, minutes: 15, seconds: 30 });
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
    <div className="w-full min-h-screen bg-[#FFF9E6] text-[#4A2600] font-sans selection:bg-[#F59E0B]/30 pb-24 overflow-x-hidden relative">
      
      {/* 🌼 DRIPPING MARIGOLD GARLANDS TOP BANNER */}
      <div className="w-full bg-[#FEF08A] pt-4 pb-8 px-4 border-b-4 border-[#F59E0B] relative shadow-md text-center">
        {/* Decorative Marigold Garland Dots */}
        <div className="flex justify-around items-center max-w-xl mx-auto mb-2 text-2xl">
          <span>🌼</span><span>🔔</span><span>🌼</span><span>🔔</span><span>🌼</span><span>🔔</span><span>🌼</span>
        </div>
        
        <div className="inline-block px-5 py-1 rounded-full bg-[#F59E0B] text-white font-bold text-xs uppercase tracking-widest shadow-sm">
          {eventLabel}
        </div>
      </div>

      {/* 1. FAIRY LIGHT STRING WITH TILTED POLAROID PHOTO CLIPS */}
      <section className="px-4 sm:px-6 pt-10 pb-12 max-w-3xl mx-auto text-center">
        
        {/* Festive Wire / String Graphic */}
        <div className="relative w-full border-t-2 border-dashed border-[#D97706]/40 mb-10">
          <div className="absolute -top-3 left-1/4 w-6 h-6 rounded-full bg-amber-400/50 blur-xs" />
          <div className="absolute -top-3 right-1/4 w-6 h-6 rounded-full bg-amber-400/50 blur-xs" />
        </div>

        {/* Polaroid Clothespin Duo */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-8">
          
          {/* Bride Polaroid */}
          <div className="relative transform -rotate-3 bg-white p-3 pb-8 rounded-sm shadow-xl border border-amber-200 w-44 sm:w-52 group hover:rotate-0 transition-transform">
            {/* Wooden Clothespin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-8 bg-[#D4A373] rounded-xs shadow-sm border border-[#A98467] z-20" />
            <div className="aspect-[4/5] bg-amber-100 overflow-hidden mb-2">
              <img src={bridePhoto || "/assets/categories/haldi.webp"} alt={brideName} className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-sm font-bold text-[#D97706] block">{brideName}</span>
            <span className="text-[10px] text-amber-800 uppercase tracking-widest">Holud Konna</span>
          </div>

          {/* Groom Polaroid */}
          <div className="relative transform rotate-3 bg-white p-3 pb-8 rounded-sm shadow-xl border border-amber-200 w-44 sm:w-52 group hover:rotate-0 transition-transform">
            {/* Wooden Clothespin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-8 bg-[#D4A373] rounded-xs shadow-sm border border-[#A98467] z-20" />
            <div className="aspect-[4/5] bg-amber-100 overflow-hidden mb-2">
              <img src={groomPhoto || "/assets/categories/haldi.webp"} alt={groomName} className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-sm font-bold text-[#D97706] block">{groomName}</span>
            <span className="text-[10px] text-amber-800 uppercase tracking-widest">Holud Bor</span>
          </div>
        </div>

        {/* Couple Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold text-[#B45309] mt-4" style={brideStyle}>
          {brideName} <span className="text-2xl sm:text-4xl text-[#D97706]">&amp;</span> {groomName}
        </h1>
        
        <p className="text-sm font-serif italic text-amber-900 mt-3 max-w-lg mx-auto">
          "{invitationMessage}"
        </p>
      </section>

      {/* 2. 4-COLOR FESTIVE MOSAIC BLOCKS (Haldi, Mehendi, Sangeet, Dawat) */}
      <section className="px-4 sm:px-6 py-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#D97706] block mb-1">Carnival Highlights</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#78350F]" style={headingStyle}>চার পর্বের আনন্দোৎসব</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Block 1: Turmeric Haldi */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🌼</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">সন্ধ্যা ৬:০০</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">কাঁচা হলুদ পর্ব (Haldi Ritual)</h3>
              <p className="text-xs text-amber-950 font-serif leading-relaxed">সুগন্ধি হলুদ বাটা আর কাঁচা হলুদ মাখার রঙিন আনন্দ।</p>
            </div>
          </div>

          {/* Block 2: Henna Mehendi */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🌿</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">সন্ধ্যা ৬:৪৫</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">মেহেন্দি রাত (Henna Art)</h3>
              <p className="text-xs text-emerald-100 font-serif leading-relaxed">হাতে হাত রেখে আলপনা আর সুনিপুণ মেহেন্দির কারুকার্য।</p>
            </div>
          </div>

          {/* Block 3: Sangeet & Dance */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#DB2777] to-[#BE185D] text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🪘</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">রাত ৮:০০</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">সঙ্গীত ও নাচ (Sangeet &amp; Dhol)</h3>
              <p className="text-xs text-pink-100 font-serif leading-relaxed">ঢোলের তাল, প্রিয় গানের তালে বন্ধুদের বিশেষ পারফরম্যান্স।</p>
            </div>
          </div>

          {/* Block 4: Traditional Feast */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🍲</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">রাত ৯:১৫</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">শাহী নৈশভোজ (Feast &amp; Sweets)</h3>
              <p className="text-xs text-orange-100 font-serif leading-relaxed">গরম কাচ্চি বিরিয়ানি, ফিরনি, মিষ্টি ও ঐতিহ্যবাহী খাবার।</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DHOLAK MUSIC PLAYLIST BOX */}
      <section className="px-4 sm:px-6 py-8 max-w-xl mx-auto">
        <div className="p-6 rounded-3xl bg-white border-2 border-[#F59E0B] shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FEF08A] text-[#D97706] flex items-center justify-center font-bold">
              <Music2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#78350F]">আজকের রাতের সঙ্গীত তালিকা</h4>
              <p className="text-xs text-amber-800">Tonight's Celebration Tracklist</p>
            </div>
          </div>
          <div className="space-y-2 text-xs font-serif text-amber-900 divide-y divide-amber-100">
            <div className="pt-2 flex items-center justify-between">
              <span>🎵 ১. হলুদ বাটো মেন্দি বাটো (ঐতিহ্যবাহী গান)</span>
              <span className="text-[10px] font-bold text-[#D97706]">Folk Beats</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span>🎵 ২. সোহাগ চাঁদ বদনী ধনী (সুরের মূর্ছনা)</span>
              <span className="text-[10px] font-bold text-[#D97706]">Sangeet Special</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span>🎵 ৩. ধামাকা ঢোলক ফিউশন (নাচের পর্ব)</span>
              <span className="text-[10px] font-bold text-[#D97706]">DJ Remix</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FESTIVE COUNTDOWN (POT BADGES) */}
      <section className="px-4 sm:px-6 py-10 max-w-md mx-auto text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-[#D97706] block mb-2">আর মাত্র বাকি</span>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "দিন", val: timeLeft.days },
            { label: "ঘণ্টা", val: timeLeft.hours },
            { label: "মিনিট", val: timeLeft.minutes },
            { label: "সেকেন্ড", val: timeLeft.seconds }
          ].map((t, i) => (
            <div key={i} className="p-3 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-bold text-[#B45309] font-serif">{String(t.val).padStart(2, '0')}</span>
              <span className="text-[9px] font-bold text-amber-800 uppercase">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VENUE & GOOGLE MAPS */}
      <section className="px-4 sm:px-6 py-10 max-w-xl mx-auto text-center">
        <div className="p-6 rounded-3xl bg-white border-2 border-[#D97706] shadow-lg">
          <MapPin className="w-8 h-8 text-[#D97706] mx-auto mb-2" />
          <h3 className="text-xl font-bold text-[#78350F] mb-1" style={headingStyle}>{venue}</h3>
          <p className="text-xs sm:text-sm text-amber-900 font-serif mb-4">{venueAddress}</p>
          <a
            href={googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue + ' ' + venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#D97706] text-white font-bold text-xs shadow-md hover:bg-[#B45309] transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Maps এ ডিরেকশন</span>
          </a>
        </div>
      </section>

      {/* 6. DRESS CODE & RSVP */}
      <section className="px-4 sm:px-6 text-center max-w-sm mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-200/80 border border-amber-400 text-amber-900 text-xs font-bold mb-4">
          👗 ড্রেসকোড: হলুদ, বাসন্তী অথবা ফ্লোরাল
        </div>
        <p className="text-xs text-amber-900 font-serif">যোগাযোগ ও উপস্থিতি: <span className="font-bold text-[#B45309]">{rsvpContact}</span></p>
      </section>

    </div>
  );
}
