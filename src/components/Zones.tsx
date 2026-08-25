import { MapPin } from 'lucide-react';
import { ZONES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export function Zones() {
  const { t } = useI18n();

  return (
    <section id="zones" className="relative overflow-hidden bg-white dark:bg-gray-950 py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-10 text-center lg:mb-14">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600 sm:text-sm">
            <span className="h-px w-8 bg-gold-400" />
            {t('zones.label')}
            <span className="h-px w-8 bg-gold-400" />
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {t('zones.title1')}<span className="yellow-marker px-1">{t('zones.title2')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            {t('zones.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3" data-testid="zones-list">
          {ZONES.map((zone) => (
            <div
              key={zone}
              className="group flex min-h-[44px] items-center gap-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-5 py-2.5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-gold-400 dark:hover:border-gold-500 hover:bg-gold-50 dark:hover:bg-gold-500/10"
            >
              <MapPin size={15} className="text-gold-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{zone}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
