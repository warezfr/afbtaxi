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
    image: 'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Gauge,
    featureKeys: ['fleet.w222.feat1' as const, 'fleet.w222.feat2' as const, 'fleet.w222.feat3' as const],
    seatCount: 4,
  },
];

function VehicleCard({ vehicle, t, onOpenBooking }: { vehicle: typeof VEHICLES[number]; t: (k: any) => string; onOpenBooking: (ctx?: string) => void }) {
  const Icon = vehicle.icon;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/30 hover:shadow-[0_20px_60px_rgba(255,208,59,0.08)]">
      <div className="relative h-52 overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-bold text-gold-400 backdrop-blur-sm">
          {vehicle.seatCount} {t('fleet.seats')}
        </span>
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-ink"><Icon size={18} /></div>
          <div>
            <h3 className="text-base font-bold text-white">{vehicle.name}</h3>
            <p className="text-[11px] font-semibold text-gold-400">{t(vehicle.tagKey)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <ul className="flex-1 space-y-2.5">
          {vehicle.featureKeys.map((key) => (
            <li key={key} className="flex items-center gap-2.5 text-sm text-neutral-400">
              <Check size={14} className="shrink-0 text-gold-400" />{t(key)}
            </li>
          ))}
        </ul>
        <button
          onClick={() => onOpenBooking(vehicle.name)}
          className="mt-5 w-full rounded-2xl border border-gold-400/20 bg-gold-400/5 px-5 py-3 text-sm font-bold text-gold-400 transition-all hover:border-gold-400/50 hover:bg-gold-400/10"
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
    <section id="flotte" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">{t('fleet.label')}</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t('fleet.title1')}<span className="gold-text">{t('fleet.title2')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            {t('fleet.subtitle')}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.slice(0, 3).map((v) => (
            <VehicleCard key={v.name} vehicle={v} t={t} onOpenBooking={onOpenBooking} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+0.625rem)]">
          {VEHICLES.slice(3).map((v) => (
            <VehicleCard key={v.name} vehicle={v} t={t} onOpenBooking={onOpenBooking} />
          ))}
        </div>
      </div>
    </section>
  );
}
