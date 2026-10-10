import { Link, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '@/components/PageHeader';

export function NotFound() {
  const ctx = useOutletContext<{ openBooking: (context?: string) => void } | null>();
  const linkClass =
    'inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

  return (
    <>
      <Helmet>
        <title>Page introuvable | AFB Taxis</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHeader
        title="Page introuvable"
        subtitle="Le lien est peut-être ancien ou mal saisi. Reprenez depuis l'une de ces pages."
      >
        <Link to="/" className={linkClass}>Accueil</Link>
        <Link to="/blog" className={linkClass}>Le Mag</Link>
        <button
          type="button"
          onClick={() => ctx?.openBooking()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold-400 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Réserver
        </button>
      </PageHeader>
    </>
  );
}
