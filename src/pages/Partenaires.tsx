import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ReservationWizard } from '@/components/ReservationWizard';
import { useState, useEffect } from 'react';
import { Star, Building2, CalendarCheck, CreditCard, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export function Partenaires() {
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar onOpenBooking={() => setWizardOpen(true)} />
      <main className="flex-1 bg-white dark:bg-gray-950">
        
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/20 text-gold-600 dark:text-gold-400 font-bold text-sm tracking-widest uppercase mb-8">
            <Building2 size={16} /> Espace Entreprises & Hôtels
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-gray-900 dark:text-white tracking-tight mb-8">
            Le partenaire VTC de confiance <br className="hidden lg:block"/>
            <span className="text-gold-600 dark:text-gold-400">pour vos clients les plus exigeants</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
            Hôtels de luxe, conciergeries, administration de l'INSEAD et grandes entreprises : AFB Taxis met à votre disposition une flotte premium et un service prioritaire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-xl hover:scale-105"
            >
              <MessageCircle size={24} /> Ligne Directe Conciergerie
            </a>
            <a 
              href="mailto:contact@afbtaxis.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all border border-gray-200 dark:border-gray-800"
            >
              Demander l'ouverture d'un compte
            </a>
          </div>
        </section>

        <section className="py-24 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 dark:text-white text-center mb-16">
              Pourquoi nous confier vos clients ?
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Star className="text-gold-500 w-12 h-12" />,
                  title: "Flotte Premium Anonyme",
                  desc: "Des véhicules haut de gamme (Mercedes) discrets, parfaitement entretenus, chauffeurs en costume."
                },
                {
                  icon: <CalendarCheck className="text-gold-500 w-12 h-12" />,
                  title: "Priorité de Réservation",
                  desc: "Vos demandes sont traitées en priorité absolue, même en période de forte affluence (événements INSEAD)."
                },
                {
                  icon: <CreditCard className="text-gold-500 w-12 h-12" />,
                  title: "Facturation Simplifiée",
                  desc: "Possibilité de paiement différé à 30 jours, facturation centralisée et bons de commande acceptés."
                }
              ].map((benefit, i) => (
                <div key={i} className="text-center p-8 rounded-3xl bg-white dark:bg-gray-950 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow">
                  <div className="inline-flex p-4 rounded-2xl bg-gold-50 dark:bg-gold-500/10 mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      
      <div className="hidden lg:block">
        <WhatsAppButton />
      </div>
      <MobileBottomNav onOpenBooking={() => setWizardOpen(true)} />
      
      <ReservationWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </>
  );
}
