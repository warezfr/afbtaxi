import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ReservationWizard } from '@/components/ReservationWizard';

export function PublicLayout() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<string | undefined>();
  const location = useLocation();

  const openBooking = (context?: string) => {
    setBookingContext(context);
    setWizardOpen(true);
  };

  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    
    // Slight delay to allow DOM to render new page content
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [location.pathname]); // Re-run when path changes

  // Scroll to hash or top on route change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView();
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar onOpenBooking={() => openBooking()} />
      <main>
        <Outlet context={{ openBooking }} />
      </main>
      <Footer />
      <div className="hidden lg:block">
        <WhatsAppButton />
      </div>
      <MobileBottomNav onOpenBooking={() => openBooking()} />
      <ReservationWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        context={bookingContext}
      />
    </>
  );
}
