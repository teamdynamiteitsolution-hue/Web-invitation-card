import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import TemplatesClient from "./TemplatesClient";

export const dynamic = "force-dynamic";

export default async function TemplatesPage({ searchParams }: { searchParams: { category?: string } }) {
  const currentCategorySlug = searchParams.category;

  const [categories, templates] = await Promise.all([
    prisma.eventCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.template.findMany({
      where: {
        isActive: true,
        experienceType: { notIn: ["scroll", "scroll_story", "SCROLL"] },
        NOT: { slug: { contains: "scroll" } },
        ...(currentCategorySlug ? { category: { slug: currentCategorySlug } } : {}),
      },
      include: {
        category: true,
        compatibilities: {
          include: { animation: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#D4AF37]/30">
      <Header />
      <TemplatesClient
        categories={categories}
        templates={templates}
        currentCategorySlug={currentCategorySlug}
      />
    </div>
  );
}
