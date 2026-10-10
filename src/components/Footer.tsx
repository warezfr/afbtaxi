import { useState } from 'react';
import { Link } from 'react-router';
import { Phone, Envelope, MapPin } from '@phosphor-icons/react';
import { useI18n } from '../lib/i18n';
import { COMPANY } from '../lib/constants';
import { Logo } from './Logo';
import { LegalModals } from './LegalModals';

export function Footer() {
  const { t } = useI18n();
  const [activeDoc, setActiveDoc] = useState<'mentions' | 'privacy' | 'cookies' | null>(null);

  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 pb-28 lg:pb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]" itemScope itemType="https://schema.org/LocalBusiness">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-6 text-zinc-50" aria-label="Accueil">
              <Logo variant="horizontal" className="h-10" />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400" itemProp="description">
              {t('footer.desc')}
            </p>
            <a href={`tel:${COMPANY.phoneRaw}`} className="font-display text-2xl font-bold tracking-tight text-white hover:text-gold-400 transition-colors" itemProp="telephone">
              {COMPANY.phone}
            </a>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-white">Services</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="#services" className="text-sm transition-colors hover:text-gold-400">Tous les services</a></li>
              <li><a href="#flotte" className="text-sm transition-colors hover:text-gold-400">Transferts Aéroports (Orly, CDG)</a></li>
              <li><a href="#flotte" className="text-sm transition-colors hover:text-gold-400">Gares Paris & Île-de-France</a></li>
              <li><a href="#services" className="text-sm transition-colors hover:text-gold-400">Transport Sanitaire (CPAM 77)</a></li>
              <li><a href="#services" className="text-sm transition-colors hover:text-gold-400">Mise à disposition VIP</a></li>
              <li><a href="#services" className="text-sm transition-colors hover:text-gold-400">Van 7 places</a></li>
            </ul>
          </div>

          {/* Col 3: Mag */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-white">Mag</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/blog" className="text-sm font-semibold transition-colors hover:text-gold-400 text-gold-400">Fontainebleau Mag</Link></li>
              <li><Link to="/partenaires" className="text-sm transition-colors hover:text-gold-400">Partenariats</Link></li>
              <li className="pt-2"><Link to="/blog/transfert-aeroport-orly-roissy-cdg-fontainebleau" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">Guide Transferts Aéroports</Link></li>
              <li><Link to="/blog/comment-reserver-taxi-conventionne-cpam-2026" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">Taxi conventionné CPAM</Link></li>
              <li><Link to="/blog/visiter-chateau-fontainebleau-guide" className="text-sm text-zinc-500 transition-colors hover:text-zinc-300">Visiter le Château</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-white">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm transition-colors hover:text-gold-400">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-gold-500" />
                    <span itemProp="streetAddress">{COMPANY.address}</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="shrink-0 text-gold-500" />
                  <span>24/7 sur réservation</span>
                </div>
              </li>
              <li>
                <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} className="flex items-center gap-3 text-sm transition-colors hover:text-gold-400">
                  <Envelope size={18} className="shrink-0 text-gold-500" />
                  <span itemProp="email">{COMPANY.email}</span>
                </button>
              </li>
            </ul>
            <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates" className="hidden">
              <span itemProp="latitude">{COMPANY.lat}</span>
              <span itemProp="longitude">{COMPANY.lng}</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}, {COMPANY.legalForm}. SIRET {COMPANY.siret}. CPAM 77.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <button onClick={() => setActiveDoc('mentions')} className="transition-colors hover:text-zinc-300 underline decoration-zinc-800 underline-offset-4">Mentions légales</button>
            <button onClick={() => setActiveDoc('privacy')} className="transition-colors hover:text-zinc-300 underline decoration-zinc-800 underline-offset-4">Confidentialité</button>
            <button onClick={() => setActiveDoc('cookies')} className="transition-colors hover:text-zinc-300 underline decoration-zinc-800 underline-offset-4">CGV</button>
          </div>
        </div>
      </div>
      
      {/* Taxi Strip */}
      <div className="taxi-checker h-2.5" />

      <LegalModals activeDoc={activeDoc} onClose={() => setActiveDoc(null)} />
    </footer>
  );
}
