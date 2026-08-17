import { useEffect, useState } from 'react';

type ABVariant = 'B' | 'C';

const AB_STORAGE_KEY = 'ab_variant';

export const getABVariant = (): ABVariant | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AB_STORAGE_KEY);
  // Only accept 'B' or 'C' as valid - 'A' is from old test and will be reassigned
  if (stored === 'B' || stored === 'C') return stored;
  return null;
};

export const setABVariant = (variant: ABVariant): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AB_STORAGE_KEY, variant);
};

export const getOrAssignVariant = (): ABVariant => {
  const existing = getABVariant();
  if (existing) return existing;
  
  // 50/50 split between /a (variant B) and /b (variant C)
  const variant: ABVariant = Math.random() < 0.5 ? 'B' : 'C';
  setABVariant(variant);
  return variant;
};

export const useABTest = () => {
  const [variant, setVariant] = useState<ABVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const assignedVariant = getOrAssignVariant();
    setVariant(assignedVariant);
    setIsLoading(false);
  }, []);

  return { variant, isLoading };
};
