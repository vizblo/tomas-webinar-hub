// UTM Parameter Tracking Utilities

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
}

const UTM_STORAGE_KEY = 'honestbrands_utm_params';
const UTM_COOKIE_KEY = 'honestbrands_utm';
const UTM_COOKIE_MAX_AGE_DAYS = 90;

/**
 * Extracts UTM parameters from current URL
 */
export const getUTMFromURL = (): UTMParameters => {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_id: params.get('utm_id') || undefined,
  };
};

const hasAnyUTM = (params: UTMParameters): boolean =>
  Object.values(params).some((value) => value !== undefined && value !== '');

const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
};

const writeCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') return;
  try {
    const maxAge = days * 24 * 60 * 60;
    // Use root path + first-party cookie. SameSite=Lax so it survives top-level
    // navigations (Meta in-app browser → Safari/Chrome handoffs are top-level).
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
};

const safeRead = (storage: Storage | null, key: string): UTMParameters => {
  if (!storage) return {};
  try {
    const saved = storage.getItem(key);
    return saved ? (JSON.parse(saved) as UTMParameters) : {};
  } catch {
    return {};
  }
};

const safeWrite = (storage: Storage | null, key: string, value: string): void => {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    /* quota / privacy mode — ignore */
  }
};

/**
 * Saves UTM parameters to sessionStorage, localStorage, and a first-party cookie.
 * Multiple stores so values survive new tabs and in-app-browser → native-browser
 * handoffs in the same browser context.
 */
export const saveUTMParameters = (params: UTMParameters): void => {
  if (!hasAnyUTM(params)) return;

  const serialized = JSON.stringify(params);
  safeWrite(typeof sessionStorage !== 'undefined' ? sessionStorage : null, UTM_STORAGE_KEY, serialized);
  safeWrite(typeof localStorage !== 'undefined' ? localStorage : null, UTM_STORAGE_KEY, serialized);
  writeCookie(UTM_COOKIE_KEY, serialized, UTM_COOKIE_MAX_AGE_DAYS);
};

/**
 * Retrieves saved UTM parameters.
 * Priority: sessionStorage → localStorage → first-party cookie.
 */
export const getSavedUTMParameters = (): UTMParameters => {
  const fromSession = safeRead(typeof sessionStorage !== 'undefined' ? sessionStorage : null, UTM_STORAGE_KEY);
  if (hasAnyUTM(fromSession)) return fromSession;

  const fromLocal = safeRead(typeof localStorage !== 'undefined' ? localStorage : null, UTM_STORAGE_KEY);
  if (hasAnyUTM(fromLocal)) return fromLocal;

  const cookieRaw = readCookie(UTM_COOKIE_KEY);
  if (cookieRaw) {
    try {
      const fromCookie = JSON.parse(cookieRaw) as UTMParameters;
      if (hasAnyUTM(fromCookie)) return fromCookie;
    } catch {
      /* ignore */
    }
  }

  return {};
};

/**
 * Gets current UTM parameters (from URL or storage)
 * Priority: URL params > sessionStorage > localStorage > cookie
 */
export const getCurrentUTMParameters = (): UTMParameters => {
  const urlParams = getUTMFromURL();
  if (hasAnyUTM(urlParams)) {
    saveUTMParameters(urlParams);
    return urlParams;
  }

  return getSavedUTMParameters();
};

/**
 * Clears stored UTM parameters from every store.
 */
export const clearUTMParameters = (): void => {
  try { sessionStorage.removeItem(UTM_STORAGE_KEY); } catch { /* ignore */ }
  try { localStorage.removeItem(UTM_STORAGE_KEY); } catch { /* ignore */ }
  if (typeof document !== 'undefined') {
    document.cookie = `${UTM_COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
};

/**
 * Pushes event to GTM dataLayer with UTM parameters
 */
export const pushToDataLayer = (eventName: string, data: Record<string, any> = {}): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    const utmParams = getCurrentUTMParameters();
    
    window.dataLayer.push({
      event: eventName,
      ...data,
      ...utmParams,
    });
    
    console.log('DataLayer event pushed:', { event: eventName, ...data, ...utmParams });
  }
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
