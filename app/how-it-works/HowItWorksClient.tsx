"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  LayoutTemplate, 
  MapPin, 
  ImagePlus, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  PlayCircle, 
  Scroll, 
  ZoomIn, 
  X, 
  Maximize2 
} from "lucide-react";

interface LightboxState {
  src: string;
  alt: string;
  title: string;
}

export default function HowItWorksClient() {
  const [activeStep2Tab, setActiveStep2Tab] = useState<'card' | 'scroll'>('card');
  const [activeStep3Tab, setActiveStep3Tab] = useState<'info' | 'text'>('info');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
      }
    };
    if (lightbox) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightbox]);

  const openLightbox = (src: string, alt: string, title: string) => {
    setLightbox({ src, alt, title });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9F0EC] border border-[#D4AF37]/30 text-[#8C4A52] font-bold text-xs uppercase tracking-widest mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step-by-Step Creator Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
          How to Create Your Digital Invitation
        </h1>
        <p className="text-[#7C7267] font-serif text-sm sm:text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed">
          From selecting a 3D opening animation to publishing an instant live link for your guests—learn how easily you can craft an unforgettable digital experience in 5 simple steps.
        </p>

        {/* Quick Jump Step Navigation Badges */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { num: "01", label: "Opening Style", href: "#step-1" },
            { num: "02", label: "Card & Scroll", href: "#step-2" },
            { num: "03", label: "Event Details", href: "#step-3" },
            { num: "04", label: "Add Photos", href: "#step-4" },
            { num: "05", label: "Duration & Pay", href: "#step-5" },
          ].map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#D4AF37]/30 text-xs font-bold text-[#2C2623] hover:bg-[#8C4A52] hover:text-white hover:border-[#8C4A52] transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="text-[#D4AF37] font-mono">{item.num}.</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Main Steps Container */}
      <main className="pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto space-y-12 sm:space-y-20">

        {/* ---------------- STEP 01: SELECT OPENING EXPERIENCE ---------------- */}
        <section id="step-1" className="scroll-mt-24 rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#D4AF37]/30 bg-[#2C2623] text-white shadow-xl flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-6xl font-extrabold text-[#D4AF37]/30 font-mono">01</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 flex items-center gap-1.5">
                  <PlayCircle className="w-3.5 h-3.5" /> Opening Animation
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                Select Your Opening Experience
              </h2>
              <p className="text-[#D4AF37] text-xs sm:text-sm font-semibold mb-4">
                ওপেনিং অ্যানিমেশন নির্বাচন করুন
              </p>

              <p className="text-gray-300 font-serif text-sm sm:text-base leading-relaxed mb-6">
                আপনার অতিথিরা যখন স্মার্টফোনে ইনভাইটেশন লিংকটি খুলবেন, তখন প্রথম কী জাদু দেখতে পাবেন তা নির্বাচন করুন। স্টুডিওর <strong className="text-white">Opening</strong> ট্যাবে বিভিন্ন সিনেমাটিক ৩ডি প্রি-রেন্ডার এনিমেশন পেয়ে যাবেন।
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Luxury 3D Envelopes:</strong> Blush Pink, Cream Velvet, এবং Sage Green থ্রিডি খাম উন্মোচনের ভিডিও।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Theatrical Curtain &amp; Scratch:</strong> রাজকীয় পর্দা ওপেনিং অথবা ইন্টারেক্টিভ স্ক্র্যাচ সিল অভিজ্ঞতা।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Live Play Preview:</strong> পছন্দসই অ্যানিমেশনে ক্লিক করে সাথে সাথে ডানদিকের লাইভ স্ক্রিনে প্রিভিউ দেখতে পারবেন।</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#D8CFC4] font-serif italic">Studio Tab: Opening</span>
              <a href="#step-2" className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1">
                Next: Card Design <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1 bg-black/40 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
            <div 
              onClick={() => openLightbox("/assets/work-flow/opening.jpg", "Opening Animation Selection in Studio", "Step 01: Opening Animation Selection")}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl group bg-stone-900 cursor-zoom-in"
              title="Click to view full image"
            >
              <img
                src="/assets/work-flow/opening.jpg"
                alt="Opening Animation Selection in Studio"
                className="w-full h-auto object-cover group-hover:scale-120 sm:group-hover:scale-125 transition-transform duration-500 ease-out origin-center"
              />
              {/* Hover Zoom Overlay Badge */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-[#D4AF37]/60 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Click to Zoom</span>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-center">
                <span className="text-[11px] text-amber-200 font-mono font-bold tracking-wider uppercase">
                  Opening Animation Tab Screenshot (Hover to Zoom)
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ---------------- STEP 02: PICK CARD OR SCROLL STORY ---------------- */}
        <section id="step-2" className="scroll-mt-24 rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#D4AF37]/30 bg-white text-[#2C2623] shadow-soft-surface flex flex-col lg:flex-row-reverse items-stretch">
          <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-6xl font-extrabold text-[#8C4A52]/20 font-mono">02</span>
                <span className="px-3 py-1 rounded-full bg-[#F9F0EC] text-[#8C4A52] text-xs font-bold border border-[#D4AF37]/30 flex items-center gap-1.5">
                  <LayoutTemplate className="w-3.5 h-3.5" /> Card Format &amp; Theme
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                Pick Your Card Design or Scroll Story
              </h2>
              <p className="text-[#8C4A52] text-xs sm:text-sm font-semibold mb-4">
                কার্ড ফরম্যাট ও আর্কিটেকচারাল থিম নির্বাচন
              </p>

              <p className="text-[#7C7267] font-serif text-sm sm:text-base leading-relaxed mb-6">
                আপনার অনুষ্ঠান ও পছন্দের উপর ভিত্তি করে দুইটি আধুনিক ডিজিটাল ফরম্যাট থেকে বেছে নিন:
              </p>

              {/* Format Toggle Buttons */}
              <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl mb-6 border border-[#D4AF37]/20">
                <button
                  type="button"
                  onClick={() => setActiveStep2Tab('card')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                    activeStep2Tab === 'card'
                      ? 'bg-[#8C4A52] text-white shadow-sm'
                      : 'text-[#7C7267] hover:text-[#2C2623] hover:bg-white/60'
                  }`}
                >
                  <span>🎴 Single Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep2Tab('scroll')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                    activeStep2Tab === 'scroll'
                      ? 'bg-[#8C4A52] text-white shadow-sm'
                      : 'text-[#7C7267] hover:text-[#2C2623] hover:bg-white/60'
                  }`}
                >
                  <Scroll className="w-3.5 h-3.5" />
                  <span>📜 Scroll Page</span>
                </button>
              </div>

              {activeStep2Tab === 'card' ? (
                <div className="space-y-2.5 sm:space-y-3 mb-6 animate-fade-in">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                    <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                    <span><strong>🎴 Single Interactive Card:</strong> ফ্লোরাল, আর্চ ফ্রেম, রয়েল গোল্ড বর্ডারযুক্ত নিখুঁত আর্কিটেকচারাল ডিজিটাল কার্ড।</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                    <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                    <span><strong>ক্যাটাগরি ফিল্টার:</strong> Wedding, Gaye Holud, Birthday, Reception, Anniversary অনুসারে ফিল্টার করে পছন্দ করুন।</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 sm:space-y-3 mb-6 animate-fade-in">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                    <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                    <span><strong>📜 Interactive Scroll Page:</strong> মোবাইল স্ক্রিনে ওপর থেকে নিচে সম্পূর্ণ স্ক্রোলিং স্টোরি।</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                    <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                    <span><strong>স্টোরি থিমসমূহ:</strong> Haldi Fiesta, Milestone Birthday, Prestige Summit, Velvet Reception, Botanical Garden।</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-[#7C7267] font-serif italic">Studio Tab: Design</span>
              <a href="#step-3" className="text-xs font-bold text-[#8C4A52] hover:underline flex items-center gap-1">
                Next: Event Info <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1 bg-[#FAF8F5] p-4 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-r border-[#D4AF37]/20">
            <div 
              onClick={() => openLightbox(
                activeStep2Tab === 'card' ? "/assets/work-flow/card.jpg" : "/assets/work-flow/scroll.jpg",
                activeStep2Tab === 'card' ? "Single Card Selection" : "Scroll Page Theme Selection",
                activeStep2Tab === 'card' ? "Step 02: Single Card Selection" : "Step 02: Scroll Page Story Selection"
              )}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group bg-white cursor-zoom-in"
              title="Click to view full image"
            >
              <img
                src={activeStep2Tab === 'card' ? "/assets/work-flow/card.jpg" : "/assets/work-flow/scroll.jpg"}
                alt={activeStep2Tab === 'card' ? "Single Card Selection" : "Scroll Page Theme Selection"}
                className="w-full h-auto object-cover group-hover:scale-120 sm:group-hover:scale-125 transition-transform duration-500 ease-out origin-center"
              />
              {/* Hover Zoom Overlay Badge */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-[#D4AF37]/60 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Click to Zoom</span>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-center">
                <span className="text-[11px] text-white font-mono font-bold tracking-wider uppercase">
                  {activeStep2Tab === 'card' ? "Single Card Gallery (Hover to Zoom)" : "Vertical Scroll Story Gallery (Hover to Zoom)"}
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ---------------- STEP 03: ENTER EVENT DETAILS ---------------- */}
        <section id="step-3" className="scroll-mt-24 rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#D4AF37]/30 bg-[#F9F0EC] text-[#2C2623] shadow-soft-surface flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-6xl font-extrabold text-[#8C4A52]/20 font-mono">03</span>
                <span className="px-3 py-1 rounded-full bg-white text-[#8C4A52] text-xs font-bold border border-[#D4AF37]/30 flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5" /> Details &amp; Typography
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                Enter Event Details &amp; Typography
              </h2>
              <p className="text-[#8C4A52] text-xs sm:text-sm font-semibold mb-4">
                ইভেন্ট বিবরণ ও ফন্ট স্টাইল কাস্টমাইজেশন
              </p>

              <p className="text-[#7C7267] font-serif text-sm sm:text-base leading-relaxed mb-6">
                'Info' ট্যাবে গিয়ে আপনার সমস্ত আনুষ্ঠানিক তথ্য টাইপ করুন। আপনি যা টাইপ করবেন, ডানপাশের লাইভ ফোনে সাথে সাথে তার রূপ দেখতে পাবেন।
              </p>

              {/* Step 3 Sub-tabs */}
              <div className="flex gap-2 p-1.5 bg-white rounded-2xl mb-6 border border-[#D4AF37]/30 shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveStep3Tab('info')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    activeStep3Tab === 'info'
                      ? 'bg-[#2C2623] text-white shadow-sm'
                      : 'text-[#7C7267] hover:text-[#2C2623]'
                  }`}
                >
                  📝 Event Info Form
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep3Tab('text')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    activeStep3Tab === 'text'
                      ? 'bg-[#2C2623] text-white shadow-sm'
                      : 'text-[#7C7267] hover:text-[#2C2623]'
                  }`}
                >
                  🎨 Typography &amp; Fonts
                </button>
              </div>

              <div className="space-y-2.5 sm:space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                  <span><strong>বর-কনে ও পিতা-মাতার নাম:</strong> Bride, Groom, Parents এবং হোস্টের নাম সরাসরি বসান।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                  <span><strong>তারিখ, সময় ও গুগল ম্যাপস:</strong> অনুষ্ঠানের সময়সূচী এবং গুগল ম্যাপস (Google Maps) লিংক যুক্ত করুন যাতে অতিথিরা এক ক্লিকেই লোকেশন পান।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                  <span><strong>কাস্টম ফন্ট স্টাইল:</strong> বিভিন্ন রাজকীয় ফন্ট ফ্যামিলি, সাইজ ও কালার সিলেক্ট করুন।</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <span className="text-xs text-[#7C7267] font-serif italic">Studio Tab: Info &amp; Style</span>
              <a href="#step-4" className="text-xs font-bold text-[#8C4A52] hover:underline flex items-center gap-1">
                Next: Upload Photos <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1 bg-white p-4 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-[#D4AF37]/20">
            <div 
              onClick={() => openLightbox(
                activeStep3Tab === 'info' ? "/assets/work-flow/info.jpg" : "/assets/work-flow/text_style.jpg",
                activeStep3Tab === 'info' ? "Event Info Form" : "Typography & Text Styling",
                activeStep3Tab === 'info' ? "Step 03: Event Information Form" : "Step 03: Typography & Text Styling Controls"
              )}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group bg-stone-50 cursor-zoom-in"
              title="Click to view full image"
            >
              <img
                src={activeStep3Tab === 'info' ? "/assets/work-flow/info.jpg" : "/assets/work-flow/text_style.jpg"}
                alt="Event Details and Typography Configuration"
                className="w-full h-auto object-cover group-hover:scale-120 sm:group-hover:scale-125 transition-transform duration-500 ease-out origin-center"
              />
              {/* Hover Zoom Overlay Badge */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-[#D4AF37]/60 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Click to Zoom</span>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-center">
                <span className="text-[11px] text-white font-mono font-bold tracking-wider uppercase">
                  {activeStep3Tab === 'info' ? "Information Editor Form (Hover to Zoom)" : "Typography Controls (Hover to Zoom)"}
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ---------------- STEP 04: UPLOAD PHOTOS & GALLERY ---------------- */}
        <section id="step-4" className="scroll-mt-24 rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#D4AF37]/30 bg-white text-[#2C2623] shadow-soft-surface flex flex-col lg:flex-row-reverse items-stretch">
          <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-6xl font-extrabold text-[#8C4A52]/20 font-mono">04</span>
                <span className="px-3 py-1 rounded-full bg-[#F9F0EC] text-[#8C4A52] text-xs font-bold border border-[#D4AF37]/30 flex items-center gap-1.5">
                  <ImagePlus className="w-3.5 h-3.5" /> Photos &amp; Media
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                Upload Couple Photos &amp; Gallery
              </h2>
              <p className="text-[#8C4A52] text-xs sm:text-sm font-semibold mb-4">
                ছবি ও মেমোরিজ গ্যালারি আপলোড
              </p>

              <p className="text-[#7C7267] font-serif text-sm sm:text-base leading-relaxed mb-6">
                কার্ডের আর্চ ফ্রেম ও স্ক্রোল স্টোরির নির্দিষ্ট গ্যালারি স্লটে আপনার পছন্দের ছবিগুলো আপলোড করুন। ছবি আপলোড সম্পূর্ণ সহজ ও অটো-ফিট।
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                  <span><strong>Bride &amp; Groom Portraits:</strong> বর এবং কনের আলাদা বা কাপল ছবি আপলোড করুন, যা কার্ডের নির্দিষ্ট ফ্রেমে বসে যাবে।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                  <span><strong>Story Moments Gallery:</strong> স্ক্রোল ইনভাইটেশনের ক্ষেত্রে ৪টি পর্যন্ত স্মরণীয় মুহূর্তের ছবি গ্যালারিতে যোগ করতে পারেন।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2623]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C4A52] shrink-0 mt-0.5" />
                  <span><strong>স্মার্ট ক্রপ ও ফিট:</strong> কোনো ক্রপিং জটিলতা ছাড়াই আপনার ছবি অটোম্যাটিক কার্ডের সাথে পারফেক্টলি সাজানো হয়।</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-[#7C7267] font-serif italic">Studio Tab: Info ➔ Photos &amp; Media</span>
              <a href="#step-5" className="text-xs font-bold text-[#8C4A52] hover:underline flex items-center gap-1">
                Next: Duration &amp; Pay <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex-1 bg-[#FAF8F5] p-4 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-r border-[#D4AF37]/20">
            <div 
              onClick={() => openLightbox("/assets/work-flow/info_image.jpg", "Photos and Media Upload Slots in Studio", "Step 04: Photos & Media Upload Slots")}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group bg-white cursor-zoom-in"
              title="Click to view full image"
            >
              <img
                src="/assets/work-flow/info_image.jpg"
                alt="Photos and Media Upload Slots in Studio"
                className="w-full h-auto object-cover group-hover:scale-120 sm:group-hover:scale-125 transition-transform duration-500 ease-out origin-center"
              />
              {/* Hover Zoom Overlay Badge */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-[#D4AF37]/60 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Click to Zoom</span>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-center">
                <span className="text-[11px] text-white font-mono font-bold tracking-wider uppercase">
                  Photos &amp; Media Slots (Hover to Zoom)
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ---------------- STEP 05: CONFIRM DURATION & INSTANT PAY ---------------- */}
        <section id="step-5" className="scroll-mt-24 rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#D4AF37]/40 bg-gradient-to-br from-[#2C2623] via-[#332822] to-[#1A1614] text-white shadow-2xl flex flex-col lg:flex-row items-stretch">
          <div className="flex-1 p-6 sm:p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl sm:text-6xl font-extrabold text-[#D4AF37]/30 font-mono">05</span>
                <span className="px-3 py-1 rounded-full bg-[#8C4A52] text-[#F9F0D0] text-xs font-bold border border-[#D4AF37]/40 flex items-center gap-1.5 shadow-sm">
                  <CreditCard className="w-3.5 h-3.5" /> Duration, Pay &amp; Share
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                Confirm Duration &amp; Get Your Live Link
              </h2>
              <p className="text-[#D4AF37] text-xs sm:text-sm font-semibold mb-4">
                মেয়াদ নির্বাচন, সহজ পেমেন্ট ও ইনস্ট্যান্ট লাইভ লিংক
              </p>

              <p className="text-gray-300 font-serif text-sm sm:text-base leading-relaxed mb-6">
                সম্পূর্ণ ডিজাইন শেষ হলে উপরে থাকা <strong className="text-white">Confirm</strong> বাটনে ক্লিক করে চেকআউট পেজে আসুন। আপনার সুবিধা অনুযায়ী মেয়াদ ও পেমেন্ট সম্পন্ন করুন।
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>নমনীয় মেয়াদ (Duration):</strong> ১৫ দিন (ফ্রি), ১ মাস, ৪৫ দিন, ২ মাস, কিংবা ৩ মাস সিলেক্ট করুন।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>সহজ মোবাইল পেমেন্ট:</strong> bKash, Nagad, অথবা Rocket ওয়ালেটের মাধ্যমে সুরক্ষিতভাবে পেমেন্ট করুন।</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>ইনস্ট্যান্ট লাইভ লিংক ও ওয়ান-ট্যাপ শেয়ার:</strong> পেমেন্ট শেষে তাৎক্ষণিক ইউনিক লিংক পেয়ে যাবেন, যা WhatsApp, Facebook, Messenger বা SMS এ অতিথিদের সাথে শেয়ার করুন।</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#D8CFC4] font-serif italic">Checkout &amp; Publishing</span>
              <Link href="/create" className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1">
                Start Creating Now <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex-1 bg-black/50 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
            <div 
              onClick={() => openLightbox("/assets/work-flow/done.jpg", "Checkout Duration Selection and Payment Gateway", "Step 05: Duration Selection & Instant Payment")}
              className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl group bg-stone-900 cursor-zoom-in"
              title="Click to view full image"
            >
              <img
                src="/assets/work-flow/done.jpg"
                alt="Checkout Duration Selection and Payment Gateway"
                className="w-full h-auto object-cover group-hover:scale-120 sm:group-hover:scale-125 transition-transform duration-500 ease-out origin-center"
              />
              {/* Hover Zoom Overlay Badge */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-[#D4AF37]/60 shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                  <span>Click to Zoom</span>
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-center">
                <span className="text-[11px] text-amber-200 font-mono font-bold tracking-wider uppercase">
                  Checkout &amp; Payment Gateway (Hover to Zoom)
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ---------------- LIGHTBOX MODAL ---------------- */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#1C1917] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#D4AF37]/20 bg-[#2C2623]/80">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
                  {lightbox.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-[#8C4A52] text-white hover:text-white transition-all"
                title="Close (ESC)"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-black/40 flex-1">
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[75vh] w-auto max-w-full rounded-xl border border-white/10 shadow-2xl object-contain select-none"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-white/10 bg-[#2C2623]/80 flex items-center justify-between text-xs text-gray-400 font-mono">
              <span>Press <strong className="text-white">ESC</strong> or click outside to close</span>
              <span className="text-[#D4AF37] font-semibold">উৎসব (Utsab) Interactive Studio</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <section className="py-20 sm:py-24 text-center px-4 sm:px-6 border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#FAF8F5] to-[#F9F0EC] relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8C4A52] text-[#D4AF37] mx-auto flex items-center justify-center mb-6 shadow-elevated-card">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
            Ready to Create Magic?
          </h2>
          <p className="text-[#7C7267] font-serif text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            কোনো খরচ ছাড়াই এডিটরে ঢুকে সম্পূর্ণ ইনভাইটেশন ডিজাইন ও প্রিভিউ করুন। আপনি যখন পুরোপুরি সন্তুষ্ট হবেন, কেবল তখনই লিংকটি পাবলিশ করুন।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/create" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8C4A52] text-white font-bold text-sm sm:text-base shadow-elevated-card hover:bg-[#7a3e45] transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <span>Start Designing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/templates" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#D4AF37]/40 text-[#2C2623] font-bold text-sm sm:text-base shadow-soft-surface hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-2"
            >
              <LayoutTemplate className="w-4 h-4 text-[#8C4A52]" />
              <span>Explore Templates</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
