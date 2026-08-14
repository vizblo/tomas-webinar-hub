import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'tl_session_id';
const VARIANT_KEY = 'tl_variant';

export function variantFromPath(path: string): string {
  return path === '/b' || path.startsWith('/b/') ? 'b' : 'a';
}

export function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

// Assigns a sticky variant per visitor.
// - Landing on /b always forces variant "b".
// - Landing on / gets a random 50/50 assignment, remembered per visitor.
export function assignVariant(path?: string): string {
  const p = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  try {
    // Crawlers always see variant A so indexing stays stable.
    if (
      typeof navigator !== 'undefined' &&
      // @ts-ignore
      (navigator.webdriver || /bot|crawl|spider|slurp/i.test(navigator.userAgent))
    ) {
      return variantFromPath(p);
    }
    if (variantFromPath(p) === 'b') {
      localStorage.setItem(VARIANT_KEY, 'b');
      return 'b';
    }
    const stored = localStorage.getItem(VARIANT_KEY);
    if (stored === 'a' || stored === 'b') return stored;
    const v = Math.random() < 0.5 ? 'a' : 'b';
    localStorage.setItem(VARIANT_KEY, v);
    return v;
  } catch {
    return variantFromPath(p);
  }
}

// Server-side balanced assignment: pushes variant B until it has as many
// visitors as A, then falls back to a 50/50 split. Sticky per visitor.
export async function resolveVariant(path?: string): Promise<string> {
  const p = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  try {
    if (
      typeof navigator !== 'undefined' &&
      // @ts-ignore
      (navigator.webdriver || /bot|crawl|spider|slurp/i.test(navigator.userAgent))
    ) {
      return variantFromPath(p);
    }
    if (variantFromPath(p) === 'b') {
      localStorage.setItem(VARIANT_KEY, 'b');
      return 'b';
    }
    const stored = localStorage.getItem(VARIANT_KEY);
    if (stored === 'a' || stored === 'b') return stored;

    const { data } = await supabase.functions.invoke('assign-variant', { body: {} });
    const v = (data as any)?.variant === 'b' ? 'b' : (data as any)?.variant === 'a' ? 'a' : null;
    const chosen = v ?? (Math.random() < 0.5 ? 'a' : 'b');
    localStorage.setItem(VARIANT_KEY, chosen);
    return chosen;
  } catch {
    return assignVariant(p);
  }
}

export function getStoredVariant(path?: string): string {
  try {
    const stored = localStorage.getItem(VARIANT_KEY);
    if (stored) return stored;
  } catch { /* ignore */ }
  return variantFromPath(path ?? (typeof window !== 'undefined' ? window.location.pathname : '/'));
}

function parseUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get('utm_source'),
      utm_medium: p.get('utm_medium'),
      utm_campaign: p.get('utm_campaign'),
      utm_content: p.get('utm_content'),
      utm_term: p.get('utm_term'),
    };
  } catch {
    return {};
  }
}

export async function trackPageView(path: string) {
  try {
    const isBot =
      typeof navigator !== 'undefined' &&
      // @ts-ignore
      (navigator.webdriver || /bot|crawl|spider|slurp/i.test(navigator.userAgent));
    await supabase.from('page_views').insert({
      path,
      session_id: getSessionId(),
      referrer: document.referrer || null,
      is_bot: !!isBot,
      variant: getStoredVariant(path),
      ...parseUtm(),
    });
  } catch (e) {
    console.error('trackPageView failed', e);
  }
}

export async function trackRegistration(args: {
  email: string;
  first_name?: string;
  phone?: string;
  landing_path?: string;
  utm?: Record<string, string | undefined>;
}) {
  try {
    await supabase.from('registrations').insert({
      email: args.email,
      first_name: args.first_name ?? null,
      phone: args.phone ?? null,
      session_id: getSessionId(),
      landing_path: args.landing_path ?? null,
      variant: getStoredVariant(args.landing_path),
      utm_source: args.utm?.utm_source ?? null,
      utm_medium: args.utm?.utm_medium ?? null,
      utm_campaign: args.utm?.utm_campaign ?? null,
      utm_content: args.utm?.utm_content ?? null,
      utm_term: args.utm?.utm_term ?? null,
    });
  } catch (e) {
    console.error('trackRegistration failed', e);
  }
}
