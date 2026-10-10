import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'motion/react';
import {
  Star,
  CalendarCheck,
  Receipt,
  Airplane,
  GraduationCap,
  Train,
  PaperPlaneTilt,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { PageHeader } from '@/components/PageHeader';
import { COMPANY } from '@/lib/constants';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const SERVICES = [
  { icon: Star, title: 'Flotte discrète', desc: 'Mercedes Classe E, Classe S et Classe V entretenues avec soin, chauffeurs en costume.' },
  { icon: CalendarCheck, title: 'Priorité de réservation', desc: 'Vos demandes passent en premier, y compris pendant les événements de l\'INSEAD.' },
  { icon: Receipt, title: 'Facturation centralisée', desc: 'Paiement différé à 30 jours, facture unique et bons de commande acceptés.' },
  { icon: Airplane, title: 'Transferts aéroports', desc: 'Orly et Roissy-CDG, suivi du vol et attente incluse en cas de retard.' },
  { icon: GraduationCap, title: 'Navettes INSEAD et entreprises', desc: 'Arrivées de groupes, séminaires et déplacements de direction en Seine-et-Marne.' },
  { icon: Train, title: 'Gares et sites touristiques', desc: 'Gare de Fontainebleau-Avon, château de Fontainebleau, Vaux-le-Vicomte.' },
];

const STEPS = [
  { n: '01', title: 'Vous nous écrivez', desc: 'Remplissez le formulaire ou envoyez un message WhatsApp avec votre volume estimé.' },
  { n: '02', title: 'Nous ouvrons votre compte', desc: 'Un interlocuteur dédié vous recontacte sous 24 heures et fixe les conditions.' },
  { n: '03', title: 'Vous réservez', desc: 'Par téléphone, WhatsApp ou en ligne, avec un prix annoncé avant le départ.' },
];

const fieldClass =
  'w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-offset-zinc-900';
const labelClass = 'mb-2 block text-sm font-semibold text-zinc-800 dark:text-zinc-200';

export function Partenaires() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();
  const [params] = useSearchParams();
  const reduce = useReducedMotion();
  const sent = params.get('success') === 'true';

  const whatsappMessage = 'Bonjour, je souhaite ouvrir un compte partenaire / conciergerie avec AFB Taxis.';
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const view = {
    initial: reduce ? false : ('hidden' as const),
    whileInView: 'show' as const,
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <>
      <Helmet>
        <title>Partenariat hôtels, entreprises et agences | AFB Taxis Fontainebleau</title>
        <meta
          name="description"
          content="Hôtels, conciergeries, INSEAD et entreprises : chauffeur privé à Fontainebleau avec priorité de réservation et facturation centralisée. Ouvrez un compte partenaire."
        />
        <link rel="canonical" href="https://www.afbtaxis.com/partenaires" />
        <meta property="og:title" content="Partenariat hôtels, entreprises et agences | AFB Taxis" />
        <meta property="og:url" content="https://www.afbtaxis.com/partenaires" />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageHeader
        title="Partenariat hôtels, entreprises et agences"
        subtitle="Une flotte premium, un interlocuteur dédié et une facturation simple pour vos clients."
        breadcrumb={[{ label: 'Accueil', to: '/' }, { label: 'Partenaires', to: '/partenaires' }]}
      >
        <button
          type="button"
          onClick={() => openBooking('Partenaires')}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold-400 px-7 py-3 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Réserver
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 font-semibold text-zinc-950 transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <WhatsappLogo size={22} weight="regular" aria-hidden="true" /> WhatsApp
        </a>
      </PageHeader>

      <section className="bg-zinc-50 py-20 dark:bg-zinc-950 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 max-w-2xl font-display text-3xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
            Ce que nous prenons en charge
          </h2>
          <motion.ul
            {...view}
            variants={stagger}
            className="grid gap-x-16 divide-y divide-zinc-200 dark:divide-white/10 md:grid-cols-2 md:divide-y-0"
          >
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="flex gap-5 border-t border-zinc-200 py-7 dark:border-white/10"
              >
                <Icon size={32} weight="regular" className="mt-1 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h3>
                  <p className="mt-2 max-w-[65ch] leading-relaxed text-zinc-600 dark:text-zinc-400">{desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-zinc-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-14 max-w-2xl font-display text-3xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl lg:text-5xl">
            Comment ça marche
          </h2>
          <motion.ol {...view} variants={stagger} className="grid gap-10 md:grid-cols-3 md:gap-12">
            {STEPS.map((s) => (
              <motion.li key={s.n} variants={fadeUp}>
                <span className="font-display text-5xl tabular-nums text-gold-500">{s.n}</span>
                <h3 className="mt-4 font-display text-xl tracking-tight text-zinc-900 dark:text-zinc-50">{s.title}</h3>
                <p className="mt-2 max-w-[65ch] leading-relaxed text-zinc-600 dark:text-zinc-400">{s.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section id="formulaire-partenaire" className="bg-zinc-50 py-20 dark:bg-zinc-950 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[20px] border border-zinc-200 bg-white p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-none md:p-10">
            <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50">
              Demande d'ouverture de compte
            </h2>
            <p className="mt-3 mb-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Notre équipe vous recontacte sous 24 heures.
            </p>

            {sent && (
              <p role="status" className="mb-8 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-zinc-900 dark:border-gold-700 dark:bg-gold-900/30 dark:text-zinc-50">
                Votre demande est bien envoyée. Nous vous recontactons sous 24 heures.
              </p>
            )}

            <form action="https://formsubmit.co/afb@afbtaxis.com" method="POST" className="space-y-6">
              <input type="hidden" name="_autoresponse" value="Bonjour ! Nous avons bien reçu votre demande d'ouverture de compte partenaire B2B chez AFB Taxis. Notre équipe commerciale va l'étudier avec soin et vous recontactera d'ici 24 heures maximum. À très vite ! L'équipe AFB Taxis." />
              <input type="hidden" name="_subject" value="Nouvelle Demande de Partenariat B2B !" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://www.afbtaxis.com/partenaires?success=true" />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="p-societe" className={labelClass}>Établissement / Société</label>
                  <input id="p-societe" type="text" name="societe" required className={fieldClass} placeholder="Ex : Hôtel de l'Aigle Noir" />
                </div>
                <div>
                  <label htmlFor="p-nom" className={labelClass}>Nom du contact</label>
                  <input id="p-nom" type="text" name="nom" required className={fieldClass} placeholder="Votre nom" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="p-email" className={labelClass}>E-mail professionnel</label>
                  <input id="p-email" type="email" name="email" required className={fieldClass} placeholder="contact@etablissement.com" />
                </div>
                <div>
                  <label htmlFor="p-tel" className={labelClass}>Téléphone</label>
                  <input id="p-tel" type="tel" name="telephone" required className={fieldClass} placeholder="01 23 45 67 89" />
                </div>
              </div>

              <div>
                <label htmlFor="p-volume" className={labelClass}>Besoin estimé</label>
                <select id="p-volume" name="volume" className={fieldClass}>
                  <option value="Occasionnel">Occasionnel (1-5 trajets/mois)</option>
                  <option value="Regulier">Régulier (5-20 trajets/mois)</option>
                  <option value="Quotidien">Quotidien (plus de 20 trajets/mois)</option>
                </select>
              </div>

              <div>
                <label htmlFor="p-message" className={labelClass}>Message (facultatif)</label>
                <textarea id="p-message" name="message" rows={4} className={fieldClass} placeholder="Précisez vos besoins particuliers" />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-3 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                Envoyer la demande <PaperPlaneTilt size={20} weight="regular" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
