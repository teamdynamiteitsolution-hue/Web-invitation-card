"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
} from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

interface CinematicStoryScrollProps {
  template?: any;
  animation?: any;
  eventData: any;
  revealMode?: string;
  customImage?: string;
  bgBlur?: boolean;
  skipAnimation?: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85";

function imageOrFallback(value?: string) {
  return value || FALLBACK_IMAGE;
}

function formatDate(date?: string) {
  if (!date) return { day: "—", month: "DATE", year: "—", full: "Your special day" };

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return { day: date, month: "", year: "", full: date };
  }

  return {
    day: String(parsed.getDate()).padStart(2, "0"),
    month: parsed.toLocaleDateString("en-US", { month: "long" }).toUpperCase(),
    year: String(parsed.getFullYear()),
    full: parsed.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 800ms ease ${delay}ms, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function CinematicStoryScroll({
  template,
  animation,
  eventData,
  skipAnimation = false,
}: CinematicStoryScrollProps) {
  const [muted, setMuted] = useState(true);
  const data = eventData || {};

  const brideName = data.brideName || "Bride";
  const groomName = data.groomName || "Groom";
  const eventLabel = data.eventLabel || data.category || "A Story Of Two";
  const date = formatDate(data.date);
  const venue = data.venueName || data.venue || "The Celebration Venue";
  const address = data.venueAddress || "";
  const time = data.time || "";
  const message =
    data.invitationMessage ||
    "Two lives, one story, and a beautiful beginning we would love to share with you.";

  const typographyStyles = data.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : {};
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : {};
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : {};

  const heroPhoto = imageOrFallback(data.couplePhoto || data.bridePhoto || data.groomPhoto || data.customImage);
  const bridePhoto = imageOrFallback(data.bridePhoto || data.couplePhoto || data.customImage);
  const groomPhoto = imageOrFallback(data.groomPhoto || data.couplePhoto || data.customImage);

  const gallery1 = imageOrFallback(data.gallery1 || bridePhoto);
  const gallery2 = imageOrFallback(data.gallery2 || groomPhoto);
  const gallery3 = imageOrFallback(data.gallery3 || heroPhoto);
  const gallery4 = imageOrFallback(data.gallery4 || FALLBACK_IMAGE);
  const images = [gallery1, gallery2, gallery3, gallery4];

  const mapsUrl =
    data.googleMapsUrl ||
    data.mapsUrl ||
    (venue
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${venue} ${address}`
        )}`
      : "");

  const initials = useMemo(
    () => `${brideName.charAt(0)}${groomName.charAt(0)}`.toUpperCase(),
    [brideName, groomName]
  );

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#11100e] text-[#eee8dc]"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Top Floating Bar */}
      <header className="sticky top-3 inset-x-3 z-40 px-3 flex items-center justify-between pointer-events-none -mb-10">
        <div className="bg-[#11100e]/90 backdrop-blur-md border border-[#514d46] px-3.5 py-1 rounded-full shadow-lg pointer-events-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5b69a] animate-ping" />
          <span 
            className="text-[9px] uppercase tracking-[0.25em] text-[#c5b69a] font-medium"
            style={headingStyle}
          >
            {eventLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          className="pointer-events-auto flex items-center gap-1.5 bg-[#11100e]/90 backdrop-blur-md border border-[#514d46] px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] text-[#d8d0c2] hover:bg-white/10 transition-all shadow-lg"
        >
          {muted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-[#c5b69a]" />}
          <span>{muted ? "Mute" : "Music"}</span>
        </button>
      </header>

      {/* HERO: oversized editorial cover */}
      <section className="relative min-h-[96svh] overflow-hidden px-5 pb-12 pt-14 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(126,98,66,.22),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,.05),transparent_28%)] pointer-events-none" />

        <div className="relative z-10 mx-auto flex min-h-[calc(90svh-60px)] max-w-5xl items-center">
          <div className="relative w-full">
            <div className="relative z-20 max-w-[85%] sm:max-w-[70%]">
              <p 
                className="mb-4 pl-0.5 text-[10px] uppercase tracking-[0.45em] text-[#c5b69a] font-medium"
                style={headingStyle}
              >
                {eventLabel}
              </p>

              <h1 
                className="text-4xl sm:text-5xl md:text-7xl font-normal leading-[0.9] tracking-[-0.03em] break-words"
                style={groomStyle}
              >
                {groomName}
              </h1>

              <div className="relative my-2 ml-[8%] sm:ml-[14%] flex items-center gap-3">
                <span className="h-px w-8 bg-[#89785e]" />
                <span className="font-serif text-2xl sm:text-3xl italic text-[#c9b28b]">
                  &amp;
                </span>
                <span className="h-px w-8 bg-[#89785e]" />
              </div>

              <h1 
                className="relative z-20 text-4xl sm:text-5xl md:text-7xl font-normal leading-[0.9] tracking-[-0.03em] break-words"
                style={brideStyle}
              >
                {brideName}
              </h1>
            </div>

            {/* Offset portrait frame */}
            <div className="absolute right-0 top-[12%] z-10 w-[46%] max-w-[260px] aspect-[4/5] rotate-[3deg] border border-[#786c5a] p-1.5 shadow-2xl bg-black sm:right-[4%] sm:max-w-[320px]">
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={heroPhoto}
                  alt={`${groomName} and ${brideName}`}
                  className="h-full w-full object-cover grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            <div className="relative z-30 mt-16 flex items-end justify-between border-t border-[#3f3c37] pt-4 sm:mt-20">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#89847a]">
                  {date.month} / {date.year}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#d8d0c2]">{date.full}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-[#89847a] animate-bounce">
                <span>Scroll</span>
                <ArrowDown size={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATE POSTER */}
      <section className="relative border-t border-[#302e2a] bg-[#e9e0d0] px-5 py-20 text-[#191714] sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal delay={0}>
            <div className="border-l border-[#9d917e] pl-4 sm:pl-8">
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#776e62] font-semibold">
                Mark The Date
              </p>
              <p className="mt-3 max-w-xs text-xs sm:text-sm leading-relaxed text-[#615b52]">
                {message}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative">
              <div className="flex items-end gap-3 sm:gap-5">
                <span className="text-[clamp(64px,18vw,140px)] font-normal leading-[0.7] tracking-[-0.06em]">
                  {date.day}
                </span>

                <div className="pb-2 sm:pb-4">
                  <p className="text-xl sm:text-3xl font-medium tracking-tight">
                    {date.month}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#756d61]">
                    {date.year}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TWO PORTRAITS */}
      <section className="relative overflow-hidden bg-[#171614] px-5 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0}>
            <div className="mb-12 flex items-end justify-between border-b border-[#383530] pb-4">
              <p 
                className="text-[10px] uppercase tracking-[0.38em] text-[#8e887e]"
                style={headingStyle}
              >
                The people behind the story
              </p>
              <span className="text-[10px] text-[#68635c] font-mono">02 / 05</span>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 items-center">
            <Reveal delay={60}>
              <div className="relative mx-auto w-full max-w-[280px] sm:max-w-sm">
                <div className="absolute -left-3 -top-3 h-full w-full border border-[#665b4d]" />
                <div className="relative z-10 aspect-[4/5] w-full overflow-hidden shadow-2xl bg-black/40">
                  <img
                    src={bridePhoto}
                    alt={brideName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-left">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5b69a] block font-semibold">The Bride</span>
                  <h3 
                    className="text-2xl sm:text-3xl font-serif text-[#eee8dc] tracking-tight break-words mt-1"
                    style={brideStyle}
                  >
                    {brideName}
                  </h3>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="pt-2 sm:pt-6">
                <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.15] tracking-tight font-serif text-[#eee8dc]">
                  A new chapter,
                  <br />
                  written together.
                </p>
                <div className="mt-4 max-w-sm border-t border-[#403c36] pt-4 text-xs sm:text-sm leading-relaxed text-[#aaa49a]">
                  {message}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 sm:mt-20 grid gap-8 sm:gap-12 md:grid-cols-2 items-center">
            <Reveal delay={0}>
              <div className="order-2 md:order-1">
                <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.15] tracking-tight font-serif text-[#eee8dc]">
                  And every
                  <br />
                  detail matters.
                </p>

                <div className="mt-4 flex items-center gap-2.5 text-[9px] uppercase tracking-[0.3em] text-[#857e74]">
                  <Heart size={12} className="text-[#c5b69a]" />
                  <span>{initials}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative order-1 md:order-2 mx-auto w-full max-w-[280px] sm:max-w-sm">
                <div className="aspect-[4/5] w-full overflow-hidden shadow-2xl bg-black/40">
                  <img
                    src={groomPhoto}
                    alt={groomName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-left">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5b69a] block font-semibold">The Groom</span>
                  <h3 
                    className="text-2xl sm:text-3xl font-serif text-[#eee8dc] tracking-tight break-words mt-1"
                    style={groomStyle}
                  >
                    {groomName}
                  </h3>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative bg-[#e8dfd1] px-5 py-20 text-[#1b1916] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0}>
            <div className="mb-12 max-w-lg">
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#82786a] font-semibold">
                Frames from the story
              </p>
              <h2 className="mt-3 text-[clamp(32px,6vw,64px)] font-normal leading-[0.9] tracking-[-0.05em]">
                Moments
                <br />
                between moments.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {images.slice(0, 4).map((imgUrl, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="aspect-[4/5] w-full overflow-hidden border border-[#b8aa96] bg-black/10 shadow-md">
                  <img
                    src={imgUrl}
                    alt={`Moment ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT PASS / INFORMATION */}
      <section className="relative bg-[#151412] px-5 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0}>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-[#827c73] font-medium">
                  The Gathering
                </p>
                <h2 className="mt-4 max-w-xs text-[clamp(36px,7vw,72px)] font-normal leading-[0.85] tracking-[-0.05em]">
                  Be
                  <br />
                  there.
                </h2>
              </div>

              <div className="relative border border-[#514b42] p-5 sm:p-8 bg-[#181715]/60 backdrop-blur-sm">
                <div className="absolute -right-2 -top-2 h-3.5 w-3.5 border-r border-t border-[#c4a97b]" />
                <div className="absolute -bottom-2 -left-2 h-3.5 w-3.5 border-b border-l border-[#c4a97b]" />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <CalendarDays size={16} className="mb-3 text-[#c6aa7b]" />
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#7f796f]">
                      Date
                    </p>
                    <p className="mt-1 text-base sm:text-lg">{date.full}</p>
                  </div>

                  <div>
                    <Clock3 size={16} className="mb-3 text-[#c6aa7b]" />
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#7f796f]">
                      Time
                    </p>
                    <p className="mt-1 text-base sm:text-lg">{time || "7:00 PM"}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <MapPin size={16} className="mb-3 text-[#c6aa7b]" />
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#7f796f]">
                      Location
                    </p>
                    <p className="mt-1 text-base sm:text-lg font-medium">{venue}</p>
                    {address && (
                      <p className="mt-1 max-w-xl text-xs sm:text-sm leading-relaxed text-[#8e887f]">
                        {address}
                      </p>
                    )}
                  </div>
                </div>

                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border border-[#75664e] px-5 py-2.5 text-[9px] uppercase tracking-[0.25em] transition hover:bg-[#d6c4a3] hover:text-[#171512] font-semibold"
                  >
                    <Navigation size={12} />
                    <span>Open in Maps</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL SIGNATURE */}
      <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden bg-[#e8dfd1] px-5 py-20 text-[#181613]">
        <div className="absolute left-1/2 top-1/2 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b8aa96] pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 h-[35vw] w-[35vw] max-h-[350px] max-w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9bdac] pointer-events-none" />

        <Reveal delay={0} className="relative z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#82786b] font-medium">
            With Love, Always
          </p>

          <div className="mt-6 text-[clamp(56px,14vw,120px)] font-normal leading-[0.75] tracking-[-0.07em]">
            {initials}
          </div>

          <p className="mx-auto mt-8 max-w-sm text-xs sm:text-sm leading-relaxed text-[#686157]">
            We would be delighted to have you with us as we celebrate this
            beautiful beginning.
          </p>

          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[#8b8174]">
            {date.full}
          </p>
        </Reveal>
      </section>
    </main>
  );
}
