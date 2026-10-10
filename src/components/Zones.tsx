import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { MapPin } from '@phosphor-icons/react';
import { ZONES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon, useMotionOk } from './motion';

/** Kinetic marquee: base drift, speeds up and flips with scroll velocity. */
function KineticMarquee({ text }: { text: string }) {
  const motionOk = useMotionOk();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 1, 4]);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!motionOk) return;
    const f = factor.get();
    if (f < 0) direction.current = -1; else if (f > 0) direction.current = 1;
    // base drift: about 3% of the track per second, up to 4x with scroll
    let next = x.get() - direction.current * Math.abs(f) * (delta / 1000) * 3;
    // wrap: content is duplicated 4x, each copy is 25% of the track
    if (next <= -50) next += 25; else if (next > -25) next -= 25;
    x.set(next);
  });

  const xPct = useTransform(x, (v) => `${v}%`);
  const copies = [0, 1, 2, 3];

  return (
    <div className="overflow-hidden border-y border-ink/10 py-5 dark:border-white/10" aria-hidden="true">
      <motion.div style={{ x: motionOk ? xPct : '-25%' }} className="flex w-max whitespace-nowrap">
        {copies.map((i) => (
          <span key={i} className="pr-10 font-display text-[clamp(2rem,6vw,5rem)] font-semibold leading-none tracking-tightest text-ink/90 dark:text-white/90">
            {text} <span className="text-gold-400">·</span>{' '}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Zones() {
  const { t } = useI18n();
  return (
    <section id="zones" className="bg-paper py-20 text-ink dark:bg-[#0B0B0C] dark:text-white lg:py-28">
      <KineticMarquee text={t('zones.marquee')} />
      <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="lg:col-span-5">
          <h2 className="font-display text-3xl font-semibold tracking-tightest md:text-4xl">{t('zones.title1')}{t('zones.title2')}</h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-ink/65 dark:text-white/60">{t('zones.subtitle')}</p>
          <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ink/50 dark:text-white/45">{t('zones.beyond')}</p>
        </motion.div>
        <motion.ul variants={stagger(0.04)} initial="hidden" whileInView="show" viewport={viewportSoon} data-testid="zones-list" className="grid grid-cols-2 gap-x-6 lg:col-span-7 lg:grid-cols-3">
          {ZONES.map((z) => (
            <motion.li key={z} variants={fadeUp} className="flex items-center gap-2 border-b border-ink/10 py-3 text-sm font-semibold dark:border-white/10">
              <MapPin size={14} className="shrink-0 text-gold-500" /> {z}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
