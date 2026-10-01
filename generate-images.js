const fs = require('fs');
const path = require('path');

const generateSVG = (text, width = 800, height = 1200) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#FAF8F5" />
    <rect width="${width - 40}" height="${height - 40}" x="20" y="20" fill="none" stroke="#D4AF37" stroke-width="4" stroke-dasharray="10 10" />
    <text x="50%" y="50%" font-family="serif" font-size="48" fill="#8C4A52" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
};

const dirs = [
  'public/assets/categories',
  'public/assets/previews/how-it-works',
  'public/assets/previews/templates',
  'public/assets/frames'
];

dirs.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

const files = {
  'public/assets/categories/wedding.webp': 'Wedding',
  'public/assets/categories/haldi.webp': 'Haldi',
  'public/assets/categories/boubhat.webp': 'Boubhat',
  'public/assets/categories/akhd.webp': 'Akhd',
  'public/assets/categories/birthday.webp': 'Birthday',
  'public/assets/categories/anniversary.webp': 'Anniversary',
  'public/assets/previews/how-it-works/step-1.webp': 'Step 1',
  'public/assets/previews/how-it-works/step-2.webp': 'Step 2',
  'public/assets/previews/how-it-works/step-3.webp': 'Step 3',
  'public/assets/previews/how-it-works/step-4.webp': 'Step 4',
  'public/assets/previews/how-it-works/step-5.webp': 'Step 5',
  'public/assets/previews/how-it-works/step-6.webp': 'Step 6',
  'public/assets/previews/how-it-works/step-7.webp': 'Step 7',
  'public/assets/previews/how-it-works/step-8.webp': 'Step 8',
  'public/assets/previews/templates/blush-botanical.webp': 'Blush Botanical',
  'public/assets/previews/templates/midnight-gold.webp': 'Midnight Gold',
  'public/assets/previews/templates/heritage-crimson.webp': 'Heritage Crimson',
  'public/assets/previews/templates/emerald-royal.webp': 'Emerald Royal',
  'public/assets/frames/handdrawn-minimal.svg': 'Frame',
  'public/assets/frames/vintage-ornament.svg': 'Ornament'
};

for (const [filepath, text] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), generateSVG(text));
}
