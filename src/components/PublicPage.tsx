import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { Fleet } from './Fleet';
import { Zones } from './Zones';
import { Tarifs } from './Tarifs';
import { Advantages } from './Advantages';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { ReservationWizard } from './ReservationWizard';

export function PublicPage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<string | undefined>();

  const openBooking = (context?: string) => {
    setBookingContext(context);
    setWizardOpen(true);
  };

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
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar onOpenBooking={() => openBooking()} />
      <main>
        <Hero onOpenBooking={() => openBooking()} />
        <Services onOpenBooking={openBooking} />
        <Fleet onOpenBooking={openBooking} />
        <Zones />
        <Tarifs />
        <Advantages />
        <ContactSection onOpenBooking={() => openBooking()} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ReservationWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        context={bookingContext}
      />
    </>
  );
}
