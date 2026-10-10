import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { animate } from 'animejs';
import { Phone, EnvelopeSimple, MapPin, ArrowRight } from '@phosphor-icons/react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { fadeUp, stagger, viewportSoon, useMotionOk } from './motion';
import { Magnetic } from './ui/Magnetic';

/** The logo mark drawing itself with anime.js when the section enters. */
function DrawnMark() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionOk = useMotionOk();
  useEffect(() => {
    if (!inView || !motionOk || !ref.current) return;
    const path = ref.current.querySelector<SVGPathElement>('path');
    const rects = ref.current.querySelectorAll('rect');
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    const a1 = animate(path, { strokeDashoffset: [len, 0], duration: 1600, ease: 'inOutQuart' });
    const a2 = animate(rects, { opacity: [0, 1], scale: [0.4, 1], delay: (_: unknown, i = 0) => 1200 + i * 60, duration: 500, ease: 'outBack' });
    return () => { a1.cancel(); a2.cancel(); };
  }, [inView, motionOk]);

  return (
    <svg ref={ref} viewBox="0 0 64 64" className="h-40 w-40 text-white lg:h-56 lg:w-56" aria-hidden="true">
      <path d="M32 6 L60 58 H47 L32 28 L17 58 H4 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {[[24, 40], [32, 40], [26, 44], [34, 44]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="4" height="4" fill="#E3B53E" style={{ transformOrigin: `${x + 2}px ${y + 2}px` }} />
      ))}
      {[[28, 40], [36, 40], [22, 44], [30, 44], [38, 44]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="4" height="4" fill="currentColor" style={{ transformOrigin: `${x + 2}px ${y + 2}px` }} />
      ))}
    </svg>
  );
}

export function ContactSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { t } = useI18n();

  return (
    <section id="contact" className="bg-ink py-24 text-white lg:py-36">
      <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportSoon} className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <motion.p variants={fadeUp} className="text-sm font-semibold text-gold-400">{t('contact.kicker')}</motion.p>
          <motion.a
            variants={fadeUp}
            href={`tel:${COMPANY.phoneRaw}`}
            data-testid="contact-big-phone"
            className="mt-4 block font-display text-[clamp(2.4rem,7vw,7rem)] font-semibold leading-[0.92] tracking-tightest transition-colors hover:text-gold-400"
          >
            {COMPANY.phone}
          </motion.a>
          <motion.p variants={fadeUp} className="mt-6 max-w-[44ch] text-lg text-white/65">{t('contact.hint')}</motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Magnetic>
              <button
                data-testid="contact-book-button"
                onClick={onOpenBooking}
                className="group inline-flex min-h-[56px] items-center gap-3 rounded-full bg-gold-400 pl-7 pr-2 text-base font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
              >
                {t('common.book')}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold-400 transition-transform group-hover:rotate-[-35deg]"><ArrowRight size={18} weight="bold" /></span>
              </button>
            </Magnetic>
          </motion.div>
        </div>
        <div className="hidden items-start justify-end lg:col-span-4 lg:flex">
          <DrawnMark />
        </div>

        <motion.ul variants={fadeUp} className="grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 lg:col-span-12 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <li>
            <a href={`tel:${COMPANY.phoneRaw}`} data-testid="contact-phone-card" className="group flex items-start gap-4 py-6 lg:pr-8">
              <Phone size={20} className="mt-0.5 text-gold-400" />
              <span><span className="block text-xs font-semibold text-white/45">{t('contact.phone')}</span><span className="mt-1 block font-mono font-semibold group-hover:text-gold-400">{COMPANY.phone}</span></span>
            </a>
          </li>
          <li>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))} data-testid="contact-email-card" className="group flex w-full items-start gap-4 py-6 text-left lg:px-8">
              <EnvelopeSimple size={20} className="mt-0.5 text-gold-400" />
              <span className="min-w-0"><span className="block text-xs font-semibold text-white/45">{t('contact.email')}</span><span className="mt-1 block truncate font-semibold group-hover:text-gold-400">{COMPANY.email}</span></span>
            </button>
          </li>
          <li>
            <a href={COMPANY.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 py-6 lg:pl-8">
              <MapPin size={20} className="mt-0.5 text-gold-400" />
              <span><span className="block text-xs font-semibold text-white/45">{t('contact.address')}</span><span className="mt-1 block font-semibold group-hover:text-gold-400">{COMPANY.address}</span></span>
            </a>
          </li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
