import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Sun, MoonStars, Phone, List, X, ArrowUpRight } from '@phosphor-icons/react';
import { useI18n, LOCALE_LABELS, type Locale } from '@/lib/i18n';
import { useTheme } from '@/lib/ThemeContext';
import { COMPANY } from '@/lib/constants';
import { Logo } from './Logo';
import { EASE, useMotionOk } from './motion';

const LOCALES: Locale[] = ['fr', 'en', 'es', 'ar'];

export function Navbar({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const motionOk = useMotionOk();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 24));
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const onDark = !condensed && !location.pathname.startsWith('/blog');

  const LINKS = [
    { href: '/#services', label: t('nav.services') },
    { href: '/#flotte', label: t('nav.fleet') },
    { href: '/#tarifs', label: t('nav.tarifs') },
    { href: '/blog', label: 'Mag' },
    { href: '/partenaires', label: 'Partenariat' },
  ];

  const ink = onDark ? 'text-white' : 'text-ink dark:text-white';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <motion.nav
          initial={false}
          animate={condensed ? 'condensed' : 'top'}
          variants={{
            top: { paddingTop: 20, paddingBottom: 0 },
            condensed: { paddingTop: 10, paddingBottom: 0 },
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Brand pill */}
          <Link
            to="/"
            data-testid="nav-logo"
            className={`pointer-events-auto flex h-12 items-center rounded-full px-3 pr-4 transition-colors duration-500 ${condensed ? 'glass' : ''} ${ink}`}
          >
            <Logo variant="horizontal" className="h-8" />
          </Link>

          {/* Center links (desktop) */}
          <motion.div
            layout
            className={`pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 transition-colors duration-500 lg:flex ${condensed ? 'glass' : ''}`}
          >
            {LINKS.map((l) => {
              const active = location.pathname + location.hash === l.href || (l.href === '/blog' && location.pathname.startsWith('/blog'));
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors ${ink} ${active ? '' : 'opacity-75 hover:opacity-100'}`}
                >
                  {active && (
                    <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 350, damping: 30 }} className="absolute inset-0 rounded-full bg-gold-400/90" />
                  )}
                  <span className={`relative ${active ? 'text-ink' : ''}`}>{l.label}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* Right actions */}
          <div className={`pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 transition-colors duration-500 ${condensed ? 'glass' : ''}`}>
            <button
              onClick={(e) => toggleTheme(e as unknown as MouseEvent)}
              aria-label="Changer de thème"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink/5 dark:hover:bg-white/10 ${ink}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
            </button>
            <div className="relative hidden sm:block">
              <select
                data-testid="nav-lang-button"
                aria-label="Langue"
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className={`h-9 cursor-pointer appearance-none rounded-full bg-transparent px-3 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${ink}`}
              >
                {LOCALES.map((l) => <option key={l} value={l} className="text-ink">{LOCALE_LABELS[l]}</option>)}
              </select>
            </div>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              data-testid="nav-phone-link"
              className={`hidden h-9 items-center gap-2 rounded-full px-3 font-mono text-[13px] font-semibold transition-colors hover:bg-ink/5 dark:hover:bg-white/10 md:flex ${ink}`}
            >
              <Phone size={16} className="text-gold-500" />
              {COMPANY.phone}
            </a>
            <button
              data-testid="nav-book-button"
              onClick={onOpenBooking}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] font-bold text-white transition-transform hover:-translate-y-px active:scale-[0.98] dark:bg-gold-400 dark:text-ink lg:flex"
            >
              {t('common.book')} <ArrowUpRight size={14} weight="bold" />
            </button>
            <button
              data-testid="nav-mobile-menu-toggle"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className={`flex h-9 w-9 items-center justify-center rounded-full lg:hidden ${ink}`}
            >
              {open ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={motionOk ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-24 dark:bg-[#0B0B0C] lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                className="flex flex-col"
              >
                {LINKS.map((l, i) => (
                  <motion.li key={l.href} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }} className="border-b border-ink/10 dark:border-white/10">
                    <Link to={l.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5 font-display text-4xl font-semibold tracking-tightest text-ink dark:text-white">
                      {l.label}
                      <span className="font-mono text-xs text-ink/40 dark:text-white/40">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-auto space-y-4">
                <a href={`tel:${COMPANY.phoneRaw}`} data-testid="nav-mobile-phone" className="flex items-center gap-3 font-mono text-xl font-semibold text-ink dark:text-white">
                  <Phone size={22} className="text-gold-500" /> {COMPANY.phone}
                </a>
                <button
                  data-testid="nav-mobile-book-button"
                  onClick={() => { onOpenBooking(); setOpen(false); }}
                  className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-ink text-base font-bold text-white dark:bg-gold-400 dark:text-ink"
                >
                  {t('common.book')}
                </button>
                <div className="flex gap-2">
                  {LOCALES.map((l) => (
                    <button key={l} onClick={() => { setLocale(l); setOpen(false); }} className={`min-h-[44px] rounded-full px-4 text-sm font-bold ${l === locale ? 'bg-gold-400 text-ink' : 'bg-ink/5 text-ink dark:bg-white/10 dark:text-white'}`}>
                      {LOCALE_LABELS[l]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
