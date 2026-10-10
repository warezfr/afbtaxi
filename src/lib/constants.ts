export const COMPANY = {
  name: 'AFB Taxis',
  phone: '06 07 42 46 16',
  phoneRaw: '0607424616',
  phoneIntl: '+33607424616',
  whatsapp: '33607424616',
  email: 'afb@afbtaxis.com',
  website: 'https://www.afbtaxis.com',
  address: '312 Route de Vosves, 77190 Dammarie-les-Lys',
  street: '312 Route de Vosves',
  city: 'Dammarie-les-Lys',
  postalCode: '77190',
  region: 'Île-de-France',
  country: 'FR',
  lat: 48.4041,
  lng: 2.6989,
  siret: '453 837 262 00030',
  siren: '453 837 262',
  legalForm: 'EURL',
  foundedYear: 2004,
  stationnement: 'Fontainebleau / Avon',
  googleMapsUrl: 'https://maps.google.com/?q=AFB+Taxis+Fontainebleau',
  logoUrl: 'https://www.afbtaxis.com/logo.png',
};

export const SERVICES = [
  {
    icon: 'Plane',
    title: 'Transferts Aéroports',
    description:
      'Transferts vers Orly et Roissy Charles de Gaulle. Ponctualité garantie pour vos vols.',
  },
  {
    icon: 'TrainFront',
    title: 'Transferts Gares',
    description:
      'Transferts vers toutes les gares d\'Île-de-France. Arrivez à l\'heure pour votre train.',
  },
  {
    icon: 'HeartPulse',
    title: 'Transport Sanitaire',
    description:
      'Conventionné CPAM 77. Transport médical et sanitaire, toutes distances.',
  },
  {
    icon: 'Car',
    title: 'Mise à Disposition',
    description:
      'Chauffeur dédié à la journée pour vos déplacements professionnels ou personnels.',
  },
  {
    icon: 'Users',
    title: 'Transport de Groupe',
    description:
      'Taxi 8 places, monospace et van. Voyagez en groupe en tout confort.',
  },
  {
    icon: 'Crown',
    title: 'Transport VIP / Luxe',
    description:
      'Véhicules confortables et climatisés. Service haut de gamme pour vos trajets.',
  },
  {
    icon: 'Baby',
    title: 'Siège Bébé / Enfant',
    description: 'Sièges bébé et enfant fournis gratuitement sur demande.',
  },
  {
    icon: 'Languages',
    title: 'Anglais Parlé',
    description: 'Service en anglais pour notre clientèle internationale.',
  },
];

export const ZONES = [
  'Fontainebleau',
  'Avon',
  'Dammarie-les-Lys',
  'Melun',
  'Nemours',
  'Montereau-Fault-Yonne',
  'Moret-sur-Loing',
  'Savigny-le-Temple',
  'Paris',
  'Toute l\'Île-de-France',
];

export const TARIFS = [
  { route: 'Fontainebleau ↔ Orly', carDay: '115 €', carNight: '145 €', vanDay: '150 €', vanNight: '200 €' },
  { route: 'Fontainebleau ↔ Paris rive droite', carDay: '153 €', carNight: '173 €', vanDay: '205 €', vanNight: '245 €' },
  { route: 'Fontainebleau ↔ Paris rive gauche', carDay: '132 €', carNight: '153 €', vanDay: '200 €', vanNight: '240 €' },
  { route: 'Fontainebleau ↔ CDG', carDay: '168 €', carNight: '192 €', vanDay: '210 €', vanNight: '245 €' },
  { route: 'Fontainebleau ↔ Gare de Chessy / Marne-la-Vallée', carDay: '135 €', carNight: '155 €', vanDay: '200 €', vanNight: '240 €' },
  { route: 'Fontainebleau ↔ Gare d’Avon', carDay: '18 €', carNight: '25 €', vanDay: '28 €', vanNight: '35 €' },
];

export const ADVANTAGES = [
  {
    icon: 'Clock',
    title: 'Ponctualité & Fiabilité',
    description:
      'Notre réputation repose sur notre ponctualité. Nous arrivons à l\'heure, à chaque trajet.',
  },
  {
    icon: 'MapPin',
    title: 'Chauffeurs Expérimentés',
    description:
      'Une parfaite connaissance de la région pour des trajets rapides et efficaces.',
  },
  {
    icon: 'Handshake',
    title: 'Respect des Engagements',
    description:
      'Vos horaires sont nos priorités. Nous honorons chaque réservation avec sérieux.',
  },
  {
    icon: 'Snowflake',
    title: 'Véhicules Confortables',
    description:
      'Véhicules modernes, climatisés et bien entretenus pour votre confort.',
  },
  {
    icon: 'CalendarDays',
    title: 'Service 7j/7',
    description:
      'Disponibles 7 jours sur 7 pour répondre à tous vos besoins de transport.',
  },
  {
    icon: 'Award',
    title: 'Plus de 20 ans d\'expérience',
    description:
      'Une entreprise de confiance depuis 2004, au service de la région Fontainebleau.',
  },
];
