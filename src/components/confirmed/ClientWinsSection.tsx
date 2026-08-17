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

const studentImages = [
  studentResult1, studentResult2, studentResult3, studentResult4, studentResult5,
  studentResult6, studentResult7, studentResult8, studentResult9, studentResult10,
  studentResult11, studentResult12, studentResult13, studentResult14, studentResult15,
  studentResult16, studentResult17, studentResult18, studentResult19, studentResult20,
  studentResult21, studentResult22, studentResult23,
];

interface ClientWinsSectionProps {
  showStepPill?: boolean;
}

const ClientWinsSection = ({ showStepPill = true }: ClientWinsSectionProps) => {
  return (
    <section className="pt-10 pb-16 px-4">
      {showStepPill && (
        <div className="flex justify-center mb-8">
          <span
            className="inline-block bg-gradient-to-r from-[#D4AF37] via-[#F4E4A6] to-[#D4AF37] text-black font-extrabold text-sm md:text-lg lg:text-xl px-6 md:px-10 py-3 md:py-4 rounded-full whitespace-nowrap uppercase tracking-wide"
            style={{
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            }}
          >
            <span className="md:hidden">Step 4/4: Client Wins</span>
            <span className="hidden md:inline">Step 4/4: See Our Client Wins</span>
          </span>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 lg:gap-6">
          {studentImages.map((imagePath, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-5 lg:mb-6 relative group"
            >
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
                alt={`Client win ${index + 1}`}
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

export default ClientWinsSection;
