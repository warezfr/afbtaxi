import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDataPath = path.resolve(__dirname, '../src/lib/blog-data.ts');
const blogDataContent = fs.readFileSync(blogDataPath, 'utf-8');

const slugRegex = /"slug":\s*"([^"]+)"/g;
const titleRegex = /"title":\s*"(.*?)(?<!\\)"/g;
const descRegex = /"description":\s*"(.*?)(?<!\\)"/g;
const imgRegex = /"imageUrl":\s*"([^"]+)"/g;

let posts = [];
let matchSlug, matchTitle, matchDesc, matchImg;

while ((matchSlug = slugRegex.exec(blogDataContent)) !== null) {
  matchTitle = titleRegex.exec(blogDataContent);
  matchDesc = descRegex.exec(blogDataContent);
  matchImg = imgRegex.exec(blogDataContent);
  
  if (matchTitle && matchDesc && matchImg) {
    let desc = matchDesc[1].replace(/\\"/g, '"');
    let title = matchTitle[1].replace(/\\"/g, '"');
    
    posts.push({
      slug: matchSlug[1],
      title: title,
      description: desc,
      imageUrl: matchImg[1]
    });
  }
}

const distPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("❌ index.html not found in dist. Run this after build.");
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

posts.forEach(post => {
  let html = template;
  
  // Replace meta tags for SEO
  html = html.replace(/<title>.*?<\/title>/g, `<title>${post.title} | AFB Taxis</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${post.description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${post.title.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${post.description.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta property="og:image" content="[^"]*"/g, `<meta property="og:image" content="${post.imageUrl}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="https://www.afbtaxis.com/blog/${post.slug}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/g, `<meta name="twitter:title" content="${post.title.replace(/"/g, '&quot;')}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/g, `<meta name="twitter:description" content="${post.description.replace(/"/g, '&quot;')}"`);
  
  const postDir = path.join(distPath, 'blog', post.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(postDir, 'index.html'), html);
});

console.log(`✅ SEO Pre-rendering successful for ${posts.length} blog posts!`);
