import { getCalendarLinks } from '@/lib/eventDate';
import { Calendar, Mail, CalendarDays } from 'lucide-react';

const { google: GOOGLE_URL, outlook: OUTLOOK_URL, yahoo: YAHOO_URL } = getCalendarLinks();

const AddToCalendarButtons = () => {
  const btn =
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:scale-[1.02]';

  const btnStyle = {
    borderColor: '#D4AF37',
    color: '#D4AF37',
    background: 'rgba(212, 175, 55, 0.05)',
  } as const;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className={btn} style={btnStyle}>
          <Calendar className="w-4 h-4" />
          Google Calendar
        </a>
        <a href={OUTLOOK_URL} target="_blank" rel="noopener noreferrer" className={btn} style={btnStyle}>
          <Mail className="w-4 h-4" />
          Outlook Calendar
        </a>
        <a href={YAHOO_URL} target="_blank" rel="noopener noreferrer" className={btn} style={btnStyle}>
          <CalendarDays className="w-4 h-4" />
          Yahoo Calendar
        </a>
      </div>
    </div>
  );
};

export default AddToCalendarButtons;
