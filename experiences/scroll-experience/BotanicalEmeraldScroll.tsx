"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Volume2, VolumeX, 
  Navigation, Leaf
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function BotanicalEmeraldScroll({
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
    venue = "The Glasshouse Botanical Garden",
    venueAddress = "Gulshan-2, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "The Wedding Of",
    groomPhoto = "/assets/categories/wedding.webp",
    bridePhoto = "/assets/categories/wedding.webp",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    gallery3 = "/assets/Cards/card 3.png",
    gallery4 = "/assets/Cards/card 4.png",
    invitationMessage = "Together with our families, we joyfully invite you to celebrate our union surrounded by lush nature and blossoms of love.",
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
    { icon: "🌿", num: "I", label: "Pre-Wedding", title: "Garden Reception & High Tea", time: "5:30 PM", loc: "Garden Pavilion" },
    { icon: "💍", num: "II", label: "Main Ceremony", title: "Wedding Vows & Exchange", time: time || "7:00 PM", loc: venue },
    { icon: "🥂", num: "III", label: "Celebration", title: "Lantern Banquet & Dinner", time: "8:30 PM", loc: "Grand Glasshouse" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F4F8F5] text-[#1B3022] font-serif relative scroll-smooth selection:bg-[#1F4E3B]/20 overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-12">
        <div className="bg-white/90 backdrop-blur-md border border-[#1F4E3B]/30 px-4 py-1.5 rounded-full shadow-lg pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1F4E3B] animate-ping" />
          <span className="text-[11px] font-bold text-[#1F4E3B] tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            🌿 Botanical Garden
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#1F4E3B]/30 shadow-lg flex items-center justify-center text-[#1F4E3B] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Ambient Music"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#1F4E3B]" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden border-b border-[#1F4E3B]/20 bg-gradient-to-b from-[#EBF3EE] via-[#F4F8F5] to-white">
        <div className="absolute top-6 left-6 text-[#1F4E3B]/30 text-3xl select-none">❦</div>
        <div className="absolute top-6 right-6 text-[#1F4E3B]/30 text-3xl select-none">❦</div>

        {/* Top Badge */}
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-[#1F4E3B] font-bold mb-4 bg-white/80 px-4 py-1.5 rounded-full border border-[#1F4E3B]/30 shadow-xs">
            <Leaf className="w-3 h-3" />
            <span>Bismillahir Rahmanir Raheem</span>
            <Leaf className="w-3 h-3" />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#1F4E3B] flex items-center justify-center bg-white shadow-soft-surface p-1 my-2">
            <div className="w-full h-full rounded-full border border-dashed border-[#1F4E3B]/60 flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#1F4E3B] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
                {initials}
              </span>
            </div>
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#5C7262] font-semibold mt-2" style={headingStyle as any}>
            {eventLabel}
          </span>
        </div>

        {/* Names */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1B3022] tracking-wide leading-tight break-words" style={brideStyle as any}>
              {brideName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#1F4E3B] to-transparent" />
              <span className="text-xl sm:text-3xl italic text-[#1F4E3B] font-serif">&amp;</span>
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#1F4E3B] to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#1B3022] tracking-wide leading-tight break-words" style={groomStyle as any}>
              {groomName}
            </h2>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full border border-[#1F4E3B]/30 shadow-sm max-w-full">
            <Calendar className="w-3.5 h-3.5 text-[#1F4E3B] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-[#1B3022] tracking-wider uppercase truncate">{date}</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-[#5C7262] text-xs animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#1F4E3B]">Scroll To Explore</span>
          <span className="text-lg mt-1">↓</span>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center relative">
        <div className="w-14 h-14 rounded-full bg-[#EBF3EE] border border-[#1F4E3B]/30 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <Leaf className="w-6 h-6 text-[#1F4E3B]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-2">
          Cordial Invitation
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
          Celebrate With Us
        </h3>
        <p className="font-serif italic text-sm sm:text-base text-[#3D5244] leading-relaxed max-w-xl mx-auto mb-6">
          &ldquo;{invitationMessage}&rdquo;
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#1F4E3B] to-transparent mx-auto" />
      </section>

      {/* The Couple */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-[#EBF3EE]/60 border-y border-[#1F4E3B]/20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">
            The Happy Couple
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#1B3022] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
            Bride &amp; Groom
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border border-[#1F4E3B]/30 shadow-md">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#1F4E3B] shadow-md relative bg-stone-100 mb-3 group">
                <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#1F4E3B] font-bold">The Groom</span>
              <h4 className="text-lg font-bold text-[#1B3022] mt-0.5 truncate max-w-full" style={groomStyle as any}>{groomName}</h4>
            </div>

            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border border-[#1F4E3B]/30 shadow-md">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#1F4E3B] shadow-md relative bg-stone-100 mb-3 group">
                <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#1F4E3B] font-bold">The Bride</span>
              <h4 className="text-lg font-bold text-[#1B3022] mt-0.5 truncate max-w-full" style={brideStyle as any}>{brideName}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Schedule */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">
          Garden Itinerary
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
          Event Schedule
        </h3>

        <div className="space-y-3.5 text-left">
          {scheduleItems.map((item, idx) => {
            const isMain = idx === 1;
            if (isMain) {
              return (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1F4E3B] to-[#143B2C] text-white border-2 border-[#C8A251] shadow-lg gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 text-xl text-white">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-emerald-200 font-bold block truncate">
                        {item.label}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/80 truncate mt-0.5">{item.loc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 bg-white/20 border border-white/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-200">
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-[#1F4E3B]/20 shadow-md gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-xl text-emerald-800">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#5C7262] font-bold block truncate">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#1B3022] leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#5C7262] truncate mt-0.5">{item.loc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 bg-[#EBF3EE] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#1F4E3B]">
                    <Clock className="w-3 h-3" />
                    <span className="whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 sm:px-6 bg-[#EBF3EE] border-y border-[#1F4E3B]/20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#1F4E3B] font-bold block mb-2">Moments in Bloom</span>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#1B3022] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Botanical Gallery</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#1F4E3B]/30 shadow-md p-1 bg-white">
                <img src={imgUrl} alt={`Garden Moment ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 sm:px-6 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#1F4E3B] font-bold block mb-2">Blossoming Soon</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Countdown To Our Day</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:py-5 rounded-2xl bg-[#F4F8F5] border border-[#1F4E3B]/20 shadow-sm flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-bold text-[#1F4E3B]" style={{ fontFamily: 'Cinzel, serif' }}>{item.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#5C7262] font-bold mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Directions */}
      <section className="py-16 px-4 sm:px-6 bg-[#F4F8F5] border-t border-[#1F4E3B]/20">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#1F4E3B] font-bold block mb-2">Location &amp; Map</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Garden Venue</h3>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1F4E3B]/30 shadow-lg">
            <div className="w-14 h-14 rounded-full bg-[#1F4E3B] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <MapPin className="w-7 h-7" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#1B3022] mb-1.5" style={{ fontFamily: 'Cinzel, serif' }}>{venue}</h4>
            <p className="text-xs sm:text-sm text-[#5C7262] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

            <a 
              href={mapsDestinationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F4E3B] text-white font-bold text-xs tracking-[0.15em] uppercase shadow-md hover:bg-[#143B2C] transition-all"
            >
              <Navigation className="w-3.5 h-3.5" /> Open In Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-[#1B3022] text-white border-t-2 border-[#1F4E3B]">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-3 bg-white/5">
          <span className="text-white text-xs font-serif font-bold">{initials}</span>
        </div>
        <h4 className="text-xl font-bold tracking-wider mb-1" style={brideStyle as any}>
          {brideName} &amp; {groomName}
        </h4>
        <p className="text-[10px] text-emerald-200 uppercase tracking-widest mb-4">
          Celebrating love and fresh beginnings with our loved ones
        </p>
        <p className="text-[9px] text-gray-400 uppercase tracking-wider">
          Digital Invitation • Botanical Edition
        </p>
      </footer>
    </div>
  );
}
