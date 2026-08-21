import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const SPLIT_KEY = 'ol_split_target_v2';

type Target = '/a' | '/b';

const readStored = (): Target | null => {
  try {
    const stored = localStorage.getItem(SPLIT_KEY);
    return stored === '/a' || stored === '/b' ? stored : null;
  } catch {
    return null;
  }
};

const store = (t: Target) => {
  try {
    localStorage.setItem(SPLIT_KEY, t);
  } catch {
    /* ignore */
  }
};

// Server-styrd split: /b pushas till 100% tills den kommit ikapp /a, därefter 50/50.
export default function SplitTestRoot() {
  const [target, setTarget] = useState<Target | null>(readStored);

  useEffect(() => {
    if (target) return;
    let cancelled = false;
    (async () => {
      let next: Target = Math.random() < 0.5 ? '/a' : '/b';
      try {
        const { data } = await supabase.functions.invoke('assign-variant');
        const variant = (data as { variant?: string } | null)?.variant;
        if (variant === 'a' || variant === 'b') next = `/${variant}` as Target;
      } catch {
        /* fallback 50/50 */
      }
      if (cancelled) return;
      store(next);
      setTarget(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [target]);

  if (!target) return null;
  return <Navigate to={`${target}${window.location.search}`} replace />;
}
