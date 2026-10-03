"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MapPin, Calendar, Clock, Heart, Volume2, VolumeX, 
  Navigation, Leaf, Crown, PartyPopper,
  Award, Music, Flame, Check, Download
} from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

// =========================================================================
// INTERACTIVE SCROLL REVEAL COMPONENT
// =========================================================================
const ScrollReveal: React.FC<{
  children: React.ReactNode;
  animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  className?: string;
}> = ({ children, animation = 'fade-up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.12 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let animClass = "";
  if (animation === 'fade-up') {
    animClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12";
  } else if (animation === 'slide-left') {
    animClass = isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12";
  } else if (animation === 'slide-right') {
    animClass = isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12";
  } else if (animation === 'scale') {
    animClass = isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${animClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function FloralScrollExperience({
  template,
  animation,
  eventData,
  revealMode = 'auto',
  customImage,
  bgBlur = 0,
  skipAnimation = false
}: {
  template: any;
  animation?: any;
  eventData: any;
  revealMode?: string;
  customImage?: string | null;
  bgBlur?: number;
  skipAnimation?: boolean;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const category = eventData?.category || template?.category || 'wedding';
  const isBirthday = category === 'birthday';
  const isCorporate = category === 'corporate';

  const brideName = eventData?.brideName || "Maria Luca";
  const groomName = eventData?.groomName || "Gregory Boss";
  const displayName = eventData?.eventLabel || brideName;
  const date = eventData?.date || "2027-05-03";
  const venue = eventData?.venueName || eventData?.venue || "Madison Square Garden";
  const venueAddress = eventData?.venueAddress || "4 Pennsylvania Plaza, New York, NY 10001";

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: "'Alex Brush', 'Great Vibes', cursive" };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: "'Alex Brush', 'Great Vibes', cursive" };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : {};

  useEffect(() => {
    if (!date) return;
    const target = new Date(date).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [date]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const mapsDestinationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue} ${venueAddress}`)}`;

  return (
    <div className="w-full min-h-screen bg-[#EDE7E1] text-[#6A2D31] font-serif relative overflow-x-hidden">
      
      {/* Subtle Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply" 
           style={{ backgroundImage: "radial-gradient(circle at top, transparent 0%, #DBCBBE 100%)" }} />

      {/* Floating Audio Button */}
      {eventData?.music && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#3D3D3D] text-white shadow-xl hover:scale-105 transition-transform"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-12 pb-16">
        <ScrollReveal animation="fade-up" className="space-y-6 w-full max-w-lg mx-auto">
          
          {/* Top Label */}
          <div 
            className="flex flex-col items-center gap-1.5 opacity-90"
            style={headingStyle}
          >
            {isBirthday ? (
              <>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">A Celebration</span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">Of Life & Joy</span>
              </>
            ) : isCorporate ? (
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">Annual Corporate Summit</span>
            ) : (
              <>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">{eventData?.eventLabel || "Love, Laughter"}</span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">&amp; Happily</span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold">Ever After</span>
              </>
            )}
          </div>

          <h2 className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase font-extrabold mt-8 mb-4 text-[#6A2D31]">
            {isBirthday ? "JOIN US FOR A BIRTHDAY PARTY" : isCorporate ? "YOU ARE INVITED" : "WE ARE GETTING MARRIED"}
          </h2>

          <div className="relative py-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-normal leading-[1.2] drop-shadow-sm text-[#6A2D31]">
              {isBirthday || isCorporate ? (
                <span style={brideStyle} className="break-words block">{displayName}</span>
              ) : (
                <>
                  <div className="mb-2 break-words" style={brideStyle}>{brideName}</div>
                  <div className="text-3xl sm:text-4xl my-2 opacity-80 font-sans">&amp;</div>
                  <div className="mt-2 break-words" style={groomStyle}>{groomName}</div>
                </>
              )}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center mt-6">
             <div className="w-1 h-1 rounded-full bg-[#6A2D31]/40 mb-5" /> 
             <span className="text-sm font-bold tracking-[0.2em] text-[#6A2D31]">
               {date}
             </span>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= COUNTDOWN SECTION ================= */}
      <section className="relative z-10 py-16 px-6 text-center">
        <ScrollReveal animation="fade-up" className="max-w-xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-5xl opacity-90" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
            Countdown
          </h2>
          <p className="text-sm italic opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
            {isCorporate ? "The event is approaching!" : "We can't wait for this moment!"}
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-8">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Minutes' },
              { val: timeLeft.seconds, label: 'Seconds' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/20 border border-[#6A2D31]/15 backdrop-blur-sm flex items-center justify-center shadow-inner mb-3">
                  <span className="text-2xl sm:text-3xl font-light italic" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
                    {item.val}
                  </span>
                </div>
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold opacity-70">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ================= VENUE SECTION ================= */}
      <section className="relative z-10 py-20 px-6 text-center">
        <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-5xl sm:text-6xl opacity-90 mb-8" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
            The Venue
          </h2>
          
          <div className="relative w-full aspect-square max-w-[320px] mx-auto opacity-90 mix-blend-multiply mb-12">
            {eventData?.couplePhoto || customImage ? (
              <img src={eventData?.couplePhoto || customImage} alt="Venue" className="w-full h-full object-cover rounded-t-full shadow-lg" />
            ) : (
              <div className="w-full h-full bg-[#DBCBBE] rounded-t-full border border-[#6A2D31]/10 flex flex-col items-center justify-center text-[#6A2D31]/40">
                <Leaf className="w-12 h-12 mb-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Venue Illustration</span>
              </div>
            )}
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 w-full">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">Scroll for more details</span>
              <div className="w-4 h-6 rounded-full border border-[#6A2D31] flex items-start justify-center p-0.5">
                <div className="w-1 h-1.5 rounded-full bg-[#6A2D31] animate-bounce" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="relative z-10 py-16 px-6 text-center mt-10">
        <ScrollReveal animation="fade-up" className="max-w-xl mx-auto space-y-5 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white border border-[#6A2D31]/20 flex items-center justify-center shadow-sm mb-2">
            <MapPin className="w-5 h-5 text-[#6A2D31]" />
          </div>

          <h3 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
            {venue}
          </h3>
          
          <p className="text-sm italic opacity-80 max-w-xs leading-relaxed mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            {venueAddress}
          </p>

          <a 
            href={mapsDestinationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-transparent border border-[#6A2D31]/30 text-[#6A2D31] text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#6A2D31]/5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="text-left leading-tight">Get directions<br/><span className="text-[9px] opacity-70 normal-case italic font-serif tracking-normal block mt-0.5">Open in Google Maps</span></span>
          </a>
        </ScrollReveal>
      </section>

      {/* ================= TIMELINE SECTION ================= */}
      <section className="relative z-10 py-24 px-6 text-center">
        <ScrollReveal animation="fade-up" className="max-w-xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-16 opacity-90">
             <div className="w-6 h-10 border border-[#6A2D31] rounded-full flex justify-center p-1 mb-2">
               <div className="w-1 h-2 bg-[#6A2D31] rounded-full animate-pulse" />
             </div>
             <span className="text-[9px] font-bold tracking-[0.25em] uppercase">Scroll for more details</span>
             <h2 className="text-4xl sm:text-5xl normal-case mt-4" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
               What we have planned for you
             </h2>
          </div>

          <div className="relative">
            {/* Vertical Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#6A2D31]/20 -translate-x-1/2" />

            <div className="space-y-24">
              {[
                { time: '14:00', label: 'START', desc: 'We look forward to welcoming everybody with a drink', icon: <Volume2 className="w-4 h-4"/> },
                { time: '15:00', label: 'LUNCH', desc: 'Surprise lunch', icon: <Music className="w-4 h-4"/> },
                { time: '17:00', label: 'PARTY', desc: 'Let yourself go!', icon: <PartyPopper className="w-4 h-4"/> },
              ].map((item, idx) => (
                <ScrollReveal key={idx} animation="fade-up" className="relative flex items-center justify-center w-full group">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-4 w-2 h-2 rounded-full bg-white border-[1.5px] border-[#6A2D31] -translate-x-1/2 shadow-[0_0_0_4px_#EDE7E1]" />

                  {/* Content (Alternating Layout) */}
                  <div className={`w-[45%] ${idx % 2 === 0 ? 'text-right pr-6 ml-0 mr-auto' : 'text-left pl-6 mr-0 ml-auto'} flex flex-col gap-1`}>
                    <span className="text-2xl sm:text-3xl italic opacity-90" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.time}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                    <span className="text-xs italic opacity-70 mt-1 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.desc}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= DRESS CODE SECTION ================= */}
      {!isCorporate && (
        <section className="relative z-10 py-20 px-6 text-center">
          <ScrollReveal animation="fade-up" className="max-w-xl mx-auto space-y-8">
            <h2 className="text-4xl sm:text-5xl opacity-90" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
              Attire Suggestions
            </h2>

            {/* Illustration Slot */}
            <div className="w-full max-w-[280px] mx-auto aspect-[4/3] bg-[#DBCBBE]/60 rounded-2xl flex items-center justify-center text-[#6A2D31]/30 mix-blend-multiply border border-[#6A2D31]/10">
               <span className="text-[10px] uppercase tracking-widest font-bold">Dress Code Guidance</span>
            </div>

            <h3 className="text-3xl italic opacity-90 mt-6" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}>
              Formal &amp; Festive
            </h3>

            <div className="flex items-start justify-center gap-16 opacity-80 italic text-sm mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold not-italic">Women</span>
                <span>Evening Dress / Saree</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold not-italic">Men</span>
                <span>Tuxedo / Suit / Panjabi</span>
              </div>
            </div>

            <div className="pt-10">
              <span className="text-[9px] tracking-[0.25em] uppercase font-bold opacity-80 block mb-6">Suggested Palette:</span>
              <div className="flex items-center justify-center gap-4">
                {[
                  { name: 'Taupe', hex: '#C2B5AA' },
                  { name: 'Ivory', hex: '#FAF8F5' },
                  { name: 'Burgundy', hex: '#6A2D31' },
                  { name: 'Rose Gold', hex: '#E6C6C3' },
                  { name: 'Gold', hex: '#D4AF37' }
                ].map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border border-white/40" style={{ backgroundColor: color.hex }} />
                    <span className="text-[9px] italic opacity-70 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 py-16 px-6 text-center opacity-70 mt-10">
        <div className="w-8 h-8 rounded-full border border-[#6A2D31]/30 flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-3.5 h-3.5 text-[#6A2D31]" />
        </div>
        <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-2">Thank you</p>
        <p className="text-[10px] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          Digital Invitation Experience
        </p>
      </footer>
    </div>
  );
}
