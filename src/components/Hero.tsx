import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  PhoneCall,
  Shield,
  Sparkles,
  ThumbsUp,
  Banknote,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

const SLIDES = [
  {
    image:
      'https://images.pexels.com/photos/18369291/pexels-photo-18369291.jpeg?auto=compress&cs=tinysrgb&w=2000',
    name: 'Mercedes Classe S',
  },
  {
    image:
      'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=2000',
    name: 'Mercedes Classe V',
  },
  {
    image:
      'https://images.pexels.com/photos/15039402/pexels-photo-15039402.jpeg?auto=compress&cs=tinysrgb&w=2000',
    name: 'Taxi AFB',
  },
];

interface Props {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const BADGES = [
    { icon: Clock, label: t('hero.badge.punctuality') },
    { icon: Sparkles, label: t('hero.badge.vehicles') },
    { icon: Shield, label: t('hero.badge.safe') },
    { icon: ThumbsUp, label: t('hero.badge.247') },
    { icon: Banknote, label: t('hero.badge.price') },
  ];

  return (
    <section id="home" className="relative flex min-h-[800px] flex-col overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.name}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.name} className="h-full w-full object-cover object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rotate-12 rounded-[60px] bg-yellow-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-32 pt-28 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-lg border-2 border-yellow-400 bg-yellow-400/10 px-5 py-2.5 backdrop-blur-sm">
            <Phone size={18} className="text-yellow-400" />
            <span className="text-sm font-black uppercase tracking-wider text-white">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase leading-[1] tracking-[-.03em] text-white sm:text-6xl lg:text-[5.5rem]">
            <span className="text-yellow-400">{t('hero.title1')}</span> {t('hero.title2')}
            <br />
            <span className="text-yellow-400">{t('hero.title3')}</span> {t('hero.title4')}
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-neutral-300 sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onOpenBooking}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-4 font-extrabold text-neutral-950 shadow-[0_12px_35px_rgba(255,196,0,.25)] transition-all hover:-translate-y-1 hover:bg-yellow-300"
            >
              {t('hero.cta')}
              <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-sm transition-all hover:border-yellow-400 hover:text-yellow-300"
            >
              <PhoneCall size={18} /> {COMPANY.phone}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-neutral-400">
            <MapPin size={16} className="text-yellow-400" /> Fontainebleau · Avon · Seine-et-Marne · Paris
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              {SLIDES[current].name}
            </span>
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Voir ${SLIDES[i].name}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? 'w-8 bg-yellow-400' : 'w-3 bg-white/25 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom badges strip */}
      <div className="relative z-10 border-t border-white/10 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-between">
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-neutral-950">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div className="relative z-10 bg-yellow-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-5 py-3 sm:justify-between lg:px-8">
          <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2 text-sm font-bold text-neutral-950">
            <Phone size={16} /> {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm font-bold text-neutral-950">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-black text-yellow-400">@</span>
            {COMPANY.email}
          </a>
          <span className="flex items-center gap-2 text-sm font-bold text-neutral-950">
            <MapPin size={16} /> Fontainebleau & Île-de-France
          </span>
        </div>
      </div>
    </section>
  );
}
