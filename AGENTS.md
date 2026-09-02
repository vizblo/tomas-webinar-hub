# Base44 Setup Notes

## Project
Vite + React + TypeScript landing page (built with Lovable) for a Tomas Lydahl webinar.
Frontend-only; connects to a **remote Supabase** instance for registrations, split-testing, and tracking.

## Running
- `docker compose -f docker-compose.base44.yml up -d` — starts Vite dev server on host port 3000 (container port 8080).
- Source is bind-mounted; edits hot-reload via Vite HMR.
- `npm install` runs automatically on container start; `node_modules` is in a named volume to persist.

## Environment
- Supabase credentials (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`) are in the repo-root `.env` — these are **publishable** (public) keys, not secrets. No external secrets required.
- `vite.config.ts` has `allowedHosts: true` so the preview's external hostname is accepted.

## Key routes
`/` (split-test root), `/a`, `/b`, `/replay`, `/confirmed`, `/tack`, `/bokad`, `/admin/optin`, `/privacy`, `/terms`

## Quirks
- `src/index.css`: the Google Fonts `@import` must precede `@tailwind` directives (CSS spec requires `@import` first).
- Supabase Edge Functions live in `supabase/functions/` but run on the remote Supabase project, not locally.
