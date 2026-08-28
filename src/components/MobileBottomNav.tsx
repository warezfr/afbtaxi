import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

interface Props {
  onOpenBooking: () => void;
}

export function MobileBottomNav({ onOpenBooking }: Props) {
  const { t } = useI18n();
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(t('whatsapp.message'))}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 px-4 pb-4 pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}>
      <div className="flex w-full items-center justify-around gap-2 mb-1 mt-1">
        <a
          href={`tel:${COMPANY.phoneIntl}`}
          className="flex flex-col items-center justify-center gap-1 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <Phone size={22} className="mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Appeler</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="group relative -mt-7 flex flex-col items-center justify-center gap-1"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-gray-900 shadow-xl shadow-gold-500/30 transition-transform group-hover:scale-105 border-4 border-white dark:border-gray-900">
            <CalendarCheck size={26} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-900 dark:text-white">Réserver</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 p-2 text-gray-500 hover:text-[#25D366] dark:text-gray-400 dark:hover:text-[#25D366] transition-colors"
        >
          <MessageCircle size={22} className="mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
