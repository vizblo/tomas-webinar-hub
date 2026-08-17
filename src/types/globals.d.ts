export {};

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    whop?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      setScope: (...ids: string[]) => void;
      scope: (...ids: string[]) => { track: (event: string, params?: Record<string, unknown>) => void };
    };
  }
}
