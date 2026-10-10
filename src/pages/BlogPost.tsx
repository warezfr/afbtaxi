import { Children, isValidElement, useMemo, type ReactNode } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown, { type Components } from 'react-markdown';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Phone } from '@phosphor-icons/react';
import { useBlogPost, getRelatedPosts, getAdjacentPosts } from '@/hooks/useBlogPosts';
import { COMPANY } from '@/lib/constants';
import { PostCard } from '@/components/blog/PostCard';
import { PostCta } from '@/components/blog/PostCta';
import { ShareBar } from '@/components/blog/ShareBar';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { extractHeadings, slugify } from '@/components/blog/headings';
import { formatDate, gridVariants } from '@/components/blog/utils';

const SITE = 'https://www.afbtaxis.com';

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children);
  return Children.toArray(node).map(textOf).join('');
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const post = useBlogPost(slug ?? '');
  const reduce = useReducedMotion();

  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);
  const related = useMemo(() => (post ? getRelatedPosts(post, 3) : []), [post]);
  const { newer, older } = useMemo(() => (post ? getAdjacentPosts(post) : {}), [post]);

  if (!post) {
    return (
      <div className="bg-zinc-50 pb-24 pt-36 dark:bg-zinc-950">
        <Helmet>
          <title>Article introuvable | AFB Taxis</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
            Cet article n'existe pas
          </h1>
          <p className="mt-5 max-w-[55ch] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Le lien est peut-être ancien ou incomplet. Retrouvez tous nos articles dans le Mag.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-zinc-950 px-6 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-950"
          >
            <ArrowLeft size={18} weight="regular" />
            Retour au Mag
          </Link>
        </div>
      </div>
    );
  }

  const pageUrl = `${SITE}/blog/${post.slug}`;
  const book = () => openBooking('blog');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: pageUrl,
    author: { '@type': 'Organization', name: 'AFB Taxis' },
    publisher: { '@type': 'Organization', name: 'AFB Taxis', logo: { '@type': 'ImageObject', url: COMPANY.logoUrl } },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Mag', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  };

  const components: Components = {
    h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
    a: ({ href = '', children }) => {
      if (href === '#reserver') {
        return (
          <a href="#reserver" onClick={() => book()}>
            {children}
          </a>
        );
      }
      if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
      if (href.startsWith('#')) return <a href={href}>{children}</a>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => (
      <img src={src} alt={alt || ''} loading="lazy" decoding="async" className="w-full rounded-[20px]" />
    ),
    table: ({ children }) => (
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="tabular-nums">{children}</table>
      </div>
    ),
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | AFB Taxis`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="article:published_time" content={post.date} />
        {post.updated && <meta property="article:modified_time" content={post.updated} />}
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <ReadingProgress />

      <div className="bg-zinc-50 pb-20 pt-28 dark:bg-zinc-950 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header>
            <nav aria-label="Fil d'Ariane" className="text-sm text-zinc-600 dark:text-zinc-400">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">Accueil</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-50">Mag</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-50">{post.category}</Link>
                </li>
              </ol>
            </nav>

            <h1 className="mt-6 max-w-4xl font-display text-3xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
              <span>{formatDate(post.date)}</span>
              {post.updated && post.updated !== post.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>mis à jour le {formatDate(post.updated)}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min de lecture</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-gold-700 dark:text-gold-300">{post.category}</span>
            </p>

            <img
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              width={1280}
              height={720}
              {...({ fetchpriority: 'high' } as object)}
              decoding="async"
              className="mt-8 aspect-[16/9] w-full rounded-[20px] object-cover shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)] dark:shadow-none"
            />
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
            <article className="min-w-0">
              <TableOfContents headings={headings} variant="mobile" />
              <div
                className="prose prose-zinc prose-lg max-w-[68ch] dark:prose-invert
                  prose-headings:font-display prose-headings:tracking-tight prose-headings:scroll-mt-28
                  prose-a:font-medium prose-a:text-gold-700 prose-a:underline-offset-4 hover:prose-a:text-gold-600 dark:prose-a:text-gold-300
                  prose-img:rounded-[20px]"
              >
                <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
              </div>

              <div className="max-w-[68ch]">
                <ShareBar title={post.title} url={pageUrl} />
              </div>

              <div className="mt-12">
                <PostCta id="reserver" onBook={() => book()} />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <TableOfContents headings={headings} variant="sidebar" />
                <div className="rounded-[20px] border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
                  <p className="font-display text-lg text-zinc-900 dark:text-zinc-50">Réserver</p>
                  <a
                    href={`tel:${COMPANY.phoneIntl}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm tabular-nums text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    <Phone size={16} weight="regular" />
                    {COMPANY.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => book()}
                    className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:bg-gold-400 dark:text-zinc-950 dark:hover:bg-gold-300 dark:focus-visible:ring-offset-zinc-900"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {(newer || older) && (
            <nav aria-label="Articles précédent et suivant" className="mt-16 grid gap-4 border-t border-zinc-200 pt-8 dark:border-white/10 md:grid-cols-2">
              {older ? (
                <Link to={`/blog/${older.slug}`} className="group rounded-[20px] border border-zinc-200 p-5 transition-colors hover:border-gold-500 dark:border-white/10">
                  <span className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <ArrowLeft size={14} weight="regular" /> Article précédent
                  </span>
                  <span className="mt-1 line-clamp-2 block font-display text-lg text-zinc-900 dark:text-zinc-50">{older.title}</span>
                </Link>
              ) : <span />}
              {newer ? (
                <Link to={`/blog/${newer.slug}`} className="group rounded-[20px] border border-zinc-200 p-5 text-left transition-colors hover:border-gold-500 dark:border-white/10 md:text-right">
                  <span className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Article suivant <ArrowRight size={14} weight="regular" />
                  </span>
                  <span className="mt-1 line-clamp-2 block font-display text-lg text-zinc-900 dark:text-zinc-50">{newer.title}</span>
                </Link>
              ) : <span />}
            </nav>
          )}

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-title">
              <h2 id="related-title" className="font-display text-3xl tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
                À lire aussi
              </h2>
              <motion.div
                variants={reduce ? undefined : gridVariants}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
              >
                {related.map(r => (
                  <PostCard key={r.slug} post={r} />
                ))}
              </motion.div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
