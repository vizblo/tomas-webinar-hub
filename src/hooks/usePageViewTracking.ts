import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

export function usePageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    trackPageView(location.pathname);
  }, [location.pathname]);
}
