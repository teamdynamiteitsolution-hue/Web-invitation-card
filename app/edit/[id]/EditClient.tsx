"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  PlayCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  ImagePlus, 
  X, 
  Lock, 
  Check, 
  ArrowLeft 
} from "lucide-react";
import DynamicCardExperience from "@/experiences/dynamic-card";
import EnvelopeRoyal from "@/experiences/envelope-royal";
import TheatricalCurtain from "@/experiences/theatrical-curtain";
import MultiScratch from "@/experiences/multi-scratch";
import ScrollExperience from "@/experiences/scroll-experience/ScrollExperience";
import { resolveCanonicalInvitation } from "@/lib/canonical-invitation";
import { getTemplateById } from "@/lib/template-definitions";

export default function EditClient({ 
  id, 
  invitation, 
  animations 
}: { 
  id: string; 
  invitation: any; 
  animations: any[]; 
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  
  // Parse initial event data
  const [formData, setFormData] = useState<any>(() => {
    let data: any = {};
    if (typeof invitation.eventData === "string") {
      try {
        data = JSON.parse(invitation.eventData);
      } catch {
        data = {};
      }
    } else if (invitation.eventData && typeof invitation.eventData === "object") {
      data = invitation.eventData;
    }

    return {
      category: data.category || "wedding",
      eventLabel: data.eventLabel || "The Wedding Of",
      brideName: data.brideName || "Lary",
      groomName: data.groomName || "John",
      personName: data.personName || data.brideName || "",
      date: data.date || "",
      time: data.time || "",
      venue: data.venue || "",
      venueAddress: data.venueAddress || "",
      googleMapsUrl: data.googleMapsUrl || "",
      invitationMessage: data.invitationMessage || "",
      showInvitationMessage: data.showInvitationMessage !== undefined ? data.showInvitationMessage : false,
      couplePhoto: data.couplePhoto || "/assets/categories/wedding.webp",
      groomPhoto: data.groomPhoto || "/assets/categories/wedding.webp",
      bridePhoto: data.bridePhoto || "/assets/categories/wedding.webp",
      gallery1: data.gallery1 || "/assets/categories/wedding.webp",
      gallery2: data.gallery2 || "/assets/categories/wedding.webp",
      gallery3: data.gallery3 || "/assets/categories/wedding.webp",
      gallery4: data.gallery4 || "/assets/categories/wedding.webp",
      ...data
    };
  });

  const [animationId, setAnimationId] = useState<string>(invitation.animationId || "");
  const [activeTab, setActiveTab] = useState<"content" | "opening">("content");

  const datePickerRef = useRef<HTMLInputElement>(null);
  const timePickerRef = useRef<HTMLInputElement>(null);

  const isPaid = invitation.status === "ACTIVE" || invitation.status === "PAID";
  const isScroll = (invitation.template?.experienceType || "").toLowerCase() === "scroll" || 
                   (invitation.template?.experienceType || "").toLowerCase() === "scroll_story" ||
                   (invitation.template?.slug || "").includes("scroll");

  const isBirthday = (formData.category || "wedding") === "birthday";

  // Define relevant image slots
  const imageSlots = isScroll
    ? [
        { id: "couplePhoto", label: "Hero Couple / Opening Photo", description: "Top banner presentation" },
        { id: "groomPhoto", label: "Groom Photo", description: "The Happy Couple section" },
        { id: "bridePhoto", label: "Bride Photo", description: "The Happy Couple section" },
        { id: "gallery1", label: "Gallery Photo 1", description: "Moments & memories gallery" },
        { id: "gallery2", label: "Gallery Photo 2", description: "Moments & memories gallery" },
        { id: "gallery3", label: "Gallery Photo 3", description: "Moments & memories gallery" },
        { id: "gallery4", label: "Gallery Photo 4", description: "Moments & memories gallery" },
      ]
    : [
        { id: "couplePhoto", label: "Couple / Main Photo", description: "Framed arch or central portrait" },
        { id: "groomPhoto", label: "Groom Photo", description: "Groom portrait frame" },
        { id: "bridePhoto", label: "Bride Photo", description: "Bride portrait frame" },
      ];

  const handleFileUpload = (slotId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData((prev: any) => ({ ...prev, [slotId]: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/user/invitations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contentData: formData,
          animationId: !isPaid ? animationId : undefined
        })
      });

      if (res.ok) {
        router.push("/profile");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to update invitation");
      }
    } catch (e) {
      alert("Error saving invitation data");
    } finally {
      setSaving(false);
    }
  };

  // Resolve Canonical Real-time Preview
  const selectedAnimation = animations.find(a => a.id === animationId) || invitation.animation;

  const canonical = resolveCanonicalInvitation({
    ...invitation,
    eventData: formData,
    animation: selectedAnimation
  });

  const { template: canonicalTemplate, animation: canonicalAnimation, eventData: canonicalEventData, experienceType } = canonical;

  let ExperienceComponent: any = DynamicCardExperience;
  if (isScroll || experienceType === "scroll" || experienceType === "scroll_story") {
    ExperienceComponent = ScrollExperience;
  } else if (experienceType === "curtain") {
    ExperienceComponent = TheatricalCurtain;
  } else if (experienceType === "envelope") {
    ExperienceComponent = EnvelopeRoyal;
  } else if (experienceType === "scratch" || experienceType === "multi_scratch") {
    ExperienceComponent = MultiScratch;
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Settings & Form Panel */}
      <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 border border-[#D4AF37]/30 shadow-soft-surface overflow-y-auto max-h-[88vh] flex flex-col justify-between">
        <div>
          {/* Header & Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2623]" style={{ fontFamily: "Cinzel, serif" }}>
                Customize Invitation
              </h1>
              <p className="text-xs sm:text-sm text-[#7C7267] mt-0.5">
                {invitation.template?.name || "Digital Invitation"} • {isScroll ? "Scroll Story" : "Single Card"}
              </p>
            </div>

            {isPaid ? (
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Check className="w-3.5 h-3.5" /> Published &amp; Active
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Draft (Unpaid)
              </span>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl mb-6 border border-[#D4AF37]/20 select-none">
            <button
              type="button"
              onClick={() => setActiveTab("content")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-[#8C4A52] text-white shadow-sm"
                  : "text-[#7C7267] hover:text-[#2C2623] hover:bg-white/60"
              }`}
            >
              <span>📝 Event Information &amp; Photos</span>
            </button>

            {!isPaid && (
              <button
                type="button"
                onClick={() => setActiveTab("opening")}
                className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                  activeTab === "opening"
                    ? "bg-[#8C4A52] text-white shadow-sm"
                    : "text-[#7C7267] hover:text-[#2C2623] hover:bg-white/60"
                }`}
              >
                <PlayCircle className="w-4 h-4" />
                <span>Opening Animation</span>
              </button>
            )}
          </div>

          {/* ============================================================== */}
          {/* TAB 1: CONTENT (EVENT DETAILS & PHOTOS)                        */}
          {/* ============================================================== */}
          {activeTab === "content" && (
            <div className="space-y-6">
              
              {/* Event Label */}
              <div>
                <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                  Event Label / Header Line
                </label>
                <input 
                  type="text"
                  value={formData.eventLabel || (isBirthday ? "Celebrating The Birthday Of" : "The Wedding Of")}
                  onChange={(e) => setFormData({ ...formData, eventLabel: e.target.value })}
                  placeholder="e.g. The Wedding Of / Happy Birthday / You Are Invited"
                  className="w-full px-3.5 py-2.5 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                />
              </div>

              {/* Names */}
              {isBirthday ? (
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Birthday Star / Person Name
                  </label>
                  <input 
                    type="text"
                    value={formData.personName || formData.brideName || ""}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      personName: e.target.value,
                      brideName: e.target.value
                    })}
                    placeholder="e.g. Aaryan / Sarah"
                    className="w-full px-3.5 py-2.5 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                      Bride&apos;s Name
                    </label>
                    <input 
                      type="text"
                      value={formData.brideName || ""}
                      onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                      placeholder="e.g. Lary / Sarah"
                      className="w-full px-3.5 py-2.5 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                      Groom&apos;s Name
                    </label>
                    <input 
                      type="text"
                      value={formData.groomName || ""}
                      onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                      placeholder="e.g. John / David"
                      className="w-full px-3.5 py-2.5 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                    />
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Event Date
                  </label>
                  <div className="relative">
                    <input 
                      ref={datePickerRef}
                      type="text"
                      value={formData.date || ""}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. Saturday, 14 June 2027"
                      className="w-full px-3.5 py-2.5 pr-10 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                    />
                    <button 
                      type="button" 
                      onClick={() => datePickerRef.current?.focus()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C4A52] hover:text-[#2C2623]"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Event Time
                  </label>
                  <div className="relative">
                    <input 
                      ref={timePickerRef}
                      type="text"
                      value={formData.time || ""}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g. 7:00 PM Onwards"
                      className="w-full px-3.5 py-2.5 pr-10 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                    />
                    <button 
                      type="button" 
                      onClick={() => timePickerRef.current?.focus()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C4A52] hover:text-[#2C2623]"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Venue & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Venue Name
                  </label>
                  <input 
                    type="text"
                    value={formData.venue || ""}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g. The Royal Palace Hall"
                    className="w-full px-3.5 py-2.5 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                    Venue Address / City
                  </label>
                  <input 
                    type="text"
                    value={formData.venueAddress || ""}
                    onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                    placeholder="e.g. Gulshan-2, Dhaka"
                    className="w-full px-3.5 py-2.5 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                  />
                </div>
              </div>

              {/* Google Maps Location Link */}
              <div>
                <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide mb-1">
                  Google Maps Location Link (Optional)
                </label>
                <div className="relative">
                  <input 
                    type="url"
                    value={formData.googleMapsUrl || ""}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                    placeholder="e.g. https://maps.app.goo.gl/xyz"
                    className="w-full px-3.5 py-2.5 pr-10 border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4A52] font-serif text-sm bg-[#FAF8F5]/60"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C4A52]">
                    <MapPin className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Invitation Message */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-[#D4AF37]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide">
                    Invitation Message / Wishes
                  </label>
                  {!isScroll && (
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <span className="text-[11px] font-semibold text-[#8C4A52]">
                        Show on Card
                      </span>
                      <input 
                        type="checkbox"
                        checked={!!formData.showInvitationMessage}
                        onChange={(e) => setFormData({ ...formData, showInvitationMessage: e.target.checked })}
                        className="w-4 h-4 rounded text-[#8C4A52] focus:ring-[#8C4A52] accent-[#8C4A52]"
                      />
                    </label>
                  )}
                </div>
                <textarea 
                  rows={3}
                  value={formData.invitationMessage || ""}
                  onChange={(e) => setFormData({ ...formData, invitationMessage: e.target.value })}
                  placeholder="Write a warm message or greeting for your guests..."
                  className="w-full px-3 py-2 bg-white border border-[#D4AF37]/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C4A52] font-serif text-xs leading-relaxed"
                />
              </div>

              {/* Photos & Media Slots */}
              <div className="pt-4 border-t border-[#D4AF37]/20">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-[#2C2623] uppercase tracking-wide">
                    Photos &amp; Media ({imageSlots.length})
                  </label>
                  <span className="text-[10px] text-[#8C4A52] font-bold">
                    Upload &amp; Replace Photos
                  </span>
                </div>

                <div className="space-y-3">
                  {imageSlots.map((slot) => {
                    const currentImg = formData[slot.id] || "/assets/categories/wedding.webp";
                    const isCustomUploaded = currentImg && !currentImg.includes("/assets/categories/");

                    return (
                      <div 
                        key={slot.id} 
                        className="p-3 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#D4AF37]/50 flex-shrink-0 bg-stone-100 shadow-xs">
                            <img src={currentImg} alt={slot.label} className="w-full h-full object-cover" />
                            {isCustomUploaded && (
                              <button 
                                type="button"
                                onClick={() => setFormData({ ...formData, [slot.id]: "/assets/categories/wedding.webp" })}
                                className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-red-600 text-white p-0.5 rounded-full transition-colors"
                                title="Reset to default image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-[#2C2623]">{slot.label}</h4>
                            <p className="text-[10px] text-[#7C7267] leading-tight mt-0.5">{slot.description}</p>
                          </div>
                        </div>

                        <label className="cursor-pointer">
                          <div className="px-3 py-1.5 rounded-xl border border-[#D4AF37]/50 text-[11px] font-bold text-[#8C4A52] hover:bg-[#F9F0EC] transition-colors whitespace-nowrap shadow-xs">
                            Upload
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(slot.id, file);
                            }}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: OPENING ANIMATION (ONLY FOR UNPAID / DRAFT)             */}
          {/* ============================================================== */}
          {activeTab === "opening" && !isPaid && (
            <div className="space-y-4">
              <p className="text-xs text-[#7C7267] font-serif mb-3">
                Select how your invitation will reveal itself when guests click the link.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {animations.map((anim: any) => {
                  const isSelected = animationId === anim.id;

                  return (
                    <div 
                      key={anim.id}
                      onClick={() => setAnimationId(anim.id)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                        isSelected 
                          ? "border-[#8C4A52] bg-[#F9F0EC] shadow-sm ring-1 ring-[#8C4A52]" 
                          : "border-stone-200 hover:border-[#D4AF37]/50 bg-white"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl bg-stone-900 overflow-hidden flex-shrink-0 relative border border-[#D4AF37]/30">
                        {anim.previewPosterUrl ? (
                          <img src={anim.previewPosterUrl} alt={anim.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <PlayCircle className="w-6 h-6" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <PlayCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-[#2C2623] truncate">{anim.name}</h4>
                        <span className="text-[10px] text-[#8C4A52] font-extrabold block mt-0.5">
                          {anim.price === 0 || !anim.price ? "Free" : `৳${anim.price}`}
                        </span>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#8C4A52] flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-[#D4AF37]/20 flex justify-between items-center gap-4">
          <button 
            type="button"
            onClick={() => { setCancelling(true); router.push("/profile"); }} 
            disabled={saving || cancelling}
            className="px-6 py-3 rounded-full border border-gray-300 font-bold text-xs sm:text-sm text-[#7C7267] hover:bg-stone-50 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {cancelling ? <Loader2 className="w-4 h-4 animate-spin text-gray-500" /> : <ArrowLeft className="w-4 h-4" />}
            <span>Cancel</span>
          </button>

          <button 
            type="button"
            onClick={handleSave} 
            disabled={saving || cancelling}
            className="px-8 py-3 bg-[#8C4A52] text-white rounded-full font-bold text-xs sm:text-sm shadow-elevated-card hover:bg-[#7a3e45] transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Phone */}
      <div className="w-full lg:w-[420px] shrink-0 flex flex-col items-center">
        <h2 className="text-base sm:text-lg font-bold mb-3 text-[#2C2623]" style={{ fontFamily: "Cinzel, serif" }}>
          Live Preview
        </h2>
        <div className="relative w-full max-w-[360px] h-[680px] shadow-2xl rounded-[36px] overflow-hidden border-[8px] border-[#1A1614] bg-stone-900">
          <ExperienceComponent 
            key={`${animationId}-${formData.brideName}-${formData.groomName}-${formData.date}`}
            template={canonicalTemplate} 
            animation={canonicalAnimation}
            eventData={canonicalEventData} 
          />
        </div>
        <p className="mt-3 text-xs text-[#7C7267] font-serif italic text-center">
          Interact with the preview above
        </p>
      </div>

    </main>
  );
}
