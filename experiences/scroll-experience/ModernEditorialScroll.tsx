"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, ArrowUpRight
} from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

export default function ModernEditorialScroll({
  template,
  eventData,
  skipAnimation = false
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const {
    brideName = "Sophia",
    groomName = "Alexander",
    date = "Friday, 18 December 2026",
    time = "6:00 PM",
    venue = "The Glasshouse Pavilion",
    venueAddress = "Dhanmondi Lakeview, Dhaka",
    googleMapsUrl = "",
    eventLabel = "The Wedding Issue",
    groomPhoto = "/assets/categories/anniversary.webp",
    bridePhoto = "/assets/categories/anniversary.webp",
    couplePhoto = "/assets/categories/anniversary.webp",
    invitationMessage = "Two distinct souls, one shared vision. We invite you to join us in an intimate evening celebrating modern love, architecture, and enduring promises.",
    rsvpContact = "+880 1800-111222",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: "'Bodoni Moda', 'Playfair Display', serif" };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: "'Bodoni Moda', 'Playfair Display', serif" };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: "'Bodoni Moda', 'Playfair Display', serif" };

  const heroBannerImg = couplePhoto || bridePhoto || "/assets/categories/anniversary.webp";

  const [timeLeft, setTimeLeft] = useState({ days: 88, hours: 10, minutes: 42, seconds: 15 });
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
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white pb-20">
      
      {/* 1. EDITORIAL COVER HERO BANNER */}
      <section className="px-4 sm:px-8 pt-8 pb-14 max-w-5xl mx-auto border-b border-[#1A1A1A]/10">
        
        {/* Magazine Top Meta Bar */}
        <div className="flex items-center justify-between py-2.5 border-y border-[#1A1A1A] text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono mb-8">
          <span>{eventLabel}</span>
          <span className="hidden sm:inline">NO. 08 • CEREMONIAL EDITORIAL</span>
          <span>{date.split(',')[0]}</span>
        </div>

        {/* Large Editorial Headline */}
        <div className="text-center sm:text-left my-6 sm:my-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#7C7267] block mb-1 font-mono">Special Issue</span>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.95]" style={brideStyle}>
              {brideName}
            </h1>
            <span className="text-2xl sm:text-4xl font-serif italic text-[#7C7267]">&amp;</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.95]" style={groomStyle}>
              {groomName}
            </h1>
          </div>
        </div>

        {/* Hero Editorial Card Banner Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-8">
          <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-stone-200">
            <img 
              src={heroBannerImg} 
              alt="Editorial Cover" 
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase shadow-sm">
              Cover Story
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-white rounded-2xl border border-stone-200 shadow-sm h-full">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-1">Ceremony Date</span>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight" style={headingStyle}>{date}</h3>
              <p className="text-xs font-serif italic text-stone-600 mb-6">{time}</p>
            </div>
            <div className="pt-4 border-t border-stone-100">
              <span className="text-[10px] font-mono tracking-widest uppercase text-stone-400 block mb-0.5">Location</span>
              <p className="font-bold text-sm text-[#1A1A1A]">{venue}</p>
              <p className="text-xs text-stone-500 mt-0.5">{venueAddress}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INVITATION STATEMENT */}
      <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto text-center">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 block mb-4">— The Invitation —</span>
        <blockquote className="text-xl sm:text-3xl md:text-4xl font-serif italic leading-snug text-[#1A1A1A] mb-6 font-light">
          "{invitationMessage}"
        </blockquote>
        <div className="h-px w-16 bg-[#1A1A1A] mx-auto" />
      </section>

      {/* 3. COUPLE PROFILES */}
      <section className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="flex flex-col items-start">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-300 shadow-lg mb-4">
              <img src={bridePhoto || "/assets/categories/anniversary.webp"} alt={brideName} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400">The Bride</span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-0.5 tracking-tight" style={brideStyle}>{brideName}</h3>
          </div>

          <div className="flex flex-col items-start md:pt-12">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-300 shadow-lg mb-4">
              <img src={groomPhoto || "/assets/categories/anniversary.webp"} alt={groomName} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400">The Groom</span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-0.5 tracking-tight" style={groomStyle}>{groomName}</h3>
          </div>
        </div>
      </section>

      {/* 4. COUNTDOWN */}
      <section className="bg-[#121212] text-white py-14 px-4 sm:px-8 my-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-stone-400 block mb-3">Milestone Countdown</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight" style={headingStyle}>Moments Until Forever</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINS", val: timeLeft.minutes },
              { label: "SECS", val: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-mono font-light">{String(item.val).padStart(2, '0')}</span>
                <span className="text-[9px] font-mono tracking-widest text-stone-400 mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIMELINE ITINERARY */}
      <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-stone-400 block mb-1">Program</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={headingStyle}>Order of Evening</h2>
        </div>

        <div className="border-t border-[#1A1A1A] divide-y divide-[#1A1A1A]/10">
          {[
            { num: "01", time: "18:00", title: "Cocktail Hour & Welcome", detail: "Signature drinks and ambient string quartet on the terrace." },
            { num: "02", time: "19:00", title: "The Solemn Ceremony", detail: "Exchange of vows and rings in the presence of loved ones." },
            { num: "03", time: "20:30", title: "Curated Dinner & Toasts", detail: "Multi-course seasonal gastronomy and champagne reflections." },
            { num: "04", time: "22:00", title: "Dancing & Afterglow", detail: "Celebratory music, desserts, and stargazing." }
          ].map((item, i) => (
            <div key={i} className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
              <div className="flex items-baseline gap-3 sm:w-1/3">
                <span className="font-mono text-xs text-stone-400">{item.num}</span>
                <span className="font-mono text-xs font-bold">{item.time}</span>
              </div>
              <div className="sm:w-2/3">
                <h4 className="text-base sm:text-lg font-bold mb-0.5 tracking-tight">{item.title}</h4>
                <p className="text-xs font-serif italic text-stone-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VENUE GUIDE */}
      <section className="px-4 sm:px-8 py-12 max-w-3xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400 block mb-1">Destination</span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1" style={headingStyle}>{venue}</h3>
            <p className="text-xs text-stone-600 font-serif max-w-md">{venueAddress}</p>
          </div>
          <a
            href={googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue + ' ' + venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-[#1A1A1A] text-white text-[11px] font-mono tracking-widest uppercase hover:bg-black transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <span>Google Maps</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 7. RSVP */}
      <section className="px-4 sm:px-8 py-10 max-w-md mx-auto text-center">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 block mb-2">RSVP Confirmation</span>
        <h3 className="text-xl font-bold mb-3 tracking-tight" style={headingStyle}>Please Confirm Attendance</h3>
        <p className="text-xs font-serif italic text-stone-600 mb-4">
          Direct all inquiries and confirmations to:
        </p>
        <div className="inline-block px-6 py-2.5 rounded-xl bg-white border border-stone-300 font-mono text-sm font-bold shadow-xs">
          {rsvpContact}
        </div>
      </section>

    </div>
  );
}
