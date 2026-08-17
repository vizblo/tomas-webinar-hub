// Central date logic for the lecture ("föreläsning") and the replay deadline.
// Both roll forward automatically in 14-day cycles once the base date has passed.

const CYCLE_MS = 14 * 24 * 60 * 60 * 1000;

// Tuesday 25 August 2026, 19:00 Stockholm time (CEST = UTC+2)
const BASE_EVENT = Date.parse('2026-08-25T19:00:00+02:00');

// Friday 28 August 2026, 23:59 Stockholm time (CEST = UTC+2)
const BASE_REPLAY_DEADLINE = Date.parse('2026-08-28T23:59:00+02:00');

const roll = (base: number, now = Date.now()): number => {
  if (now < base) return base;
  const cycles = Math.floor((now - base) / CYCLE_MS) + 1;
  return base + cycles * CYCLE_MS;
};

/** Next upcoming lecture date (rolls 14 days forward after each occurrence). */
export const getEventDate = (): Date => new Date(roll(BASE_EVENT));

/** Next replay expiry (rolls 14 days forward after each occurrence). */
export const getReplayDeadline = (): Date => new Date(roll(BASE_REPLAY_DEADLINE));

export const WEBINAR_LIVE_URL = 'https://event.webinarjam.com/llo91m/go/live/o1z8rmcyhxsgs0';
export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/JjCVUurLBO12fsISTPcPHm?mode=gi_t';

const TZ = 'Europe/Stockholm';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "25 augusti" */
export const formatEventDayMonth = (d: Date = getEventDate()): string =>
  new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', timeZone: TZ }).format(d);

/** "25 augusti 2026" */
export const formatEventDayMonthYear = (d: Date = getEventDate()): string =>
  new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(d);

/** "19:00" */
export const formatEventTime = (d: Date = getEventDate()): string =>
  new Intl.DateTimeFormat('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(d);

/** "Tisdag 25 augusti kl. 19:00" */
export const formatEventLong = (d: Date = getEventDate()): string => {
  const weekday = new Intl.DateTimeFormat('sv-SE', { weekday: 'long', timeZone: TZ }).format(d);
  return `${cap(weekday)} ${formatEventDayMonth(d)} kl. ${formatEventTime(d)}`;
};

/** "25 augusti kl. 19:00" */
export const formatEventShort = (d: Date = getEventDate()): string =>
  `${formatEventDayMonth(d)} kl. ${formatEventTime(d)}`;

/** ICS/Google style basic UTC stamp: 20260825T170000Z */
const stamp = (d: Date): string => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** Local (Stockholm) ISO-ish string for Outlook: 2026-08-25T19:00:00 */
const localIso = (d: Date): string => {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(d).reduce<Record<string, string>>((acc, p) => (acc[p.type] = p.value, acc), {});
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
};

const EVENT_TITLE = 'Kostnadsfri digital föreläsning - Tomas Lydahl';
const EVENT_DETAILS = `Gå med på föreläsningen här: ${WEBINAR_LIVE_URL}`;

export const getCalendarLinks = (start: Date = getEventDate()) => {
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const t = encodeURIComponent(EVENT_TITLE);
  const d = encodeURIComponent(EVENT_DETAILS);
  const loc = encodeURIComponent(WEBINAR_LIVE_URL);

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${t}&dates=${stamp(start)}%2F${stamp(end)}&details=${d}&location=${loc}`,
    outlook: `https://outlook.live.com/calendar/0/action/compose?rru=addevent&path=%2Fcalendar%2Faction%2Fcompose&subject=${t}&startdt=${encodeURIComponent(localIso(start))}&enddt=${encodeURIComponent(localIso(end))}&location=${loc}&body=${d}`,
    yahoo: `https://calendar.yahoo.com/?v=60&title=${t}&st=${stamp(start)}&et=${stamp(end)}&desc=${d}&in_loc=${loc}`,
  };
};
