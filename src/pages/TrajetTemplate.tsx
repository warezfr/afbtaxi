import { Link, useOutletContext, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { PageHeader } from '@/components/PageHeader';
import { NotFound } from '@/pages/NotFound';
import trajets from '@/data/trajets.json';

const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const HEADER_IMAGE = 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=1200';
const ARGUMENTS = [
  'Prix fixe annoncé lors de la réservation',
  'Chauffeur professionnel et ponctuel',
  'Mercedes Classe E ou Classe V',
  'Prise en charge des bagages',
  'Attente incluse en cas de retard de vol ou de train',
];

export function TrajetTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const reduce = useReducedMotion();
  const trajet = trajets.find((t) => t.slug === slug);

  if (!trajet) return <NotFound />;

  const url = `https://www.afbtaxis.com/trajets/${trajet.slug}`;
  const others = trajets.filter((t) => t.slug !== trajet.slug);
  const stats = [
    { label: 'Distance', value: trajet.distance },
    { label: 'Durée estimée', value: trajet.duration },
    { label: 'Berline (1 à 4 pers.)', value: `Dès ${trajet.priceCar}` },
    { label: 'Van (5 à 7 pers.)', value: `Dès ${trajet.priceVan}` },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: trajet.h1,
        description: trajet.description,
        serviceType: 'Chauffeur privé et taxi',
        areaServed: [trajet.origin, trajet.destination],
        url,
        provider: { '@type': 'Organization', name: 'AFB Taxis', url: 'https://www.afbtaxis.com' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.afbtaxis.com/' },
          { '@type': 'ListItem', position: 2, name: trajet.h1, item: url },
        ],
      },
    ],
  };

  const view = {
    initial: reduce ? false : ('hidden' as const),
    whileInView: 'show' as const,
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <>
      <Helmet>
        <title>{`${trajet.title} | AFB Taxis`}</title>
        <meta name="description" content={trajet.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={trajet.title} />
        <meta property="og:description" content={trajet.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <PageHeader
        title={trajet.h1}
        subtitle={trajet.description}
        image={HEADER_IMAGE}
        imageAlt={`Chauffeur privé AFB Taxis, trajet ${trajet.origin} vers ${trajet.destination}`}
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: trajet.h1, to: `/trajets/${trajet.slug}` }]}
      >
        <button
          type="button"
          onClick={() => openBooking(`${trajet.origin} - ${trajet.destination}`)}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold-400 px-7 py-3 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Réserver
        </button>
      </PageHeader>

      <section className="border-b border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:divide-x md:divide-zinc-200 md:dark:divide-white/10 lg:px-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 md:px-8 md:first:pl-0 ${i % 2 === 1 ? 'border-l border-zinc-200 pl-6 dark:border-white/10 md:border-l-0' : ''} ${i > 1 ? 'border-t border-zinc-200 dark:border-white/10 md:border-t-0' : ''}`}
            >
              <dt className="text-sm text-zinc-600 dark:text-zinc-400">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-zinc-50 py-20 dark:bg-zinc-950 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <motion.article {...view} variants={fadeUp}>
            <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight">
              <h2>Votre trajet {trajet.origin} - {trajet.destination}</h2>
              <p>{trajet.content}</p>
            </div>
            <ul className="mt-8 divide-y divide-zinc-200 dark:divide-white/10">
              {ARGUMENTS.map((a) => (
                <li key={a} className="flex items-center gap-3 py-3 text-zinc-700 dark:text-zinc-300">
                  <CheckCircle size={22} weight="regular" className="shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              {...view}
              variants={fadeUp}
              className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-none md:p-8"
            >
              <h2 className="font-display text-2xl tracking-tight text-zinc-900 dark:text-zinc-50">Réserver ce trajet</h2>
              <dl className="mt-6 divide-y divide-zinc-200 dark:divide-white/10">
                <div className="py-3">
                  <dt className="text-sm text-zinc-600 dark:text-zinc-400">Départ</dt>
                  <dd className="font-medium text-zinc-900 dark:text-zinc-50">{trajet.origin}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-sm text-zinc-600 dark:text-zinc-400">Arrivée</dt>
                  <dd className="font-medium text-zinc-900 dark:text-zinc-50">{trajet.destination}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => openBooking(`${trajet.origin} - ${trajet.destination}`)}
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-gold-400 px-8 py-3 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                Réserver
              </button>
            </motion.div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-zinc-900 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
            Autres trajets
          </h2>
          <motion.ul {...view} variants={stagger} className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
            {others.map((o) => (
              <motion.li key={o.slug} variants={fadeUp}>
                <Link
                  to={`/trajets/${o.slug}`}
                  className="group flex min-h-[64px] items-center justify-between gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
                >
                  <span className="font-display text-lg tracking-tight text-zinc-900 group-hover:text-gold-700 dark:text-zinc-50 dark:group-hover:text-gold-300">{o.h1}</span>
                  <span className="flex items-center gap-4 text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
                    <span>{o.distance}</span>
                    <span>Dès {o.priceCar}</span>
                    <ArrowRight size={18} weight="regular" aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
