import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowDown, Phone } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { EASE, fadeUp, stagger, useMotionOk } from './motion';
import { SplitText } from './ui/SplitText';
import { Magnetic } from './ui/Magnetic';
import { PriceEstimator } from './PriceEstimator';

export const HERO_IMAGE =
  'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&w=1920';

interface Props {
  onOpenBooking: (context?: string) => void;
}

export function Hero({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative isolate min-h-[100dvh] overflow-hidden bg-ink text-white">
      {/* Full-bleed photo, zoom parallax, fading into the page below */}
      <motion.div style={motionOk ? { scale: imgScale, y: imgY } : undefined} className="absolute inset-0 -z-10 will-change-transform">
        <img
          src={HERO_IMAGE}
          alt="Mercedes Classe S noire d'AFB Taxis, de nuit, à Fontainebleau"
          width={1920}
          height={1280}
          loading="eager"
          decoding="async"
          {...({ fetchpriority: 'high' } as object)}
          className="h-full w-full object-cover object-[60%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-4 pb-28 pt-32 sm:px-6 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-8 lg:pb-16">
        <motion.div style={motionOk ? { y: copyY, opacity: copyOpacity } : undefined} className="lg:col-span-7">
          <motion.div variants={stagger(0.12, 0.9)} initial={motionOk ? 'hidden' : false} animate="show">
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.92] tracking-tightest text-white">
              <SplitText as="span" trigger="mount" text={t('hero.line1')} className="block" />
              <SplitText as="span" trigger="mount" delay={260} text={t('hero.line2')} className="block text-gold-400" />
            </h1>
            <motion.p variants={fadeUp} dir="auto" className="mt-7 max-w-[44ch] text-lg leading-relaxed text-white/75 sm:text-xl">
              {t('hero.subtitle')}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <button
                  data-testid="hero-book-button"
                  onClick={() => onOpenBooking()}
                  className="group inline-flex min-h-[56px] items-center gap-3 rounded-full bg-gold-400 pl-7 pr-2 text-base font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {t('common.book')}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold-400 transition-transform group-hover:rotate-[-35deg]">
                    <ArrowRight size={18} weight="bold" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  data-testid="hero-call-button"
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex min-h-[56px] items-center gap-3 rounded-full border border-white/20 px-7 font-mono text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 active:scale-[0.98]"
                >
                  <Phone size={18} className="text-gold-400" />
                  {COMPANY.phone}
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Estimator in glass, bottom right on desktop */}
        <motion.div
          initial={motionOk ? { opacity: 0, y: 40 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          className="mt-12 lg:col-span-5 lg:mt-0"
          id="reserver"
        >
          <PriceEstimator onOpenBooking={onOpenBooking} compact />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={motionOk ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 lg:flex"
      >
        {t('hero.scroll')}
        <motion.span animate={motionOk ? { y: [0, 6, 0] } : undefined} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
