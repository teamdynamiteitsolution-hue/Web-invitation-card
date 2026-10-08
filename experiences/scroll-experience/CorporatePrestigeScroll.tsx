"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Volume2, VolumeX, 
  Briefcase, Navigation, Award
} from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

export default function CorporatePrestigeScroll({
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
    brideName = "Apex Global Summit",
    groomName = "",
    eventLabel = "Annual Corporate Leadership Gala",
    date = "Thursday, 15 October 2027",
    time = "9:00 AM",
    venue = "The Grand Convention Center",
    venueAddress = "Gulshan-1 Commercial District, Dhaka, Bangladesh",
    googleMapsUrl = "",
    couplePhoto = "/assets/categories/corporate.webp",
    gallery1 = "/assets/categories/corporate.webp",
    gallery2 = "/assets/categories/anniversary.webp",
    gallery3 = "/assets/categories/wedding.webp",
    gallery4 = "/assets/categories/boubhat.webp",
    invitationMessage = "You are cordially invited to connect with industry leaders, visionary keynote speakers, and corporate changemakers for an evening of honor, insights and strategic partnerships.",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const titleStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: 'Cinzel, serif' };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: 'Cinzel, serif' };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: 'Cinzel, serif' };

  const hasBothNames = Boolean(brideName && groomName && brideName !== groomName);
  const title = hasBothNames ? `${brideName} & ${groomName}` : (brideName || groomName || "Apex Global Summit");

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 90, hours: 12, minutes: 0, seconds: 0 });

  useEffect(() => {
    let targetDate = new Date(date).getTime();
    if (isNaN(targetDate)) {
      targetDate = new Date().getTime() + (90 * 24 * 60 * 60 * 1000);
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
    { icon: "☕", num: "I", label: "Registration", title: "Delegate Badge & Morning Coffee", time: "9:00 AM", loc: "Executive Foyer" },
    { icon: "🎤", num: "II", label: "Keynote", title: "Leadership Keynote & Panel Discussions", time: time || "10:30 AM", loc: venue },
    { icon: "🥂", num: "III", label: "Gala Dinner", title: "Awards Ceremony & Networking Dinner", time: "7:00 PM", loc: "Grand Horizon Hall" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans relative scroll-smooth selection:bg-[#38BDF8]/30 overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-12">
        <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#38BDF8]/40 px-4 py-1.5 rounded-full shadow-2xl pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
          <span className="text-[11px] font-bold text-[#F8FAFC] tracking-wider uppercase font-serif">
            💼 Corporate Prestige
          </span>
        </div>

        <button 
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 rounded-full bg-[#0F172A]/90 backdrop-blur-md border border-[#38BDF8]/40 shadow-2xl flex items-center justify-center text-[#38BDF8] hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          title="Ambient Sound"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse text-[#38BDF8]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-4 sm:px-6 py-16 text-center overflow-hidden border-b-4 border-[#38BDF8] bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Top Badge */}
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#38BDF8] font-bold mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-[#38BDF8]/40 font-mono">
            <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Official Delegation Invitation</span>
            <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-[#38BDF8] flex items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-[#38BDF8] shadow-2xl p-1 my-2">
            <Briefcase className="w-8 h-8 text-[#38BDF8]" />
          </div>
          
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#94A3B8] font-semibold mt-2" style={headingStyle as any}>
            {eventLabel}
          </span>
        </div>

        {/* Summit Title */}
        <div className="relative z-10 my-auto py-6 max-w-2xl mx-auto w-full px-2 space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight break-words drop-shadow-xl font-serif">
            {hasBothNames ? (
              <>
                <span style={titleStyle as any}>{brideName}</span>
                <span className="text-[#38BDF8] mx-2 font-light">&amp;</span>
                <span style={groomStyle as any}>{groomName}</span>
              </>
            ) : (
              <span style={titleStyle as any}>{title}</span>
            )}
          </h1>

          <div>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#1E293B]/80 backdrop-blur-sm px-5 py-2 rounded-full border border-[#38BDF8]/40 shadow-xl max-w-full">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#F8FAFC] tracking-wider uppercase font-mono truncate">{date}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-[#38BDF8] text-xs animate-bounce">
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#38BDF8] font-mono">Scroll For Summit Details</span>
          <span className="text-lg mt-1">↓</span>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center relative font-sans">
        <div className="w-14 h-14 rounded-2xl bg-[#E2E8F0] border-2 border-[#38BDF8] flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Award className="w-6 h-6 text-[#0F172A]" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-2 font-mono">
          Executive Invitation
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-5 font-serif">
          Distinguished Leaders &amp; Partners
        </h3>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl mx-auto mb-6">
          {invitationMessage}
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#0284C7] to-transparent mx-auto rounded-full" />
      </section>

      {/* Summit Banner Photo */}
      <section className="py-16 px-4 sm:px-6 bg-[#0F172A] text-white border-y-2 border-[#38BDF8]/40">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#38BDF8] font-bold block mb-1.5 font-mono">
            Conference Spotlight
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-serif">
            Venue &amp; Atmosphere
          </h3>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#38BDF8]/50 shadow-2xl relative bg-slate-800 mx-auto group">
            <img src={couplePhoto} alt="Summit Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Schedule Agenda */}
      <section className="py-16 px-4 sm:px-6 max-w-2xl mx-auto text-center font-sans">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#0284C7] font-bold block mb-1.5 font-mono">
          Conference Agenda
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-8 font-serif">
          Itinerary &amp; Keynotes
        </h3>

        <div className="space-y-3.5 text-left">
          {scheduleItems.map((item, idx) => {
            const isMain = idx === 1;
            if (isMain) {
              return (
                <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white border-2 border-[#38BDF8] shadow-2xl gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-xl text-white">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#38BDF8] font-bold block truncate font-mono">
                        {item.label}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-white leading-snug break-words">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">{item.loc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-1 bg-[#0F172A] border border-[#38BDF8]/40 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#38BDF8] font-mono">
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center flex-shrink-0 text-xl text-[#0F172A]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#64748B] font-bold block truncate font-mono">
                      {item.label}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#0F172A] leading-snug break-words">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#64748B] truncate mt-0.5">{item.loc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 bg-[#F1F5F9] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0F172A] font-mono">
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
      <section className="py-16 px-4 sm:px-6 bg-[#0F172A] text-white border-y-2 border-[#38BDF8]/40">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#38BDF8] font-bold block mb-2 font-mono">Visual Milestones</span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8 font-serif">Summit Highlights</h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
            {[gallery1, gallery2, gallery3, gallery4].map((imgUrl, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#38BDF8]/40 shadow-xl bg-slate-900">
                <img src={imgUrl} alt={`Highlight ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 sm:px-6 bg-[#F8FAFC] text-center font-sans">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#0284C7] font-bold block mb-2 font-mono">Delegation Countdown</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 font-serif">Countdown To Summit Opening</h3>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:py-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-extrabold text-[#0284C7] font-mono">{item.val}</span>
                <span className="text-[9px] uppercase tracking-wider text-[#64748B] font-bold mt-0.5 font-mono">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Location */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-xl mx-auto text-center font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#0284C7] font-bold block mb-2 font-mono">Summit Headquarters</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 font-serif">Convention Center</h3>

          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-[#38BDF8] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-1.5 font-serif">{venue}</h4>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto mb-6 leading-relaxed">{venueAddress}</p>

            <a 
              href={mapsDestinationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F172A] text-white font-bold text-xs tracking-[0.15em] uppercase shadow-xl hover:bg-[#1E293B] border border-[#38BDF8]/40 transition-all font-mono"
            >
              <Navigation className="w-3.5 h-3.5 text-[#38BDF8]" /> Open Venue Map
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center bg-[#0B1120] text-white border-t-2 border-[#38BDF8]">
        <h4 className="text-xl font-bold tracking-wider mb-1 font-serif" style={titleStyle as any}>
          {title}
        </h4>
        <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-4 font-mono">
          Executive Leadership Summit • All Rights Reserved
        </p>
        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">
          Digital Event Invitation • Corporate Prestige Edition
        </p>
      </footer>
    </div>
  );
}
