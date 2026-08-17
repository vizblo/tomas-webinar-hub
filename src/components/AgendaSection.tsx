interface PillarItem {
  number: string;
  title: string;
  subtitle: string;
  phase?: string;
  icon?: 'package' | 'trending' | 'handshake' | 'settings' | 'mic';
}

interface AgendaSectionProps {
  headline?: string;
  pillars?: PillarItem[];
}

const defaultPillars: PillarItem[] = [
  {
    number: '01',
    phase: 'Phase 1',
    icon: 'package',
    title: 'Best Amazon Model in 2026',
    subtitle: 'Learn why Amazon wholesale is the number #1 business model to start in 2026.',
  },
  {
    number: '02',
    phase: 'Phase 2',
    icon: 'trending',
    title: 'How to Find Suppliers',
    subtitle: "Learn exactly how to connect with US-based distributors without getting rejected because they 'don't work with Amazon sellers'",
  },
  {
    number: '03',
    phase: 'Phase 3',
    icon: 'handshake',
    title: 'How to Find Profitable Products',
    subtitle: 'Learn what products drive profit and what units you should be focusing on.',
  },
  {
    number: '04',
    phase: 'Phase 4',
    icon: 'settings',
    title: 'Business Funding & Delegation',
    subtitle: "Learn how to scale your wholesale business through other people's money and virtual assistants.",
  },
  {
    number: '05',
    phase: 'Phase 5',
    icon: 'mic',
    title: 'Open Q&A',
    subtitle: 'Get all your questions about the business and getting started answered by me Live.',
  },
];

const GOLD = '#D4AF37';

export const AgendaSection = ({
  headline = "Everything You'll Learn",
  pillars = defaultPillars,
}: AgendaSectionProps) => {
  return (
    <section
      aria-labelledby="agenda-title"
      className="relative pt-6 md:pt-10 pb-10 md:pb-16 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <div className="relative z-10 mx-auto px-5 md:px-6" style={{ maxWidth: '600px' }}>
        <h2
          id="agenda-title"
          className="text-xl md:text-2xl font-bold text-center text-white mb-6 md:mb-8"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            lineHeight: 1.2,
          }}
        >
          {headline}
        </h2>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '560px',
            width: '100%',
          }}
        >
          {pillars.map((item, index) => (
            <li
              key={item.number}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 0',
                borderBottom:
                  index < pillars.length - 1
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : 'none',
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  lineHeight: 1,
                  color: GOLD,
                  textShadow:
                    '0 0 10px rgba(212, 175, 55, 0.35), 0 0 20px rgba(212, 175, 55, 0.18)',
                  minWidth: '38px',
                  flexShrink: 0,
                }}
              >
                {item.number}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '14.5px',
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: '12.5px',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {item.subtitle}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
