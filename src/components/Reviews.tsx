import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Star, ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { EASE, useMotionOk } from './motion';

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
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const go = useCallback((d: 1 | -1) => setState(([i]) => [(i + d + REVIEWS.length) % REVIEWS.length, d]), []);

  useEffect(() => {
    if (paused || !motionOk) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, motionOk, go]);

  const r = REVIEWS[index];

  return (
    <section id="avis" className="bg-paper py-24 text-ink dark:bg-[#0B0B0C] dark:text-white lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-gold-600 dark:text-gold-400">{t('reviews.kicker')}</p>
            <p className="mt-3 flex items-center gap-3">
              <span className="flex text-gold-500">{[...Array(5)].map((_, i) => <Star key={i} size={18} weight="fill" />)}</span>
              <span className="font-mono text-lg font-semibold tabular-nums">4,9 / 5</span>
            </p>
            <div className="mt-8 flex gap-2">
              <button data-testid="reviews-prev-button" onClick={() => go(-1)} aria-label="Avis précédent" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-ink"><ArrowLeft size={18} /></button>
              <button data-testid="reviews-next-button" onClick={() => go(1)} aria-label="Avis suivant" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-gold-400 hover:text-ink dark:bg-white dark:text-ink"><ArrowRight size={18} /></button>
            </div>
            <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-gold-400 decoration-2 underline-offset-4">
              {t('reviews.google')} <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>

          <div data-testid="reviews-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative min-h-[260px] lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={motionOk ? { opacity: 0, y: 24 * dir } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={motionOk ? { opacity: 0, y: -24 * dir } : undefined}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <blockquote className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                  <span dir="auto">« {r.text} »</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-base font-semibold text-gold-400 dark:bg-white dark:text-ink">{r.name.charAt(0)}</span>
                  <span>
                    <span className="block font-semibold">{r.name}</span>
                    <span className="block text-sm text-ink/55 dark:text-white/55">{r.place} · {r.date}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
