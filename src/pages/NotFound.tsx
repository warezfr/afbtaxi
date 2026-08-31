import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page introuvable | AFB Taxis</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Cette page n'existe pas. Retournez à l'accueil AFB Taxis Fontainebleau." />
      </Helmet>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-gold-500">Erreur 404</p>
        <h1 className="mt-4 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
          Page introuvable
        </h1>
        <p className="mt-4 max-w-md text-gray-500 dark:text-gray-400">
          Cette adresse ne correspond à aucune page du site. Utilisez le menu ou revenez à l'accueil.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-400 px-8 py-3 font-bold text-gray-900 hover:bg-gold-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </>
  );
}
