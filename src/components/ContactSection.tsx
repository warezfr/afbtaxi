import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

interface Props {
  onOpenBooking: () => void;
}

export function ContactSection({ onOpenBooking }: Props) {
  const { t } = useI18n();

  return (
    <section id="contact" className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-400">
            {t('contact.title')}
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            {t('contact.subtitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-neutral-400">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{t('contact.phone')}</h3>
                <a href={`tel:${COMPANY.phoneRaw}`} className="text-neutral-400 transition-colors hover:text-yellow-400">
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{t('contact.email')}</h3>
                <a href={`mailto:${COMPANY.email}`} className="text-neutral-400 transition-colors hover:text-yellow-400">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{t('contact.address')}</h3>
                <p className="text-neutral-400">{COMPANY.address}</p>
                <p className="text-sm text-neutral-500">{t('contact.parking')} : {COMPANY.stationnement}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{t('contact.hours')}</h3>
                <p className="text-neutral-400">{t('contact.hoursValue')}</p>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-yellow-400 px-7 py-4 font-extrabold text-neutral-950 shadow-[0_12px_35px_rgba(255,196,0,.2)] transition-all hover:-translate-y-1 hover:bg-yellow-300"
            >
              {t('hero.cta')}
              <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-neutral-700">
            <iframe
              title="Carte AFB Taxis"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.6%2C48.5%2C2.7%2C48.55&layer=mapnik&marker=48.514%2C2.648"
              className="h-80 w-full lg:h-full lg:min-h-[400px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
