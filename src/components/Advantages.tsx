import {
  Award,
  CalendarDays,
  Clock,
  Handshake,
  MapPin,
  Snowflake,
  type LucideIcon,
} from 'lucide-react';
import { ADVANTAGES } from '@/lib/constants';

const ICONS: Record<string, LucideIcon> = {
  Clock,
  MapPin,
  Handshake,
  Snowflake,
  CalendarDays,
  Award,
};

export function Advantages() {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-400">Pourquoi nous faire confiance</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            La différence AFB Taxis
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-neutral-400">
            Plus de 20 ans d'expérience au service de votre mobilité
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((adv) => {
            const Icon = ICONS[adv.icon] ?? Clock;
            return (
              <div
                key={adv.title}
                className="group flex flex-col items-start gap-4 bg-ink p-7 transition-colors hover:bg-neutral-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-neutral-950 transition-transform group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {adv.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
