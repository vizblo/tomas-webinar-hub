import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

// Get the fixed event date: Sunday, August 9th, 2026 at 3:00 PM ET
export function getTargetEventDate(): Date {
  // Sunday, August 9th, 2026 at 3:00 PM ET (EDT, UTC-4) = 19:00 UTC August 9
  return new Date('2026-08-09T19:00:00Z');
}

// Format the event date as "Sunday, August 9th • 3:00 PM ET"
export function formatEventDate(): string {
  return "Sunday, August 9th • 3:00 PM ET";
}

// Format like "Sunday August 9th at 3:00 PM ET" derived from the target date in ET
export function formatEventDateLong(): string {
  const target = getTargetEventDate();
  const tz = 'America/New_York';
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: tz }).format(target);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: tz }).format(target);
  const day = Number(new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: tz }).format(target));
  const suffix = (n: number) => {
    if (n % 100 >= 11 && n % 100 <= 13) return 'th';
    switch (n % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; }
  };
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz,
  }).format(target);
  return `${weekday} ${month} ${day}${suffix(day)} at ${time} ET`;
}

export function useCountdown(targetDate?: Date): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    // If no targetDate provided, use the fixed event date
    const target = targetDate || getTargetEventDate();
    
    const now = new Date().getTime();
    const targetTime = target.getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        totalSeconds: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      totalSeconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
