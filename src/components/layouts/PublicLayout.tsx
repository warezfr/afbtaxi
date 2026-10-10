import { useState, useEffect } from 'react';
import { useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ReservationWizard } from '@/components/ReservationWizard';
import { ContactModal } from '@/components/ContactModal';

export function PublicLayout() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<string | undefined>();
  const location = useLocation();
  const reduce = useReducedMotion();

  const openBooking = (context?: string) => {
    setBookingContext(context);
    setWizardOpen(true);
  };

  const outlet = useOutlet({ openBooking });

  // Scroll to hash or top on route change
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.substring(1));
      const timer = window.setTimeout(() => {
        // scroll-padding-top (index.css) is honoured by scrollIntoView
        document.getElementById(id)?.scrollIntoView();
      }, 100);
      return () => window.clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      >
        Aller au contenu
      </a>
      <Navbar onOpenBooking={() => openBooking()} />
      <div className="grain-layer" aria-hidden="true" />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <div className="hidden lg:block">
        <WhatsAppButton />
      </div>
      <MobileBottomNav onOpenBooking={() => openBooking()} />
      <ContactModal />
      <ReservationWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        context={bookingContext}
      />
    </>
  );
}
