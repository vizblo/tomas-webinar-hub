import { useEffect, useState } from 'react';
import Index from './Index';
import IndexB from './IndexB';
import { getStoredVariant, resolveVariant } from '@/lib/analytics';

// "/" splittar trafiken 50/50 mellan variant A (Index) och B (IndexB).
// Varianten är sticky per besökare (localStorage).
export default function SplitRoot() {
  const [variant, setVariant] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('tl_variant');
      return stored === 'a' || stored === 'b' ? stored : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (variant) return;
    let cancelled = false;
    resolveVariant('/').then((v) => {
      if (!cancelled) setVariant(v);
    });
    return () => { cancelled = true; };
  }, [variant]);

  if (!variant) {
    return <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }} />;
  }

  return variant === 'b' ? <IndexB /> : <Index />;
}

export { getStoredVariant };
