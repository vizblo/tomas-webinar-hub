import { useEffect } from 'react';

const SplitTestB = () => {
  // Redirect all /b traffic to /a while preserving UTM parameters
  useEffect(() => {
    window.location.replace('/a' + window.location.search);
  }, []);

  // Return null - redirect will happen immediately
  return null;
};

export default SplitTestB;