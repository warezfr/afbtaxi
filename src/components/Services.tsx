import { motion } from 'motion/react';
import { AirplaneTilt, Train, FirstAid, Clock, UsersThree, Car, ArrowUpRight, type Icon } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon } from './motion';

interface ServicesProps {
  onOpenBooking: (context?: string) => void;
}

type Tone = 'photo' | 'light' | 'gold' | 'dark';

const AIRPORT_PHOTO = 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200';

export function Services({ onOpenBooking }: ServicesProps) {
  const { t } = useI18n();

  const CELLS: { key: string; icon: Icon; title: string; tag: string; desc: string; tone: Tone; span: string }[] = [
    { key: 'airport', icon: AirplaneTilt, title: t('services.airport.title'), tag: t('services.airport.tag'), desc: t('services.airport.desc'), tone: 'photo', span: 'md:col-span-4' },
    { key: 'station', icon: Train, title: t('services.station.title'), tag: t('services.station.tag'), desc: t('services.station.desc'), tone: 'light', span: 'md:col-span-2' },
    { key: 'medical', icon: FirstAid, title: t('services.medical.title'), tag: t('services.medical.tag'), desc: t('services.medical.desc'), tone: 'gold', span: 'md:col-span-2' },
    { key: 'disposal', icon: Clock, title: t('services.disposal.title'), tag: t('services.disposal.tag'), desc: t('services.disposal.desc'), tone: 'light', span: 'md:col-span-2' },
    { key: 'group', icon: UsersThree, title: t('services.group.title'), tag: t('services.group.tag'), desc: t('services.group.desc'), tone: 'light', span: 'md:col-span-2' },
    { key: 'local', icon: Car, title: t('services.local.title'), tag: t('services.local.tag'), desc: t('services.local.desc'), tone: 'dark', span: 'md:col-span-4' },
  ];

  const toneCls: Record<Tone, string> = {
    photo: 'bg-zinc-950 text-white',
    light: 'border border-zinc-200 bg-white text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50',
    gold: 'bg-gold-50 text-zinc-900 dark:bg-gold-400/10 dark:text-zinc-50',
    dark: 'bg-zinc-950 text-white dark:bg-zinc-900',
  };
  const mutedCls: Record<Tone, string> = {
    photo: 'text-zinc-300',
    light: 'text-zinc-600 dark:text-zinc-400',
    gold: 'text-zinc-700 dark:text-zinc-300',
    dark: 'text-zinc-400',
  };

  return (
    <section id="services" className="bg-zinc-50 py-20 dark:bg-zinc-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
            {t('services.title1')}{t('services.title2')}
          </h2>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoon}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6"
        >
          {CELLS.map(({ key, icon: IconCmp, title, tag, desc, tone, span }) => (
            <motion.article
              key={key}
              variants={fadeUp}
              data-testid={`service-card-${key}`}
              className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-card p-6 sm:p-7 ${span} ${toneCls[tone]}`}
            >
              {tone === 'photo' && (
                <>
                  <img
                    src={AIRPORT_PHOTO}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
                </>
              )}
              <div className="relative flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${tone === 'light' ? 'bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-zinc-50' : tone === 'gold' ? 'bg-gold-400 text-zinc-950' : 'bg-white/10 text-gold-400'}`}>
                  <IconCmp size={22} />
                </span>
                <span className={`text-[11px] font-semibold ${mutedCls[tone]}`}>{tag}</span>
              </div>
              <div className="relative mt-8">
                <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
                <p className={`mt-1.5 max-w-[42ch] text-sm leading-relaxed ${mutedCls[tone]}`}>{desc}</p>
                <button
                  onClick={() => onOpenBooking(title)}
                  className={`mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${tone === 'light' ? 'text-zinc-900 hover:text-gold-600 dark:text-zinc-50 dark:hover:text-gold-400' : tone === 'gold' ? 'text-zinc-900 hover:text-gold-700 dark:text-zinc-50' : 'text-gold-400 hover:text-gold-300'}`}
                >
                  {t('services.book')}
                  <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
