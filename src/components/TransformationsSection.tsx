import studentResult1 from '@/assets/student-result-1.png';
import studentResult2 from '@/assets/student-result-2.png';
import studentResult3 from '@/assets/student-result-3.jpg';
import studentResult4 from '@/assets/student-result-4.jpg';
import studentResult5 from '@/assets/student-result-5.jpg';
import studentResult6 from '@/assets/student-result-6.png';
import studentResult7 from '@/assets/student-result-7.png';
import studentResult8 from '@/assets/student-result-8.jpg';
import studentResult9 from '@/assets/student-result-9.jpg';
import studentResult10 from '@/assets/student-result-10.png';
import studentResult11 from '@/assets/student-result-11.png';
import studentResult12 from '@/assets/student-result-12.png';
import studentResult13 from '@/assets/student-result-13.png';
import studentResult14 from '@/assets/student-result-14.png';
import studentResult15 from '@/assets/student-result-15.png';
import studentResult16 from '@/assets/student-result-16.png';
import studentResult17 from '@/assets/student-result-17.png';
import studentResult18 from '@/assets/student-result-18.png';
import studentResult19 from '@/assets/student-result-19.png';
import studentResult20 from '@/assets/student-result-20.png';
import studentResult21 from '@/assets/student-result-21.png';
import studentResult22 from '@/assets/student-result-22.png';
import studentResult23 from '@/assets/student-result-23.png';

const transformationImages = [
  studentResult1,
  studentResult2,
  studentResult3,
  studentResult4,
  studentResult5,
  studentResult6,
  studentResult7,
  studentResult8,
  studentResult9,
  studentResult10,
  studentResult11,
  studentResult12,
  studentResult13,
  studentResult14,
  studentResult15,
  studentResult16,
  studentResult17,
  studentResult18,
  studentResult19,
  studentResult20,
  studentResult21,
  studentResult22,
  studentResult23,
];

export { transformationImages };

interface TransformationsSectionProps {
  heading?: string;
  headingSuffix?: string;
}

export const TransformationsSection = ({
  heading = 'Real',
  headingSuffix = 'Transformations',
}: TransformationsSectionProps) => {
  return (
    <section
      aria-labelledby="transformations-title"
      data-section="transformations"
      className="py-6 sm:py-8 md:py-10 lg:py-12"
      style={{
        background: 'transparent',
        color: 'var(--text)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <h2
          id="transformations-title"
          className="text-white font-semibold text-center mb-8 sm:mb-10 md:mb-12"
          style={{
            fontSize: 'clamp(22px, 3.8vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 lg:gap-6">
          {transformationImages.map((imagePath, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-5 lg:mb-6 relative group"
            >
              {/* Gold glow halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212,175,55,0.45), transparent 70%)',
                }}
              />
              <img
                src={imagePath}
                alt={`Transformation ${index + 1}`}
                loading="eager"
                decoding="async"
                className="relative w-full h-auto rounded-xl border border-[rgba(212,175,55,0.2)] group-hover:border-[rgba(212,175,55,0.55)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] will-change-transform"
                style={{
                  boxShadow:
                    '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 rgba(212, 175, 55, 0)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
