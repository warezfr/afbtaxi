import { Check, Crown, Gauge, Leaf, Users } from 'lucide-react';

interface FleetProps {
  onOpenBooking: (context?: string) => void;
}

const VEHICLES = [
  {
    name: 'Mercedes Classe E',
    tag: 'Berline',
    image: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Crown,
    features: ['Berline élégante et confortable', 'Climatisation et cuir', 'Idéale pour trajets quotidiens'],
    seats: '4 places',
  },
  {
    name: 'Mercedes Classe S',
    tag: 'VIP',
    image: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Crown,
    features: ['Berline de luxe silencieuse', 'Climatisation bi-zone, cuir', 'Service haut de gamme'],
    seats: '4 places',
  },
  {
    name: 'Mercedes Classe V',
    tag: 'Van',
    image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Users,
    features: ['Van spacieux et confortable', 'Jusqu\'à 7 passagers', 'Grande capacité bagages'],
    seats: '7 places',
  },
  {
    name: 'Tesla Y',
    tag: 'Électrique',
    image: 'https://images.pexels.com/photos/20019462/pexels-photo-20019462.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Leaf,
    features: ['100 % électrique', 'Silencieuse et moderne', 'Idéale trajets urbains'],
    seats: '5 places',
  },
  {
    name: 'Mercedes S W222',
    tag: 'Signature',
    image: 'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Gauge,
    features: ['Grande berline iconique', 'Espace arrière premium', 'Cérémonies et aéroport'],
    seats: '4 places',
  },
];

export function Fleet({ onOpenBooking }: FleetProps) {
  return (
    <section id="flotte" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">Notre flotte</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Véhicules <span className="gold-text">premium</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            Au départ ou à l'arrivée de Fontainebleau, voyagez dans le véhicule qui correspond à vos besoins.
          </p>
        </div>

        {/* Top row: 3 cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.slice(0, 3).map((vehicle) => {
            const Icon = vehicle.icon;
            return (
              <article
                key={vehicle.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/30 hover:shadow-[0_20px_60px_rgba(255,208,59,0.08)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold text-gold-400 backdrop-blur-sm">{vehicle.seats}</span>
                  <div className="absolute bottom-4 left-5 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-ink"><Icon size={18} /></div>
                    <div>
                      <h3 className="text-base font-bold text-white">{vehicle.name}</h3>
                      <p className="text-[11px] font-semibold text-gold-400">{vehicle.tag}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <ul className="flex-1 space-y-2.5">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-400">
                        <Check size={14} className="shrink-0 text-gold-400" />{feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onOpenBooking(vehicle.name)}
                    className="mt-5 w-full rounded-2xl border border-gold-400/20 bg-gold-400/5 px-5 py-3 text-sm font-bold text-gold-400 transition-all hover:border-gold-400/50 hover:bg-gold-400/10"
                  >
                    Réserver
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+0.625rem)]">
          {VEHICLES.slice(3).map((vehicle) => {
            const Icon = vehicle.icon;
            return (
              <article
                key={vehicle.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/30 hover:shadow-[0_20px_60px_rgba(255,208,59,0.08)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold text-gold-400 backdrop-blur-sm">{vehicle.seats}</span>
                  <div className="absolute bottom-4 left-5 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-ink"><Icon size={18} /></div>
                    <div>
                      <h3 className="text-base font-bold text-white">{vehicle.name}</h3>
                      <p className="text-[11px] font-semibold text-gold-400">{vehicle.tag}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <ul className="flex-1 space-y-2.5">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-400">
                        <Check size={14} className="shrink-0 text-gold-400" />{feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onOpenBooking(vehicle.name)}
                    className="mt-5 w-full rounded-2xl border border-gold-400/20 bg-gold-400/5 px-5 py-3 text-sm font-bold text-gold-400 transition-all hover:border-gold-400/50 hover:bg-gold-400/10"
                  >
                    Réserver
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
