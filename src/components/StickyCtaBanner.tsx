import { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import { useRegistrationModal } from '@/hooks/useRegistrationModal';
import { useTicketsRemaining } from '@/hooks/useTicketsRemaining';

interface StickyCtaBannerProps {
  ctaLabel?: string;
}

export const StickyCtaBanner = ({
  ctaLabel = 'SÄKRA MIN PLATS',
}: StickyCtaBannerProps) => {
  const { openRegistrationModal } = useRegistrationModal();
  const [isVisible, setIsVisible] = useState(false);
  const spotsRemaining = useTicketsRemaining();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="sticky-cta-banner"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.4)',
        boxShadow: '0 -8px 40px rgba(212, 175, 55, 0.25), 0 -2px 20px rgba(0, 0, 0, 0.5)',
        padding: '16px 20px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Urgency text */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}>
            🔥 Endast{' '}
            <strong style={{
              color: '#D4AF37',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
              fontWeight: 800,
            }}>
              {spotsRemaining}
            </strong>{' '}
            kostnadsfria platser kvar
          </span>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            Säkra din plats nu
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={openRegistrationModal}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            maxWidth: '400px',
            height: '56px',
            borderRadius: '12px',
            background: 'var(--ctaGrad)',
            color: 'var(--ctaText)',
            border: '2px solid rgba(0, 0, 0, 0.3)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 4px 16px rgba(212, 175, 55, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '0.02em',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(212, 175, 55, 0.8), 0 10px 40px rgba(212, 175, 55, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3), 0 4px 16px rgba(212, 175, 55, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.2)';
          }}
        >
          <Ticket size={20} color="#FFFFFF" />
          {ctaLabel}
        </button>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .sticky-cta-banner {
            padding: 12px 16px !important;
          }
          .sticky-cta-banner button {
            height: 50px !important;
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};
