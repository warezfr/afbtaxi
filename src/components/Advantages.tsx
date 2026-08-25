import { Clock, MapPin, Handshake, Snowflake, CalendarDays, Award } from 'lucide-react';

const ADVANTAGES_DATA = [
  { icon: Clock, title: 'Ponctualit\u00e9', desc: 'Nous arrivons \u00e0 l\u2019heure, \u00e0 chaque trajet. Notre r\u00e9putation en d\u00e9pend.' },
  { icon: MapPin, title: 'Chauffeurs exp\u00e9riment\u00e9s', desc: 'Connaissance parfaite de la r\u00e9gion pour des trajets rapides.' },
  { icon: Handshake, title: 'Confiance', desc: 'Respect de chaque engagement. Vos horaires sont notre priorit\u00e9.' },
  { icon: Snowflake, title: 'V\u00e9hicules confortables', desc: 'Flotte premium, climatis\u00e9e et entretenue avec soin.' },
  { icon: CalendarDays, title: 'Service 7j/7', desc: 'Disponibles tous les jours, t\u00f4t le matin ou tard le soir.' },
  { icon: Award, title: '20 ans d\u2019exp\u00e9rience', desc: 'Au service de Fontainebleau et sa r\u00e9gion depuis 2004.' },
];

export function Advantages() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">Pourquoi nous choisir</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            L'excellence au <span className="gold-text">quotidien</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES_DATA.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group glass rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/20">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/10 transition-colors duration-300 group-hover:bg-gold-400/20">
                <Icon size={22} className="text-gold-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
