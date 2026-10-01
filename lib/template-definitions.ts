export interface ImageSlot {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
}

export interface TemplateDefinition {
  id: string;
  slug: string;
  name: string;
  description: string;
  experienceType: 'dynamic_card' | 'SCROLL' | 'IMMERSIVE' | 'HYBRID' | 'envelope' | 'curtain' | 'multi_scratch' | string;
  compositionId: string;
  previewImageUrl: string;
  imageSlots: ImageSlot[];
  textSlots: string[];
}

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  {
    id: 'tmpl-01-classic-editorial',
    slug: 'classic-editorial',
    name: 'Classic Editorial',
    description: 'Elegant centered composition with luxury frame and floral decoration.',
    experienceType: 'dynamic_card',
    compositionId: 'classic_editorial',
    previewImageUrl: '/assets/Cards/card 1.png',
    imageSlots: [],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date', 'venue']
  },
  {
    id: 'tmpl-02-arch-portrait',
    slug: 'arch-portrait',
    name: 'Arch Portrait',
    description: 'Couple photo framed in an elegant architectural arch with romantic typography.',
    experienceType: 'dynamic_card',
    compositionId: 'arch_portrait',
    previewImageUrl: '/assets/Cards/card 2.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple Photo', description: 'Clipped in an elegant arch frame', required: true }
    ],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date', 'venue']
  },
  {
    id: 'tmpl-03-botanical-luxury',
    slug: 'botanical-luxury',
    name: 'Botanical Luxury',
    description: 'Floral frame with dynamic monogram initials and palace illustration.',
    experienceType: 'dynamic_card',
    compositionId: 'botanical_luxury',
    previewImageUrl: '/assets/Cards/card 3.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple Photo (Optional)', description: 'Displayed in central portrait circle if provided', required: false }
    ],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date', 'venue']
  },
  {
    id: 'tmpl-04-split-couple',
    slug: 'split-couple',
    name: 'Split Couple',
    description: 'Bride and groom side-by-side in ornate arched frames.',
    experienceType: 'dynamic_card',
    compositionId: 'split_couple_portraits',
    previewImageUrl: '/assets/Cards/card 4.png',
    imageSlots: [
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Groom portrait inside left arch', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Bride portrait inside right arch', required: true }
    ],
    textSlots: ['groomName', 'brideName', 'date', 'venue']
  },
  {
    id: 'tmpl-05-minimal-luxury',
    slug: 'minimal-luxury',
    name: 'Minimal Luxury',
    description: 'Clean minimal design with dynamic monogram and generous editorial whitespace.',
    experienceType: 'dynamic_card',
    compositionId: 'minimal_luxury',
    previewImageUrl: '/assets/Cards/card 5.png',
    imageSlots: [],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date']
  },
  {
    id: 'tmpl-06-cinematic',
    slug: 'cinematic',
    name: 'Cinematic Scene',
    description: 'Dramatic lighting, majestic backdrop arch, and atmospheric couple overlay.',
    experienceType: 'dynamic_card',
    compositionId: 'cinematic_scene',
    previewImageUrl: '/assets/Cards/card 2.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple Photo', description: 'Atmospheric scene blend inside palace arch', required: true }
    ],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date']
  },
  {
    id: 'tmpl-07-romantic-center',
    slug: 'romantic-center',
    name: 'Romantic Center',
    description: 'Soft floral frame with romantic centered script typography.',
    experienceType: 'dynamic_card',
    compositionId: 'romantic_center_script',
    previewImageUrl: '/assets/Cards/card 1.png',
    imageSlots: [],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date']
  },
  {
    id: 'tmpl-08-scroll-experience',
    slug: 'scroll-experience',
    name: 'Royal Heritage Scroll',
    description: 'Vertical luxury storytelling experience in royal ivory and gold with multi-layered sections.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/Cards/card 3.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Photo (Optional)', description: 'Shown in the opening hero presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Shown in the Couple section', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Shown in the Couple section', required: true },
      { id: 'gallery1', label: 'Gallery Photo 1', description: 'Photo in the interactive gallery grid', required: true },
      { id: 'gallery2', label: 'Gallery Photo 2', description: 'Photo in the interactive gallery grid', required: true },
      { id: 'gallery3', label: 'Gallery Photo 3', description: 'Photo in the interactive gallery grid', required: true },
      { id: 'gallery4', label: 'Gallery Photo 4', description: 'Photo in the interactive gallery grid', required: true }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-09-botanical-scroll',
    slug: 'botanical-scroll',
    name: 'Botanical Emerald Scroll',
    description: 'Fresh emerald and sage floral scroll experience with distinct garden styling.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/Cards/card 5.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Photo (Optional)', description: 'Shown in the opening hero presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Shown in the Couple section', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Shown in the Couple section', required: true },
      { id: 'gallery1', label: 'Gallery Photo 1', description: 'Photo in the interactive gallery grid', required: true },
      { id: 'gallery2', label: 'Gallery Photo 2', description: 'Photo in the interactive gallery grid', required: true },
      { id: 'gallery3', label: 'Gallery Photo 3', description: 'Photo in the interactive gallery grid', required: true },
      { id: 'gallery4', label: 'Gallery Photo 4', description: 'Photo in the interactive gallery grid', required: true }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-10-royal-envelope',
    slug: 'royal-envelope',
    name: 'Royal Wax Seal Envelope',
    description: '3D wax seal break and royal invitation card slide ceremony.',
    experienceType: 'envelope',
    compositionId: 'classic_editorial',
    previewImageUrl: '/assets/Cards/card 1.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple Photo', description: 'Card portrait photo', required: false }
    ],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date', 'venue']
  },
  {
    id: 'tmpl-11-theatrical-curtain',
    slug: 'theatrical-curtain',
    name: 'Theatrical Silk Curtain',
    description: 'Majestic red and gold velvet curtain parting reveal.',
    experienceType: 'curtain',
    compositionId: 'arch_portrait',
    previewImageUrl: '/assets/Cards/card 2.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple Photo', description: 'Arched portrait inside curtain reveal', required: true }
    ],
    textSlots: ['eventLabel', 'brideName', 'groomName', 'date', 'venue']
  },
  {
    id: 'tmpl-12-haldi-scratch',
    slug: 'haldi-scratch',
    name: 'Festive Multi-Scratch',
    description: 'Interactive golden foil scratch revealing wedding date, time and venue.',
    experienceType: 'multi_scratch',
    compositionId: 'split_couple_portraits',
    previewImageUrl: '/assets/Cards/card 4.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple Photo', description: 'Celebration header photo', required: true }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue']
  }
];

export const getTemplateById = (id: string | null) => {
  return TEMPLATE_DEFINITIONS.find(t => t.id === id || t.slug === id);
};
