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
      </Helmet>

      <article className="bg-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour aux articles
          </Link>
          
          <div className="mb-8">
             <span className="bg-gold-100 text-gold-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">{post.category}</span>
             <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">{post.title}</h1>
             <p className="mt-4 text-gray-500">{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>

          <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-md">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-headings:font-black prose-a:text-gold-600 hover:prose-a:text-gold-500">
             <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <div className="bg-gray-50 py-16 text-center px-4">
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Besoin d'un transport dans la région ?</h3>
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
