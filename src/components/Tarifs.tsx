import { Clock, Info } from 'lucide-react';
import { TARIFS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export function Tarifs() {
  const { t } = useI18n();

  return (
    <section id="tarifs" className="relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16 lg:py-28" style={{ contentVisibility: 'auto' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 text-center lg:mb-16">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600 sm:text-sm">
            <span className="h-px w-8 bg-gold-400" />
            {t('tarifs.label')}
            <span className="h-px w-8 bg-gold-400" />
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {t('tarifs.title1')}<span className="yellow-marker px-1">{t('tarifs.title2')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            {t('tarifs.subtitle')}
          </p>
        </div>

        <div className="hidden overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_20px_50px_-30px_rgba(17,24,39,0.25)] dark:shadow-none sm:block">
          <div className="taxi-checker h-2.5" />
          <div className="overflow-x-auto" data-testid="tarifs-table">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="bg-gray-900">
                  <th rowSpan={2} className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gold-400">{t('tarifs.destination')}</th>
                  <th colSpan={2} className="border-l border-white/10 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white">{t('tarifs.car')}</th>
                  <th colSpan={2} className="border-l border-white/10 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white">{t('tarifs.van')}</th>
                </tr>
                <tr className="bg-gray-900 text-[11px] uppercase tracking-wider text-gray-400">
                  <th className="border-l border-white/10 px-4 py-2.5 text-right">{t('tarifs.day')}</th>
                  <th className="px-4 pb-3 pt-2.5 text-right">{t('tarifs.night')}</th>
                  <th className="border-l border-white/10 px-4 py-2.5 text-right">{t('tarifs.day')}</th>
                  <th className="px-4 py-2.5 text-right">{t('tarifs.night')}</th>
                </tr>
              </thead>
              <tbody>
                {TARIFS.map((tarif, i) => (
                  <tr
                    key={tarif.route}
                    className={`border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-gold-50/70 dark:hover:bg-gray-800 ${i % 2 === 1 ? 'bg-gray-50/60 dark:bg-gray-800/30' : 'bg-white dark:bg-gray-900'}`}
                  >
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white sm:text-base">{tarif.route.replace('Fontainebleau ↔ ', '')}</td>
                    <td className="border-l border-gray-100 dark:border-gray-800 px-4 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">{tarif.carDay}</td>
                    <td className="px-4 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">{tarif.carNight}</td>
                    <td className="border-l border-gray-100 dark:border-gray-800 px-4 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">{tarif.vanDay}</td>
                    <td className="px-4 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">{tarif.vanNight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile : stacked cards */}
        <div className="space-y-4 sm:hidden" data-testid="tarifs-cards-mobile">
          {TARIFS.map((tarif) => (
            <div key={tarif.route} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_12px_30px_-20px_rgba(17,24,39,0.3)] dark:shadow-none">
              <div className="taxi-checker h-2" />
              <div className="p-5">
                <p className="font-display text-base font-black text-gray-900 dark:text-white">{tarif.route.replace('Fontainebleau ↔ ', '')}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gold-600">{t('tarifs.car')}</p>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-400 dark:text-gray-500">{t('tarifs.day')}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{tarif.carDay}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-gray-400 dark:text-gray-500">{t('tarifs.night')}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{tarif.carNight}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gray-900 dark:bg-black p-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400">{t('tarifs.van')}</p>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('tarifs.day')}</span>
                      <span className="font-bold text-white">{tarif.vanDay}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('tarifs.night')}</span>
                      <span className="font-bold text-white">{tarif.vanNight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
