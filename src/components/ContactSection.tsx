import { motion } from 'motion/react';
import { Phone, EnvelopeSimple, MapPin, ArrowRight } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon } from './motion';

export function ContactSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { t } = useI18n();

  return (
    <section id="contact" className="bg-zinc-950 py-20 text-white lg:py-28">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportSoon}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <motion.p variants={fadeUp} className="text-sm font-semibold text-gold-400">{t('contact.title')}</motion.p>
        <motion.a
          variants={fadeUp}
          href={`tel:${COMPANY.phoneRaw}`}
          data-testid="contact-big-phone"
          className="mt-3 block font-display text-5xl font-extrabold tabular-nums tracking-tight text-white transition-colors hover:text-gold-400 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {COMPANY.phone}
        </motion.a>
        <motion.p variants={fadeUp} className="mt-4 max-w-[48ch] text-base text-zinc-400 sm:text-lg">{t('contact.hint')}</motion.p>

        <motion.div variants={fadeUp} className="mt-8">
          <motion.button
            data-testid="contact-book-button"
            onClick={onOpenBooking}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-gold-400 px-8 text-[15px] font-bold text-zinc-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            {t('common.book')}
            <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        <motion.ul variants={fadeUp} className="mt-14 grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <li>
            <a href={`tel:${COMPANY.phoneRaw}`} data-testid="contact-phone-card" className="group flex items-start gap-4 py-6 md:pr-8">
              <Phone size={20} className="mt-0.5 text-gold-400" />
              <span>
                <span className="block text-xs font-semibold text-zinc-500">{t('contact.phone')}</span>
                <span className="mt-1 block font-semibold tabular-nums text-white group-hover:text-gold-400">{COMPANY.phone}</span>
              </span>
            </a>
          </li>
          <li>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              data-testid="contact-email-card"
              className="group flex w-full items-start gap-4 py-6 text-left md:px-8"
            >
              <EnvelopeSimple size={20} className="mt-0.5 text-gold-400" />
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-zinc-500">{t('contact.email')}</span>
                <span className="mt-1 block truncate font-semibold text-white group-hover:text-gold-400">{COMPANY.email}</span>
              </span>
            </button>
          </li>
          <li>
            <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 py-6 md:pl-8">
              <MapPin size={20} className="mt-0.5 text-gold-400" />
              <span>
                <span className="block text-xs font-semibold text-zinc-500">{t('contact.address')}</span>
                <span className="mt-1 block font-semibold text-white group-hover:text-gold-400">{COMPANY.address}</span>
              </span>
            </a>
          </li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
