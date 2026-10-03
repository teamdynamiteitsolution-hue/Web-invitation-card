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
    id: 'tmpl-01-classic-editorial',
    slug: 'classic-editorial',
    name: 'Classic Editorial',
    category: 'wedding',
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
    category: 'wedding',
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
    category: 'wedding',
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
    category: 'wedding',
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
    category: 'wedding',
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
    category: 'wedding',
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
    category: 'wedding',
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
    category: 'wedding',
    description: 'Vertical luxury storytelling experience in royal ivory and gold with multi-layered sections.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/scroll-previews/royal-heritage.webp',
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
    category: 'wedding',
    description: 'Fresh emerald and sage floral scroll experience with distinct garden styling.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/scroll-previews/botanical-emerald.webp',
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
    id: 'tmpl-13-haldi-scroll',
    slug: 'haldi-scroll',
    name: 'Golden Haldi Fiesta Scroll',
    category: 'holud',
    description: 'Vibrant marigold yellow and golden celebration scroll designed specially for Gaye Holud, Mehendi and Sangeet.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/scroll-previews/haldi-fiesta.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Celebration Hero Photo', description: 'Festive hero banner photo', required: false },
      { id: 'groomPhoto', label: 'Groom / Partner Photo', description: 'Celebration couple portrait', required: true },
      { id: 'bridePhoto', label: 'Bride / Star Photo', description: 'Celebration couple portrait', required: true },
      { id: 'gallery1', label: 'Haldi Moment 1', description: 'Photo gallery of yellow floral memories', required: true },
      { id: 'gallery2', label: 'Haldi Moment 2', description: 'Photo gallery of yellow floral memories', required: true },
      { id: 'gallery3', label: 'Haldi Moment 3', description: 'Photo gallery of yellow floral memories', required: true },
      { id: 'gallery4', label: 'Haldi Moment 4', description: 'Photo gallery of yellow floral memories', required: true }
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
    previewImageUrl: '/assets/scroll-previews/birthday-glow.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Birthday Star Portrait (মূল ছবি)', description: 'Main portrait for the birthday star', required: true },
      { id: 'gallery1', label: 'Memories Photo 1', description: 'Growing up and milestones photo gallery', required: false },
      { id: 'gallery2', label: 'Memories Photo 2', description: 'Growing up and milestones photo gallery', required: false },
      { id: 'gallery3', label: 'Memories Photo 3', description: 'Growing up and milestones photo gallery', required: false },
      { id: 'gallery4', label: 'Memories Photo 4', description: 'Growing up and milestones photo gallery', required: false }
    ],
    textSlots: ['personName', 'turningAge', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-15-corporate-scroll',
    slug: 'corporate-scroll',
    name: 'Corporate Prestige Summit Scroll',
    category: 'corporate',
    description: 'Executive deep navy and platinum scroll experience crafted for corporate galas, annual summits, conferences, and office launches.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/scroll-previews/corporate-prestige.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Keynote / Event Banner Photo', description: 'Main summit banner or executive photo', required: false },
      { id: 'gallery1', label: 'Summit Highlight 1', description: 'Key milestones or speaker preview', required: false },
      { id: 'gallery2', label: 'Summit Highlight 2', description: 'Key milestones or speaker preview', required: false },
      { id: 'gallery3', label: 'Summit Highlight 3', description: 'Key milestones or speaker preview', required: false },
      { id: 'gallery4', label: 'Summit Highlight 4', description: 'Key milestones or speaker preview', required: false }
    ],
    textSlots: ['brideName', 'eventLabel', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-16-velvet-scroll',
    slug: 'velvet-scroll',
    name: 'Ruby Velvet Romance Scroll',
    category: 'reception',
    description: 'Deep crimson velvet and champagne gold opulent scroll for grand wedding receptions and Royal Nikah evenings.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/scroll-previews/velvet-romance.webp',
    imageSlots: [
      { id: 'couplePhoto', label: 'Hero Couple Portrait', description: 'Opening ceremony presentation', required: false },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Royal couple showcase', required: true },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Royal couple showcase', required: true },
      { id: 'gallery1', label: 'Royal Moment 1', description: 'Photo in interactive moments grid', required: true },
      { id: 'gallery2', label: 'Royal Moment 2', description: 'Photo in interactive moments grid', required: true },
      { id: 'gallery3', label: 'Royal Moment 3', description: 'Photo in interactive moments grid', required: true },
      { id: 'gallery4', label: 'Royal Moment 4', description: 'Photo in interactive moments grid', required: true }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'rsvpContact']
  },
  {
    id: 'tmpl-17-floral-romance-scroll',
    slug: 'floral-romance-scroll',
    name: 'Floral Romance Luxury Scroll',
    category: 'wedding',
    description: 'Enchanting floral animated scroll invitation with timeline itinerary, countdown, venue guide, and elegant typography.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/Cards/card 1.png',
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
    description: 'Modern editorial typography with botanical framed portrait, subtle arches, and clean minimalist story layout.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/Cards/card 3.png',
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
    description: 'Dramatic full-screen visual storytelling with dark cinematic mood, chapter reveals, and immersive imagery.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/Cards/card 2.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Main cinematic opening portrait', required: false },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Bride portrait feature', required: true },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Groom portrait feature', required: true },
      { id: 'gallery1', label: 'Gallery 1', description: 'Story chapter memory frame 1', required: false },
      { id: 'gallery2', label: 'Gallery 2', description: 'Story chapter memory frame 2', required: false },
      { id: 'gallery3', label: 'Gallery 3', description: 'Story chapter memory frame 3', required: false },
      { id: 'gallery4', label: 'Gallery 4', description: 'Story chapter memory frame 4', required: false }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'eventLabel']
  },
  {
    id: 'tmpl-20-botanical-magazine-scroll',
    slug: 'botanical-magazine-scroll',
    name: 'Botanical Magazine Scroll',
    category: 'wedding',
    description: 'High-fashion magazine layout with asymmetric botanical cutouts, earth tones, and warm organic styling.',
    experienceType: 'SCROLL',
    compositionId: 'scroll_full_flow',
    previewImageUrl: '/assets/Cards/card 5.png',
    imageSlots: [
      { id: 'couplePhoto', label: 'Couple / Hero Photo', description: 'Magazine cover opening portrait', required: false },
      { id: 'bridePhoto', label: 'Bride Photo', description: 'Meet the couple - Bride portrait', required: true },
      { id: 'groomPhoto', label: 'Groom Photo', description: 'Meet the couple - Groom portrait', required: true },
      { id: 'gallery1', label: 'Gallery 1', description: 'Little moments editorial photo 1', required: false },
      { id: 'gallery2', label: 'Gallery 2', description: 'Little moments editorial photo 2', required: false }
    ],
    textSlots: ['brideName', 'groomName', 'date', 'time', 'venue', 'venueAddress', 'invitationMessage', 'eventLabel']
  }
];

export const getTemplateById = (id: string | null) => {
  return TEMPLATE_DEFINITIONS.find(t => t.id === id || t.slug === id);
};
