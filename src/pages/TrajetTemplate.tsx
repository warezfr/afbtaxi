import { useParams, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, Clock, Car, ShieldCheck, CheckCircle2 } from 'lucide-react';
import trajets from '@/data/trajets.json';
import { NotFound } from '@/pages/NotFound';

export function TrajetTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const trajet = trajets.find((t) => t.slug === slug);

  if (!trajet) {
    return <NotFound />;
  }

  const pageUrl = `https://www.afbtaxis.com/trajets/${trajet.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: trajet.title,
    description: trajet.description,
    url: pageUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.afbtaxis.com/' },
        { '@type': 'ListItem', position: 2, name: trajet.title, item: pageUrl },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>{trajet.title} | AFB Taxis</title>
        <meta name="description" content={trajet.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={trajet.title} />
        <meta property="og:description" content={trajet.description} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="bg-white dark:bg-gray-950">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=2000" 
              alt={trajet.title}
              className="w-full h-full object-cover opacity-90 dark:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40 dark:from-gray-950 dark:via-gray-950/80 dark:to-gray-950/40" />
            <div className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 mix-blend-multiply" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/20 text-gold-600 dark:text-gold-400 font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur-md border border-gold-400/30">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse-gold"></span>
              Service 24H/24 & 7J/7
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-gray-900 dark:text-white tracking-tight mb-6 drop-shadow-sm">
              {trajet.h1.split(' ↔ ')[0]} <br/>
              <span className="text-gold-600 dark:text-gold-400">↔ {trajet.h1.split(' ↔ ')[1]}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 drop-shadow-sm">
              {trajet.description}
            </p>
            <button 
              onClick={() => openBooking(`Réservation: ${trajet.origin} ↔ ${trajet.destination}`)}
              className="inline-flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gold-500 hover:text-gray-900 transition-all shadow-xl hover:scale-105"
            >
              Réserver ce trajet <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Info Grid */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <MapPin className="mx-auto text-gold-500 mb-3" size={32} />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Distance</p>
                <p className="text-xl font-black text-gray-900 dark:text-white">{trajet.distance}</p>
              </div>
              <div className="p-4 border-l border-gray-200 dark:border-gray-800">
                <Clock className="mx-auto text-gold-500 mb-3" size={32} />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Temps estimé</p>
                <p className="text-xl font-black text-gray-900 dark:text-white">{trajet.duration}</p>
              </div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800">
                <Car className="mx-auto text-gold-500 mb-3" size={32} />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Berline (1-4p)</p>
                <p className="text-xl font-black text-gray-900 dark:text-white">Dès {trajet.priceCar}</p>
              </div>
              <div className="p-4 border-t border-l md:border-t-0 border-gray-200 dark:border-gray-800">
                <Car className="mx-auto text-gold-500 mb-3" size={32} />
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Van (5-7p)</p>
                <p className="text-xl font-black text-gray-900 dark:text-white">Dès {trajet.priceVan}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="prose prose-lg dark:prose-invert prose-gold">
                <h2>Un service sur-mesure pour votre trajet {trajet.origin} - {trajet.destination}</h2>
                <p>{trajet.content}</p>
                <ul className="mt-8 space-y-4 not-prose">
                  {[
                    "Prix fixe garanti lors de la réservation",
                    "Chauffeur privé professionnel et ponctuel",
                    "Véhicules haut de gamme (Mercedes Classe E, Classe V)",
                    "Prise en charge des bagages",
                    "Attente gratuite en cas de retard de vol/train"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl">
                <h3 className="text-2xl font-black font-display text-gray-900 dark:text-white mb-6">Demander un devis immédiat</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Départ</label>
                    <input type="text" readOnly value={trajet.origin} className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-medium focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Arrivée</label>
                    <input type="text" readOnly value={trajet.destination} className="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white font-medium focus:outline-none" />
                  </div>
                  <button onClick={() => openBooking(`Réservation: ${trajet.origin} ↔ ${trajet.destination}`)} className="w-full mt-4 bg-gold-400 hover:bg-gold-500 text-gray-900 font-black uppercase tracking-widest py-4 rounded-xl transition-colors">
                    Continuer la réservation
                  </button>
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" /> Paiement sécurisé à bord ou en ligne
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
