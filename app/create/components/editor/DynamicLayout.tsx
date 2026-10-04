import React from 'react';
import { Sparkles } from 'lucide-react';
import { getPresetStyle } from '@/lib/typography-presets';

interface DynamicLayoutProps {
  layoutPresetId: string;
  eventData: any;
  typographyStyles: Record<string, string>;
}

// Generate dynamic monogram / initials
export const getMonogram = (brideName: string = '', groomName: string = '', format: 'slash' | 'bar' | 'circle' = 'slash') => {
  const bInitial = (brideName.trim().charAt(0) || 'A').toUpperCase();
  const gInitial = (groomName.trim().charAt(0) || 'S').toUpperCase();
  
  if (format === 'bar') {
    return `${gInitial} | ${bInitial}`;
  }
  if (format === 'circle') {
    return `${gInitial} & ${bInitial}`;
  }
  return `${gInitial} / ${bInitial}`;
};

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({ 
  layoutPresetId, 
  eventData, 
  typographyStyles 
}) => {
  const {
    category = "wedding",
    personName = "",
    turningAge = "",
    brideName = "Lary",
    groomName = "John",
    date = "Saturday, 14 June 2027",
    time = "7:00 PM",
    venue = "The Royal Palace",
    venueAddress = "Dhaka, Bangladesh",
    eventLabel = "The Wedding of",
    couplePhoto = "/assets/categories/wedding.webp",
    groomPhoto = "/assets/categories/wedding.webp",
    bridePhoto = "/assets/categories/wedding.webp",
    invitationMessage = "",
    showInvitationMessage = false
  } = eventData || {};

  const isSinglePerson = category === 'birthday' || category === 'party' || (!groomName && (personName || brideName));
  const displayName = category === 'birthday' ? (personName || brideName || "Aaryan") : (brideName || "Lary");
  const subLabel = category === 'birthday' ? (turningAge || "Birthday Celebration") : "";

  const getStyle = (nodeId: string, defaultFont: string = 'Cinzel, serif') => {
    return typographyStyles[nodeId] ? getPresetStyle(typographyStyles[nodeId]) : { fontFamily: defaultFont };
  };

  const brideStyle = getStyle('brideName', 'Playfair Display, serif');
  const groomStyle = getStyle('groomName', 'Playfair Display, serif');
  const headingStyle = getStyle('primaryHeading', 'Cinzel, serif');

  // -------------------------------------------------------------
  // 01. CLASSIC EDITORIAL
  // Elegant centered composition with clean framing, names,
  // optional center message quote, and architectural base.
  // -------------------------------------------------------------
  if (layoutPresetId === 'classic_editorial' || layoutPresetId === 'classic_center') {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-3 select-none max-h-[94%]">
        {/* Top Spacer / Subtle Divider */}
        <div className="reveal-item w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-2 mb-1" />

        {/* Center: Names & Event Label */}
        <div className="flex flex-col items-center my-auto space-y-2">
          <span 
            className="reveal-item text-[10px] uppercase tracking-[0.25em] text-[#7C7267] font-semibold"
            style={headingStyle as any}
          >
            {eventLabel || (category === 'birthday' ? "Happy Birthday" : "The Wedding Of")}
          </span>

          {isSinglePerson ? (
            <div className="flex flex-col items-center space-y-1.5 my-1">
              <h1 
                className="reveal-item text-3xl sm:text-4xl font-bold text-[#2C2623] tracking-wide"
                style={brideStyle as any}
              >
                {displayName}
              </h1>
              {subLabel && (
                <div className="reveal-item flex items-center gap-2 text-[#8C4A52] font-serif text-sm font-semibold tracking-wider uppercase mt-1">
                  <span className="w-5 h-px bg-[#D4AF37]/50"></span>
                  <span>{subLabel}</span>
                  <span className="w-5 h-px bg-[#D4AF37]/50"></span>
                </div>
              )}
            </div>
          ) : (
            <>
              <h1 
                className="reveal-item text-2xl sm:text-3xl font-bold text-[#2C2623] tracking-wide"
                style={brideStyle as any}
              >
                {brideName}
              </h1>

              <div className="reveal-item flex items-center gap-2 text-[#B8860B] font-serif italic text-base my-0.5">
                <span className="w-6 h-px bg-[#D4AF37]/40"></span>
                <span>&amp;</span>
                <span className="w-6 h-px bg-[#D4AF37]/40"></span>
              </div>

              <h2 
                className="reveal-item text-2xl sm:text-3xl font-bold text-[#2C2623] tracking-wide"
                style={groomStyle as any}
              >
                {groomName}
              </h2>
            </>
          )}

          {/* Optional Middle Message / Wishes Quote */}
          {showInvitationMessage && invitationMessage && (
            <div className="reveal-item max-w-[270px] my-2 px-3 py-1.5 text-center">
              <p className="font-serif italic text-xs sm:text-[13px] text-[#5C5248] leading-relaxed line-clamp-3">
                &ldquo;{invitationMessage}&rdquo;
              </p>
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto mt-1.5" />
            </div>
          )}
        </div>

        {/* Bottom Details & Architectural Illustration */}
        <div className="flex flex-col items-center space-y-1 mb-1">
          <div className="reveal-item text-[#8C4A52] text-[11px] uppercase tracking-[0.2em] font-semibold">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] tracking-widest uppercase">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
          {/* Subtle architectural silhouette */}
          <div className="reveal-item pt-1 opacity-60">
            <svg className="w-20 h-6 text-[#A89F91]" viewBox="0 0 100 30" fill="currentColor">
              <path d="M50 2 L54 10 L58 10 L58 28 L42 28 L42 10 L46 10 Z M38 12 L34 16 L34 28 L38 28 Z M62 12 L66 16 L66 28 L62 28 Z M26 18 L22 22 L22 28 L26 28 Z M74 18 L78 22 L78 28 L74 28 Z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 02. ARCH PORTRAIT
  // Romantic composition featuring a couple photo masked inside an architectural arch
  // with floral accents and romantic typography underneath.
  // -------------------------------------------------------------
  if (layoutPresetId === 'arch_portrait' || layoutPresetId === 'image_focus') {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-3 max-h-[92%] select-none">
        {/* Top: Arched Image Frame */}
        <div className="reveal-item w-full max-w-[170px] aspect-[4/5] relative mt-1 group">
          {/* Arch Container with Rounded Top Border */}
          <div className="w-full h-full rounded-t-[85px] rounded-b-xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-lg relative bg-stone-100">
            <img 
              src={couplePhoto || "/assets/categories/wedding.webp"} 
              alt="Couple Arch Portrait" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle inner shadow / tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* Arch outline embellishment */}
          <div className="absolute -inset-1 rounded-t-[90px] rounded-b-2xl border border-[#D4AF37]/30 pointer-events-none" />
        </div>

        {/* Bottom: Typography Section */}
        <div className="flex flex-col items-center space-y-1 mt-2 mb-1">
          <span className="reveal-item text-[9px] uppercase tracking-[0.25em] text-[#8C4A52] font-semibold">
            {eventLabel || "The Wedding Of"}
          </span>

          <h1 
            className="reveal-item text-2xl font-bold text-[#2C2623]" 
            style={brideStyle as any}
          >
            {brideName}
          </h1>

          <div className="reveal-item text-base font-serif italic text-[#D4AF37] leading-none my-0.5">&amp;</div>

          <h2 
            className="reveal-item text-2xl font-bold text-[#2C2623]" 
            style={groomStyle as any}
          >
            {groomName}
          </h2>

          <div className="reveal-item pt-1.5 text-[11px] uppercase tracking-widest text-[#7C7267] font-medium border-t border-[#D4AF37]/30 w-36 mx-auto mt-1">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] tracking-wider uppercase">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 03. BOTANICAL LUXURY
  // Circular monogram medallion, floral framing, optional portrait area,
  // and heritage palace illustration.
  // -------------------------------------------------------------
  if (layoutPresetId === 'botanical_luxury') {
    const initials = getMonogram(brideName, groomName, 'slash');

    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-4 max-h-[90%]">
        {/* Monogram or Optional Image */}
        <div className="reveal-item flex flex-col items-center mt-1">
          <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center relative p-0.5 shadow-sm bg-white/80 backdrop-blur-xs">
            <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/70 flex items-center justify-center">
              <span className="font-serif text-sm tracking-widest text-[#8C4A52] font-semibold">
                {initials}
              </span>
            </div>
            {/* Laurel wreath leaves SVG */}
            <svg className="absolute -inset-2 w-[72px] h-[72px] text-[#A88B4D] pointer-events-none opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            </svg>
          </div>

          <span className="text-[9px] uppercase tracking-[0.2em] text-[#7C7267] font-semibold mt-2.5">
            Together With Their Families
          </span>
        </div>

        {/* Center Names */}
        <div className="flex flex-col items-center space-y-1.5 my-auto">
          <h1 
            className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] italic font-normal tracking-wide" 
            style={brideStyle as any}
          >
            {brideName}
          </h1>
          <span className="reveal-item text-base font-serif italic text-[#B8860B] leading-none">&amp;</span>
          <h2 
            className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] italic font-normal tracking-wide" 
            style={groomStyle as any}
          >
            {groomName}
          </h2>
        </div>

        {/* Bottom Details & Palace Motif */}
        <div className="flex flex-col items-center space-y-1 mb-1">
          <div className="reveal-item text-[11px] uppercase tracking-[0.2em] text-[#2C2623] font-semibold">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] uppercase tracking-wider">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
          {/* Subtle Taj / Palace silhouette */}
          <div className="reveal-item pt-1 opacity-50">
            <svg className="w-20 h-7 text-[#A89F91]" viewBox="0 0 120 40" fill="currentColor">
              <path d="M60 4 C58 10 54 14 54 18 L66 18 C66 14 62 10 60 4 Z M52 20 L68 20 L68 38 L52 38 Z M40 16 L46 20 L46 38 L40 38 Z M74 16 L80 20 L80 38 L74 38 Z M30 24 L34 26 L34 38 L30 38 Z M86 24 L90 26 L90 38 L86 38 Z M20 10 L22 10 L22 38 L20 38 Z M98 10 L100 10 L100 38 L98 38 Z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 04. SPLIT COUPLE
  // Visual separation with Groom photo/name on the left, Bride photo/name
  // on the right, "&" in the center, and wedding date below.
  // -------------------------------------------------------------
  if (layoutPresetId === 'split_couple_portraits' || layoutPresetId === 'split_couple') {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-3 py-3 max-h-[92%] select-none">
        <div className="reveal-item text-[9px] uppercase tracking-[0.25em] text-[#8C4A52] font-semibold mt-0.5">
          {eventLabel || "The Wedding Of"}
        </div>

        {/* Side-by-side Dual Arches */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-[270px] my-auto">
          {/* Groom Card */}
          <div className="reveal-item flex flex-col items-center">
            <div className="w-full aspect-[4/5] rounded-t-[50px] rounded-b-lg overflow-hidden border-2 border-[#D4AF37] shadow-md relative bg-stone-100 mb-1.5 group">
              <img 
                src={groomPhoto || "/assets/categories/wedding.webp"} 
                alt="Groom Portrait" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-t-[48px] rounded-b-md pointer-events-none" />
            </div>
            <span className="text-[8px] uppercase tracking-widest text-[#7C7267] font-semibold">Groom</span>
            <h3 className="text-base font-bold text-[#2C2623] tracking-wide mt-0.5 truncate max-w-full" style={groomStyle as any}>
              {groomName}
            </h3>
          </div>

          {/* Bride Card */}
          <div className="reveal-item flex flex-col items-center">
            <div className="w-full aspect-[4/5] rounded-t-[50px] rounded-b-lg overflow-hidden border-2 border-[#D4AF37] shadow-md relative bg-stone-100 mb-1.5 group">
              <img 
                src={bridePhoto || "/assets/categories/wedding.webp"} 
                alt="Bride Portrait" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-t-[48px] rounded-b-md pointer-events-none" />
            </div>
            <span className="text-[8px] uppercase tracking-widest text-[#7C7267] font-semibold">Bride</span>
            <h3 className="text-base font-bold text-[#2C2623] tracking-wide mt-0.5 truncate max-w-full" style={brideStyle as any}>
              {brideName}
            </h3>
          </div>
        </div>

        {/* Center Connector & Date */}
        <div className="flex flex-col items-center space-y-1 mb-1">
          <div className="reveal-item flex items-center gap-2 text-base font-serif italic text-[#B8860B]">
            <span className="w-8 h-px bg-[#D4AF37]/40"></span>
            <span>&amp;</span>
            <span className="w-8 h-px bg-[#D4AF37]/40"></span>
          </div>
          <div className="reveal-item text-[11px] uppercase tracking-[0.2em] text-[#2C2623] font-bold">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] tracking-wider uppercase">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 05. MINIMAL LUXURY
  // Clean minimal design, generous whitespace, thin border,
  // top monogram ("S | A"), and pristine editorial typography.
  // -------------------------------------------------------------
  if (layoutPresetId === 'minimal_luxury') {
    const monogram = getMonogram(brideName, groomName, 'bar');

    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-4 select-none max-h-[90%]">
        {/* Top Monogram */}
        <div className="reveal-item flex flex-col items-center mt-1">
          <div className="text-xl font-serif tracking-[0.3em] text-[#2C2623] font-light">
            {monogram}
          </div>
          <div className="w-6 h-px bg-[#2C2623]/30 mt-2"></div>
        </div>

        {/* Centered Names with Generous Spacing */}
        <div className="flex flex-col items-center my-auto space-y-2">
          <span className="reveal-item text-[9px] uppercase tracking-[0.3em] text-[#7C7267] font-sans font-light">
            {eventLabel || "The Wedding Of"}
          </span>

          <h1 
            className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] font-light tracking-wide" 
            style={brideStyle as any}
          >
            {brideName}
          </h1>

          <div className="reveal-item text-base font-serif italic text-[#7C7267] font-light">&amp;</div>

          <h2 
            className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] font-light tracking-wide" 
            style={groomStyle as any}
          >
            {groomName}
          </h2>
        </div>

        {/* Date in minimal dot format */}
        <div className="flex flex-col items-center space-y-0.5 mb-1">
          <div className="reveal-item text-[11px] tracking-[0.3em] text-[#2C2623] font-sans font-light uppercase">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] tracking-[0.2em] font-sans uppercase">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 06. CINEMATIC SCENE
  // Regal arch portrait, warm atmospheric golden glow,
  // and dramatic royal title typography.
  // -------------------------------------------------------------
  if (layoutPresetId === 'cinematic_scene') {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-3 max-h-[94%] select-none">
        {/* Top Header Motif */}
        <div className="reveal-item flex flex-col items-center mt-1">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center mb-1 bg-white/80 shadow-xs backdrop-blur-xs">
            <Sparkles className="w-5 h-5 text-[#8C4A52]" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C4A52] font-semibold">
            {eventLabel || "Our Love Story"}
          </span>
        </div>

        {/* Center Grand Arched Portrait */}
        <div className="reveal-item w-full max-w-[180px] aspect-[4/5] relative my-1 group">
          <div className="w-full h-full rounded-t-[90px] rounded-b-xl overflow-hidden border-2 border-[#D4AF37] shadow-lg relative bg-stone-100">
            <img 
              src={couplePhoto || "/assets/categories/wedding.webp"} 
              alt="Cinematic Portrait" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="absolute -inset-1 rounded-t-[95px] rounded-b-2xl border border-[#D4AF37]/40 pointer-events-none" />
        </div>

        {/* Bottom Cinematic Typography */}
        <div className="flex flex-col items-center space-y-1 mb-1">
          <h1 
            className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] tracking-wide font-bold" 
            style={brideStyle as any}
          >
            {brideName}
          </h1>
          <div className="reveal-item text-base font-serif italic text-[#B8860B] leading-none my-0.5">&amp;</div>
          <h2 
            className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] tracking-wide font-bold" 
            style={groomStyle as any}
          >
            {groomName}
          </h2>

          <div className="reveal-item pt-1 text-[11px] uppercase tracking-[0.25em] text-[#7C7267] font-semibold border-t border-[#D4AF37]/30 w-36 mx-auto">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] uppercase tracking-wider">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 08. OVAL HORIZONTAL (Horizontal Ellipse / Pill Framed Portrait)
  // Luxury wide curved oval portrait frame with golden rim,
  // floral embellishment, and regal typography.
  // -------------------------------------------------------------
  if (layoutPresetId === 'oval_horizontal' || layoutPresetId === 'horizontal_ellipse') {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-3 max-h-[94%] select-none">
        {/* Top Header */}
        <div className="reveal-item flex flex-col items-center mt-1">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C4A52] font-semibold">
            {eventLabel || "The Wedding Of"}
          </span>
        </div>

        {/* Center: Wide Horizontal Oval Photo Frame */}
        <div className="reveal-item w-full max-w-[210px] aspect-[16/10] relative my-1 group">
          <div className="w-full h-full rounded-[60px] overflow-hidden border-2 border-[#D4AF37] shadow-xl relative bg-stone-100">
            <img 
              src={couplePhoto || "/assets/categories/wedding.webp"} 
              alt="Couple Portrait" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
          {/* Outer ornamental gold ring */}
          <div className="absolute -inset-1 rounded-[64px] border border-[#D4AF37]/40 pointer-events-none" />
        </div>

        {/* Bottom Names & Details */}
        <div className="flex flex-col items-center space-y-1 mb-1">
          <h1 
            className="reveal-item text-2xl font-bold text-[#2C2623] tracking-wide" 
            style={brideStyle as any}
          >
            {brideName}
          </h1>
          <div className="reveal-item text-base font-serif italic text-[#B8860B] leading-none my-0.5">&amp;</div>
          <h2 
            className="reveal-item text-2xl font-bold text-[#2C2623] tracking-wide" 
            style={groomStyle as any}
          >
            {groomName}
          </h2>

          <div className="reveal-item pt-1.5 text-[11px] uppercase tracking-widest text-[#7C7267] font-semibold border-t border-[#D4AF37]/30 w-36 mx-auto mt-1">
            {date}{time ? ` • ${time}` : ''}
          </div>
          {venue && (
            <div className="reveal-item text-[9px] text-[#7C7267] uppercase tracking-wider">
              {venue}{venueAddress ? ` • ${venueAddress}` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 07. ROMANTIC CENTER
  // Soft botanical frame, cursive script headings, centered names & date.
  // -------------------------------------------------------------
  return (
    <div className="flex flex-col items-center justify-between w-full h-full text-center relative z-10 px-4 py-4 select-none max-h-[90%]">
      {/* Top Header */}
      <div className="reveal-item flex flex-col items-center mt-1">
        <span 
          className="text-[10px] uppercase tracking-[0.25em] text-[#8C4A52] font-semibold"
          style={headingStyle as any}
        >
          You Are Invited
        </span>
        <div className="w-10 h-px bg-[#D4AF37]/50 mt-1.5"></div>
      </div>

      {/* Centered Romantic Names */}
      <div className="flex flex-col items-center my-auto space-y-2">
        <h1 
          className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] italic tracking-wide" 
          style={brideStyle as any}
        >
          {brideName}
        </h1>

        <div className="reveal-item text-lg font-serif italic text-[#B8860B] leading-none my-0.5">&amp;</div>

        <h2 
          className="reveal-item text-2xl sm:text-3xl font-serif text-[#2C2623] italic tracking-wide" 
          style={groomStyle as any}
        >
          {groomName}
        </h2>
      </div>

      {/* Bottom Date & Venue */}
      <div className="flex flex-col items-center space-y-0.5 mb-1">
        <div className="reveal-item text-[11px] uppercase tracking-[0.25em] text-[#7C7267] font-semibold">
          {date}{time ? ` • ${time}` : ''}
        </div>
        {venue && (
          <div className="reveal-item text-[9px] uppercase tracking-wider text-[#A89F91]">
            {venue}{venueAddress ? ` • ${venueAddress}` : ''}
          </div>
        )}
      </div>
    </div>
  );
};
