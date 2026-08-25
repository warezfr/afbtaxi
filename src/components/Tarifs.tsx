import { TARIFS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export function Tarifs() {
  const { t } = useI18n();

  return (
    <section id="tarifs" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gold-400/3 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">{t('tarifs.label')}</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t('tarifs.title1')}<span className="gold-text">{t('tarifs.title2')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            {t('tarifs.subtitle')}
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5">
                <th rowSpan={2} className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gold-400">{t('tarifs.destination')}</th>
                <th colSpan={2} className="border-l border-white/5 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white">{t('tarifs.car')}</th>
                <th colSpan={2} className="border-l border-white/5 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white">{t('tarifs.van')}</th>
              </tr>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-neutral-500">
                <th className="border-l border-white/5 px-4 py-2.5 text-right">{t('tarifs.day')}</th>
                <th className="px-4 py-2.5 text-right">{t('tarifs.night')}</th>
                <th className="border-l border-white/5 px-4 py-2.5 text-right">{t('tarifs.day')}</th>
                <th className="px-4 py-2.5 text-right">{t('tarifs.night')}</th>
              </tr>
            </thead>
            <tbody>
              {TARIFS.map((tarif, i) => (
                <tr
                  key={tarif.route}
                  className={`border-b border-white/5 transition-colors hover:bg-gold-400/5 ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="px-6 py-4 font-semibold text-white">{tarif.route.replace('Fontainebleau ↔ ', '')}</td>
                  <td className="border-l border-white/5 px-4 py-4 text-right text-sm font-semibold text-neutral-300">{tarif.carDay}</td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-neutral-300">{tarif.carNight}</td>
                  <td className="border-l border-white/5 px-4 py-4 text-right text-sm font-semibold text-neutral-300">{tarif.vanDay}</td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-neutral-300">{tarif.vanNight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <p className="mb-3 text-sm font-bold text-gold-400">{t('tarifs.hours.title')}</p>
            <p className="text-sm text-neutral-400"><span className="font-semibold text-neutral-300">{t('tarifs.hours.day')}</span> {t('tarifs.hours.dayValue')}</p>
            <p className="mt-1.5 text-sm text-neutral-400"><span className="font-semibold text-neutral-300">{t('tarifs.hours.night')}</span> {t('tarifs.hours.nightValue')}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="mb-3 text-sm font-bold text-gold-400">{t('tarifs.supplements.title')}</p>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li>{t('tarifs.supplements.wait')}</li>
              <li>{t('tarifs.supplements.paris')}</li>
              <li>{t('tarifs.supplements.stop')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
