import { motion } from 'motion/react';
import { TARIFS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon } from './motion';

const label = (route: string) => route.replace('Fontainebleau ↔ ', '');

export function Tarifs() {
  const { t } = useI18n();

  return (
    <section id="tarifs" className="content-auto bg-white py-20 dark:bg-zinc-950 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportSoon}>
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
            {t('tarifs.title1')}{t('tarifs.title2')}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-[55ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {t('tarifs.subtitle')}
          </motion.p>
          <motion.ol variants={fadeUp} className="mt-8 space-y-4 border-l-2 border-gold-400 pl-5">
            {[t('tarifs.intro1'), t('tarifs.intro2'), t('tarifs.intro3')].map((line, i) => (
              <li key={i} className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{line}</li>
            ))}
          </motion.ol>
          <motion.dl variants={fadeUp} className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-card bg-zinc-50 p-4 dark:bg-zinc-900">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50">{t('tarifs.hours.day')} {t('tarifs.hours.dayValue')}</dt>
              <dd className="mt-1 text-zinc-600 dark:text-zinc-400">{t('tarifs.hours.night')} {t('tarifs.hours.nightValue')}</dd>
            </div>
            <div className="rounded-card bg-zinc-50 p-4 dark:bg-zinc-900">
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50">{t('tarifs.supplements.title')}</dt>
              <dd className="mt-1 text-zinc-600 dark:text-zinc-400">{t('tarifs.supplements.wait')}</dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Desktop list */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="hidden sm:block" data-testid="tarifs-table">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-x-4 border-b border-zinc-900 pb-3 text-xs font-semibold text-zinc-500 dark:border-white/30 dark:text-zinc-400">
            <span>{t('tarifs.destination')}</span>
            <span className="text-right">{t('tarifs.car')}</span>
            <span className="text-right">{t('tarifs.van')}</span>
          </div>
          <ul className="divide-y divide-zinc-200 dark:divide-white/10">
            {TARIFS.map((tf) => (
              <li key={tf.route} className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-x-4 py-4">
                <span className="font-display text-base font-bold text-zinc-900 dark:text-zinc-50">{label(tf.route)}</span>
                <span className="text-right tabular-nums">
                  <span className="block font-semibold text-zinc-900 dark:text-zinc-50">{tf.carDay}</span>
                  <span className="block text-xs text-zinc-500">{t('tarifs.night')} {tf.carNight}</span>
                </span>
                <span className="text-right tabular-nums">
                  <span className="block font-semibold text-zinc-900 dark:text-zinc-50">{tf.vanDay}</span>
                  <span className="block text-xs text-zinc-500">{t('tarifs.night')} {tf.vanNight}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-zinc-500">{t('estimator.note')}</p>
        </motion.div>

        {/* Mobile cards */}
        <div className="space-y-3 sm:hidden" data-testid="tarifs-cards-mobile">
          {TARIFS.map((tf) => (
            <div key={tf.route} className="rounded-card border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
              <p className="font-display text-base font-bold text-zinc-900 dark:text-zinc-50">{label(tf.route)}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm tabular-nums">
                <div>
                  <p className="text-xs font-semibold text-zinc-500">{t('tarifs.car')}</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">{tf.carDay} <span className="text-xs font-normal text-zinc-500">/ {tf.carNight}</span></p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-500">{t('tarifs.van')}</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50">{tf.vanDay} <span className="text-xs font-normal text-zinc-500">/ {tf.vanNight}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
