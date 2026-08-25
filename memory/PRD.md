# PRD — AFB Taxis (afbtaxis.fr)

## Problem statement (original)
"améliore le design de ce site, et assure toi que la version mobile est parfaite. theme taxi, blocs bien travaillés, hero parfait"
+ Follow-up: user shared a reference design (easytaxi) — dark hero with car cut-out, wave transition to white, yellow benefits section — and asked to use BLACK fleet cars (not yellow) in the hero.

## User choices
- Body theme: "Moderne clair : blanc + jaune + gris, épuré et lumineux"
- Content: can be reworked/enriched if necessary
- Hero: agent's choice → then refined per reference image (dark hero, black fleet cars)

## Architecture / Stack
- Frontend-only Vite + React 18 + TypeScript + Tailwind, root at /app (NOT /app/frontend structure)
- Supabase for reservations + admin (#/admin) — .env has PLACEHOLDER credentials in preview (VITE_SUPABASE_URL/ANON_KEY). Real values are set on Vercel in production.
- Supervisor "frontend" launches vite on port 3000 via shim /app/frontend/package.json ("start": cd /app && yarn dev --host 0.0.0.0 --port 3000). vite.config.ts: allowedHosts true, hmr clientPort 443.
- i18n: FR/EN/AR(RTL)/ES in src/lib/i18n.tsx. External preview URL is behind Cloudflare challenge → test on http://localhost:3000.

## What's been implemented (June 2026)
- Full redesign: fonts Outfit (display) + Plus Jakarta Sans (body); yellow #FACC15 palette (tailwind gold-*), taxi-checker utility strips, dot-grid, scroll-reveal (IntersectionObserver in PublicPage).
- Hero: dark (#0a0a0a), black fleet slideshow (Mercedes Classe S / S W222 / Classe V) with dots + name, gradient edge-blend, yellow CTA + phone CTA, trust row (4.9 Google, CPAM 77, 24/7), SVG wave transition to white, floating stats card (Swiss strip), cities marquee.
- Navbar: dark-transparent on hero → white glass after 420px scroll; conditional colors; mobile: phone circle + menu; language switcher.
- Sections light: Services (6 cards: 1 yellow, 1 dark, medical highlighted), Fleet (5 white cards), Zones chips, Tarifs (dark-header table + checker strip, horiz scroll on mobile), Advantages (YELLOW section, white circle icons like reference), Contact (big phone banner + dark card), Footer light with checker bottom.
- Wizard modal restyled light, min date = today, try/catch on submit, graceful error (Supabase placeholder). AddressAutocomplete (Nominatim) light dropdown.
- data-testids across interactive elements. Fixes post-test: scroll-padding-top 5.5rem, hero H1 space, dot touch targets, footer bottom padding (WhatsApp float).
- Iteration 2 (June 2026): PriceEstimator.tsx in hero (destination select from official TARIFS grid + Voiture/Van + Jour/Nuit toggles → instant price → opens wizard with prefilled context); Tarifs mobile = stacked cards (table hidden <sm); Reviews.tsx carousel (#avis, 6 static Google-style reviews FR/EN — MOCKED content, not live Google API; auto-advance 6s, arrows, dots, responsive 1/2/3 per view) placed between Advantages and Contact. New i18n keys estimator.* and reviews.* in all 4 locales.

## Testing
- iteration_2.json: 100% frontend flows pass (localhost:3000). Supabase insert MOCKED/placeholder → intentional graceful error.

## Backlog / P1-P2
- P1: Real Supabase credentials in preview if user wants working reservations/admin
- P2: Live Google Reviews via Places API (current reviews are static/curated)
- P2: Locale-aware date/time picker in wizard; phone/email format validation
- P2: OG image (og-image.jpg referenced but not present), favicon (still vite.svg)
