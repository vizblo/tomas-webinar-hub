import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveVariant, trackPageView } from '@/lib/analytics';

export function usePageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    let cancelled = false;
    resolveVariant(location.pathname).then(() => {
      if (!cancelled) trackPageView(location.pathname);
    });
    return () => { cancelled = true; };
  }, [location.pathname]);
}
