import testimonial1 from '@/assets/testimonial-1.webp';
import testimonial2 from '@/assets/testimonial-2.webp';
import testimonial3 from '@/assets/testimonial-3.webp';
import testimonial7 from '@/assets/testimonial-7.webp';
import testimonial8 from '@/assets/testimonial-8.webp';
import testimonial9 from '@/assets/testimonial-9.webp';
import testimonial10 from '@/assets/testimonial-10.webp';

interface Props {
  heading?: string;
}

export const TomasScreenshots = ({ heading = 'Vad människor säger' }: Props) => {
  return (
    <section className="relative z-10 py-10 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-white font-semibold text-center mb-8 md:mb-12"
          style={{ fontSize: 'clamp(22px, 3.8vw, 42px)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
        >
          {heading}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[testimonial1, testimonial2, testimonial3].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={src} alt={`Skriftligt kundomdöme om Tomas Lydahl ${i + 1}`} loading="lazy" decoding="async" className="w-full h-auto block" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial8} alt="Skriftligt kundomdöme om Tomas Lydahl" loading="lazy" decoding="async" className="w-full h-auto block" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial7} alt="Tack Tomas" loading="lazy" decoding="async" className="w-full h-auto block" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial9} alt="Hej Tomas – Bettan" loading="lazy" decoding="async" className="w-full h-auto block" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial10} alt="God jul" loading="lazy" decoding="async" className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TomasScreenshots;
