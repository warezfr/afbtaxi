import { COMPANY } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400">
                <span className="text-base font-black text-ink">A</span>
              </div>
              <span className="text-lg font-black text-white">AFB<span className="text-gold-400">.</span>Taxis</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Service de taxi premium à Fontainebleau depuis 2004. Transferts aéroports, gares et courses locales.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              <a href="#services" className="text-sm text-neutral-500 transition-colors hover:text-white">Services</a>
              <a href="#flotte" className="text-sm text-neutral-500 transition-colors hover:text-white">Flotte</a>
              <a href="#tarifs" className="text-sm text-neutral-500 transition-colors hover:text-white">Tarifs</a>
              <a href="#contact" className="text-sm text-neutral-500 transition-colors hover:text-white">Contact</a>
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-400">Informations</p>
            <div className="space-y-2 text-sm text-neutral-500">
              <p>SIRET : {COMPANY.siret}</p>
              <p>Forme juridique : {COMPANY.legalForm}</p>
              <p>Stationnement : {COMPANY.stationnement}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-neutral-600">
            Taxi conventionné CPAM 77
          </p>
        </div>
      </div>
    </footer>
  );
}
