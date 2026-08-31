import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Fleet } from '@/components/Fleet';
import { Zones } from '@/components/Zones';
import { Tarifs } from '@/components/Tarifs';
import { Advantages } from '@/components/Advantages';
import { Reviews } from '@/components/Reviews';
import { ContactSection } from '@/components/ContactSection';
import { FAQ } from '@/components/FAQ';

export function Home() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();

  return (
    <>
      <Helmet>
        <title>AFB Taxis — Taxi Fontainebleau | Transfert Orly CDG | 7j/7</title>
        <meta name="description" content="Taxi et chauffeur privé à Fontainebleau. Transferts Orly et CDG, gares, transport sanitaire CPAM 77. Mercedes. Réservation 7j/7 au 06 07 42 46 16." />
        <link rel="canonical" href="https://www.afbtaxis.com/" />
        <meta property="og:title" content="AFB Taxis — Taxi premium Fontainebleau | Transfert aéroport 7j/7" />
        <meta property="og:description" content="Taxi et chauffeur privé à Fontainebleau. Transferts Orly, CDG, gares. Réservation 06 07 42 46 16." />
        <meta property="og:url" content="https://www.afbtaxis.com/" />
      </Helmet>
      
      <Hero onOpenBooking={openBooking} />
      <Services onOpenBooking={openBooking} />
      <div className="content-auto">
        <Fleet onOpenBooking={openBooking} />
        <Zones />
        <Tarifs />
        <Advantages />
        <Reviews />
        <FAQ />
        <ContactSection onOpenBooking={() => openBooking()} />
      </div>
    </>
  );
}
