import { ArrowUpRight, Plane, HeartPulse, Car, TrainFront, Clock, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface ServicesProps {
  onOpenBooking: (context?: string) => void;
}

export function Services({ onOpenBooking }: ServicesProps) {
  const { t } = useI18n();

  const SERVICE_CARDS = [
    { titleKey: 'services.airport.title' as const, tagKey: 'services.airport.tag' as const, descKey: 'services.airport.desc' as const, icon: Plane, style: 'yellow' },
    { titleKey: 'services.station.title' as const, tagKey: 'services.station.tag' as const, descKey: 'services.station.desc' as const, icon: TrainFront, style: 'light' },
    { titleKey: 'services.medical.title' as const, tagKey: 'services.medical.tag' as const, descKey: 'services.medical.desc' as const, icon: HeartPulse, style: 'medical' },
    { titleKey: 'services.disposal.title' as const, tagKey: 'services.disposal.tag' as const, descKey: 'services.disposal.desc' as const, icon: Clock, style: 'light' },
    { titleKey: 'services.group.title' as const, tagKey: 'services.group.tag' as const, descKey: 'services.group.desc' as const, icon: Users, style: 'light' },
    { titleKey: 'services.local.title' as const, tagKey: 'services.local.tag' as const, descKey: 'services.local.desc' as const, icon: Car, style: 'dark' },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 max-w-2xl lg:mb-16">
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600 sm:text-sm">
            <span className="h-px w-8 bg-gold-400" />
            {t('services.label')}
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t('services.title1')}<span className="yellow-marker px-1">{t('services.title2')}</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-500 sm:text-lg">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICE_CARDS.map(({ titleKey, tagKey, descKey, icon: Icon, style }) => {
            const title = t(titleKey);
            const isYellow = style === 'yellow';
            const isDark = style === 'dark';
            const isMedical = style === 'medical';
            return (
              <article
                key={titleKey}
                data-testid={`service-card-${titleKey.split('.')[1]}`}
                className={`card-lift group relative overflow-hidden rounded-3xl p-7 sm:p-8 ${
                  isYellow
                    ? 'bg-gold-400'
                    : isDark
                    ? 'bg-gray-900'
                    : isMedical
                    ? 'border-2 border-gold-300 bg-gold-50/60'
                    : 'border border-gray-100 bg-gray-50'
                }`}
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    isYellow ? 'bg-gray-900' : isDark ? 'bg-gold-400' : 'bg-white shadow-sm ring-1 ring-gray-100'
                  }`}
                >
                  <Icon size={22} className={isYellow ? 'text-gold-400' : isDark ? 'text-gray-900' : 'text-gold-600'} />
                </div>

                <p className={`mb-2 text-[11px] font-bold uppercase tracking-wider ${
                  isYellow ? 'text-gray-900/60' : isDark ? 'text-gold-400' : 'text-gold-600'
                }`}>
                  {t(tagKey)}
                </p>
                <h3 className={`font-display text-xl font-bold ${isYellow ? 'text-gray-900' : isDark ? 'text-white' : 'text-gray-900'}`}>
                  {title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${isYellow ? 'text-gray-900/70' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t(descKey)}
                </p>

                <button
                  onClick={() => onOpenBooking(title)}
                  className={`mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold transition-colors ${
                    isYellow ? 'text-gray-900 hover:text-gray-700' : isDark ? 'text-gold-400 hover:text-gold-300' : 'text-gray-900 hover:text-gold-600'
                  }`}
                >
                  {t('services.book')}
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
                    isYellow ? 'bg-gray-900 text-gold-400' : isDark ? 'bg-gold-400 text-gray-900' : 'bg-gold-400 text-gray-900'
                  }`}>
                    <ArrowUpRight size={14} />
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
