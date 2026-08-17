interface HostStat {
  label: string;
  value: string;
}

interface HostSectionProps {
  heading?: string;
  headingSuffix?: string;
  hostImage?: string;
  hostImageAlt?: string;
  hostName?: string;
  hostTitle?: string;
  hostBio?: string;
  stats?: HostStat[];
}

export const HostSection = ({
  heading = 'Meet Your',
  headingSuffix = 'Host',
  hostImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
  hostImageAlt = 'Portrait of your host',
  hostName = 'John Anderson',
  hostTitle = 'AI Development Expert & Industry Leader',
  hostBio = 'With over 15 years in software development and 5 years pioneering AI-powered workflows, John has helped thousands of developers transform their productivity.',
  stats = [
    { label: 'Successful Students', value: '500+' },
    { label: 'in Student Sales Generated', value: '$10M+' },
    { label: 'in personal Amazon sales', value: '$3.5M+' },
  ],
}: HostSectionProps) => {
  return (
    <section
      aria-labelledby="host-title"
      data-section="meet-host"
      className="host-section"
      style={{
        background: 'transparent',
        color: 'hsl(var(--foreground))',
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(32px, 6vw, 48px)',
        }}
      >
        {/* Heading */}
        <h2
          id="host-title"
          style={{
            fontWeight: 800,
            lineHeight: 1.08,
            fontSize: 'clamp(24px, 3.5vw, 32px)',
            margin: 0,
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

        {/* Host Image - Rounded Square */}
        <div
          style={{
            width: 'clamp(160px, 30vw, 220px)',
            aspectRatio: '1/1',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          <img
            src={hostImage}
            alt={hostImageAlt}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Name */}
        <h3
          style={{
            fontWeight: 700,
            fontSize: 'clamp(28px, 5vw, 40px)',
            margin: 0,
            color: '#FFFFFF',
          }}
        >
          {hostName}
        </h3>

        {/* Title */}
        <p
          style={{
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            fontWeight: 500,
            color: 'var(--muted)',
            margin: '-20px 0 0 0',
          }}
        >
          {hostTitle}
        </p>

        {/* Bio */}
        <p
          style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            lineHeight: 1.7,
            color: 'var(--muted)',
            maxWidth: '54ch',
            margin: '-8px 0 0 0',
            whiteSpace: 'pre-line',
          }}
        >
          {hostBio}
        </p>

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <>
          <style>{`
            @media (max-width: 767px) {
              .host-stats-row {
                gap: 16px !important;
              }
              .host-stats-row .stat-value {
                font-size: 28px !important;
              }
              .host-stats-row .stat-label {
                font-size: 10px !important;
              }
            }
          `}</style>
          <div
            className="host-stats-row"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(32px, 8vw, 80px)',
              marginTop: 'clamp(8px, 2vw, 16px)',
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  className="stat-value"
                  style={{
                    fontSize: 'clamp(32px, 6vw, 48px)',
                    fontWeight: 700,
                    color: '#D4AF37',
                    textShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="stat-label"
                  style={{
                    fontSize: 'clamp(11px, 1.8vw, 14px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--muted)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          </>
        )}
      </div>
    </section>
  );
};
