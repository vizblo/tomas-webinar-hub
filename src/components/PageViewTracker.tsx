import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/tracking';

const TRACKED_PATHS = ['/a', '/b', '/replay', '/confirmed'];

// Spårar endast de porterade split-test-sidorna. Övriga sidor spåras
// av usePageViewTracking (src/lib/analytics.ts).
export default function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!TRACKED_PATHS.includes(location.pathname)) return;
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
