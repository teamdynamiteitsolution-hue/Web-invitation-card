"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Heart, Volume2, VolumeX, 
  Sparkles, Navigation, Crown
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function RoyalHeritageScroll({
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
    date = "Saturday, 14 June 2027",
    time = "7:00 PM",
    venue = "The Royal Palace Grand Ballroom",
    venueAddress = "Gulshan-2, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "The Royal Wedding Of",
    groomPhoto = "/assets/categories/wedding.webp",
    bridePhoto = "/assets/categories/wedding.webp",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    gallery3 = "/assets/Cards/card 3.png",
    gallery4 = "/assets/Cards/card 4.png",
    invitationMessage = "Together with our families, we joyfully invite you to share in our celebration of love and new beginnings. Your gracious presence and prayers will make our special day complete.",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: 'Cinzel, serif' };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: 'Cinzel, serif' };

  const initials = getMonogram(brideName, groomName, 'circle');

  // Real-time Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 120, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    let targetDate = new Date(date).getTime();
    if (isNaN(targetDate)) {
      targetDate = new Date().getTime() + (120 * 24 * 60 * 60 * 1000);
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
    { num: "I", label: "Pre-Wedding", title: "Welcoming & Blessing", time: "6:30 PM", loc: "Family Courtyard" },
    { num: "II", label: "Main Ceremony", title: "Royal Wedding Ceremony", time: time || "7:30 PM", loc: venue },
    { num: "III", label: "Celebration", title: "Royal Feast & Dinner", time: "8:45 PM", loc: "Grand Ballroom" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF6F0] text-[#2C241E] font-serif relative scroll-smooth selection:bg-[#D4AF37]/30 overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-12">
        <div className="bg-[#2C241E]/90 backdrop-blur-md border border-[#D4AF37]/40 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            💍 Royal Heritage
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-[#2C241E]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-2xl flex items-center justify-center text-[#D4AF37] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Royal Ambient Music"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#D4AF37]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden border-b-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#2C241E] via-[#3A2E26] to-[#2C241E] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Monogram Seal */}
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/30">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Bismillahir Rahmanir Raheem</span>
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-gradient-to-br from-[#FAF6F0] to-[#E8DCB8] text-[#2C241E] shadow-2xl p-1 my-2">
            <div className="w-full h-full rounded-full border border-dashed border-[#8C4A52] flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#8C4A52] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
                {initials}
              </span>
            </div>
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mt-2" style={headingStyle as any}>
            {eventLabel}
          </span>
        </div>

        {/* Couple Names */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#FAF6F0] tracking-wide leading-tight break-words drop-shadow-md" style={brideStyle as any}>
              {brideName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="text-xl sm:text-3xl italic text-[#D4AF37] font-serif">&amp;</span>
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#FAF6F0] tracking-wide leading-tight break-words drop-shadow-md" style={groomStyle as any}>
              {groomName}
            </h2>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-[#1F1915]/80 backdrop-blur-sm px-5 py-2 rounded-full border border-[#D4AF37]/40 shadow-xl max-w-full">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-[#FAF6F0] tracking-wider uppercase truncate">{date}</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-[#D4AF37] text-xs animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#D4AF37]">Scroll Down</span>
          <span className="text-lg mt-1">↓</span>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center relative">
        <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Sparkles className="w-6 h-6 text-[#8C4A52]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C4A52] font-bold block mb-2">
          Royal Invitation
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#2C241E] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
          Celebrate Our Union
        </h3>
        <p className="font-serif italic text-sm sm:text-base text-[#5C4D42] leading-relaxed max-w-xl mx-auto mb-6">
          &ldquo;{invitationMessage}&rdquo;
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
      </section>

      {/* The Couple Portraits */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FAF6F0] to-[#F3ECE0] border-y border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C4A52] font-bold block mb-1.5">
            The Happy Couple
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#2C241E] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
            Bride &amp; Groom
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md relative bg-stone-100 mb-3 group">
                <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C4A52] font-bold">The Groom</span>
              <h4 className="text-lg font-bold text-[#2C241E] mt-0.5 truncate max-w-full" style={groomStyle as any}>{groomName}</h4>
            </div>

            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md relative bg-stone-100 mb-3 group">
                <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C4A52] font-bold">The Bride</span>
              <h4 className="text-lg font-bold text-[#2C241E] mt-0.5 truncate max-w-full" style={brideStyle as any}>{brideName}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremony Schedule */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C4A52] font-bold block mb-1.5">
          Ceremony Timeline
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#2C241E] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
          Schedule of Events
        </h3>

        <div className="space-y-3.5 text-left">
          {scheduleItems.map((item, idx) => {
            const isMain = idx === 1;
            if (isMain) {
              return (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#2C241E] text-white border-2 border-[#D4AF37] shadow-2xl gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-[#D4AF37] flex items-center justify-center flex-shrink-0 text-[#D4AF37] font-bold text-base" style={{ fontFamily: 'Cinzel, serif' }}>
                      {item.num}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold block truncate">
                        {item.label}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-300 truncate mt-0.5">{item.loc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 bg-[#1F1915] border border-[#D4AF37]/60 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#D4AF37]">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#D4AF37]/30 shadow-md gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF6F0] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#8C4A52] font-bold text-base" style={{ fontFamily: 'Cinzel, serif' }}>
                    {item.num}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#8C4A52] font-bold block truncate">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#2C241E] leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#7C6E65] truncate mt-0.5">{item.loc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 bg-[#FAF6F0] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#8C4A52]">
                    <Clock className="w-3 h-3" />
                    <span className="whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Royal Gallery */}
      <section className="py-16 px-4 sm:px-6 bg-[#2C241E] text-white border-y-4 border-[#D4AF37]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold block mb-2">Treasured Portraits</span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Royal Gallery</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-xl p-1 bg-gradient-to-b from-[#D4AF37] to-[#2C241E]">
                <img src={imgUrl} alt={`Royal Moment ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAF6F0] text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C4A52] font-bold block mb-2">Honored Occasion</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#2C241E] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Countdown To The Day</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:py-5 rounded-2xl bg-white border-2 border-[#D4AF37]/40 shadow-md flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-bold text-[#8C4A52]" style={{ fontFamily: 'Cinzel, serif' }}>{item.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#7C6E65] font-bold mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Directions */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t-2 border-[#D4AF37]/30">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C4A52] font-bold block mb-2">Venue &amp; Location</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#2C241E] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Venue Details</h3>

          <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#8C4A52] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#2C241E] mb-1.5" style={{ fontFamily: 'Cinzel, serif' }}>{venue}</h4>
            <p className="text-xs sm:text-sm text-[#7C6E65] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

            <a 
              href={mapsDestinationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8C4A52] text-white font-bold text-xs tracking-[0.15em] uppercase shadow-xl hover:bg-[#73363e] border border-[#D4AF37] transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" /> Open In Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Royal Footer */}
      <footer className="py-12 px-4 text-center bg-[#1F1915] text-white border-t-4 border-[#D4AF37]">
        <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-3 bg-white/5">
          <span className="text-[#D4AF37] text-xs font-serif font-bold">{initials}</span>
        </div>
        <h4 className="text-xl font-bold tracking-wider mb-1" style={brideStyle as any}>
          {brideName} &amp; {groomName}
        </h4>
        <p className="text-[10px] text-[#D4AF37]/80 uppercase tracking-widest mb-4">
          Honoring this blessed milestone with family &amp; friends
        </p>
        <p className="text-[9px] text-gray-500 uppercase tracking-wider">
          Digital Invitation • Royal Edition
        </p>
      </footer>
    </div>
  );
}
