import { useEffect, useState } from 'react';
import { Menu, X, Globe, PhoneCall } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useI18n, LOCALE_LABELS, type Locale } from '@/lib/i18n';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NAV_LINKS = [
    { href: '#services', label: t('nav.services') },
    { href: '#flotte', label: t('nav.fleet') },
    { href: '#zones', label: t('nav.zones') },
    { href: '#tarifs', label: t('nav.tarifs') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const locales: Locale[] = ['fr', 'en', 'ar', 'es'];
  const light = scrolled || open;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        light ? 'bg-white/90 shadow-[0_8px_30px_-12px_rgba(17,24,39,0.15)] backdrop-blur-xl' : 'bg-[#0a0a0a]/60 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3" data-testid="nav-logo">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gold-400">
            <span className="font-display text-lg font-black text-gray-900">A</span>
            <div className="taxi-checker absolute bottom-0 left-0 right-0 h-1.5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className={`font-display text-lg font-black tracking-tight ${light ? 'text-gray-900' : 'text-white'}`}>
              AFB<span className="text-gold-500">.</span>Taxis
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[.18em] ${light ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('nav.subtitle')}
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${light ? 'text-gray-500 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
            >
              {link.label}
            </a>
          ))}

          {/* Language */}
          <div className="relative">
            <button
              data-testid="nav-lang-button"
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                light ? 'border-gray-200 text-gray-500 hover:border-gold-400 hover:text-gray-900' : 'border-white/20 text-gray-300 hover:border-gold-400 hover:text-white'
              }`}
            >
              <Globe size={13} />
              {LOCALE_LABELS[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full px-5 py-2.5 text-left text-sm font-semibold transition-colors ${
                      l === locale ? 'bg-gold-50 text-gold-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${light ? 'text-gray-900 hover:text-gold-600' : 'text-white hover:text-gold-400'}`}
            data-testid="nav-phone-link"
          >
            <PhoneCall size={15} className={light ? 'text-gold-500' : 'text-gold-400'} />
            {COMPANY.phone}
          </a>

          <button
            data-testid="nav-book-button"
            onClick={onOpenBooking}
            className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-gray-900 transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-gold-300"
          >
            {t('nav.reservation')}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            aria-label="Appeler"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-400 text-gray-900"
            data-testid="nav-mobile-phone"
          >
            <PhoneCall size={18} />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border ${light ? 'border-gray-200 text-gray-900' : 'border-white/20 text-white'}`}
            aria-label="Menu"
            data-testid="nav-mobile-menu-toggle"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-5 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
            <button
              data-testid="nav-mobile-book-button"
              onClick={() => { onOpenBooking(); setOpen(false); }}
              className="mt-3 min-h-[52px] rounded-full bg-gold-400 px-6 py-3.5 text-center text-base font-bold text-gray-900"
            >
              {t('nav.reservation')}
            </button>
            <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setOpen(false); }}
                  className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    l === locale ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {langOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setLangOpen(false)} />}
    </header>
  );
}
