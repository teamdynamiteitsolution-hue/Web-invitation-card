"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Sparkles, ArrowRight, PlayCircle, ArrowRightCircle } from "lucide-react";
import { Footer } from "@/components/Footer";

const ReactCompareSlider = dynamic(
  () => import('react-compare-slider').then(mod => mod.ReactCompareSlider),
  { ssr: false }
);

const ReactCompareSliderImage = dynamic(
  () => import('react-compare-slider').then(mod => mod.ReactCompareSliderImage),
  { ssr: false }
);

export default function HomeClient({ categories, templates, animations }: { categories: any[], templates: any[], animations: any[] }) {
  const featuredTemplates = templates || [];

  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      
      {/* Hero Section (Original Auto-Scrolling Phone) */}
      <section className="relative w-full flex items-center justify-center pt-24 pb-20 px-6">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FFF9F2] to-[#FAF8F5]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#F9F0EC]/80 text-[#8C4A52] text-xs font-bold tracking-widest uppercase mb-8 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              <span>Premium Invitation Studio</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C2623] mb-6 leading-[1.1]" style={{ fontFamily: 'Cinzel, serif' }}>
              Digital Royal Invitation Collections
            </h1>
            
            <h2 className="text-xl md:text-2xl font-serif text-[#7C7267] mb-8 italic" style={{ fontFamily: 'Playfair Display, serif' }}>
              Traditional Moments • Modern Touch • Digital Forever
            </h2>
            
            <p className="text-base text-[#7C7267] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Transform your most precious life events into immersive digital experiences. Beautifully art-directed, culturally resonant, and highly interactive ceremonial invitations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/create" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] hover:shadow-floating-ceremony transition-all active:scale-95 flex items-center justify-center gap-3">
                <span>Create Your Invitation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/templates" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#D4AF37]/40 text-[#2C2623] font-bold shadow-soft-surface hover:bg-[#F9F0EC] transition-all active:scale-95 flex items-center justify-center gap-3">
                <span>Explore Collections</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none relative perspective-1000">
            {/* Hero Visual Mockup - Auto Scrolling Phone */}
            <div className="relative w-[300px] lg:w-[340px] h-[600px] mx-auto rounded-[40px] bg-white shadow-floating-ceremony border-[8px] border-[#2C2623] overflow-hidden transform rotate-y-[-5deg] rotate-x-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out flex flex-col z-10">
              
              {/* Phone Top Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2C2623] rounded-b-xl z-50"></div>

              {/* Scrolling Content */}
              <div className="w-full h-full overflow-hidden bg-[#FAF8F5] relative">
                <style>{`
                  @keyframes autoScrollMockup {
                    0%, 10% { transform: translateY(0); }
                    40%, 60% { transform: translateY(calc(-100% + 580px)); }
                    90%, 100% { transform: translateY(0); }
                  }
                  .animate-mockup-scroll {
                    animation: autoScrollMockup 15s ease-in-out infinite;
                  }
                `}</style>
                <div className="w-full absolute top-0 left-0 animate-mockup-scroll flex flex-col items-center">
                  
                  {/* Mock Invitation Content */}
                  <div className="w-full h-[300px] relative">
                    <img src="/assets/categories/wedding.webp" alt="Wedding" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center text-white border-2 border-white/50 p-6 rounded-xl backdrop-blur-sm">
                        <div className="text-sm tracking-[0.3em] uppercase mb-2">You are invited</div>
                        <div className="text-4xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>R & A</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full px-6 py-12 bg-white text-center flex flex-col items-center gap-6">
                    <h3 className="text-2xl font-bold text-[#8C4A52]" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>রাহুল ও অঞ্জলি</h3>
                    <p className="text-[#7C7267] font-serif text-sm px-4">
                      Request the honor of your presence to celebrate their wedding ceremony.
                    </p>

                    <div className="w-full bg-[#F9F0EC] p-6 rounded-2xl border border-[#D4AF37]/30 mt-4">
                      <div className="font-bold text-[#2C2623] mb-1">Sunday, 24th October</div>
                      <div className="text-[#7C7267] text-sm">7:00 PM Onwards</div>
                    </div>

                    <div className="w-full bg-[#FAF8F5] p-6 rounded-2xl border border-gray-200">
                      <div className="font-bold text-[#2C2623] mb-1">The Grand Hotel</div>
                      <div className="text-[#7C7267] text-sm">123 Ceremony Avenue, City</div>
                    </div>

                    <button className="w-full py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card mt-4">
                      RSVP Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute top-[20%] -right-12 bg-white p-4 rounded-2xl shadow-elevated-card border border-[#D4AF37]/20 hidden lg:flex items-center gap-3 animate-pulse z-20">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <div className="text-sm font-bold text-[#2C2623]">RSVP Confirmed</div>
                <div className="text-xs text-[#7C7267]">Just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { title: "No App Required", desc: "Guests view instantly on any device via a simple web link.", icon: "🌐" },
          { title: "Instant RSVP", desc: "Track attendees easily with built-in response forms.", icon: "📋" },
          { title: "Culturally Crafted", desc: "Designs honoring South Asian aesthetics and traditions.", icon: "✨" }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-[32px] bg-white shadow-soft-surface border border-[#D4AF37]/10 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#F9F0EC] flex items-center justify-center text-3xl mb-6 group-hover:bg-[#8C4A52] group-hover:text-white transition-colors duration-500">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-[#2C2623] mb-3">{feature.title}</h3>
            <p className="text-[#7C7267] font-serif">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Transformation Section (React Compare Slider) */}
      <section className="py-24 px-6 bg-[#2C2623] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-10 mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              See The Transformation
            </h2>
            <p className="text-gray-300 font-serif text-lg mb-8 italic">
              Slide to see how a boring static image turns into an immersive, premium digital experience. Interactive cards boost RSVP rates by over 40%.
            </p>
            <Link href="/create" className="inline-flex px-8 py-4 rounded-full bg-[#D4AF37] text-[#2C2623] font-bold hover:bg-[#c09d2f] transition-colors gap-3 items-center">
              Try It Yourself <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex-1 w-full flex justify-center perspective-1000">
            <div className="relative w-full max-w-[340px] aspect-[9/19] rounded-[40px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-gray-800 overflow-hidden transform rotate-y-[-5deg] rotate-x-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-50"></div>
               
               <ReactCompareSlider
                  className="w-full h-full"
                  itemOne={<ReactCompareSliderImage src="/assets/categories/wedding.webp" alt="Boring Static Card" className="object-cover w-full h-full filter grayscale contrast-75 brightness-75" />}
                   itemTwo={
                     <div className="w-full h-full relative overflow-hidden bg-[#1F1915] text-[#FAF6F0] flex flex-col justify-between p-5 select-none">
                       {/* Background Texture & Royal Glow */}
                       <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-20 mix-blend-overlay" />
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent pointer-events-none" />
                       
                       {/* Gold Filigree Double Border */}
                       <div className="absolute inset-3 border-2 border-[#D4AF37]/60 rounded-[28px] pointer-events-none" />
                       <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-[24px] pointer-events-none" />
                       
                       {/* Corner Ornaments */}
                       <div className="absolute top-5 left-5 text-[#D4AF37] text-xs select-none">❖</div>
                       <div className="absolute top-5 right-5 text-[#D4AF37] text-xs select-none">❖</div>
                       <div className="absolute bottom-5 left-5 text-[#D4AF37] text-xs select-none">❖</div>
                       <div className="absolute bottom-5 right-5 text-[#D4AF37] text-xs select-none">❖</div>

                       {/* Top Monogram */}
                       <div className="relative z-10 pt-4 flex flex-col items-center">
                         <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#8C4A52] via-[#D4AF37] to-[#8C4A52] shadow-md mb-2">
                           <div className="w-full h-full rounded-full bg-[#1F1915] border border-[#D4AF37] flex items-center justify-center">
                             <span className="font-serif text-xs font-bold text-[#D4AF37] tracking-widest">J • L</span>
                           </div>
                         </div>
                         <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                           The Wedding Of
                         </span>
                       </div>

                       {/* Center Couple Names & Details */}
                       <div className="relative z-10 text-center my-auto py-2">
                         <h3 className="text-xl font-bold text-white tracking-wide leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                           John
                         </h3>
                         <div className="flex items-center justify-center gap-2 my-1">
                           <span className="w-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                           <span className="text-sm italic text-[#D4AF37] font-serif">&amp;</span>
                           <span className="w-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                         </div>
                         <h3 className="text-xl font-bold text-white tracking-wide leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                           Lary
                         </h3>

                         <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-sm">
                           <span className="text-[9px] font-bold text-[#D4AF37] tracking-wider uppercase">Saturday, 14 June</span>
                         </div>
                       </div>

                       {/* Bottom Venue & Interactive Badge */}
                       <div className="relative z-10 pb-3 flex flex-col items-center text-center">
                         <p className="text-[9px] text-stone-300 font-serif max-w-[200px] mb-2 truncate">
                           The Royal Palace Grand Ballroom
                         </p>
                         <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#8C4A52] to-[#70353C] text-white px-3.5 py-1.5 rounded-full border border-[#D4AF37] shadow-lg text-[9px] font-bold tracking-wider uppercase animate-pulse">
                           <Sparkles className="w-3 h-3 text-amber-200" />
                           <span>Interactive Experience</span>
                         </div>
                       </div>
                     </div>
                   }
               />
               <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none z-50">
                  <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full tracking-[0.2em] uppercase shadow-lg border border-white/20">
                    Drag to Transform
                  </span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Themes Section */}
      <section className="py-24 px-6 bg-[#FAF8F5] relative">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-white text-[#8C4A52] text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Beautiful Themes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C2623] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Beautiful Themes
            </h2>
            <p className="text-[#8C4A52] font-semibold text-sm uppercase tracking-widest mb-2">
              Choose from our curated collection
            </p>
            <p className="text-[#D4AF37] font-serif text-sm max-w-2xl mx-auto">
              Mix and match features across any theme — nothing is locked to one design. Put any text you want on it and create your own unique animated envelope inside the dashboard.
            </p>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-6 hide-scrollbar px-4 snap-x snap-mandatory">
            {featuredTemplates.map((template) => (
              <div key={template.id} className="min-w-[280px] sm:min-w-[320px] bg-white rounded-[24px] overflow-hidden shadow-soft-surface snap-center flex flex-col border border-gray-100">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {template.isFeatured && (
                    <div className="absolute top-4 left-4 z-10 bg-[#D4AF37]/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </div>
                  )}
                  <img src={template.previewImageUrl} alt={template.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-[#2C2623] text-lg mb-1">{template.name}</h3>
                    <p className="text-gray-500 text-sm font-serif">{template.description}</p>
                  </div>
                  <Link href={`/templates/${template.slug}`} className="mt-4 flex items-center justify-end gap-1 text-[#D4AF37] text-xs font-bold hover:text-[#8C4A52] transition-colors">
                    Example Invite <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Custom Photo Upload Card */}
            <div className="min-w-[280px] sm:min-w-[320px] bg-[#FAF8F5] rounded-[24px] shadow-inner border border-dashed border-[#D4AF37]/50 snap-center flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-white transition-colors">
              <h3 className="font-bold text-[#2C2623] text-xl mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Your Photo</h3>
              <p className="text-gray-500 font-serif italic mb-6">Upload any image or video</p>
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Experiences Showcase */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C2623] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Choose How Your Invitation Opens
            </h2>
            <p className="text-[#7C7267] font-serif text-lg max-w-2xl mx-auto">
              Cinematic opening experiences that make a lasting first impression.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {animations?.filter((a: any) => a.interactionType === 'video').map((anim: any) => (
              <div 
                key={anim.id} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    if (video.paused) {
                      video.muted = false;
                      video.play();
                      e.currentTarget.classList.add('playing');
                    } else {
                      video.pause();
                      e.currentTarget.classList.remove('playing');
                    }
                  }
                }}
              >
                <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-floating-ceremony border-4 border-gray-100 mb-6 bg-gray-50">
                  <video 
                    src={anim.videoUrl} 
                    poster={anim.previewPosterUrl}
                    className="w-full h-full object-cover pointer-events-none" 
                    playsInline 
                    muted 
                    onMouseEnter={(e) => { e.currentTarget.play(); e.currentTarget.muted = false; e.currentTarget.closest('.group')?.classList.add('playing'); }} 
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; e.currentTarget.muted = true; e.currentTarget.closest('.group')?.classList.remove('playing'); }}
                    onEnded={(e) => { e.currentTarget.closest('.group')?.classList.remove('playing'); e.currentTarget.currentTime = 0; }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent group-[.playing]:hidden transition-colors duration-500 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#8C4A52] shadow-xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2C2623]">{anim.name}</h3>
                <p className="text-[#7C7267] font-serif text-sm mt-2 text-center px-4">{anim.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Why Go Digital Section */}
      <section className="py-24 px-6 bg-[#FAF8F5] relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-white text-[#8C4A52] text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Paper vs Digital</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
              Why go digital?
            </h2>
            <p className="text-[#7C7267] font-serif text-lg max-w-2xl mx-auto mb-10">
              Save money, time, and the planet — while giving your guests a stunning interactive experience they'll actually love.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#D4AF37]/20 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4AF37]/20">
                  <th className="p-6 text-gray-500 font-serif font-normal">Feature</th>
                  <th className="p-6 text-gray-500 font-bold text-center border-l border-r border-[#D4AF37]/10 bg-gray-50/50">📄 Paper Invitation</th>
                  <th className="p-6 text-[#D4AF37] font-bold text-center bg-[#FAF8F5]">✨ Utsab Digital</th>
                </tr>
              </thead>
              <tbody className="text-sm font-serif">
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Cost</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> ৳10,000 - ৳50,000+
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> From ৳500 one-time
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Time to create</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> 4 - 8 weeks
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> Ready in minutes
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Guest tracking & RSVP</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> Manual spreadsheets
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> Automatic dashboard
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Languages</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> One per set
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> Multiple languages
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Updates & changes</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> Reprint everything
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> Update in real-time
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Delivery</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> Postal service / Hand Delivery
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> Instant via link
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Mobile friendly</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> N/A
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> Perfect on any device
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-gray-700 font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> Eco-friendly</td>
                  <td className="p-6 text-gray-500 text-center border-l border-r border-gray-100 bg-gray-50/50">
                    <span className="text-red-400 mr-2">✕</span> Paper & ink waste
                  </td>
                  <td className="p-6 text-green-700 text-center font-bold bg-[#FAF8F5]">
                    <span className="text-green-500 mr-2">✓</span> 100% digital & green
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-8 text-gray-500 text-sm font-serif">
            Save up to <strong className="text-gray-800">৳25,000+</strong> compared to traditional paper invitations
          </div>
        </div>
      </section>

      {/* Complete Control Section */}
      <section className="py-24 px-6 bg-[#FAF8F5] relative text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-white text-[#D4AF37] text-xs font-bold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Your Personal Design Studio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
            You're In Complete Control
          </h2>
          <p className="text-[#7C7267] font-serif text-lg mb-8">
            No designers or developers needed. Your personal dashboard lets you customize everything yourself — add your details, choose your style, and update anytime.
          </p>
          <p className="text-[#D4AF37] font-serif italic mb-10">
            So easy to use, even your grandmother could create the perfect invitation! 👵✨
          </p>
          <Link href="/create" className="inline-flex items-center gap-2 bg-[#c6a246] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#b08d38] transition-colors">
            Discover how the dashboard works &rarr;
          </Link>
        </div>
      </section>

      {/* Pre-footer CTA Banner (Updated to match Gold design) */}
      <section className="py-24 px-6 bg-[#FAF8F5] relative overflow-hidden text-center flex justify-center">
        <div className="bg-gradient-to-br from-[#d4bc72] to-[#b39542] rounded-[32px] p-12 md:p-16 max-w-4xl w-full text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold mb-6 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              <span>Sale — Was ৳2000, Now only ৳1000</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-white/90 font-serif text-lg mb-10">
              Join hundreds of happy couples who chose our invitations
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/create" className="inline-flex px-8 py-4 rounded-xl bg-[#FAF8F5] text-[#b39542] font-bold text-lg hover:scale-105 transition-all shadow-lg items-center gap-2">
                <Sparkles className="w-5 h-5" /> Get VIP Access — ৳1000 &rarr;
              </Link>
              <Link href="#pricing" className="inline-flex px-8 py-4 text-white font-bold text-lg hover:underline transition-all items-center gap-2">
                <Sparkles className="w-5 h-5" /> Compare Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C2623] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              How It Works
            </h2>
            <p className="text-[#7C7267] font-serif italic text-lg max-w-2xl mx-auto">
              Create your dream interactive invitation in 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent -z-10" />
            
            {[
              { step: "01", title: "Select a Template", desc: "Browse our premium curated collections and pick a design that matches your aesthetic." },
              { step: "02", title: "Customize Details", desc: "Easily input your names, dates, venues, and custom RSVP details." },
              { step: "03", title: "Share Instantly", desc: "Get a live digital link to share with your guests via WhatsApp or Email." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#FAF8F5] border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-[#D4AF37] mb-6 relative z-10" style={{ fontFamily: 'Cinzel, serif' }}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-[#2C2623] mb-4">{item.title}</h3>
                <p className="text-[#7C7267] font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#1A1614] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-10 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
              Loved By Couples
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative">
              <div className="text-[#D4AF37] text-6xl font-serif absolute top-4 left-6 opacity-30">"</div>
              <p className="text-gray-300 font-serif italic text-lg leading-relaxed mb-6 relative z-10 pt-4">
                "We wanted something unique for our wedding, and Utsab delivered beyond our expectations. The interactive wax seal blew our guests' minds!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8C4A52] flex items-center justify-center text-white font-bold">R&A</div>
                <div>
                  <div className="text-white font-bold">Rahul & Anjali</div>
                  <div className="text-[#D4AF37] text-sm font-serif">Dhaka, Bangladesh</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl relative">
              <div className="text-[#D4AF37] text-6xl font-serif absolute top-4 left-6 opacity-30">"</div>
              <p className="text-gray-300 font-serif italic text-lg leading-relaxed mb-6 relative z-10 pt-4">
                "The 'Drag to Transform' feature was so cool. The support team was amazing, and we got our RSVP list organized instantly. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1614] font-bold">S&M</div>
                <div>
                  <div className="text-white font-bold">Samiul & Marium</div>
                  <div className="text-[#D4AF37] text-sm font-serif">Sylhet, Bangladesh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
