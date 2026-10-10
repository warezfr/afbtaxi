import { WhatsappLogo } from '@phosphor-icons/react';
import { COMPANY } from '../lib/constants';
import { useI18n } from '../lib/i18n';

export function WhatsAppButton() {
  const { t } = useI18n();
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(t('whatsapp.message'))}`;

  return (
    <a
      data-testid="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-pulse-wa hidden lg:flex fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
      aria-label={t('whatsapp.aria')}
    >
      <WhatsappLogo size={32} weight="fill" />
    </a>
  );
}
