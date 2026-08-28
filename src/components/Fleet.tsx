import { useState } from 'react';
import { Check, Crown, Gauge, Leaf, Users, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface FleetProps {
  onOpenBooking: (context?: string) => void;
}

const VEHICLES = [
  {
    id: 'berline',
    name: 'Mercedes Classe E',
    tagKey: 'fleet.tag.sedan' as const,
    image: 'https://images.pexels.com/photos/9459158/pexels-photo-9459158.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Crown,
    featureKeys: ['fleet.classeE.feat1' as const, 'fleet.classeE.feat2' as const, 'fleet.classeE.feat3' as const],
    seatCount: 4,
    desc: 'L\'élégance classique pour vos transferts d\'affaires.'
  },
  {
    id: 'van',
    name: 'Mercedes Classe V',
    tagKey: 'fleet.tag.van' as const,
    image: 'https://images.pexels.com/photos/17455633/pexels-photo-17455633.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Users,
    featureKeys: ['fleet.classeV.feat1' as const, 'fleet.classeV.feat2' as const, 'fleet.classeV.feat3' as const],
    seatCount: 7,
    desc: 'Idéal pour les familles, les groupes et les excédents de bagages.'
  },
  {
    id: 'vip',
    name: 'Mercedes Classe S',
    tagKey: 'fleet.tag.vip' as const,
    image: 'https://images.pexels.com/photos/10638649/pexels-photo-10638649.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Crown,
    featureKeys: ['fleet.classeS.feat1' as const, 'fleet.classeS.feat2' as const, 'fleet.classeS.feat3' as const],
    seatCount: 4,
    desc: 'Le summum du luxe et du raffinement pour une expérience VIP absolue.'
  },
  {
    id: 'tesla',
    name: 'Tesla Model Y',
    tagKey: 'fleet.tag.electric' as const,
    image: 'https://images.pexels.com/photos/20019462/pexels-photo-20019462.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Leaf,
    featureKeys: ['fleet.teslaY.feat1' as const, 'fleet.teslaY.feat2' as const, 'fleet.teslaY.feat3' as const],
    seatCount: 4,
    desc: 'Transport 100% électrique, silencieux et respectueux de l\'environnement.'
  }
];

export function Fleet({ onOpenBooking }: FleetProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(VEHICLES[0].id);
  
  const activeCar = VEHICLES.find(v => v.id === activeTab) || VEHICLES[0];
  const Icon = activeCar.icon;

  return (
    <section id="flotte" className="relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16 lg:py-28" style={{ contentVisibility: 'auto' }}>
      <div className="dot-grid absolute inset-0 opacity-40 dark:opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal mb-12 text-center lg:mb-16">
          <p className="mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600 sm:text-sm">
            <span className="h-px w-8 bg-gold-400" />
            {t('fleet.label')}
            <span className="h-px w-8 bg-gold-400" />
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            {t('fleet.title1')}<span className="yellow-marker px-1">{t('fleet.title2')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            {t('fleet.subtitle')}
          </p>
        </div>

        {/* Showroom UI */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start bg-white dark:bg-gray-900 rounded-[2rem] p-4 lg:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800">
          
          {/* Tabs Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {VEHICLES.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setActiveTab(vehicle.id)}
                className={`flex items-center justify-between w-full p-4 rounded-2xl text-left transition-all duration-300 ${
                  activeTab === vehicle.id 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl scale-[1.02]' 
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div>
                  <h3 className="font-bold font-display text-base">{vehicle.name}</h3>
                  <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${activeTab === vehicle.id ? 'text-gold-400 dark:text-gold-600' : 'text-gray-400'}`}>
                    {t(vehicle.tagKey)}
                  </p>
                </div>
                <ChevronRight className={`transition-transform ${activeTab === vehicle.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} size={20} />
              </button>
            ))}
          </div>

          {/* Featured Car Display */}
          <div className="w-full lg:w-2/3 flex flex-col relative h-[500px] overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-950 group">
            {/* Image (With View Transition like effect via key) */}
            <div className="absolute inset-0">
              <img 
                key={activeCar.id}
                src={activeCar.image} 
                alt={activeCar.name} 
                className="w-full h-full object-cover animate-fade-in-up" 
                style={{ animationDuration: '0.6s' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative mt-auto p-8 lg:p-10 text-white w-full animate-slideUp">
              <div className="flex items-center gap-3 mb-4">
                <span className="glass-light bg-white/20 text-white border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 text-[11px] font-bold">
                  {activeCar.seatCount} {t('fleet.seats')}
                </span>
                <span className="glass-light bg-gold-400 text-gray-900 border-gold-400/20 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
                  Premium
                </span>
              </div>
              
              <h3 className="font-display text-4xl font-black mb-2">{activeCar.name}</h3>
              <p className="text-gray-300 max-w-lg mb-6">{activeCar.desc}</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                {activeCar.featureKeys.map((key, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                    <Check size={16} className="text-gold-400" />
                    {t(key)}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => onOpenBooking(activeCar.name)}
                className="inline-flex items-center justify-center min-h-[48px] rounded-full bg-gold-400 px-8 py-3 text-sm font-bold text-gray-900 transition-transform hover:scale-105 hover:bg-gold-300"
              >
                {t('fleet.book')}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
