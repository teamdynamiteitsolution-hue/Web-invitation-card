import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Header } from "@/components/Header";
import { CheckCircle2, ArrowRight } from "lucide-react";

const prisma = new PrismaClient();
export const revalidate = 3600;

export default async function PricingPage() {
  const durations = await prisma.durationTier.findMany({ orderBy: { days: 'asc' } });
  const animations = await prisma.animation.findMany({ orderBy: { price: 'asc' } });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          Transparent, Modular Pricing
        </h1>
        <p className="text-[#7C7267] font-serif text-lg italic max-w-2xl mx-auto leading-relaxed">
          You only pay for exactly what you build. Our pricing is calculated dynamically based on your chosen template, interactive opening experience, background, and hosting duration.
        </p>
      </section>

      {/* Pricing Formula */}
      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-[32px] bg-white border border-[#D4AF37]/30 shadow-floating-ceremony flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex-1">
            <div className="text-sm font-bold text-[#8C4A52] uppercase tracking-widest mb-2">The Formula</div>
            <h3 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>How Your Price is Calculated</h3>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 font-serif text-[#7C7267] text-lg font-medium">
            <span className="px-4 py-2 rounded-xl bg-[#F9F0EC] shadow-inner-emboss">Template</span>
            <span className="text-[#D4AF37]">+</span>
            <span className="px-4 py-2 rounded-xl bg-[#F9F0EC] shadow-inner-emboss">Experience</span>
            <span className="text-[#D4AF37]">+</span>
            <span className="px-4 py-2 rounded-xl bg-[#F9F0EC] shadow-inner-emboss">Duration</span>
            <span className="text-[#D4AF37]">=</span>
            <span className="px-6 py-2 rounded-xl bg-[#2C2623] text-white font-bold shadow-elevated-card">Total</span>
          </div>

        </div>
      </section>

      {/* Pricing Breakdowns */}
      <section className="pb-32 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Durations */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center md:text-left" style={{ fontFamily: 'Cinzel, serif' }}>
            Hosting Durations
          </h3>
          <div className="space-y-4">
            {durations.map(d => (
              <div key={d.id} className="p-6 rounded-2xl bg-white border border-[#D4AF37]/20 shadow-soft-surface flex items-center justify-between hover:shadow-elevated-card transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9F0EC] flex items-center justify-center text-[#8C4A52] font-bold shadow-inner-emboss">
                    {d.days}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-[#2C2623]">{d.name}</div>
                    <div className="text-sm font-serif italic text-[#7C7267]">Secure URL access</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                  ৳{d.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experiences */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center md:text-left" style={{ fontFamily: 'Cinzel, serif' }}>
            Opening Experiences
          </h3>
          <div className="space-y-4">
            {animations.map(a => (
              <div key={a.id} className="p-6 rounded-2xl bg-[#2C2623] border border-[#D4AF37]/20 shadow-elevated-card flex items-center justify-between text-white hover:shadow-floating-ceremony transition-shadow">
                <div className="flex-1 pr-6">
                  <div className="font-bold text-lg text-[#F9F0D0] mb-1">{a.name}</div>
                  <div className="text-sm font-serif italic text-[#D8CFC4] line-clamp-2">{a.description}</div>
                </div>
                <div className="text-xl font-bold text-[#D4AF37] whitespace-nowrap" style={{ fontFamily: 'Cinzel, serif' }}>
                  {a.price === 0 ? 'Free' : `+ ৳${a.price}`}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-[#E8D8D0] text-center px-6">
        <h3 className="text-3xl font-bold mb-10 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
          Secure Local Payment Methods
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
          <div className="text-xl font-bold tracking-widest text-[#8C4A52]">bKash</div>
          <div className="text-xl font-bold tracking-widest text-[#E59E00]">Nagad</div>
          <div className="text-xl font-bold tracking-widest text-[#4A050D]">Rocket</div>
          <div className="text-xl font-bold tracking-widest text-[#22633D]">Card Gateway</div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
          Build It First. Pay Later.
        </h2>
        <p className="text-[#7C7267] font-serif text-lg mb-10 max-w-xl mx-auto">
          You can design, customize, and preview your entire interactive invitation for free. You only pay when you are ready to publish and share the link with your guests.
        </p>
        <Link href="/templates" className="inline-flex px-8 py-4 rounded-full bg-[#8C4A52] text-white font-bold shadow-elevated-card hover:bg-[#7a3e45] transition-all active:scale-95 items-center gap-3">
          <span>Start Designing</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
