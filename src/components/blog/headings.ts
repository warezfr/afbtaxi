export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function stripInline(md: string): string {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

/** Extract h2 headings from markdown (ignores fenced code). */
export function extractHeadings(markdown: string): Heading[] {
  const out: Heading[] = [];
  let inCode = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^```/.test(line)) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (m) {
      const text = stripInline(m[1]);
      out.push({ id: slugify(text), text, level: 2 });
    }
  }
  return out;
}
