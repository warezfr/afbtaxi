import {
  ArrowUpRight,
  Car,
  HeartPulse,
  Plane,
  TrainFront,
} from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const SERVICE_SPOTLIGHTS = [
  { title: 'Dans la ville', subtitle: 'Courses locales', icon: Car, accent: 'yellow' },
  { title: 'Gares & aéroports', subtitle: 'Transferts ponctuels', icon: Plane, accent: 'light' },
  { title: 'Transport sanitaire', subtitle: 'Conventionné CPAM 77', icon: HeartPulse, accent: 'light' },
];

interface ServicesProps {
  onOpenBooking: () => void;
}

export function Services({ onOpenBooking }: ServicesProps) {
  return (
    <section id="services" className="bg-cream pb-20 pt-8 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-600">Nos solutions</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-950 sm:text-4xl">Un taxi pour chaque moment</h2>
          <p className="mt-3 text-base text-neutral-600">Simple à réserver, agréable à vivre, partout où vous devez aller.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {SERVICE_SPOTLIGHTS.map(({ title, subtitle, icon: Icon, accent }) => (
            <article key={title} className={`group relative min-h-[250px] overflow-hidden rounded-[28px] p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl ${accent === 'yellow' ? 'bg-yellow-400' : 'bg-white'}`}>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent === 'yellow' ? 'bg-neutral-950 text-yellow-400' : 'bg-neutral-100 text-neutral-950'}`}><Icon size={23} /></div>
                <div>
                  <p className={`mb-2 text-xs font-black uppercase tracking-[.18em] ${accent === 'yellow' ? 'text-neutral-800' : 'text-yellow-600'}`}>{subtitle}</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-950">{title}</h3>
                  <button onClick={onOpenBooking} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-950">Réserver <ArrowUpRight size={16} /></button>
                </div>
              </div>
              <div className={`absolute -bottom-16 -right-10 h-44 w-44 rounded-full ${accent === 'yellow' ? 'bg-yellow-300' : 'bg-yellow-50'} transition-transform group-hover:scale-125`} />
              <div className="absolute -bottom-1 right-7 text-neutral-950/10"><Car size={105} strokeWidth={1} /></div>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(3).map((service) => (
            <div key={service.title} className="rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-yellow-400">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-yellow-400"><TrainFront size={19} /></div>
              <h3 className="font-bold text-neutral-950">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
