import { useState, useEffect } from 'react';

interface TimeDisplay {
  hours: number;
  minutes: number;
  seconds: number;
}

const CYCLE_DURATION = 48 * 60 * 60 * 1000;
const STORAGE_KEY = 'replay_countdown_expiry';

const getExpiryTime = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const expiry = parseInt(stored, 10);
      if (!isNaN(expiry) && expiry > Date.now()) return expiry;
    }
  } catch {}
  const expiry = Date.now() + CYCLE_DURATION;
  try { localStorage.setItem(STORAGE_KEY, String(expiry)); } catch {}
  return expiry;
};

const calculateUniversalTime = (): TimeDisplay => {
  const remaining = Math.max(0, getExpiryTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
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
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            style={{ animation: 'livePulse 2s ease-in-out infinite' }}
          />
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-white/50 font-medium">
            Expires in
          </span>
        </div>

        <div className="flex items-center gap-1 tabular-nums font-mono text-white/90 text-[18px] sm:text-[22px] lg:text-[26px] font-semibold tracking-tight">
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
