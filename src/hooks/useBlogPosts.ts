import { useMemo } from 'react';

// Vite glob: import all .md files from content/blog as raw strings
const rawFiles = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  date: string;
  updated?: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  content: string;
  readingMinutes: number;
}

function unquote(value: string): string {
  const v = value.trim();
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
    return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) {
    return v.slice(1, -1).replace(/''/g, "'");
  }
  return v;
}

function splitInline(inner: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quote: string | null = null;
  for (const ch of inner) {
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
    } else if (ch === ',') {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map(unquote).filter(Boolean);
}

/** Lightweight YAML frontmatter parser: scalars, inline lists, block lists. No deps, no eval. */
function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string | string[]> = {};
  const lines = match[1].split(/\r?\n/);
  let currentListKey: string | null = null;

  for (const line of lines) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && currentListKey) {
      (data[currentListKey] as string[]).push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const value = kv[2].trim();
    currentListKey = null;
    if (value === '') {
      data[key] = [];
      currentListKey = key;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = splitInline(value.slice(1, -1));
    } else {
      data[key] = unquote(value);
    }
  }

  return { data, content: match[2] || '' };
}

function str(v: string | string[] | undefined): string {
  return Array.isArray(v) ? v.join(', ') : v || '';
}

function parsePosts(): BlogPost[] {
  return Object.entries(rawFiles)
    .map(([filepath, raw]) => {
      const slug = filepath.replace('/content/blog/', '').replace('.md', '');
      const { data, content } = parseFrontmatter(raw);
      const words = content.split(/\s+/).filter(Boolean).length;
      const description = str(data.description);
      const updated = str(data.updated).slice(0, 10);
      return {
        slug,
        title: str(data.title),
        description,
        excerpt: description,
        category: str(data.category),
        date: str(data.date).slice(0, 10),
        updated: updated || undefined,
        imageUrl: str(data.imageUrl),
        imageAlt: str(data.imageAlt),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content,
        readingMinutes: Math.max(1, Math.round(words / 200)),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const ALL_POSTS = parsePosts();

export function useBlogPosts(filterTag?: string): BlogPost[] {
  return useMemo(() => {
    if (!filterTag) return ALL_POSTS;
    return ALL_POSTS.filter(p => p.tags.includes(filterTag) || p.category === filterTag);
  }, [filterTag]);
}

export function useBlogPost(slug: string): BlogPost | undefined {
  return useMemo(() => ALL_POSTS.find(p => p.slug === slug), [slug]);
}

export function getRelatedPosts(post: BlogPost, n = 3): BlogPost[] {
  const others = ALL_POSTS.filter(p => p.slug !== post.slug);
  const score = (p: BlogPost) =>
    (p.category === post.category ? 100 : 0) + p.tags.filter(t => post.tags.includes(t)).length;
  return others
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map(x => x.p);
}

/** Previous (older) and next (newer) posts by date. */
export function getAdjacentPosts(post: BlogPost): { newer?: BlogPost; older?: BlogPost } {
  const idx = ALL_POSTS.findIndex(p => p.slug === post.slug);
  return { newer: idx > 0 ? ALL_POSTS[idx - 1] : undefined, older: idx >= 0 ? ALL_POSTS[idx + 1] : undefined };
}
