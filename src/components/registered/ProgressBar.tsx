import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in container
    const fadeTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Animate progress
    const progressTimer = setTimeout(() => {
      setProgress(73);
    }, 800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  return (
    <div
      className={`max-w-[650px] mx-auto px-4 py-4 md:py-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
      }`}
    >
      <div
        className="relative h-4 sm:h-5 rounded-[20px] border border-gray-800 overflow-hidden"
        style={{
          background: '#000000',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
        }}
      >
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs sm:text-sm font-bold text-white">73%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
