import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Brain, Shield, Heart, X, MessageCircle } from "lucide-react";

import testimonial1 from "@/assets/repris/testimonial-old-1.png";
import testimonial2 from "@/assets/repris/testimonial-old-2.png";
import testimonial3 from "@/assets/repris/testimonial-old-3.jpg";
import testimonial7 from "@/assets/repris/testimonial-old-7.jpg";
import testimonial8 from "@/assets/repris/testimonial-old-8.jpg";
import testimonial9 from "@/assets/repris/testimonial-old-9.jpg";
import testimonial10 from "@/assets/repris/testimonial-old-10.jpg";
import webinarThumbnail from "@/assets/repris/webinar-thumbnail.jpg";

// ─── Countdown to fixed deadline ─────────────────────────────────────────────
const DEADLINE = new Date("2026-08-14T23:59:00");

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function useCountdown() {
  const calc = () => {
    const diff = DEADLINE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── CountdownBlock ───────────────────────────────────────────────────────────
function CountdownBlock() {
  const { days, hours, minutes, seconds } = useCountdown();
  const expired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  const slots = [
    { label: "DAGAR", value: days },
    { label: "TIMMAR", value: hours },
    { label: "MIN", value: minutes },
    { label: "SEK", value: seconds },
  ];

  return (
    <div style={{ background: "hsl(var(--surface))", borderBottom: "1px solid hsl(var(--border))" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-center">
        {expired ? (
          <p className="text-muted-foreground text-sm">Föreläsningen är inte längre tillgänglig.</p>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-nowrap w-full sm:w-auto">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="live-dot" aria-hidden="true" />
                <p
                  className="text-xs sm:text-sm font-bold uppercase tracking-wide text-center"
                  style={{ color: "hsl(var(--foreground))", fontFamily: "sans-serif", lineHeight: 1.1 }}
                >
                  FÖRELÄSNINGEN<br /> FÖRSVINNER OM
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                {slots.map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-base sm:text-lg md:text-xl font-bold leading-none tabular-nums px-2 sm:px-2.5 py-1.5 rounded-md"
                      style={{
                        color: "hsl(var(--foreground))",
                        fontFamily: "sans-serif",
                        background: "hsl(var(--surface-elevated))",
                        border: "1px solid hsl(var(--border))",
                        minWidth: "38px",
                      }}
                    >
                      {String(value).padStart(2, "0")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
              style={{
                border: "1px solid hsl(var(--gold) / 0.4)",
                color: "hsl(var(--gold))",
                fontFamily: "sans-serif",
              }}
            >
              Begränsat antal platser
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection({
  onVideoClick,
  unlocked,
  videoEmbedUrl,
  videoThumbnailUrl,
}: {
  onVideoClick: () => void;
  unlocked: boolean;
  videoEmbedUrl?: string;
  videoThumbnailUrl?: string;
}) {
  return (
    <section className="relative pt-8 pb-16 md:pb-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-body text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6 animate-fade-in whitespace-pre-line">
          <span>{"REPRIS: Låt din "}</span>
          <span style={{ color: "hsl(var(--gold))" }}>{"självkänsla"}</span>
          <span>{" träda fram:\nKonsten att "}</span>
          <span style={{ color: "hsl(var(--gold))" }}>{"älska dig själv"}</span>
          <span>{" oavsett vad"}</span>
        </h1>
        <hr className="w-16 h-0.5 border-none mx-auto mb-6 animate-fade-in" style={{ background: "hsl(var(--gold))", animationDelay: "0.1s", animationFillMode: "backwards" }} />
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
          Se hela digitala föreläsningen från i onsdags
        </p>

        {/* Video */}
        <div
          className="relative rounded-xl overflow-hidden mb-10 mx-auto max-w-2xl animate-scale-in"
          style={{ border: "2px solid hsl(var(--gold) / 0.3)", aspectRatio: "16/9", background: "hsl(var(--surface))" }}
        >
          {unlocked ? (
            videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                title="Webinar repris"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "hsl(var(--surface))" }}>
                <p className="text-muted-foreground text-sm">Video placeholder</p>
              </div>
            )
          ) : (
            <button
              onClick={onVideoClick}
              className="absolute inset-0 w-full h-full flex items-center justify-center group"
              aria-label="Lås upp reprisen"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={
                  videoThumbnailUrl
                    ? { backgroundImage: `url(${videoThumbnailUrl})` }
                    : { background: "hsl(var(--surface))" }
                }
              />
              <div className="absolute inset-0" style={{ background: "hsl(0 0% 0% / 0.35)" }} />
              <div className="relative text-center px-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "hsl(var(--gold) / 0.9)", border: "1px solid hsl(var(--gold))" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-0.5" style={{ color: "hsl(var(--background))" }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-semibold text-lg" style={{ color: "hsl(0 0% 100%)" }}>Klicka för att låsa upp reprisen</p>
                <p className="text-sm mt-1" style={{ color: "hsl(0 0% 100% / 0.85)" }}>Anmäl dig för att se hela föreläsningen</p>
              </div>
            </button>
          )}
        </div>

        {!unlocked && (
          <button
            onClick={onVideoClick}
            className="btn-gold inline-flex items-center gap-3 px-8 py-4 rounded-lg text-base md:text-lg font-semibold"
          >
            Se hela reprisen
          </button>
        )}
      </div>

      {/* Calendly embed - full width för 2-kolumnslayout */}
      <div className="mt-12 w-full max-w-6xl mx-auto px-0 sm:px-2">
        <Reveal>
          <h2 className="font-body text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
            Boka ett samtal med Tomas
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
        <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid hsl(var(--border))" }}>
          <iframe
            src="https://calendly.com/tomas-tomaslydahl/webinar?utm_source=webinar&utm_medium=replay&utm_content=webinar-replay&hide_gdpr_banner=1"
            title="Boka samtal – Tomas Lydahl"
            width="100%"
            height="1100"
            frameBorder="0"
            scrolling="no"
          />
        </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── KeyLearnings ──────────────────────────────────────────────────────────────
const learnings = [
  {
    icon: Brain,
    title: "Krossa myten om självkänsla",
    desc: "Vi krossar myten om att självkänsla är något som tränas upp och går igenom vad som faktiskt funkar i praktiken.",
  },
  {
    icon: Shield,
    title: "Sluta tro på dina tankar",
    desc: "Lär dig skillnaden mellan att HA en tanke och att TRO på den. Och inse att du inte är dina tankar.",
  },
  {
    icon: Heart,
    title: "Hur du börjar älska dig själv oavsett vad",
    desc: "Vi krossar myten om att självkänsla måste förtjänas och visar vad som faktiskt fungerar i praktiken.",
  },
  {
    icon: MessageCircle,
    title: "BONUS: Live Q&A i slutet",
    desc: "Direkt efter föreläsningen får du ställa dina frågor till Tomas live. En unik möjlighet att få personlig vägledning.",
  },
];

function KeyLearningsSection() {
  return (
    <section
      className="py-16 md:py-20 px-4"
      style={{ background: "hsl(var(--surface))", borderTop: "1px solid hsl(var(--border))" }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="section-label text-center mb-3">Vad du missade från föreläsningen</p>
          <h2 className="font-body text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Under denna föreläsning får du
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {learnings.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.12}>
            <div
              key={title}
              className="rounded-xl p-6 flex flex-col gap-4 h-full"
              style={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg"
                  style={{
                    background: "hsl(var(--gold) / 0.12)",
                    border: "1px solid hsl(var(--gold) / 0.25)",
                    color: "hsl(var(--gold))",
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="font-body font-bold text-base leading-snug" style={{ color: "hsl(0 0% 100%)" }}>{title}</h3>
              </div>
              <p className="font-body leading-relaxed text-sm" style={{ color: "hsl(0 0% 100%)" }}>{desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration Modal ────────────────────────────────────────────────────────
function RegistrationModal({
  open,
  onClose,
  onUnlock,
}: {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") ?? "");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error: fnError } = await supabase.functions.invoke("register-repris", {
        body: { name: name.trim(), email: email.trim() },
      });

      if (fnError || !data?.success) {
        throw new Error(fnError?.message || data?.error || "Registration failed");
      }

      onUnlock();
      onClose();
    } catch (err) {
      console.error("Registration error:", err);
      setError("Något gick fel. Försök igen.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "hsl(0 0% 0% / 0.72)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 relative"
        style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}
      >
        <button
          onClick={onClose}
          aria-label="Stäng"
          className="absolute top-4 right-4 p-1 rounded-full transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <X className="w-5 h-5" />
        </button>

        <>
          <h2 className="font-body text-3xl font-bold mb-6 text-foreground">
            Se hela reprisen
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-firstname" className="block text-sm mb-1.5 font-medium text-foreground">
                Förnamn
              </label>
              <input
                id="reg-firstname"
                className="input-dark"
                type="text"
                placeholder="Ditt förnamn"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-sm mb-1.5 font-medium text-foreground">
                E-postadress
              </label>
              <input
                id="reg-email"
                className="input-dark"
                type="email"
                placeholder="din@epost.se"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm" style={{ color: "hsl(var(--destructive))" }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-4 text-base rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? "Registrerar…" : "Se hela reprisen"}
            </button>
          </form>
        </>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section
      className="py-20 px-4"
      style={{ borderTop: "1px solid hsl(var(--border))" }}
    >
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="font-body text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Tidigare klienter
          </h2>
        </Reveal>

        {/* Video testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { name: "Fredrik", url: "https://www.youtube.com/embed/bT_5xwpLDbs" },
            { name: "Caroline", url: "https://www.youtube.com/embed/_4r0nCWrCCw" },
            { name: "Klas", url: "https://www.youtube.com/embed/bZ0jF2Ag7Mc" },
          ].map(({ name, url }, i) => (
            <Reveal key={name} delay={i * 0.1}>
            <div
              className="rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{ border: "1px solid hsl(var(--border))", aspectRatio: "16/9" }}
            >
              <iframe
                className="w-full h-full"
                src={url}
                title={`Testimonial – ${name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            </Reveal>
          ))}
        </div>

        {/* Screenshot testimonials */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
          {[
              { src: testimonial1, name: "Skriftlig recension från klient 1" },
              { src: testimonial2, name: "Skriftlig recension från klient 2" },
              { src: testimonial3, name: "Skriftlig recension från klient 3" },
            ].map(({ src, name }, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={src} alt={name} className="w-full h-auto block" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial8} alt="Skriftlig recension från tidigare klient om Tomas Lydahls coaching" className="w-full h-auto block" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial7} alt="Skriftlig recension från tidigare klient om resultat efter coaching" className="w-full h-auto block" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial9} alt="Skriftlig recension från tidigare klient om självförtroende" className="w-full h-auto block" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={testimonial10} alt="Skriftlig recension från tidigare klient om upplevelsen av coaching" className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Tomas Lydahl. Alla rättigheter förbehållna.
        </p>
        <div className="flex gap-6">
          <a
            href="https://tomaslydahl.se"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            tomaslydahl.se
          </a>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            Integritetspolicy
          </Link>
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            Användarvillkor
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA({ onVideoClick }: { onVideoClick: () => void }) {
  return (
    <section
      className="py-16 px-4 text-center"
      style={{ borderTop: "1px solid hsl(var(--border))" }}
    >
      <h2 className="font-body text-3xl md:text-4xl font-bold text-foreground mb-3">
        Redo att se hela reprisen?
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
        Klicka nedan för att låsa upp föreläsningen direkt
      </p>
      <button
        onClick={onVideoClick}
        className="btn-gold inline-flex items-center gap-3 px-8 py-4 rounded-lg text-base md:text-lg font-semibold"
      >
        Se hela reprisen
      </button>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
const Index = ({ videoEmbedUrl, videoThumbnailUrl }: { videoEmbedUrl?: string; videoThumbnailUrl?: string } = {}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    (window as any).fbq?.('track', 'ViewContent', { content_name: 'Webinar Replay', content_type: 'video' });
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 160% 55% at 50% 0%, hsl(42 38% 14% / 0.55) 0%, hsl(var(--background)) 55%), hsl(var(--background))",
      }}
    >
      <CountdownBlock />
      <HeroSection onVideoClick={() => setModalOpen(true)} unlocked={unlocked} videoEmbedUrl={videoEmbedUrl} videoThumbnailUrl={videoThumbnailUrl} />
      <KeyLearningsSection />
      <TestimonialsSection />
      {!unlocked && <BottomCTA onVideoClick={() => setModalOpen(true)} />}
      <Footer />
      <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} onUnlock={handleUnlock} />
    </main>
  );
};

export default Index;
