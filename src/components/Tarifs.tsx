import { TARIFS } from '@/lib/constants';

export function Tarifs() {
  return (
    <section id="tarifs" className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-yellow-600">
            Transparence
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-950 sm:text-4xl">
            Tarifs Indicatifs
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-neutral-600">
            Estimations basées sur les tarifs départementaux de Seine-et-Marne
            (77)
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-950">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Trajet
                </th>
                <th className="hidden px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-400 sm:table-cell">
                  Distance
                </th>
                <th className="hidden px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-neutral-400 sm:table-cell">
                  Durée
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Prix estimé
                </th>
              </tr>
            </thead>
            <tbody>
              {TARIFS.map((tarif, i) => (
                <tr
                  key={tarif.route}
                  className={`border-b border-neutral-100 transition-colors hover:bg-yellow-50 ${
                    i % 2 === 1 ? 'bg-neutral-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-neutral-950">
                    {tarif.route}
                  </td>
                  <td className="hidden px-6 py-4 text-neutral-600 sm:table-cell">
                    {tarif.distance}
                  </td>
                  <td className="hidden px-6 py-4 text-neutral-600 sm:table-cell">
                    {tarif.duration}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-950">
                    {tarif.priceMin} – {tarif.priceMax}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600">
          <p>
            <strong className="text-neutral-950">Prise en charge :</strong>{' '}
            3,25 € —{' '}
            <strong className="text-neutral-950">
              Tarif km aller-retour :
            </strong>{' '}
            0,98 € (jour) / 1,33 € (nuit &amp; dimanche)
          </p>
          <p className="mt-2">
            Ces tarifs sont fournis à titre indicatif. Devis gratuit sur mesure
            — contactez-nous pour obtenir le prix exact de votre trajet.
          </p>
        </div>
      </div>
    </section>
  );
}
