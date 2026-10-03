"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Volume2, VolumeX, 
  Crown, Sparkles, Navigation
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function RubyVelvetScroll({
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
    date = "Sunday, 15 June 2027",
    time = "7:30 PM",
    venue = "The Grand Velvet Ballroom",
    venueAddress = "Gulshan-2, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "Grand Wedding Reception Of",
    groomPhoto = "/assets/categories/reception.webp",
    bridePhoto = "/assets/categories/reception.webp",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    gallery3 = "/assets/Cards/card 3.png",
    gallery4 = "/assets/Cards/card 4.png",
    invitationMessage = "We request the honor of your presence to celebrate our wedding reception amidst velvet elegance, enchanting melodies, and cherished memories.",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: 'Cinzel, serif' };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: 'Cinzel, serif' };

  const initials = getMonogram(brideName, groomName, 'circle');

  // Real-time Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 121, hours: 18, minutes: 45, seconds: 0 });

  useEffect(() => {
    let targetDate = new Date(date).getTime();
    if (isNaN(targetDate)) {
      targetDate = new Date().getTime() + (121 * 24 * 60 * 60 * 1000);
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
    { icon: "🥂", num: "I", label: "Welcome", title: "Red Carpet Entry & Welcome Drinks", time: "6:30 PM", loc: "Grand Foyer" },
    { icon: "👑", num: "II", label: "Main Event", title: "Couple Stage Reception & Toasts", time: time || "7:30 PM", loc: venue },
    { icon: "🍽️", num: "III", label: "Royal Feast", title: "Gala Banquet & Celebratory Music", time: "8:45 PM", loc: "Grand Dining Hall" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF8F8] text-[#3B0712] font-serif relative scroll-smooth selection:bg-[#BE123C]/30 overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-12">
        <div className="bg-[#4A0E17]/95 backdrop-blur-md border border-[#F59E0B]/50 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="text-[11px] font-bold text-[#FEF08A] tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            👑 Velvet Reception
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-[#4A0E17]/95 backdrop-blur-md border border-[#F59E0B]/50 shadow-2xl flex items-center justify-center text-[#FEF08A] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Reception Music"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#F59E0B]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden border-b-4 border-[#F59E0B] bg-gradient-to-b from-[#4A0E17] via-[#681122] to-[#4A0E17] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Monogram */}
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#FEF08A] font-bold mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-[#F59E0B]/40">
            <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Royal Nikah &amp; Reception</span>
            <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#FEF08A] flex items-center justify-center bg-gradient-to-br from-[#FEF08A] to-[#F59E0B] text-[#4A0E17] shadow-2xl p-1 my-2">
            <div className="w-full h-full rounded-full border border-dashed border-[#881337] flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#881337] tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
                {initials}
              </span>
            </div>
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#FEF08A] font-semibold mt-2" style={headingStyle as any}>
            {eventLabel}
          </span>
        </div>

        {/* Names */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFF5F5] tracking-wide leading-tight break-words drop-shadow-xl" style={brideStyle as any}>
              {brideName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2">
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
              <span className="text-xl sm:text-3xl italic text-[#FEF08A] font-serif">&amp;</span>
              <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFF5F5] tracking-wide leading-tight break-words drop-shadow-xl" style={groomStyle as any}>
              {groomName}
            </h2>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-[#2B050D]/80 backdrop-blur-sm px-5 py-2 rounded-full border border-[#F59E0B]/50 shadow-xl max-w-full">
            <Calendar className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-[#FEF08A] tracking-wider uppercase truncate">{date}</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-[#FEF08A] text-xs animate-bounce">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#FEF08A]">Scroll To Celebrate</span>
          <span className="text-lg mt-1">↓</span>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center relative">
        <div className="w-14 h-14 rounded-full bg-[#FFF0F2] border-2 border-[#BE123C] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Sparkles className="w-6 h-6 text-[#9F1239]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#9F1239] font-bold block mb-2">
          An Evening of Splendor
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#4A0E17] mb-5" style={{ fontFamily: 'Cinzel, serif' }}>
          Wedding Reception
        </h3>
        <p className="font-serif italic text-sm sm:text-base text-[#881337] leading-relaxed max-w-xl mx-auto mb-6">
          &ldquo;{invitationMessage}&rdquo;
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#BE123C] to-transparent mx-auto rounded-full" />
      </section>

      {/* Couple Portraits */}
      <section className="py-16 px-4 sm:px-6 bg-[#FFF0F2]/50 border-y-2 border-[#BE123C]/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9F1239] font-bold block mb-1.5">
            The Newlyweds
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#4A0E17] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
            Royal Couple
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border-2 border-[#F59E0B]/40 shadow-xl">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#BE123C] shadow-md relative bg-rose-50 mb-3 group">
                <img src={groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9F1239] font-bold">The Groom</span>
              <h4 className="text-lg font-bold text-[#4A0E17] mt-0.5 truncate max-w-full" style={groomStyle as any}>{groomName}</h4>
            </div>

            <div className="flex flex-col items-center bg-white p-5 rounded-3xl border-2 border-[#F59E0B]/40 shadow-xl">
              <div className="w-full max-w-[200px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#BE123C] shadow-md relative bg-rose-50 mb-3 group">
                <img src={bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9F1239] font-bold">The Bride</span>
              <h4 className="text-lg font-bold text-[#4A0E17] mt-0.5 truncate max-w-full" style={brideStyle as any}>{brideName}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Reception Schedule */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#9F1239] font-bold block mb-1.5">
          Evening Program
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#4A0E17] mb-8" style={{ fontFamily: 'Cinzel, serif' }}>
          Reception Itinerary
        </h3>

        <div className="space-y-3.5 text-left">
          {scheduleItems.map((item, idx) => {
            const isMain = idx === 1;
            if (isMain) {
              return (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#681122] to-[#4A0E17] text-white border-2 border-[#F59E0B] shadow-2xl gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0 text-xl text-white">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#FEF08A] font-bold block truncate">
                        {item.label}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#FEE2E2] truncate mt-0.5">{item.loc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 bg-black/20 border border-white/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#FEF08A]">
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BE123C]/30 shadow-md gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF0F2] border border-[#BE123C]/40 flex items-center justify-center flex-shrink-0 text-xl text-[#9F1239]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#9F1239] font-bold block truncate">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#4A0E17] leading-snug break-words" style={{ fontFamily: 'Cinzel, serif' }}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#881337] truncate mt-0.5">{item.loc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 bg-[#FFF0F2] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#9F1239]">
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
      <section className="py-16 px-4 sm:px-6 bg-[#4A0E17] text-white border-y-4 border-[#F59E0B]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#FEF08A] font-bold block mb-2">Moments of Grandeur</span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Royal Reception Gallery</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#F59E0B] shadow-xl p-1 bg-gradient-to-b from-[#F59E0B] to-[#4A0E17]">
                <img src={imgUrl} alt={`Moment ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 sm:px-6 bg-[#FFF8F8] text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9F1239] font-bold block mb-2">Grand Evening Awaits</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#4A0E17] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Countdown To Reception</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:py-5 rounded-2xl bg-white border-2 border-[#BE123C]/30 shadow-md flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-bold text-[#9F1239]" style={{ fontFamily: 'Cinzel, serif' }}>{item.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#881337] font-bold mt-0.5">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Directions */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t-2 border-[#BE123C]/30">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9F1239] font-bold block mb-2">Reception Venue</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#4A0E17] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Ballroom Location</h3>

          <div className="bg-[#FFF0F2]/40 rounded-3xl p-6 sm:p-8 border-2 border-[#BE123C]/40 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#9F1239] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#4A0E17] mb-1.5" style={{ fontFamily: 'Cinzel, serif' }}>{venue}</h4>
            <p className="text-xs sm:text-sm text-[#881337] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

            <a 
              href={mapsDestinationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#9F1239] text-white font-bold text-xs tracking-[0.15em] uppercase shadow-xl hover:bg-[#881337] border border-[#F59E0B] transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FEF08A]" /> Open In Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-[#2B050D] text-white border-t-4 border-[#F59E0B]">
        <div className="w-10 h-10 rounded-full border-2 border-[#F59E0B] flex items-center justify-center mx-auto mb-3 bg-white/5">
          <span className="text-[#FEF08A] text-xs font-serif font-bold">{initials}</span>
        </div>
        <h4 className="text-xl font-bold tracking-wider mb-1" style={brideStyle as any}>
          {brideName} &amp; {groomName}
        </h4>
        <p className="text-[10px] text-[#FEF08A] uppercase tracking-widest mb-4">
          Honored to celebrate this joyous milestone with family &amp; friends
        </p>
        <p className="text-[9px] text-rose-300/60 uppercase tracking-wider">
          Digital Invitation • Ruby Velvet Edition
        </p>
      </footer>
    </div>
  );
}
