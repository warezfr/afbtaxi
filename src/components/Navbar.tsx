import { useEffect, useState } from 'react';
import { Menu, X, Globe, PhoneCall, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/lib/ThemeContext';
import { COMPANY } from '@/lib/constants';
import { useI18n, LOCALE_LABELS, type Locale } from '@/lib/i18n';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NAV_LINKS = [
    { href: '/#services', label: t('nav.services') },
    { href: '/#flotte', label: t('nav.fleet') },
    { href: '/#tarifs', label: t('nav.tarifs') },
    { href: '/blog', label: 'AFB Mag' },
    { href: '/partenaires', label: 'Partenariat' },
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
        light 
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-[0_8px_30px_-12px_rgba(17,24,39,0.15)] dark:shadow-none backdrop-blur-xl' 
          : 'bg-[#0a0a0a]/60 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3.5 group" data-testid="nav-logo">
<div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gold-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M10 2h4"/>
              <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/>
              <path d="M7 14h.01"/>
              <path d="M17 14h.01"/>
              <rect width="18" height="8" x="3" y="10" rx="2"/>
              <path d="M5 18v2"/>
              <path d="M19 18v2"/>
              <defs>
                <linearGradient id="goldGradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE047" />
                  <stop offset="0.5" stopColor="#EAB308" />
                  <stop offset="1" stopColor="#CA8A04" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col leading-[1.1]">
            <span className={`font-display text-xl tracking-tight ${light ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              <strong className="font-black">AFB</strong>
              <span className="text-gold-500 mx-[1px] font-bold">.</span>
              <span className="font-medium opacity-90">Taxis</span>
            </span>
            <span className={`text-[9.5px] font-bold uppercase tracking-[0.25em] ${light ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500'}`}>
              {t('nav.subtitle')}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[13px] font-bold uppercase tracking-widest transition-colors ${light ? 'text-gray-900 hover:text-gold-600 dark:text-white dark:hover:text-gold-400' : 'text-white hover:text-gold-400'}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={(e) => toggleTheme(e)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              light ? 'text-gray-500 hover:text-gold-500 dark:text-gray-300 dark:hover:text-gold-400' : 'text-gray-300 hover:text-gold-400'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language */}
          <div className="relative">
            <button
              data-testid="nav-lang-button"
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                light ? 'border-gray-200 text-gray-500 hover:border-gold-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white' : 'border-white/20 text-gray-300 hover:border-gold-400 hover:text-white'
              }`}
            >
              <Globe size={13} />
              {LOCALE_LABELS[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full px-5 py-2.5 text-left text-sm font-semibold transition-colors ${
                      l === locale ? 'bg-gold-50 dark:bg-gray-800 text-gold-700 dark:text-gold-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
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
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${light ? 'text-gray-900 hover:text-gold-600 dark:text-gray-300 dark:hover:text-gold-400' : 'text-white hover:text-gold-400'}`}
            data-testid="nav-phone-link"
          >
            <PhoneCall size={15} className={light ? 'text-gold-500' : 'text-gold-400'} />
            {COMPANY.phone}
          </a>

          <button
            data-testid="nav-book-button"
            onClick={onOpenBooking}
            className="rounded-full bg-gold-400 px-6 py-2.5 text-[13px] font-black uppercase tracking-widest text-gray-900 transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-gold-300"
          >
            {t('nav.reservation')}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={(e) => toggleTheme(e)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              light ? 'text-gray-500 hover:text-gold-500' : 'text-gray-300 hover:text-gold-400'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
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
            className={`flex h-11 w-11 items-center justify-center rounded-full border ${light ? 'border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-300' : 'border-white/20 text-white'}`}
            aria-label="Menu"
            data-testid="nav-mobile-menu-toggle"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-5 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gold-600 dark:hover:text-gold-400"
              >
                {link.label}
              </Link>
            ))}
            <button
              data-testid="nav-mobile-book-button"
              onClick={() => { onOpenBooking(); setOpen(false); }}
              className="mt-3 min-h-[52px] rounded-full bg-gold-400 px-6 py-3.5 text-center text-[13px] font-black uppercase tracking-widest text-gray-900"
            >
              {t('nav.reservation')}
            </button>
            <div className="mt-4 flex gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setOpen(false); }}
                  className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    l === locale ? 'bg-gray-900 dark:bg-gray-700 text-white' : 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400'
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
