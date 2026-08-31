import { useOutletContext, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Services } from '@/components/Services';
import { Fleet } from '@/components/Fleet';
import { Tarifs } from '@/components/Tarifs';
import { ContactSection } from '@/components/ContactSection';
import { SEO_PAGES } from '@/lib/seo-data';
import { NotFound } from '@/pages/NotFound';

export function SeoLandingPage() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const { slug } = useParams<{ slug: string }>();
  const pageData = SEO_PAGES.find(p => p.slug === slug);

  if (!pageData) {
    return <NotFound />;
  }
  
  const pageUrl = `https://www.afbtaxis.com/${pageData.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.title,
    description: pageData.description,
    url: pageUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.afbtaxis.com/' },
        { '@type': 'ListItem', position: 2, name: pageData.h1, item: pageUrl },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      
      {/* Optional: Add a localized H1 here if we want to force the keyword for SEO before the standard Hero */}
      <div className="bg-gray-900 pt-32 pb-8 text-center px-4">
         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">{pageData.h1}</h1>
         <p className="mt-4 text-gold-400 font-medium text-lg max-w-2xl mx-auto">{pageData.subtitle}</p>
      </div>
      
      <Services onOpenBooking={openBooking} />
      <Fleet onOpenBooking={openBooking} />
      <Tarifs />
      <ContactSection onOpenBooking={() => openBooking(pageData.h1)} />
    </>
  );
}
