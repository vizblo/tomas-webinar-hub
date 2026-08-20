const videos = [
  { name: 'Fredrik', url: 'https://www.youtube.com/embed/bT_5xwpLDbs' },
  { name: 'Caroline', url: 'https://www.youtube.com/embed/_4r0nCWrCCw' },
  { name: 'Klas', url: 'https://www.youtube.com/embed/bZ0jF2Ag7Mc' },
  { name: 'Klient', url: 'https://www.youtube.com/embed/ct5ib8nLduk' },
];

interface Props {
  heading?: string;
}

export const TomasVideoTestimonials = ({ heading = 'Tidigare klienter' }: Props) => {
  return (
    <section className="relative z-10 py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-white font-semibold text-center mb-8 md:mb-12"
          style={{ fontSize: 'clamp(22px, 3.8vw, 42px)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map(({ name, url }) => (
            <div
              key={name}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div style={{ aspectRatio: '16/9' }}>
                <iframe
                  className="w-full h-full"
                  src={url}
                  title={`Videoomdöme om Tomas Lydahl – ${name}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TomasVideoTestimonials;
