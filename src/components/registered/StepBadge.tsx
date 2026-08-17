interface StepBadgeProps {
  stepNumber: number;
}

const StepBadge = ({ stepNumber }: StepBadgeProps) => {
  return (
    <div
      className="inline-block px-4 py-1.5 sm:px-6 sm:py-2 rounded-3xl mb-4"
      style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
      }}
    >
      <span className="text-xs sm:text-sm font-bold uppercase text-white">
        STEG {stepNumber}
      </span>
    </div>
  );
};

export default StepBadge;
