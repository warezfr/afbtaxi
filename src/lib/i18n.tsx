import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Locale = 'fr' | 'en' | 'ar' | 'es';

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR',
  es: 'ES',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
  es: 'Español',
};

const translations = {
  fr: {
    // Navbar
    'nav.services': 'Services',
    'nav.fleet': 'Flotte',
    'nav.zones': 'Zones',
    'nav.tarifs': 'Tarifs',
    'nav.reservation': 'Réservation',
    // Hero
    'hero.badge': 'Un simple appel suffit',
    'hero.title1': 'Votre',
    'hero.title2': 'trajet,',
    'hero.title3': 'Votre',
    'hero.title4': 'confort.',
    'hero.subtitle': 'Mercedes Classe S et Classe V. Transport VIP, aéroports, gares et toute l\'Île-de-France.',
    'hero.cta': 'Réserver maintenant',
    'hero.badge.punctuality': 'Ponctualité garantie',
    'hero.badge.vehicles': 'Véhicules premium',
    'hero.badge.safe': 'Trajet sécurisé',
    'hero.badge.247': 'Service 7j/7',
    'hero.badge.price': 'Tarifs transparents',
    // Wizard
    'wizard.title': 'Réserver votre taxi',
    'wizard.step1': 'Coordonnées',
    'wizard.step2': 'Trajet',
    'wizard.step3': 'Détails',
    'wizard.firstName': 'Prénom',
    'wizard.lastName': 'Nom',
    'wizard.phone': 'Téléphone',
    'wizard.email': 'Email',
    'wizard.pickupDate': 'Date du trajet',
    'wizard.pickupTime': 'Heure',
    'wizard.pickupLocation': 'Lieu de départ',
    'wizard.dropoffLocation': 'Lieu d\'arrivée',
    'wizard.passengers': 'Passagers',
    'wizard.tripType': 'Type de trajet',
    'wizard.oneWay': 'Aller simple',
    'wizard.roundTrip': 'Aller-retour',
    'wizard.specialNeeds': 'Besoins particuliers',
    'wizard.specialNeedsPlaceholder': 'Siège bébé, transport médical, van 8 places...',
    'wizard.message': 'Message',
    'wizard.messagePlaceholder': 'Instructions, numéros de vol, etc.',
    'wizard.next': 'Suivant',
    'wizard.prev': 'Retour',
    'wizard.submit': 'Envoyer ma réservation',
    'wizard.sending': 'Envoi en cours...',
    'wizard.success.title': 'Réservation envoyée !',
    'wizard.success.text': 'Merci pour votre confiance. Nous vous contacterons très rapidement pour confirmer votre réservation.',
    'wizard.success.newBooking': 'Nouvelle réservation',
    'wizard.error': 'Une erreur est survenue. Veuillez réessayer ou nous appeler directement.',
    // Contact section
    'contact.title': 'Contact',
    'contact.subtitle': 'Réservez votre taxi',
    'contact.description': 'Remplissez le formulaire, nous vous confirmons votre réservation rapidement',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.address': 'Adresse',
    'contact.hours': 'Horaires',
    'contact.hoursValue': 'Service 7j/7',
    'contact.parking': 'Stationnement',
  },
  en: {
    'nav.services': 'Services',
    'nav.fleet': 'Fleet',
    'nav.zones': 'Areas',
    'nav.tarifs': 'Rates',
    'nav.reservation': 'Booking',
    'hero.badge': 'We\'re just a call away',
    'hero.title1': 'Your',
    'hero.title2': 'ride,',
    'hero.title3': 'Your',
    'hero.title4': 'comfort.',
    'hero.subtitle': 'Mercedes S-Class and V-Class. VIP transfers, airports, train stations and all of Île-de-France.',
    'hero.cta': 'Book now',
    'hero.badge.punctuality': 'On-time pickup',
    'hero.badge.vehicles': 'Premium vehicles',
    'hero.badge.safe': 'Safe & secure',
    'hero.badge.247': '24/7 service',
    'hero.badge.price': 'No hidden charges',
    'wizard.title': 'Book your taxi',
    'wizard.step1': 'Contact',
    'wizard.step2': 'Route',
    'wizard.step3': 'Details',
    'wizard.firstName': 'First name',
    'wizard.lastName': 'Last name',
    'wizard.phone': 'Phone',
    'wizard.email': 'Email',
    'wizard.pickupDate': 'Pickup date',
    'wizard.pickupTime': 'Pickup time',
    'wizard.pickupLocation': 'Pickup location',
    'wizard.dropoffLocation': 'Drop-off location',
    'wizard.passengers': 'Passengers',
    'wizard.tripType': 'Trip type',
    'wizard.oneWay': 'One way',
    'wizard.roundTrip': 'Round trip',
    'wizard.specialNeeds': 'Special requirements',
    'wizard.specialNeedsPlaceholder': 'Baby seat, medical transport, 8-seat van...',
    'wizard.message': 'Message',
    'wizard.messagePlaceholder': 'Instructions, flight numbers, etc.',
    'wizard.next': 'Next',
    'wizard.prev': 'Back',
    'wizard.submit': 'Send booking',
    'wizard.sending': 'Sending...',
    'wizard.success.title': 'Booking sent!',
    'wizard.success.text': 'Thank you for your trust. We will contact you very shortly to confirm your booking.',
    'wizard.success.newBooking': 'New booking',
    'wizard.error': 'An error occurred. Please try again or call us directly.',
    'contact.title': 'Contact',
    'contact.subtitle': 'Book your taxi',
    'contact.description': 'Fill in the form and we will confirm your booking shortly',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.hours': 'Hours',
    'contact.hoursValue': '24/7 service',
    'contact.parking': 'Parking',
  },
  ar: {
    'nav.services': 'الخدمات',
    'nav.fleet': 'الأسطول',
    'nav.zones': 'المناطق',
    'nav.tarifs': 'التعريفة',
    'nav.reservation': 'الحجز',
    'hero.badge': 'اتصل بنا الآن',
    'hero.title1': 'رحلتك',
    'hero.title2': '،',
    'hero.title3': 'راحتك',
    'hero.title4': '.',
    'hero.subtitle': 'مرسيدس الفئة S والفئة V. نقل VIP، مطارات، محطات القطار وكل منطقة إيل دو فرانس.',
    'hero.cta': 'احجز الآن',
    'hero.badge.punctuality': 'التزام بالمواعيد',
    'hero.badge.vehicles': 'سيارات فاخرة',
    'hero.badge.safe': 'رحلة آمنة',
    'hero.badge.247': 'خدمة 7/7',
    'hero.badge.price': 'أسعار شفافة',
    'wizard.title': 'احجز سيارتك',
    'wizard.step1': 'بياناتك',
    'wizard.step2': 'المسار',
    'wizard.step3': 'التفاصيل',
    'wizard.firstName': 'الاسم الأول',
    'wizard.lastName': 'الاسم الأخير',
    'wizard.phone': 'الهاتف',
    'wizard.email': 'البريد الإلكتروني',
    'wizard.pickupDate': 'تاريخ الرحلة',
    'wizard.pickupTime': 'الوقت',
    'wizard.pickupLocation': 'مكان الانطلاق',
    'wizard.dropoffLocation': 'مكان الوصول',
    'wizard.passengers': 'الركاب',
    'wizard.tripType': 'نوع الرحلة',
    'wizard.oneWay': 'ذهاب فقط',
    'wizard.roundTrip': 'ذهاب وإياب',
    'wizard.specialNeeds': 'احتياجات خاصة',
    'wizard.specialNeedsPlaceholder': 'مقعد طفل، نقل طبي، حافلة صغيرة 8 مقاعد...',
    'wizard.message': 'رسالة',
    'wizard.messagePlaceholder': 'تعليمات، أرقام الرحلات، إلخ.',
    'wizard.next': 'التالي',
    'wizard.prev': 'رجوع',
    'wizard.submit': 'إرسال الحجز',
    'wizard.sending': 'جارٍ الإرسال...',
    'wizard.success.title': 'تم إرسال الحجز!',
    'wizard.success.text': 'شكراً لثقتك. سنتواصل معك قريباً لتأكيد حجزك.',
    'wizard.success.newBooking': 'حجز جديد',
    'wizard.error': 'حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'احجز سيارتك',
    'contact.description': 'املأ النموذج وسنؤكد حجزك بسرعة',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.address': 'العنوان',
    'contact.hours': 'أوقات العمل',
    'contact.hoursValue': 'خدمة 7/7',
    'contact.parking': 'موقف السيارات',
  },
  es: {
    'nav.services': 'Servicios',
    'nav.fleet': 'Flota',
    'nav.zones': 'Zonas',
    'nav.tarifs': 'Tarifas',
    'nav.reservation': 'Reserva',
    'hero.badge': 'Solo una llamada',
    'hero.title1': 'Tu',
    'hero.title2': 'viaje,',
    'hero.title3': 'Tu',
    'hero.title4': 'comodidad.',
    'hero.subtitle': 'Mercedes Clase S y Clase V. Transporte VIP, aeropuertos, estaciones y toda la Île-de-France.',
    'hero.cta': 'Reservar ahora',
    'hero.badge.punctuality': 'Puntualidad garantizada',
    'hero.badge.vehicles': 'Vehículos premium',
    'hero.badge.safe': 'Viaje seguro',
    'hero.badge.247': 'Servicio 24/7',
    'hero.badge.price': 'Precios transparentes',
    'wizard.title': 'Reserva tu taxi',
    'wizard.step1': 'Datos',
    'wizard.step2': 'Ruta',
    'wizard.step3': 'Detalles',
    'wizard.firstName': 'Nombre',
    'wizard.lastName': 'Apellido',
    'wizard.phone': 'Teléfono',
    'wizard.email': 'Email',
    'wizard.pickupDate': 'Fecha del viaje',
    'wizard.pickupTime': 'Hora',
    'wizard.pickupLocation': 'Lugar de recogida',
    'wizard.dropoffLocation': 'Lugar de destino',
    'wizard.passengers': 'Pasajeros',
    'wizard.tripType': 'Tipo de viaje',
    'wizard.oneWay': 'Solo ida',
    'wizard.roundTrip': 'Ida y vuelta',
    'wizard.specialNeeds': 'Necesidades especiales',
    'wizard.specialNeedsPlaceholder': 'Silla de bebé, transporte médico, van 8 plazas...',
    'wizard.message': 'Mensaje',
    'wizard.messagePlaceholder': 'Instrucciones, números de vuelo, etc.',
    'wizard.next': 'Siguiente',
    'wizard.prev': 'Atrás',
    'wizard.submit': 'Enviar reserva',
    'wizard.sending': 'Enviando...',
    'wizard.success.title': '¡Reserva enviada!',
    'wizard.success.text': 'Gracias por su confianza. Le contactaremos muy pronto para confirmar su reserva.',
    'wizard.success.newBooking': 'Nueva reserva',
    'wizard.error': 'Ocurrió un error. Inténtelo de nuevo o llámenos directamente.',
    'contact.title': 'Contacto',
    'contact.subtitle': 'Reserva tu taxi',
    'contact.description': 'Rellena el formulario y confirmaremos tu reserva rápidamente',
    'contact.phone': 'Teléfono',
    'contact.email': 'Email',
    'contact.address': 'Dirección',
    'contact.hours': 'Horarios',
    'contact.hoursValue': 'Servicio 24/7',
    'contact.parking': 'Estacionamiento',
  },
} as const;

type TranslationKey = keyof (typeof translations)['fr'];

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('afb-lang') as Locale | null;
    return saved && saved in translations ? saved : 'fr';
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('afb-lang', l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return (translations[locale] as Record<string, string>)[key] ?? key;
    },
    [locale]
  );

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
