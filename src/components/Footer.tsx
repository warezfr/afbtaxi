import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
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
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400">
                <span className="text-base font-black text-ink">A</span>
              </div>
              <span className="text-lg font-black text-white">AFB<span className="text-gold-400">.</span>Taxis</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Service de taxi premium à Fontainebleau depuis 2004. Transferts aéroports, gares et courses locales.
            </p>

            {/* NAP visible */}
            <div className="mt-5 space-y-2">
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-gold-400">
                <Phone size={14} className="text-gold-400" />
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-gold-400">
                <Mail size={14} className="text-gold-400" />
                <span>{COMPANY.email}</span>
              </a>
              <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-neutral-400 transition hover:text-gold-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{COMPANY.address}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              <a href="#services" className="text-sm text-neutral-500 transition-colors hover:text-white">Services</a>
              <a href="#flotte" className="text-sm text-neutral-500 transition-colors hover:text-white">Flotte</a>
              <a href="#tarifs" className="text-sm text-neutral-500 transition-colors hover:text-white">Tarifs</a>
              <a href="#zones" className="text-sm text-neutral-500 transition-colors hover:text-white">Zones desservies</a>
              <a href="#contact" className="text-sm text-neutral-500 transition-colors hover:text-white">Contact</a>
            </nav>
          </div>

          {/* Legal + Local info */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">Informations légales</p>
            <div className="space-y-2 text-sm text-neutral-500">
              <p>SIRET : {COMPANY.siret}</p>
              <p>Forme juridique : {COMPANY.legalForm}</p>
              <p>Stationnement : {COMPANY.stationnement}</p>
              <p>Conventionné CPAM 77</p>
            </div>

            <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wider text-gold-400">Zones principales</p>
            <p className="text-sm leading-relaxed text-neutral-500">
              Fontainebleau · Avon · Dammarie-les-Lys · Melun · Nemours · Paris · Île-de-France
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-600">
            Taxi conventionné CPAM 77 — Fontainebleau & Seine-et-Marne
          </p>
        </div>
      </div>
    </footer>
  );
}
