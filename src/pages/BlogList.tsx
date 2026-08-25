import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ContactSection } from '@/components/ContactSection';

export function BlogList() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();

  return (
    <>
      <Helmet>
        <title>Blog Fontainebleau : Tourisme, Actualités et Transport | AFB Taxis</title>
        <meta name="description" content="Découvrez nos articles sur Fontainebleau, ses châteaux, sa forêt, l'INSEAD et les astuces pour bien organiser vos transports en Seine-et-Marne." />
      </Helmet>

      <div className="bg-gray-900 pt-32 pb-16 px-4">
         <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">Le Mag de <span className="text-gold-400">Fontainebleau</span></h1>
            <p className="mt-6 text-lg text-gray-400">Tourisme, patrimoine, bons plans locaux et actualités du VTC en Seine-et-Marne.</p>
         </div>
      </div>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-gold-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 font-medium mb-3">{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">{post.description}</p>
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2 mt-auto group-hover:text-gold-600 transition-colors">
                    Lire l'article &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection onOpenBooking={() => openBooking('Contact depuis le Blog')} />
    </>
  );
}
