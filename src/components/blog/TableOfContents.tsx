import { useEffect, useState } from 'react';
import type { Heading } from './headings';

function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    if (headings.length === 0) return;
    const els = headings.map(h => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);
  return active;
}

function Links({ headings, active }: { headings: Heading[]; active: string }) {
  return (
    <ol className="space-y-1 border-l border-zinc-200 dark:border-white/10">
      {headings.map(h => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? 'true' : undefined}
            className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
              active === h.id
                ? 'border-gold-500 font-medium text-zinc-900 dark:text-zinc-50'
                : 'border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function TableOfContents({ headings, variant }: { headings: Heading[]; variant: 'sidebar' | 'mobile' }) {
  const active = useActiveHeading(headings);
  if (headings.length < 2) return null;

  if (variant === 'mobile') {
    return (
      <details className="group mb-8 rounded-[20px] border border-zinc-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-zinc-900 lg:hidden">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between font-display text-base text-zinc-900 dark:text-zinc-50">
          Sommaire
          <span className="text-sm text-zinc-600 group-open:hidden dark:text-zinc-400">Afficher</span>
          <span className="hidden text-sm text-zinc-600 group-open:inline dark:text-zinc-400">Masquer</span>
        </summary>
        <nav aria-label="Sommaire" className="mt-3">
          <Links headings={headings} active={active} />
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Sommaire">
      <p className="mb-3 font-display text-base text-zinc-900 dark:text-zinc-50">Sommaire</p>
      <Links headings={headings} active={active} />
    </nav>
  );
}
