"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, Clock, Heart, Crown, Sparkles, Navigation
} from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function PatachitraRoyalScroll({
  template,
  eventData,
  skipAnimation = false
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const {
    brideName = "রাজকুমারী অঞ্জলি",
    groomName = "রাজপুত্র রাহুল",
    date = "Sunday, 24 October 2027",
    time = "7:00 PM Onwards",
    venue = "The Royal Palace Grand Durbar",
    venueAddress = "Royal Enclave, Gulshan-2, Dhaka",
    googleMapsUrl = "",
    eventLabel = "শাহী ফরমান ও রাজকীয় বিবাহ সনদ",
    groomPhoto = "/assets/categories/wedding.webp",
    bridePhoto = "/assets/categories/wedding.webp",
    couplePhoto = "/assets/categories/wedding.webp",
    invitationMessage = "পরম করুণাময়ের অশেষ কৃপায় ও রাজপরিবারের পক্ষ থেকে আপনাদের সকলকে আমাদের শুভ পরিণয় ও রাজকীয় বিবাহ অনুষ্ঠানে সাদর আমন্ত্রণ জানানো যাইতেছে।",
    rsvpContact = "+880 1700-000000",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : { fontFamily: "'Noto Serif Bengali', 'Cinzel', serif" };
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : { fontFamily: "'Noto Serif Bengali', 'Cinzel', serif" };
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : { fontFamily: "'Noto Serif Bengali', 'Cinzel', serif" };

  const initials = getMonogram(brideName, groomName, 'circle');
  const heroBannerImg = couplePhoto || bridePhoto || "/assets/categories/wedding.webp";

  const [timeLeft, setTimeLeft] = useState({ days: 120, hours: 14, minutes: 28, seconds: 45 });
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
    <div className="w-full min-h-screen bg-[#1F1714] text-[#2C211D] font-sans py-8 sm:py-16 px-3 sm:px-6 flex justify-center selection:bg-[#D4AF37]/30">
      
      {/* 📜 THE UNFURLING ROYAL PARCHMENT SCROLL CONTAINER */}
      <div className="relative w-full max-w-2xl bg-[#FBF6EE] rounded-sm shadow-[0_20px_70px_rgba(0,0,0,0.8)] border-x-[12px] sm:border-x-[18px] border-[#8C1D28] overflow-hidden">
        
        {/* TOP 3D GOLDEN SCROLL HANDLE ROD */}
        <div className="sticky top-0 z-30 w-full h-10 sm:h-12 bg-gradient-to-r from-[#8C6D23] via-[#F7D87C] via-[#FFEBB0] to-[#8C6D23] flex items-center justify-between px-4 shadow-xl border-y-2 border-[#544111]">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFEBB0] to-[#8C6D23] border border-[#3E300B] shadow-inner flex items-center justify-center text-[10px] text-[#3E300B] font-bold">✦</div>
          <div className="h-1 flex-1 mx-4 bg-[#695217]/30 rounded-full" />
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#4A3A11] font-bold">Royal Farman Decree</span>
          <div className="h-1 flex-1 mx-4 bg-[#695217]/30 rounded-full" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFEBB0] to-[#8C6D23] border border-[#3E300B] shadow-inner flex items-center justify-center text-[10px] text-[#3E300B] font-bold">✦</div>
        </div>

        {/* ORNAMENTAL FILIGREE INNER BORDERS */}
        <div className="p-4 sm:p-8 md:p-12 relative">
          <div className="border-4 border-double border-[#D4AF37] p-4 sm:p-8 relative bg-[radial-gradient(#D4AF37_0.5px,transparent_0.5px)] [background-size:12px_12px] [background-color:#FBF6EE]/90">
            
            {/* Corner Decorative Stamps */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8C1D28]" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#8C1D28]" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#8C1D28]" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8C1D28]" />

            {/* 1. ROYAL EMBLEM & BISMILLAH */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-b from-[#8C1D28] to-[#591017] border-2 border-[#D4AF37] flex items-center justify-center text-[#FBF6EE] shadow-lg mb-3">
                <Crown className="w-8 h-8 text-[#F7D87C]" />
              </div>
              <div className="text-xs font-serif text-[#8C1D28] font-bold tracking-[0.25em] uppercase mb-1">
                {eventLabel}
              </div>
              <div className="h-px w-24 bg-[#D4AF37] mx-auto mb-4" />
              <p className="text-xs font-serif italic text-[#7C6658]">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            </div>

            {/* 2. ILLUMINATED MINIATURE MANUSCRIPT HERO ARCH */}
            <div className="relative mx-auto mb-8 max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-[50%_50%_12px_12px] p-2 bg-gradient-to-b from-[#D4AF37] via-[#F7D87C] to-[#8C1D28] shadow-2xl">
              <div className="w-full h-full rounded-[48%_48%_8px_8px] overflow-hidden relative border-2 border-[#FBF6EE] bg-[#2C1D18]">
                <img 
                  src={heroBannerImg} 
                  alt="Royal Couple Portrait" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Monogram Medallion */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#8C1D28] border-2 border-[#F7D87C] flex items-center justify-center text-[#F7D87C] font-serif font-bold text-sm shadow-xl">
                  {initials || "R&A"}
                </div>
              </div>
            </div>

            {/* 3. ROYAL PROCLAMATION & NAMES */}
            <div className="text-center my-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8C1D28] block mb-2">
                — পরম সানন্দে ঘোষিত হইতেছে —
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#8C1D28] leading-tight" style={brideStyle}>
                {brideName}
              </h1>
              <div className="flex items-center justify-center gap-3 my-2">
                <span className="h-px w-12 bg-[#D4AF37]" />
                <span className="font-serif italic text-xl text-[#D4AF37]">ও</span>
                <span className="h-px w-12 bg-[#D4AF37]" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#8C1D28] leading-tight" style={groomStyle}>
                {groomName}
              </h1>
            </div>

            {/* 4. ROYAL DECREE TEXT */}
            <div className="my-8 p-5 sm:p-6 rounded-xl bg-[#F4EDE1] border border-[#D4AF37]/60 text-center">
              <p className="text-sm sm:text-base font-serif italic text-[#4A3728] leading-relaxed">
                "{invitationMessage}"
              </p>
            </div>

            {/* 5. CEREMONIAL DATE & TIME CAPSULE */}
            <div className="my-8 p-4 sm:p-6 bg-gradient-to-r from-[#8C1D28] to-[#591017] text-[#FBF6EE] rounded-2xl shadow-xl text-center border border-[#D4AF37]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F7D87C] font-bold block mb-1">তারিখ ও শুভলগ্ন</span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif mb-1" style={headingStyle}>{date}</h3>
              <p className="text-xs sm:text-sm text-[#F7D87C] font-serif">{time}</p>
            </div>

            {/* 6. ROYAL PROCESSION ITINERARY (DEED FORMAT) */}
            <div className="my-8">
              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C1D28] font-bold block">পর্বসূচি</span>
                <h3 className="text-2xl font-bold font-serif text-[#2C211D]">শাহী আনুষ্ঠানিকতা</h3>
              </div>

              <div className="space-y-4">
                {[
                  { step: "১", title: "বরাত ও শোভাযাত্রা (Grand Baraat)", time: "সন্ধ্যা ৬:৩০", desc: "রাজকীয় অর্ভ্যথনা ও পুষ্পবৃষ্টির মাধ্যমে শুভ আগমন।" },
                  { step: "২", title: "আকদ ও শুভ পরিণয় (Sacred Nikah)", time: "সন্ধ্যা ৭:৩০", desc: "পবিত্র কলমা ও কবুল পাঠের মাধ্যমে চিরন্তন বন্ধন।" },
                  { step: "৩", title: "শাহী ভোজ ও মেহমানদারি (Royal Feast)", time: "রাত ৮:৪৫", desc: "ঐতিহ্যবাহী মোঘলাই ও সুস্বাদু খাবারের আয়োজন।" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#D4AF37]/50 shadow-xs flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#8C1D28] text-[#F7D87C] font-bold text-sm flex items-center justify-center shrink-0 border border-[#D4AF37]">
                      {item.step}
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h4 className="font-bold text-sm sm:text-base text-[#8C1D28]">{item.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-[#8C1D28] bg-[#FBF6EE] px-2 py-0.5 rounded border border-[#D4AF37]/40 mb-1 inline-block">
                        {item.time}
                      </span>
                      <p className="text-xs font-serif text-[#7C6658]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. COUNTDOWN */}
            <div className="my-8 p-6 rounded-2xl bg-[#F4EDE1] border border-[#D4AF37] text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C1D28] font-bold block mb-3">শুভলগ্নের অপেক্ষা</span>
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                {[
                  { label: "দিন", val: timeLeft.days },
                  { label: "ঘণ্টা", val: timeLeft.hours },
                  { label: "মিনিট", val: timeLeft.minutes },
                  { label: "সেকেন্ড", val: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="p-2 sm:p-3 rounded-lg bg-white border border-[#D4AF37] flex flex-col items-center shadow-xs">
                    <span className="text-lg sm:text-2xl font-bold font-serif text-[#8C1D28]">{String(item.val).padStart(2, '0')}</span>
                    <span className="text-[9px] text-[#7C6658] font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. DURBAR VENUE & GOOGLE MAPS */}
            <div className="my-8 p-6 rounded-2xl bg-white border-2 border-[#D4AF37] shadow-md text-center">
              <MapPin className="w-8 h-8 text-[#8C1D28] mx-auto mb-2" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C1D28] font-bold block mb-1">দরবার ও অনুষ্ঠানস্থল</span>
              <h4 className="text-xl font-bold text-[#2C211D] mb-1" style={headingStyle}>{venue}</h4>
              <p className="text-xs font-serif text-[#7C6658] mb-4">{venueAddress}</p>
              <a
                href={googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venue + ' ' + venueAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#8C1D28] text-[#F7D87C] font-bold text-xs shadow-md hover:bg-[#6E141D] transition-colors border border-[#D4AF37]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps এ লোকেশন</span>
              </a>
            </div>

            {/* 9. WAX SEAL SIGNATURES & RSVP */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-[#D4AF37] text-center">
              <div className="w-16 h-16 rounded-full bg-[#8C1D28] border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-white text-xs font-bold shadow-xl mb-3">
                <span className="font-serif">শাহী সিল</span>
              </div>
              <p className="text-xs font-serif text-[#7C6658] mb-2">উপস্থিতি নিশ্চিতকরণ ও যোগাযোগ:</p>
              <div className="inline-block px-5 py-2 rounded-xl bg-[#F4EDE1] border border-[#D4AF37] text-sm font-bold text-[#8C1D28]">
                {rsvpContact}
              </div>
              <p className="text-[10px] font-serif italic text-[#7C6658] mt-4">
                আপনাদের আশীর্বাদ ও দোয়াই আমাদের এই বিশেষ দিনের পরম পাথেয়। ✦
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM 3D GOLDEN SCROLL HANDLE ROD */}
        <div className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#8C6D23] via-[#F7D87C] via-[#FFEBB0] to-[#8C6D23] flex items-center justify-between px-4 shadow-xl border-y-2 border-[#544111]">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFEBB0] to-[#8C6D23] border border-[#3E300B] shadow-inner flex items-center justify-center text-[10px] text-[#3E300B] font-bold">✦</div>
          <div className="h-1 flex-1 mx-4 bg-[#695217]/30 rounded-full" />
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#4A3A11] font-bold">Royal Proclamation</span>
          <div className="h-1 flex-1 mx-4 bg-[#695217]/30 rounded-full" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFEBB0] to-[#8C6D23] border border-[#3E300B] shadow-inner flex items-center justify-center text-[10px] text-[#3E300B] font-bold">✦</div>
        </div>

      </div>
    </div>
  );
}
