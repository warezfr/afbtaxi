import { useMemo } from 'react';

// Vite glob: import all .md files from content/blog as raw strings
const rawFiles = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  tags: string[];
  content: string;
}

/** Lightweight YAML frontmatter parser — no external deps, no eval() */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, unknown> = {};
  const yamlBlock = match[1];
  const content = match[2] || '';

  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''));
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content };
}

function parsePosts(): BlogPost[] {
  return Object.entries(rawFiles)
    .map(([filepath, raw]) => {
      const slug = filepath.replace('/content/blog/', '').replace('.md', '');
      const { data, content } = parseFrontmatter(raw);
      return {
        slug,
        title: String(data.title || ''),
        description: String(data.description || ''),
        category: String(data.category || ''),
        date: data.date ? String(data.date).slice(0, 10) : '',
        imageUrl: String(data.imageUrl || ''),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        content,
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
