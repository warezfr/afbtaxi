import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Users, Suitcase, ArrowUpRight } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { EASE, fadeUp, viewportSoon } from './motion';
import { SplitText } from './ui/SplitText';

interface FleetProps {
  onOpenBooking: (context?: string) => void;
}

const VEHICLES = [
  { id: 'berline', name: 'Mercedes Classe E', tagKey: 'fleet.tag.sedan' as const, image: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=1400', featureKeys: ['fleet.classeE.feat1', 'fleet.classeE.feat2', 'fleet.classeE.feat3'] as const, seats: 4, luggage: 3 },
  { id: 'van', name: 'Mercedes Classe V', tagKey: 'fleet.tag.van' as const, image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1400', featureKeys: ['fleet.classeV.feat1', 'fleet.classeV.feat2', 'fleet.classeV.feat3'] as const, seats: 7, luggage: 7 },
  { id: 'vip', name: 'Mercedes Classe S', tagKey: 'fleet.tag.vip' as const, image: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&w=1400', featureKeys: ['fleet.classeS.feat1', 'fleet.classeS.feat2', 'fleet.classeS.feat3'] as const, seats: 3, luggage: 3 },
  { id: 'tesla', name: 'Tesla Model Y', tagKey: 'fleet.tag.electric' as const, image: 'https://images.pexels.com/photos/20019462/pexels-photo-20019462.jpeg?auto=compress&cs=tinysrgb&w=1400', featureKeys: ['fleet.teslaY.feat1', 'fleet.teslaY.feat2', 'fleet.teslaY.feat3'] as const, seats: 4, luggage: 4 },
];

/** Accordion image slider: four strips, the active one opens wide. */
export function Fleet({ onOpenBooking }: FleetProps) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  return (
    <section id="flotte" className="content-auto bg-ink py-24 text-white lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <SplitText as="h2" text={`${t('fleet.title1')}${t('fleet.title2')}`} className="font-display text-4xl font-semibold leading-[0.95] tracking-tightest md:text-5xl lg:col-span-6 lg:text-7xl" />
          <p className="max-w-[40ch] self-end text-base leading-relaxed text-white/60 lg:col-span-5 lg:col-start-8">{t('fleet.subtitle')}</p>
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="mt-14 flex h-[560px] flex-col gap-3 lg:h-[600px] lg:flex-row">
          {VEHICLES.map((v, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={v.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                animate={{ flex: isActive ? 4 : 1 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="group relative min-h-0 overflow-hidden rounded-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <img src={v.image} alt={`${v.name}, ${t(v.tagKey)}`} loading="lazy" width={1400} height={933} className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 ${isActive ? 'scale-100' : 'scale-105 grayscale'}`} />
                <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-ink/85 via-ink/20 to-transparent opacity-100' : 'bg-ink/50 opacity-100'}`} />

                {/* Closed label: vertical on desktop */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-5 bottom-5 font-display text-xl font-semibold tracking-tight lg:left-6 lg:top-6 lg:origin-top-left lg:rotate-90 lg:whitespace-nowrap"
                    >
                      {v.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.25 } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-10"
                    >
                      <p className="text-xs font-semibold text-gold-400">{t(v.tagKey)}</p>
                      <p className="mt-1 font-display text-3xl font-semibold tracking-tightest sm:text-4xl lg:text-5xl">{v.name}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm text-white/80">
                        <span className="inline-flex items-center gap-1.5"><Users size={15} className="text-gold-400" /> {v.seats} {t('fleet.seats')}</span>
                        <span className="inline-flex items-center gap-1.5"><Suitcase size={15} className="text-gold-400" /> {v.luggage} {t('fleet.luggage')}</span>
                        <span className="hidden text-white/50 sm:inline">{v.featureKeys.map((k) => t(k)).join(' · ')}</span>
                      </div>
                      <span
                        role="link"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); onOpenBooking(v.name); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onOpenBooking(v.name); } }}
                        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink transition-colors hover:bg-gold-400"
                      >
                        {t('fleet.pick')} <ArrowUpRight size={14} weight="bold" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
