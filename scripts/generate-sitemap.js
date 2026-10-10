import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, '../content/blog');
const DOMAIN = 'https://www.afbtaxis.com';

const getMdFiles = () => {
  if (!fs.existsSync(blogDir)) return [];
  return fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
};

const getFrontmatterField = (content, field) => {
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return '';
  const match = fm[1].match(new RegExp(`^${field}:\\s*(.+?)\\s*$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : '';
};

const files = getMdFiles();
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

files.forEach(filename => {
  const slug = filename.replace('.md', '');
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
  const date = (getFrontmatterField(content, 'updated') || getFrontmatterField(content, 'date')).slice(0, 10);
  sitemap += `  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    ${date ? `<lastmod>${date}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

// Static pages: partenaires, programmatic trajets, SEO landings
const staticPages = ['/partenaires'];
try {
  const trajets = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/trajets.json'), 'utf-8'));
  trajets.forEach((t) => staticPages.push(`/trajets/${t.slug}`));
} catch {}
try {
  const seoSrc = fs.readFileSync(path.resolve(__dirname, '../src/lib/seo-data.ts'), 'utf-8');
  [...seoSrc.matchAll(/slug:\s*'([^']+)'/g)].forEach((m) => staticPages.push(`/${m[1]}`));
} catch {}
staticPages.forEach((p) => {
  sitemap += `  <url>
    <loc>${DOMAIN}${p}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

const publicPath = path.resolve(__dirname, '../public');
fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml generated with ${files.length} posts!`);
