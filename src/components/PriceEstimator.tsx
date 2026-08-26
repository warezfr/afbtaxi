import { useState } from 'react';
import { MapPin, Navigation, ArrowRight, ArrowRightLeft, Sun, Moon, Car, Bus } from 'lucide-react';
import { TARIFS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';


const PLACES = [
  'Fontainebleau',
  'Orly',
  'CDG',
  'Paris rive droite',
  'Paris rive gauche',
  'Gare de Chessy / Marne-la-Vallée',
  'Gare d’Avon',
  'Avon',
  'Melun',
  'Nemours',
  'Barbizon',
  'Milly-la-Forêt',
  'Autre adresse...'
];


interface Props {
  onOpenBooking: (context?: string) => void;
}

export function PriceEstimator({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const [depart, setDepart] = useState<string>('Fontainebleau');
  const [arrivee, setArrivee] = useState<string>('');
  const [vehicle, setVehicle] = useState<'car' | 'van'>('car');
  const [time, setTime] = useState<'day' | 'night'>('day');

  // Find exact match in TARIFS
  const tarif = TARIFS.find(
    tf => tf.route === `${depart} ↔ ${arrivee}` || tf.route === `${arrivee} ↔ ${depart}`
  );

  const price = tarif
    ? vehicle === 'car'
      ? time === 'day' ? tarif.carDay : tarif.carNight
      : time === 'day' ? tarif.vanDay : tarif.vanNight
    : null;

  const handleSwap = () => {
    setDepart(arrivee);
    setArrivee(depart);
  };

  const handleBook = () => {
    if (!depart || !arrivee) {
      onOpenBooking();
      return;
    }
    const priceContext = price ? `${price}` : 'Sur Devis';
    const ctx = `${depart} ➝ ${arrivee} · ${vehicle === 'car' ? t('tarifs.car') : t('tarifs.van')} · ${time === 'day' ? t('tarifs.day') : t('tarifs.night')} · ${priceContext}`;
    onOpenBooking(ctx);
  };

  const toggleCls = (active: boolean) =>
    `flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
      active ? 'bg-gray-900 text-gold-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <div data-testid="price-estimator" className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-[0_25px_60px_-30px_rgba(17,24,39,0.35)] dark:shadow-none">
      <div className="taxi-checker h-2.5" />
      <div className="grid gap-5 p-6 sm:p-7 lg:grid-cols-[1fr_1fr_auto] lg:items-end lg:gap-6">
        {/* From / To */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {/* Dynamic From/To fields */}
          <div className="relative">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {t('estimator.from')}
              </label>
              <button 
                onClick={handleSwap}
                className="flex items-center gap-1.5 text-xs font-bold text-gold-600 hover:text-gold-500 transition-colors sm:hidden"
                title="Inverser le sens"
              >
                <ArrowRightLeft size={14} /> Inverser
              </button>
            </div>
            <div className="relative">
              <Navigation size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-600" />
              <select
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                className="min-h-[48px] w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-3 pl-11 pr-8 text-sm font-bold text-gray-900 dark:text-white transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              >
                <option value="" disabled>Lieu de départ</option>
                {PLACES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {t('estimator.to')}
              </label>
              <button 
                onClick={handleSwap}
                className="hidden sm:flex items-center justify-center text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors absolute -left-2 lg:-left-3 bottom-2 -translate-x-1/2 z-10 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 shadow-md w-8 h-8"
                title="Inverser le sens"
              >
                <ArrowRightLeft size={14} />
              </button>
            </div>
            <div className="relative">
              <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-600" />
              <select
                value={arrivee}
                onChange={(e) => setArrivee(e.target.value)}
                className="min-h-[48px] w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-3 pl-11 pr-8 text-sm font-bold text-gray-900 dark:text-white transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              >
                <option value="" disabled>Lieu d'arrivée</option>
                {PLACES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-2" data-testid="estimator-vehicle-toggle">
            <button onClick={() => setVehicle('car')} className={toggleCls(vehicle === 'car')}>
              <Car size={16} /> {t('tarifs.car')}
            </button>
            <button onClick={() => setVehicle('van')} className={toggleCls(vehicle === 'van')}>
              <Bus size={16} /> {t('tarifs.van')}
            </button>
          </div>
          <div className="flex gap-2" data-testid="estimator-time-toggle">
            <button onClick={() => setTime('day')} className={toggleCls(time === 'day')}>
              <Sun size={16} /> {t('tarifs.day')}
            </button>
            <button onClick={() => setTime('night')} className={toggleCls(time === 'night')}>
              <Moon size={16} /> {t('tarifs.night')}
            </button>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-stretch gap-3 border-t border-gray-100 dark:border-gray-800 pt-5 lg:min-w-[220px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="flex items-baseline justify-between lg:flex-col lg:items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{t('estimator.title')}</span>
            <span data-testid="estimator-price" className="font-display text-4xl font-black text-gray-900 dark:text-white">
              {price ? price : (!depart || !arrivee ? '— €' : 'Sur Devis')}
            </span>
          </div>
          <button
            data-testid="estimator-book-button"
            onClick={handleBook}
            disabled={!depart || !arrivee}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-gray-900 transition-[transform,background-color] duration-300 hover:scale-[1.02] hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {price ? t('estimator.book') : 'Demander un devis'}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-[11px] leading-snug text-gray-400 dark:text-gray-500">{t('estimator.note')}</p>
        </div>
      </div>
    </div>
  );
}
