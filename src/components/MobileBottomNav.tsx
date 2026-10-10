import { Phone, CalendarCheck, WhatsappLogo } from '@phosphor-icons/react';
import { COMPANY } from '../lib/constants';
import { useI18n } from '../lib/i18n';

interface Props {
  onOpenBooking: () => void;
}

export function MobileBottomNav({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(t('whatsapp.message'))}`;

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 z-50 flex items-center justify-between rounded-full bg-zinc-950/90 backdrop-blur-xl px-4 py-2.5 shadow-2xl">
      <div className="flex w-full items-center justify-between px-2">
        <a
          href={`tel:${COMPANY.phoneIntl}`}
          className="flex flex-col items-center justify-center gap-1 text-zinc-400 transition-colors hover:text-zinc-50"
        >
          <Phone size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Appeler</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center gap-1 text-gold-400 transition-colors hover:text-gold-300"
        >
          <CalendarCheck size={22} weight="fill" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Réserver</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="whatsapp-float"
          className="flex flex-col items-center justify-center gap-1 text-zinc-400 transition-colors hover:text-[#25D366]"
        >
          <WhatsappLogo size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
