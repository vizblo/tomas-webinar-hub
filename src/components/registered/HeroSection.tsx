import { useEffect, useState } from 'react';
import { getRegistrationData } from '@/lib/registrationData';

const HeroSection = () => {
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    const data = getRegistrationData();
    if (data?.firstName) {
      setFirstName(data.firstName.trim().toUpperCase());
    }
  }, []);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-5 sm:pt-6 md:pt-8 pb-3 md:pb-4">
      <h1
        className="font-bold text-white leading-[1.15] text-center mb-3"
        style={{
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          fontSize: 'clamp(1.125rem, 2.2vw, 1.625rem)',
        }}
      >
        <span className="block">
          CONGRATS{firstName ? ` ${firstName}` : ''}, YOU'RE REGISTERED FOR
        </span>
        <span className="block sm:whitespace-nowrap">
          SUNDAY, AUGUST 9TH @ 3:00 PM ET
        </span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-white/85 text-center font-medium leading-snug max-w-[640px] mx-auto">
        Watch The Video Below To Confirm Your Registration & Scroll Down On This Page
      </p>
    </div>
  );
};

export default HeroSection;
