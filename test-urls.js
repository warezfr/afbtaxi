const fs = require('fs');

const content = fs.readFileSync('src/lib/blog-data.ts', 'utf8');
const urls = [...content.matchAll(/imageUrl["']?\s*:\s*["']([^"']+)["']/g)].map(m => m[1]);

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) console.log('BROKEN:', url, res.status);
    } catch (e) {
      console.log('ERROR:', url, e.message);
    }
  }
  console.log('Done checking ' + urls.length + ' urls.');
}
check();
