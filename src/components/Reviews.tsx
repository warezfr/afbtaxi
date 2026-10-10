import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Star, CaretLeft, CaretRight, ArrowUpRight } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, viewportSoon, useMotionOk } from './motion';

const REVIEWS = [
  { name: 'Marie L.', place: 'Fontainebleau', date: 'Mars 2026', text: 'Chauffeur très ponctuel pour notre transfert vers Orly. Voiture impeccable, conduite souple.', rating: 5 },
  { name: 'Thomas B.', place: 'Avon', date: 'Février 2026', text: 'Toujours à l\'heure, même très tôt le matin. La Classe V est parfaite pour nos départs en famille vers CDG.', rating: 5 },
  { name: 'Sophie D.', place: 'Melun', date: 'Février 2026', text: 'Transport médical conventionné : chauffeur attentionné, d\'une grande gentillesse avec ma mère.', rating: 5 },
  { name: 'James W.', place: 'INSEAD', date: 'Janvier 2026', text: 'Driver spoke English, the Mercedes was spotless and we arrived early. Highly recommended.', rating: 5 },
  { name: 'Karim A.', place: 'Dammarie-les-Lys', date: 'Décembre 2025', text: 'Réservation simple par WhatsApp, prix annoncé respecté, aucune mauvaise surprise.', rating: 5 },
  { name: 'Isabelle M.', place: 'Barbizon', date: 'Novembre 2025', text: 'Mise à disposition à la journée pour un mariage : service haut de gamme, chauffeur discret.', rating: 4 },
];

export function Reviews() {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const [[index, direction], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    setState(([i]) => [(i + dir + REVIEWS.length) % REVIEWS.length, dir]);
  }, []);

  useEffect(() => {
    if (paused || !motionOk) return;
    const timer = setInterval(() => go(1), 7000);
    return () => clearInterval(timer);
  }, [paused, motionOk, go]);

  const review = REVIEWS[index];

  return (
    <section id="avis" className="bg-white py-20 dark:bg-zinc-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
              {t('reviews.title1')}{t('reviews.title2')}
            </h2>
            <p className="mt-3 flex items-center gap-3 text-base text-zinc-600 dark:text-zinc-400">
              <span className="flex text-gold-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" />)}
              </span>
              <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">4,9/5</span>
              {t('reviews.subtitle')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              data-testid="reviews-prev-button"
              onClick={() => go(-1)}
              aria-label="Avis précédent"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:border-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 dark:border-white/20 dark:text-zinc-50 dark:hover:border-white"
            >
              <CaretLeft size={20} />
            </button>
            <button
              data-testid="reviews-next-button"
              onClick={() => go(1)}
              aria-label="Avis suivant"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 dark:bg-gold-400 dark:text-zinc-950 dark:hover:bg-gold-300"
            >
              <CaretRight size={20} />
            </button>
          </div>
        </motion.div>

        <div
          data-testid="reviews-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-12 min-h-[260px] overflow-hidden border-t border-zinc-200 pt-10 dark:border-white/10 md:min-h-[240px]"
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={index}
              custom={direction}
              initial={motionOk ? { opacity: 0, x: direction * 40 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={motionOk ? { opacity: 0, x: direction * -40 } : undefined}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 md:grid-cols-[1fr_260px]"
            >
              <blockquote className="font-display text-2xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl lg:text-4xl">
                <span dir="auto">« {review.text} »</span>
              </blockquote>
              <figcaption className="md:border-l md:border-zinc-200 md:pl-6 dark:md:border-white/10">
                <span className="flex text-gold-500">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} weight={s < review.rating ? 'fill' : 'regular'} className={s < review.rating ? '' : 'text-zinc-300 dark:text-zinc-700'} />)}
                </span>
                <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-50">{review.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{review.place} · {review.date}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-1.5">
            {REVIEWS.map((_, i) => (
              <button key={i} aria-label={`Avis ${i + 1}`} onClick={() => setState([i, i > index ? 1 : -1])} className="flex h-8 items-center">
                <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ${i === index ? 'w-8 bg-gold-500' : 'w-2.5 bg-zinc-300 dark:bg-zinc-700'}`} />
              </button>
            ))}
          </div>
          <a
            href={COMPANY.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-gold-600 dark:text-zinc-50 dark:hover:text-gold-400"
          >
            {t('reviews.google')} <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
