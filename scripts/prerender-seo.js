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

files.forEach(filename => {
  const slug = filename.replace('.md', '');
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
  const title = getFrontmatterField(content, 'title');
  const description = getFrontmatterField(content, 'description');
  const imageUrl = getFrontmatterField(content, 'imageUrl');
  const date = getFrontmatterField(content, 'date');

  let html = template;
  html = html.replace(/<title>.*?<\/title>/g, `<title>${title} | AFB Taxis</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/g, `<meta property="og:image" content="${imageUrl}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="https://www.afbtaxis.com/blog/${slug}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/g, `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/g, `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}"`);

  const postDir = path.join(distPath, 'blog', slug);
  if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, 'index.html'), html);
});

console.log(`✅ SEO Pre-rendering done for ${files.length} posts!`);
