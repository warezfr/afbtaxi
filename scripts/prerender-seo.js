import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.resolve(__dirname, '../content/blog');
const distPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Run after vite build.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

const SITE = 'https://www.afbtaxis.com';
const HIDDEN_STYLE = 'position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';

const escAttr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Minimal frontmatter parser: scalars (quoted or not), inline lists, block lists. */
const unquote = (value) => {
  const v = value.trim();
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/\\"/g, '"');
  if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
  return v;
};

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  let listKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const value = kv[2].trim();
    listKey = null;
    if (value === '') {
      data[kv[1]] = [];
      listKey = kv[1];
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[kv[1]] = value.slice(1, -1).split(',').map(unquote).filter(Boolean);
    } else {
      data[kv[1]] = unquote(value);
    }
  }
  return { data, content: match[2] || '' };
};

/** Simple markdown to HTML: headings, paragraphs, lists, blockquotes, bold/italic/links. */
const inlineMd = (text) => {
  let out = escText(text);
  out = out.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const h = href === '#reserver' ? '/blog#reserver' : href;
    return `<a href="${h.replace(/"/g, '%22')}">${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return out;
};

const markdownToHtml = (md) => {
  const lines = md.split(/\r?\n/);
  const out = [];
  let para = [];
  let list = null; // 'ul' | 'ol'
  const flushPara = () => {
    if (para.length) out.push(`<p>${inlineMd(para.join(' '))}</p>`);
    para = [];
  };
  const closeList = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const raw of lines) {
    const line = raw.trim();
    let m;
    if (!line) {
      flushPara();
      closeList();
    } else if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flushPara();
      closeList();
      const level = Math.max(2, m[1].length);
      out.push(`<h${level}>${inlineMd(m[2])}</h${level}>`);
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; }
      out.push(`<li>${inlineMd(m[1])}</li>`);
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara();
      if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; }
      out.push(`<li>${inlineMd(m[1])}</li>`);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara();
      closeList();
      out.push(`<blockquote>${inlineMd(m[1])}</blockquote>`);
    } else if (/^\|/.test(line)) {
      flushPara();
      closeList();
      if (!/^\|[\s:|-]+\|?$/.test(line)) {
        out.push(`<p>${inlineMd(line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()).join(' - '))}</p>`);
      }
    } else if (/^!\[/.test(line)) {
      flushPara();
      closeList();
    } else {
      closeList();
      para.push(line);
    }
  }
  flushPara();
  closeList();
  return out.join('\n');
};

/** Replace first match of a regex with a literal string (no $ pattern interpretation). */
const sub = (html, regex, value) => html.replace(regex, () => value);

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

const posts = files
  .map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(fs.readFileSync(path.join(blogDir, filename), 'utf-8'));
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date ? String(data.date).slice(0, 10) : '',
      imageUrl: data.imageUrl || '',
      content,
    };
  })
  .sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());

// Full internal links list, built once BEFORE the loop
const internalLinksHtml = `<div id="seo-links" style="${HIDDEN_STYLE}">
  <a href="/">Accueil</a>
  <a href="/#services">Services</a>
  <a href="/#flotte">Flotte</a>
  <a href="/#tarifs">Tarifs</a>
  <a href="/blog">Le Mag de Fontainebleau</a>
${posts.map((p) => `  <a href="/blog/${p.slug}">${escText(p.title)}</a>`).join('\n')}
</div>`;

const applyHead = (html, { title, description, url, image, type }) => {
  let h = html;
  h = sub(h, /<title>.*?<\/title>/, `<title>${escText(title)}</title>`);
  h = sub(h, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${escAttr(description)}"`);
  h = sub(h, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escAttr(title)}"`);
  h = sub(h, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escAttr(description)}"`);
  h = sub(h, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);
  h = sub(h, /<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${type}"`);
  if (image) h = sub(h, /<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escAttr(image)}"`);
  h = sub(h, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escAttr(title)}"`);
  h = sub(h, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escAttr(description)}"`);
  h = sub(h, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`);
  return h;
};

const injectBody = (html, seoHtml) => sub(html, /<div id="root"><\/div>/, `<div id="root"></div>\n${seoHtml}\n${internalLinksHtml}`);

posts.forEach((post) => {
  const url = `${SITE}/blog/${post.slug}`;
  let html = applyHead(template, {
    title: `${post.title} | AFB Taxis`,
    description: post.description,
    url,
    image: post.imageUrl,
    type: 'article',
  });
  if (post.date) {
    html = html.replace(
      /<meta property="og:type" content="article"[^>]*>/,
      (m) => `${m}\n    <meta property="article:published_time" content="${post.date}" />`
    );
  }
  const seoDiv = `<div id="seo-content" style="${HIDDEN_STYLE}"><article><h1>${escText(post.title)}</h1><p>${escText(post.description)}</p>\n${markdownToHtml(post.content)}\n</article></div>`;
  html = injectBody(html, seoDiv);

  const postDir = path.join(distPath, 'blog', post.slug);
  fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, 'index.html'), html);
});

// Now process the homepage (dist/index.html)
{
  const homeSeoDiv = `<div id="seo-content" style="${HIDDEN_STYLE}"><h1>Taxi et chauffeur privé à Fontainebleau</h1><p>AFB Taxis, taxi conventionné et chauffeur privé à Fontainebleau, Avon et Seine-et-Marne depuis 2004. Transferts aéroports Orly, Roissy CDG et Beauvais, gares parisiennes, Paris, Disneyland, transport sanitaire conventionné CPAM 77. Mercedes Classe S, Classe E, Classe V 7 places et Tesla Model Y. Prix annoncé à la réservation, 24h/24 et 7j/7 au 06 07 42 46 16.</p></div>`;
  const homeHtml = sub(template, /<div id="root"><\/div>/, `<div id="root"></div>\n${homeSeoDiv}\n${internalLinksHtml}`);
  fs.writeFileSync(indexHtmlPath, homeHtml);
}

// Custom 404 (Vercel serves 404.html with a real 404 status for unknown paths)
{
  let nf = applyHead(template, {
    title: 'Page introuvable | AFB Taxis',
    description: 'Cette page n\'existe pas ou plus. Retrouvez nos services de taxi et chauffeur privé à Fontainebleau depuis l\'accueil.',
    url: `${SITE}/`,
    image: '',
    type: 'website',
  });
  nf = sub(nf, /<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex, follow"');
  nf = sub(nf, /<link rel="canonical" href="[^"]*" \/>\n?/, '');
  nf = sub(nf, /<div id="root"><\/div>/, `<div id="root"></div>\n<div id="seo-content" style="${HIDDEN_STYLE}"><h1>Page introuvable</h1><p><a href="/">Retour à l\'accueil</a></p></div>`);
  fs.writeFileSync(path.join(distPath, '404.html'), nf);
}

// SEO landing pages (src/lib/seo-data.ts) -> dist/<slug>/index.html
{
  const seoSrc = fs.readFileSync(path.resolve(__dirname, '../src/lib/seo-data.ts'), 'utf-8');
  const entries = [...seoSrc.matchAll(/slug:\s*'([^']+)'[\s\S]*?title:\s*'((?:\\'|[^'])*)'[\s\S]*?description:\s*'((?:\\'|[^'])*)'[\s\S]*?h1:\s*'((?:\\'|[^'])*)'[\s\S]*?subtitle:\s*'((?:\\'|[^'])*)'/g)]
    .map((m) => ({ slug: m[1], title: m[2].replace(/\\'/g, "'"), description: m[3].replace(/\\'/g, "'"), h1: m[4].replace(/\\'/g, "'"), subtitle: m[5].replace(/\\'/g, "'") }));
  for (const page of entries) {
    let html = applyHead(template, { title: page.title, description: page.description, url: `${SITE}/${page.slug}`, image: '', type: 'website' });
    const seoDiv = `<div id="seo-content" style="${HIDDEN_STYLE}"><h1>${escText(page.h1)}</h1><p>${escText(page.subtitle)}</p><p>${escText(page.description)}</p></div>`;
    html = injectBody(html, seoDiv);
    const dir = path.join(distPath, page.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`Prerendered landing: ${page.slug}`);
  }
}

// Generate dist/blog/index.html
{
  let blogHtml = applyHead(template, {
    title: 'Le Mag de Fontainebleau : tourisme, transport, conseils | AFB Taxis',
    description: "Articles sur Fontainebleau, ses châteaux, sa forêt, l'INSEAD et les trajets en Seine-et-Marne, par les chauffeurs d'AFB Taxis.",
    url: `${SITE}/blog`,
    image: '',
    type: 'website',
  });
  const listHtml = posts
    .map((p) => `<li><a href="/blog/${p.slug}">${escText(p.title)}</a> ${escText(p.description)}</li>`)
    .join('\n');
  const blogSeoDiv = `<div id="seo-content" style="${HIDDEN_STYLE}"><h1>Le Mag de Fontainebleau</h1><p>Tourisme, patrimoine, transferts aéroports et conseils de transport en Seine-et-Marne.</p><ul>\n${listHtml}\n</ul></div>`;
  blogHtml = injectBody(blogHtml, blogSeoDiv);
  const blogRootPath = path.join(distPath, 'blog');
  fs.mkdirSync(blogRootPath, { recursive: true });
  fs.writeFileSync(path.join(blogRootPath, 'index.html'), blogHtml);
}

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
  console.log(`Prerendered Trajet: ${trajet.slug}`);
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
console.log('Prerendered Partenaires');

console.log(`SEO pre-rendering done for ${posts.length} posts + Homepage + Blog Index!`);
