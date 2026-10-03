import { Skeleton, CardSkeleton } from "@/components/Skeleton";

export default function TemplatesLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans">
      {/* Header Placeholder */}
      <div className="w-full px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#FAF8F5]/90">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 pb-8 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        <Skeleton className="h-10 sm:h-14 w-3/4 max-w-lg mb-4 rounded-xl" />
        <Skeleton className="h-4 w-5/6 max-w-md mb-2" />
        <Skeleton className="h-4 w-2/3 max-w-sm" />
      </section>

      {/* Category Filter Skeleton */}
      <section className="px-4 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          <Skeleton className="h-9 w-28 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </section>

      {/* Templates Grid Skeleton */}
      <main className="px-4 sm:px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
