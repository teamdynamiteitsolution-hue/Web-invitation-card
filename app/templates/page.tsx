import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";

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
      <section className="pt-10 sm:pt-16 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Cinzel, serif' }}>
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
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${!currentCategorySlug ? 'bg-[#2C2623] text-white shadow-elevated-card' : 'bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC] shadow-soft-surface'}`}
          >
            All Collections
          </Link>
          {categories.map(c => (
            <Link 
              key={c.id}
              href={`/templates?category=${c.slug}`}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${currentCategorySlug === c.slug ? 'bg-[#2C2623] text-white shadow-elevated-card' : 'bg-white border border-[#D4AF37]/30 text-[#7C7267] hover:bg-[#F9F0EC] shadow-soft-surface'}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Templates Grid - Responsive 2 columns on Mobile, 3 on Tablet, 4 on Desktop */}
      <section className="px-4 sm:px-6 md:px-12 pb-24 sm:pb-32 max-w-7xl mx-auto">
        {templates.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-[#D4AF37]/20 shadow-soft-surface">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ fontFamily: 'Cinzel, serif' }}>No Templates Found</h3>
            <p className="text-[#7C7267] font-serif italic text-sm">More ceremonial collections are coming soon to this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {templates.map(template => (
              <div key={template.id} className="group relative bg-white rounded-2xl sm:rounded-[24px] border border-[#D4AF37]/20 overflow-hidden shadow-soft-surface hover:shadow-floating-ceremony transition-all duration-500 flex flex-col">
                
                {/* Visual Preview */}
                <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#F9F0EC] to-[#E8D8D0] overflow-hidden flex items-center justify-center p-3 sm:p-6">
                  <div className="absolute inset-0 bg-[url('/assets/textures/handmade-fiber.webp')] opacity-40 mix-blend-multiply pointer-events-none" />
                  
                  <img 
                    src={template.previewImageUrl} 
                    alt={template.name} 
                    className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
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
                      <span className="text-[10px] sm:text-xs font-bold text-[#8C4A52] uppercase tracking-wider truncate">{template.category.name}</span>
                      <span className="text-xs sm:text-sm font-bold text-[#2C2623]" style={{ fontFamily: 'Cinzel, serif' }}>
                        ৳{template.price}
                      </span>
                    </div>
                    
                    <h3 className="text-sm sm:text-lg font-bold text-[#2C2623] mb-1 sm:mb-2 line-clamp-1" style={{ fontFamily: 'Cinzel, serif' }}>
                      {template.name}
                    </h3>
                    
                    <p className="text-xs font-serif italic text-[#7C7267] mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
                      {template.description}
                    </p>
                  </div>
                  
                  <div className="pt-2.5 sm:pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-semibold text-[#7C7267] truncate">
                      {template.compatibilities.length} Styles
                    </span>
                    
                    <Link href={`/create?template=${template.slug}`} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#F9F0EC] text-[#2C2623] border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#8C4A52] group-hover:text-white transition-colors shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
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
