import { useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { PostCard } from '@/components/blog/PostCard';
import { PostCta } from '@/components/blog/PostCta';
import { formatDate, gridVariants } from '@/components/blog/utils';

const SITE = 'https://www.afbtaxis.com';
const MAX_TAGS = 12;

export function BlogList() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const [filter, setFilter] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const allPosts = useBlogPosts();

  const categories = useMemo(() => Array.from(new Set(allPosts.map(p => p.category).filter(Boolean))).sort(), [allPosts]);

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    allPosts.forEach(p => p.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1)));
    return Array.from(counts.entries())
      .filter(([t]) => t !== 'AFB Taxis' && !categories.includes(t))
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr'))
      .slice(0, Math.max(0, MAX_TAGS - categories.length))
      .map(([t]) => t);
  }, [allPosts, categories]);

  const filters = useMemo(() => [...categories, ...topTags], [categories, topTags]);

  const filtered = useMemo(
    () => (filter ? allPosts.filter(p => p.category === filter || p.tags.includes(filter)) : allPosts),
    [filter, allPosts]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const pill = (active: boolean) =>
    `inline-flex min-h-[44px] shrink-0 snap-start items-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
      active
        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
        : 'border border-zinc-200 text-zinc-700 hover:border-zinc-400 dark:border-white/10 dark:text-zinc-300 dark:hover:border-white/30'
    }`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Le Mag de Fontainebleau par AFB Taxis',
      url: `${SITE}/blog`,
      description: 'Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: allPosts.slice(0, 10).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Le Mag de Fontainebleau : tourisme, transport, conseils | AFB Taxis</title>
        <meta
          name="description"
          content="Articles sur Fontainebleau, ses châteaux, sa forêt, l'INSEAD et les trajets en Seine-et-Marne, par les chauffeurs d'AFB Taxis."
        />
        <link rel="canonical" href={`${SITE}/blog`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="bg-zinc-50 pb-20 pt-28 dark:bg-zinc-950 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl">
            <h1 className="font-display text-4xl leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl lg:text-6xl">
              Le Mag de Fontainebleau
            </h1>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Patrimoine, adresses et trajets en Seine-et-Marne, racontés par les chauffeurs qui les font chaque jour.
            </p>
          </header>

          <div
            role="group"
            aria-label="Filtrer les articles"
            className="-mx-4 mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button type="button" onClick={() => setFilter(null)} aria-pressed={filter === null} className={pill(filter === null)}>
              Tout
            </button>
            {filters.map(f => (
              <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={pill(filter === f)}>
                {f}
              </button>
            ))}
          </div>

          {featured ? (
            <>
              <motion.article
                key={`featured-${featured.slug}`}
                initial={false}
                layout={!reduce}
                className="group mt-8 grid overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-none md:grid-cols-2"
              >
                <Link
                  to={`/blog/${featured.slug}`}
                  className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={featured.imageUrl}
                    alt={featured.imageAlt || featured.title}
                    width={1280}
                    height={800}
                    {...({ fetchpriority: 'high' } as object)}
                    decoding="async"
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:aspect-auto"
                  />
                </Link>
                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-14">
                  <p className="text-sm font-medium text-gold-700 dark:text-gold-300">{featured.category}</p>
                  <h2 className="mt-3 font-display text-3xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 lg:text-4xl">
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-4 line-clamp-3 max-w-[55ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {featured.excerpt}
                  </p>
                  <p className="mt-5 text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
                    {formatDate(featured.date)} · {featured.readingMinutes} min de lecture
                  </p>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
                  >
                    Lire l'article
                    <ArrowRight size={16} weight="regular" />
                  </Link>
                </div>
              </motion.article>

              <motion.div
                key={filter ?? 'all'}
                variants={reduce ? undefined : gridVariants}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {rest.map(p => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          ) : (
            <div className="mt-12 rounded-[20px] border border-zinc-200 bg-white p-10 text-center dark:border-white/10 dark:bg-zinc-900">
              <p className="font-display text-2xl text-zinc-900 dark:text-zinc-50">Aucun article pour ce filtre</p>
              <p className="mx-auto mt-2 max-w-[45ch] text-zinc-600 dark:text-zinc-400">
                Essayez une autre catégorie ou revenez à la liste complète.
              </p>
              <button
                type="button"
                onClick={() => setFilter(null)}
                className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950"
              >
                Tout afficher
              </button>
            </div>
          )}

          <div className="mt-20">
            <PostCta onBook={() => openBooking('blog')} />
          </div>
        </div>
      </div>
    </>
  );
}
