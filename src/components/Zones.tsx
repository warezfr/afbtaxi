import { motion } from 'motion/react';
import { MapPin } from '@phosphor-icons/react';
import { ZONES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon } from './motion';

export function Zones() {
  const { t } = useI18n();

  return (
    <section id="zones" className="border-y border-zinc-200 bg-zinc-50 py-20 dark:border-white/10 dark:bg-zinc-950 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="lg:col-span-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
            {t('zones.title1')}{t('zones.title2')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{t('zones.subtitle')}</p>
        </motion.div>

        <div className="lg:col-span-8">
          <motion.ul
            variants={stagger(0.04)}
            initial="hidden"
            whileInView="show"
            viewport={viewportSoon}
            className="flex flex-wrap gap-2.5"
            data-testid="zones-list"
          >
            {ZONES.map((zone) => (
              <motion.li
                key={zone}
                variants={fadeUp}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition-colors hover:border-gold-400 hover:bg-gold-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-gold-400/60 dark:hover:bg-gold-400/10"
              >
                <MapPin size={15} className="text-gold-600 dark:text-gold-400" />
                {zone}
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">{t('zones.beyond')}</p>
        </div>
      </div>
    </section>
  );
}
