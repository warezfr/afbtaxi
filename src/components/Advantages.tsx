import { Clock, MapPin, Handshake, Snowflake, CalendarDays, Award } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function Advantages() {
  const { t } = useI18n();

  const ADVANTAGES_DATA = [
    { icon: Clock, titleKey: 'advantages.punctuality.title' as const, descKey: 'advantages.punctuality.desc' as const },
    { icon: MapPin, titleKey: 'advantages.drivers.title' as const, descKey: 'advantages.drivers.desc' as const },
    { icon: Handshake, titleKey: 'advantages.trust.title' as const, descKey: 'advantages.trust.desc' as const },
    { icon: Snowflake, titleKey: 'advantages.comfort.title' as const, descKey: 'advantages.comfort.desc' as const },
    { icon: CalendarDays, titleKey: 'advantages.available.title' as const, descKey: 'advantages.available.desc' as const },
    { icon: Award, titleKey: 'advantages.experience.title' as const, descKey: 'advantages.experience.desc' as const },
  ];

  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">{t('advantages.label')}</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t('advantages.title1')}<span className="gold-text">{t('advantages.title2')}</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES_DATA.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="group glass rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/20">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/10 transition-colors duration-300 group-hover:bg-gold-400/20">
                <Icon size={22} className="text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{t(titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
