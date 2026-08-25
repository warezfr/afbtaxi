import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export function WhatsAppButton() {
  const { t } = useI18n();
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(t('whatsapp.message'))}`;

  return (
    <a
      data-testid="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-pulse-wa fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-105 sm:bottom-6 sm:right-6"
      aria-label={t('whatsapp.aria')}
    >
      <MessageCircle size={26} />
    </a>
  );
}
