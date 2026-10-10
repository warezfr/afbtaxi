import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Phone, Star } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, useMotionOk } from './motion';
import type { Variants } from 'motion/react';

const wordUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const HERO_IMAGE =
  'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&w=1600';

interface Props {
  onOpenBooking: (context?: string) => void;
}

export function Hero({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const line1 = t('hero.title1').split(' ');
  const line2 = t('hero.title2').split(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-zinc-950 text-white"
    >
      <div className="relative mx-auto grid min-h-[88dvh] max-w-7xl items-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-32 lg:pt-24">
        {/* Copy */}
        <motion.div
          variants={stagger(0.1, 0.05)}
          initial={motionOk ? 'hidden' : false}
          animate="show"
          className="relative z-10"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
            {t('hero.eyebrow')}
          </motion.p>

          <h1
            className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            <motion.span variants={stagger(0.06)} className="block">
              {line1.map((w, i) => (
                <motion.span key={`a${i}`} variants={wordUp} className="inline-block">
                  {w}{i < line1.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </motion.span>
            <motion.span variants={stagger(0.06, 0.15)} className="block text-gold-400">
              {line2.map((w, i) => (
                <motion.span key={`b${i}`} variants={wordUp} className="inline-block">
                  {w}{i < line2.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.p variants={fadeUp} dir="auto" className="mt-6 max-w-[48ch] text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.button
              data-testid="hero-book-button"
              onClick={() => onOpenBooking()}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gold-400 px-8 text-[15px] font-bold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {t('common.book')}
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.a
              data-testid="hero-call-button"
              href={`tel:${COMPANY.phoneRaw}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 text-[15px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <Phone size={18} className="text-gold-400" />
              <span className="tabular-nums">{COMPANY.phone}</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={motionOk ? { opacity: 0, scale: 0.97 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <motion.div style={motionOk ? { y: imageY } : undefined} className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-[5/4]">
            <img
              src={HERO_IMAGE}
              alt="Mercedes Classe S noire, berline AFB Taxis à Fontainebleau"
              width={1600}
              height={1200}
              loading="eager"
              {...({ fetchpriority: 'high' } as object)}
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={motionOk ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="absolute -bottom-5 left-4 flex items-center gap-4 rounded-full border border-white/10 bg-zinc-900/90 py-3 pl-4 pr-6 backdrop-blur-md sm:left-6"
          >
            <span className="flex text-gold-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
            </span>
            <span className="text-sm font-semibold text-white">{t('hero.badge.rating')}</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="hidden text-sm text-zinc-400 sm:block">{t('hero.badge.years')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
