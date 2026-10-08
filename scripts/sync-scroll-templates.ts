import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Syncing all 13 Scroll Templates into database...');

  const weddingCat = await prisma.eventCategory.findFirst({ where: { slug: 'wedding' } });
  const haldiCat = await prisma.eventCategory.findFirst({ where: { slug: 'haldi' } });
  const boubhatCat = await prisma.eventCategory.findFirst({ where: { slug: 'boubhat' } });
  const birthdayCat = await prisma.eventCategory.findFirst({ where: { slug: 'birthday' } });
  const anniversaryCat = await prisma.eventCategory.findFirst({ where: { slug: 'anniversary' } });

  const templates = [
    {
      slug: 'royal-grandeur-scroll',
      name: 'The Royal Grandeur',
      description: 'Majestic royal palace archway, gold foil detailing, monogram seal, and full ceremonial itinerary.',
      categoryId: weddingCat?.id || '',
      price: 2000.0,
      previewImageUrl: '/assets/categories/wedding.webp',
      archetype: 'royal_heritage',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/wedding.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'royal_gold' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: true
    },
    {
      slug: 'modern-editorial-scroll',
      name: 'Modern Editorial Vogue',
      description: 'High-fashion editorial magazine layout with asymmetric typography and minimalist storytelling.',
      categoryId: anniversaryCat?.id || weddingCat?.id || '',
      price: 2200.0,
      previewImageUrl: '/assets/categories/anniversary.webp',
      archetype: 'minimal_editorial',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/anniversary.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'editorial_minimal' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'golden-haldi-scroll',
      name: 'Festive Marigold Dhol',
      description: 'Vibrant turmeric yellow and marigold celebration scroll with Haldi, Mehendi and Sangeet rituals.',
      categoryId: haldiCat?.id || '',
      price: 1800.0,
      previewImageUrl: '/assets/categories/haldi.webp',
      archetype: 'festive_haldi',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/haldi.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'festive_gold' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: true
    },
    {
      slug: 'celestial-midnight-scroll',
      name: 'Celestial Midnight Aurora',
      description: 'Deep midnight navy, starlight constellation monogram, and luminous night reception itinerary.',
      categoryId: birthdayCat?.id || weddingCat?.id || '',
      price: 2500.0,
      previewImageUrl: '/assets/categories/birthday.webp',
      archetype: 'cinematic',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/birthday.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'midnight_aurora' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'botanical-meadow-scroll',
      name: 'Botanical Meadow & Glass',
      description: 'Romantic sage green and blush pink garden wedding scroll with frosted glassmorphism accents.',
      categoryId: boubhatCat?.id || weddingCat?.id || '',
      price: 2100.0,
      previewImageUrl: '/assets/categories/boubhat.webp',
      archetype: 'botanical_luxury',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/boubhat.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'sage_garden' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'scroll-experience',
      name: 'Royal Heritage Scroll',
      description: 'Vertical luxury storytelling experience in royal ivory and gold with multi-layered sections.',
      categoryId: weddingCat?.id || '',
      price: 2000.0,
      previewImageUrl: '/assets/categories/wedding.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/wedding.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'scroll' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'botanical-scroll',
      name: 'Botanical Emerald Scroll',
      description: 'Fresh emerald and sage floral scroll experience with distinct garden styling.',
      categoryId: boubhatCat?.id || weddingCat?.id || '',
      price: 2200.0,
      previewImageUrl: '/assets/categories/boubhat.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/boubhat.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'sage' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'haldi-scroll',
      name: 'Golden Haldi Fiesta Scroll',
      description: 'Vibrant marigold yellow and golden celebration scroll designed specially for Gaye Holud, Mehendi and Sangeet.',
      categoryId: haldiCat?.id || '',
      price: 1800.0,
      previewImageUrl: '/assets/categories/haldi.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/haldi.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'gold' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'birthday-scroll',
      name: 'Celestial Birthday Glow Scroll',
      description: 'Enchanting midnight violet, gold confetti and birthday milestones with interactive wish counter.',
      categoryId: birthdayCat?.id || weddingCat?.id || '',
      price: 1500.0,
      previewImageUrl: '/assets/categories/birthday.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/birthday.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'violet' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'corporate-scroll',
      name: 'Corporate Prestige Summit Scroll',
      description: 'Executive deep navy and platinum scroll experience crafted for corporate galas and annual summits.',
      categoryId: anniversaryCat?.id || weddingCat?.id || '',
      price: 2500.0,
      previewImageUrl: '/assets/categories/anniversary.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/anniversary.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'navy' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'velvet-scroll',
      name: 'Ruby Velvet Romance Scroll',
      description: 'Deep crimson velvet and champagne gold opulent scroll for grand wedding receptions.',
      categoryId: boubhatCat?.id || weddingCat?.id || '',
      price: 2400.0,
      previewImageUrl: '/assets/categories/boubhat.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/boubhat.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'crimson' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'floral-romance-scroll',
      name: 'Floral Romance Luxury Scroll',
      description: 'Enchanting floral animated scroll invitation with timeline itinerary and countdown.',
      categoryId: weddingCat?.id || '',
      price: 2100.0,
      previewImageUrl: '/assets/categories/wedding.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/wedding.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'rose' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'editorial-botanical-scroll',
      name: 'Editorial Botanical Scroll',
      description: 'Modern editorial typography with botanical framed portrait and minimalist story layout.',
      categoryId: weddingCat?.id || '',
      price: 2200.0,
      previewImageUrl: '/assets/categories/wedding.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/wedding.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'olive' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'cinematic-story-scroll',
      name: 'Cinematic Story Scroll',
      description: 'Dramatic full-screen visual storytelling with dark cinematic mood.',
      categoryId: weddingCat?.id || '',
      price: 2600.0,
      previewImageUrl: '/assets/categories/wedding.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/wedding.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'dark_gold' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    },
    {
      slug: 'botanical-magazine-scroll',
      name: 'Botanical Magazine Scroll',
      description: 'High-fashion magazine layout with asymmetric botanical cutouts and earth tones.',
      categoryId: boubhatCat?.id || weddingCat?.id || '',
      price: 2300.0,
      previewImageUrl: '/assets/categories/boubhat.webp',
      archetype: 'scroll_story',
      experienceType: 'SCROLL',
      assetManifest: JSON.stringify({ cardAsset: '/assets/categories/boubhat.webp', decorations: [] }),
      visualIdentity: JSON.stringify({ theme: 'earth' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({}),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      isActive: true,
      isFeatured: false
    }
  ];

  for (const t of templates) {
    if (!t.categoryId) continue;
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: {
        name: t.name,
        description: t.description,
        categoryId: t.categoryId,
        price: t.price,
        previewImageUrl: t.previewImageUrl,
        archetype: t.archetype,
        experienceType: t.experienceType,
        assetManifest: t.assetManifest,
        visualIdentity: t.visualIdentity,
        isActive: t.isActive,
        isFeatured: t.isFeatured
      },
      create: t
    });
    console.log(`Synced template: ${t.name} (${t.slug})`);
  }

  console.log('All scroll templates successfully synced!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
