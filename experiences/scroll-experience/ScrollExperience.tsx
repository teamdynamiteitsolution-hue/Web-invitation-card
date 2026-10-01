"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Heart, Volume2, VolumeX, 
  Sparkles, Navigation, Leaf, Crown, Cake, PartyPopper
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

const getScheduleForCategory = (cat: string, mainTime: string, venueName: string) => {
  switch (cat) {
    case "birthday":
      return [
        { icon: "🎉", num: "I", label: "Welcome & Arrival", title: "Guests & Mocktails", time: "5:30 PM", loc: "Reception Lounge" },
        { icon: "🎂", num: "II", label: "Main Event", title: "Cake Cutting & Cheers", time: mainTime || "7:00 PM", loc: venueName },
        { icon: "🍕", num: "III", label: "Party Time", title: "Dinner, Music & Games", time: "8:00 PM", loc: "Party Hall" },
      ];
    case "holud":
      return [
        { icon: "🌿", num: "I", label: "Rituals", title: "Haldi & Mehendi", time: "6:00 PM", loc: "Floral Stage" },
        { icon: "✨", num: "II", label: "Main Event", title: "Gaye Holud Celebrations", time: mainTime || "7:30 PM", loc: venueName },
        { icon: "💃", num: "III", label: "Dhamaka", title: "Dance, Music & Feast", time: "9:00 PM", loc: "Banquet Hall" },
      ];
    case "reception":
      return [
        { icon: "🥂", num: "I", label: "Welcome", title: "Red Carpet Entry", time: "6:30 PM", loc: "Grand Foyer" },
        { icon: "👑", num: "II", label: "Main Event", title: "Couple Stage Reception", time: mainTime || "7:30 PM", loc: venueName },
        { icon: "🍽️", num: "III", label: "Royal Feast", title: "Dinner & Mingling", time: "8:45 PM", loc: "Grand Dining Hall" },
      ];
    case "party":
      return [
        { icon: "🍸", num: "I", label: "Gathering", title: "Welcome & Refreshments", time: "6:00 PM", loc: "Lounge Area" },
        { icon: "🎊", num: "II", label: "Main Event", title: "Celebration & Activities", time: mainTime || "7:30 PM", loc: venueName },
        { icon: "🎶", num: "III", label: "Social", title: "Dinner & Entertainment", time: "8:30 PM", loc: venueName },
      ];
    case "wedding":
    default:
      return [
        { icon: "🌿", num: "I", label: "Pre-Wedding", title: "Gaye Holud & Blessings", time: "6:30 PM", loc: "Family Residence" },
        { icon: "💍", num: "II", label: "Main Ceremony", title: "Wedding Reception", time: mainTime || "7:30 PM", loc: venueName },
        { icon: "🥂", num: "III", label: "Celebration", title: "Dinner & Blessings", time: "8:30 PM", loc: "Grand Ballroom" },
      ];
  }
};

export default function ScrollExperience({
  template,
  eventData,
  skipAnimation
}: any) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const {
    category = "wedding",
    personName = "",
    turningAge = "",
    brideName = "Lary",
    groomName = "John",
    date = "Saturday, 14 June 2027",
    time = "7:00 PM",
    venue = "The Royal Palace Grand Ballroom",
    venueAddress = "Gulshan-2, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "The Wedding of",
    couplePhoto = "/assets/categories/wedding.webp",
    groomPhoto = "/assets/categories/wedding.webp",
    bridePhoto = "/assets/categories/wedding.webp",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    gallery3 = "/assets/Cards/card 3.png",
    gallery4 = "/assets/Cards/card 4.png",
    invitationMessage = "Together with our families, we joyfully invite you to share in our celebration of love and new beginnings. Your gracious presence and prayers will make our special day complete.",
  } = eventData || {};

  // Typography styles linked live to the Style Tab
  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: 'Cinzel, serif' };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: 'Cinzel, serif' };

  // Detect distinct template styling: Botanical Emerald vs Royal Heritage
  const isBotanical = template?.slug === 'botanical-scroll' || template?.archetype === 'sage' || template?.visualIdentity?.includes('sage');

  const isBirthday = category === 'birthday';
  const isHolud = category === 'holud';
  const isReception = category === 'reception';
  const isParty = category === 'party';

  const displayName = isBirthday ? (personName || brideName || "Aaryan") : (brideName || "Lary");
  const bannerSubtitle = isBirthday 
    ? (turningAge || "5th Birthday Celebration") 
    : isHolud 
    ? (eventLabel || "Gaye Holud Of")
    : isReception
    ? (eventLabel || "Wedding Reception Of")
    : isParty
    ? (eventLabel || "Cordially Invited To")
    : (eventLabel || "The Wedding Of");

  const initials = isBirthday ? (displayName.charAt(0).toUpperCase()) : getMonogram(brideName, groomName, 'circle');
  const scheduleItems = getScheduleForCategory(category, time, venue);

  // Real-time Countdown calculation based on event date
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

  const headerCategoryLabel = isBirthday 
    ? '🎂 Birthday Story' 
    : isHolud 
    ? '🌿 Gaye Holud' 
    : isReception 
    ? '🥂 Wedding Reception' 
    : isBotanical 
    ? '🌿 Botanical Story' 
    : '💍 Royal Wedding';

  // =========================================================================
  // TEMPLATE VARIATION A: BOTANICAL EMERALD SCROLL (Modern Organic Garden)
  // =========================================================================
  if (isBotanical) {
    return (
      <div className="w-full min-h-screen bg-[#F4F8F5] text-[#1B3022] font-serif relative scroll-smooth selection:bg-[#1F4E3B]/20">
        
        {/* Floating Header */}
        <header className="fixed top-4 inset-x-4 max-w-4xl mx-auto z-50 flex items-center justify-between pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md border border-[#1F4E3B]/30 px-4 py-1.5 rounded-full shadow-lg pointer-events-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1F4E3B] animate-ping" />
            <span className="text-[11px] font-bold text-[#1F4E3B] tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
              {headerCategoryLabel}
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
          <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-25 mix-blend-multiply pointer-events-none" />
          
          <div className="absolute top-6 left-6 text-[#1F4E3B]/30 text-3xl select-none">❦</div>
          <div className="absolute top-6 right-6 text-[#1F4E3B]/30 text-3xl select-none">❦</div>

          {/* Top Badge */}
          <div className="relative z-10 mt-6 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-[#1F4E3B] font-bold mb-4 bg-white/80 px-4 py-1.5 rounded-full border border-[#1F4E3B]/30 shadow-xs">
              {isBirthday ? <Cake className="w-3 h-3 text-[#1F4E3B]" /> : <Leaf className="w-3 h-3" />}
              <span>{isBirthday ? "Special Milestone" : "Bismillahir Rahmanir Raheem"}</span>
              {isBirthday ? <Cake className="w-3 h-3 text-[#1F4E3B]" /> : <Leaf className="w-3 h-3" />}
            </div>

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#1F4E3B] flex items-center justify-center bg-white shadow-soft-surface p-1 my-2">
              <div className="w-full h-full rounded-full border border-dashed border-[#1F4E3B]/60 flex items-center justify-center">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#1F4E3B] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
                  {initials}
                </span>
              </div>
            </div>
            
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#5C7262] font-semibold mt-2" style={headingStyle as any}>
              {bannerSubtitle}
            </span>
          </div>

          {/* Names */}
          <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2">
            {isBirthday ? (
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-6xl font-bold text-[#1B3022] tracking-wide break-words" style={brideStyle as any}>
                  {displayName}
                </h1>
                {turningAge && (
                  <div className="inline-block px-4 py-1 rounded-full bg-[#1F4E3B]/10 border border-[#1F4E3B]/30 text-[#1F4E3B] font-bold text-xs uppercase tracking-widest">
                    {turningAge}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-[#1B3022] tracking-wide leading-tight break-words" style={brideStyle as any}>
                  {brideName}
                </h1>
                <div className="flex items-center justify-center gap-3 my-2">
                  <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#1F4E3B] to-transparent" />
                  <span className="text-xl sm:text-3xl italic text-[#1F4E3B] font-serif">&amp;</span>
                  <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#1F4E3B] to-transparent" />
                </div>
                <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold text-[#1B3022] tracking-wide leading-tight break-words" style={groomStyle as any}>
                  {groomName}
                </h2>
              </div>
            )}

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
            {isBirthday ? <PartyPopper className="w-6 h-6 text-[#1F4E3B]" /> : <Leaf className="w-6 h-6 text-[#1F4E3B]" />}
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-2">
            {isBirthday ? 'Birthday Celebration' : isHolud ? 'Gaye Holud Invitation' : 'Cordial Invitation'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
            {isBirthday ? 'Join The Party' : 'Celebrate With Us'}
          </h3>
          <p className="font-serif italic text-sm sm:text-base text-[#3D5244] leading-relaxed max-w-xl mx-auto mb-6">
            &ldquo;{invitationMessage}&rdquo;
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#1F4E3B] to-transparent mx-auto" />
        </section>

        {/* The Couple / Celebrant */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-[#EBF3EE]/60 border-y border-[#1F4E3B]/20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">
              {isBirthday ? 'The Birthday Star' : 'The Happy Couple'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-[#1B3022] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
              {isBirthday ? displayName : 'Bride & Groom'}
            </h3>

            {isBirthday ? (
              <div className="max-w-xs mx-auto">
                <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border-4 border-[#1F4E3B] shadow-xl relative bg-stone-100 mb-3 group">
                  <img src={couplePhoto || bridePhoto} alt="Celebrant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-[#1B3022]" style={brideStyle as any}>{displayName}</h4>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
                <div className="flex flex-col items-center bg-white p-5 rounded-3xl border border-[#1F4E3B]/30 shadow-soft-surface">
                  <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#1F4E3B] shadow-md relative bg-stone-100 mb-3 group">
                    <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#1F4E3B] font-bold">The Groom</span>
                  <h4 className="text-lg font-bold text-[#1B3022] mt-0.5 truncate max-w-full" style={groomStyle as any}>{groomName}</h4>
                </div>

                <div className="flex flex-col items-center bg-white p-5 rounded-3xl border border-[#1F4E3B]/30 shadow-soft-surface">
                  <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#1F4E3B] shadow-md relative bg-stone-100 mb-3 group">
                    <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#1F4E3B] font-bold">The Bride</span>
                  <h4 className="text-lg font-bold text-[#1B3022] mt-0.5 truncate max-w-full" style={brideStyle as any}>{brideName}</h4>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Responsive Timeline / Event Schedule */}
        <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">
            {isBirthday ? 'Party Program' : 'Itinerary & Program'}
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
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-[#1F4E3B]/20 shadow-soft-surface gap-3">
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
        <section className="py-16 px-4 sm:px-6 bg-white border-y border-[#1F4E3B]/20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">Memories &amp; Moments</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Photo Gallery</h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
              {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#1F4E3B]/30 shadow-sm relative group bg-stone-100">
                  <img src={imgUrl} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-[10px] font-bold tracking-wider uppercase">Moment {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="py-16 px-4 sm:px-6 bg-[#F4F8F5] text-center">
          <div className="max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">Save The Date</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Counting Down</h3>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              {[
                { val: timeLeft.days, label: 'Days' },
                { val: timeLeft.hours, label: 'Hours' },
                { val: timeLeft.minutes, label: 'Mins' },
                { val: timeLeft.seconds, label: 'Secs' },
              ].map((item, i) => (
                <div key={i} className="py-4 sm:py-5 rounded-2xl bg-white border border-[#1F4E3B]/20 shadow-soft-surface flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-3xl font-bold text-[#1F4E3B]" style={{ fontFamily: 'Cinzel, serif' }}>{item.val}</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#5C7262] font-bold mt-0.5">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue Location */}
        <section className="py-16 px-4 sm:px-6 bg-white border-t border-[#1F4E3B]/20">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#1F4E3B] font-bold block mb-1.5">Directions &amp; Location</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3022] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Venue Details</h3>

            <div className="bg-[#F4F8F5] rounded-3xl p-6 sm:p-8 border border-[#1F4E3B]/30 shadow-soft-surface">
              <div className="w-14 h-14 rounded-full bg-white text-[#1F4E3B] flex items-center justify-center mx-auto mb-3.5 shadow-sm border border-[#1F4E3B]/30">
                <MapPin className="w-7 h-7" />
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-[#1B3022] mb-1.5" style={{ fontFamily: 'Cinzel, serif' }}>{venue}</h4>
              <p className="text-xs sm:text-sm text-[#5C7262] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

              <a 
                href={mapsDestinationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1F4E3B] text-white font-bold text-xs tracking-wider uppercase shadow-elevated-card hover:bg-[#15382a] transition-all"
              >
                <Navigation className="w-3.5 h-3.5" /> Open In Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 text-center bg-[#1B3022] text-white border-t border-[#1F4E3B]/40">
          <div className="w-10 h-10 rounded-full border border-emerald-400/40 flex items-center justify-center mx-auto mb-3 bg-white/5">
            <span className="text-emerald-200 text-xs font-serif font-bold">{initials}</span>
          </div>
          <h4 className="text-xl font-bold tracking-wider mb-1" style={brideStyle as any}>
            {isBirthday ? displayName : `${brideName} & ${groomName}`}
          </h4>
          <p className="text-[10px] text-emerald-200/80 uppercase tracking-widest mb-4">
            Thank you for celebrating this milestone with us
          </p>
          <p className="text-[9px] text-gray-400 uppercase tracking-wider">
            Digital Invitation • Botanical Edition
          </p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE VARIATION B: ROYAL HERITAGE SCROLL (Opulent Gold & Burgundy Palace)
  // Distinct Regal Layout with Mobile-First Responsive Schedule!
  // =========================================================================
  return (
    <div className="w-full min-h-screen bg-[#FAF6F0] text-[#2C241E] font-serif relative scroll-smooth selection:bg-[#D4AF37]/30">
      
      {/* Floating Header */}
      <header className="fixed top-4 inset-x-4 max-w-4xl mx-auto z-50 flex items-center justify-between pointer-events-none">
        <div className="bg-[#2C241E]/95 backdrop-blur-md border border-[#D4AF37]/60 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto flex items-center gap-2">
          <Crown className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            {headerCategoryLabel}
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-[#2C241E]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-2xl flex items-center justify-center text-[#D4AF37] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Royal Ambient Melody"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#D4AF37]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </header>

      {/* Hero Section: Palace Arch Presentation */}
      <section className="relative min-h-[94vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden bg-gradient-to-b from-[#2C241E] via-[#3D322A] to-[#1F1915] text-[#FAF6F0] border-b-4 border-[#D4AF37]">
        <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-6 left-6 text-[#D4AF37]/60 text-3xl sm:text-4xl select-none">❖</div>
        <div className="absolute top-6 right-6 text-[#D4AF37]/60 text-3xl sm:text-4xl select-none">❖</div>

        {/* Royal Crest Monogram */}
        <div className="relative z-10 mt-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[9px] sm:text-[11px] font-serif uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-lg">
            <span>⚜</span>
            <span>{isBirthday ? "Imperial Birthday Celebration" : "Royal Invitation Proclamation"}</span>
            <span>⚜</span>
          </div>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#8C4A52] via-[#D4AF37] to-[#8C4A52] shadow-2xl my-2">
            <div className="w-full h-full rounded-full bg-[#1F1915] border-2 border-[#D4AF37] flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                {initials}
              </span>
            </div>
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80 font-bold mt-2" style={headingStyle as any}>
            {bannerSubtitle}
          </span>
        </div>

        {/* Hero Center Names */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2">
          {isBirthday ? (
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-6xl font-bold text-white tracking-wider break-words" style={brideStyle as any}>
                {displayName}
              </h1>
              {turningAge && (
                <div className="inline-block px-5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold text-xs tracking-widest uppercase">
                  {turningAge}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide break-words" style={brideStyle as any}>
                {brideName}
              </h1>
              <div className="flex items-center justify-center gap-3 my-3">
                <span className="w-10 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <span className="text-2xl sm:text-3xl italic text-[#D4AF37] font-serif">❦</span>
                <span className="w-10 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>
              <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide break-words" style={groomStyle as any}>
                {groomName}
              </h2>
            </div>
          )}

          <div className="mt-6 inline-flex items-center gap-2 bg-[#1F1915]/90 border border-[#D4AF37] px-6 py-2 rounded-full shadow-2xl max-w-full">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold text-[#D4AF37] tracking-[0.15em] uppercase truncate">{date}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 flex flex-col items-center text-[#D4AF37] text-xs animate-bounce">
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#D4AF37]">Explore The Journey</span>
          <span className="text-lg mt-0.5">↓</span>
        </div>
      </section>

      {/* Royal Parchment Invitation Box */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center relative">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-30 mix-blend-multiply pointer-events-none" />
          
          <div className="w-14 h-14 rounded-full bg-[#8C4A52] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Crown className="w-7 h-7" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C4A52] font-bold block mb-2">
            {isBirthday ? "Imperial Birthday Invitation" : isHolud ? "Gaye Holud Invitation" : "Imperial Decree"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#2C241E] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
            {isBirthday ? "Honoring A Blessed Birthday" : "A Cordial Celebration of Union"}
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-[#5C4D43] leading-relaxed max-w-xl mx-auto mb-6">
            &ldquo;{invitationMessage}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm">❖</span>
            <span className="w-12 h-px bg-[#D4AF37]" />
          </div>
        </div>
      </section>

      {/* The Couple / Celebrant: Dual Palace Arches */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FAF6F0] via-[#F4EDE2] to-[#FAF6F0] border-y-2 border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C4A52] font-bold block mb-2">
            {isBirthday ? 'Honored Celebrant' : 'The Royal Couple'}
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#2C241E] mb-10" style={{ fontFamily: 'Cinzel, serif' }}>
            {isBirthday ? displayName : 'The Groom & The Bride'}
          </h3>

          {isBirthday ? (
            <div className="max-w-xs mx-auto">
              <div className="w-full aspect-[4/5] rounded-t-[140px] rounded-b-3xl overflow-hidden border-4 border-[#D4AF37] shadow-2xl relative bg-stone-100 mb-4 p-1 bg-gradient-to-b from-[#D4AF37] via-[#8C4A52] to-[#D4AF37]">
                <div className="w-full h-full rounded-t-[134px] rounded-b-2xl overflow-hidden">
                  <img src={couplePhoto || bridePhoto} alt="Celebrant" className="w-full h-full object-cover" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-[#2C241E]" style={brideStyle as any}>{displayName}</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              {/* Groom Palace Arch */}
              <div className="flex flex-col items-center bg-white p-6 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl">
                <div className="w-full max-w-[200px] aspect-[4/5] rounded-t-[120px] rounded-b-2xl overflow-hidden border-4 border-[#D4AF37] shadow-lg p-1 bg-gradient-to-b from-[#D4AF37] to-[#8C4A52] mb-4">
                  <div className="w-full h-full rounded-t-[112px] rounded-b-xl overflow-hidden">
                    <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C4A52] font-bold mb-0.5">The Groom</span>
                <h4 className="text-lg font-bold text-[#2C241E] truncate max-w-full" style={groomStyle as any}>{groomName}</h4>
              </div>

              {/* Bride Palace Arch */}
              <div className="flex flex-col items-center bg-white p-6 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl">
                <div className="w-full max-w-[200px] aspect-[4/5] rounded-t-[120px] rounded-b-2xl overflow-hidden border-4 border-[#D4AF37] shadow-lg p-1 bg-gradient-to-b from-[#D4AF37] to-[#8C4A52] mb-4">
                  <div className="w-full h-full rounded-t-[112px] rounded-b-xl overflow-hidden">
                    <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C4A52] font-bold mb-0.5">The Bride</span>
                <h4 className="text-lg font-bold text-[#2C241E] truncate max-w-full" style={brideStyle as any}>{brideName}</h4>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Royal Schedule: Mobile-First Responsive List */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C4A52] font-bold block mb-2">
          {isBirthday ? "Party Program" : "Order of Events"}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#2C241E] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
          {isBirthday ? "Birthday Schedule" : "Ceremony Timeline"}
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
          {isBirthday ? displayName : `${brideName} & ${groomName}`}
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
