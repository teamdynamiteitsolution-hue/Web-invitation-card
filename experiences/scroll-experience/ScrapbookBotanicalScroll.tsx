"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Sparkles, Heart, 
  Navigation, Flower2, Bookmark, CheckCircle2
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function ScrapbookBotanicalScroll({
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
    venue = "The Emerald Herbarium & Garden Lawn",
    venueAddress = "Sreemangal Nature Resort, Sylhet",
    googleMapsUrl = "",
    eventLabel = "A Botanical Love Story & Garden Gathering",
    groomPhoto = "/assets/categories/boubhat.webp",
    bridePhoto = "/assets/categories/boubhat.webp",
    couplePhoto = "/assets/categories/boubhat.webp",
    invitationMessage = "Tied with dried ferns and pressed blossoms, we warmly invite you to join us in an intimate botanical garden as we begin our next chapter.",
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
    <div className="w-full min-h-screen bg-[#F7F4EB] text-[#2C3E30] font-sans selection:bg-[#3D5A45]/20 pb-24 relative overflow-x-hidden">
      
      {/* 🌿 PRESSED BOTANICAL HERBARIUM TOP BANNER */}
      <div className="w-full bg-[#EAE5D6] py-3 px-4 border-b border-[#D8CEBE] flex items-center justify-between text-xs font-mono tracking-widest text-[#5C6E5E]">
        <span className="flex items-center gap-1.5"><Flower2 className="w-4 h-4 text-[#3D5A45]" /> HERBARIUM SPECIMEN NO. 2026-LOVE</span>
        <span className="hidden sm:inline-block">PRESERVED WITH LOVE &amp; CARE</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* 1. SCRAPBOOK COVER / HERO SECTION WITH WASHI TAPE */}
        <div className="relative bg-[#FAF8F2] p-8 sm:p-12 rounded-2xl shadow-xl border-2 border-[#D8CEBE] text-center">
          {/* Washi tape on top center */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#C8D6AF]/80 backdrop-blur-sm transform -rotate-1 border border-[#B3C498] shadow-sm flex items-center justify-center text-[10px] font-mono tracking-widest text-[#2E4231] uppercase">
            ♥ Together Always ♥
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#5C6E5E] font-medium block mt-2 mb-3">
            {eventLabel}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C2E20] font-light leading-tight tracking-wide mb-6">
            <span style={brideStyle} className="inline-block">{brideName}</span>
            <span className="text-[#8FA885] mx-3 font-normal">&amp;</span>
            <span style={groomStyle} className="inline-block">{groomName}</span>
          </h1>

          {/* Pressed Flower Stamp Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EEF2E6] border border-[#8FA885]/60 px-5 py-2 rounded-full text-xs font-serif text-[#2C3E30] shadow-sm mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#3D5A45]" />
            <span>Botanical Garden Reception &amp; Matrimony</span>
            <Sparkles className="w-3.5 h-3.5 text-[#3D5A45]" />
          </div>

          {/* Polaroid Hero Photo pinned with washi tape */}
          <div className="relative mx-auto w-full max-w-sm mt-4">
            {/* Washi tape corners */}
            <div className="absolute -top-3 -left-3 w-16 h-6 bg-[#E8C5A8]/80 backdrop-blur-sm -rotate-12 z-20 border border-[#D9B294] shadow-sm" />
            <div className="absolute -top-3 -right-3 w-16 h-6 bg-[#C8D6AF]/80 backdrop-blur-sm rotate-12 z-20 border border-[#B3C498] shadow-sm" />

            <div className="bg-white p-3 pb-8 shadow-2xl rounded-sm border border-[#E0D8C8] transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[4/5] overflow-hidden bg-[#ECE7DC] rounded-none">
                <img 
                  src={heroBannerImg} 
                  alt="Couple Herbarium" 
                  className="w-full h-full object-cover sepia-[0.15] contrast-[1.05]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/categories/boubhat.webp";
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif italic text-sm text-[#4A5D4E]">“Under the open sky and blossom boughs”</p>
                <p className="font-mono text-[10px] text-[#7A8E7E] mt-1 uppercase tracking-widest">{date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. INVITATION MESSAGE / FIELD NOTES */}
        <div className="bg-[#FAF8F2] p-8 sm:p-10 rounded-2xl border-2 border-dashed border-[#8FA885]/70 shadow-md relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#3D5A45] text-white flex items-center justify-center font-serif text-sm">
              ❦
            </div>
            <h2 style={headingStyle} className="text-xl sm:text-2xl font-serif text-[#1C2E20]">
              The Invitation Note
            </h2>
          </div>
          <p className="text-[#3E5242] leading-relaxed text-sm sm:text-base font-serif italic mb-6">
            "{invitationMessage}"
          </p>
          <div className="border-t border-[#D8CEBE] pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#5C6E5E]">
            <span>Specimen: Love &amp; Fellowship</span>
            <span>Recorded at: {venue}</span>
          </div>
        </div>

        {/* 3. DUAL SCRAPBOOK COUPLE POLAROIDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Groom Polaroid */}
          <div className="relative bg-white p-3 pb-6 shadow-xl rounded-sm border border-[#E0D8C8] transform -rotate-2 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-6 w-14 h-6 bg-[#C8D6AF]/80 backdrop-blur-sm -rotate-6 z-20 border border-[#B3C498]" />
            <div className="aspect-[3/4] overflow-hidden bg-[#ECE7DC]">
              <img 
                src={groomPhoto || "/assets/categories/boubhat.webp"} 
                alt={groomName}
                className="w-full h-full object-cover sepia-[0.1]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/categories/boubhat.webp";
                }}
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C6E5E]">The Groom</span>
              <h3 className="font-serif text-lg text-[#1C2E20]">{groomName}</h3>
            </div>
          </div>

          {/* Bride Polaroid */}
          <div className="relative bg-white p-3 pb-6 shadow-xl rounded-sm border border-[#E0D8C8] transform rotate-2 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 right-6 w-14 h-6 bg-[#E8C5A8]/80 backdrop-blur-sm rotate-6 z-20 border border-[#D9B294]" />
            <div className="aspect-[3/4] overflow-hidden bg-[#ECE7DC]">
              <img 
                src={bridePhoto || "/assets/categories/boubhat.webp"} 
                alt={brideName}
                className="w-full h-full object-cover sepia-[0.1]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/categories/boubhat.webp";
                }}
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C6E5E]">The Bride</span>
              <h3 className="font-serif text-lg text-[#1C2E20]">{brideName}</h3>
            </div>
          </div>
        </div>

        {/* 4. EVENT DETAILS & BOTANICAL SCHEDULE */}
        <div className="bg-[#FAF8F2] p-8 rounded-2xl shadow-xl border border-[#D8CEBE]">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C6E5E] block mb-1">Schedule &amp; Location</span>
            <h2 style={headingStyle} className="text-2xl sm:text-3xl font-serif text-[#1C2E20]">
              Gathering Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#EEF2E6] p-5 rounded-xl border border-[#D0DEC7] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3D5A45] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C6E5E] block">Date</span>
                <p className="font-serif font-semibold text-[#1C2E20]">{date}</p>
                <p className="text-xs text-[#5C6E5E] font-mono mt-1">Arrival: {time}</p>
              </div>
            </div>

            <div className="bg-[#EEF2E6] p-5 rounded-xl border border-[#D0DEC7] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3D5A45] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C6E5E] block">Venue</span>
                <p className="font-serif font-semibold text-[#1C2E20]">{venue}</p>
                <p className="text-xs text-[#5C6E5E] font-serif mt-1">{venueAddress}</p>
              </div>
            </div>
          </div>

          {/* Itinerary Timeline */}
          <div className="space-y-4 border-t border-[#D8CEBE] pt-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#5C6E5E] mb-4">Garden Itinerary</h3>
            <div className="space-y-3">
              {[
                { time: "04:30 PM", title: "Welcome Drinks & Botanist Garden Tour", desc: "Fresh elderflower spritz & live flute melodies" },
                { time: "05:30 PM", title: "Ring Exchange & Vows Ceremony", desc: "Under the centuries-old banyan & blossom canopy" },
                { time: "07:00 PM", title: "Feast & Garden Reception", desc: "Organic heritage banquet & celebratory toasts" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3.5 bg-white/70 rounded-lg border border-[#E0D8C8]">
                  <span className="font-mono text-xs font-bold text-[#3D5A45] shrink-0 pt-0.5">{item.time}</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1C2E20]">{item.title}</h4>
                    <p className="text-xs text-[#5C6E5E]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Link */}
          {googleMapsUrl && (
            <div className="mt-6 text-center">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3D5A45] text-white text-xs font-medium tracking-wide shadow-md hover:bg-[#2C3E30] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          )}
        </div>

        {/* 5. COUNTDOWN CLOCK */}
        <div className="bg-[#2C3E30] text-[#FAF8F2] p-8 rounded-2xl shadow-xl text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A3B8A6] block mb-2">Moments Until Forever</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white mb-6">Counting Down to Our Day</h3>
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINS", val: timeLeft.minutes },
              { label: "SECS", val: timeLeft.seconds }
            ].map((t, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                  {String(t.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#A3B8A6]">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. RSVP FIELD SLIP */}
        <div className="bg-[#FAF8F2] p-8 rounded-2xl border-2 border-[#D8CEBE] shadow-md text-center">
          <span className="text-2xl mb-2 block">🌿 ✉️ 🌿</span>
          <h3 style={headingStyle} className="font-serif text-2xl text-[#1C2E20] mb-2">
            Kindly Respond
          </h3>
          <p className="text-xs text-[#5C6E5E] max-w-md mx-auto mb-6">
            Please confirm your attendance so we may prepare your personalized botanical seating and meal preference.
          </p>
          <div className="inline-block bg-[#EEF2E6] border border-[#8FA885]/60 px-6 py-3 rounded-xl text-sm font-mono text-[#2C3E30] font-semibold">
            RSVP Hotline: {rsvpContact}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center mt-12 text-xs font-mono text-[#7A8E7E]">
        🌿 {brideName} &amp; {groomName} — Handcrafted Botanical Scrapbook 🌿
      </div>

    </div>
  );
}
