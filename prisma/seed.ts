import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial database...');

  // 1. Event Categories
  const categories = [
    { slug: 'wedding', name: 'বিয়ে (Wedding)', description: 'Two hearts, one beautiful journey.' },
    { slug: 'haldi', name: 'হলুদ (Haldi)', description: 'A splash of joy, a touch of tradition.' },
    { slug: 'boubhat', name: 'বৌভাত (Boubhat)', description: 'Food, family, endless celebration.' },
    { slug: 'akhd', name: 'আকদ (Akhd / Nikah)', description: 'A promise of forever.' },
    { slug: 'birthday', name: 'জন্মদিন (Birthday)', description: 'More life, more happiness.' },
    { slug: 'anniversary', name: 'বিবাহবার্ষিকী (Anniversary)', description: 'Still together, still better.' }
  ];

  for (let i = 0; i < categories.length; i++) {
    await prisma.eventCategory.upsert({
      where: { slug: categories[i].slug },
      update: {},
      create: { ...categories[i], sortOrder: i },
    });
  }
  
  const weddingCategory = await prisma.eventCategory.findUnique({ where: { slug: 'wedding' } });
  const haldiCategory = await prisma.eventCategory.findUnique({ where: { slug: 'haldi' } });
  const boubhatCategory = await prisma.eventCategory.findUnique({ where: { slug: 'boubhat' } });
  const akhdCategory = await prisma.eventCategory.findUnique({ where: { slug: 'akhd' } });
  const birthdayCategory = await prisma.eventCategory.findUnique({ where: { slug: 'birthday' } });
  const anniversaryCategory = await prisma.eventCategory.findUnique({ where: { slug: 'anniversary' } });

  // 2. Duration Tiers
  const durations = [
    { days: 15, name: '15 Days', price: 0, isDefault: true },
    { days: 30, name: '1 Month', price: 500, isDefault: false },
    { days: 45, name: '45 Days', price: 800, isDefault: false },
    { days: 90, name: '3 Months', price: 1500, isDefault: false },
  ];

  for (const d of durations) {
    await prisma.durationTier.upsert({
      where: { days: d.days },
      update: {},
      create: d,
    });
  }

  // 3. Animations (Opening Experiences)
  const animations = [
    {
      slug: 'pink-envelope-video',
      name: 'Pink Blush Envelope Video',
      description: 'Cinematic pre-rendered 3D opening of a blush pink envelope.',
      price: 0,
      previewPosterUrl: '/assets/Opening animation/ChatGPT Image Sep 28, 2026, 10_28_18 PM.png',
      pluginKey: 'video',
      interactionType: 'video',
      videoUrl: '/assets/Opening animation/Pink card animation.mp4'
    },
    {
      slug: 'cream-envelope-video',
      name: 'Cream Velvet Envelope Video',
      description: 'Elegant cream envelope cinematic 3D opening.',
      price: 0,
      previewPosterUrl: '/assets/Opening animation/ChatGPT Image Sep 28, 2026, 10_32_57 PM.png',
      pluginKey: 'video',
      interactionType: 'video',
      videoUrl: '/assets/Opening animation/Cream card animation.mp4'
    },
    {
      slug: 'sage-envelope-video',
      name: 'Sage Green Envelope Video',
      description: 'Soft sage green envelope cinematic 3D reveal.',
      price: 0,
      previewPosterUrl: '/assets/Opening animation/ChatGPT Image Sep 28, 2026, 10_33_02 PM.png',
      pluginKey: 'video',
      interactionType: 'video',
      videoUrl: '/assets/Opening animation/Sage Green card animation.mp4'
    }
  ];

  for (const a of animations) {
    await prisma.animation.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }

  const pinkAnim = await prisma.animation.findUnique({ where: { slug: 'pink-envelope-video' } });
  const creamAnim = await prisma.animation.findUnique({ where: { slug: 'cream-envelope-video' } });
  const sageAnim = await prisma.animation.findUnique({ where: { slug: 'sage-envelope-video' } });

  // 4. Backgrounds (Optional, user images or predefined)
  const backgrounds = [
    {
      name: 'Blush Warm Wash',
      previewUrl: '/assets/backgrounds/blush-warm/preview.webp',
      assetUrl: '/assets/backgrounds/blush-warm/soft-cream-wash.webp',
      theme: 'blush_warm',
      price: 0
    }
  ];

  for (const b of backgrounds) {
    const exists = await prisma.background.findFirst({ where: { name: b.name } });
    if (!exists) {
      await prisma.background.create({ data: b });
    }
  }

  // 5. Templates (Cards)
  const templates = [
    {
      slug: 'card-1',
      name: 'Elegant Blush Botanical',
      description: 'Soft blush floral design perfect for weddings and anniversaries.',
      categoryId: weddingCategory?.id || '',
      price: 1000.0,
      previewImageUrl: '/assets/Cards/card 1.png',
      archetype: 'floral_elegant',
      experienceType: 'dynamic_card',
      assetManifest: JSON.stringify({
        cardAsset: '/assets/Cards/card 1.png',
        decorations: [
          { asset: '/assets/Extra design/top mid purple flower.jpg', position: 'top-center' }
        ]
      }),
      visualIdentity: JSON.stringify({ theme: 'blush' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({
        nodes: [
          { id: 'bismillah', type: 'text', xPercent: 50, yPercent: 10, widthPercent: 80, align: 'center', default: 'Bismillahir Rahmanir Raheem' },
          { id: 'brideName', type: 'text', xPercent: 50, yPercent: 30, widthPercent: 80, align: 'center', fontSize: 32 },
          { id: 'groomName', type: 'text', xPercent: 50, yPercent: 40, widthPercent: 80, align: 'center', fontSize: 32 },
          { id: 'date', type: 'text', xPercent: 50, yPercent: 55, widthPercent: 80, align: 'center', fontSize: 18 },
          { id: 'venue', type: 'text', xPercent: 50, yPercent: 65, widthPercent: 80, align: 'center', fontSize: 14 }
        ]
      }),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      supportedRevealModes: JSON.stringify(["fade", "scratch", "scroll"]),
      supportedBgModes: JSON.stringify(["none", "user_image_blur"]),
      compatibilities: [pinkAnim, creamAnim]
    },
    {
      slug: 'card-2',
      name: 'Royal Heritage',
      description: 'A traditional royal look suited for weddings and grand boubhats.',
      categoryId: boubhatCategory?.id || '',
      price: 1500.0,
      previewImageUrl: '/assets/Cards/card 2.png',
      archetype: 'royal_heritage',
      experienceType: 'dynamic_card',
      assetManifest: JSON.stringify({
        cardAsset: '/assets/Cards/card 2.png',
        decorations: []
      }),
      visualIdentity: JSON.stringify({ theme: 'royal' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({
        nodes: [
          { id: 'bismillah', type: 'text', xPercent: 50, yPercent: 12, widthPercent: 80, align: 'center' },
          { id: 'brideName', type: 'text', xPercent: 50, yPercent: 35, widthPercent: 80, align: 'center', fontSize: 36 },
          { id: 'groomName', type: 'text', xPercent: 50, yPercent: 45, widthPercent: 80, align: 'center', fontSize: 36 },
          { id: 'date', type: 'text', xPercent: 50, yPercent: 60, widthPercent: 80, align: 'center' },
          { id: 'countdown', type: 'widget', xPercent: 50, yPercent: 75, widthPercent: 90, align: 'center' }
        ]
      }),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      supportedRevealModes: JSON.stringify(["fade", "scratch", "timed"]),
      supportedBgModes: JSON.stringify(["none"]),
      compatibilities: [creamAnim]
    },
    {
      slug: 'card-3',
      name: 'Sage Nikah',
      description: 'A serene and pure design for Akhd and Nikah ceremonies.',
      categoryId: akhdCategory?.id || '',
      price: 1200.0,
      previewImageUrl: '/assets/Cards/card 3.png',
      archetype: 'serene_sage',
      experienceType: 'dynamic_card',
      assetManifest: JSON.stringify({
        cardAsset: '/assets/Cards/card 3.png',
        decorations: [
          { asset: '/assets/Extra design/mid left roses.jpg', position: 'middle-left' }
        ]
      }),
      visualIdentity: JSON.stringify({ theme: 'sage' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({
        nodes: [
          { id: 'bismillah', type: 'text', xPercent: 50, yPercent: 15, widthPercent: 80, align: 'center' },
          { id: 'brideName', type: 'text', xPercent: 50, yPercent: 35, widthPercent: 80, align: 'center' },
          { id: 'groomName', type: 'text', xPercent: 50, yPercent: 45, widthPercent: 80, align: 'center' },
          { id: 'date', type: 'text', xPercent: 50, yPercent: 65, widthPercent: 80, align: 'center' }
        ]
      }),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      supportedRevealModes: JSON.stringify(["fade", "sequential"]),
      supportedBgModes: JSON.stringify(["none", "user_image_overlay"]),
      compatibilities: [sageAnim]
    },
    {
      slug: 'card-4',
      name: 'Golden Haldi Fest',
      description: 'Bright and festive for Haldi events.',
      categoryId: haldiCategory?.id || '',
      price: 1200.0,
      previewImageUrl: '/assets/Cards/card 4.png',
      archetype: 'festive_gold',
      experienceType: 'dynamic_card',
      assetManifest: JSON.stringify({
        cardAsset: '/assets/Cards/card 4.png',
        decorations: [
          { asset: '/assets/Extra design/bottom left yellow followr.jpg', position: 'bottom-left' }
        ]
      }),
      visualIdentity: JSON.stringify({ theme: 'gold' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({
        nodes: [
          { id: 'eventTitle', type: 'text', xPercent: 50, yPercent: 20, widthPercent: 80, align: 'center', default: 'Haldi Ceremony' },
          { id: 'brideName', type: 'text', xPercent: 50, yPercent: 40, widthPercent: 80, align: 'center' },
          { id: 'date', type: 'text', xPercent: 50, yPercent: 60, widthPercent: 80, align: 'center' },
          { id: 'venue', type: 'text', xPercent: 50, yPercent: 75, widthPercent: 80, align: 'center' }
        ]
      }),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      supportedRevealModes: JSON.stringify(["scratch", "fade"]),
      supportedBgModes: JSON.stringify(["none"]),
      compatibilities: [creamAnim, pinkAnim]
    },
    {
      slug: 'card-5',
      name: 'Burgundy Romance',
      description: 'Deep red tones perfect for intimate romantic celebrations.',
      categoryId: anniversaryCategory?.id || '',
      price: 1300.0,
      previewImageUrl: '/assets/Cards/card 5.png',
      archetype: 'romantic_burgundy',
      experienceType: 'dynamic_card',
      assetManifest: JSON.stringify({
        cardAsset: '/assets/Cards/card 5.png',
        decorations: []
      }),
      visualIdentity: JSON.stringify({ theme: 'burgundy' }),
      openingConfig: JSON.stringify({}),
      layoutConfig: JSON.stringify({
        nodes: [
          { id: 'coupleNames', type: 'text', xPercent: 50, yPercent: 30, widthPercent: 80, align: 'center' },
          { id: 'date', type: 'text', xPercent: 50, yPercent: 50, widthPercent: 80, align: 'center' },
          { id: 'message', type: 'text', xPercent: 50, yPercent: 65, widthPercent: 80, align: 'center' }
        ]
      }),
      fieldsSchema: JSON.stringify({}),
      styleConstraints: JSON.stringify({}),
      supportedRevealModes: JSON.stringify(["fade", "sequential"]),
      supportedBgModes: JSON.stringify(["none", "user_image_blur"]),
      compatibilities: [pinkAnim, creamAnim]
    }
  ];

  for (const t of templates) {
    if (!t.categoryId) continue;
    
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        name: t.name,
        description: t.description,
        categoryId: t.categoryId,
        price: t.price,
        previewImageUrl: t.previewImageUrl,
        archetype: t.archetype,
        experienceType: t.experienceType,
        assetManifest: t.assetManifest,
        visualIdentity: t.visualIdentity,
        openingConfig: t.openingConfig,
        layoutConfig: t.layoutConfig,
        fieldsSchema: t.fieldsSchema,
        styleConstraints: t.styleConstraints,
        supportedRevealModes: t.supportedRevealModes,
        supportedBgModes: t.supportedBgModes,
        compatibilities: {
          create: t.compatibilities.filter(Boolean).map(c => ({
            animationId: c!.id
          }))
        }
      }
    });
  }

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
