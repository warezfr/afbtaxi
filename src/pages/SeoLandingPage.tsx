import { useOutletContext, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '@/components/PageHeader';
import { NotFound } from '@/pages/NotFound';
import { Services } from '@/components/Services';
import { Fleet } from '@/components/Fleet';
import { RouteLine } from '@/components/RouteLine';
import { ContactSection } from '@/components/ContactSection';
import { SEO_PAGES } from '@/lib/seo-data';

export function SeoLandingPage() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const { slug } = useParams<{ slug: string }>();

  const pageData = SEO_PAGES.find((p) => p.slug === slug);

  if (!pageData) return <NotFound />;

  const url = `https://www.afbtaxis.com/${pageData.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: pageData.title, description: pageData.description, url },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.afbtaxis.com/' },
          { '@type': 'ListItem', position: 2, name: pageData.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <PageHeader
        title={pageData.h1}
        subtitle={pageData.subtitle}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: pageData.h1, to: `/${pageData.slug}` }]}
      >
        <button
          type="button"
          onClick={() => openBooking(pageData.h1)}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold-400 px-7 py-3 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Réserver
        </button>
      </PageHeader>

      <Services onOpenBooking={openBooking} />
      <Fleet onOpenBooking={openBooking} />
      <RouteLine />
      <ContactSection onOpenBooking={() => openBooking(pageData.h1)} />
    </>
  );
}
