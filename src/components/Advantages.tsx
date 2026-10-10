import { motion } from 'motion/react';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon } from './motion';

export function Advantages() {
  const { t } = useI18n();

  const ITEMS = [
    { titleKey: 'advantages.punctuality.title' as const, descKey: 'advantages.punctuality.desc' as const },
    { titleKey: 'advantages.drivers.title' as const, descKey: 'advantages.drivers.desc' as const },
    { titleKey: 'advantages.trust.title' as const, descKey: 'advantages.trust.desc' as const },
    { titleKey: 'advantages.comfort.title' as const, descKey: 'advantages.comfort.desc' as const },
    { titleKey: 'advantages.available.title' as const, descKey: 'advantages.available.desc' as const },
    { titleKey: 'advantages.experience.title' as const, descKey: 'advantages.experience.desc' as const },
  ];

  return (
    <section data-testid="advantages-section" className="bg-gold-400 py-20 text-zinc-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoon}
          className="max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
        >
          {t('advantages.title1')}{t('advantages.title2')}
        </motion.h2>

        <motion.ol
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoon}
          className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
        >
          {ITEMS.map(({ titleKey, descKey }, i) => (
            <motion.li key={titleKey} variants={fadeUp} data-testid={`advantage-item-${i}`} className="flex gap-5 border-t border-zinc-950/20 pt-6">
              <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-zinc-950/35">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">{t(titleKey)}</h3>
                <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-zinc-950/70">{t(descKey)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
