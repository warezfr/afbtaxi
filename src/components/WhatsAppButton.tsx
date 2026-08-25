import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const whatsappMessage = encodeURIComponent(
  `Bonjour ${COMPANY.name}, je souhaite r\u00e9server un taxi.`
);
const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${whatsappMessage}`;

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-1 hover:shadow-xl"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}

export function PhoneButton() {
  return (
    <a
      href={`tel:${COMPANY.phoneRaw}`}
      className="flex items-center gap-2 rounded-full bg-gold-400/10 px-4 py-2 text-sm font-semibold text-gold-400 transition hover:bg-gold-400/20"
    >
      {COMPANY.phone}
    </a>
  );
}
