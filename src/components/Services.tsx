import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { useMotionOk } from './motion';
import { SplitText } from './ui/SplitText';

interface ServicesProps {
  onOpenBooking: (context?: string) => void;
}

type Card = { key: string; title: string; tag: string; desc: string; image: string; alt: string };

const IMG = {
  airport: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600',
  station: 'https://images.pexels.com/photos/2031758/pexels-photo-2031758.jpeg?auto=compress&cs=tinysrgb&w=1600',
  medical: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=1600',
  disposal: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&w=1600',
  group: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

function StickyCard({ card, index, total, progress, onOpenBooking, t }: { card: Card; index: number; total: number; progress: MotionValue<number>; onOpenBooking: (c?: string) => void; t: (k: 'services.book') => string }) {
  const motionOk = useMotionOk();
  // Each card shrinks and dims as the next one arrives on top of it.
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, 0.94]);

  return (
    <motion.article
      data-testid={`service-card-${card.key}`}
      style={motionOk ? { scale, top: `calc(6rem + ${index * 14}px)` } : { top: '6rem' }}
      className="sticky mb-8 origin-top overflow-hidden rounded-card bg-ink text-white shadow-[0_40px_80px_-40px_rgba(17,17,19,0.6)] lg:mb-12"
    >
      <div className="relative grid min-h-[420px] lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <img src={card.image} alt={card.alt} loading="lazy" width={1600} height={1067} className="h-64 w-full object-cover lg:absolute lg:inset-0 lg:h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink" />
        </div>
        <div className="order-1 flex flex-col justify-between p-7 sm:p-10 lg:order-2 lg:col-span-6 lg:p-14">
          <div className="flex items-start justify-between">
            <span className="font-mono text-sm text-gold-400">0{index + 1} / 0{total}</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/70">{card.tag}</span>
          </div>
          <div>
            <h3 className="mt-16 font-display text-4xl font-semibold leading-[0.95] tracking-tightest sm:text-5xl lg:text-6xl">{card.title}</h3>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-white/65">{card.desc}</p>
            <button
              onClick={() => onOpenBooking(card.title)}
              className="group mt-8 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-white pl-6 pr-2 text-sm font-bold text-ink transition-colors hover:bg-gold-400 active:scale-[0.98]"
            >
              {t('services.book')}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Services({ onOpenBooking }: ServicesProps) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 20%', 'end 90%'] });

  const CARDS: Card[] = [
    { key: 'airport', title: t('services.airport.title'), tag: t('services.airport.tag'), desc: t('services.airport.desc'), image: IMG.airport, alt: 'Avion au décollage, transfert aéroport' },
    { key: 'station', title: t('services.station.title'), tag: t('services.station.tag'), desc: t('services.station.desc'), image: IMG.station, alt: 'Trains à quai dans une gare' },
    { key: 'medical', title: t('services.medical.title'), tag: t('services.medical.tag'), desc: t('services.medical.desc'), image: IMG.medical, alt: 'Mercedes Classe E noire, taxi conventionné' },
    { key: 'disposal', title: t('services.disposal.title'), tag: t('services.disposal.tag'), desc: t('services.disposal.desc'), image: IMG.disposal, alt: 'Mercedes Classe S, mise à disposition avec chauffeur' },
    { key: 'group', title: t('services.group.title'), tag: t('services.group.tag'), desc: t('services.group.desc'), image: IMG.group, alt: 'Mercedes Classe V, van 7 places' },
  ];

  return (
    <section id="services" className="bg-paper py-24 text-ink dark:bg-[#0B0B0C] dark:text-white lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <SplitText as="h2" text={t('services.sticky')} className="font-display text-4xl font-semibold leading-[0.95] tracking-tightest md:text-5xl lg:col-span-6 lg:text-7xl" />
          <p className="max-w-[40ch] self-end text-base leading-relaxed text-ink/65 dark:text-white/60 lg:col-span-5 lg:col-start-8">{t('services.subtitle')}</p>
        </div>

        <div ref={ref} className="relative mt-14">
          {CARDS.map((c, i) => (
            <StickyCard key={c.key} card={c} index={i} total={CARDS.length} progress={scrollYProgress} onOpenBooking={onOpenBooking} t={t} />
          ))}
          {/* local service, plain line, not a card */}
          <div data-testid="service-card-local" className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-8 dark:border-white/15">
            <div>
              <p className="font-display text-2xl font-semibold tracking-tight">{t('services.local.title')}</p>
              <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{t('services.local.desc')}</p>
            </div>
            <button onClick={() => onOpenBooking(t('services.local.title'))} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold underline decoration-gold-400 decoration-2 underline-offset-4 hover:text-gold-600 dark:hover:text-gold-400">
              {t('services.book')} <ArrowUpRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
