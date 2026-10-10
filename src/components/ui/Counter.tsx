import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { animate } from 'animejs';
import { useMotionOk } from '../motion';

/** Number that counts up with anime.js when it enters the viewport. */
export function Counter({ to, suffix = '', prefix = '', decimals = 0, className = '' }: { to: number; suffix?: string; prefix?: string; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionOk = useMotionOk();
  const format = (v: number) => prefix + v.toFixed(decimals).replace('.', ',') + suffix;

  useEffect(() => {
    if (!inView || !motionOk || !ref.current) return;
    const el = ref.current;
    const obj = { value: 0 };
    const anim = animate(obj, {
      value: to,
      duration: 1600,
      ease: 'outExpo',
      onUpdate: () => { el.textContent = format(obj.value); },
    });
    return () => { anim.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, motionOk, to]);

  return <span ref={ref} className={`font-mono tabular-nums ${className}`}>{format(to)}</span>;
}
