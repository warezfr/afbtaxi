import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-display font-black text-gray-900 dark:text-white">Nous contacter</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <form action={`https://formsubmit.co/${COMPANY.email}`} method="POST" className="space-y-5">
            <input type="hidden" name="_autoresponse" value="Bonjour ! Nous avons bien reçu votre message. Notre équipe va le traiter dans les plus brefs délais et vous recontactera très vite. L'équipe AFB Taxis." />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window.location.href} />

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Sujet de votre demande</label>
              <select name="sujet" defaultValue={defaultSubject} className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none">
                <option value="Demande d'informations">Demande d'informations</option>
                <option value="Réservation">Réservation</option>
                <option value="Partenariats">Partenariats</option>
                <option value="Réclamation / Autre">Réclamation / Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Votre Nom</label>
              <input type="text" name="nom" required className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="Jean Dupont" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Votre Email</label>
              <input type="email" name="email" required className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="jean@exemple.com" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
              <textarea name="message" required rows={4} className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-gray-900 px-6 py-4 rounded-xl font-black uppercase tracking-widest transition-all mt-2">
              Envoyer <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
