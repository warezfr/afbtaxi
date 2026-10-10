import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, NavigationArrow, ArrowRight, ArrowsLeftRight, Sun, Moon, Car, Van } from '@phosphor-icons/react';
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
  'Autre adresse...',
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

  const tarif = TARIFS.find(
    (tf) => tf.route === `${depart} ↔ ${arrivee}` || tf.route === `${arrivee} ↔ ${depart}`
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

  const selectCls =
    'min-h-[48px] w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-8 text-sm font-semibold text-zinc-900 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50';
  const labelCls = 'mb-1.5 block text-xs font-semibold text-zinc-600 dark:text-zinc-400';

  const Toggle = ({ active, onClick, children, label }: { active: boolean; onClick: () => void; children: React.ReactNode; label: string }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`relative flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
        active ? 'text-zinc-950 dark:text-zinc-950' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
      }`}
    >
      {active && (
        <motion.span layoutId={`toggle-${label.split(' ')[0]}`} className="absolute inset-0 rounded-full bg-gold-400" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );

  return (
    <div
      data-testid="price-estimator"
      className="relative overflow-hidden rounded-card border border-zinc-200 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-none"
    >
      <div className="taxi-checker h-2" />
      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1fr_1fr_auto] lg:items-end lg:gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <div className="relative">
            <div className="flex items-center justify-between">
              <label htmlFor="estimator-from" className={labelCls}>{t('estimator.from')}</label>
              <button type="button" onClick={handleSwap} className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-500 sm:hidden" aria-label="Inverser le sens">
                <ArrowsLeftRight size={14} /> Inverser
              </button>
            </div>
            <div className="relative">
              <NavigationArrow size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-600" />
              <select id="estimator-from" value={depart} onChange={(e) => setDepart(e.target.value)} className={selectCls}>
                <option value="" disabled>Lieu de départ</option>
                {PLACES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="estimator-to" className={labelCls}>{t('estimator.to')}</label>
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Inverser le sens"
              className="absolute -left-2 bottom-2 z-10 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:text-gold-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 sm:flex lg:-left-3"
            >
              <ArrowsLeftRight size={14} />
            </button>
            <div className="relative">
              <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold-600" />
              <select id="estimator-to" value={arrivee} onChange={(e) => setArrivee(e.target.value)} className={selectCls}>
                <option value="" disabled>Lieu d'arrivée</option>
                {PLACES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="flex rounded-full bg-zinc-100 p-1 dark:bg-zinc-950" data-testid="estimator-vehicle-toggle">
            <Toggle active={vehicle === 'car'} onClick={() => setVehicle('car')} label="vehicle car"><Car size={16} /> {t('tarifs.car')}</Toggle>
            <Toggle active={vehicle === 'van'} onClick={() => setVehicle('van')} label="vehicle van"><Van size={16} /> {t('tarifs.van')}</Toggle>
          </div>
          <div className="flex rounded-full bg-zinc-100 p-1 dark:bg-zinc-950" data-testid="estimator-time-toggle">
            <Toggle active={time === 'day'} onClick={() => setTime('day')} label="time day"><Sun size={16} /> {t('tarifs.day')}</Toggle>
            <Toggle active={time === 'night'} onClick={() => setTime('night')} label="time night"><Moon size={16} /> {t('tarifs.night')}</Toggle>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-5 dark:border-white/10 lg:min-w-[230px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="flex items-baseline justify-between lg:flex-col lg:items-start">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{t('estimator.title')}</span>
            <span data-testid="estimator-price" className="font-display text-4xl font-extrabold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50">
              {price ? price : (!depart || !arrivee ? '– €' : t('estimator.quote'))}
            </span>
          </div>
          <motion.button
            data-testid="estimator-book-button"
            onClick={handleBook}
            disabled={!depart || !arrivee}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-bold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gold-400 dark:text-zinc-950 dark:hover:bg-gold-300"
          >
            {price ? t('estimator.book') : 'Demander un devis'}
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </motion.button>
          <p className="text-[11px] leading-snug text-zinc-500 dark:text-zinc-500">{t('estimator.note')}</p>
        </div>
      </div>
    </div>
  );
}
