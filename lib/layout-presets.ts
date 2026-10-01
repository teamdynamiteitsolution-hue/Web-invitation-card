export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
}

export const LAYOUT_PRESETS: LayoutPreset[] = [
  { id: 'classic_editorial', name: 'Classic Editorial', description: 'Chandelier motif, botanical accents, centered names' },
  { id: 'arch_portrait', name: 'Arch Portrait', description: 'Arched couple photo frame with romantic typography' },
  { id: 'botanical_luxury', name: 'Botanical Luxury', description: 'Dynamic monogram circle with floral frame' },
  { id: 'split_couple_portraits', name: 'Split Couple', description: 'Individual side-by-side arches for groom & bride' },
  { id: 'minimal_luxury', name: 'Minimal Luxury', description: 'Thin ornamental border, modern monogram, generous whitespace' },
  { id: 'cinematic_scene', name: 'Cinematic Scene', description: 'Full scene backdrop, atmospheric lighting, couple overlay' },
  { id: 'romantic_center_script', name: 'Romantic Center', description: 'Soft floral wreath with centered romantic italic script' },
];
