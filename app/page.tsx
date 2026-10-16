import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let categories;
  let templates;
  let animations;

  try {
    [categories, templates, animations] = await Promise.all([
      prisma.eventCategory.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.template.findMany({
        where: { isActive: true },
        include: {
          category: true,
          compatibilities: {
            include: { animation: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.animation.findMany({
        where: { isActive: true },
      }),
    ]);
  } catch (error) {
    console.error("[HomePage] Failed to fetch homepage data from database:", error);
    throw new Error("Unable to load invitation templates and categories. Please try again.");
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans overflow-x-clip selection:bg-[#D4AF37]/30">
      <Header />
      <HomeClient categories={categories} templates={templates} animations={animations} />
    </div>
  );
}
