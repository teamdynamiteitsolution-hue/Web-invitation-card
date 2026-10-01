export type Role = 'USER' | 'ADMIN' | 'SUPERADMIN';

export type InvitationStatus = 'DRAFT' | 'PENDING_PAYMENT' | 'ACTIVE' | 'EXPIRED' | 'ARCHIVED';

export type PaymentStatus = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export type Archetype = 'soft_botanical' | 'theatrical_curtain' | 'minimal_editorial' | 'haldi_scratch';

export type ExperienceType = 'envelope' | 'curtain' | 'multi_scratch' | 'scroll_story' | 'candle_blow';

export interface ColorPaletteToken {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
}

export interface TypographyPairingToken {
  id: string;
  titleFont: string;
  bodyFont: string;
  bengaliFont?: string;
  titleWeight?: string;
  letterSpacing?: string;
}

export interface TemplateAssetManifest {
  backgroundAsset: string;
  textureOverlay?: string;
  openingActor: {
    type: 'envelope' | 'curtain' | 'wax_seal_only' | 'folding_card' | 'scratch_mask' | 'none';
    assets: {
      primaryBase?: string;
      animatedPart?: string;
      fastener?: string;
      shadowLayer?: string;
      leftCurtain?: string;
      rightCurtain?: string;
      valance?: string;
    };
    audioEffect?: string;
  };
  framing?: {
    borderStyle: 'handdrawn_svg' | 'arch_filigree' | 'clean_border' | 'none';
    frameAsset?: string;
    cornerAccents?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };
    dividerAsset?: string;
  };
  venueArtwork?: {
    type: 'sketch' | 'photo_mask' | 'none';
    illustrationAsset?: string;
    maskAsset?: string;
  };
  timelineConfig?: {
    nodeType: 'floral' | 'ceremonial_icon' | 'minimal_dot';
    connectorStyle: 'solid_thread' | 'botanical_vine' | 'gold_dashed';
  };
}

export interface RevealNodeDefinition {
  nodeId: string;
  label: string;
  contentSlot: string;
  interactionType: 'scratch' | 'tap' | 'swipe' | 'timed' | 'scroll';
  scratchConfig?: {
    coverTexture: 'gold_foil' | 'turmeric_smear' | 'handmade_paper' | 'floral_dust';
    brushRadius: number;
    completionThreshold: number;
    particleBurstOnComplete?: 'gold_glitter' | 'turmeric_powder' | 'rose_petals' | 'none';
  };
  dependencyNodeId?: string;
  isCompleted?: boolean;
  soundEffectUrl?: string;
}

export interface ChoreographyStep {
  targetElement: string;
  animation: 'fade_up' | 'unfold_horizontal' | 'mask_reveal' | 'paper_emerge' | 'letter_stagger';
  durationMs: number;
  delayMs: number;
  easing: string;
}

export interface ScrollMilestone {
  progressStart: number;
  progressEnd: number;
  targetSlot: string;
  visualEffect: 'fade' | 'slide_left' | 'scale_up' | 'parallax';
}

export interface TimelineEventItem {
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface EventCategoryDTO {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  iconSvg?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface TemplateDTO {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  categoryId: string;
  price: number;
  previewImageUrl: string;
  archetype: Archetype;
  experienceType: ExperienceType;
  assetManifest: TemplateAssetManifest;
  visualIdentity: {
    colorPalette: ColorPaletteToken;
    material: string;
    shadowTier: string;
    typography: TypographyPairingToken;
    decorativeSvgSet?: string[];
  };
  openingConfig: {
    promptText: string;
    initialInteraction: 'tap' | 'swipe' | 'scratch' | 'drag';
    soundAssetUrl?: string;
  };
  revealNodesConfig?: RevealNodeDefinition[];
  choreographyConfig?: ChoreographyStep[];
  scrollStoryConfig?: ScrollMilestone[];
  fieldsSchema: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'datetime' | 'location' | 'number';
    required: boolean;
    placeholder?: string;
  }>;
  styleConstraints: {
    allowedFontFamilies: string[];
    titleSize: { min: number; max: number; default: number };
    bodySize: { min: number; max: number; default: number };
  };
  isActive: boolean;
}

export interface AnimationDTO {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  price: number;
  previewPosterUrl: string;
  pluginKey: string;
  interactionType: string;
  soundEffectUrl?: string | null;
  isActive: boolean;
}

export interface BackgroundDTO {
  id: string;
  name: string;
  previewUrl: string;
  assetUrl: string;
  theme: string;
  price: number;
  isPremium: boolean;
  isActive: boolean;
}

export interface DurationTierDTO {
  id: string;
  days: number;
  name: string;
  price: number;
  isDefault: boolean;
}

export interface PriceBreakdown {
  cardPrice: number;
  animationPrice: number;
  backgroundPrice: number;
  durationPrice: number;
  discount: number;
  total: number;
  currency: string;
}

export interface BuilderState {
  invitationId?: string;
  title: string;
  templateId: string;
  animationId: string;
  backgroundId: string;
  durationTierId: string;
  eventData: Record<string, string>;
  styleConfig: {
    fontFamily: string;
    titleSize: number;
    colorPaletteId: string;
  };
  activeStep: 'template' | 'animation' | 'background' | 'information' | 'style' | 'duration' | 'preview';
}
