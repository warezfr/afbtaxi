import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { RouteLine } from '@/components/RouteLine';
import { Fleet } from '@/components/Fleet';
import { Zones } from '@/components/Zones';
import { Stats } from '@/components/Stats';
import { Reviews } from '@/components/Reviews';
import { FAQ } from '@/components/FAQ';
import { ContactSection } from '@/components/ContactSection';

export function Home() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();

  return (
    <>
      <Helmet>
        <title>AFB Taxis | Taxi et chauffeur privé à Fontainebleau, aéroports, CPAM</title>
        <meta
          name="description"
          content="Taxi et chauffeur privé à Fontainebleau et Seine-et-Marne : aéroports Orly et CDG, gares, Paris, transport conventionné CPAM. Réservation 24h/24 au 06 07 42 46 16."
        />
        <link rel="canonical" href="https://www.afbtaxis.com/" />
      </Helmet>

      <Hero onOpenBooking={openBooking} />
      <Services onOpenBooking={openBooking} />
      <RouteLine />
      <Fleet onOpenBooking={openBooking} />
      <Zones />
      <Stats />
      <Reviews />
      <FAQ />
      <ContactSection onOpenBooking={() => openBooking()} />
    </>
  );
}
