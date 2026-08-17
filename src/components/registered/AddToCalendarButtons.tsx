import { Calendar, Mail, CalendarDays } from 'lucide-react';

const GOOGLE_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20260809T190000Z%2F20260809T203000Z&details=Discover%20the%20Exact%205-Phase%20Wholesale%20System%20I%20and%20Hundreds%20of%20Other%20Students%20Used%20to%20Build%20a%206-Figure%20Amazon%20Business%20From%20Scratch.%0A%0AJoin%20here%3A%20https%3A%2F%2Fus06web.zoom.us%2Fj%2F81711672534&location=https%3A%2F%2Fus06web.zoom.us%2Fj%2F81711672534&text=Amazon%20Wholesale%20Live%20Business%20Workshop';

const OUTLOOK_URL =
  'https://outlook.live.com/calendar/0/action/compose?allday=false&body=Discover%20the%20Exact%205-Phase%20Wholesale%20System%20I%20and%20Hundreds%20of%20Other%20Students%20Used%20to%20Build%20a%206-Figure%20Amazon%20Business%20From%20Scratch.%0A%0AJoin%20here%3A%20https%3A%2F%2Fus06web.zoom.us%2Fj%2F81711672534&enddt=2026-08-09T16%3A30%3A00&location=https%3A%2F%2Fus06web.zoom.us%2Fj%2F81711672534&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2026-08-09T15%3A00%3A00&subject=Amazon%20Wholesale%20Live%20Business%20Workshop';

const YAHOO_URL =
  'https://calendar.yahoo.com/?desc=Discover%20the%20Exact%205-Phase%20Wholesale%20System%20I%20and%20Hundreds%20of%20Other%20Students%20Used%20to%20Build%20a%206-Figure%20Amazon%20Business%20From%20Scratch.%0A%0AJoin%20here%3A%20https%3A%2F%2Fus06web.zoom.us%2Fj%2F81711672534&dur=false&et=20260809T203000Z&in_loc=https%3A%2F%2Fus06web.zoom.us%2Fj%2F81711672534&st=20260809T190000Z&title=Amazon%20Wholesale%20Live%20Business%20Workshop&v=60';

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
