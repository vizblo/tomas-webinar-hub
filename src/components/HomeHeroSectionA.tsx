import { useCountdown, formatEventDateLong } from '@/hooks/useCountdown';
import { useRegistrationModal } from '@/hooks/useRegistrationModal';
import { Star } from 'lucide-react';

const GOLD = '#D4AF37';
const FONT = '"Plus Jakarta Sans", Inter, system-ui, -apple-system, sans-serif';

const avatarImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
];

export const HomeHeroSectionA = () => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();
  const { openRegistrationModal } = useRegistrationModal();
  
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-4 md:pt-6 pb-8 md:pb-12"
      style={{ background: '#000000', color: '#FFFFFF', fontFamily: FONT }}
    >
      {/* Top gold glow vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          background:
            'radial-gradient(70% 60% at 50% 0%, rgba(212,175,55,0.20) 0%, rgba(212,175,55,0.08) 40%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <p
          className="text-center mt-1 mb-3"
          style={{
            fontSize: 'clamp(13px, 3.2vw, 16px)',
            lineHeight: 1.35,
            fontWeight: 500,
            color: '#FFFFFF',
          }}
        >
          LIVE From My Warehouse on {formatEventDateLong()}, I'm Revealing...
        </p>

        {/* H1 */}
        <h1
          className="text-center"
          style={{
            fontFamily: FONT,
            fontSize: 'clamp(22px, 6.5vw, 38px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            fontWeight: 900,
            margin: '0 auto 16px',
            textWrap: 'balance' as React.CSSProperties['textWrap'],
            color: '#FFFFFF',
          }}
        >
          How I scaled my Amazon Business to{' '}
          <span style={{ color: GOLD, textShadow: '0 0 24px rgba(212,175,55,0.3)' }}>$4.1M</span>{' '}
          <em>Without Supplier Headache</em> Through{' '}
          <span style={{ color: GOLD, textShadow: '0 0 24px rgba(212,175,55,0.3)' }}>Brand Direct Wholesale</span>
        </h1>

        {/* Subhead */}
        <p
          className="text-center mb-6"
          style={{
            fontSize: 'clamp(13px, 3.5vw, 16px)',
            lineHeight: 1.45,
            fontWeight: 500,
            maxWidth: '52ch',
            margin: '0 auto 22px',
            color: '#FFFFFF',
          }}
        >
          Without building a brand from scratch. Without "flipping" products for pennies. Without quitting your 9-5
        </p>

        {/* Green CTA */}
        <button
          type="button"
          onClick={openRegistrationModal}
          className="group block w-full max-w-[560px] mx-auto px-8 py-5 md:py-6 mb-10 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: 'linear-gradient(180deg, #10B981 0%, #059669 50%, #047857 100%)',
            borderRadius: 18,
            boxShadow: '0 6px 0 0 #064e3b, 0 14px 32px rgba(16,185,129,0.40)',
            color: '#FFFFFF',
            border: '2px solid rgba(0,0,0,0.35)',
          }}
        >
          <span
            className="block"
            style={{
              fontFamily: FONT,
              fontSize: 'clamp(22px, 5.4vw, 30px)',
              fontWeight: 900,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
          >
            Yes! Claim My Free Ticket!
          </span>
          <span
            className="block mt-1"
            style={{ fontSize: 'clamp(12px, 3vw, 15px)', fontWeight: 600, color: 'rgba(255,255,255,0.92)' }}
          >
            Live Only — NO Replay
          </span>
        </button>

        {/* Countdown */}
        {!isExpired && (
          <>
            <h3
              className="text-center mb-3"
              style={{
                fontFamily: FONT,
                color: GOLD,
                fontSize: 'clamp(20px, 5.2vw, 28px)',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                textShadow: '0 0 18px rgba(212,175,55,0.35)',
              }}
            >
              Workshop registration closes in:
            </h3>
            <div className="grid grid-cols-4 gap-2 max-w-[520px] mx-auto text-center">
              {[
                { value: days, label: 'DAYS' },
                { value: hours, label: 'HOURS' },
                { value: minutes, label: 'MINUTES' },
                { value: seconds, label: 'SECONDS' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <span
                    className="tabular-nums leading-none"
                    style={{
                      fontFamily: FONT,
                      fontSize: 'clamp(34px, 9vw, 48px)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: '#FFFFFF',
                    }}
                  >
                    {formatNumber(item.value)}
                  </span>
                  <span
                    className="mt-2 text-[10px] md:text-xs tracking-[0.12em]"
                    style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Social proof pill */}
            <div
              className="mt-6 mx-auto flex flex-col items-center gap-2 px-6 py-3 w-fit max-w-[92%]"
              style={{
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 0 50px rgba(212, 175, 55, 0.3), 0 0 80px rgba(212, 175, 55, 0.18)',
                borderRadius: 24,
              }}
            >
              {/* Top row: avatars + stars */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center">
                  {avatarImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-7 h-7 rounded-full object-cover"
                      style={{
                        border: '2px solid rgba(212, 175, 55, 0.5)',
                        marginLeft: index > 0 ? '-10px' : '0',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-current"
                      style={{
                        color: GOLD,
                        filter: 'drop-shadow(0 0 4px #D4AF37) drop-shadow(0 0 8px #D4AF37)',
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Bottom row: text */}
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(13px, 3.6vw, 16px)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <strong><em style={{ color: GOLD }}>$10M+</em></strong> in Attendee Results
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeHeroSectionA;
