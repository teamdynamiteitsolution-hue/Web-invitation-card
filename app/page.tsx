import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import HomeClient from "./HomeClient";

export const revalidate = 3600; // Cache for 1 hour

export default async function HomePage() {
  const categories = await prisma.eventCategory.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  const templates = await prisma.template.findMany({
    include: { category: true }
  });

  const animations = await prisma.animation.findMany();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans overflow-x-clip selection:bg-[#D4AF37]/30">
      <Header />
      <HomeClient categories={categories} templates={templates} animations={animations} />
    </div>
  );
}
