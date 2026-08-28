import { Link, useOutletContext, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ContactSection } from '@/components/ContactSection';

export function BlogPost() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const { slug } = useParams<{ slug: string }>();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | AFB Taxis</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://www.afbtaxis.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${post.title}",
              "image": "${post.imageUrl}",
              "datePublished": "${post.date}",
              "dateModified": "${post.date}",
              "author": [{
                  "@type": "Organization",
                  "name": "AFB Taxis",
                  "url": "https://www.afbtaxis.com/"
              }]
            }
          `}
        </script>

      </Helmet>

      <article className="bg-white dark:bg-gray-950 pt-20">
        {/* Full width hero image */}
        <div className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] relative overflow-hidden mb-12 lg:mb-16">
           <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />
           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:px-16 md:pb-16 text-white max-w-5xl mx-auto flex flex-col justify-end h-full">
             <div>
               <span className="bg-gold-500 text-gray-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block">{post.category}</span>
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">{post.title}</h1>
               <p className="mt-6 text-gray-300 font-medium tracking-wide uppercase text-sm">{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
             </div>
           </div>
        </div>

        {/* Content container */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-10 transition-colors">
            <ArrowLeft size={16} /> Retour aux articles
          </Link>

          <div className="markdown-content text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 
            [&>h2]:font-display [&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-gray-900 [&>h2]:dark:text-white [&>h2]:mt-12 [&>h2]:mb-6
            [&>h3]:font-display [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:dark:text-white [&>h3]:mt-10 [&>h3]:mb-4
            [&>p]:mb-6 [&>p>strong]:text-gray-900 [&>p>strong]:dark:text-white
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li>strong]:text-gray-900 [&>ul>li>strong]:dark:text-white
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
            [&>blockquote]:border-l-4 [&>blockquote]:border-gold-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:dark:text-gray-400
            [&_a]:text-gold-600 [&_a]:dark:text-gold-500 [&_a]:underline hover:[&_a]:text-gold-500"
          >
             <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>


      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900/50 py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-gold-500 pl-4">À lire aussi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <Link key={related.slug} to={`/blog/${related.slug}`} className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="relative h-48 overflow-hidden">
                    <img src={related.imageUrl} alt={`Taxi Fontainebleau - ${related.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-gold-500 transition-colors leading-tight line-clamp-2">{related.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

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
