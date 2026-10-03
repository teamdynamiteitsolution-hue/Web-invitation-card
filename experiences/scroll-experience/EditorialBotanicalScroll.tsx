// Utsob Scroll Experience 01
"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Navigation, Heart } from "lucide-react";
import { getMonogram } from "@/app/create/components/editor/DynamicLayout";
import { getPresetStyle } from "@/lib/typography-presets";

export default function EditorialBotanicalScroll({
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
    eventLabel = "An Invitation To Celebrate",
    bridePhoto = "/assets/categories/wedding.webp",
    groomPhoto = "/assets/categories/wedding.webp",
    couplePhoto = "",
    invitationMessage = "Together with our families, we joyfully invite you to celebrate our special day.",
  } = eventData || {};

  const typographyStyles = eventData?.typographyStyles || {};
  const brideStyle = typographyStyles['brideName'] ? getPresetStyle(typographyStyles['brideName']) : {};
  const groomStyle = typographyStyles['groomName'] ? getPresetStyle(typographyStyles['groomName']) : {};
  const headingStyle = typographyStyles['primaryHeading'] ? getPresetStyle(typographyStyles['primaryHeading']) : {};

  const heroPhoto = couplePhoto || bridePhoto || "/assets/categories/wedding.webp";
  const brideImg = bridePhoto || "/assets/categories/wedding.webp";
  const groomImg = groomPhoto || "/assets/categories/wedding.webp";

  const [visible, setVisible] = useState(false);
  const initials = getMonogram(brideName, groomName, "circle");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const mapsUrl =
    googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${venue} ${venueAddress}`
    )}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F0E8] text-[#28352B]">
      <section
        className={`min-h-[100svh] flex flex-col justify-center px-6 py-16 transition-all duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-md text-center">
          <div 
            className="mb-8 text-[10px] uppercase tracking-[0.35em] text-[#71806C] font-semibold"
            style={headingStyle}
          >
            {eventLabel || "An Invitation To Celebrate"}
          </div>

          <div className="relative mx-auto mb-10 aspect-[4/5] max-w-[300px] overflow-hidden rounded-[48%_48%_8%_8%] border border-[#9BA58F] p-2">
            <div className="h-full w-full overflow-hidden rounded-[45%_45%_5%_5%]">
              <img
                src={heroPhoto}
                alt="Couple"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-[#C9B88A] bg-[#F5F0E8] text-sm tracking-widest text-[#6C765F]">
              {initials}
            </div>
          </div>

          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#71806C]">
            Together With Their Families
          </p>

          <h1 className="font-serif text-5xl leading-[0.95]">
            <span style={brideStyle} className="block break-words">{brideName}</span>
            <span className="mx-2 block text-2xl italic text-[#B59A63]">&amp;</span>
            <span style={groomStyle} className="block break-words">{groomName}</span>
          </h1>

          <div className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-3">
            <span className="h-px flex-1 bg-[#B59A63]/50" />
            <Calendar className="h-4 w-4 text-[#9B8050]" />
            <span className="h-px flex-1 bg-[#B59A63]/50" />
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.2em]">{date}</p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-4xl text-[#B59A63]">❦</span>
          <p className="mt-8 font-serif text-lg italic leading-8 text-[#596257]">
            “{invitationMessage}”
          </p>
        </div>
      </section>

      <section className="border-y border-[#A7B09C]/40 bg-[#E8E5D9] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#71806C]">
              Two Stories
            </p>
            <h2 className="mt-3 font-serif text-4xl">One New Chapter</h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-[120px_120px_20px_20px]">
                <img src={groomImg} alt="Groom" className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 text-center text-[10px] uppercase tracking-[0.25em]">
                The Groom
              </p>
              <h3 
                className="mt-1 text-center font-serif text-2xl break-words"
                style={groomStyle}
              >
                {groomName}
              </h3>
            </div>

            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-[20px_20px_120px_120px]">
                <img src={brideImg} alt="Bride" className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 text-center text-[10px] uppercase tracking-[0.25em]">
                The Bride
              </p>
              <h3 
                className="mt-1 text-center font-serif text-2xl break-words"
                style={brideStyle}
              >
                {brideName}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-md text-center">
          <Heart className="mx-auto mb-6 h-6 w-6 fill-[#B59A63] text-[#B59A63]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#71806C]">
            The Celebration
          </p>
          <h2 className="mt-3 font-serif text-4xl">Join Us</h2>

          <div className="mt-10 border-y border-[#B59A63]/40 py-7">
            <p className="text-xs uppercase tracking-[0.2em]">{date}</p>
            <p className="mt-2 font-serif text-2xl">{time}</p>
            <p className="mt-4 text-sm text-[#697267]">{venue}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#28352B] px-6 py-24 text-center text-[#F5F0E8]">
        <MapPin className="mx-auto mb-5 h-6 w-6 text-[#C9B88A]" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9B88A]">
          The Venue
        </p>
        <h2 className="mt-4 font-serif text-3xl">{venue}</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-[#D8D5CA]">{venueAddress}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 border border-[#C9B88A] px-6 py-3 text-[10px] uppercase tracking-[0.2em]"
        >
          <Navigation className="h-3.5 w-3.5" />
          View Location
        </a>
      </section>
    </main>
  );
}
