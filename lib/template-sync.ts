import { PrismaClient } from "@prisma/client";
import { TEMPLATE_DEFINITIONS } from "./template-definitions";

const DEFAULT_SCROLL_PRICES: Record<string, number> = {
  "modern-editorial-scroll": 2200,
  "cosmic-midnight-scroll": 2500,
  "scrapbook-botanical-scroll": 2100,
  "scroll-experience": 2000,
  "botanical-scroll": 2200,
  "haldi-scroll": 1800,
  "birthday-scroll": 1500,
  "corporate-scroll": 2500,
  "velvet-scroll": 2400,
  "floral-romance-scroll": 2100,
  "editorial-botanical-scroll": 2200,
  "cinematic-story-scroll": 2600,
  "botanical-magazine-scroll": 2300,
};

/**
 * Ensures all registered scroll templates from TEMPLATE_DEFINITIONS exist in the database.
 * This function is fully idempotent:
 * - If a template already exists, its database record and custom price are untouched.
 * - If a template is missing from the database, it is created with default configurations.
 */
export async function ensureScrollTemplatesInDb(prisma: PrismaClient) {
  const scrollDefs = TEMPLATE_DEFINITIONS.filter(
    (t) => (t.experienceType || "").toUpperCase() === "SCROLL"
  );

  if (scrollDefs.length === 0) return;

  // 1. Fetch existing templates and categories
  const [existingTemplates, categories] = await Promise.all([
    prisma.template.findMany({
      where: {
        slug: { in: scrollDefs.map((s) => s.slug) },
      },
      select: { id: true, slug: true, price: true },
    }),
    prisma.eventCategory.findMany({
      select: { id: true, slug: true },
    }),
  ]);

  const existingSlugSet = new Set(existingTemplates.map((t) => t.slug));

  const catMap = new Map<string, string>();
  for (const c of categories) {
    catMap.set(c.slug.toLowerCase(), c.id);
  }
  const fallbackCatId =
    catMap.get("wedding") || (categories.length > 0 ? categories[0].id : "");

  if (!fallbackCatId) {
    console.warn("ensureScrollTemplatesInDb: No categories found in database.");
    return;
  }

  // 2. Identify missing scroll templates
  const missingDefs = scrollDefs.filter((def) => !existingSlugSet.has(def.slug));

  if (missingDefs.length === 0) {
    return;
  }

  // 3. Create missing templates safely
  for (const def of missingDefs) {
    const rawCategory = (def.category || "wedding").toLowerCase();
    const categoryId =
      catMap.get(rawCategory) ||
      (rawCategory === "holud" ? catMap.get("haldi") : null) ||
      (rawCategory === "haldi" ? catMap.get("holud") : null) ||
      (rawCategory === "reception" ? catMap.get("boubhat") : null) ||
      fallbackCatId;

    const initialPrice = DEFAULT_SCROLL_PRICES[def.slug] ?? 2000.0;

    try {
      await prisma.template.create({
        data: {
          slug: def.slug,
          name: def.name,
          description: def.description || "",
          categoryId,
          price: initialPrice,
          previewImageUrl: def.previewImageUrl || "/assets/categories/wedding.webp",
          archetype: "scroll_story",
          experienceType: "SCROLL",
          assetManifest: JSON.stringify({
            cardAsset: def.previewImageUrl || "/assets/categories/wedding.webp",
            decorations: [],
          }),
          visualIdentity: JSON.stringify({ theme: "scroll" }),
          openingConfig: JSON.stringify({}),
          layoutConfig: JSON.stringify({}),
          fieldsSchema: JSON.stringify({}),
          styleConstraints: JSON.stringify({}),
          isActive: true,
          isFeatured: false,
        },
      });
      existingSlugSet.add(def.slug);
    } catch (err: any) {
      // Gracefully handle race condition if another process created it concurrently
      if (err?.code !== "P2002") {
        console.error(`Error syncing scroll template '${def.slug}':`, err);
      }
    }
  }
}
