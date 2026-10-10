import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, PaperPlaneTilt } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';

const inputCls =
  'w-full min-h-[48px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 placeholder-zinc-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50';
const labelCls = 'mb-1.5 block text-sm font-semibold text-zinc-700 dark:text-zinc-300';

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultSubject, setDefaultSubject] = useState('Demande d\'informations');

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.subject) {
        setDefaultSubject(customEvent.detail.subject);
      }
      setIsOpen(true);
    };
    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-card border border-zinc-200 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.35)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-none"
          >
            <div className="taxi-checker h-2" />
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-white/10">
              <h3 id="contact-modal-title" className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">Nous écrire</h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <form action={`https://formsubmit.co/${COMPANY.email}`} method="POST" className="space-y-5">
                <input type="hidden" name="_autoresponse" value="Bonjour, nous avons bien reçu votre message. Nous vous recontactons très vite. L'équipe AFB Taxis." />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />

                <div>
                  <label htmlFor="contact-subject" className={labelCls}>Sujet</label>
                  <select id="contact-subject" name="sujet" defaultValue={defaultSubject} className={inputCls}>
                    <option value="Demande d'informations">Demande d'informations</option>
                    <option value="Réservation">Réservation</option>
                    <option value="Partenariats">Partenariats</option>
                    <option value="Réclamation / Autre">Réclamation / Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-name" className={labelCls}>Nom</label>
                  <input id="contact-name" type="text" name="nom" required className={inputCls} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelCls}>E-mail</label>
                  <input id="contact-email" type="email" name="email" required className={inputCls} autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelCls}>Message</label>
                  <textarea id="contact-message" name="message" required rows={4} className={inputCls} />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 font-bold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                >
                  Envoyer <PaperPlaneTilt size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
