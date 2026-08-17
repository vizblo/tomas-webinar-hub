import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

export function usePageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    // Philip-sidorna (/a, /b, ...) spårar själva via src/lib/tracking.ts
    if (['/a', '/b', '/replay', '/confirmed'].includes(location.pathname)) return;
    trackPageView(location.pathname);
  }, [location.pathname]);
}
