import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from '@phosphor-icons/react';
import { useI18n } from '@/lib/i18n';
import { EASE, fadeUp, stagger, viewportSoon, useMotionOk } from './motion';

const FAQ_DATA = [
  { q: 'Comment réserver un taxi ?', a: 'En ligne via le formulaire de réservation, par téléphone au 06 07 42 46 16 ou sur WhatsApp. Pour les aéroports, réservez la veille si possible.' },
  { q: 'Comment ma réservation est-elle confirmée ?', a: 'Vous recevez un e-mail récapitulatif immédiatement, puis le chauffeur vous contacte par téléphone ou WhatsApp pour confirmer la prise en charge.' },
  { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Carte bancaire (Visa, Mastercard, American Express) à bord du véhicule, et espèces. Une facture est remise sur demande.' },
  { q: 'Faites-vous le transport médical conventionné ?', a: 'Oui. AFB Taxis est conventionné CPAM en Seine-et-Marne. Munissez-vous de votre prescription médicale de transport, nous gérons le reste.' },
  { q: 'Desservez-vous Orly et Roissy CDG ?', a: 'Oui, ainsi que Beauvais. Nous suivons votre vol en temps réel : en cas de retard, le chauffeur adapte l\'heure de prise en charge.' },
  { q: 'Le prix annoncé peut-il changer ?', a: 'Non. Pour les trajets de la grille, le prix est confirmé à la réservation. Les suppléments éventuels (attente, arrêt) sont indiqués à l\'avance.' },
];

export function FAQ() {
  const { t } = useI18n();
  const motionOk = useMotionOk();
  const [open, setOpen] = useState<number | null>(0);
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <section id="faq" className="bg-paper py-24 text-ink dark:bg-[#0B0B0C] dark:text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSoon} className="lg:col-span-4">
          <h2 className="font-display text-4xl font-semibold tracking-tightest md:text-5xl">{t('faq.title')}</h2>
          <p className="mt-3 text-base text-ink/60 dark:text-white/60">{t('faq.subtitle')}</p>
        </motion.div>
        <motion.dl variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewportSoon} className="lg:col-span-8">
          {FAQ_DATA.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} variants={fadeUp} className="border-t border-ink/15 last:border-b dark:border-white/15">
                <dt>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                    <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isOpen ? 'bg-gold-400 text-ink' : 'bg-ink/5 dark:bg-white/10'}`}>
                      <Plus size={16} weight="bold" />
                    </motion.span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd id={`faq-${i}`} initial={motionOk ? { height: 0, opacity: 0 } : false} animate={{ height: 'auto', opacity: 1 }} exit={motionOk ? { height: 0, opacity: 0 } : undefined} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                      <p className="max-w-[60ch] pb-7 text-base leading-relaxed text-ink/65 dark:text-white/60">{f.a}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.dl>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
