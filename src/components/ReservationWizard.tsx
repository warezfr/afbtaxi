import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Send,
  CheckCircle2,
  Loader2,
  ChevronRight,
  ChevronLeft,
  User,
  MapPin,
  ClipboardList,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';
import { AddressAutocomplete } from './AddressAutocomplete';
import type { ReservationInput } from '@/lib/types';

const EMPTY_FORM: ReservationInput = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  pickup_date: '',
  pickup_time: '',
  pickup_location: '',
  dropoff_location: '',
  passengers: 1,
  trip_type: 'aller_simple',
  special_needs: '',
  message: '',
};

const STEPS = [
  { icon: User, key: 'wizard.step1' as const },
  { icon: MapPin, key: 'wizard.step2' as const },
  { icon: ClipboardList, key: 'wizard.step3' as const },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ReservationWizard({ open, onClose }: Props) {
  const { t, dir } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ReservationInput>(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const update = (field: keyof ReservationInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 0) return form.first_name && form.last_name && form.phone;
    if (step === 1) return form.pickup_date && form.pickup_time && form.pickup_location && form.dropoff_location;
    return true;
  };

  const handleSubmit = async () => {
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('reservations').insert({
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      email: form.email || null,
      pickup_date: form.pickup_date,
      pickup_time: form.pickup_time,
      pickup_location: form.pickup_location,
      dropoff_location: form.dropoff_location,
      passengers: form.passengers,
      trip_type: form.trip_type,
      special_needs: form.special_needs || null,
      message: form.message || null,
    });

    if (error) {
      setStatus('error');
      setErrorMsg(t('wizard.error'));
      return;
    }

    setStatus('success');
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setStep(0);
    setStatus('idle');
    setErrorMsg('');
  };

  const close = () => {
    onClose();
    setTimeout(reset, 300);
  };

  if (!open) return null;

  const inputCls =
    'w-full rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400';
  const labelCls = 'mb-1.5 block text-sm font-semibold text-neutral-300';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" dir={dir}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-lg animate-slideUp rounded-3xl border border-neutral-700/60 bg-neutral-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <h2 className="text-lg font-bold text-white">{t('wizard.title')}</h2>
          <button onClick={close} className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-800 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/15">
              <CheckCircle2 size={36} className="text-yellow-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{t('wizard.success.title')}</h3>
            <p className="mb-6 text-neutral-400">{t('wizard.success.text')}</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => { reset(); }} className="rounded-full border border-neutral-600 px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:border-neutral-400">
                {t('wizard.success.newBooking')}
              </button>
              <button onClick={close} className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-neutral-900 hover:bg-yellow-300">
                OK
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 px-6 pt-5">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${isActive ? 'bg-yellow-400 text-neutral-900' : isDone ? 'bg-yellow-400/20 text-yellow-400' : 'bg-neutral-800 text-neutral-500'}`}>
                      <Icon size={16} />
                    </div>
                    <span className={`hidden text-xs font-semibold sm:block ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                      {t(s.key)}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={`mx-1 h-px w-8 ${i < step ? 'bg-yellow-400' : 'bg-neutral-700'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form steps */}
            <div className="px-6 py-6">
              {step === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>{t('wizard.firstName')} *</label>
                      <input type="text" required value={form.first_name} onChange={(e) => update('first_name', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>{t('wizard.lastName')} *</label>
                      <input type="text" required value={form.last_name} onChange={(e) => update('last_name', e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t('wizard.phone')} *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputCls} placeholder="06 12 34 56 78" />
                  </div>
                  <div>
                    <label className={labelCls}>{t('wizard.email')}</label>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} placeholder="you@email.com" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>{t('wizard.pickupDate')} *</label>
                      <input type="date" required value={form.pickup_date} onChange={(e) => update('pickup_date', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>{t('wizard.pickupTime')} *</label>
                      <input type="time" required value={form.pickup_time} onChange={(e) => update('pickup_time', e.target.value)} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{t('wizard.pickupLocation')} *</label>
                    <AddressAutocomplete
                      value={form.pickup_location}
                      onChange={(v) => update('pickup_location', v)}
                      placeholder="Ex : Gare de Fontainebleau"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>{t('wizard.dropoffLocation')} *</label>
                    <AddressAutocomplete
                      value={form.dropoff_location}
                      onChange={(v) => update('dropoff_location', v)}
                      placeholder="Ex : Aéroport Orly"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>{t('wizard.passengers')}</label>
                      <input type="number" min={1} max={8} value={form.passengers} onChange={(e) => update('passengers', parseInt(e.target.value) || 1)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>{t('wizard.tripType')}</label>
                      <select value={form.trip_type} onChange={(e) => update('trip_type', e.target.value)} className={inputCls}>
                        <option value="aller_simple">{t('wizard.oneWay')}</option>
                        <option value="aller_retour">{t('wizard.roundTrip')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>{t('wizard.specialNeeds')}</label>
                    <input type="text" value={form.special_needs} onChange={(e) => update('special_needs', e.target.value)} className={inputCls} placeholder={t('wizard.specialNeedsPlaceholder')} />
                  </div>
                  <div>
                    <label className={labelCls}>{t('wizard.message')}</label>
                    <textarea rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} className={inputCls} placeholder={t('wizard.messagePlaceholder')} />
                  </div>
                  {status === 'error' && (
                    <p className="rounded-xl bg-red-900/30 px-4 py-3 text-sm text-red-300">{errorMsg}</p>
                  )}
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between border-t border-neutral-800 px-6 py-4">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm font-semibold text-neutral-400 transition hover:text-white">
                  <ChevronLeft size={16} /> {t('wizard.prev')}
                </button>
              ) : <span />}

              {step < 2 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-1 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('wizard.next')} <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-yellow-300 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> {t('wizard.sending')}</>
                  ) : (
                    <><Send size={16} /> {t('wizard.submit')}</>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
