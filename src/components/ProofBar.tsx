import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { animate } from 'animejs';
import { useI18n } from '@/lib/i18n';
import { PriceEstimator } from './PriceEstimator';
import { fadeUp, useMotionOk } from './motion';

interface Props {
  onOpenBooking: (context?: string) => void;
}

function Counter({ to, suffix = '', decimals = 0, run }: { to: number; suffix?: string; decimals?: number; run: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionOk = useMotionOk();
  const format = (v: number) => v.toFixed(decimals).replace('.', ',') + suffix;

  useEffect(() => {
    if (!run || !motionOk || !ref.current) return;
    const el = ref.current;
    const obj = { value: 0 };
    const anim = animate(obj, {
      value: to,
      duration: 1400,
      ease: 'outExpo',
      onUpdate: () => { el.textContent = format(obj.value); },
    });
    return () => { anim.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, motionOk, to]);

  return <span ref={ref} className="tabular-nums">{format(to)}</span>;
}

export function ProofBar({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [run, setRun] = useState(false);
  useEffect(() => { if (inView) setRun(true); }, [inView]);

  const STATS = [
    { node: <Counter to={20} suffix="+" run={run} />, label: t('hero.stat.years') },
    { node: <Counter to={5} run={run} />, label: t('hero.stat.vehicles') },
    { node: <span className="tabular-nums">24/7</span>, label: t('hero.stat.availability') },
    { node: <Counter to={4.9} decimals={1} run={run} />, label: t('hero.stat.rating') },
  ];

  return (
    <section id="reserver" className="relative bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 -mt-14"
        >
          <PriceEstimator onOpenBooking={onOpenBooking} />
        </motion.div>

        <div ref={ref} className="mt-10 grid grid-cols-2 divide-zinc-200 dark:divide-white/10 sm:grid-cols-4 sm:divide-x">
          {STATS.map((s, i) => (
            <div key={i} className={`px-2 py-5 text-center sm:px-6 ${i >= 2 ? 'border-t border-zinc-200 dark:border-white/10 sm:border-t-0' : ''}`}>
              <p className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{s.node}</p>
              <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="pb-12 pt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">{t('proof.note')}</p>
      </div>
    </section>
  );
}
