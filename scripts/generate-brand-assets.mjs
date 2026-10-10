import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Concept 1 Mark SVG
const markSVGInner = `
  <path d="M 32 4 L 10 52 L 23 52 L 27 42 L 37 42 L 41 52 L 54 52 Z M 32 16 L 35 26 L 29 26 Z" fill="white" />
  <rect x="26" y="32" width="4" height="4" fill="#D9B257"/>
  <rect x="30" y="32" width="4" height="4" fill="white"/>
  <rect x="34" y="32" width="4" height="4" fill="#D9B257"/>
  <rect x="26" y="36" width="4" height="4" fill="white"/>
  <rect x="30" y="36" width="4" height="4" fill="#D9B257"/>
  <rect x="34" y="36" width="4" height="4" fill="white"/>
  <text x="32" y="62" font-family="Outfit, sans-serif" font-weight="700" font-size="7" letter-spacing="0.1em" text-anchor="middle" fill="white">FONTAINEBLEAU</text>
`;

// 1. favicon.svg (mark, zinc-950 rounded 14 px)
const faviconSVG = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="80" rx="14" fill="#09090b" />
  <g transform="translate(8, 8)">
    ${markSVGInner}
  </g>
</svg>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSVG);
console.log('Created favicon.svg');

// 2. logo.png (512x512)
const logoSVG = `<svg width="512" height="512" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#09090b" />
  ${markSVGInner}
</svg>`;

await sharp(Buffer.from(logoSVG))
  .png()
  .toFile(path.join(PUBLIC_DIR, 'logo.png'));
console.log('Created logo.png');

// 3. og-image.jpg (1200x630)
const ogImageSVG = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#09090b" />
  
  <g transform="translate(440, 160) scale(5)">
    <path d="M 32 4 L 10 52 L 23 52 L 27 42 L 37 42 L 41 52 L 54 52 Z M 32 16 L 35 26 L 29 26 Z" fill="white" />
    <rect x="26" y="32" width="4" height="4" fill="#D9B257"/>
    <rect x="30" y="32" width="4" height="4" fill="white"/>
    <rect x="34" y="32" width="4" height="4" fill="#D9B257"/>
    <rect x="26" y="36" width="4" height="4" fill="white"/>
    <rect x="30" y="36" width="4" height="4" fill="#D9B257"/>
    <rect x="34" y="36" width="4" height="4" fill="white"/>
  </g>
  
  <text x="600" y="480" font-family="Outfit, sans-serif" font-weight="800" font-size="64" fill="white" text-anchor="middle">AFB Taxis</text>
  <text x="600" y="550" font-family="Outfit, sans-serif" font-weight="500" font-size="32" fill="white" text-anchor="middle">Taxi et chauffeur privé, Fontainebleau</text>

  <!-- Damier bottom -->
  <rect x="0" y="610" width="120" height="20" fill="#D9B257" />
  <rect x="120" y="610" width="120" height="20" fill="white" />
  <rect x="240" y="610" width="120" height="20" fill="#D9B257" />
  <rect x="360" y="610" width="120" height="20" fill="white" />
  <rect x="480" y="610" width="120" height="20" fill="#D9B257" />
  <rect x="600" y="610" width="120" height="20" fill="white" />
  <rect x="720" y="610" width="120" height="20" fill="#D9B257" />
  <rect x="840" y="610" width="120" height="20" fill="white" />
  <rect x="960" y="610" width="120" height="20" fill="#D9B257" />
  <rect x="1080" y="610" width="120" height="20" fill="white" />
</svg>`;

await sharp(Buffer.from(ogImageSVG))
  .jpeg({ quality: 90 })
  .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
console.log('Created og-image.jpg');
