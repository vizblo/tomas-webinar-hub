import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Format number with non-breaking thin space as thousand separator */
  format?: boolean;
}

export function CountUp({
  end,
  duration = 1800,
  prefix = "",
  suffix = "",
  format = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(end);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setValue(0);
    const observer = new IntersectionObserver(

      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * end));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  const display = format
    ? value.toLocaleString("sv-SE").replace(/\u00A0/g, " ")
    : String(value);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
