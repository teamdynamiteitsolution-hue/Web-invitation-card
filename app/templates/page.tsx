import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";

const prisma = new PrismaClient();
export const revalidate = 3600;

export default async function TemplatesPage({ searchParams }: { searchParams: { category?: string } }) {
  const currentCategorySlug = searchParams.category;

  const categories = await prisma.eventCategory.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  const templates = await prisma.template.findMany({
    where: currentCategorySlug ? { category: { slug: currentCategorySlug } } : undefined,
    include: {
      category: true,
      compatibilities: {
        include: { animation: true }
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
          Premium Invitation Collections
        </h1>
        <p className="text-[#7C7267] font-serif text-lg italic max-w-2xl mx-auto leading-relaxed">
          Choose a professionally art-directed master template. Each collection is designed to be personalized within bounded stylistic rules to ensure a flawless final result.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          <Link 
            href="/templates"
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${!currentCategorySlug ? 'bg-[#2C2623] text-white shadow-elevated-card' : 'bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC] shadow-soft-surface'}`}
          >
            All Collections
          </Link>
          {categories.map(c => (
            <Link 
              key={c.id}
              href={`/templates?category=${c.slug}`}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${currentCategorySlug === c.slug ? 'bg-[#2C2623] text-white shadow-elevated-card' : 'bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC] shadow-soft-surface'}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Templates Grid */}
      <section className="px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        {templates.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#D4AF37]/20 shadow-soft-surface">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Cinzel, serif' }}>No Templates Found</h3>
            <p className="text-[#7C7267] font-serif italic">More ceremonial collections are coming soon to this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {templates.map(template => (
              <div key={template.id} className="group relative bg-white rounded-[24px] border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface hover:shadow-floating-ceremony transition-all duration-500 flex flex-col">
                
                {/* Visual Preview */}
                <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#F9F0EC] to-[#E8D8D0] overflow-hidden flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
                  
                  <img 
                    src={template.previewImageUrl} 
                    alt={template.name} 
                    className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {template.isFeatured && (
                    <div className="absolute top-4 right-4 bg-[#8C4A52] text-[#F9F0D0] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#8C4A52] uppercase tracking-wider">{template.category.name}</span>
                    <span className="text-sm font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                      ৳{template.price}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#2C2623] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
                    {template.name}
                  </h3>
                  
                  <p className="text-sm font-serif italic text-[#7C7267] mb-6 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-xs font-semibold text-[#7C7267]">
                        {template.compatibilities.length} Experiences
                      </span>
                    </div>
                    
                    <Link href={`/create?template=${template.slug}`} className="w-10 h-10 rounded-full bg-[#F9F0EC] text-[#2C2623] border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#8C4A52] group-hover:text-white transition-colors shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
