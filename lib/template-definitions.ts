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
  category?: 'wedding' | 'holud' | 'birthday' | 'corporate' | 'reception' | 'party' | string;
  experienceType: 'dynamic_card' | 'SCROLL' | 'IMMERSIVE' | 'HYBRID' | 'envelope' | 'curtain' | 'multi_scratch' | string;
  compositionId: string;
  previewImageUrl: string;
  imageSlots: ImageSlot[];
  textSlots: string[];
}

export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  {
    id: 'tmpl-01-royal-grandeur',
    slug: 'patachitra-royal-scroll',
    name: 'The Royal Grandeur Scroll',
    category: 'wedding',
    description: 'Majestic royal palace archway, gold foil detailing, monogram seal, and full ceremonial itinerary.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/wedding.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Photo (Optional)', description: 'Shown in the opening hero presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Shown in the Couple section', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Shown in the Couple section', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-02-modern-editorial',
    slug: 'modern-editorial-scroll',
    name: 'Modern Editorial Vogue Scroll',
    category: 'reception',
    description: 'High-fashion editorial magazine layout with asymmetric typography and minimalist storytelling.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/anniversary.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Cover Couple Photo', description: 'Editorial cover image', required: false },
      { id: 'bridePhoto', label: 'Bride Portrait', description: 'Profile feature', required: true },
      { id: 'groomPhoto', label: 'Groom Portrait', description: 'Profile feature', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-03-golden-haldi',
    slug: 'carnival-haldi-scroll',
    name: 'Festive Marigold Dhol Scroll',
    category: 'holud',
    description: 'Vibrant turmeric yellow and marigold celebration scroll with Haldi, Mehendi and Sangeet rituals.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/haldi.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Celebration Hero Photo', description: 'Festive hero banner photo', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Holud portrait', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Holud portrait', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-04-celestial-midnight',
    slug: 'cosmic-midnight-scroll',
    name: 'Celestial Midnight Aurora Scroll',
    category: 'birthday',
    description: 'Deep midnight navy, starlight constellation monogram, and luminous night reception itinerary.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/birthday.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Starlight Hero Portrait', description: 'Main night portrait', required: false },
      { id: 'bridePhoto', label: 'The Star / Bride Photo', description: 'Portrait feature', required: true },
      { id: 'groomPhoto', label: 'Partner / Groom Photo', description: 'Portrait feature', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-05-botanical-meadow',
    slug: 'scrapbook-botanical-scroll',
    name: 'Botanical Meadow Scrapbook Scroll',
    category: 'wedding',
    description: 'Romantic sage green and pressed botanical herbarium scroll with handcrafted scrapbook accents.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/boubhat.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Garden Hero Photo', description: 'Garden celebration photo', required: false },
      { id: 'bridePhoto', label: 'Bride Garden Portrait', description: 'Bride portrait', required: true },
      { id: 'groomPhoto', label: 'Groom Garden Portrait', description: 'Groom portrait', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-08-scroll-experience',
    slug: 'scroll-experience',
    name: 'Royal Heritage Scroll',
    category: 'wedding',
    description: 'Vertical luxury storytelling experience in royal ivory and gold with multi-layered sections.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/wedding.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Photo (Optional)', description: 'Shown in the opening hero presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Shown in the Couple section', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Shown in the Couple section', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-09-botanical-scroll',
    slug: 'botanical-scroll',
    name: 'Botanical Emerald Scroll',
    category: 'wedding',
    description: 'Fresh emerald and sage floral scroll experience with distinct garden styling.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/boubhat.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Photo (Optional)', description: 'Shown in the opening hero presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Shown in the Couple section', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Shown in the Couple section', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-13-haldi-scroll',
    slug: 'haldi-scroll',
    name: 'Golden Haldi Fiesta Scroll',
    category: 'holud',
    description: 'Vibrant marigold yellow and golden celebration scroll designed specially for Gaye Holud, Mehendi and Sangeet.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/haldi.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Celebration Hero Photo', description: 'Festive hero banner photo', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Celebration couple portrait', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Celebration couple portrait', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-14-birthday-scroll',
    slug: 'birthday-scroll',
    name: 'Celestial Birthday Glow Scroll',
    category: 'birthday',
    description: 'Enchanting midnight violet, gold confetti and birthday milestones with interactive wish counter.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/birthday.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Birthday Star Portrait', description: 'Main portrait for the birthday star', required: false },
    ],
    textSlots: ['personName', 'turningAge', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-15-corporate-scroll',
    slug: 'corporate-scroll',
    name: 'Corporate Prestige Summit Scroll',
    category: 'corporate',
    description: 'Executive deep navy and platinum scroll experience crafted for corporate galas and annual summits.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/anniversary.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Keynote / Event Banner Photo', description: 'Main summit banner or executive photo', required: false },
    ],
    textSlots: ['brideName', 'groomName', 'eventLabel', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-16-velvet-scroll',
    slug: 'velvet-scroll',
    name: 'Ruby Velvet Romance Scroll',
    category: 'reception',
    description: 'Deep crimson velvet and champagne gold opulent scroll for grand wedding receptions.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/boubhat.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Portrait', description: 'Opening ceremony presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Royal couple showcase', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Royal couple showcase', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-17-floral-romance-scroll',
    slug: 'floral-romance-scroll',
    name: 'Floral Romance Luxury Scroll',
    category: 'wedding',
    description: 'Enchanting floral animated scroll invitation with timeline itinerary and countdown.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/wedding.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Featured venue / couple illustration or photo', required: false }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-18-editorial-botanical-scroll',
    slug: 'editorial-botanical-scroll',
    name: 'Editorial Botanical Scroll',
    category: 'wedding',
    description: 'Modern editorial typography with botanical framed portrait and minimalist story layout.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/wedding.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Main botanical arch portrait', required: false },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'The Bride portrait showcase', required: true },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'The Groom portrait showcase', required: true }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'eventLabel']
  },
  {
    id: 'tmpl-19-cinematic-story-scroll',
    slug: 'cinematic-story-scroll',
    name: 'Cinematic Story Scroll',
    category: 'wedding',
    description: 'Dramatic full-screen visual storytelling with dark cinematic mood.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/wedding.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Main cinematic opening portrait', required: false },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Bride portrait feature', required: true },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Groom portrait feature', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'eventLabel']
  },
  {
    id: 'tmpl-20-botanical-magazine-scroll',
    slug: 'botanical-magazine-scroll',
    name: 'Botanical Magazine Scroll',
    category: 'wedding',
    description: 'High-fashion magazine layout with asymmetric botanical cutouts and earth tones.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/categories/boubhat.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Magazine cover opening portrait', required: false },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Meet the couple - Bride portrait', required: true },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Meet the couple - Groom portrait', required: true },
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'eventLabel']
  }
];

export const getTemplateById = (id: string | null): TemplateDefinition | undefined => {
  if (!id) return undefined;
  const lower = id.toLowerCase();
  return TEMPLATE_DEFINITIONS.find(t => 
    t.id.toLowerCase() === lower || 
    t.slug.toLowerCase() === lower
  );
};
