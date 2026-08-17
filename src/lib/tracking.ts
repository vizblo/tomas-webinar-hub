// Lightweight tracking helpers for the /admin/opt-in dashboard.
// - Assigns a stable session_id per visitor (localStorage, 90 days).
// - Derives the split-test variant from the landing path (a, b, or root).
// - Inserts a page_views row on each route visit.
// - Inserts a registrations row when a signup form is submitted.

import { supabase } from '@/integrations/supabase/client';
import { getCurrentUTMParameters } from '@/lib/utm';

const SESSION_KEY = 'ol_session_id';
const LANDING_KEY = 'ol_landing_path';
const VARIANT_KEY = 'ol_variant';
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 90; // 90 days

type Stored = { id: string; ts: number };

function readStoredSession(): Stored | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed?.id) return null;
    if (Date.now() - parsed.ts > SESSION_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  const existing = readStoredSession();
  if (existing) return existing.id;
  const id = (crypto?.randomUUID?.() ?? `s_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id, ts: Date.now() }));
  } catch {
    /* ignore */
  }
  return id;
}

function deriveVariantFromPath(pathname: string): string {
  // Split test only cares about the landing entry point.
  // /a → 'a' (Philip-sidan), / → 'b' (Tomas-sidan), övrigt → 'root'.
  if (pathname === '/a' || pathname.startsWith('/a/')) return 'a';
  if (pathname === '/') return 'b';
  return 'root';
}

export function getLandingPath(): string {
  if (typeof window === 'undefined') return '/';
  try {
    const stored = sessionStorage.getItem(LANDING_KEY);
    if (stored) return stored;
    const path = window.location.pathname || '/';
    sessionStorage.setItem(LANDING_KEY, path);
    return path;
  } catch {
    return window.location.pathname || '/';
  }
}

export function getVariant(): string {
  if (typeof window === 'undefined') return 'root';
  try {
    const stored = sessionStorage.getItem(VARIANT_KEY);
    if (stored) return stored;
    const v = deriveVariantFromPath(getLandingPath());
    sessionStorage.setItem(VARIANT_KEY, v);
    return v;
  } catch {
    return deriveVariantFromPath(window.location.pathname);
  }
}

function isLikelyBot(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /bot|crawler|spider|crawling|preview|lighthouse|headless/i.test(ua);
}

let lastLoggedPath = '';

export async function trackPageView(pathname: string): Promise<void> {
  if (typeof window === 'undefined') return;
  // Never log admin views.
  if (pathname.startsWith('/admin')) return;
  if (pathname === lastLoggedPath) return;
  lastLoggedPath = pathname;

  // Prime landing + variant on first visit.
  getLandingPath();
  const variant = getVariant();

  const utm = getCurrentUTMParameters();

  try {
    await supabase.from('page_views').insert({
      path: pathname,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
      utm_term: utm.utm_term ?? null,
      variant,
      is_bot: isLikelyBot(),
    });
  } catch (err) {
    console.error('page_view insert failed', err);
  }
}

export type RegistrationInsert = {
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  country_code?: string | null;
};

export function trackRegistration(data: RegistrationInsert): void {
  if (typeof window === 'undefined') return;
  const utm = getCurrentUTMParameters();
  // Fire-and-forget; do not block navigation.
  void supabase
    .from('registrations')
    .insert({
      email: data.email,
      first_name: data.first_name ?? null,
      last_name: data.last_name ?? null,
      phone: data.phone ?? null,
      country_code: data.country_code ?? null,
      session_id: getSessionId(),
      landing_path: getLandingPath(),
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
      utm_term: utm.utm_term ?? null,
      variant: getVariant(),
    })
    .then(({ error }) => {
      if (error) console.error('registration insert failed', error);
    });
}
