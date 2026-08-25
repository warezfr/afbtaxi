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
    <section data-testid="advantages-section" className="relative overflow-hidden bg-gold-400 py-16 lg:py-28">
      {/* Decorative */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-[70px]" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gray-900/10 blur-[70px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 text-center lg:mb-16">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gray-900/70 sm:text-sm">
            <span className="h-px w-8 bg-gray-900/50" />
            {t('advantages.label')}
            <span className="h-px w-8 bg-gray-900/50" />
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t('advantages.title1')}{t('advantages.title2')}
          </h2>
          <div className="mx-auto mt-4 h-0 w-0 border-x-[9px] border-t-[10px] border-x-transparent border-t-gray-900" />
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES_DATA.map(({ icon: Icon, titleKey, descKey }, i) => (
            <div key={titleKey} data-testid={`advantage-item-${i}`} className="group flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_-8px_rgba(17,24,39,0.3)] transition-transform duration-300 group-hover:scale-110">
                <Icon size={26} className="text-gray-900" />
              </div>
              <div>
                <h3 className="font-display text-lg font-black uppercase tracking-wide text-gray-900">{t(titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-900/70">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
