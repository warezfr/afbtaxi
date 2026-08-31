# AFB Taxis

Site web professionnel pour [AFB Taxis](https://www.afbtaxis.com) — taxi et chauffeur privé à Fontainebleau et en Île-de-France.

## Stack

- **Vite 5** + **React 18** + **TypeScript** + **Tailwind CSS**
- Contenu blog : fichiers Markdown dans `content/blog/` (frontmatter YAML)
- CMS éditorial : [Decap CMS](https://decapcms.org/) sur `/admin` (auth GitHub via `api/auth`)
- Réservations : `api/send-reservation` (Nodemailer) + FormSubmit en secours
- Déploiement : **Vercel** (`dist/`)

## Développement

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run lint
npm run build      # génère le sitemap + build Vite + prérendu SEO
```

## Structure

```
src/           Composants React et pages (React Router)
content/blog/  Articles du magazine (source de vérité)
public/        Assets statiques, robots.txt, admin Decap
scripts/       generate-sitemap.js, prerender-seo.js (post-build)
api/           Fonctions serverless Vercel (réservation, auth CMS)
docs/          Charte graphique et notes internes
```

## Déploiement Vercel

1. Framework preset : **Vite**
2. Build command : `npm run build`
3. Output directory : `dist`
4. Variables d'environnement :
   - `SMTP_PASSWORD` — mot de passe SMTP pour `afb@afbtaxis.com` (envoi des réservations)

## SEO (optionnel)

Le dossier `.seo-prompt-master/` contient un workflow d'audit SEO avec outil CLI :

```bash
node .seo-prompt-master/tools/seo-audit.mjs --url https://www.afbtaxis.com --max 45 --md seo-report.md
```

Voir `AGENTS.md` pour l'activation automatique dans les agents IA.

## Charte graphique

Référence couleurs, typo et sections : `docs/design-guidelines.json`.
