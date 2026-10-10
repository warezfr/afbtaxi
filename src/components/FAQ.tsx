import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon, useMotionOk } from './motion';

const FAQ_DATA = [
  {
    question: 'Comment réserver un taxi ?',
    answer: 'En ligne via le formulaire de réservation, par téléphone au 06 07 42 46 16 ou sur WhatsApp. Pour les aéroports, réservez la veille si possible.',
  },
  {
    question: 'Comment ma réservation est-elle confirmée ?',
    answer: 'Vous recevez un e-mail récapitulatif immédiatement, puis le chauffeur vous contacte par téléphone ou WhatsApp pour confirmer la prise en charge.',
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'Carte bancaire (Visa, Mastercard, American Express) à bord du véhicule, et espèces. Une facture est remise sur demande.',
  },
  {
    question: 'Faites-vous le transport médical conventionné ?',
    answer: 'Oui. AFB Taxis est conventionné CPAM en Seine-et-Marne. Munissez-vous de votre prescription médicale de transport, nous gérons le reste.',
  },
  {
    question: 'Desservez-vous Orly et Roissy CDG ?',
    answer: 'Oui, ainsi que Beauvais. Nous suivons votre vol en temps réel : en cas de retard, le chauffeur adapte l\'heure de prise en charge.',
  },
  {
    question: 'Le prix annoncé peut-il changer ?',
    answer: 'Non. Pour les trajets de la grille, le prix est confirmé à la réservation. Les suppléments éventuels (attente, arrêt) sont indiqués à l\'avance.',
  },
];

export function FAQ() {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <section id="faq" className="bg-zinc-50 py-20 dark:bg-zinc-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon}>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">{t('faq.title')}</h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">{t('faq.subtitle')}</p>
        </motion.div>

        <motion.dl
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoon}
          className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2"
        >
          {FAQ_DATA.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} variants={fadeUp} className="border-t border-zinc-200 dark:border-white/10">
                <dt>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <span className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{f.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200/70 text-zinc-900 dark:bg-white/10 dark:text-zinc-50">
                      <Plus size={16} weight="bold" />
                    </motion.span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={`faq-${i}`}
                      initial={motionOk ? { height: 0, opacity: 0 } : false}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={motionOk ? { height: 0, opacity: 0 } : undefined}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{f.answer}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.dl>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}
