import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/tracking';

const TRACKED_PATHS = ['/a', '/b', '/replay', '/confirmed', '/tack'];

// Spårar split-test-sidorna (/ och /a) samt deras följdsidor.
export default function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!TRACKED_PATHS.includes(location.pathname)) return;
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
