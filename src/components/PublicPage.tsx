import { useState } from 'react';
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
