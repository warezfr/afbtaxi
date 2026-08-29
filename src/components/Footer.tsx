import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { LegalModals, LegalDocType } from './LegalModals';

export function Footer() {
  const { t } = useI18n();
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(null);

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-14 pb-24 sm:px-6 sm:pb-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + NAP with microdata */}
          <div itemScope itemType="https://schema.org/LocalBusiness">
            <meta itemProp="name" content={COMPANY.name} />
            <meta itemProp="telephone" content={COMPANY.phoneIntl} />
            <meta itemProp="email" content={COMPANY.email} />
            <meta itemProp="url" content={COMPANY.website} />
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <meta itemProp="streetAddress" content={COMPANY.street} />
              <meta itemProp="addressLocality" content={COMPANY.city} />
              <meta itemProp="postalCode" content={COMPANY.postalCode} />
              <meta itemProp="addressRegion" content={COMPANY.region} />
              <meta itemProp="addressCountry" content={COMPANY.country} />
            </div>
            <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
              <meta itemProp="latitude" content={String(COMPANY.lat)} />
              <meta itemProp="longitude" content={String(COMPANY.lng)} />
            </div>

            <div className="flex items-center gap-3.5 group cursor-default">
<div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gold-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M10 2h4"/>
              <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/>
              <path d="M7 14h.01"/>
              <path d="M17 14h.01"/>
              <rect width="18" height="8" x="3" y="10" rx="2"/>
              <path d="M5 18v2"/>
              <path d="M19 18v2"/>
              <defs>
                <linearGradient id="goldGradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE047" />
                  <stop offset="0.5" stopColor="#EAB308" />
                  <stop offset="1" stopColor="#CA8A04" />
                </linearGradient>
              </defs>
            </svg>
          </div>
              <span className="font-display text-xl tracking-tight text-gray-900 dark:text-white">
                <strong className="font-black">AFB</strong>
                <span className="text-gold-500 mx-[1px] font-bold">.</span>
                <span className="font-medium opacity-90">Taxis</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t('footer.desc')}
            </p>

            <div className="mt-5 space-y-2.5">
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gold-600 dark:hover:text-gold-400">
                <Phone size={14} className="text-gold-600" />
                <span>{COMPANY.phone}</span>
              </a>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gold-600 dark:hover:text-gold-400">
                <Mail size={14} className="text-gold-600" />
                <span>{COMPANY.email}</span>
              </button>
              <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gold-600 dark:hover:text-gold-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold-600" />
                <span>{COMPANY.address}</span>
              </a>
            </div>

            {/* Google Preferred Source Badge */}
            <div className="mt-6">
              <a 
                href="https://www.google.com/preferences/source?q=afbtaxis.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm transition-[transform,colors] hover:scale-105 hover:border-gray-300 dark:hover:border-gray-700"
                title="Ajouter AFB Taxis à vos sources d'actualités préférées sur Google"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Ajouter comme Source Préférée
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-gray-900 dark:text-white">{t('footer.nav')}</p>
            <nav className="flex flex-col gap-2.5">
              <a href="#services" className="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">{t('footer.nav.services')}</a>
              <a href="#flotte" className="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">{t('footer.nav.fleet')}</a>
              <a href="#tarifs" className="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">{t('footer.nav.tarifs')}</a>
              <a href="#zones" className="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">{t('footer.nav.zones')}</a>
              <a href="#contact" className="text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">{t('footer.nav.contact')}</a>
            </nav>
          </div>

          {/* Legal + Local info */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-gray-900 dark:text-white">{t('footer.legal')}</p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>{t('footer.legal.siret')} : {COMPANY.siret}</p>
              <p>{t('footer.legal.form')} : {COMPANY.legalForm}</p>
              <p>{t('footer.legal.parking')} : {COMPANY.stationnement}</p>
              <p>{t('footer.legal.cpam')}</p>
              
              <div className="pt-3 flex flex-col gap-2">
                <button onClick={() => setActiveDoc('mentions')} className="text-left text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gold-600 dark:hover:text-gold-400 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-2">Mentions légales</button>
                <button onClick={() => setActiveDoc('privacy')} className="text-left text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gold-600 dark:hover:text-gold-400 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-2">Politique de confidentialité</button>
                <button onClick={() => setActiveDoc('cookies')} className="text-left text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-gold-600 dark:hover:text-gold-400 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-2">Gestion des cookies</button>
              </div>
            </div>

            <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-[.18em] text-gray-900 dark:text-white">{t('footer.zones')}</p>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t('footer.zonesList')}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-8 md:flex-row">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. {t('footer.rights')}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
      <div className="taxi-checker h-2.5" />
      
      <LegalModals activeDoc={activeDoc} onClose={() => setActiveDoc(null)} />
    </footer>
  );
}
