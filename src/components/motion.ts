import { useReducedMotion, type Variants } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (delay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren } },
});

export const viewportOnce = { once: true, amount: 0.3 } as const;
export const viewportSoon = { once: true, amount: 0.15 } as const;

/** True when the user has not asked for reduced motion. */
export function useMotionOk() {
  return !useReducedMotion();
}
