import StepBadge from './StepBadge';
import AddToCalendarButtons from './AddToCalendarButtons';

const CalendarStep = () => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-16 pt-12 sm:pt-16">
      <div
        className="px-3 pt-3 pb-3 sm:p-6 md:p-8 rounded-lg"
        style={{
          background: 'rgba(30, 30, 30, 0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <StepBadge stepNumber={3} />

          <h2
            className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-6"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            Click Below To Add This Event Directly To Your Calendar
          </h2>

          <AddToCalendarButtons />
        </div>
      </div>
    </div>
  );
};

export default CalendarStep;
