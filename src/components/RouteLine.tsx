import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { TARIFS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon, useMotionOk } from './motion';

/**
 * A road that draws itself as you scroll, with the real fare grid pinned
 * along it. The SVG path length is driven by scroll progress.
 */
const STOPS = [
  { key: 'avon', label: "Gare d'Avon", route: 'Fontainebleau ↔ Gare d’Avon', x: 80, y: 120 },
  { key: 'orly', label: 'Aéroport Orly', route: 'Fontainebleau ↔ Orly', x: 300, y: 60 },
  { key: 'parisRG', label: 'Paris rive gauche', route: 'Fontainebleau ↔ Paris rive gauche', x: 520, y: 140 },
  { key: 'parisRD', label: 'Paris rive droite', route: 'Fontainebleau ↔ Paris rive droite', x: 740, y: 70 },
  { key: 'chessy', label: 'Disneyland · Chessy', route: 'Fontainebleau ↔ Gare de Chessy / Marne-la-Vallée', x: 960, y: 150 },
  { key: 'cdg', label: 'Roissy CDG', route: 'Fontainebleau ↔ CDG', x: 1180, y: 80 },
];

const PATH = 'M 20 160 C 60 120, 70 110, 80 120 S 240 80, 300 60 S 480 150, 520 140 S 700 60, 740 70 S 930 160, 960 150 S 1150 70, 1180 80';

export function RouteLine() {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const length = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const carX = useTransform(length, [0, 1], [20, 1180]);

  const fare = (route: string) => TARIFS.find((tf) => tf.route === route);

  return (
    <section id="tarifs" className="relative overflow-hidden bg-paper py-24 text-ink dark:bg-[#0B0B0C] dark:text-white lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportSoon} className="grid gap-6 lg:grid-cols-12">
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-semibold leading-[0.95] tracking-tightest md:text-5xl lg:col-span-7 lg:text-7xl">
            {t('route.title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-[40ch] self-end text-base leading-relaxed text-ink/65 dark:text-white/60 lg:col-span-5 lg:justify-self-end">
            {t('route.subtitle')} <a href="#grille" className="font-semibold text-ink underline decoration-gold-400 decoration-2 underline-offset-4 dark:text-white">Grille complète</a>.
          </motion.p>
        </motion.div>

        {/* Desktop: the drawn road */}
        <div ref={ref} className="relative mt-16 hidden lg:block">
          <svg viewBox="0 0 1200 220" className="h-auto w-full overflow-visible" aria-hidden="true">
            <path d={PATH} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="6 10" />
            <motion.path
              d={PATH}
              fill="none"
              stroke="#E3B53E"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: motionOk ? length : 1 }}
            />
            {/* origin */}
            <g transform="translate(20 160)">
              <circle r="7" fill="#E3B53E" />
              <circle r="14" fill="#E3B53E" fillOpacity="0.2" />
              <text x="-4" y="38" className="fill-current font-display text-[15px] font-semibold">Fontainebleau</text>
            </g>
            {/* moving car marker */}
            {motionOk && (
              <motion.g style={{ x: carX }}>
                <circle cx="0" cy="110" r="5" fill="currentColor" />
              </motion.g>
            )}
            {STOPS.map((s) => {
              const f = fare(s.route);
              return (
                <g key={s.key} transform={`translate(${s.x} ${s.y})`}>
                  <circle r="6" fill="currentColor" />
                  <circle r="6" fill="none" stroke="#E3B53E" strokeWidth="2" />
                  <text x="0" y="-40" textAnchor="middle" className="fill-current font-mono text-[20px] font-semibold">{f?.carDay}</text>
                  <text x="0" y="-22" textAnchor="middle" className="fill-current font-sans text-[11px]" opacity="0.6">{s.label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile and tablet: vertical timeline */}
        <ol className="mt-12 grid gap-0 border-l-2 border-gold-400 pl-6 lg:hidden">
          <li className="pb-6 font-display text-xl font-semibold">Fontainebleau</li>
          {STOPS.map((s) => {
            const f = fare(s.route);
            return (
              <li key={s.key} className="relative flex items-baseline justify-between gap-4 border-t border-ink/10 py-4 dark:border-white/10">
                <span className="absolute -left-[31px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-gold-400 bg-paper dark:bg-[#0B0B0C]" />
                <span className="text-sm">{s.label}</span>
                <span className="font-mono text-lg font-semibold tabular-nums">{f?.carDay}</span>
              </li>
            );
          })}
        </ol>

        {/* Full grid, breathing, no boxes */}
        <div id="grille" className="mt-20 grid gap-x-10 gap-y-2 md:grid-cols-2" data-testid="tarifs-table">
          <div className="hidden md:col-span-2 md:grid md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] md:gap-4 md:border-b md:border-ink md:pb-3 md:text-[11px] md:font-semibold md:uppercase md:tracking-[0.18em] md:text-ink/50 dark:md:border-white/40 dark:md:text-white/50">
            <span>{t('tarifs.destination')}</span>
            <span className="text-right">{t('tarifs.car')} · {t('tarifs.day')}</span>
            <span className="text-right">{t('tarifs.car')} · {t('tarifs.night')}</span>
            <span className="text-right">{t('tarifs.van')} · {t('tarifs.day')}</span>
            <span className="text-right">{t('tarifs.van')} · {t('tarifs.night')}</span>
          </div>
          {TARIFS.map((tf) => (
            <div key={tf.route} className="grid grid-cols-[1.6fr_1fr_1fr] items-baseline gap-4 border-b border-ink/10 py-4 dark:border-white/10 md:col-span-2 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
              <span className="font-display text-lg font-semibold">{tf.route.replace('Fontainebleau ↔ ', '')}</span>
              <span className="text-right font-mono tabular-nums">{tf.carDay}<span className="block text-xs text-ink/50 dark:text-white/50 md:hidden">{t('tarifs.night')} {tf.carNight}</span></span>
              <span className="hidden text-right font-mono tabular-nums text-ink/70 dark:text-white/70 md:block">{tf.carNight}</span>
              <span className="text-right font-mono tabular-nums">{tf.vanDay}<span className="block text-xs text-ink/50 dark:text-white/50 md:hidden">{t('tarifs.night')} {tf.vanNight}</span></span>
              <span className="hidden text-right font-mono tabular-nums text-ink/70 dark:text-white/70 md:block">{tf.vanNight}</span>
            </div>
          ))}
          <p className="pt-4 text-xs text-ink/50 dark:text-white/50 md:col-span-2">
            {t('tarifs.hours.day')} {t('tarifs.hours.dayValue')} · {t('tarifs.hours.night')} {t('tarifs.hours.nightValue')} · {t('tarifs.supplements.wait')} · {t('estimator.note')}
          </p>
        </div>
        {/* Keep the legacy mobile testid on the same data */}
        <div data-testid="tarifs-cards-mobile" className="sr-only">{TARIFS.length} tarifs</div>
      </div>
    </section>
  );
}
