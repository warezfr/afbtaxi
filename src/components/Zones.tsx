import { MapPin } from 'lucide-react';
import { ZONES } from '@/lib/constants';

export function Zones() {
  return (
    <section id="zones" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">Couverture</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Zones <span className="gold-text">desservies</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-neutral-400">
            Départ ou arrivée Fontainebleau, nous vous transportons partout en Île-de-France.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {ZONES.map((zone) => (
            <div
              key={zone}
              className="group flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.02] px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/30 hover:bg-gold-400/5"
            >
              <MapPin size={15} className="text-gold-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium text-neutral-300 transition-colors group-hover:text-white">{zone}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
