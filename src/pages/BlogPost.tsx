import { useEffect, useRef } from 'react';
import { useParams, Navigate, Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { useBlogPost, useBlogPosts } from '@/hooks/useBlogPosts';
import { ContactSection } from '@/components/ContactSection';

function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'warezfr/afbtaxi');
    script.setAttribute('data-repo-id', 'R_kgDOUB_c-w');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOUB_c-84DEYlu');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'fr');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    ref.current.appendChild(script);
  }, []);
  return <div ref={ref} className="mt-8" />;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const post = useBlogPost(slug!);
  const allPosts = useBlogPosts();

  if (!post) return <Navigate to="/blog" replace />;

  // Related posts: same category first, fill with others
  const related = [
    ...allPosts.filter(p => p.slug !== post.slug && p.category === post.category),
    ...allPosts.filter(p => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'AFB Taxis' },
    publisher: { '@type': 'Organization', name: 'AFB Taxis', logo: { '@type': 'ImageObject', url: 'https://www.afbtaxis.com/logo.png' } },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | AFB Taxis</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://www.afbtaxis.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={`https://www.afbtaxis.com/blog/${post.slug}`} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <article className="bg-white dark:bg-gray-950 pt-20">
        {/* Hero image */}
        <div className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] relative overflow-hidden mb-12 lg:mb-16">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:px-16 md:pb-16 text-white max-w-5xl mx-auto flex flex-col justify-end h-full">
            <span className="bg-gold-500 text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">{post.title}</h1>
            <p className="mt-4 text-gray-300 font-medium tracking-wide uppercase text-sm">
              {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-xs font-bold bg-white/10 hover:bg-gold-500/80 hover:text-gray-900 text-white px-3 py-1 rounded-full transition-colors backdrop-blur-sm">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article content */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-10 transition-colors">
            ← Retour au Blog
          </Link>
          <div className="prose prose-lg dark:prose-invert max-w-none
            [&>h2]:font-display [&>h2]:font-black [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-gray-900 dark:[&>h2]:text-white
            [&>h3]:font-display [&>h3]:font-bold [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-gray-900 dark:[&>h3]:text-white
            [&>p]:text-gray-600 dark:[&>p]:text-gray-400 [&>p]:leading-relaxed [&>p]:mb-5
            [&>ul]:text-gray-600 dark:[&>ul]:text-gray-400 [&>ul]:space-y-2 [&>ul]:mb-5
            [&>ol]:text-gray-600 dark:[&>ol]:text-gray-400 [&>ol]:space-y-2 [&>ol]:mb-5
            [&>blockquote]:border-l-4 [&>blockquote]:border-gold-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 dark:[&>blockquote]:text-gray-400
            [&_a]:text-gold-600 dark:[&_a]:text-gold-500 [&_a]:underline hover:[&_a]:text-gold-500
            [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:w-full [&_img]:object-cover">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Comments */}
          <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Commentaires</h3>
            <GiscusComments />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900/50 py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-gold-500 pl-4">À lire aussi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="relative h-44 overflow-hidden">
                    <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">{r.category}</span>
                    <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mt-1 group-hover:text-gold-500 transition-colors leading-tight line-clamp-2">{r.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16 text-center px-4">
        <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">Besoin d'un transport dans la région ?</h3>
        <button
          onClick={() => openBooking(`Suite à la lecture : ${post.title}`)}
          className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gold-400 px-8 py-4 font-bold text-gray-900 transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-gold-300"
        >
          Réserver un chauffeur
        </button>
      </div>

      <ContactSection onOpenBooking={() => openBooking()} />
    </>
  );
}
