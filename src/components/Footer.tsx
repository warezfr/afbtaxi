import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();

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

            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gold-400">
                <span className="font-display text-base font-black text-gray-900">A</span>
                <div className="taxi-checker absolute bottom-0 left-0 right-0 h-1.5" />
              </div>
              <span className="font-display text-lg font-black text-gray-900 dark:text-white">AFB<span className="text-gold-500">.</span>Taxis</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {t('footer.desc')}
            </p>

            <div className="mt-5 space-y-2.5">
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gold-600 dark:hover:text-gold-400">
                <Phone size={14} className="text-gold-600" />
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gold-600 dark:hover:text-gold-400">
                <Mail size={14} className="text-gold-600" />
                <span>{COMPANY.email}</span>
              </a>
              <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-gold-600 dark:hover:text-gold-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold-600" />
                <span>{COMPANY.address}</span>
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
    </footer>
  );
}
