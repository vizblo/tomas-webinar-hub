import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: string;
  videoUrl?: string;
  embedCode?: string;
  youtubeId?: string;
  name?: string;
  quote?: string;
  isVertical?: boolean;
}

interface TestimonialsSectionProps {
  heading?: string;
  headingSuffix?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  { id: '1', youtubeId: 'gdQG3yaBWJg', isVertical: false },
  { id: '2', youtubeId: 'yoekcrUpRJ8', isVertical: false },
  { id: '3', embedCode: `<wistia-player media-id="9or4066t2b" aspect="1.7777777777777777"></wistia-player>`, isVertical: false },
  { id: '4', embedCode: `<wistia-player media-id="v01ijqnck0" aspect="0.5625"></wistia-player>`, isVertical: true },
  { id: '5', embedCode: `<wistia-player media-id="1iq1st6h52" aspect="0.5625"></wistia-player>`, isVertical: true },
];

export const TestimonialsSection = ({
  heading = 'What People Are',
  headingSuffix = 'Saying',
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [wistiaLoaded, setWistiaLoaded] = useState(false);

  // Lazy load Wistia script when section is near viewport
  useEffect(() => {
    if (wistiaLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load Wistia script dynamically
          const script = document.createElement('script');
          script.src = 'https://fast.wistia.com/player.js';
          script.async = true;
          script.onload = () => setWistiaLoaded(true);
          document.head.appendChild(script);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before section enters viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [wistiaLoaded]);

  const youtubeVideos = testimonials.filter((t) => t.youtubeId);
  const horizontalWistia = testimonials.filter((t) => !t.youtubeId && !t.isVertical);
  const verticalVideos = testimonials.filter((t) => t.isVertical);

  const renderVideo = (testimonial: Testimonial) => (
    <div
      key={testimonial.id}
      className="testimonial-card"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
        minHeight: '150px',
      }}
    >
      {testimonial.youtubeId ? (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${testimonial.youtubeId}`}
            title={testimonial.name || 'Student interview'}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : testimonial.embedCode ? (
        <div
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: testimonial.embedCode }}
        />
      ) : null}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-title"
      data-section="testimonials"
      style={{
        background: 'transparent',
        color: 'var(--text)',
        padding: 'var(--padTop) var(--padX) var(--padBot)',
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
        }}
      >
        {/* Heading */}
        <h2
          id="testimonials-title"
          style={{
            fontWeight: 800,
            lineHeight: 1.08,
            fontSize: 'clamp(28px, 4.2vw, 40px)',
            textAlign: 'center',
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

        {/* YouTube videos - stacked */}
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%', display: 'grid', gap: '16px' }}>
          {youtubeVideos.map(renderVideo)}
        </div>

        {/* Horizontal Wistia video */}
        <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%', display: 'grid', gap: '16px' }}>
          {horizontalWistia.map(renderVideo)}
        </div>

        {/* Vertical Wistia videos - 2 column grid */}
        <div
          className="vertical-videos-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '500px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {verticalVideos.map(renderVideo)}
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 639px) {
          .vertical-videos-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            max-width: 280px !important;
          }
          .horizontal-video-row {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
