import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds */
  delay?: number;
  variant?: "up" | "fade" | "scale";
}

export function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden =
    variant === "up"
      ? "opacity-0 translate-y-6"
      : variant === "scale"
        ? "opacity-0 scale-[0.97]"
        : "opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "motion-reveal transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        visible ? "opacity-100 translate-y-0 scale-100" : hidden,
        className,
      )}
    >
      {children}
    </div>
  );
}
