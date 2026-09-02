# Base44 Dev Environment

## App Overview
Vite + React 18 + TypeScript SPA (originally built with Lovable). Marketing/landing pages for Tomas Lydahl webinars. Uses Supabase (edge functions + DB) for registrations and A/B split testing.

## Running the app
```bash
docker compose -f docker-compose.base44.yml up -d
```
- Vite dev server runs on port 8080 inside the container, mapped to host port 3000.
- Source is bind-mounted at `/app`; changes hot-reload automatically.
- `npm install --legacy-peer-deps` runs on container start (needed for peer dep conflicts).

## Key setup notes
- **Removed `lovable-tagger`**: The `componentTagger` plugin from `lovable-tagger` hijacks `react/jsx-dev-runtime` and creates a `window.sourceElementMap`, which intercepted DOM element creation and blocked Base44's preview click interactions (top bar click-to-select). It was removed from `vite.config.ts`. The package remains in `devDependencies` but is unused.
- **Vite `allowedHosts: true`**: Required so the preview's external hostname isn't rejected by Vite's host check.
- **Supabase credentials** are in the committed `.env` file (publishable keys, not secret). Vite loads them automatically.
- **SplitTestRoot redirect**: The `/` route redirects to `/a` or `/b` via `SplitTestRoot` (server-assigned A/B variant stored in localStorage). The Base44 editor shows `/` but the actual content renders on `/a` or `/b`.

## Routes
- `/` → SplitTestRoot → redirects to `/a` or `/b`
- `/a` → Index (variant A landing page)
- `/b` → PkIndexA (variant B landing page)
- `/tack` → ThankYou
- `/bokad` → Bokad (booked/registered)
- `/replay` → PkReplay
- `/confirmed` → PkConfirmed
- `/admin/optin` → PkAdminOptIn
- `/privacy`, `/terms` → legal pages

## CSS note
There's a benign Vite warning about `@import` order in the Tailwind CSS file (the Google Fonts `@import` comes after `@tailwind utilities`). It doesn't break anything.
