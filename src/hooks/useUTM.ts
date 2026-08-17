import { useEffect, useState } from 'react';
import { getCurrentUTMParameters, saveUTMParameters, getUTMFromURL, UTMParameters } from '@/lib/utm';

/**
 * Hook to capture and access UTM parameters throughout the app
 */
export const useUTM = () => {
  const [utmParams, setUtmParams] = useState<UTMParameters>({});

  useEffect(() => {
    // Capture UTM parameters from URL on mount
    const urlParams = getUTMFromURL();
    const hasURLParams = Object.values(urlParams).some(value => value !== undefined);
    
    if (hasURLParams) {
      saveUTMParameters(urlParams);
      setUtmParams(urlParams);
    } else {
      // Load from storage if no URL params
      setUtmParams(getCurrentUTMParameters());
    }
  }, []);

  return utmParams;
};
