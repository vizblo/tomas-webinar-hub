# Base44 Dev Environment

## Stack
Vite + React + TypeScript frontend (Lovable-generated landing page for "Tomas Lydahl Webinar").
No backend service in this repo — it talks to a **hosted** Supabase project at runtime.

## Running
```sh
docker compose -f docker-compose.base44.yml up -d
```
- Web entry point: host port 3000 → container Vite dev server on 8080.
- `node:22` base image, source bind-mounted at `/app`; `npm install` runs on container start, then `npm run dev`.
- Live reload via Vite HMR (polling enabled for bind mounts).

## Env / Secrets
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` are committed in `.env` (public/publishable Supabase keys — safe for a frontend). No user-supplied secrets required to boot.
- Supabase Edge Functions (`register-contact`, `assign-variant`, `register-repris`, `admin-stats`) live in `supabase/functions/` and run on the hosted Supabase project, not locally.

## Notes
- `vite.config.ts` sets `server.allowedHosts: true` so the preview's external proxy hostname is accepted (Vite otherwise 403s unknown hosts).
- Tests: `npm test` (vitest).
