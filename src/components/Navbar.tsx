import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { useTheme } from '../lib/ThemeContext';
import { COMPANY } from '../lib/constants';
import { Logo } from './Logo';
import { Sun, MoonStars, Globe, Phone, List, X } from '@phosphor-icons/react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

const locales = ['fr', 'en', 'es', 'ar'] as const;
const LOCALE_LABELS = { fr: 'FR', en: 'EN', es: 'ES', ar: 'عربي' };

export function Navbar({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const NAV_LINKS = [
    { href: '/#services', label: t('nav.services') },
    { href: '/#flotte', label: t('nav.fleet') },
    { href: '/#tarifs', label: t('nav.tarifs') },
    { href: '/blog', label: 'Mag' },
    { href: '/partenaires', label: 'Partenariat' },
  ];

  const isDarkHero = !scrolled && !location.pathname.startsWith('/blog');

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderBottomColor: 'rgba(255, 255, 255, 0)',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderBottomColor: 'rgba(228, 228, 231, 0.7)', // zinc-200/70
    },
    scrolledDark: {
      backgroundColor: 'rgba(9, 9, 11, 0.80)', // zinc-950/80
      borderBottomColor: 'rgba(255, 255, 255, 0.1)', // white/10
    }
  };

  const getHeaderVariant = () => {
    if (!scrolled) return 'top';
    return theme === 'dark' ? 'scrolledDark' : 'scrolled';
  };

  return (
    <motion.header
      variants={headerVariants}
      initial={false}
      animate={getHeaderVariant()}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl ${!scrolled ? 'dark:border-transparent dark:bg-transparent' : ''}`}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <Link to="/" data-testid="nav-logo" className={`flex items-center transition-colors ${isDarkHero ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'}`}>
          <Logo variant="horizontal" className="h-8" />
        </Link>

        {/* Center: Links (Desktop) */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname + location.hash === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative py-1 text-[13px] font-bold uppercase tracking-widest transition-colors ${isDarkHero ? 'text-white hover:text-gold-400' : 'text-zinc-900 dark:text-zinc-50 hover:text-gold-600 dark:hover:text-gold-400'}`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-gold-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden items-center gap-6 lg:flex">
          <button
            onClick={(e) => toggleTheme(e as unknown as MouseEvent)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${isDarkHero ? 'text-zinc-300 hover:text-gold-400' : 'text-zinc-500 hover:text-gold-500 dark:text-zinc-400 dark:hover:text-gold-400'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <MoonStars size={20} />}
          </button>

          <div className="relative">
            <button
              data-testid="nav-lang-button"
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                isDarkHero 
                  ? 'border-white/20 text-zinc-300 hover:border-gold-400 hover:text-white'
                  : 'border-zinc-200 text-zinc-600 hover:border-gold-400 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-gold-400 dark:hover:text-zinc-50'
              }`}
            >
              <Globe size={16} />
              {LOCALE_LABELS[locale]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-card border border-zinc-200 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.25)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-none"
                >
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={`block w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                        l === locale ? 'bg-gold-50 text-gold-700 dark:bg-zinc-800 dark:text-gold-400' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {LOCALE_LABELS[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${isDarkHero ? 'text-white hover:text-gold-400' : 'text-zinc-900 hover:text-gold-600 dark:text-zinc-50 dark:hover:text-gold-400'}`}
            data-testid="nav-phone-link"
          >
            <Phone size={18} className="text-gold-500" />
            {COMPANY.phone}
          </a>

          <button
            data-testid="nav-book-button"
            onClick={onOpenBooking}
            className="rounded-full bg-gold-400 px-6 py-2.5 text-[13px] font-black uppercase tracking-widest text-zinc-950 transition-transform duration-300 hover:scale-105"
          >
            {t('nav.reservation')}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={(e) => toggleTheme(e as unknown as MouseEvent)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isDarkHero ? 'text-zinc-300 hover:text-gold-400' : 'text-zinc-500 hover:text-gold-500 dark:text-zinc-400 dark:hover:text-gold-400'
            }`}
          >
            {theme === 'dark' ? <Sun size={22} /> : <MoonStars size={22} />}
          </button>
          
          <button
            onClick={() => setOpen(!open)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              isDarkHero ? 'border-white/20 text-white' : 'border-zinc-200 text-zinc-900 dark:border-white/10 dark:text-zinc-50'
            }`}
            aria-label="Menu"
            data-testid="nav-mobile-menu-toggle"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[68px] z-40 flex flex-col bg-white dark:bg-zinc-950 lg:hidden"
          >
            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
              <motion.div 
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-6"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}>
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-50"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                }} className="mt-8 border-t border-zinc-200 dark:border-white/10 pt-8">
                  <a
                    href={`tel:${COMPANY.phoneRaw}`}
                    data-testid="nav-mobile-phone"
                    className="flex items-center gap-3 text-xl font-bold text-zinc-900 dark:text-zinc-50"
                  >
                    <Phone size={24} className="text-gold-500" />
                    {COMPANY.phone}
                  </a>
                  
                  <button
                    data-testid="nav-mobile-book-button"
                    onClick={() => { onOpenBooking(); setOpen(false); }}
                    className="mt-6 w-full min-h-[56px] rounded-full bg-gold-400 px-6 text-center text-[15px] font-black uppercase tracking-widest text-zinc-950"
                  >
                    {t('nav.reservation')}
                  </button>
                  
                  <div className="mt-8 flex flex-wrap gap-3">
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLocale(l); setOpen(false); }}
                        className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                          l === locale ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400'
                        }`}
                      >
                        {LOCALE_LABELS[l]}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body
      )}

      {langOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setLangOpen(false)} />}
    </motion.header>
  );
}
