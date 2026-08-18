import { useState, useEffect } from 'react';
import { getReplayDeadline } from '@/lib/eventDate';

interface TimeDisplay {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getExpiryTime = (): number => getReplayDeadline().getTime();

const calculateUniversalTime = (): TimeDisplay => {
  const remaining = Math.max(0, getExpiryTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

export const CountdownPill = () => {
  const [timeLeft, setTimeLeft] = useState<TimeDisplay>(calculateUniversalTime);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateUniversalTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mt-[30px] sm:mt-[40px] lg:mt-[48px] mb-[20px] sm:mb-[24px] lg:mb-[28px] flex flex-col items-center">
      <div
        className="relative flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full"
        style={{
          background: 'rgba(201, 168, 76, 0.08)',
          border: '1px solid rgba(201, 168, 76, 0.35)',
          boxShadow: '0 0 40px rgba(201, 168, 76, 0.18)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            style={{ animation: 'livePulse 2s ease-in-out infinite' }}
          />
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-white/50 font-medium">
            Försvinner om
          </span>
        </div>

        <div className="flex items-center gap-1 tabular-nums font-mono text-white/90 text-[18px] sm:text-[22px] lg:text-[26px] font-semibold tracking-tight">
          {timeLeft.days > 0 && (
            <>
              <span>{pad(timeLeft.days)}</span>
              <span className="text-white/30">:</span>
            </>
          )}
          <span>{pad(timeLeft.hours)}</span>
          <span className="text-white/30">:</span>
          <span>{pad(timeLeft.minutes)}</span>
          <span className="text-white/30">:</span>
          <span>{pad(timeLeft.seconds)}</span>
        </div>
      </div>
    </div>
  );
};
