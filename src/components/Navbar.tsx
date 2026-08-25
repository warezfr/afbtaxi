import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n, LOCALE_LABELS, type Locale } from '@/lib/i18n';
import { PhoneButton } from './WhatsAppButton';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NAV_LINKS = [
    { href: '#services', label: t('nav.services'), isBooking: false },
    { href: '#flotte', label: t('nav.fleet'), isBooking: false },
    { href: '#zones', label: t('nav.zones'), isBooking: false },
    { href: '#tarifs', label: t('nav.tarifs'), isBooking: false },
    { href: '#contact', label: t('nav.reservation'), isBooking: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const locales: Locale[] = ['fr', 'en', 'ar', 'es'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-ink/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-yellow-400 shadow-[0_4px_20px_rgba(255,196,0,.3)] transition-transform group-hover:scale-105">
            <img
              src={COMPANY.logoUrl}
              alt={`Logo ${COMPANY.name}`}
              className="h-10 w-10 rounded-lg object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight text-white">
              AFB<span className="text-yellow-400">.</span>Taxis
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[.15em] text-neutral-400">
              Fontainebleau
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            link.isBooking ? (
              <button
                key={link.href}
                onClick={onOpenBooking}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-yellow-400"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-300 transition-colors hover:text-yellow-400"
              >
                {link.label}
              </a>
            )
          )}

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-bold text-neutral-300 transition hover:border-yellow-400 hover:text-yellow-400"
            >
              <Globe size={14} />
              {LOCALE_LABELS[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 shadow-xl">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full px-5 py-2 text-left text-sm font-medium transition ${
                      l === locale ? 'bg-yellow-400/10 text-yellow-400' : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <PhoneButton />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile lang */}
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 rounded-full border border-neutral-700 px-2.5 py-1.5 text-xs font-bold text-neutral-300"
          >
            <Globe size={13} />
            {LOCALE_LABELS[locale]}
          </button>
          <PhoneButton />
          <button onClick={() => setOpen(!open)} className="text-white" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="bg-ink/98 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-4 px-4 py-6">
            {NAV_LINKS.map((link) =>
              link.isBooking ? (
                <button
                  key={link.href}
                  onClick={() => { onOpenBooking(); setOpen(false); }}
                  className="text-left text-base font-medium text-neutral-300 transition-colors hover:text-yellow-400"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-neutral-300 transition-colors hover:text-yellow-400"
                >
                  {link.label}
                </a>
              )
            )}
            {/* Mobile language list */}
            <div className="mt-3 flex gap-2 border-t border-neutral-800 pt-4">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setOpen(false); }}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    l === locale ? 'bg-yellow-400 text-neutral-900' : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setLangOpen(false)} />
      )}
    </header>
  );
}
