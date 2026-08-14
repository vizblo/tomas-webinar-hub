import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Brain, Shield, Heart, X, MessageCircle, Loader2, Check, Play } from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";
import { SiteFooter } from "@/components/shared/SiteFooter";

import testimonial1 from "@/assets/repris/testimonial-old-1.png";
import testimonial2 from "@/assets/repris/testimonial-old-2.png";
import testimonial3 from "@/assets/repris/testimonial-old-3.jpg";
import testimonial7 from "@/assets/repris/testimonial-old-7.jpg";
import testimonial8 from "@/assets/repris/testimonial-old-8.jpg";
import testimonial9 from "@/assets/repris/testimonial-old-9.jpg";
import testimonial10 from "@/assets/repris/testimonial-old-10.jpg";

// ─── Countdown to fixed deadline (svensk tid) ────────────────────────────────
const DEADLINE = new Date("2026-08-14T23:59:00+02:00");

const CALENDLY_URL =
  "https://calendly.com/tomas-tomaslydahl/webinar?utm_source=webinar&utm_medium=replay&utm_content=webinar-replay&hide_gdpr_banner=1";

function scrollToBooking() {
  document.getElementById("boka")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useCountdown() {
  const calc = () => {
    const diff = DEADLINE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: false,
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
function CountdownBlock({
  days,
  hours,
  minutes,
  seconds,
  expired,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}) {
  const slots = [
    { label: "Dagar", value: days },
    { label: "Timmar", value: hours },
    { label: "Min", value: minutes },
    { label: "Sek", value: seconds },
  ];

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-3 text-center sm:px-6">
        {expired ? (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <p className="text-sm font-semibold text-foreground">
              Reprisen är inte längre tillgänglig.
            </p>
            <button
              onClick={scrollToBooking}
              className="text-sm font-semibold text-gold underline-offset-4 transition-colors hover:underline"
            >
              Boka ett samtal med Tomas
            </button>
          </div>
        ) : (
          <>
            <div className="flex w-full flex-nowrap items-center justify-center gap-3 sm:w-auto sm:gap-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="live-dot" aria-hidden="true" />
                <p className="text-center text-xs font-bold uppercase leading-tight tracking-wide text-foreground sm:text-sm">
                  Föreläsningen
                  <br /> försvinner om
                </p>
              </div>

              <div className="flex items-start justify-center gap-1.5 sm:gap-3">
                {slots.map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="min-w-[38px] rounded-md border border-border bg-surface-elevated px-2 py-1.5 text-base font-bold leading-none tabular-nums text-foreground sm:px-2.5 sm:text-lg md:text-xl">
                      {String(value).padStart(2, "0")}
                    </div>
                    <span className="mt-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="whitespace-nowrap rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold">
              Begränsat antal platser
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Lazy YouTube facade ─────────────────────────────────────────────────────
function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="group relative aspect-video overflow-hidden rounded-xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full"
          aria-label={`Spela upp ${title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-background/40" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection({
  onVideoClick,
  unlocked,
  expired,
  videoEmbedUrl,
  videoThumbnailUrl,
}: {
  onVideoClick: () => void;
  unlocked: boolean;
  expired: boolean;
  videoEmbedUrl?: string;
  videoThumbnailUrl?: string;
}) {
  const showVideo = unlocked && !expired;
  return (
    <section className="relative px-4 pt-10 pb-16 md:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 animate-fade-in whitespace-pre-line text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          <span>{"REPRIS: Låt din "}</span>
          <span className="text-gold">självkänsla</span>
          <span>{" träda fram:\nKonsten att "}</span>
          <span className="text-gold">älska dig själv</span>
          <span>{" oavsett vad"}</span>
        </h1>
        <div className="gold-divider" />
        <p
          className="mx-auto mb-10 max-w-2xl animate-fade-in text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}
        >
          {expired
            ? "Reprisen har stängt – men du kan fortfarande boka ett kostnadsfritt samtal med Tomas."
            : "Se hela den digitala föreläsningen innan reprisen stänger."}
        </p>

        {!expired && (
          <div
            className="relative mx-auto mb-10 aspect-video max-w-2xl animate-scale-in overflow-hidden rounded-xl border-2 border-gold/30 bg-surface"
          >
            {showVideo ? (
              videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  title="Repris av föreläsningen"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface">
                  <p className="text-sm text-muted-foreground">Videon laddas…</p>
                </div>
              )
            ) : (
              <button
                onClick={onVideoClick}
                className="group absolute inset-0 flex h-full w-full items-center justify-center"
                aria-label="Lås upp reprisen"
              >
                <span
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={
                    videoThumbnailUrl
                      ? { backgroundImage: `url(${videoThumbnailUrl})` }
                      : { background: "hsl(var(--surface))" }
                  }
                />
                <span className="absolute inset-0 bg-background/50 transition-colors group-hover:bg-background/40" />
                <span className="relative px-6 text-center">
                  <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
                  </span>
                  <span className="block text-lg font-semibold text-foreground">
                    Klicka för att låsa upp reprisen
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Anmäl dig för att se hela föreläsningen
                  </span>
                </span>
              </button>
            )}
          </div>
        )}

        {expired ? (
          <button
            onClick={scrollToBooking}
            className="btn-gold px-8 py-4 text-base md:text-lg"
          >
            Boka ett samtal
          </button>
        ) : (
          !unlocked && (
            <button onClick={onVideoClick} className="btn-gold px-8 py-4 text-base md:text-lg">
              Se hela reprisen
            </button>
          )
        )}
      </div>

      {/* Calendly */}
      <div id="boka" className="mx-auto mt-16 w-full max-w-5xl scroll-mt-8">
        <Reveal>
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl">
            Boka ett samtal med Tomas
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-xl border border-border bg-white">
            <iframe
              src={CALENDLY_URL}
              title="Boka samtal – Tomas Lydahl"
              className="h-[820px] w-full sm:h-[950px] lg:h-[1050px]"
              loading="lazy"
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
    <section className="section-y border-t border-border bg-surface px-4">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="section-label mb-3 text-center">Vad du missade från föreläsningen</p>
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            Under denna föreläsning får du
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {learnings.map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-lg font-bold text-gold">
                    {i + 1}
                  </div>
                  <h3 className="text-base font-bold leading-snug text-foreground">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Escape + scroll lock + initial focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open, onClose]);

  // Reset transient state between openings
  useEffect(() => {
    if (!open) {
      setLoading(false);
      setSuccess(false);
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) {
      setError("Fyll i ditt förnamn.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      setError("Kontrollera att e-postadressen är korrekt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error: fnError } = await supabase.functions.invoke("register-repris", {
        body: { name: trimmedName, email: trimmedEmail },
      });

      if (fnError) throw new Error("network");
      if (!data?.success) throw new Error("rejected");

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onUnlock();
        onClose();
      }, 900);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        (err as Error)?.message === "network"
          ? "Vi kunde inte nå servern. Kontrollera din uppkoppling och försök igen."
          : "Registreringen gick inte igenom. Kontrollera dina uppgifter och försök igen.",
      );
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="repris-modal-title"
        className="relative w-full max-w-md animate-scale-in rounded-2xl border border-border bg-surface p-8 shadow-gold"
      >
        <button
          onClick={onClose}
          aria-label="Stäng"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-primary-foreground">
              <Check className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-bold text-foreground">Du är anmäld!</h2>
            <p className="text-sm text-muted-foreground">Låser upp reprisen…</p>
          </div>
        ) : (
          <>
            <h2 id="repris-modal-title" className="mb-6 text-3xl font-bold text-foreground">
              Se hela reprisen
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="reg-firstname" className="mb-1.5 block text-sm font-medium text-foreground">
                  Förnamn
                </label>
                <input
                  id="reg-firstname"
                  ref={firstFieldRef}
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
                <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  E-postadress
                </label>
                <input
                  id="reg-email"
                  className="input-dark"
                  type="email"
                  inputMode="email"
                  placeholder="din@epost.se"
                  autoComplete="email"
                  enterKeyHint="go"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full gap-2 py-4 text-base disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Registrerar…" : "Se hela reprisen"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const videoTestimonials = [
  { name: "Fredrik", id: "bT_5xwpLDbs" },
  { name: "Caroline", id: "_4r0nCWrCCw" },
  { name: "Klas", id: "bZ0jF2Ag7Mc" },
];

const screenshotTestimonials = [
  { src: testimonial1, alt: "Skriftlig recension från klient" },
  { src: testimonial2, alt: "Skriftlig recension från klient" },
  { src: testimonial3, alt: "Skriftlig recension från klient" },
  { src: testimonial8, alt: "Skriftlig recension om Tomas Lydahls coaching" },
  { src: testimonial7, alt: "Skriftlig recension om resultat efter coaching" },
  { src: testimonial9, alt: "Skriftlig recension om självförtroende" },
  { src: testimonial10, alt: "Skriftlig recension om upplevelsen av coaching" },
];

function TestimonialsSection() {
  return (
    <section className="section-y border-t border-border px-4">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="section-label mb-3 text-center">Vad andra säger</p>
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
            Tidigare klienter
          </h2>
        </Reveal>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {videoTestimonials.map(({ name, id }, i) => (
            <Reveal key={name} delay={i * 90}>
              <YouTubeFacade id={id} title={`Intervju med ${name}`} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="columns-2 gap-4 sm:columns-3">
            {screenshotTestimonials.map(({ src, alt }, i) => (
              <figure
                key={i}
                className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-surface-elevated/40 p-2 transition-colors hover:border-gold/40"
              >
                <img src={src} alt={alt} loading="lazy" className="block w-full rounded-lg" />
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA({ onVideoClick, expired }: { onVideoClick: () => void; expired: boolean }) {
  return (
    <section className="section-y border-t border-border px-4 text-center">
      <Reveal>
        <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
          {expired ? "Redo att ta nästa steg?" : "Redo att se hela reprisen?"}
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {expired
            ? "Boka ett kostnadsfritt samtal med Tomas och få hjälp med nästa steg."
            : "Klicka nedan för att låsa upp föreläsningen direkt."}
        </p>
        <button
          onClick={expired ? scrollToBooking : onVideoClick}
          className="btn-gold px-8 py-4 text-base md:text-lg"
        >
          {expired ? "Boka ett samtal" : "Se hela reprisen"}
        </button>
      </Reveal>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
const Repris = ({
  videoEmbedUrl,
  videoThumbnailUrl,
}: { videoEmbedUrl?: string; videoThumbnailUrl?: string } = {}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const { days, hours, minutes, seconds, expired } = useCountdown();

  useEffect(() => {
    document.title = "Repris: Låt din självkänsla träda fram — Tomas Lydahl";
    const desc =
      "Se reprisen av Tomas Lydahls digitala föreläsning om självkänsla – konsten att älska dig själv oavsett vad. Tillgänglig under en begränsad tid.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  useEffect(() => {
    (window as any).fbq?.("track", "ViewContent", {
      content_name: "Webinar Replay",
      content_type: "video",
    });
  }, []);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 160% 55% at 50% 0%, hsl(42 38% 14% / 0.55) 0%, hsl(var(--background)) 55%), hsl(var(--background))",
      }}
    >
      <CountdownBlock
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        expired={expired}
      />
      <HeroSection
        onVideoClick={() => setModalOpen(true)}
        unlocked={unlocked}
        expired={expired}
        videoEmbedUrl={videoEmbedUrl}
        videoThumbnailUrl={videoThumbnailUrl}
      />
      <KeyLearningsSection />
      <TestimonialsSection />
      {(!unlocked || expired) && (
        <BottomCTA onVideoClick={() => setModalOpen(true)} expired={expired} />
      )}
      <SiteFooter />
      <RegistrationModal
        open={modalOpen && !expired}
        onClose={() => setModalOpen(false)}
        onUnlock={handleUnlock}
      />
    </main>
  );
};

export default Repris;
