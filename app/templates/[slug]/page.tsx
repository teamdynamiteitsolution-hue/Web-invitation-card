import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Sparkles, ArrowRight, Star, Palette, Maximize, Smartphone } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default async function TemplatePreviewPage({ params }: { params: { slug: string } }) {
  const template = await prisma.template.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      compatibilities: {
        include: { animation: true }
      }
    }
  });

  if (!template) {
    return notFound();
  }

  // Use a placeholder or provided video URL from an animation, if available
  const previewVideo = template.compatibilities?.[0]?.animation?.videoUrl || null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      <Header />
      
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/templates" className="inline-flex items-center gap-2 text-[#7C7267] hover:text-[#2C2623] transition-colors mb-8 text-sm font-bold">
          ← Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Visual Preview */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-[9/16] max-h-[70vh] rounded-[32px] overflow-hidden shadow-floating-ceremony bg-gray-100 border border-gray-200">
              <img 
                src={template.previewImageUrl} 
                alt={template.name} 
                className="w-full h-full object-cover"
              />
              {template.isFeatured && (
                <div className="absolute top-4 left-4 z-10 bg-[#D4AF37]/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" /> Featured Collection
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Template Details */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#F9F0EC]/80 text-[#8C4A52] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              {template.category.name}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C2623] mb-6 leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
              {template.name}
            </h1>
            
            <p className="text-lg text-[#7C7267] font-serif mb-8 leading-relaxed italic border-l-4 border-[#D4AF37] pl-4">
              {template.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-[#2C2623]">৳{template.price}</span>
              <span className="text-sm font-semibold text-[#7C7267] px-3 py-1 bg-white rounded-full border border-gray-200">One-time payment</span>
            </div>

            <Link href={`/create?template=${template.slug}`} className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] hover:shadow-floating-ceremony transition-all active:scale-95 flex items-center justify-center gap-3 text-lg mb-10">
              <Sparkles className="w-5 h-5" />
              <span>Create Invitation with this Theme</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#2C2623] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Features included</h3>
              <ul className="space-y-4">
                {[
                  { icon: <Palette className="w-5 h-5 text-[#D4AF37]" />, text: "Fully customizable typography & colors" },
                  { icon: <Maximize className="w-5 h-5 text-[#D4AF37]" />, text: `${template.compatibilities.length} opening experiences available` },
                  { icon: <Smartphone className="w-5 h-5 text-[#D4AF37]" />, text: "Perfect mobile & desktop optimization" },
                  { icon: <Star className="w-5 h-5 text-[#D4AF37]" />, text: "Instant WhatsApp & Mobile Sharing" },
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[#7C7267] font-serif">
                    <div className="bg-[#FAF8F5] p-2 rounded-full border border-[#D4AF37]/20">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
