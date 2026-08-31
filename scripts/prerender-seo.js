import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.afbtaxis.com';
const blogDir = path.resolve(__dirname, '../content/blog');
const distPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html not found. Run after vite build.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

const SEO_LANDINGS = [
  {
    slug: 'transfert-aeroport-orly',
    title: 'Taxi & Navette Aéroport Orly depuis Fontainebleau | AFB Taxis',
    description: 'Transfert VTC ou taxi entre Fontainebleau et Paris-Orly (ORY). Chauffeur privé, berlines et vans, ponctualité garantie.',
    h1: 'Transfert Aéroport Paris-Orly',
    subtitle: 'Votre chauffeur privé depuis ou vers Fontainebleau, Avon et environs.',
  },
  {
    slug: 'taxi-gare-fontainebleau-avon',
    title: 'Taxi Gare de Fontainebleau - Avon | Réservation 24/7 | AFB Taxis',
    description: 'Taxi à la gare de Fontainebleau-Avon. AFB Taxis vous attend à la descente du train. Chauffeur privé vers le château, l\'INSEAD et les villages.',
    h1: 'Taxi Gare de Fontainebleau - Avon',
    subtitle: 'Liaisons directes vers le Château, l\'INSEAD et les villages alentours.',
  },
  {
    slug: 'transport-sanitaire-conventionne-77',
    title: 'Taxi Conventionné CPAM Seine-et-Marne (77) | AFB Taxis',
    description: 'Taxi conventionné CPAM en Seine-et-Marne (77). Transport médicalisé vers hôpitaux et centres de soins. Réservation simple.',
    h1: 'Taxi Conventionné CPAM (77)',
    subtitle: 'Transport médicalisé assis, prise en charge sécurisée et accompagnement.',
  },
];

const getFrontmatterField = (content, field) => {
  const match = content.match(new RegExp(`^${field}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return match ? match[1].trim() : '';
};

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const blogFiles = fs.existsSync(blogDir)
  ? fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort()
  : [];

const trajets = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/data/trajets.json'), 'utf-8')
);

const siteLinks = [
  ['/', 'Taxi Fontainebleau — Accueil'],
  ['/blog', 'Fontainebleau Magazine'],
  ['/partenaires', 'Espace partenaires hôtels et entreprises'],
  ...SEO_LANDINGS.map(p => [`/${p.slug}`, p.h1]),
  ...trajets.map(t => [`/trajets/${t.slug}`, t.title]),
  ...blogFiles.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
    const title = getFrontmatterField(content, 'title') || slug;
    return [`/blog/${slug}`, title];
  }),
];

const siteNavHtml = `<nav id="prerender-nav" aria-label="Plan du site">
  <p>Pages AFB Taxis</p>
  <ul>
    ${siteLinks.map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join('\n    ')}
  </ul>
</nav>`;

const removeScript = `<script>
(function () {
  function drop() {
    var header = document.getElementById('prerender-header');
    var nav = document.getElementById('prerender-nav');
    var root = document.getElementById('root');
    if (root && root.querySelector('h1')) {
      if (header) header.remove();
      if (nav) nav.remove();
    }
  }
  if (document.readyState === 'complete') drop();
  else window.addEventListener('load', drop);
  var root = document.getElementById('root');
  if (root && window.MutationObserver) {
    var obs = new MutationObserver(drop);
    obs.observe(root, { childList: true, subtree: true });
  }
})();
</script>`;

function breadcrumbJsonLd(items, extra = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': extra['@type'] || 'WebPage',
    name: extra.name,
    description: extra.description,
    url: extra.url,
    ...extra.more,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        item: it.item,
      })),
    },
  };
}

function stripHomeGraph(html) {
  return html.replace(/<!-- JSON-LD: WebSite[\s\S]*?<\/script>\s*/, '');
}

function applyHead(html, { title, description, canonical, ogImage, jsonLd, keepHomeGraph = false }) {
  let out = keepHomeGraph ? html : stripHomeGraph(html);
  if (title) {
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
    out = out.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(title)}"`);
  }
  if (description) {
    const d = escapeHtml(description);
    out = out.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${d}"`);
    out = out.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${d}"`);
  }
  if (canonical) {
    out = out.replace(/<link rel="canonical" href="[^"]*"/g, `<link rel="canonical" href="${canonical}"`);
    out = out.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${canonical}"`);
  }
  if (ogImage) {
    out = out.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${ogImage}"`);
  }
  if (jsonLd) {
    const script = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n`;
    out = out.replace('</head>', `${script}</head>`);
  }
  return out;
}

function injectBody(html, { h1, text }) {
  const header = `<header id="prerender-header">
  <h1>${escapeHtml(h1)}</h1>
  <p>${escapeHtml(text)}</p>
</header>`;
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n${header}\n${siteNavHtml}\n${removeScript}`
  );
}

function writePage(relDir, html) {
  const dir = path.join(distPath, relDir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// ---- Blog posts ----
for (const filename of blogFiles) {
  const slug = filename.replace('.md', '');
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
  const title = getFrontmatterField(content, 'title');
  const description = getFrontmatterField(content, 'description');
  const imageUrl = getFrontmatterField(content, 'imageUrl');
  const date = getFrontmatterField(content, 'date');
  const cleanText = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/[#*`_]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1200);
  const canonical = `${DOMAIN}/blog/${slug}`;
  const jsonLd = breadcrumbJsonLd(
    [
      { name: 'Accueil', item: `${DOMAIN}/` },
      { name: 'Fontainebleau Magazine', item: `${DOMAIN}/blog` },
      { name: title, item: canonical },
    ],
    {
      '@type': 'BlogPosting',
      name: title,
      description,
      url: canonical,
      more: {
        headline: title,
        image: imageUrl || undefined,
        datePublished: date ? date.slice(0, 10) : undefined,
        author: { '@type': 'Organization', name: 'AFB Taxis' },
        publisher: {
          '@type': 'Organization',
          name: 'AFB Taxis',
          logo: { '@type': 'ImageObject', url: `${DOMAIN}/logo.png` },
        },
      },
    }
  );
  let html = applyHead(template, {
    title: `${title} | AFB Taxis`,
    description,
    canonical,
    ogImage: imageUrl,
    jsonLd,
  });
  html = injectBody(html, { h1: title, text: `${description}. ${cleanText}` });
  writePage(path.join('blog', slug), html);
}

// ---- Home ----
{
  const homeText =
    'AFB Taxis, taxi et chauffeur privé à Fontainebleau, Avon et Seine-et-Marne. Transferts aéroports Orly et CDG, gares, transport sanitaire conventionné CPAM 77. Flotte Mercedes. Réservation 7j/7 au 06 07 42 46 16.';
  let homeHtml = injectBody(template, {
    h1: 'Taxi et chauffeur privé à Fontainebleau',
    text: homeText,
  });
  fs.writeFileSync(indexHtmlPath, homeHtml);
}

// ---- Blog index ----
{
  const canonical = `${DOMAIN}/blog`;
  const jsonLd = breadcrumbJsonLd(
    [
      { name: 'Accueil', item: `${DOMAIN}/` },
      { name: 'Fontainebleau Magazine', item: canonical },
    ],
    {
      '@type': 'Blog',
      name: 'Le Mag de Fontainebleau par AFB Taxis',
      description: 'Tourisme, patrimoine et transport VTC en Seine-et-Marne.',
      url: canonical,
    }
  );
  let html = applyHead(template, {
    title: 'Blog Fontainebleau : tourisme, actualités et transport | AFB Taxis',
    description: 'Articles sur Fontainebleau, le château, la forêt, l\'INSEAD et vos transports en Seine-et-Marne avec AFB Taxis.',
    canonical,
    jsonLd,
  });
  html = injectBody(html, {
    h1: 'Le Mag de Fontainebleau',
    text: 'Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne.',
  });
  writePage('blog', html);
}

// ---- Trajets ----
for (const trajet of trajets) {
  const canonical = `${DOMAIN}/trajets/${trajet.slug}`;
  const jsonLd = breadcrumbJsonLd(
    [
      { name: 'Accueil', item: `${DOMAIN}/` },
      { name: trajet.title, item: canonical },
    ],
    {
      name: trajet.title,
      description: trajet.description,
      url: canonical,
    }
  );
  let html = applyHead(template, {
    title: `${trajet.title} | AFB Taxis`,
    description: trajet.description,
    canonical,
    jsonLd,
  });
  html = injectBody(html, {
    h1: trajet.h1,
    text: `${trajet.description} ${trajet.content} Distance ${trajet.distance}, durée ${trajet.duration}.`,
  });
  writePage(path.join('trajets', trajet.slug), html);
  console.log(`✅ Prerendered Trajet: ${trajet.slug}`);
}

// ---- Partenaires ----
{
  const canonical = `${DOMAIN}/partenaires`;
  const jsonLd = breadcrumbJsonLd(
    [
      { name: 'Accueil', item: `${DOMAIN}/` },
      { name: 'Partenaires', item: canonical },
    ],
    {
      name: 'Espace Partenaires B2B, Hôtels et Entreprises',
      description: 'Flotte premium et service prioritaire pour hôtels, conciergeries et entreprises à Fontainebleau.',
      url: canonical,
    }
  );
  let html = applyHead(template, {
    title: 'Espace Partenaires B2B, Hôtels et Entreprises | AFB Taxis',
    description: 'Flotte premium et service prioritaire pour hôtels, conciergeries, INSEAD et entreprises à Fontainebleau.',
    canonical,
    jsonLd,
  });
  html = injectBody(html, {
    h1: 'Le partenaire VTC de confiance pour vos clients les plus exigeants',
    text: 'Hôtels de luxe, conciergeries, administration de l\'INSEAD et grandes entreprises : AFB Taxis met à votre disposition une flotte premium et un service prioritaire.',
  });
  writePage('partenaires', html);
  console.log('✅ Prerendered Partenaires');
}

// ---- SEO landings ----
for (const page of SEO_LANDINGS) {
  const canonical = `${DOMAIN}/${page.slug}`;
  const jsonLd = breadcrumbJsonLd(
    [
      { name: 'Accueil', item: `${DOMAIN}/` },
      { name: page.h1, item: canonical },
    ],
    {
      name: page.title,
      description: page.description,
      url: canonical,
    }
  );
  let html = applyHead(template, {
    title: page.title,
    description: page.description,
    canonical,
    jsonLd,
  });
  html = injectBody(html, {
    h1: page.h1,
    text: `${page.subtitle} ${page.description}`,
  });
  writePage(page.slug, html);
  console.log(`✅ Prerendered SEO landing: ${page.slug}`);
}

console.log(`✅ SEO pre-render done for ${blogFiles.length} posts + home + blog + trajets + partenaires + landings`);
