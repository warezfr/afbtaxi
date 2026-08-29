import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, '../content/blog');
const distPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html not found. Run after vite build.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

const getFrontmatterField = (content, field) => {
  const match = content.match(new RegExp(`^${field}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return match ? match[1].trim() : '';
};

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let internalLinksHtml = `<div id="seo-links" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">
  <a href="/">Accueil</a>
  <a href="/#services">Services</a>
  <a href="/#flotte">Flotte</a>
  <a href="/#tarifs">Tarifs</a>
  <a href="/blog">Fontainebleau Magazine</a>\n`;

files.forEach(filename => {
  const slug = filename.replace('.md', '');
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
  const title = getFrontmatterField(content, 'title');
  const description = getFrontmatterField(content, 'description');
  const imageUrl = getFrontmatterField(content, 'imageUrl');
  
  // Clean markdown for text content
  const cleanText = content
    .replace(/---[\s\S]*?---/, '') // remove frontmatter
    .replace(/[#*`_]/g, '')        // remove basic markdown chars
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove link syntax but keep text
    .trim();

  internalLinksHtml += `  <a href="/blog/${slug}">${title}</a>\n`;

  let html = template;
  html = html.replace(/<title>.*?<\/title>/g, `<title>${title} | AFB Taxis</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/g, `<meta property="og:image" content="${imageUrl}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="https://www.afbtaxis.com/blog/${slug}"`);
  // Fix canonical URL and inject internal links for P2 fix
  html = html.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="https://www.afbtaxis.com/blog/${slug}"`);
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${internalLinksHtml}`);

  // Fix canonical URL and inject internal links for P2 fix
  html = html.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="https://www.afbtaxis.com/blog/${slug}"`);
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${internalLinksHtml}`);

  
  // Inject the raw text into the HTML outside of the root div so React hydration ignores it but crawlers read it
  const seoTextDiv = `<div id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">${title}. ${description}. ${cleanText}</div>`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${seoTextDiv}`);

  const postDir = path.join(distPath, 'blog', slug);
  if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, 'index.html'), html);
});

internalLinksHtml += `</div>`;

// Now process the homepage (dist/index.html)
let homeHtml = template;
const homeSeoText = "AFB Taxis Fontainebleau. Chauffeur privé VTC. Transferts aéroports Orly, Roissy CDG, Paris. Transport sanitaire conventionné CPAM 77. Réservation 24h/24 et 7j/7. Flotte de véhicules Mercedes, berlines et vans. Circuits touristiques Château de Fontainebleau, Barbizon.";
const homeSeoDiv = `<div id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">${homeSeoText}</div>`;
homeHtml = homeHtml.replace('<div id="root"></div>', `<div id="root"></div>\n${homeSeoDiv}\n${internalLinksHtml}`);
fs.writeFileSync(indexHtmlPath, homeHtml);

// And generate dist/blog/index.html to fix the P1 404
let blogIndexHtml = template;
blogIndexHtml = blogIndexHtml.replace(/<title>.*?<\/title>/g, `<title>Fontainebleau Magazine - Blog AFB Taxis</title>`);
blogIndexHtml = blogIndexHtml.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="https://www.afbtaxis.com/blog"`);
blogIndexHtml = blogIndexHtml.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="https://www.afbtaxis.com/blog"`);
const blogIndexSeoDiv = `<div id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">Découvrez notre blog Fontainebleau Magazine. Articles sur le tourisme, le château de Fontainebleau, les transferts aéroports, et nos services VTC.</div>`;
blogIndexHtml = blogIndexHtml.replace('<div id="root"></div>', `<div id="root"></div>\n${blogIndexSeoDiv}\n${internalLinksHtml}`);
const blogRootPath = path.join(distPath, 'blog');
if (!fs.existsSync(blogRootPath)) fs.mkdirSync(blogRootPath, { recursive: true });
fs.writeFileSync(path.join(blogRootPath, 'index.html'), blogIndexHtml);


// ==========================================
// 4. PRÉ-RENDU DU SEO PROGRAMMATIQUE (TRAJETS)
// ==========================================
const trajetsRaw = fs.readFileSync(path.resolve(__dirname, '../src/data/trajets.json'), 'utf-8');
const trajets = JSON.parse(trajetsRaw);
const trajetsDir = path.resolve(__dirname, '../dist/trajets');
if (!fs.existsSync(trajetsDir)) fs.mkdirSync(trajetsDir);

for (const trajet of trajets) {
  const trajetDir = path.join(trajetsDir, trajet.slug);
  if (!fs.existsSync(trajetDir)) fs.mkdirSync(trajetDir);

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${trajet.title} | AFB Taxis</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${trajet.description}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${trajet.title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${trajet.description}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="https://www.afbtaxis.com/trajets/${trajet.slug}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="https://www.afbtaxis.com/trajets/${trajet.slug}"`);
  
  const seoTextDiv = `<div id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">${trajet.h1}. ${trajet.content} Distance: ${trajet.distance}. Temps estimé: ${trajet.duration}.</div>`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${seoTextDiv}\n${internalLinksHtml}`);

  fs.writeFileSync(path.join(trajetDir, 'index.html'), html);
  console.log(`✅ Prerendered Trajet: ${trajet.slug}`);
}

// ==========================================
// 5. PRÉ-RENDU DE LA PAGE PARTENAIRES
// ==========================================
const partDir = path.resolve(__dirname, '../dist/partenaires');
if (!fs.existsSync(partDir)) fs.mkdirSync(partDir);
let partHtml = template;
partHtml = partHtml.replace(/<title>.*?<\/title>/, `<title>Espace Partenaires B2B, Hôtels et Entreprises | AFB Taxis</title>`);
partHtml = partHtml.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="AFB Taxis met à votre disposition une flotte premium et un service prioritaire pour vos clients les plus exigeants."`);
partHtml = partHtml.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="https://www.afbtaxis.com/partenaires"`);
partHtml = partHtml.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="https://www.afbtaxis.com/partenaires"`);
partHtml = partHtml.replace('<div id="root"></div>', `<div id="root"></div>\n<div id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;">Espace Entreprises & Hôtels. Le partenaire VTC de confiance pour vos clients les plus exigeants. Hôtels de luxe, conciergeries, administration de l'INSEAD et grandes entreprises.</div>\n${internalLinksHtml}`);
fs.writeFileSync(path.join(partDir, 'index.html'), partHtml);
console.log('✅ Prerendered Partenaires');

console.log(`✅ SEO Pre-rendering done for ${files.length} posts + Homepage + Blog Index!`);
