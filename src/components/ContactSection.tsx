import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

interface Props {
  onOpenBooking: () => void;
}

export function ContactSection({ onOpenBooking }: Props) {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-400/5 blur-[100px]" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="glass overflow-hidden rounded-[32px] p-8 md:p-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-gold-400">Contact</p>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Besoin d'un <span className="gold-text">taxi</span> ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-400">
                Réservez en ligne ou contactez-nous directement. Devis gratuit pour tous vos trajets.
              </p>

              <button
                onClick={onOpenBooking}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold-400 px-8 py-4 font-bold text-ink transition-all hover:bg-gold-300 hover:shadow-[0_20px_50px_rgba(255,208,59,0.3)]"
              >
                Réserver maintenant
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-gold-400/20 hover:bg-gold-400/5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <Phone size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Téléphone</p>
                  <p className="text-base font-bold text-white">{COMPANY.phone}</p>
                </div>
              </a>

              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-gold-400/20 hover:bg-gold-400/5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <Mail size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Email</p>
                  <p className="text-base font-bold text-white">{COMPANY.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10">
                  <MapPin size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Adresse</p>
                  <p className="text-sm font-semibold text-white">{COMPANY.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
