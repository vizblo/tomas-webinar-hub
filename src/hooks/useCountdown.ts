import { useState, useEffect } from 'react';
import { getEventDate, formatEventLong, formatEventShort } from '@/lib/eventDate';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

/** Next lecture date (rolls forward 14 days after each occurrence). */
export function getTargetEventDate(): Date {
  return getEventDate();
}

/** "25 augusti kl. 19:00" */
export function formatEventDate(): string {
  return formatEventShort();
}

/** "Tisdag 25 augusti kl. 19:00" */
export function formatEventDateLong(): string {
  return formatEventLong();
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
