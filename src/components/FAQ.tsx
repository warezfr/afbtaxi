import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../lib/i18n';

const FAQ_DATA = [
  {
    question: "Comment puis-je réserver mon taxi ?",
    answer: "Vous pouvez réserver très facilement via notre module de réservation en ligne, par téléphone au 06 07 42 46 16, ou directement sur WhatsApp. Nous vous recommandons de réserver à l'avance pour les trajets vers les aéroports."
  },
  {
    question: "Comment se passe la confirmation de ma réservation ?",
    answer: "Une fois votre demande envoyée via le site, vous recevrez immédiatement un e-mail récapitulatif avec les détails de votre trajet. Notre chauffeur vous contactera ensuite (par téléphone ou WhatsApp) pour confirmer la prise en charge."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les paiements par Carte Bancaire (Visa, Mastercard, Amex) directement à bord du véhicule, ainsi que les paiements en espèces. Une facture vous sera délivrée sur demande."
  },
  {
    question: "Proposez-vous le transport médical conventionné ?",
    answer: "Oui, AFB Taxis est un taxi conventionné par la CPAM en Seine-et-Marne (77). Nous assurons vos transports médicaux vers les hôpitaux et centres de soins (aller-retour). Pensez à vous munir de votre prescription médicale de transport."
  },
  {
    question: "Faites-vous les transferts vers les aéroports d'Orly et Roissy CDG ?",
    answer: "Absolument. Les transferts aéroports sont notre spécialité. Nous desservons Paris-Orly (ORY) et Paris-Charles de Gaulle (CDG). Nous suivons l'horaire de votre vol en temps réel pour vous garantir une arrivée ponctuelle et sans stress."
  }
];

export function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="bg-gray-50 dark:bg-gray-950 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Questions <span className="text-gold-500">Fréquentes</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Tout ce que vous devez savoir sur nos services de taxi à Fontainebleau.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-display font-bold text-gray-900 dark:text-white text-lg pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gold-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JSON-LD Schema for FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}
