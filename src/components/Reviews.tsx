import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const REVIEWS = [
  { name: 'Marie L.', date: 'Mars 2026', text: "Chauffeur très ponctuel pour notre transfert vers Orly. Voiture impeccable, conduite souple. Je recommande vivement AFB Taxis pour tous vos trajets vers les aéroports.", rating: 5 },
  { name: 'Thomas B.', date: 'Février 2026', text: "Service irréprochable depuis des années. Toujours à l'heure, même très tôt le matin. La Classe V est parfaite pour nos déplacements en famille vers CDG.", rating: 5 },
  { name: 'Sophie D.', date: 'Février 2026', text: "Transport médical conventionné : chauffeur attentionné, d'une grande gentillesse avec ma mère. Fiable et sérieux, c'est rassurant.", rating: 5 },
  { name: 'James W.', date: 'Janvier 2026', text: "Excellent service from Fontainebleau to Paris. Driver spoke English, the Mercedes was spotless and we arrived early. Highly recommended!", rating: 5 },
  { name: 'Karim A.', date: 'Décembre 2025', text: "Réservation simple par WhatsApp, prix annoncé respecté, aucune mauvaise surprise. Le chauffeur connaît parfaitement la région.", rating: 5 },
  { name: 'Isabelle M.', date: 'Novembre 2025', text: "Mise à disposition à la journée pour un mariage à Barbizon : service haut de gamme, chauffeur discret et élégant. Merci !", rating: 4 },
];

export function Reviews() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - perView);
  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  return (
    <section id="avis" className="relative overflow-hidden bg-white dark:bg-gray-950 py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600 sm:text-sm">
              <span className="h-px w-8 bg-gold-400" />
              {t('reviews.label')}
            </p>
            <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              {t('reviews.title1')}<span className="yellow-marker px-1">{t('reviews.title2')}</span>
            </h2>
            <p className="mt-4 flex items-center gap-3 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
              <span className="flex text-gold-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">4.9/5</span>
              {t('reviews.subtitle')}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              data-testid="reviews-prev-button"
              onClick={prev}
              aria-label="Avis précédent"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white transition-colors hover:bg-gray-900 dark:hover:bg-gray-800 hover:text-gold-400 dark:hover:text-gold-400"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              data-testid="reviews-next-button"
              onClick={next}
              aria-label="Avis suivant"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-gray-900 transition-colors hover:bg-gold-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]" data-testid="reviews-carousel">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {REVIEWS.map((review, i) => (
              <div key={i} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3" style={{ minWidth: `${100 / perView}%` }}>
                <article className="flex h-full flex-col rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex text-gold-500">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={16} fill={s < review.rating ? 'currentColor' : 'none'} className={s < review.rating ? '' : 'text-gray-300 dark:text-gray-700'} />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-white dark:bg-gray-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 shadow-sm">
                      <span className="font-black"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">"{review.text}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 font-display text-sm font-black text-gray-900">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-white">
                        {review.name}
                        <BadgeCheck size={14} className="text-gold-600" />
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button key={i} aria-label={`Page ${i + 1}`} onClick={() => setIndex(i)} className="flex h-8 items-center px-0.5">
              <span className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${i === index ? 'w-8 bg-gold-500' : 'w-3 bg-gray-200 dark:bg-gray-800'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
