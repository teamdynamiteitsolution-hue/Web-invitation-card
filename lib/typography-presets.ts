export interface TypographyPreset {
  id: string;
  name: string;
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: string | number;
  letterSpacing?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  lineHeight?: string;
}

export const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  {
    id: "editorial_serif",
    name: "Editorial Serif",
    fontFamily: "'Playfair Display', serif",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  {
    id: "romantic_italic",
    name: "Romantic Italic",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: "0.05em",
  },
  {
    id: "luxury_italic",
    name: "Luxury Italic",
    fontFamily: "'Cinzel', serif",
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: "0.08em",
  },
  {
    id: "modern_minimal",
    name: "Modern Minimal",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  {
    id: "magazine",
    name: "Magazine",
    fontFamily: "'Bodoni Moda', serif",
    fontWeight: 700,
    letterSpacing: "0",
    textTransform: "uppercase",
  },
  {
    id: "botanical",
    name: "Botanical",
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontWeight: 500,
    letterSpacing: "0.04em",
  },
  {
    id: "monogram",
    name: "Monogram",
    fontFamily: "'Cinzel Decorative', serif",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 200,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
  },
  {
    id: "framed",
    name: "Framed",
    fontFamily: "'Josefin Sans', sans-serif",
    fontWeight: 400,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  {
    id: "handwritten",
    name: "Handwritten",
    fontFamily: "'Great Vibes', cursive",
    fontWeight: 400,
    letterSpacing: "0.01em",
  },
  {
    id: "fashion_editorial",
    name: "Fashion Editorial",
    fontFamily: "'Prata', serif",
    fontWeight: 400,
    letterSpacing: "0.05em",
  },
  {
    id: "romantic_center",
    name: "Romantic Center",
    fontFamily: "'Alex Brush', cursive",
    fontWeight: 400,
    letterSpacing: "0",
    lineHeight: "1.2",
  }
];

// Helper to convert preset to React style object
export const getPresetStyle = (presetId: string) => {
  const preset = TYPOGRAPHY_PRESETS.find(p => p.id === presetId);
  if (!preset) return {};
  
  return {
    fontFamily: preset.fontFamily,
    fontStyle: preset.fontStyle || 'normal',
    fontWeight: preset.fontWeight || 'normal',
    letterSpacing: preset.letterSpacing || 'normal',
    textTransform: preset.textTransform || 'none',
    lineHeight: preset.lineHeight || 'inherit',
  };
};
