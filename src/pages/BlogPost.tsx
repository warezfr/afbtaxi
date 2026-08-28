import { useState } from 'react';
import { useParams, Navigate, Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Heart, Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Send } from 'lucide-react';
import { useBlogPost, useBlogPosts } from '@/hooks/useBlogPosts';
import { ContactSection } from '@/components/ContactSection';

function ShareBar({ title, url }: { title: string; url: string }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    { icon: Facebook,  label: 'Facebook',  href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,  className: 'bg-[#1877F2] text-white hover:opacity-80 border-transparent shadow-md hover:shadow-lg' },
    { icon: Twitter,   label: 'X / Twitter', href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, className: 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80 border-transparent shadow-md hover:shadow-lg' },
    { icon: Linkedin,  label: 'LinkedIn',  href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, className: 'bg-[#0A66C2] text-white hover:opacity-80 border-transparent shadow-md hover:shadow-lg' },
    { icon: Send,      label: 'Telegram',  href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`, className: 'bg-[#229ED9] text-white hover:opacity-80 border-transparent shadow-md hover:shadow-lg' },
    { icon: Mail,      label: 'E-mail',    href: `mailto:?subject=${encodedTitle}&body=${encoded}`, className: 'bg-gray-600 text-white hover:opacity-80 border-transparent shadow-md hover:shadow-lg' },
  ];

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => prev + (liked ? -1 : 1));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-10 py-8 border-t border-b border-gray-100 dark:border-gray-800">
      <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-5">Vous avez aimé cet article ?</p>
      <div className="flex flex-wrap items-center gap-3">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border shadow-sm ${liked ? 'bg-gold-500 text-gray-900 border-gold-500 scale-105' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gold-500 hover:text-gold-500 dark:hover:text-gold-400'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-gray-900' : ''}`} />
          {liked ? 'Aimé !' : 'J\'aime'}
          {likeCount > 0 && <span className="ml-1 text-xs">({likeCount})</span>}
        </button>

        <span className="text-gray-900 dark:text-white text-sm font-medium flex items-center gap-1.5 ml-2"><Share2 className="w-3.5 h-3.5" /> Partager :</span>

        {/* Social share buttons */}
        {shares.map(({ icon: Icon, label, href, className }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 ${className}`}
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}

        {/* Copy link */}
        <button
          onClick={handleCopy}
          title="Copier le lien"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm text-sm font-medium transition-all duration-200"
        >
          <LinkIcon className="w-4 h-4" />
          {copied ? '✅ Copié !' : 'Copier le lien'}
        </button>
      </div>
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const post = useBlogPost(slug!);
  const allPosts = useBlogPosts();

  if (!post) return <Navigate to="/blog" replace />;

  const pageUrl = `https://www.afbtaxis.com/blog/${post.slug}`;

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
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <article className="bg-white dark:bg-gray-950 min-h-screen">
        {/* Full-width wide hero image */}
        <div className="w-full h-[55vh] md:h-[65vh] lg:h-[75vh] relative overflow-hidden">
          <img
            src={post.imageUrl}
            alt={`Taxi Fontainebleau - ${post.title}`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/30 to-transparent" />

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-10 sm:pb-14 max-w-5xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors mb-6 drop-shadow-md">
              ← Le Mag de Fontainebleau
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gold-500 text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                {post.category}
              </span>
              {post.tags.filter(t => t !== post.category).slice(0, 3).map(tag => (
                <span key={tag} className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-black tracking-tight leading-tight text-white drop-shadow-lg">
              {post.title}
            </h1>
            <p className="mt-4 text-base text-gray-200 leading-relaxed max-w-3xl drop-shadow-md">{post.description}</p>
            <p className="mt-3 text-xs text-gray-300 font-medium uppercase tracking-wider drop-shadow-md">
              {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-12 pb-16 lg:pb-24">
          <div className="
            prose prose-lg dark:prose-invert max-w-none
            font-sans
            prose-headings:font-display prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-gold-500 prose-h2:pl-5
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-gold-600 dark:prose-h3:text-gold-400
            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-[2] prose-p:text-[1.15rem] prose-p:mb-8 prose-p:font-medium
            prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-li:text-[1.1rem] prose-li:leading-[1.9] prose-li:mb-2 prose-li:font-medium
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
            prose-a:text-gold-600 dark:prose-a:text-gold-400 prose-a:underline hover:prose-a:text-gold-500 prose-a:font-semibold
            prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900 prose-blockquote:px-8 prose-blockquote:py-5 prose-blockquote:rounded-r-2xl prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:my-10
            prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-12 prose-img:w-full prose-img:object-cover prose-img:border prose-img:border-gray-100 dark:prose-img:border-gray-800
          ">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => {
                  if (props.href === '#reserver') {
                    return (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openBooking(`Réservation depuis l'article : ${post.title}`);
                        }}
                        className="not-prose inline-flex items-center gap-2 bg-gold-400 text-gray-900 font-bold text-base px-6 py-3 rounded-full hover:bg-gold-300 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] my-4 mx-auto"
                      >
                        🚕 Réserver un chauffeur pour s'y rendre
                      </button>
                    );
                  }
                  return <a {...props} />;
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Like + Share bar */}
          <ShareBar title={post.title} url={pageUrl} />
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 py-16 px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-5xl">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-gold-500 pl-4">À lire aussi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 dark:hover:border-gold-500/50 hover:border-gold-300">
                  <div className="relative h-44 overflow-hidden">
                    <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-gold-500 text-gray-900 px-2.5 py-1 rounded-full shadow-sm">{r.category}</span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-base text-gray-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug line-clamp-2">{r.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-white dark:bg-gray-900 py-16 text-center px-4 border-t border-gray-100 dark:border-gray-800">
        <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Besoin d'un taxi à Fontainebleau ?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Mercedes Classe S & V · Disponible 7j/7 · Transferts aéroports</p>
        <button
          onClick={() => openBooking(`Suite à la lecture : ${post.title}`)}
          className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gold-400 px-10 py-4 font-bold text-gray-900 text-lg transition-all duration-300 hover:scale-[1.03] hover:bg-gold-300 shadow-md hover:shadow-lg dark:shadow-[0_0_40px_rgba(202,163,82,0.2)]"
        >
          Réserver un chauffeur →
        </button>
      </div>

      <ContactSection onOpenBooking={() => openBooking()} />
    </>
  );
}
