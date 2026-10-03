// Utsob Scroll Experience 03
"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Navigation, Sparkles } from "lucide-react";
import { getPresetStyle } from "@/lib/typography-presets";

export default function BotanicalMagazineScroll({
  template,
  eventData,
  skipAnimation = false,
}: {
  template?: any;
  eventData: any;
  skipAnimation?: boolean;
}) {
  const {
    brideName = "Lary",
    groomName = "John",
    date = "Saturday, 14 June 2027",
    time = "7:00 PM",
    venue = "The Royal Palace",
    venueAddress = "Gulshan-2, Dhaka, Bangladesh",
    googleMapsUrl = "",
    eventLabel = "You Are Invited",
    bridePhoto = "/assets/categories/wedding.webp",
    groomPhoto = "/assets/categories/wedding.webp",
    couplePhoto = "",
    gallery1 = "/assets/Cards/card 1.png",
    gallery2 = "/assets/Cards/card 2.png",
    invitationMessage = "With joyful hearts, we invite you to be part of our beautiful beginning.",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : {};
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : {};
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : {};

  const heroPhoto = couplePhoto || bridePhoto || "/assets/categories/wedding.webp";
  const brideImg = bridePhoto || "/assets/categories/wedding.webp";
  const groomImg = groomPhoto || "/assets/categories/wedding.webp";
  const g1 = gallery1 || "/assets/Cards/card 1.png";
  const g2 = gallery2 || "/assets/Cards/card 2.png";

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const mapsUrl =
    googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${venue} ${venueAddress}`
    )}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F4EC] text-[#24382B]">
      <section
        className={`relative min-h-[100svh] overflow-hidden px-6 py-12 transition-opacity duration-1000 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute left-0 top-0 h-48 w-48 rounded-br-full bg-[#B9C9A9]/45" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-tl-full bg-[#D7B78C]/30" />

        <div className="relative z-10 flex min-h-[90svh] flex-col">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em]">
            <span>Invitation No. 01</span>
            <span>Est. Forever</span>
          </div>

          <div className="my-auto">
            <div className="mx-auto max-w-sm">
              <p 
                className="text-center text-[10px] uppercase tracking-[0.35em] text-[#73816F] font-semibold"
                style={headingStyle}
              >
                {eventLabel || "You Are Invited"}
              </p>

              <div className="relative mt-10">
                <div className="absolute -left-3 top-8 h-36 w-3 border-l border-t border-[#9AA98E]" />
                <div className="absolute -right-3 bottom-8 h-36 w-3 border-b border-r border-[#9AA98E]" />

                <div className="aspect-[4/5] overflow-hidden">
                  <img src={heroPhoto} alt="Invitation" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h1 
                  className="font-serif text-5xl leading-none break-words"
                  style={brideStyle}
                >
                  {brideName}
                </h1>
                <div className="my-3 text-2xl italic text-[#A37C4A]">&amp;</div>
                <h2 
                  className="font-serif text-5xl leading-none break-words"
                  style={groomStyle}
                >
                  {groomName}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#24382B]/20 pt-5 text-[9px] uppercase tracking-[0.2em]">
            <span>{date}</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </section>

      <section className="bg-[#DDE5D5] px-6 py-24">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#71806C]" />
            <span className="text-[9px] uppercase tracking-[0.3em]">A Note</span>
          </div>

          <p className="mt-8 font-serif text-4xl leading-tight">
            A beautiful day deserves beautiful company.
          </p>

          <p className="mt-8 text-sm leading-8 text-[#536153]">{invitationMessage}</p>
          <Sparkles className="mt-10 h-5 w-5 text-[#A37C4A]" />
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#71806C]">The People</p>
              <h2 className="mt-4 font-serif text-5xl leading-tight">Meet the couple</h2>
              <p className="mt-6 text-sm leading-7 text-[#667166]">
                Two people, two stories, one unforgettable chapter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="mt-10">
                <img src={groomImg} alt="Groom" className="aspect-[3/4] w-full object-cover" />
                <p className="mt-4 text-[9px] uppercase tracking-[0.25em]">Groom</p>
                <h3 
                  className="mt-1 font-serif text-xl break-words"
                  style={groomStyle}
                >
                  {groomName}
                </h3>
              </div>

              <div>
                <img src={brideImg} alt="Bride" className="aspect-[3/4] w-full object-cover" />
                <p className="mt-4 text-[9px] uppercase tracking-[0.25em]">Bride</p>
                <h3 
                  className="mt-1 font-serif text-xl break-words"
                  style={brideStyle}
                >
                  {brideName}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#24382B]/15 bg-[#F1E9DC] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#71806C]">Details</p>
              <h2 className="mt-3 font-serif text-4xl">The Day</h2>
            </div>
            <Calendar className="h-6 w-6 text-[#A37C4A]" />
          </div>

          <div className="grid border-y border-[#24382B]/20 sm:grid-cols-3">
            <div className="px-4 py-8 sm:border-r border-[#24382B]/20">
              <p className="text-[9px] uppercase tracking-[0.2em] opacity-50">Date</p>
              <p className="mt-3 font-serif text-xl">{date}</p>
            </div>

            <div className="border-t border-[#24382B]/20 px-4 py-8 sm:border-t-0 sm:border-r">
              <p className="text-[9px] uppercase tracking-[0.2em] opacity-50">Time</p>
              <p className="mt-3 font-serif text-xl">{time}</p>
            </div>

            <div className="border-t border-[#24382B]/20 px-4 py-8 sm:border-t-0">
              <p className="text-[9px] uppercase tracking-[0.2em] opacity-50">Place</p>
              <p className="mt-3 font-serif text-xl">{venue}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#71806C]">Little Moments</p>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <img src={g1} alt="Memory 1" className="aspect-[3/4] object-cover" />
            <img src={g2} alt="Memory 2" className="mt-8 aspect-[3/4] object-cover" />
            <div className="col-span-2 flex min-h-[220px] items-center justify-center bg-[#24382B] p-8 text-center text-[#F8F4EC]">
              <p className="font-serif text-3xl italic">“Forever starts with today.”</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#24382B] px-6 py-28 text-center text-[#F8F4EC]">
        <MapPin className="mx-auto h-6 w-6 text-[#D7B78C]" />
        <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-[#D7B78C]">Where We Meet</p>
        <h2 className="mt-4 font-serif text-4xl">{venue}</h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/60">{venueAddress}</p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 border border-[#D7B78C]/70 px-7 py-3 text-[9px] uppercase tracking-[0.25em]"
        >
          <Navigation className="h-3.5 w-3.5" />
          Get Directions
        </a>

        <p className="mt-20 font-serif text-2xl">
          {brideName} &amp; {groomName}
        </p>
      </section>
    </main>
  );
}
