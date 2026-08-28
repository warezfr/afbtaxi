import { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { ContactSection } from '@/components/ContactSection';

export function BlogList() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allPosts = useBlogPosts();

  const categories = useMemo(() => {
    const cats = allPosts.map(post => post.category);
    return Array.from(new Set(cats)).sort();
  }, [allPosts]);

  const allTags = useMemo(() => {
    const tags = allPosts.flatMap(post => post.tags);
    return Array.from(new Set(tags)).filter(t => t !== 'AFB Taxis' && t !== 'Fontainebleau').sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return allPosts;
    return allPosts.filter(post => post.category === selectedCategory || post.tags.includes(selectedCategory));
  }, [selectedCategory, allPosts]);

  return (
    <>
      <Helmet>
        <title>Blog Fontainebleau : Tourisme, Actualités et Transport | AFB Taxis</title>
        <meta name="description" content="Découvrez nos articles sur Fontainebleau, ses châteaux, sa forêt, l'INSEAD et les astuces pour bien organiser vos transports en Seine-et-Marne." />
        <link rel="canonical" href="https://www.afbtaxis.com/blog" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Le Mag de Fontainebleau par AFB Taxis",
              "url": "https://www.afbtaxis.com/blog",
              "description": "Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne."
            }
          `}
        </script>

      </Helmet>

      <div className="bg-gray-900 dark:bg-gray-950 pt-32 pb-16 px-4">
         <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">Le Mag de <span className="text-gold-400">Fontainebleau</span></h1>
            <p className="mt-6 text-lg text-gray-400 dark:text-gray-500">Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne.</p>
         </div>
      </div>

      <section className="py-12 lg:py-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-28 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="font-display font-black text-lg text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Catégories</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-left w-full text-sm font-semibold transition-colors ${!selectedCategory ? 'text-gold-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                      Tout voir
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left w-full text-sm font-semibold transition-colors ${selectedCategory === cat ? 'text-gold-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>

                {allTags.length > 0 && (
                  <>
                    <h3 className="font-display font-black text-gray-900 dark:text-white mt-8 mb-4 uppercase tracking-widest text-xs">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedCategory(tag)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${selectedCategory === tag ? 'bg-gold-500 text-gray-900 border-gold-500' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gold-400 hover:text-gold-500'}`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </aside>

            {/* Masonry Grid */}
            <div className="flex-1">
              <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                {filteredPosts.map(post => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="group block break-inside-avoid bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur-sm text-gold-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {post.category}
                      </div>
                      <img src={post.imageUrl} alt={post.title} className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-3">{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-gold-500 transition-colors leading-tight">{post.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">{post.description}</p>
                      <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 group-hover:text-gold-500 transition-colors">
                        Lire l'article &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé pour cette catégorie.</p>
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
