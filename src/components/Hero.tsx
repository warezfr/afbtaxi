import { useState, useEffect } from 'react';
import { PhoneCall, ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

const CITIES = [
  'Fontainebleau', 'Avon', 'Paris', 'Melun', 'Nemours', 'Orly', 'Roissy CDG',
  'Dammarie-les-Lys', 'Barbizon', 'Moret-sur-Loing', 'Samois-sur-Seine',
  'Thomery', 'Vulaines-sur-Seine', 'Bois-le-Roi', 'Chailly-en-Bière',
  'Milly-la-Forêt', 'La Rochette', 'Vaux-le-Pénil', 'Le Mée-sur-Seine',
  'Chessy', 'Disneyland Paris', 'Gare de Lyon', 'La Défense',
  'Versailles', 'Évry', 'Corbeil-Essonnes', 'Sénart',
];

const SLIDES = [
  { name: 'Mercedes Classe S', image: 'https://images.pexels.com/photos/18370955/pexels-photo-18370955.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { name: 'Service VIP', image: 'https://images.pexels.com/photos/15774577/pexels-photo-15774577.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { name: 'Mercedes Classe V', image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1920' },
];

interface Props {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const STATS = [
    { value: '20+', label: t('hero.stat.years') },
    { value: '5', label: t('hero.stat.vehicles') },
    { value: '24/7', label: t('hero.stat.availability') },
    { value: '4.9', label: t('hero.stat.rating') },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-ink">
      {/* Background slides */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.name}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} alt={slide.name} className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/50" />
      </div>

      {/* Decorative */}
      <div className="absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-gold-400/5 blur-[120px]" />
      <div className="absolute -left-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gold-400/3 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-32 pt-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold-400/30 bg-gold-400/10 px-5 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-gold-400 animate-pulse-gold" />
            <span className="text-sm font-semibold text-gold-300">{t('hero.badge')}</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {t('hero.title1')}
            <br />
            <span className="gold-text">{t('hero.title2')}</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-300">
            {t('hero.subtitle')}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-400 px-8 py-4 font-bold text-ink transition-all hover:bg-gold-300 hover:shadow-[0_20px_50px_rgba(255,208,59,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-gold-400/50 hover:bg-white/5"
            >
              <PhoneCall size={18} className="text-gold-400" />
              {COMPANY.phone}
            </a>
          </div>

          {/* Location */}
          <div className="mt-8 flex items-center gap-2 text-sm text-neutral-400">
            <MapPin size={15} className="text-gold-400" />
            <span>{t('hero.locations')}</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.value} className="glass rounded-2xl px-5 py-4 text-center">
              <p className="text-2xl font-black text-gold-400">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-28 left-6 flex items-center gap-4 lg:bottom-28 lg:left-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{SLIDES[current].name}</span>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-700 ${i === current ? 'w-10 bg-gold-400' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-28 right-6 lg:bottom-28 lg:right-8">
          <div className="flex flex-col items-center gap-2 text-neutral-500">
            <span className="text-[10px] font-semibold uppercase tracking-widest">{t('hero.scroll')}</span>
            <ChevronDown size={16} className="animate-scroll-hint" />
          </div>
        </div>
      </div>

      {/* Cities marquee banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-ink/80 backdrop-blur-md">
        <div className="overflow-hidden py-4">
          <div className="animate-marquee flex w-max items-center gap-6">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i} className="flex shrink-0 items-center gap-2">
                <MapPin size={12} className="text-gold-400/70" />
                <span className="whitespace-nowrap text-sm font-medium text-neutral-400">{city}</span>
                <span className="ml-4 h-1 w-1 rounded-full bg-gold-400/30" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
