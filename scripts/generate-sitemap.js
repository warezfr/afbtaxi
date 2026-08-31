import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, '../content/blog');
const DOMAIN = 'https://www.afbtaxis.com';

const SEO_LANDINGS = [
  'transfert-aeroport-orly',
  'taxi-gare-fontainebleau-avon',
  'transport-sanitaire-conventionne-77',
];

const getMdFiles = () => {
  if (!fs.existsSync(blogDir)) return [];
  return fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort();
};

const getFrontmatterField = (content, field) => {
  const match = content.match(new RegExp(`^${field}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return match ? match[1].trim() : '';
};

const urlTag = (loc, lastmod) => {
  const lastmodXml = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `  <url>\n    <loc>${DOMAIN}${loc}</loc>${lastmodXml}\n  </url>\n`;
};

const trajets = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/trajets.json'), 'utf-8')
);

const files = getMdFiles();
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

sitemap += urlTag('/');
sitemap += urlTag('/blog');
sitemap += urlTag('/partenaires');

for (const slug of SEO_LANDINGS) {
  sitemap += urlTag(`/${slug}`);
}

for (const trajet of trajets) {
  sitemap += urlTag(`/trajets/${trajet.slug}`);
}

files.forEach(filename => {
  const slug = filename.replace('.md', '');
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
  const date = getFrontmatterField(content, 'date');
  const lastmod = date ? date.slice(0, 10) : '';
  sitemap += urlTag(`/blog/${slug}`, lastmod);
});

sitemap += `</urlset>`;

const publicPath = path.resolve(__dirname, '../public');
fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
const extra = 1 + 1 + 1 + SEO_LANDINGS.length + trajets.length;
console.log(`✅ sitemap.xml generated with ${files.length} posts + ${extra} marketing URLs`);
