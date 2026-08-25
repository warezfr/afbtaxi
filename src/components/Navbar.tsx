import { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400">
            <span className="text-lg font-black text-ink">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black tracking-tight text-white">
              AFB<span className="text-gold-400">.</span>Taxis
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-neutral-500">
              Fontainebleau
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.isBooking ? (
              <button
                key={link.href}
                onClick={onOpenBooking}
                className="rounded-full bg-gold-400 px-5 py-2 text-sm font-bold text-ink transition-all hover:bg-gold-300 hover:shadow-[0_8px_30px_rgba(255,208,59,0.25)]"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            )
          )}

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-neutral-400 transition hover:border-gold-400/50 hover:text-white"
            >
              <Globe size={13} />
              {LOCALE_LABELS[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 overflow-hidden rounded-xl border border-white/10 bg-ink/95 shadow-xl backdrop-blur-xl">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`block w-full px-5 py-2.5 text-left text-sm font-medium transition ${
                      l === locale ? 'bg-gold-400/10 text-gold-400' : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={() => setOpen(!open)} className="text-white" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="bg-ink/98 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map((link) =>
              link.isBooking ? (
                <button
                  key={link.href}
                  onClick={() => { onOpenBooking(); setOpen(false); }}
                  className="mt-4 rounded-full bg-gold-400 px-6 py-3 text-center text-sm font-bold text-ink"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              )
            )}
            <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLocale(l); setOpen(false); }}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    l === locale ? 'bg-gold-400 text-ink' : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Close lang dropdown on outside click */}
      {langOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setLangOpen(false)} />}
    </header>
  );
}
