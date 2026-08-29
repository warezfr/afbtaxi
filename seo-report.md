# SEO audit — https://www.afbtaxis.com

_Generated 2026-08-29T13:19:16.570Z · 22 pages fetched · seo-audit 1.0.0_

## SEO Score: 84/100

22 pages scored. Site-level penalty: 3.

| Severity | Count | Meaning |
|---|---:|---|
| P1 | 0 | Crawl or index blocker — the page may not be indexed at all |
| P2 | 20 | Indexed but misrepresented |
| P3 | 81 | Hygiene |

Caveat: this is a technical SEO readiness score, not a ranking or traffic guarantee. Off-page factors — backlinks, content quality, competition — are out of scope and are not measured here.

## Findings

### P1 — blockers

None.

### P2 — misrepresentation (20)

- **No crawlable internal `<a href>` links. Router `onClick` handlers do not build a link graph.**
  - `/blog/chauffeur-prive-fontainebleau-paris-aller-retour`, `/blog/chateau-de-vaux-le-vicomte-visite`, `/blog/circuits-touristiques-sur-mesure-seine-et-marne`, `/blog/grand-parquet-fontainebleau-evenements-equestres`, `/blog/golf-fontainebleau-parcours-exception`, `/blog/guide-pratique-insead-fontainebleau` _+14 more_
  - Rule: `docs/04`

### P3 — hygiene (81)

- **robots.txt takes no explicit position on AI crawlers. Training, AI-search and user-triggered fetching are three different decisions; defaulting silently is not one of them.**
  - `/robots.txt`
  - Rule: `docs/10`
- **http:// answers 308; a permanent move should be 301.**
  - `http://`
  - Rule: `docs/01`
- **`<priority>` / `<changefreq>` are ignored by Google. They only make the file bigger.**
  - `https://www.afbtaxis.com/sitemap.xml`
  - Rule: `docs/06`
- **Canonical points elsewhere (https://www.afbtaxis.com/). Intentional for a variant; a bug if this page should stand on its own.**
  - `/blog`, `/blog/chauffeur-prive-fontainebleau-paris-aller-retour`, `/blog/chateau-de-vaux-le-vicomte-visite`, `/blog/circuits-touristiques-sur-mesure-seine-et-marne`, `/blog/grand-parquet-fontainebleau-evenements-equestres`, `/blog/golf-fontainebleau-parcours-exception` _+15 more_
  - Rule: `docs/01`
- **Meta description is 219 characters and will be cut.**
  - `/blog`, `/`
  - Rule: `docs/01`
- **No `<h1>`.**
  - `/blog`, `/`, `/blog/chauffeur-prive-fontainebleau-paris-aller-retour`, `/blog/chateau-de-vaux-le-vicomte-visite`, `/blog/circuits-touristiques-sur-mesure-seine-et-marne`, `/blog/grand-parquet-fontainebleau-evenements-equestres` _+16 more_
  - Rule: `docs/04`
- **A JSON-LD node has no `@type`.**
  - `/blog`, `/`, `/blog/chauffeur-prive-fontainebleau-paris-aller-retour`, `/blog/chateau-de-vaux-le-vicomte-visite`, `/blog/circuits-touristiques-sur-mesure-seine-et-marne`, `/blog/grand-parquet-fontainebleau-evenements-equestres` _+16 more_
  - Rule: `docs/08`
- **Title is 73 characters; the title link is truncated to the device width (~60 is the practical target).**
  - `/blog/chauffeur-prive-fontainebleau-paris-aller-retour`, `/blog/chateau-de-vaux-le-vicomte-visite`, `/blog/circuits-touristiques-sur-mesure-seine-et-marne`, `/blog/golf-fontainebleau-parcours-exception`, `/blog/guide-pratique-insead-fontainebleau`, `/blog/que-faire-fontainebleau-quand-il-pleut` _+5 more_
  - Rule: `docs/01`


## Pages fetched

- `/` — 200 — AFB Taxis — Taxi Fontainebleau | Transfert Aéroport Orly CDG | 7j/7
- `/blog` — 200 — Fontainebleau Magazine - Blog AFB Taxis
- `/blog/chateau-de-vaux-le-vicomte-visite` — 200 — Visite du Château de Vaux-le-Vicomte : Le chef d'œuvre qui rendit jalo
- `/blog/chauffeur-prive-fontainebleau-paris-aller-retour` — 200 — Trajet Fontainebleau - Paris : Réservez votre Chauffeur Privé | AFB Ta
- `/blog/circuits-touristiques-sur-mesure-seine-et-marne` — 200 — Circuits Touristiques Privés : La Seine-et-Marne sur mesure | AFB Taxi
- `/blog/golf-fontainebleau-parcours-exception` — 200 — Le Golf de Fontainebleau : Jouer sur l'un des plus beaux parcours d'Eu
- `/blog/grand-parquet-fontainebleau-evenements-equestres` — 200 — Le Grand Parquet : Haut Lieu de l'Équitation en France | AFB Taxis
- `/blog/guide-pratique-insead-fontainebleau` — 200 — INSEAD Fontainebleau : Vie Locale et Solutions de Transports | AFB Tax
- `/blog/hotels-de-luxe-fontainebleau-ou-dormir` — 200 — Hôtels de Luxe à Fontainebleau : Où Séjourner ? | AFB Taxis
- `/blog/location-van-7-places-chauffeur-fontainebleau` — 200 — Location de Van 7 places avec chauffeur en Seine-et-Marne | AFB Taxis
- `/blog/meilleurs-restaurants-gastronomiques-fontainebleau` — 200 — Les Meilleurs Restaurants Gastronomiques à Fontainebleau | AFB Taxis
- `/blog/milly-la-foret-le-cyclop-cocteau` — 200 — Milly-la-Forêt : Entre l'univers de Cocteau et la démesure du Cyclop |
- `/blog/moret-sur-loing-cite-medievale-impressionniste` — 200 — Moret-sur-Loing : Cité Médiévale et Impressionnisme | AFB Taxis
- `/blog/que-faire-fontainebleau-quand-il-pleut` — 200 — Que faire à Fontainebleau quand il pleut ? 5 idées d'activités | AFB T
- `/blog/randonnee-escalade-foret-fontainebleau` — 200 — Forêt de Fontainebleau : Randonnées et Escalade de Bloc | AFB Taxis
- `/blog/seminaire-entreprise-seine-et-marne` — 200 — Tourisme d'Affaires : Organiser un Séminaire en Seine-et-Marne | AFB T
- `/blog/taxi-gare-de-lyon-fontainebleau` — 200 — De la Gare de Lyon à Fontainebleau : Le trajet sans stress | AFB Taxis
- `/blog/transfert-aeroport-orly-roissy-cdg-fontainebleau` — 200 — Transferts Aéroport : Taxi et VTC entre Fontainebleau, Orly et CDG | A
- `/blog/transport-medical-vsl-cpam-seine-et-marne` — 200 — Transport Médicalisé et Taxi Conventionné CPAM dans le 77 | AFB Taxis
- `/blog/visiter-barbizon-village-des-peintres` — 200 — Découvrir Barbizon, le légendaire village des Peintres | AFB Taxis
- `/blog/visiter-chateau-fontainebleau-guide` — 200 — Visiter le Château de Fontainebleau : Guide Complet et Transports | AF
- `/blog/vtc-mariage-seine-et-marne` — 200 — Chauffeur Privé pour Mariage : Le luxe pour le plus beau jour de votre
