import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowsLeftRight, Sun, Moon, Car, Van } from '@phosphor-icons/react';
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
  /** Glass panel variant used inside the hero. */
  compact?: boolean;
}

export function PriceEstimator({ onOpenBooking, compact = false }: Props) {
  const { t } = useI18n();
  const [depart, setDepart] = useState<string>('Fontainebleau');
  const [arrivee, setArrivee] = useState<string>('');
  const [vehicle, setVehicle] = useState<'car' | 'van'>('car');
  const [time, setTime] = useState<'day' | 'night'>('day');

  const tarif = TARIFS.find((tf) => tf.route === `${depart} ↔ ${arrivee}` || tf.route === `${arrivee} ↔ ${depart}`);
  const price = tarif
    ? vehicle === 'car'
      ? time === 'day' ? tarif.carDay : tarif.carNight
      : time === 'day' ? tarif.vanDay : tarif.vanNight
    : null;

  const handleSwap = () => { setDepart(arrivee); setArrivee(depart); };
  const handleBook = () => {
    if (!depart || !arrivee) { onOpenBooking(); return; }
    const priceContext = price ? `${price}` : 'Sur Devis';
    onOpenBooking(`${depart} ➝ ${arrivee} · ${vehicle === 'car' ? t('tarifs.car') : t('tarifs.van')} · ${time === 'day' ? t('tarifs.day') : t('tarifs.night')} · ${priceContext}`);
  };

  const selectCls =
    'min-h-[46px] w-full appearance-none rounded-xl border border-ink/10 bg-white/70 px-3.5 text-sm font-semibold text-ink transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white';
  const labelCls = 'mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55 dark:text-white/55';

  const Toggle = ({ active, onClick, children, label, group }: { active: boolean; onClick: () => void; children: ReactNode; label: string; group: string }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`relative flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${active ? 'text-ink' : 'text-ink/60 hover:text-ink dark:text-white/60 dark:hover:text-white'}`}
    >
      {active && <motion.span layoutId={`estimator-${group}`} transition={{ type: 'spring', stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-full bg-gold-400" />}
      <span className="relative flex items-center gap-1.5">{children}</span>
    </button>
  );

  return (
    <div data-testid="price-estimator" className={`relative overflow-hidden rounded-card ${compact ? 'glass text-ink dark:text-white' : 'border border-ink/10 bg-white text-ink dark:border-white/10 dark:bg-[#141416] dark:text-white'}`}>
      <div className="taxi-checker h-1.5" />
      <div className="p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label htmlFor="estimator-from" className={labelCls}>{t('estimator.from')}</label>
            <select id="estimator-from" value={depart} onChange={(e) => setDepart(e.target.value)} className={selectCls}>
              <option value="" disabled>Lieu de départ</option>
              {PLACES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button type="button" onClick={handleSwap} aria-label="Inverser le sens" className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-transform hover:rotate-180 hover:text-ink dark:border-white/10 dark:text-white/60 dark:hover:text-white sm:mb-0.5">
            <ArrowsLeftRight size={16} />
          </button>
          <div>
            <label htmlFor="estimator-to" className={labelCls}>{t('estimator.to')}</label>
            <select id="estimator-to" value={arrivee} onChange={(e) => setArrivee(e.target.value)} className={selectCls}>
              <option value="" disabled>Lieu d'arrivée</option>
              {PLACES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex rounded-full bg-ink/5 p-1 dark:bg-white/10" data-testid="estimator-vehicle-toggle">
            <Toggle group="vehicle" active={vehicle === 'car'} onClick={() => setVehicle('car')} label="Voiture"><Car size={15} /> {t('tarifs.car')}</Toggle>
            <Toggle group="vehicle" active={vehicle === 'van'} onClick={() => setVehicle('van')} label="Van"><Van size={15} /> {t('tarifs.van')}</Toggle>
          </div>
          <div className="flex rounded-full bg-ink/5 p-1 dark:bg-white/10" data-testid="estimator-time-toggle">
            <Toggle group="time" active={time === 'day'} onClick={() => setTime('day')} label="Jour"><Sun size={15} /> {t('tarifs.day')}</Toggle>
            <Toggle group="time" active={time === 'night'} onClick={() => setTime('night')} label="Nuit"><Moon size={15} /> {t('tarifs.night')}</Toggle>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-ink/10 pt-4 dark:border-white/10">
          <div>
            <p className={labelCls}>{t('estimator.title')}</p>
            <p data-testid="estimator-price" className="font-mono text-3xl font-semibold tabular-nums tracking-tight">
              {price ? price : (!depart || !arrivee ? '– €' : t('estimator.quote'))}
            </p>
          </div>
          <button
            data-testid="estimator-book-button"
            onClick={handleBook}
            disabled={!depart || !arrivee}
            className="group inline-flex min-h-[46px] items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-transform hover:-translate-y-px active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gold-400 dark:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            {price ? t('estimator.book') : 'Demander un devis'}
            <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <p className="mt-2 text-[11px] text-ink/50 dark:text-white/45">{t('estimator.note')}</p>
      </div>
    </div>
  );
}
