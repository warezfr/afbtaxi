import { TARIFS } from '@/lib/constants';

export function Tarifs() {
  return (
    <section id="tarifs" className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-600">Tarifs participants</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-950 sm:text-4xl">Fontainebleau au meilleur tarif</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-neutral-600">Tarifs applicables pour un départ ou une arrivée à Fontainebleau. Les montants sont indiqués selon le véhicule et l’horaire.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-950">
                <th rowSpan={2} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-yellow-400">Destination</th>
                <th colSpan={2} className="border-l border-white/10 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white">Voiture</th>
                <th colSpan={2} className="border-l border-white/10 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white">Van</th>
              </tr>
              <tr className="bg-neutral-900 text-[11px] uppercase tracking-wider text-neutral-400">
                <th className="border-l border-white/10 px-4 py-2 text-right">Jour</th>
                <th className="px-4 py-2 text-right">Nuit</th>
                <th className="border-l border-white/10 px-4 py-2 text-right">Jour</th>
                <th className="px-4 py-2 text-right">Nuit</th>
              </tr>
            </thead>
            <tbody>
              {TARIFS.map((tarif, i) => (
                <tr key={tarif.route} className={`border-b border-neutral-100 transition-colors hover:bg-yellow-50 ${i % 2 === 1 ? 'bg-neutral-50/50' : ''}`}>
                  <td className="px-5 py-4 font-bold text-neutral-950">{tarif.route.replace('Fontainebleau ↔ ', '')}</td>
                  <td className="border-l border-neutral-100 px-4 py-4 text-right font-semibold text-neutral-950">{tarif.carDay}</td>
                  <td className="px-4 py-4 text-right font-semibold text-neutral-950">{tarif.carNight}</td>
                  <td className="border-l border-neutral-100 px-4 py-4 text-right font-semibold text-neutral-950">{tarif.vanDay}</td>
                  <td className="px-4 py-4 text-right font-semibold text-neutral-950">{tarif.vanNight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
            <p className="mb-3 font-bold text-neutral-950">Horaires</p>
            <p><strong className="text-neutral-950">Tarif jour :</strong> 08h30 à 18h15 en semaine</p>
            <p className="mt-1"><strong className="text-neutral-950">Tarif nuit :</strong> 18h15 à 08h30, dimanche et jours fériés</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
            <p className="mb-3 font-bold text-neutral-950">Suppléments</p>
            <ul className="space-y-1.5">
              <li>8 € après 15 min au-delà des 30 min gratuites aux aéroports</li>
              <li>8 € après 15 min au-delà des 15 min gratuites au départ de Fontainebleau</li>
              <li>20 € par dépose supplémentaire à Paris</li>
              <li>8 € par dépose supplémentaire à CDG ou stop supplémentaire sur Fontainebleau</li>
            </ul>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-neutral-600">Tarifs participants issus de la grille tarifaire fournie. Contactez-nous pour confirmer votre trajet.</p>
      </div>
    </section>
  );
}
