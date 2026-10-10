import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { ProofBar } from '@/components/ProofBar';
import { Services } from '@/components/Services';
import { Fleet } from '@/components/Fleet';
import { Zones } from '@/components/Zones';
import { Tarifs } from '@/components/Tarifs';
import { Advantages } from '@/components/Advantages';
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
          content="Taxi et chauffeur privé à Fontainebleau et Seine-et-Marne. Transferts Orly, Roissy CDG, gares, Paris, transport conventionné CPAM. Mercedes Classe S, E, V. Réservation 24h/24 au 06 07 42 46 16."
        />
        <link rel="canonical" href="https://www.afbtaxis.com/" />
      </Helmet>

      <Hero onOpenBooking={openBooking} />
      <ProofBar onOpenBooking={openBooking} />
      <Services onOpenBooking={openBooking} />
      <Fleet onOpenBooking={openBooking} />
      <Zones />
      <Tarifs />
      <Advantages />
      <Reviews />
      <FAQ />
      <ContactSection onOpenBooking={() => openBooking()} />
    </>
  );
}
