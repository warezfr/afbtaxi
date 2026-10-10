import { useState } from 'react';
import { FacebookLogo, XLogo, LinkedinLogo, WhatsappLogo, EnvelopeSimple, LinkSimple, Check } from '@phosphor-icons/react';

export function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const shares = [
    { Icon: FacebookLogo, label: 'Partager sur Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { Icon: XLogo, label: 'Partager sur X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { Icon: LinkedinLogo, label: 'Partager sur LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { Icon: WhatsappLogo, label: 'Partager sur WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { Icon: EnvelopeSimple, label: 'Partager par e-mail', href: `mailto:?subject=${t}&body=${u}` },
  ];

  const btn =
    'inline-flex h-11 min-w-[44px] items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:border-gold-500 hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 dark:border-white/10 dark:text-zinc-300 dark:hover:border-gold-400 dark:hover:text-gold-300 dark:focus-visible:ring-offset-zinc-950';

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => undefined);
  };

  return (
    <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-6 dark:border-white/10">
      <span className="mr-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Partager</span>
      {shares.map(({ Icon, label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={btn}>
          <Icon size={18} weight="regular" />
        </a>
      ))}
      <button type="button" onClick={handleCopy} className={`${btn} gap-2 px-4`} aria-live="polite">
        {copied ? <Check size={18} weight="regular" /> : <LinkSimple size={18} weight="regular" />}
        <span className="text-sm font-medium">{copied ? 'Lien copié' : 'Copier le lien'}</span>
      </button>
    </div>
  );
}
