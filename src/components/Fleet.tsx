import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Users, Suitcase, Compass } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { fadeUp, viewportSoon, useMotionOk } from './motion';

interface FleetProps {
  onOpenBooking: (context?: string) => void;
}

const VEHICLES = [
  {
    id: 'berline',
    name: 'Mercedes Classe E',
    tagKey: 'fleet.tag.sedan' as const,
    image: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featureKeys: ['fleet.classeE.feat1' as const, 'fleet.classeE.feat2' as const, 'fleet.classeE.feat3' as const],
    seats: 4,
    luggage: 3,
    use: 'Affaires, aéroports, Paris',
  },
  {
    id: 'van',
    name: 'Mercedes Classe V',
    tagKey: 'fleet.tag.van' as const,
    image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featureKeys: ['fleet.classeV.feat1' as const, 'fleet.classeV.feat2' as const, 'fleet.classeV.feat3' as const],
    seats: 7,
    luggage: 7,
    use: 'Familles, groupes, Disneyland',
  },
  {
    id: 'vip',
    name: 'Mercedes Classe S',
    tagKey: 'fleet.tag.vip' as const,
    image: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featureKeys: ['fleet.classeS.feat1' as const, 'fleet.classeS.feat2' as const, 'fleet.classeS.feat3' as const],
    seats: 3,
    luggage: 3,
    use: 'VIP, mariages, direction',
  },
  {
    id: 'tesla',
    name: 'Tesla Model Y',
    tagKey: 'fleet.tag.electric' as const,
    image: 'https://images.pexels.com/photos/20019462/pexels-photo-20019462.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featureKeys: ['fleet.teslaY.feat1' as const, 'fleet.teslaY.feat2' as const, 'fleet.teslaY.feat3' as const],
    seats: 4,
    luggage: 4,
    use: 'Courses locales, Melun, gares',
  },
];

export function Fleet({ onOpenBooking }: FleetProps) {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const [activeId, setActiveId] = useState(VEHICLES[0].id);
  const active = VEHICLES.find((v) => v.id === activeId) ?? VEHICLES[0];

  const specs = [
    { icon: Users, value: active.seats, label: t('fleet.seats') },
    { icon: Suitcase, value: active.luggage, label: t('fleet.luggage') },
    { icon: Compass, value: active.use, label: t('fleet.use') },
  ];

  return (
    <section id="flotte" className="content-auto bg-white py-20 dark:bg-zinc-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
            {t('fleet.title1')}{t('fleet.title2')}
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">{t('fleet.subtitle')}</p>
        </motion.div>

        {/* Desktop: selector + image. Mobile: horizontal snap cards. */}
        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[0.8fr_1.2fr]">
          <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10">
            {VEHICLES.map((v) => {
              const isActive = v.id === active.id;
              return (
                <li key={v.id}>
                  <button
                    onClick={() => setActiveId(v.id)}
                    aria-pressed={isActive}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <div>
                      <p className={`font-display text-xl font-bold tracking-tight transition-colors ${isActive ? 'text-gold-600 dark:text-gold-400' : 'text-zinc-900 group-hover:text-gold-600 dark:text-zinc-50 dark:group-hover:text-gold-400'}`}>
                        {v.name}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{t(v.tagKey)} · {v.seats} {t('fleet.seats')}</p>
                    </div>
                    <motion.span
                      animate={{ width: isActive ? 40 : 12, backgroundColor: isActive ? '#D9B257' : 'rgba(161,161,170,0.5)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="h-1 rounded-full"
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-zinc-100 dark:bg-zinc-900">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={`${active.name}, ${t(active.tagKey)}`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  initial={motionOk ? { opacity: 0, scale: 1.04 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={motionOk ? { opacity: 0, scale: 0.98 } : undefined}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="mt-6 grid grid-cols-3 divide-x divide-zinc-200 dark:divide-white/10">
              {specs.map(({ icon: IconCmp, value, label }, i) => (
                <div key={i} className="px-5 first:pl-0">
                  <IconCmp size={18} className="text-gold-600 dark:text-gold-400" />
                  <p className="mt-2 font-display text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{value}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {active.featureKeys.map((k) => (
                <span key={k} className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Check size={14} weight="bold" className="text-gold-600 dark:text-gold-400" /> {t(k)}
                </span>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenBooking(active.name)}
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-zinc-950 px-7 text-sm font-bold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:bg-gold-400 dark:text-zinc-950 dark:hover:bg-gold-300"
            >
              {t('fleet.book')}
            </motion.button>
          </div>
        </div>

        {/* Mobile */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden [scrollbar-width:none]">
          {VEHICLES.map((v) => (
            <article key={v.id} className="w-[82%] shrink-0 snap-center overflow-hidden rounded-card border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 sm:w-[60%]">
              <img src={v.image} alt={`${v.name}, ${t(v.tagKey)}`} width={1200} height={750} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold text-gold-600 dark:text-gold-400">{t(v.tagKey)}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">{v.name}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{v.seats} {t('fleet.seats')} · {v.luggage} {t('fleet.luggage')} · {v.use}</p>
                <button
                  onClick={() => onOpenBooking(v.name)}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-zinc-950 px-5 text-sm font-bold text-white dark:bg-gold-400 dark:text-zinc-950"
                >
                  {t('fleet.book')}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
