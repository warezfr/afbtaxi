import { useState, useEffect } from 'react';
import { PhoneCall, ArrowRight, MapPin, Star, ShieldCheck, Clock } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { PriceEstimator } from './PriceEstimator';

const CITIES = [
  'Fontainebleau', 'Avon', 'Paris', 'Melun', 'Nemours', 'Orly', 'Roissy CDG',
  'Dammarie-les-Lys', 'Barbizon', 'Moret-sur-Loing', 'Samois-sur-Seine',
  'Thomery', 'Bois-le-Roi', 'Milly-la-Forêt', 'Chessy', 'Disneyland Paris',
  'Gare de Lyon', 'La Défense', 'Versailles', 'Évry', 'Sénart',
];

const SLIDES = [
  { name: 'Mercedes Classe S', image: 'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Mercedes S W222', image: 'https://images.pexels.com/photos/18369291/pexels-photo-18369291.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Mercedes Classe V', image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1600' },
];

interface Props {
  onOpenBooking: (context?: string) => void;
}

export function Hero({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % SLIDES.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const STATS = [
    { value: '20+', label: t('hero.stat.years') },
    { value: '5', label: t('hero.stat.vehicles') },
    { value: '24/7', label: t('hero.stat.availability') },
    { value: '4.9', label: t('hero.stat.rating') },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* ===== Dark hero ===== */}
      <div className="relative overflow-hidden bg-[#0a0a0a] pb-24 pt-24 sm:pb-28 lg:pb-36 lg:pt-28">
        {/* Decorative */}
        <div className="absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-gold-400/10 blur-[130px]" />
        <div className="absolute -left-32 bottom-20 h-[320px] w-[320px] rounded-full bg-gold-400/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 pt-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:pt-10">
            {/* Left : copy */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse-gold" />
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400 sm:text-sm">{t('hero.badge')}</span>
              </div>

              <h1 className="mt-6 font-display text-[2.9rem] font-black leading-[1.0] tracking-tight text-white sm:text-6xl lg:text-[4.4rem] xl:text-[4.8rem]">
                {t('hero.title1')}{' '}
                <br />
                <span className="text-gold-400">{t('hero.title2')}</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  data-testid="hero-book-button"
                  onClick={() => onOpenBooking()}
                  className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gold-400 px-8 py-4 font-bold text-gray-900 shadow-[0_12px_35px_-8px_rgba(250,204,21,0.5)] transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-gold-300"
                >
                  {t('hero.cta')}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  data-testid="hero-call-button"
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-white/20"
                >
                  <PhoneCall size={18} className="text-gold-400" />
                  {COMPANY.phone}
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="flex text-gold-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </span>
                  <span className="font-bold text-white">4.9</span> Google
                </span>
                <span className="hidden h-4 w-px bg-white/15 sm:block" />
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-gold-400" /> CPAM 77
                </span>
                <span className="hidden h-4 w-px bg-white/15 sm:block" />
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-gold-400" /> 24/7
                </span>
              </div>
            </div>

            {/* Right : fleet slideshow blended into dark bg */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative h-64 sm:h-80 lg:h-[460px]">
                {SLIDES.map((slide, i) => (
                  <div
                    key={slide.name}
                    className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.name}
                      className="h-full w-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'auto'}
                    />
                    {/* Blend edges into black */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
                  </div>
                ))}

                {/* Floating pill : availability */}
                <div className="absolute left-0 top-4 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-gold" />
                  <span className="text-xs font-bold text-white sm:text-sm">24/7 · {t('hero.stat.availability')}</span>
                </div>

                {/* Vehicle name + dots */}
                <div className="absolute bottom-2 left-0 flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">{SLIDES[current].name}</span>
                  <div className="flex gap-2">
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => setCurrent(i)}
                        className="flex h-8 items-center"
                      >
                        <span className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${i === current ? 'w-9 bg-gold-400' : 'w-4 bg-white/25'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave transition to white */}
        <div className="absolute -bottom-px left-0 right-0 z-10">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-[50px] w-full sm:h-[70px] lg:h-[95px]">
            <path d="M0,70 C240,115 480,110 720,72 C960,34 1200,26 1440,74 L1440,110 L0,110 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ===== Light zone : estimator + stats + location ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-2">
          <PriceEstimator onOpenBooking={onOpenBooking} />
        </div>

        <div className="mt-8 grid grid-cols-2 rounded-3xl border border-gray-200 bg-white shadow-[0_20px_50px_-30px_rgba(17,24,39,0.25)] sm:grid-cols-4 sm:divide-x sm:divide-gray-200">
          {STATS.map((stat, i) => (
            <div key={stat.value + i} className={`px-6 py-6 text-center sm:py-7 ${i > 1 ? 'border-t border-gray-200 sm:border-t-0' : ''} ${i % 2 === 1 ? 'border-l border-gray-200 sm:border-l-0' : ''}`}>
              <p className="font-display text-3xl font-black text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 pb-10 text-xs font-medium text-gray-400 sm:text-sm">
          <MapPin size={14} className="shrink-0 text-gold-600" />
          <span className="text-center">{t('hero.locations')}</span>
        </div>
      </div>

      {/* Cities marquee */}
      <div className="relative border-y border-gray-100 bg-gray-50">
        <div className="overflow-hidden py-4">
          <div className="animate-marquee flex w-max items-center gap-8">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i} className="flex shrink-0 items-center gap-3">
                <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{city}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
