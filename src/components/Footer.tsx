import { Phone, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-ink py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={COMPANY.logoUrl}
                alt={`Logo ${COMPANY.name}`}
                className="h-12 w-12 rounded-full bg-white object-contain p-0.5"
              />
              <div>
                <span className="block text-lg font-bold text-white">
                  {COMPANY.name}
                </span>
                <span className="text-xs text-yellow-400">
                  Fontainebleau · Île-de-France
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Votre taxi professionnel à Fontainebleau et en Île-de-France.
              Ponctualité, fiabilité et respect de vos horaires, 7j/7.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-400" />
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="transition-colors hover:text-yellow-400"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-400" />
                <span>{COMPANY.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Mentions légales
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                {COMPANY.legalForm} — SIRET {COMPANY.siret}
              </li>
              <li>Créée en {COMPANY.foundedYear}</li>
              <li>
                <a
                  href="#/admin"
                  className="transition-colors hover:text-yellow-400"
                >
                  Accès backoffice
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
