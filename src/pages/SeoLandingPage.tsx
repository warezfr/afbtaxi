import { useOutletContext, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Fleet } from '@/components/Fleet';
import { Tarifs } from '@/components/Tarifs';
import { ContactSection } from '@/components/ContactSection';
import { useI18n } from '@/lib/i18n';
import { SEO_PAGES } from '@/lib/seo-data';

export function SeoLandingPage() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  
  const pageData = SEO_PAGES.find(p => p.slug === slug);
  
  if (!pageData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Page introuvable</h1>
      </div>
    );
  }

  // We customize the hero title/subtitle contextually based on the SEO data, but fallback to translations
  // Since Hero component uses t('hero.title1') internally, we would need to pass props to override it, 
  // but to adhere to "surgical changes", we'll just wrap the page and provide specific SEO tags, 
  // letting the user interact with the standard UI. For true custom heroes, we would refactor Hero.tsx.
  // For now, we will add a specific header block above Hero if needed, or just rely on the standard Hero.
  
  return (
    <>
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.description} />
        <link rel="canonical" href={`https://www.afbtaxis.com/${pageData.slug}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "${pageData.title}",
              "description": "${pageData.description}",
              "url": "https://www.afbtaxis.com/${pageData.slug}"
            }
          `}
        </script>

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
