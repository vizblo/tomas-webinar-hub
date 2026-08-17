import { Ticket } from 'lucide-react';
import { useRegistrationModal } from '@/hooks/useRegistrationModal';

interface FreeGiftSectionProps {
  heading?: string;
  headingSuffix?: string;
  topText?: React.ReactNode;
  bottomText?: string;
  giftImage?: string;
  giftImageAlt?: string;
  ctaLabel?: string;
  ctaSubLabel?: string;
  ctaUrl?: string;
  onCtaClick?: (event: React.MouseEvent) => void;
}

export const FreeGiftSection = ({
  heading = 'Free Gift:',
  headingSuffix = 'Profitable Product Playbook',
  topText = "Inside, you'll find the exact step-by-step system our students are using to go from zero to their first profitable wholesale products.",
  bottomText = "By the end of this class, you'll get access to my unreleased Attention Reset Protocol — completely free.",
  giftImage,
  giftImageAlt = 'Free gift',
  ctaLabel = 'GET MY FREE TICKET',
  ctaSubLabel = 'Limited spots available',
  ctaUrl = '#register',
  onCtaClick,
}: FreeGiftSectionProps) => {
  const { openRegistrationModal } = useRegistrationModal();

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (onCtaClick) {
      onCtaClick(e);
    }
    
    // Open registration modal
    openRegistrationModal();
  };

  return (
    <section
      aria-labelledby="gift-title"
      data-section="free-gift"
      style={{
        background: 'transparent',
        color: 'var(--text)',
        padding: 'var(--padTop) var(--padX) var(--padBot)',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          display: 'grid',
          gap: 'var(--gap)',
          width: '100%',
          paddingLeft: '0',
          paddingRight: '0',
        }}
      >
        {/* Heading - Outside the box */}
        <h2
          id="gift-title"
          style={{
            fontWeight: 800,
            lineHeight: 1.1,
            fontSize: 'clamp(24px, 3.5vw, 32px)',
            textAlign: 'center',
            marginBottom: '4px',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {heading}{' '}
          <span
            style={{
              color: '#D4AF37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4)',
            }}
          >
            {headingSuffix}
          </span>
        </h2>

        {/* Gift Card with 3 zones */}
        <div
          className="gift-card"
          data-card="gift-card"
          style={{
            background: 'transparent',
            padding: '32px 0',
            display: 'grid',
            gridTemplateRows: 'auto minmax(400px, auto) 0px',
            gap: '32px',
          }}
        >
          {/* Top Text */}
          <div
            style={{
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'var(--muted)',
              textAlign: 'center',
              maxWidth: '64ch',
              margin: '0 auto',
            }}
          >
            {topText}
          </div>

          {/* Center Space - For Gift Image */}
          <div
            className="gift-placeholder"
            style={{
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
            }}
          >
            {giftImage && (
              <img
                src={giftImage}
                alt={giftImageAlt}
                loading="lazy"
                decoding="async"
                style={{
                  maxWidth: '340px',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  border: '3px solid rgba(212, 175, 55, 0.95)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.5)',
                }}
              />
            )}
          </div>

          {/* Bottom Text */}
          {bottomText && (
            <div
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--muted)',
                textAlign: 'center',
                maxWidth: '64ch',
                margin: '0 auto',
              }}
            >
              {bottomText}
            </div>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 1023px) and (min-width: 768px) {
          .gift-card {
            padding: 24px !important;
            grid-template-rows: auto minmax(320px, auto) auto !important;
            gap: 24px !important;
          }
          .gift-card > div {
            font-size: 16px !important;
          }
          .gift-placeholder {
            min-height: 320px !important;
          }
        }

        @media (max-width: 767px) {
          #gift-title {
            width: 100% !important;
            text-align: center !important;
            padding: 0 8px !important;
          }
          
          .gift-card {
            padding: 16px !important;
            grid-template-rows: auto minmax(280px, auto) auto !important;
            gap: 20px !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }
          .gift-card > div {
            font-size: 15px !important;
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .gift-placeholder {
            min-height: 280px !important;
            max-width: 100% !important;
          }
          .gift-placeholder img {
            max-width: 90% !important;
            width: auto !important;
          }
          .gift__cta button {
            height: 64px !important;
          }
        }
      `}</style>
    </section>
  );
};
