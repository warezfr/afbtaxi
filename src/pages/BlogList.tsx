import { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { ContactSection } from '@/components/ContactSection';

export function BlogList() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const allPosts = useBlogPosts();

  const categories = useMemo(() => {
    const cats = allPosts.map(p => p.category);
    return Array.from(new Set(cats)).sort();
  }, [allPosts]);

  const allTags = useMemo(() => {
    const tags = allPosts.flatMap(p => p.tags);
    return Array.from(new Set(tags))
      .filter(t => t !== 'AFB Taxis' && t !== 'Fontainebleau' && !categories.includes(t))
      .sort();
  }, [allPosts, categories]);

  const filteredPosts = useMemo(() => {
    if (!selectedFilter) return allPosts;
    return allPosts.filter(p => p.category === selectedFilter || p.tags.includes(selectedFilter));
  }, [selectedFilter, allPosts]);

  return (
    <>
      <Helmet>
        <title>Blog Fontainebleau : Tourisme, Actualités et Transport | AFB Taxis</title>
        <meta name="description" content="Découvrez nos articles sur Fontainebleau, ses châteaux, sa forêt, l'INSEAD et les astuces pour bien organiser vos transports en Seine-et-Marne." />
        <link rel="canonical" href="https://www.afbtaxis.com/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Le Mag de Fontainebleau par AFB Taxis",
          "url": "https://www.afbtaxis.com/blog",
          "description": "Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne."
        })}</script>
      </Helmet>

      {/* Hero header */}
      <div className="bg-gray-900 border-b border-gray-800 pt-32 pb-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400 mb-4">AFB Taxis · Fontainebleau</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Le Mag de <span className="text-gold-400">Fontainebleau</span>
          </h1>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne.
          </p>
        </div>
      </div>

      <section className="bg-gray-950 min-h-screen py-12 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar */}
            <aside className="lg:w-60 shrink-0">
              <div className="sticky top-28 bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-5">Catégories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedFilter(null)}
                      className={`text-left w-full text-sm font-semibold transition-colors py-1 ${!selectedFilter ? 'text-gold-400' : 'text-gray-400 hover:text-white'}`}
                    >
                      Tout voir <span className="text-gray-600 text-xs ml-1">({allPosts.length})</span>
                    </button>
                  </li>
                  {categories.map(cat => {
                    const count = allPosts.filter(p => p.category === cat).length;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => setSelectedFilter(cat)}
                          className={`text-left w-full text-sm font-semibold transition-colors py-1 ${selectedFilter === cat ? 'text-gold-400' : 'text-gray-400 hover:text-white'}`}
                        >
                          {cat} <span className="text-gray-600 text-xs ml-1">({count})</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {allTags.length > 0 && (
                  <>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-8 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedFilter(tag)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                            selectedFilter === tag
                              ? 'bg-gold-500 text-gray-900 border-gold-500'
                              : 'border-gray-700 text-gray-400 hover:border-gold-500 hover:text-gold-400'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              {selectedFilter && (
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-white text-xl">
                    {selectedFilter}
                    <span className="text-gray-500 text-sm font-normal ml-3">({filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''})</span>
                  </h2>
                  <button onClick={() => setSelectedFilter(null)} className="text-xs text-gray-500 hover:text-gold-400 transition-colors font-medium">
                    ✕ Effacer le filtre
                  </button>
                </div>
              )}

              <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                {filteredPosts.map((post, i) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group block break-inside-avoid bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gold-500/40 hover:shadow-[0_0_40px_rgba(202,163,82,0.08)] transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={`Taxi Fontainebleau - ${post.title}`}
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                        loading={i < 6 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                        <span className="bg-gold-500 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                        {post.tags.filter(t => t !== post.category && t !== 'AFB Taxis').slice(0, 1).map(tag => (
                          <span key={tag} className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">
                        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      <h3 className="font-display font-bold text-[1.15rem] leading-snug text-white mb-3 group-hover:text-gold-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {post.description}
                      </p>
                      <span className="text-sm font-bold text-gold-400 group-hover:gap-3 flex items-center gap-2 transition-all">
                        Lire l'article <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-gray-500 text-lg">Aucun article trouvé pour ce filtre.</p>
                  <button onClick={() => setSelectedFilter(null)} className="mt-4 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                    Voir tous les articles →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ContactSection onOpenBooking={() => openBooking('Contact depuis le Blog')} />
    </>
  );
}
