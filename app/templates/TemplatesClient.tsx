"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

interface TemplatesClientProps {
  categories: any[];
  templates: any[];
  currentCategorySlug?: string;
}

export default function TemplatesClient({
  categories,
  templates,
  currentCategorySlug,
}: TemplatesClientProps) {
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);

  // Lock background scroll and listen to Escape key when modal is open
  useEffect(() => {
    if (!previewTemplate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewTemplate(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewTemplate]);

  return (
    <main className="pb-24 sm:pb-32">
      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-[#2C2623]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Premium Invitation Collections
        </h1>
        <p className="text-[#7C7267] font-serif text-sm sm:text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed">
          Choose a professionally art-directed master template. Each collection is designed to be personalized within bounded stylistic rules to ensure a flawless final result.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 md:px-12 mb-10 sm:mb-16">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          <Link
            href="/templates"
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              !currentCategorySlug
                ? "bg-[#2C2623] text-white shadow-elevated-card"
                : "bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC] shadow-soft-surface"
            }`}
          >
            All Collections
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/templates?category=${c.slug}`}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
                currentCategorySlug === c.slug
                  ? "bg-[#2C2623] text-white shadow-elevated-card"
                  : "bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC] shadow-soft-surface"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Templates Grid */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {templates.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-[#D4AF37]/20 shadow-soft-surface">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: "Cinzel, serif" }}>
              No Templates Found
            </h3>
            <p className="text-[#7C7267] font-serif italic text-sm">
              More ceremonial collections are coming soon to this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setPreviewTemplate(template)}
                className="group relative bg-white rounded-2xl sm:rounded-[24px] border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface hover:shadow-floating-ceremony transition-all duration-500 flex flex-col cursor-pointer"
              >
                {/* Visual Preview */}
                <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#F9F0EC] to-[#E8D8D0] overflow-hidden flex items-center justify-center p-3 sm:p-6">
                  <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
                  {template.previewImageUrl ? (
                    <img
                      src={template.previewImageUrl}
                      alt={template.name}
                      className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[#7C7267]">
                      <Sparkles className="w-6 h-6 text-[#D4AF37] mb-2" />
                      <span className="text-xs font-serif italic">Preview coming soon</span>
                    </div>
                  )}
                  {template.isFeatured && (
                    <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#8C4A52] text-[#F9F0D0] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-3.5 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[10px] sm:text-xs font-bold text-[#8C4A52] uppercase tracking-wider truncate">
                        {template.category?.name || "Invitation"}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#2C2623]" style={{ fontFamily: "Cinzel, serif" }}>
                        ৳{template.price}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-[#2C2623] mb-1 sm:mb-2 line-clamp-1" style={{ fontFamily: "Cinzel, serif" }}>
                      {template.name}
                    </h3>
                    {template.description && (
                      <p className="text-xs font-serif italic text-[#7C7267] mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
                        {template.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2.5 sm:pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between mt-auto">
                    {template.compatibilities && template.compatibilities.length > 0 ? (
                      <span className="text-[10px] sm:text-xs font-semibold text-[#7C7267] truncate">
                        {template.compatibilities.length} Styles
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-xs font-serif text-[#7C7267]/60 truncate italic">
                        No styles
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(template);
                      }}
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#F9F0EC] text-[#2C2623] border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#8C4A52] group-hover:text-white transition-colors shadow-xs cursor-pointer"
                      aria-label={`Preview ${template.name}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Preview Modal Popup */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setPreviewTemplate(null)}
          role="dialog"
          aria-modal="true"
          aria-label={previewTemplate.name}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-[#D4AF37]/30 text-[#2C2623] hover:bg-[#8C4A52] hover:text-white transition-colors flex items-center justify-center shadow-md cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Large Preview Visual */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] bg-gradient-to-b from-[#F9F0EC] to-[#E8D8D0] p-6 flex items-center justify-center overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
              {previewTemplate.previewImageUrl ? (
                <img
                  src={previewTemplate.previewImageUrl}
                  alt={previewTemplate.name}
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#7C7267]">
                  <Sparkles className="w-6 h-6 text-[#D4AF37] mb-3" />
                  <span className="text-sm font-serif italic">Preview coming soon</span>
                </div>
              )}
              {previewTemplate.isFeatured && (
                <div className="absolute top-3.5 left-3.5 bg-[#8C4A52] text-[#F9F0D0] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                  Featured
                </div>
              )}
            </div>

            {/* Right Column: Template Info & Actions */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#F9F0EC] text-[#8C4A52] text-[11px] font-bold tracking-wider uppercase mb-3">
                  {previewTemplate.category?.name || "Invitation Collection"}
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-[#2C2623] mb-2 leading-tight"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {previewTemplate.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-[#8C4A52]">
                    ৳{previewTemplate.price}
                  </span>
                  <span className="text-xs text-[#7C7267] font-serif">One-time payment</span>
                </div>
                {previewTemplate.description && (
                  <p className="text-sm text-[#7C7267] font-serif italic mb-6 leading-relaxed border-l-2 border-[#D4AF37]/40 pl-3">
                    {previewTemplate.description}
                  </p>
                )}
                {previewTemplate.compatibilities && previewTemplate.compatibilities.length > 0 && (
                  <div className="mb-6 p-3 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/20 text-xs font-semibold text-[#7C7267] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>{previewTemplate.compatibilities.length} Ceremonial Opening Styles Supported</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                <Link
                  href={`/create?template=${previewTemplate.slug}`}
                  className="w-full py-3.5 px-6 rounded-full bg-[#8C4A52] text-white font-bold text-sm shadow-md hover:bg-[#7a3e45] transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Create Invitation with this Design</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="w-full py-2.5 text-xs text-[#7C7267] hover:text-[#2C2623] font-semibold transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
