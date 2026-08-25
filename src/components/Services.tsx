import { ArrowUpRight, Plane, HeartPulse, Car, TrainFront, Clock, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface ServicesProps {
  onOpenBooking: (context?: string) => void;
}

export function Services({ onOpenBooking }: ServicesProps) {
  const { t } = useI18n();

  const SERVICE_CARDS = [
    { titleKey: 'services.airport.title' as const, tagKey: 'services.airport.tag' as const, descKey: 'services.airport.desc' as const, icon: Plane, accent: true },
    { titleKey: 'services.station.title' as const, tagKey: 'services.station.tag' as const, descKey: 'services.station.desc' as const, icon: TrainFront, accent: false },
    { titleKey: 'services.medical.title' as const, tagKey: 'services.medical.tag' as const, descKey: 'services.medical.desc' as const, icon: HeartPulse, accent: false },
    { titleKey: 'services.disposal.title' as const, tagKey: 'services.disposal.tag' as const, descKey: 'services.disposal.desc' as const, icon: Clock, accent: false },
    { titleKey: 'services.group.title' as const, tagKey: 'services.group.tag' as const, descKey: 'services.group.desc' as const, icon: Users, accent: false },
    { titleKey: 'services.local.title' as const, tagKey: 'services.local.tag' as const, descKey: 'services.local.desc' as const, icon: Car, accent: true },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">{t('services.label')}</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t('services.title1')}<span className="gold-text">{t('services.title2')}</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-400">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map(({ titleKey, tagKey, descKey, icon: Icon, accent }) => {
            const title = t(titleKey);
            return (
              <article
                key={titleKey}
                className={`group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  accent ? 'bg-gold-400 text-ink' : 'glass hover:border-gold-400/20'
                }`}
              >
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: accent ? 'rgba(10,10,10,0.9)' : 'rgba(255,208,59,0.1)' }}
                >
                  <Icon size={22} className="text-gold-400" />
                </div>

                <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${accent ? 'text-ink/60' : 'text-gold-400/70'}`}>
                  {t(tagKey)}
                </p>
                <h3 className={`text-xl font-bold ${accent ? 'text-ink' : 'text-white'}`}>{title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${accent ? 'text-ink/70' : 'text-neutral-400'}`}>{t(descKey)}</p>

                <button
                  onClick={() => onOpenBooking(title)}
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-bold transition-colors ${
                    accent ? 'text-ink hover:text-ink/70' : 'text-gold-400 hover:text-gold-300'
                  }`}
                >
                  {t('services.book')} <ArrowUpRight size={15} />
                </button>

                <div className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                  accent ? 'bg-gold-300/50' : 'bg-gold-400/5'
                }`} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
