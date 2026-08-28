import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDataPath = path.resolve(__dirname, '../src/lib/blog-data.ts');
const blogDataContent = fs.readFileSync(blogDataPath, 'utf-8');

const slugRegex = /"slug":\s*"([^"]+)"/g;
const dateRegex = /"date":\s*"([^"]+)"/g;

let slugs = [];
let match;
while ((match = slugRegex.exec(blogDataContent)) !== null) {
  slugs.push(match[1]);
}

let dates = [];
while ((match = dateRegex.exec(blogDataContent)) !== null) {
  dates.push(match[1]);
}

const DOMAIN = 'https://www.afbtaxis.com';

const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
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
  <!-- Blog Posts -->
`;

  slugs.forEach((slug, index) => {
    const date = dates[index] || new Date().toISOString().split('T')[0];
    sitemap += `  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  sitemap += `</urlset>`;

  const publicPath = path.resolve(__dirname, '../public');
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  console.log(`✅ sitemap.xml generated with ${slugs.length} posts!`);
};

generateSitemap();
