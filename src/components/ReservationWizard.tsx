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
  MessageCircle,
  Mail,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COMPANY } from '@/lib/constants';
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
  context?: string;
}

function useBuildWhatsAppMessage(t: (k: any) => string) {
  return (form: ReservationInput, context?: string): string => {
    let msg = `${t('wizard.wa.greeting')} ${COMPANY.name},\n\n${t('wizard.wa.intro')}\n\n`;
    if (context) msg += `${t('wizard.wa.service')} : ${context}\n`;
    msg += `${t('wizard.wa.name')} : ${form.first_name} ${form.last_name}\n`;
    msg += `${t('wizard.wa.phone')} : ${form.phone}\n`;
    if (form.email) msg += `${t('wizard.wa.email')} : ${form.email}\n`;
    msg += `\n${t('wizard.wa.date')} : ${form.pickup_date}\n`;
    msg += `${t('wizard.wa.time')} : ${form.pickup_time}\n`;
    msg += `${t('wizard.wa.pickup')} : ${form.pickup_location}\n`;
    msg += `${t('wizard.wa.dropoff')} : ${form.dropoff_location}\n`;
    msg += `${t('wizard.wa.passengers')} : ${form.passengers}\n`;
    msg += `${t('wizard.wa.type')} : ${form.trip_type === 'aller_retour' ? t('wizard.roundTrip') : t('wizard.oneWay')}\n`;
    if (form.special_needs) msg += `${t('wizard.wa.needs')} : ${form.special_needs}\n`;
    if (form.message) msg += `${t('wizard.wa.message')} : ${form.message}\n`;
    msg += `\n${t('wizard.wa.thanks')}`;
    return msg;
  };
}

function useBuildEmailBody(t: (k: any) => string) {
  return (form: ReservationInput, context?: string): string => {
    let body = '';
    if (context) body += `${t('wizard.wa.service')} : ${context}\n`;
    body += `${t('wizard.wa.name')} : ${form.first_name} ${form.last_name}\n`;
    body += `${t('wizard.wa.phone')} : ${form.phone}\n`;
    if (form.email) body += `${t('wizard.wa.email')} : ${form.email}\n`;
    body += `${t('wizard.wa.date')} : ${form.pickup_date}\n`;
    body += `${t('wizard.wa.time')} : ${form.pickup_time}\n`;
    body += `${t('wizard.wa.pickup')} : ${form.pickup_location}\n`;
    body += `${t('wizard.wa.dropoff')} : ${form.dropoff_location}\n`;
    body += `${t('wizard.wa.passengers')} : ${form.passengers}\n`;
    body += `${t('wizard.wa.type')} : ${form.trip_type === 'aller_retour' ? t('wizard.roundTrip') : t('wizard.oneWay')}\n`;
    if (form.special_needs) body += `${t('wizard.wa.needs')} : ${form.special_needs}\n`;
    if (form.message) body += `${t('wizard.wa.message')} : ${form.message}\n`;
    return body;
  };
}

export function ReservationWizard({ open, onClose, context }: Props) {
  const { t, dir } = useI18n();
  const buildWhatsAppMessage = useBuildWhatsAppMessage(t);
  const buildEmailBody = useBuildEmailBody(t);
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

  useEffect(() => {
    if (open && context) {
      setForm((prev) => ({ ...prev, message: prev.message || `${t('wizard.contextLabel')}${context}` }));
    }
  }, [open, context, t]);

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

    try {
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
      if (error) throw error;
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg(t('wizard.error'));
    }
  };

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage(form, context);
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`${t('wizard.email.subject')} - ${form.first_name} ${form.last_name}`);
    const body = encodeURIComponent(buildEmailBody(form, context));
    window.open(`mailto:${COMPANY.email}?subject=${subject}&body=${body}`, '_self');
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
    'w-full min-h-[48px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40';
  const labelCls = 'mb-1.5 block text-sm font-bold text-gray-700';

  return createPortal(
    <dialog open className="fixed inset-0 z-[9999] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-none bg-transparent p-4" dir={dir}>
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={close} />
      <div className="relative flex max-h-[92vh] w-full max-w-lg animate-slideUp flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="taxi-checker h-2.5 shrink-0" />
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">{t('wizard.title')}</h2>
            {context && (
              <p className="mt-0.5 text-xs font-bold text-gold-600">{context}</p>
            )}
          </div>
          <button data-testid="wizard-close-button" onClick={close} className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900">
            <X size={20} />
          </button>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="overflow-y-auto px-6 py-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100">
              <CheckCircle2 size={36} className="text-gold-600" />
            </div>
            <h3 className="mb-2 font-display text-xl font-bold text-gray-900">{t('wizard.success.title')}</h3>
            <p className="mb-6 text-gray-500">{t('wizard.success.text')}</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => { reset(); }} className="min-h-[44px] rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:border-gray-400">
                {t('wizard.success.newBooking')}
              </button>
              <button data-testid="wizard-success-ok" onClick={close} className="min-h-[44px] rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gold-300">
                OK
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex shrink-0 items-center justify-center gap-2 px-6 pt-5">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${isActive ? 'bg-gold-400 text-gray-900' : isDone ? 'bg-gold-100 text-gold-700' : 'bg-gray-100 text-gray-400'}`}>
                      <Icon size={16} />
                    </div>
                    <span className={`hidden text-xs font-bold sm:block ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {t(s.key)}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={`mx-1 h-px w-8 ${i < step ? 'bg-gold-400' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form steps */}
            <div className="overflow-y-auto px-6 py-6">
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
                      <input type="date" required min={new Date().toISOString().split('T')[0]} value={form.pickup_date} onChange={(e) => update('pickup_date', e.target.value)} className={inputCls} />
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
                      placeholder={t('wizard.pickupLocationPlaceholder')}
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>{t('wizard.dropoffLocation')} *</label>
                    <AddressAutocomplete
                      value={form.dropoff_location}
                      onChange={(v) => update('dropoff_location', v)}
                      placeholder={t('wizard.dropoffLocationPlaceholder')}
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
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{errorMsg}</p>
                  )}
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-gray-50/60 px-6 py-4">
              {step > 0 ? (
                <button data-testid="wizard-prev-button" onClick={() => setStep(step - 1)} className="flex min-h-[44px] items-center gap-1 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900">
                  <ChevronLeft size={16} /> {t('wizard.prev')}
                </button>
              ) : <span />}

              {step < 2 ? (
                <button
                  data-testid="wizard-next-button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex min-h-[48px] items-center gap-1 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t('wizard.next')} <ChevronRight size={16} />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    data-testid="wizard-whatsapp-button"
                    onClick={handleWhatsApp}
                    title={t('wizard.sendWhatsApp')}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1faa52] transition-colors hover:bg-[#25D366]/25"
                  >
                    <MessageCircle size={18} />
                  </button>
                  <button
                    data-testid="wizard-email-button"
                    onClick={handleEmail}
                    title={t('wizard.sendEmail')}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                  >
                    <Mail size={18} />
                  </button>
                  <button
                    data-testid="wizard-submit-button"
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="flex min-h-[48px] items-center gap-2 rounded-full bg-gold-400 px-6 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gold-300 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" /> {t('wizard.sending')}</>
                    ) : (
                      <><Send size={16} /> {t('wizard.submit')}</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>,
    document.body
  );
}
