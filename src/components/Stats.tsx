import { motion } from 'motion/react';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon } from './motion';
import { Counter } from './ui/Counter';
import { SplitText } from './ui/SplitText';

/** Big numbers that count up, then the six reasons as a numbered ledger. */
export function Stats() {
  const { t } = useI18n();

  const NUMBERS = [
    { node: <Counter to={20} suffix="+" />, label: t('hero.stat.years') },
    { node: <Counter to={5} />, label: t('hero.stat.vehicles') },
    { node: <span className="font-mono tabular-nums">24/7</span>, label: t('hero.stat.availability') },
    { node: <Counter to={4.9} decimals={1} />, label: t('hero.stat.rating') },
  ];

  const ITEMS = [
    ['advantages.punctuality.title', 'advantages.punctuality.desc'],
    ['advantages.drivers.title', 'advantages.drivers.desc'],
    ['advantages.trust.title', 'advantages.trust.desc'],
    ['advantages.comfort.title', 'advantages.comfort.desc'],
    ['advantages.available.title', 'advantages.available.desc'],
    ['advantages.experience.title', 'advantages.experience.desc'],
  ] as const;

  return (
    <section data-testid="advantages-section" className="bg-gold-400 py-24 text-ink lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SplitText as="h2" text={t('stats.title')} className="max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-tightest md:text-5xl lg:text-7xl" />

        <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/20 pt-10 lg:grid-cols-4">
          {NUMBERS.map((n, i) => (
            <div key={i} className={`${i > 0 ? 'lg:border-l lg:border-ink/20 lg:pl-8' : ''}`}>
              <p className="font-display text-6xl font-semibold leading-none tracking-tightest lg:text-8xl">{n.node}</p>
              <p className="mt-3 text-sm font-semibold text-ink/70">{n.label}</p>
            </div>
          ))}
        </div>

        <motion.ol variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewportSoon} className="mt-20 grid gap-x-12 md:grid-cols-2">
          {ITEMS.map(([title, desc], i) => (
            <motion.li key={title} variants={fadeUp} data-testid={`advantage-item-${i}`} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/20 py-6">
              <span className="font-mono text-sm text-ink/50">0{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{t(title)}</h3>
                <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-ink/70">{t(desc)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
