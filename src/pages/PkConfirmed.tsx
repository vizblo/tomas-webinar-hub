import { useEffect } from 'react';
import WarningBar from '@/components/registered/WarningBar';
import ProgressBar from '@/components/registered/ProgressBar';
import HeroSection from '@/components/registered/HeroSection';
import VideoContainer from '@/components/registered/VideoContainer';
import WhatsAppStep from '@/components/registered/WhatsAppStep';
import WhatsAppCalendarStep from '@/components/registered/WhatsAppCalendarStep';
import FAQStep from '@/components/registered/FAQStep';
import ClientInterviewsStep from '@/components/registered/ClientInterviewsStep';
import RegisteredStickyFooter from '@/components/registered/RegisteredStickyFooter';
import ClientWinsSection from '@/components/confirmed/ClientWinsSection';
import { getRegistrationData } from '@/lib/registrationData';


const Registered = () => {
  useEffect(() => {
    if (window.location.pathname !== '/registered') return;
    if (sessionStorage.getItem('lead_tracked')) return;
    if (typeof window.fbq === 'function') {
      const abVariant = localStorage.getItem('ab_variant') || 'unknown';
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'workshop_registration',
        ab_variant: abVariant,
      });
      sessionStorage.setItem('lead_tracked', 'true');
    }
  }, []);

  // Whop pixel: complete_registration (independent of the Meta pixel).
  useEffect(() => {
    if (window.location.pathname !== '/registered') return;
    if (sessionStorage.getItem('whop_registration_tracked')) return;
    if (!window.whop) return;

    const data = getRegistrationData();
    const fields: Record<string, unknown> = {};
    if (data?.email) fields.email = data.email;
    if (data?.firstName) fields.first_name = data.firstName;
    if (data?.lastName) fields.last_name = data.lastName;
    if (data?.firstName || data?.lastName) {
      fields.name = `${data?.firstName ?? ''} ${data?.lastName ?? ''}`.trim();
    }
    if (data?.phone) fields.phone = `${data.countryCode ?? ''}${data.phone}`;

    window.whop.track('complete_registration', fields);
    sessionStorage.setItem('whop_registration_tracked', 'true');
  }, []);


  return (
    <div className="min-h-screen bg-black pb-24">
      <WarningBar />
      <ProgressBar />
      <HeroSection />
      <VideoContainer />
      <WhatsAppStep />
      <WhatsAppCalendarStep />
      <FAQStep />
      <ClientInterviewsStep />
      <ClientWinsSection showStepPill={false} />
      <RegisteredStickyFooter />
    </div>
  );
};

export default Registered;
