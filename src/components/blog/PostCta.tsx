import { motion, useReducedMotion } from 'motion/react';
import { Phone } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';

interface PostCtaProps {
  onBook: () => void;
  id?: string;
  title?: string;
}

export function PostCta({ onBook, id, title = 'Un chauffeur pour ce trajet ?' }: PostCtaProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="scroll-mt-28 rounded-[20px] border border-white/10 bg-zinc-950 p-8 md:p-12"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl tracking-tight text-zinc-50 md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-[48ch] leading-relaxed text-zinc-400">
            Mercedes Classe S, E et V, Tesla Y. Réponse rapide, prix annoncé avant le départ.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onBook}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gold-400 px-8 font-semibold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Réserver
          </button>
          <a
            href={`tel:${COMPANY.phoneIntl}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/10 px-6 font-semibold tabular-nums text-zinc-50 transition-colors hover:border-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <Phone size={18} weight="regular" />
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
