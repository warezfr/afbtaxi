import { Check, Crown, Gauge, Leaf, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface FleetProps {
  onOpenBooking: (context?: string) => void;
}

const VEHICLES = [
  {
    name: 'Mercedes Classe E',
    tagKey: 'fleet.tag.sedan' as const,
    image: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Crown,
    featureKeys: ['fleet.classeE.feat1' as const, 'fleet.classeE.feat2' as const, 'fleet.classeE.feat3' as const],
    seatCount: 4,
  },
  {
    name: 'Mercedes Classe S',
    tagKey: 'fleet.tag.vip' as const,
    image: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Crown,
    featureKeys: ['fleet.classeS.feat1' as const, 'fleet.classeS.feat2' as const, 'fleet.classeS.feat3' as const],
    seatCount: 4,
  },
  {
    name: 'Mercedes Classe V',
    tagKey: 'fleet.tag.van' as const,
    image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Users,
    featureKeys: ['fleet.classeV.feat1' as const, 'fleet.classeV.feat2' as const, 'fleet.classeV.feat3' as const],
    seatCount: 7,
  },
  {
    name: 'Tesla Y',
    tagKey: 'fleet.tag.electric' as const,
    image: 'https://images.pexels.com/photos/20019462/pexels-photo-20019462.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Leaf,
    featureKeys: ['fleet.teslaY.feat1' as const, 'fleet.teslaY.feat2' as const, 'fleet.teslaY.feat3' as const],
    seatCount: 5,
  },
  {
    name: 'Mercedes S W222',
    tagKey: 'fleet.tag.signature' as const,
    image: 'https://images.pexels.com/photos/18369291/pexels-photo-18369291.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Gauge,
    featureKeys: ['fleet.w222.feat1' as const, 'fleet.w222.feat2' as const, 'fleet.w222.feat3' as const],
    seatCount: 4,
  },
];

function VehicleCard({ vehicle, t, onOpenBooking }: { vehicle: typeof VEHICLES[number]; t: (k: any) => string; onOpenBooking: (ctx?: string) => void }) {
  const Icon = vehicle.icon;
  return (
    <article
      data-testid={`fleet-card-${vehicle.name.replace(/\s+/g, '-').toLowerCase()}`}
      className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_10px_30px_-18px_rgba(17,24,39,0.15)]"
    >
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <span className="glass-light absolute right-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-bold text-gray-900">
          {vehicle.seatCount} {t('fleet.seats')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-gray-900">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-gray-900">{vehicle.name}</h3>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-600">{t(vehicle.tagKey)}</p>
          </div>
        </div>

        <ul className="mt-5 flex-1 space-y-2.5">
          {vehicle.featureKeys.map((key) => (
            <li key={key} className="flex items-center gap-2.5 text-sm text-gray-500">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100">
                <Check size={12} className="text-gold-700" />
              </span>
              {t(key)}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onOpenBooking(vehicle.name)}
          className="mt-6 min-h-[48px] w-full rounded-full border-2 border-gray-900 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition-[background-color,color] duration-300 hover:bg-gray-900 hover:text-gold-400"
        >
          {t('fleet.book')}
        </button>
      </div>
    </article>
  );
}

export function Fleet({ onOpenBooking }: FleetProps) {
  const { t } = useI18n();

  return (
    <section id="flotte" className="relative overflow-hidden bg-gray-50 py-16 lg:py-28">
      <div className="dot-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 text-center lg:mb-16">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600 sm:text-sm">
            <span className="h-px w-8 bg-gold-400" />
            {t('fleet.label')}
            <span className="h-px w-8 bg-gold-400" />
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {t('fleet.title1')}<span className="yellow-marker px-1">{t('fleet.title2')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 sm:text-lg">
            {t('fleet.subtitle')}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.slice(0, 3).map((v) => (
            <VehicleCard key={v.name} vehicle={v} t={t} onOpenBooking={onOpenBooking} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+0.625rem)]">
          {VEHICLES.slice(3).map((v) => (
            <VehicleCard key={v.name} vehicle={v} t={t} onOpenBooking={onOpenBooking} />
          ))}
        </div>
      </div>
    </section>
  );
}
