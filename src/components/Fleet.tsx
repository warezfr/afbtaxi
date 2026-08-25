import { Check, Crown, Gauge, Leaf, Users } from 'lucide-react';

interface FleetProps {
  onOpenBooking: () => void;
}

const VEHICLES = [
  {
    name: 'Mercedes Classe E',
    tag: 'Berline · Élégance',
    image: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Crown,
    features: ['Berline confortable et discrète', 'Climatisation et grand confort', 'Idéale pour les trajets quotidiens', 'Transferts gares et aéroports'],
    seats: '4 places',
  },
  {
    name: 'Mercedes Classe S',
    tag: 'VIP · Confort premium',
    image: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Crown,
    features: ['Berline de luxe silencieuse', 'Cuir et climatisation bi-zone', 'Service haut de gamme', 'Transferts VIP et affaires'],
    seats: '4 places',
  },
  {
    name: 'Mercedes Classe V',
    tag: 'Van · Groupes et familles',
    image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Users,
    features: ['Van spacieux et confortable', 'Jusqu’à 7 passagers', 'Grande capacité de bagages', 'Transferts de groupe longue distance'],
    seats: '7 places max',
  },
  {
    name: 'Tesla Y',
    tag: 'Électrique · Moderne',
    image: 'https://images.pexels.com/photos/20019462/pexels-photo-20019462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Leaf,
    features: ['Conduite 100 % électrique', 'Habitacle silencieux', 'Confort moderne et connecté', 'Idéale pour les trajets urbains'],
    seats: '5 places',
  },
  {
    name: 'Mercedes S W222',
    tag: 'Grande berline · Signature',
    image: 'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Gauge,
    features: ['Mercedes S W222', 'Ligne élégante et confort exceptionnel', 'Espace arrière premium', 'Transferts aéroport et cérémonie'],
    seats: '4 places',
  },
];

export function Fleet({ onOpenBooking }: FleetProps) {
  return (
    <section id="flotte" className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-400">Notre flotte</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Des véhicules pour chaque trajet</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-neutral-400">Au départ ou à l’arrivée de Fontainebleau, voyagez dans le véhicule adapté à vos besoins.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.map((vehicle) => {
            const Icon = vehicle.icon;
            return (
              <article key={vehicle.name} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 transition-all hover:-translate-y-1 hover:border-yellow-400/40">
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-neutral-950"><Icon size={22} /></div>
                    <div>
                      <h3 className="text-xl font-black text-white">{vehicle.name}</h3>
                      <p className="text-xs font-medium text-yellow-400">{vehicle.tag}</p>
                    </div>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{vehicle.seats}</span>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-neutral-300"><Check size={18} className="mt-0.5 shrink-0 text-yellow-400" />{feature}</li>
                    ))}
                  </ul>
                  <button onClick={onOpenBooking} className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-neutral-950 transition-all hover:bg-yellow-300">Réserver ce véhicule</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
