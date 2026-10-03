"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Volume2, VolumeX, 
  Cake, Sparkles, Navigation, PartyPopper
} from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

export default function CelestialBirthdayScroll({
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
    personName = "Aaryan",
    brideName = "",
    turningAge = "18th Birthday Celebration",
    date = "Saturday, 20 July 2027",
    time = "6:00 PM",
    venue = "The Starlight Ballroom",
    venueAddress = "Dhanmondi, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "Birthday Celebration Of",
    couplePhoto = "/assets/categories/birthday.webp",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    gallery3 = "/assets/Cards/card 3.png",
    gallery4 = "/assets/Cards/card 4.png",
    invitationMessage = "Another year of laughter, growth and dreams! Join us as we celebrate this special milestone surrounded by cherished friends, delicious treats and music.",
  } = eventData || {};

  const displayName = personName || brideName || "Aaryan";
  const typographyStyles = eventData?.typographyStyles || {};
  const nameStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: 'Cinzel, serif' };

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 8, minutes: 15, seconds: 0 });

  useEffect(() => {
    let targetDate = new Date(date).getTime();
    if (isNaN(targetDate)) {
      targetDate = new Date().getTime() + (45 * 24 * 60 * 60 * 1000);
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
    { icon: "🎉", num: "I", label: "Arrival", title: "Guests & Mocktail Reception", time: "6:00 PM", loc: "Starlight Lounge" },
    { icon: "🎂", num: "II", label: "Main Event", title: "Cake Cutting & Cheers", time: time || "7:30 PM", loc: venue },
    { icon: "🍕", num: "III", label: "Party", title: "Dinner, Music & Games", time: "8:30 PM", loc: "Party Terrace" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF5FF] text-[#3B0764] font-serif relative scroll-smooth selection:bg-[#9333EA]/30 overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-12">
        <div className="bg-[#3B0764]/90 backdrop-blur-md border border-[#C084FC]/40 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E879F9] animate-ping" />
          <span className="text-[11px] font-bold text-[#F3E8FF] tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            🎂 Birthday Glow
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-[#3B0764]/90 backdrop-blur-md border border-[#C084FC]/40 shadow-2xl flex items-center justify-center text-[#F3E8FF] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Party Music"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#E879F9]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden border-b-4 border-[#A855F7] bg-gradient-to-b from-[#2E1065] via-[#581C87] to-[#3B0764] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#C084FC_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        {/* Top Badge */}
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#F3E8FF] font-bold mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-[#C084FC]/40">
            <Cake className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Special Milestone Celebration</span>
            <Cake className="w-3.5 h-3.5 text-[#FDE047]" />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#FDE047] flex items-center justify-center bg-gradient-to-br from-[#FAF5FF] to-[#E9D5FF] text-[#581C87] shadow-2xl p-1 my-2">
            <div className="w-full h-full rounded-full border border-dashed border-[#7E22CE] flex items-center justify-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#581C87] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#E9D5FF] font-semibold mt-2" style={headingStyle as any}>
            {eventLabel}
          </span>
        </div>

        {/* Name & Age */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2 space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#FAF5FF] tracking-wide leading-tight break-words drop-shadow-xl" style={nameStyle as any}>
            {displayName}
          </h1>

          {turningAge && (
            <div className="inline-block px-5 py-1.5 rounded-full bg-[#FDE047] text-[#3B0764] font-bold text-xs sm:text-sm uppercase tracking-widest shadow-lg">
              ✨ {turningAge} ✨
            </div>
          )}

          <div>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#2E1065]/80 backdrop-blur-sm px-5 py-2 rounded-full border border-[#C084FC]/40 shadow-xl max-w-full">
              <Calendar className="w-3.5 h-3.5 text-[#FDE047] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#F3E8FF] tracking-wider uppercase truncate">{date}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-[#FDE047] text-xs animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#FDE047]">Scroll To Explore</span>
          <span className="text-lg mt-1">↓</span>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center relative">
        <div className="w-14 h-14 rounded-full bg-[#F3E8FF] border-2 border-[#A855F7] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <PartyPopper className="w-6 h-6 text-[#7E22CE]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#7E22CE] font-bold block mb-2">
          Join The Celebration
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#3B0764] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
          Let&apos;s Celebrate Together!
        </h3>
        <p className="font-serif italic text-sm sm:text-base text-[#6B21A8] leading-relaxed max-w-xl mx-auto mb-6">
          &ldquo;{invitationMessage}&rdquo;
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#A855F7] to-transparent mx-auto rounded-full" />
      </section>

      {/* Birthday Star Portrait */}
      <section className="py-16 px-4 sm:px-6 bg-[#F3E8FF]/60 border-y-2 border-[#C084FC]/30">
        <div className="max-w-md mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7E22CE] font-bold block mb-1.5">
            The Celebrant
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3B0764] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
            Birthday Star
          </h3>

          <div className="aspect-[4/5] rounded-3xl overflow-hidden border-4 border-[#A855F7] shadow-2xl relative bg-white mx-auto max-w-xs group">
            <img src={couplePhoto} alt="Birthday Star" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <h4 className="text-xl font-bold text-[#3B0764] mt-4" style={nameStyle as any}>{displayName}</h4>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#7E22CE] font-bold block mb-1.5">
          Party Program
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#3B0764] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
          Event Itinerary
        </h3>

        <div className="space-y-3.5 text-left">
          {scheduleItems.map((item, idx) => {
            const isMain = idx === 1;
            if (isMain) {
              return (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#581C87] to-[#3B0764] text-white border-2 border-[#FDE047] shadow-2xl gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 text-xl text-white">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#FDE047] font-bold block truncate">
                        {item.label}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#E9D5FF] truncate mt-0.5">{item.loc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 bg-black/20 border border-white/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#FDE047]">
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#C084FC]/30 shadow-md gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] border border-[#C084FC]/40 flex items-center justify-center flex-shrink-0 text-xl text-[#7E22CE]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#7E22CE] font-bold block truncate">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#3B0764] leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#6B21A8] truncate mt-0.5">{item.loc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 bg-[#F3E8FF] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#7E22CE]">
                    <Clock className="w-3 h-3" />
                    <span className="whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Memories Photo Gallery */}
      <section className="py-16 px-4 sm:px-6 bg-[#2E1065] text-white border-y-4 border-[#A855F7]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#FDE047] font-bold block mb-2">Precious Milestones</span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Memories Gallery</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C084FC] shadow-xl p-1 bg-gradient-to-b from-[#A855F7] to-[#2E1065]">
                <img src={imgUrl} alt={`Memory ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 sm:px-6 bg-[#FAF5FF] text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7E22CE] font-bold block mb-2">Counting Down To Fun</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3B0764] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Countdown To The Big Day</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:py-5 rounded-2xl bg-white border-2 border-[#C084FC]/40 shadow-md flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-bold text-[#7E22CE]" style={{ fontFamily: 'Cinzel, serif' }}>{item.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#6B21A8] font-bold mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Directions */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t-2 border-[#C084FC]/30">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7E22CE] font-bold block mb-2">Party Venue</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3B0764] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Where To Find Us</h3>

          <div className="bg-[#F3E8FF]/40 rounded-3xl p-6 sm:p-8 border-2 border-[#C084FC]/40 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#7E22CE] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#3B0764] mb-1.5" style={{ fontFamily: 'Cinzel, serif' }}>{venue}</h4>
            <p className="text-xs sm:text-sm text-[#6B21A8] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

            <a 
              href={mapsDestinationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7E22CE] text-white font-bold text-xs tracking-[0.15em] uppercase shadow-xl hover:bg-[#6B21A8] border border-[#FDE047] transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FDE047]" /> Open In Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-[#2E1065] text-white border-t-4 border-[#A855F7]">
        <div className="w-10 h-10 rounded-full border-2 border-[#FDE047] flex items-center justify-center mx-auto mb-3 bg-white/5">
          <span className="text-[#FDE047] text-xs font-serif font-bold">{displayName.charAt(0)}</span>
        </div>
        <h4 className="text-xl font-bold tracking-wider mb-1" style={nameStyle as any}>
          {displayName}&apos;s Birthday
        </h4>
        <p className="text-[10px] text-[#E9D5FF] uppercase tracking-widest mb-4">
          Thank you for joining our happiness and sharing memories!
        </p>
        <p className="text-[9px] text-purple-300/60 uppercase tracking-wider">
          Digital Invitation • Birthday Glow Edition
        </p>
      </footer>
    </div>
  );
}
