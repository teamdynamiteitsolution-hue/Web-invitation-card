"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Volume2, VolumeX, 
  Sparkles, Navigation
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function GoldenHaldiScroll({
  template,
  eventData,
  skipAnimation = false
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const {
    brideName = "Lary",
    groomName = "John",
    date = "Friday, 13 June 2027",
    time = "6:30 PM",
    venue = "The Marigold Courtyard",
    venueAddress = "Gulshan-2, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "Gaye Holud & Mehendi Of",
    groomPhoto = "/assets/categories/holud.webp",
    bridePhoto = "/assets/categories/holud.webp",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    gallery3 = "/assets/Cards/card 3.png",
    gallery4 = "/assets/Cards/card 4.png",
    invitationMessage = "Rang barse! Join us in smearing smiles, turmeric and sweet blessings as we kick off our wedding festivities with joyous rhythms and yellow blooms.",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: 'Cinzel, serif' };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: 'Cinzel, serif' };

  const initials = getMonogram(brideName, groomName, 'circle');

  // Real-time Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 119, hours: 16, minutes: 30, seconds: 0 });

  useEffect(() => {
    let targetDate = new Date(date).getTime();
    if (isNaN(targetDate)) {
      targetDate = new Date().getTime() + (119 * 24 * 60 * 60 * 1000);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const mapsDestinationUrl = googleMapsUrl?.trim() || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue} ${venueAddress}`)}`;

  const scheduleItems = [
    { icon: "🌿", num: "I", label: "Rituals", title: "Haldi & Mehendi Application", time: "6:00 PM", loc: "Floral Canopy" },
    { icon: "✨", num: "II", label: "Main Event", title: "Gaye Holud Celebrations", time: time || "7:30 PM", loc: venue },
    { icon: "💃", num: "III", label: "Dhamaka", title: "Music, Dance & Festive Feast", time: "9:00 PM", loc: "Banquet Lawns" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFDF5] text-[#451A03] font-serif relative scroll-smooth selection:bg-[#F59E0B]/30 overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-12">
        <div className="bg-[#78350F]/90 backdrop-blur-md border border-[#F59E0B]/50 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="text-[11px] font-bold text-[#FEF3C7] tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            🌿 Gaye Holud Fiesta
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-[#78350F]/90 backdrop-blur-md border border-[#F59E0B]/50 shadow-2xl flex items-center justify-center text-[#FEF3C7] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Festive Music"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#F59E0B]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden border-b-4 border-[#F59E0B] bg-gradient-to-b from-[#78350F] via-[#92400E] to-[#B45309] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Top Badge */}
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#FEF3C7] font-bold mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-[#F59E0B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Shubho Gaye Holud</span>
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#FEF3C7] flex items-center justify-center bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#78350F] shadow-2xl p-1 my-2">
            <div className="w-full h-full rounded-full border border-dashed border-[#B45309] flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#78350F] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
                {initials}
              </span>
            </div>
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#FDE68A] font-semibold mt-2" style={headingStyle as any}>
            {eventLabel}
          </span>
        </div>

        {/* Names */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFBEB] tracking-wide leading-tight break-words drop-shadow-lg" style={brideStyle as any}>
              {brideName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#FDE68A] to-transparent" />
              <span className="text-xl sm:text-3xl italic text-[#FDE68A] font-serif">&amp;</span>
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#FDE68A] to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFFBEB] tracking-wide leading-tight break-words drop-shadow-lg" style={groomStyle as any}>
              {groomName}
            </h2>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-[#451A03]/80 backdrop-blur-sm px-5 py-2 rounded-full border border-[#F59E0B]/50 shadow-xl max-w-full">
            <Calendar className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-[#FEF3C7] tracking-wider uppercase truncate">{date}</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-[#FDE68A] text-xs animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#FDE68A]">Scroll To Celebrate</span>
          <span className="text-lg mt-1">↓</span>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center relative">
        <div className="w-14 h-14 rounded-full bg-[#FEF3C7] border-2 border-[#D97706] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Sparkles className="w-6 h-6 text-[#B45309]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B45309] font-bold block mb-2">
          Yellow Blossoms &amp; Joy
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#78350F] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
          Gaye Holud Invitation
        </h3>
        <p className="font-serif italic text-sm sm:text-base text-[#92400E] leading-relaxed max-w-xl mx-auto mb-6">
          &ldquo;{invitationMessage}&rdquo;
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mx-auto rounded-full" />
      </section>

      {/* Couple Portraits */}
      <section className="py-16 px-4 sm:px-6 bg-[#FEF3C7]/40 border-y-2 border-[#F59E0B]/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B45309] font-bold block mb-1.5">
            The Stars of The Night
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#78350F] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
            Celebration Couple
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border-2 border-[#F59E0B]/40 shadow-xl">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D97706] shadow-md relative bg-amber-50 mb-3 group">
                <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#B45309] font-bold">The Groom</span>
              <h4 className="text-lg font-bold text-[#78350F] mt-0.5 truncate max-w-full" style={groomStyle as any}>{groomName}</h4>
            </div>

            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border-2 border-[#F59E0B]/40 shadow-xl">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D97706] shadow-md relative bg-amber-50 mb-3 group">
                <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#B45309] font-bold">The Bride</span>
              <h4 className="text-lg font-bold text-[#78350F] mt-0.5 truncate max-w-full" style={brideStyle as any}>{brideName}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B45309] font-bold block mb-1.5">
          Program Itinerary
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#78350F] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
          Haldi Ceremony Schedule
        </h3>

        <div className="space-y-3.5 text-left">
          {scheduleItems.map((item, idx) => {
            const isMain = idx === 1;
            if (isMain) {
              return (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#B45309] to-[#78350F] text-white border-2 border-[#F59E0B] shadow-2xl gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 text-xl text-white">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#FDE68A] font-bold block truncate">
                        {item.label}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#FEF3C7]/80 truncate mt-0.5">{item.loc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 bg-black/20 border border-white/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#FDE68A]">
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#F59E0B]/30 shadow-md gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/40 flex items-center justify-center flex-shrink-0 text-xl text-[#B45309]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#B45309] font-bold block truncate">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#78350F] leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#92400E] truncate mt-0.5">{item.loc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 bg-[#FEF3C7] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B45309]">
                    <Clock className="w-3 h-3" />
                    <span className="whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Haldi Moments Gallery */}
      <section className="py-16 px-4 sm:px-6 bg-[#78350F] text-white border-y-4 border-[#F59E0B]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#FDE68A] font-bold block mb-2">Festive Colors</span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Haldi Memories</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#F59E0B] shadow-xl p-1 bg-gradient-to-b from-[#F59E0B] to-[#78350F]">
                <img src={imgUrl} alt={`Haldi Moment ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 sm:px-6 bg-[#FFFDF5] text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B45309] font-bold block mb-2">Festivities Approaching</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#78350F] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Countdown To Haldi</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:py-5 rounded-2xl bg-white border-2 border-[#F59E0B]/30 shadow-md flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-bold text-[#B45309]" style={{ fontFamily: 'Cinzel, serif' }}>{item.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#92400E] font-bold mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Directions */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t-2 border-[#F59E0B]/30">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B45309] font-bold block mb-2">Event Venue</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#78350F] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Venue Location</h3>

          <div className="bg-[#FEF3C7]/40 rounded-3xl p-6 sm:p-8 border-2 border-[#F59E0B]/40 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#B45309] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#78350F] mb-1.5" style={{ fontFamily: 'Cinzel, serif' }}>{venue}</h4>
            <p className="text-xs sm:text-sm text-[#92400E] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

            <a 
              href={mapsDestinationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B45309] text-white font-bold text-xs tracking-[0.15em] uppercase shadow-xl hover:bg-[#92400E] border border-[#F59E0B] transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" /> Open In Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-[#451A03] text-white border-t-4 border-[#F59E0B]">
        <div className="w-10 h-10 rounded-full border-2 border-[#F59E0B] flex items-center justify-center mx-auto mb-3 bg-white/5">
          <span className="text-[#FDE68A] text-xs font-serif font-bold">{initials}</span>
        </div>
        <h4 className="text-xl font-bold tracking-wider mb-1" style={brideStyle as any}>
          {brideName} &amp; {groomName}
        </h4>
        <p className="text-[10px] text-[#FDE68A] uppercase tracking-widest mb-4">
          Shubho Gaye Holud • May blessings and smiles color our path
        </p>
        <p className="text-[9px] text-amber-200/60 uppercase tracking-wider">
          Digital Invitation • Haldi Fiesta Edition
        </p>
      </footer>
    </div>
  );
}
