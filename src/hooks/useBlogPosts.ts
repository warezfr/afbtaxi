import { useMemo } from 'react';
import matter from 'gray-matter';

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

function parsePosts(): BlogPost[] {
  return Object.entries(rawFiles)
    .map(([filepath, raw]) => {
      const slug = filepath.replace('/content/blog/', '').replace('.md', '');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        date: data.date ? String(data.date).slice(0, 10) : '',
        imageUrl: data.imageUrl || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Memoized at module level to avoid recomputation
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
