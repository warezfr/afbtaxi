import { ArrowUpRight, Plane, HeartPulse, Car, TrainFront, Clock, Users } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: () => void;
}

const SERVICE_CARDS = [
  {
    title: 'Transferts A\u00e9roports',
    subtitle: 'Orly \u00b7 CDG',
    description: 'Ponctualit\u00e9 garantie pour vos vols. Suivi en temps r\u00e9el de votre vol.',
    icon: Plane,
    accent: true,
  },
  {
    title: 'Transferts Gares',
    subtitle: 'TGV \u00b7 RER',
    description: 'Gare de Lyon, gare d\u2019Avon, Chessy\u2026 Nous vous emmenons partout.',
    icon: TrainFront,
    accent: false,
  },
  {
    title: 'Transport Sanitaire',
    subtitle: 'Conventionn\u00e9 CPAM 77',
    description: 'Transport m\u00e9dical s\u00e9curis\u00e9, toutes distances, avec le plus grand soin.',
    icon: HeartPulse,
    accent: false,
  },
  {
    title: 'Mise \u00e0 Disposition',
    subtitle: 'Journ\u00e9e \u00b7 Soir\u00e9e',
    description: 'Chauffeur d\u00e9di\u00e9 pour vos d\u00e9placements professionnels ou \u00e9v\u00e9nements.',
    icon: Clock,
    accent: false,
  },
  {
    title: 'Transport de Groupe',
    subtitle: 'Jusqu\u2019\u00e0 7 passagers',
    description: 'Mercedes Classe V spacieuse pour familles et groupes.',
    icon: Users,
    accent: false,
  },
  {
    title: 'Courses Locales',
    subtitle: 'Fontainebleau & alentours',
    description: 'D\u00e9placements quotidiens dans Fontainebleau et ses environs.',
    icon: Car,
    accent: true,
  },
];

export function Services({ onOpenBooking }: ServicesProps) {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">Nos services</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Un taxi pour chaque <span className="gold-text">besoin</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-400">
            Que ce soit pour un transfert a\u00e9roport, un trajet m\u00e9dical ou une mise \u00e0 disposition, nous avons la solution adapt\u00e9e.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map(({ title, subtitle, description, icon: Icon, accent }) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                accent
                  ? 'bg-gold-400 text-ink'
                  : 'glass hover:border-gold-400/20'
              }`}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: accent ? 'rgba(10,10,10,0.9)' : 'rgba(255,208,59,0.1)' }}
              >
                <Icon size={22} className={accent ? 'text-gold-400' : 'text-gold-400'} />
              </div>

              <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${accent ? 'text-ink/60' : 'text-gold-400/70'}`}>
                {subtitle}
              </p>
              <h3 className={`text-xl font-bold ${accent ? 'text-ink' : 'text-white'}`}>{title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${accent ? 'text-ink/70' : 'text-neutral-400'}`}>{description}</p>

              <button
                onClick={onOpenBooking}
                className={`mt-5 inline-flex items-center gap-2 text-sm font-bold transition-colors ${
                  accent ? 'text-ink hover:text-ink/70' : 'text-gold-400 hover:text-gold-300'
                }`}
              >
                R\u00e9server <ArrowUpRight size={15} />
              </button>

              {/* Corner decoration */}
              <div className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                accent ? 'bg-gold-300/50' : 'bg-gold-400/5'
              }`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
