import { CalendarDays } from 'lucide-react';
import StepBadge from './StepBadge';
import AddToCalendarButtons from './AddToCalendarButtons';

const WhatsAppCalendarStep = () => {
  return (
    <div
      data-step="2"
      className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-12 pt-6 sm:pt-8 md:pt-8"
    >
      <div
        className="px-3 pt-3 pb-6 sm:p-6 md:p-8 lg:p-10 rounded-lg"
        style={{
          background: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <StepBadge stepNumber={2} />

          <h2
            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-6"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            Add The Event To Your Calendar
          </h2>

          <CalendarDays
            size={105}
            strokeWidth={1.75}
            color="#D4AF37"
            className="mb-6"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(212, 175, 55, 0.35))' }}
          />

          <AddToCalendarButtons />

          <p className="text-[11px] sm:text-sm text-gray-400 max-w-[640px] leading-relaxed mt-6">
            We've also sent the workshop access details to your email. Please open the email and add the event to your calendar <strong className="font-bold text-white">NOW</strong> so you don't miss the live session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppCalendarStep;
