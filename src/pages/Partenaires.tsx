import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ReservationWizard } from '@/components/ReservationWizard';
import { useState, useEffect } from 'react';
import { Star, Building2, CalendarCheck, CreditCard, MessageCircle, Send } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export function Partenaires() {
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappMessage = "Bonjour, je souhaite ouvrir un compte partenaire / conciergerie avec AFB Taxis.";
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar onOpenBooking={() => setWizardOpen(true)} />
      <main className="flex-1 bg-white dark:bg-gray-950">
        
        
        {/* HERO SECTION AVEC IMAGE */}
        <div className="relative overflow-hidden bg-gray-900 pt-32 pb-20 lg:pt-48 lg:pb-40">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2000&auto=format&fit=crop" 
              alt="Partenaires et Conciergerie AFB Taxis"
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/20 text-gold-400 font-bold text-sm tracking-widest uppercase mb-8 backdrop-blur-md border border-gold-400/30">
              <Building2 size={16} /> Espace Entreprises & Hôtels
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white tracking-tight mb-8 drop-shadow-sm">
              Le partenaire VTC de confiance <br className="hidden lg:block"/>
              <span className="text-gold-400">pour vos clients les plus exigeants</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 drop-shadow-sm">
              Hôtels de luxe, conciergeries, administration de l'INSEAD et grandes entreprises : AFB Taxis met à votre disposition une flotte premium et un service prioritaire.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-xl hover:scale-105"
              >
                <MessageCircle size={24} /> Ligne Directe Conciergerie
              </a>
              <a 
                href="#formulaire-partenaire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all border border-gray-200"
              >
                Demander l'ouverture d'un compte
              </a>
            </div>
          </div>

          {/* Wave transition to white/dark */}
          <div className="absolute -bottom-px left-0 right-0 z-10 overflow-hidden">
            <svg viewBox="0 0 2880 110" preserveAspectRatio="none" className="block h-[50px] w-[200%] fill-gray-50 dark:fill-gray-900 sm:h-[70px] lg:h-[95px] animate-wave">
              <path d="M0,50 C360,110 360,-10 720,50 C1080,110 1080,-10 1440,50 C1800,110 1800,-10 2160,50 C2520,110 2520,-10 2880,50 L2880,110 L0,110 Z" />
            </svg>
          </div>
        </div>

        {/* MOTS CLÉS SEO CACHÉS */}
        <div className="opacity-0 pointer-events-none w-0 h-0 absolute overflow-hidden" aria-hidden="true">
          Partenaires VTC Fontainebleau, Conciergerie Aigle Noir Fontainebleau, Navette INSEAD Fontainebleau, Hôtel Demeures de Campagne Parc de Fontainebleau, VTC L'Axel Fontainebleau, Hôtels de luxe Fontainebleau, Transport Château de Fontainebleau, VTC Château de Vaux-le-Vicomte, Transport partenaires Barbizon, Navette entreprise Fontainebleau, Chauffeur de direction Seine-et-Marne, Transport VIP INSEAD.
        </div>

        {/* POURQUOI NOUS CHOISIR */}
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

        {/* FORMULAIRE D'OUVERTURE DE COMPTE */}
        <section id="formulaire-partenaire" className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-4">
                  Demande d'Ouverture de Compte
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Remplissez ce formulaire pour être recontacté sous 24h par notre équipe commerciale dédiée aux partenariats professionnels.
                </p>
              </div>

              <form action="https://formsubmit.co/afb@afbtaxis.com" method="POST" className="space-y-6">
                {/* Auto-response pour le client */}
                <input type="hidden" name="_autoresponse" value="Bonjour ! Nous avons bien reçu votre demande d'ouverture de compte partenaire B2B chez AFB Taxis. Notre équipe commerciale va l'étudier avec soin et vous recontactera d'ici 24 heures maximum. À très vite ! L'équipe AFB Taxis." />
                <input type="hidden" name="_subject" value="Nouvelle Demande de Partenariat B2B !" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://www.afbtaxis.com/partenaires?success=true" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Établissement / Société</label>
                    <input type="text" name="societe" required className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="Ex: Hôtel de l'Aigle Noir" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nom du contact</label>
                    <input type="text" name="nom" required className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="Votre nom" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Professionnel</label>
                    <input type="email" name="email" required className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="contact@etablissement.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Téléphone</label>
                    <input type="tel" name="telephone" required className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="01 23 45 67 89" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Besoin estimé</label>
                  <select name="volume" className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none">
                    <option value="Occasionnel">Occasionnel (1-5 trajets/mois)</option>
                    <option value="Regulier">Régulier (5-20 trajets/mois)</option>
                    <option value="Quotidien">Quotidien (Plus de 20 trajets/mois)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message (Optionnel)</label>
                  <textarea name="message" rows={4} className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:outline-none" placeholder="Précisez vos besoins particuliers..."></textarea>
                </div>

                <button type="submit" className="w-full inline-flex items-center justify-center gap-3 bg-gold-400 hover:bg-gold-500 text-gray-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl">
                  Envoyer la demande <Send size={20} />
                </button>
              </form>
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
