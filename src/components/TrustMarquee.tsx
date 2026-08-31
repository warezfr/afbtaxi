export function TrustMarquee() {
  const partners = [
    "AÉROPORTS DE PARIS (ADP)",
    "CHÂTEAU DE FONTAINEBLEAU",
    "CPAM SEINE-ET-MARNE",
    "INSEAD BUSINESS SCHOOL",
    "HÔTELS & PALACES",
    "GARES SNCF"
  ];

  return (
    <div className="w-full bg-gray-50/50 dark:bg-gray-950/50 border-y border-gray-100 dark:border-gray-900 py-3 overflow-hidden flex items-center">
      <div className="flex w-[200%] animate-marquee opacity-60 dark:opacity-40 grayscale">
        {[...partners, ...partners, ...partners].map((partner, i) => (
          <div key={i} className="flex-1 flex items-center justify-center whitespace-nowrap px-8">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              {partner}
            </span>
            <span className="ml-8 h-1 w-1 rounded-full bg-gold-400 opacity-50"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
