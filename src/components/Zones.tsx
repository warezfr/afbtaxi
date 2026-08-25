import { MapPin } from 'lucide-react';
import { ZONES } from '@/lib/constants';

export function Zones() {
  return (
    <section id="zones" className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-400">
            Couverture
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            Zones Desservies
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-neutral-400">
            Nous vous accompagnons partout en Île-de-France depuis Fontainebleau
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {ZONES.map((zone) => (
            <div
              key={zone}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 backdrop-blur-sm transition-all hover:border-yellow-400 hover:bg-yellow-400/10"
            >
              <MapPin size={16} className="text-yellow-400" />
              <span className="font-medium text-neutral-200">{zone}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
