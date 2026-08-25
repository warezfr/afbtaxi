# Plan d'Amélioration Technique et Stratégie SEO (AFB Taxis)

Suite à l'analyse de votre code (`mainv2emergent`) et en appliquant les standards du web moderne (*Modern Web Guidance*), voici l'audit et le plan d'action complet pour positionner AFB Taxis comme le leader sur Fontainebleau et sa région.

## 1. Analyse de l'existant
**Les excellents points (Déjà en place) :**
- Votre fichier `index.html` possède déjà des métadonnées statiques d'une qualité rare : intégration de `Schema.org` (LocalBusiness, TaxiService), balises de géolocalisation (`ICBM`), et OpenGraph. 
- L'infrastructure Vercel garantit des temps de réponse serveurs ultra-rapides.

**Le point faible principal :**
- Le site est une **"Single Page Application" (SPA)** gérée par Vite. C'est parfait pour l'interactivité, mais tout le contenu est chargé sur une seule URL racine. En SEO, pour cibler plusieurs requêtes différentes, il faut idéalement **une URL par service**.

---

## 2. Plan d'Amélioration Technique du Site (Standards Modernes)

Conformément aux dernières directives web (optimisation *Core Web Vitals*), voici ce que nous devons implémenter dans votre code React :

*   **Performance (LCP - Largest Contentful Paint) :**
    *   L'image d'accueil (le "Hero") doit comporter l'attribut `fetchpriority="high"`. C'est critique pour indiquer à Google que cette image doit charger avant le reste, ce qui booste votre note PageSpeed.
*   **Optimisation du Rendu (INP) :**
    *   Appliquer la règle CSS moderne `content-visibility: auto` sur les sections situées sous la ligne de flottaison (ex: section *Flotte*, *Tarifs*, *Contact*). Cela empêchera le navigateur de calculer ces blocs tant que le client ne scrolle pas, rendant le site instantané.
*   **Architecture HTML Sémantique :**
    *   Les fenêtres modales de réservation ou de connexion doivent utiliser la nouvelle balise HTML5 native `<dialog>` plutôt que des balises `<div>`, afin d'améliorer l'accessibilité sur mobile et lecteurs d'écran.

---

## 3. Stratégie SEO & Étude des Mots-Clés

Pour s'imposer en Île-de-France (et surtout dans le 77), la sémantique de la page doit viser l'intention locale exacte du client.

### A. Les mots-clés prioritaires à cibler
*   **Localisation Ultra-Ciblée (L'urgence) :** 
    *   *taxi fontainebleau*, *taxi gare de fontainebleau avon*, *chauffeur privé fontainebleau*.
*   **Liaisons Aéroports & Gares (La rentabilité) :** 
    *   *transfert fontainebleau orly*, *taxi fontainebleau cdg*, *navette roissy fontainebleau*, *taxi fontainebleau gare de lyon*.
*   **Élargissement (Régional & Spécifique) :** 
    *   *taxi seine et marne*, *vtc sud ile de france*, *taxi conventionné cpam 77*, *taxi van 7 places fontainebleau*.

### B. Plan d'Action On-Page (Architecture du Site)
Actuellement, tout le site est sur la même page. Pour exploser en SEO, il va falloir créer des "cônes d'aspiration" de trafic.

1.  **Créer un routeur (Multi-pages) :** Nous devons intégrer `react-router` pour créer des URL dédiées qui ranckeront indépendamment sur Google :
    *   `www.afbtaxis.com/transfert-aeroport-orly`
    *   `www.afbtaxis.com/taxi-gare-fontainebleau-avon`
    *   `www.afbtaxis.com/transport-sanitaire-conventionne-77`
2.  **Optimisation des balises dynamiques :** Utiliser une librairie comme `react-helmet-async` pour que chaque nouvelle page ait un `<title>` et une `<meta description>` unique.
3.  **Contenu de "Réassurance locale" :** Mentionner des points d'intérêts exacts dans vos textes (ex: *INSEAD*, *Château de Fontainebleau*, *Gare d'Avon*, *Hôpital de Melun*) car Google analyse le champ lexical local.

### C. Plan d'Action Off-Page (À faire vous-même)
1.  **Google Business Profile :** C'est le nerf de la guerre. Votre fiche doit inclure des photos réelles de votre véhicule (Mercedes), des mots-clés dans les réponses aux avis, et pointer vers `afbtaxis.com`.
2.  **Backlinks locaux :** Inscrivez le site sur le registre de l'Office de Tourisme du Pays de Fontainebleau et sur les annuaires des entreprises de Seine-et-Marne.

---

## 4. Évolution Vercel recommandée (Le "Game Changer")
À moyen terme, le choix stratégique le plus fort pour votre SEO serait de **migrer l'architecture Vite vers Next.js**. 
Vercel est le créateur de Next.js. Si nous migrons votre code vers Next.js, le site sera généré côté serveur (SSR/SSG). Au lieu que Google doive exécuter votre Javascript pour comprendre votre site, il recevra des pages HTML instantanées, parfaites, et hyper-optimisées. C'est la garantie de dominer les concurrents locaux qui ont souvent de vieux sites WordPress très lents.

> Voulez-vous que l'on commence tout de suite l'amélioration des **performances techniques (LCP/Visibilité)** dans votre code actuel, ou préférez-vous qu'on attaque directement la mise en place d'un **routeur multi-pages** pour le SEO ?
