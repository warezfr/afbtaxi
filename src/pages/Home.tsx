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

export function Home() {
  const { openBooking } = useOutletContext<{ openBooking: (context?: string) => void }>();

  return (
    <>
      <Helmet>
        <title>AFB Taxis | Chauffeur Privé et VTC à Fontainebleau & Région Parisienne</title>
        <meta name="description" content="Réservez votre taxi ou chauffeur privé à Fontainebleau. Navettes aéroports (Orly, CDG), gares, transport médicalisé (conventionné CPAM). Service Premium 24/7." />
      </Helmet>
      
      <Hero onOpenBooking={openBooking} />
      <Services onOpenBooking={openBooking} />
      <div className="content-auto">
        <Fleet onOpenBooking={openBooking} />
        <Zones />
        <Tarifs />
        <Advantages />
        <Reviews />
        <ContactSection onOpenBooking={() => openBooking()} />
      </div>
    </>
  );
}
