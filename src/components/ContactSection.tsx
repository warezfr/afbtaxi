import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export function ContactSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { t } = useI18n();

  return (
    <section id="contact" className="relative overflow-hidden bg-white pb-16 pt-16 lg:pb-28 lg:pt-24" style={{ contentVisibility: 'auto' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Big phone banner */}
        <div className="reveal mb-12 text-center lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-gray-400 sm:text-sm">{t('contact.phone')} — 24/7</p>
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            data-testid="contact-big-phone"
            className="mt-2 inline-block font-display text-4xl font-black tracking-tight text-gray-900 transition-colors hover:text-gold-500 sm:text-6xl lg:text-7xl"
          >
            {COMPANY.phone}
          </a>
        </div>

        <div className="reveal relative overflow-hidden rounded-[2rem] bg-gray-900 p-8 sm:p-12 lg:p-16">
          {/* Accents */}
          <div className="taxi-checker absolute left-0 right-0 top-0 h-3" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/10 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-400/5 blur-[80px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-400 sm:text-sm">
                <span className="h-px w-8 bg-gold-400" />
                {t('contact.title')}
              </p>
              <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
                {t('contact.subtitle1')}<span className="text-gold-400">{t('contact.subtitle2')}</span>{t('contact.subtitle3')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                {t('contact.description')}
              </p>

              <button
                data-testid="contact-book-button"
                onClick={onOpenBooking}
                className="mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-gold-400 px-8 py-4 font-bold text-gray-900 transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-gold-300"
              >
                {t('contact.cta')}
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                data-testid="contact-phone-card"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-[border-color,background-color] duration-300 hover:border-gold-400/50 hover:bg-gold-400/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400">
                  <Phone size={19} className="text-gray-900" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{t('contact.phone')}</p>
                  <p className="text-lg font-bold text-white">{COMPANY.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                data-testid="contact-email-card"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-[border-color,background-color] duration-300 hover:border-gold-400/50 hover:bg-gold-400/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={19} className="text-gold-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{t('contact.email')}</p>
                  <p className="truncate text-base font-bold text-white">{COMPANY.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={19} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{t('contact.address')}</p>
                  <p className="text-sm font-semibold text-white">{COMPANY.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
