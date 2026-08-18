import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Calendar, Clock, Shield, Brain, Heart, X, Ticket, MessageCircle, Check, XCircle } from "lucide-react";
import tomasPortrait2 from "@/assets/tomas-portrait-2.webp";
import ebookCover from "@/assets/ebook-katastroftankar.png.asset.json";
import testimonial1 from "@/assets/testimonial-1.webp";
import testimonial2 from "@/assets/testimonial-2.webp";
import testimonial3 from "@/assets/testimonial-3.webp";
import testimonial7 from "@/assets/testimonial-7.webp";
import testimonial8 from "@/assets/testimonial-8.webp";
import testimonial9 from "@/assets/testimonial-9.webp";
import testimonial10 from "@/assets/testimonial-10.webp";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { trackRegistration } from "@/lib/tracking";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { WistiaPlayer } from "@/components/WistiaPlayer";
import { getEventDate, formatEventDayMonthYear, formatEventTime } from "@/lib/eventDate";

// Rolling lecture date (25 Aug 2026 19:00 Stockholm, then every 14 days)
const WEBINAR_DATE = getEventDate();
const WEBINAR_DATE_LABEL = formatEventDayMonthYear(WEBINAR_DATE);
const WEBINAR_TIME_LABEL = formatEventTime(WEBINAR_DATE);

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff % 86400000 / 3600000),
      minutes: Math.floor(diff % 3600000 / 60000),
      seconds: Math.floor(diff % 60000 / 1000)
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const benefits = [
{
  num: "1",
  icon: Brain,
  title: "Varför hjärnan skapar katastroftankar",
  desc: "Förstå varför ditt sinne målar upp värsta tänkbara scenarier, och varför det inte betyder att något är fel på dig."
},
{
  num: "2",
  icon: Shield,
  title: "Varför 99% av dem aldrig slår in",
  desc: "Lär dig skillnaden mellan en tanke och en sanning, och varför nästan inget av det du oroar dig för faktiskt händer."
},
{
  num: "3",
  icon: Heart,
  title: "Hur du slutar lyssna på dem",
  desc: "Konkreta principer för att låta katastroftankarna passera utan att de styr ditt liv, utan tekniker eller kamp."
},
{
  num: "4",
  icon: MessageCircle,
  title: "BONUS: Live Q&A i slutet",
  desc: "Direkt efter föreläsningen får du ställa dina frågor till Tomas live. En unik möjlighet att få personlig vägledning."
}];


function useCountUp(target: number, duration = 1600, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);else
      setCount(target);
    };
    requestAnimationFrame(step);
  }, [enabled, target, duration]);
  return count;
}


const LandingPage = () => {
  const navigate = useNavigate();
  useScrollReveal();
  // Static stats (animations removed)
  const count1 = 15;
  const count2 = 1000;
  const count3 = 500;

  // Sticky CTA bar visibility - appears after scrolling past the hero form
  const formRef = useRef<HTMLDivElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = formRef.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom;
      setStickyVisible(bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pre-fill form from URL params: ?name=Anna&email=anna@epost.se
  const searchParams = new URLSearchParams(window.location.search);
  const [formData, setFormData] = useState({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || ""
  });
  // UTM / ad tracking parameters — captured on landing, persisted in sessionStorage
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbadid"] as const;
  const [tracking, setTracking] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const key of UTM_KEYS) initial[key] = "direct";
    return initial;
  });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const fromUrl = params.get(key);
      if (fromUrl) {
        next[key] = fromUrl;
        try { sessionStorage.setItem(key, fromUrl); } catch { /* ignore */ }
      } else {
        const stored = (() => { try { return sessionStorage.getItem(key); } catch { return null; } })();
        next[key] = stored || "direct";
      }
    }
    setTracking(next);
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const countdown = useCountdown(WEBINAR_DATE);

  // Auto-open modal if URL contains ?open=1
  useEffect(() => {
    if (searchParams.get("open") === "1") setModalOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      await fetch(`${supabaseUrl}/functions/v1/register-contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.name,
          phone: formData.phone,
          type: "webinar",
          ...tracking
        })
      });
    } catch (err) {
      console.error("Registration error:", err);
    }

    trackRegistration({
      email: formData.email,
      first_name: formData.name,
      phone: formData.phone,
    });

    setLoading(false);
    setSubmitted(true);
    setTimeout(() => navigate("/tack"), 1000);
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Helmet>
        <title>Släpp dina katastroftankar - Tomas Lydahl</title>
        <meta name="description" content={`Anmäl dig till Tomas Lydahls kostnadsfria digitala föreläsning den ${WEBINAR_DATE_LABEL} om insikterna som hjälpt hundratals människor släppa sina katastroftankar.`} />
        <link rel="canonical" href="https://tomaslydahlwebinars.com/" />
        <meta property="og:title" content="Släpp dina katastroftankar - Tomas Lydahl" />
        <meta property="og:description" content={`Kostnadsfri digital föreläsning med Tomas Lydahl den ${WEBINAR_DATE_LABEL} om att släppa katastroftankar.`} />
        <meta property="og:url" content="https://tomaslydahlwebinars.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* COUNTDOWN TIMER BAR */}
      <div style={{ background: "hsl(var(--surface))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-center">
          {/* Live dot + Label + Timer (always one row on mobile) */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-nowrap w-full sm:w-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="live-dot" aria-hidden="true" />
              <p
                className="text-xs sm:text-sm font-bold uppercase tracking-wide text-center"
                style={{ color: "hsl(var(--foreground))", fontFamily: "sans-serif", lineHeight: 1.1 }}>
                DIGITAL FÖRELÄSNING<br /> STARTAR OM
              </p>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            {[
            { label: "DAGAR", value: countdown.days },
            { label: "TIMMAR", value: countdown.hours },
            { label: "MIN", value: countdown.minutes },
            { label: "SEK", value: countdown.seconds }].
            map(({ label, value }) =>
            <div key={label} className="text-center">
                <div
                  className="text-base sm:text-lg md:text-xl font-bold leading-none tabular-nums px-2 sm:px-2.5 py-1.5 rounded-md"
                  style={{ color: "hsl(var(--foreground))", fontFamily: "sans-serif", background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))", minWidth: "38px" }}>
                  {String(value).padStart(2, "0")}
                </div>
              </div>
            )}
            </div>
          </div>

          {/* Begränsat antal platser */}
          <div
            className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
            style={{
              border: "1px solid hsl(var(--gold) / 0.4)",
              color: "hsl(var(--gold))",
              fontFamily: "sans-serif"
            }}>
            Begränsat antal platser
          </div>
        </div>
      </div>

      <main>
      {/* HERO */}
      <section className="hero-gradient pt-8 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            {/* Title + video + CTA */}
            <div ref={formRef} className="text-center">
              <p className="section-label mb-4 font-sans">KOSTNADSFRI DIGITAL FÖRELÄSNING</p>
              <h1 className="text-[1.6rem] sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-5 font-sans" style={{ fontFamily: "sans-serif", color: "hsl(0 0% 100%)" }}>
                De insikterna som hjälpt <span style={{ color: "hsl(var(--gold))" }}>hundratals människor</span> släppa sina <span style={{ color: "hsl(var(--gold))" }}>katastroftankar</span>
              </h1>
              <p className="text-base md:text-lg mb-6 font-sans" style={{ color: "hsl(var(--foreground))" }}>
                Utan år av terapi, jobbiga övningar eller fler tekniker du redan provat.
              </p>

              {/* Hero video */}
              <div
                className="rounded-xl overflow-hidden mb-6 mx-auto max-w-2xl"
                style={{ border: "2px solid hsl(var(--gold) / 0.3)", background: "hsl(var(--surface))" }}>
                <WistiaPlayer mediaId="d8kio84jnn" />
              </div>

              {/* Date/Time badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "sans-serif"
                  }}>
                  <Calendar className="w-4 h-4" style={{ color: "hsl(var(--gold))" }} />
                  {WEBINAR_DATE_LABEL}
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                    fontFamily: "sans-serif"
                  }}>
                  <Clock className="w-4 h-4" style={{ color: "hsl(var(--gold))" }} />
                  Kl. {WEBINAR_TIME_LABEL}
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold px-6 py-4 inline-flex items-center justify-center gap-2.5 w-full sm:w-auto md:min-w-[300px]">
                <Ticket className="w-5 h-5" />
                <span className="flex flex-col items-center leading-tight">
                  <span className="font-bold tracking-wide text-base">SÄKRA MIN PLATS</span>
                  <span className="text-xs font-normal opacity-90">Kostnadsfri registrering</span>
                </span>
              </button>
              <div
                className="mt-4 rounded-lg p-3 flex items-center gap-3 text-left max-w-sm mx-auto"
                style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.25)" }}>
                <img
                  src={ebookCover.url}
                  alt="E-bok: Varför vi tror på katastroftankar"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-auto flex-shrink-0 rounded" />
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold mb-0.5"
                    style={{ color: "hsl(var(--gold))", fontFamily: "'Source Sans 3', sans-serif" }}>
                    Bonus vid registrering
                  </p>
                  <p
                    className="text-sm font-bold leading-tight"
                    style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                    Gratis e-bok: Varför vi tror på katastroftankar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section
        className="py-20 px-6"
        style={{ background: "hsl(var(--surface))", borderTop: "1px solid hsl(var(--border))" }}>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-sans" style={{ color: "hsl(var(--foreground))" }}>
              Vad du får med dig från föreläsningen
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) =>
              <div
                key={benefit.num}
                className="rounded-xl p-6 flex flex-col gap-4 cursor-default"
                style={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))"
                }}>


                <div className="flex items-center gap-3">
                  <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold"
                  style={{
                    background: "hsl(var(--gold) / 0.12)",
                    border: "1px solid hsl(var(--gold) / 0.25)",
                    color: "hsl(var(--gold))",
                    fontFamily: "sans-serif"
                  }}>

                    {benefit.num}
                  </div>
                  <h3 className="font-bold text-base font-sans" style={{ color: "hsl(var(--foreground))" }}>
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed font-sans" style={{ color: "hsl(var(--foreground))" }}>
                  {benefit.desc}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOR YOU / NOT FOR YOU */}
      <section
        className="py-20 px-6"
        style={{ background: "hsl(var(--background))", borderTop: "1px solid hsl(var(--border))" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* For you */}
            <div className="rounded-xl p-8" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
              <h3 className="text-2xl font-bold mb-6 font-sans" style={{ color: "hsl(var(--foreground))" }}>
                Det här är för dig om...
              </h3>
              <ul className="space-y-4">
                {[
                  "Ditt huvud målar ofta upp värsta tänkbara scenarier",
                  "Du oroar dig för saker som nästan aldrig händer",
                  "Du fastnar i tankarna, analyserar allt och är sällan riktigt närvarande",
                  "Du har provat tekniker och övningar men faller tillbaka så fort det börjar gå bra"
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold"
                      style={{
                        background: "hsl(var(--gold) / 0.15)",
                        border: "1px solid hsl(var(--gold) / 0.4)",
                        color: "hsl(var(--gold))"
                      }}>
                      {i + 1}
                    </span>
                    <span className="font-sans" style={{ color: "hsl(var(--foreground))" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not for you */}
            <div className="rounded-xl p-8" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
              <h3 className="text-2xl font-bold mb-6 font-sans" style={{ color: "hsl(var(--foreground))" }}>
                Det här är <span style={{ color: "hsl(0 72% 55%)" }}>INTE</span> för dig om...
              </h3>
              <ul className="space-y-4">
                {[
                  "Du sällan eller aldrig fastnar i oro och katastroftankar",
                  "Du inte är beredd att lägga 60 minuter på dig själv",
                  "Du inte är redo att göra en förändring i ditt liv",
                  "Du letar efter ännu en teknik att kämpa emot dina tankar med"
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "hsl(0 72% 55% / 0.12)", border: "1px solid hsl(0 72% 55% / 0.4)" }}>
                      <XCircle className="w-3.5 h-3.5" style={{ color: "hsl(0 72% 55%)" }} />
                    </span>
                    <span className="font-sans" style={{ color: "hsl(var(--foreground))" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section
        className="py-16 px-6"
        style={{ background: "hsl(var(--surface))", borderTop: "1px solid hsl(var(--border))" }}>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center"
          style={{ background: "hsl(var(--background))", border: "2px dashed hsl(var(--gold) / 0.35)" }}>

            <div className="w-40 flex-shrink-0">
              <img
                src={ebookCover.url}
                alt="E-bok: Varför vi tror på katastroftankar"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain" />
              
            </div>
            <div>
              <p className="section-label mb-2 font-sans">GRATIS BONUS NÄR DU ANMÄLER DIG</p>
              <h3 className="text-2xl font-bold mb-3 font-sans" style={{ color: "hsl(var(--foreground))" }}>
                Varför vi tror på katastroftankar, och vad som händer när de avslöjas
              </h3>
              <p className="mb-5" style={{ color: "hsl(var(--foreground))" }}>
                När du anmäler dig till föreläsningen får du även min e-bok som bonus. Den visar varför hjärnan skapar katastroftankar, varför nästan inga av dem slår in, och vad som händer när du ser igenom dem. Helt kostnadsfritt som en grund inför föreläsningen.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold px-6 py-4 inline-flex items-center gap-2.5">
                <Ticket className="w-5 h-5" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="font-bold tracking-wide text-base">SÄKRA MIN PLATS</span>
                  <span className="text-xs font-normal opacity-90">Kostnadsfri registrering</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TOMAS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans" style={{ color: "hsl(var(--foreground))" }}>Vem är Tomas?

              </h2>
              <div className="gold-divider-left" />
              <div
                className="rounded-xl overflow-hidden mt-6 md:hidden"
                style={{ border: "2px solid hsl(var(--gold) / 0.25)" }}>
                <img
                  src={tomasPortrait2}
                  alt="Tomas Lydahl"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                  style={{ maxHeight: "450px", objectPosition: "top" }} />
              </div>
              <div className="space-y-4 mt-6" style={{ color: "hsl(var(--foreground))" }}>
                <p className="font-sans">Tomas är en mental coach, författare och föreläsare med över 15 års erfarenhet av professionell coachning.</p>
                <p className="font-sans">
              Tomas har själv levt med katastroftankar. Han vet hur det känns när huvudet ständigt målar upp det värsta som kan hända. När Tomas väl insåg principerna som han går igenom på föreläsningen, förändrades allting.
                </p>
                <p className="font-sans">
                  Tomas fokus ligger på djup förståelse snarare än ytliga "quick fixes". När du förstår hur ditt sinne fungerar, förändras allt automatiskt, utan att du behöver kämpa eller anstränga dig.
                </p>
              </div>
              <div className="flex gap-6 mt-8">
                {([
                { value: count1, suffix: "+", label: "Års erfarenhet" },
                { value: count2, suffix: "+", label: "Hjälpta människor" },
                { value: count3, suffix: "+", label: "Föreläsningar" }] as
                {value: number;suffix: string;label: string;}[]).map(({ value, suffix, label }) =>
                <div key={label}>
                    <p className="text-2xl font-bold tabular-nums" style={{ color: "hsl(var(--gold))", fontFamily: "sans-serif" }}>
                      {value}{suffix}
                    </p>
                    <p className="text-xs" style={{ color: "hsl(var(--foreground))" }}>{label}</p>
                  </div>
                )}
              </div>
            </div>
            <div
              className="rounded-xl overflow-hidden hidden md:block"
              style={{ border: "2px solid hsl(var(--gold) / 0.25)" }}>

              <img
                src={tomasPortrait2}
                alt="Tomas Lydahl"
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
                style={{ maxHeight: "450px", objectPosition: "top" }} />

            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="py-20 px-6"
        style={{ borderTop: "1px solid hsl(var(--border))" }}>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold font-sans md:text-4xl" style={{ color: "hsl(var(--foreground))" }}>Tidigare klienter

            </h2>
            <div className="gold-divider" />
          </div>

          {/* Video testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
            { name: "Fredrik", url: "https://www.youtube.com/embed/bT_5xwpLDbs" },
            { name: "Caroline", url: "https://www.youtube.com/embed/_4r0nCWrCCw" },
            { name: "Klas", url: "https://www.youtube.com/embed/bZ0jF2Ag7Mc" }].
            map(({ name, url }, i) =>
            <div key={name} className="rounded-xl overflow-hidden" style={{ border: "1px solid hsl(var(--border))" }}>
                <div style={{ aspectRatio: "16/9" }}>
                  <iframe
                  className="w-full h-full"
                  src={url}
                  title={`Videoomdöme om Tomas Lydahl – ${name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />

                </div>
              </div>
            )}
          </div>

          {/* Screenshot testimonials – row1: 3 equal | row2: 1 tall left + 3 stacked right */}
          <div className="mt-8 space-y-4">
            {/* Row 1: 3 screenshots */}
            <div className="grid grid-cols-3 gap-4">
              {[testimonial1, testimonial2, testimonial3].map((src, i) =>
              <div key={i} className="rounded-xl overflow-hidden">
                  <img src={src} alt={`Skriftligt kundomdöme om Tomas Lydahl ${i + 1}`} loading="lazy" decoding="async" className="w-full h-auto block" />
                </div>
              )}
            </div>
            {/* Row 2: 2 stacked on left, 2 stacked on right */}
            <div className="grid grid-cols-2 gap-4 items-start">
              {/* Left: testimonial8 + TACK Tomas (testimonial7) below */}
              <div className="flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden">
                  <img src={testimonial8} alt="Skriftligt kundomdöme om Tomas Lydahl" loading="lazy" decoding="async" className="w-full h-auto block" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src={testimonial7} alt="TACK Tomas" loading="lazy" decoding="async" className="w-full h-auto block" />
                </div>
              </div>
              {/* Right: Hej Thomas (top), God Jul (bottom) */}
              <div className="flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden">
                  <img src={testimonial9} alt="Hej Tomas – Bettan" loading="lazy" decoding="async" className="w-full h-auto block" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src={testimonial10} alt="God jul" loading="lazy" decoding="async" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-sans" style={{ color: "hsl(var(--foreground))" }}>
            Redo att släppa dina katastroftankar?
          </h2>
          <p className="mb-8 text-lg" style={{ color: "hsl(var(--foreground))" }}>
            Säkra din kostnadsfria plats på föreläsningen idag.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-gold px-6 py-4 inline-flex items-center gap-2.5">
            <Ticket className="w-5 h-5" />
            <span className="flex flex-col items-start leading-tight">
              <span className="font-bold tracking-wide text-base">SÄKRA MIN PLATS</span>
              <span className="text-xs font-normal opacity-90">Kostnadsfri registrering</span>
            </span>
          </button>
        </div>
      </section>

      </main>
      {/* FOOTER */}
      <footer
        className="py-8 pb-36 text-center text-xs"
        style={{
          borderTop: "1px solid hsl(var(--border))",
          color: "hsl(var(--foreground))"
        }}>

        <p className="mb-4">
          © {new Date().getFullYear()} Tomas Lydahl AB. Alla rättigheter förbehållna.
        </p>
        <p className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1" style={{ color: "hsl(var(--muted-foreground))" }}>
          <a href="mailto:tomas@tomaslydahl.se" className="transition-colors hover:opacity-80 gold-text">
            tomas@tomaslydahl.se
          </a>
          <span style={{ opacity: 0.4 }}>·</span>
          <a href="/privacy" className="transition-colors hover:opacity-80">
            Integritetspolicy
          </a>
          <span style={{ opacity: 0.4 }}>·</span>
          <a href="/terms" className="transition-colors hover:opacity-80">
            Användarvillkor
          </a>
        </p>
        <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
          Denna webbplats är inte en del av Facebook eller Meta Platforms, Inc. Webbplatsen är inte heller godkänd eller sponsrad av Facebook eller Meta på något sätt. Facebook och Meta är varumärken som tillhör Meta Platforms, Inc. Tomas Lydahl AB garanterar inga specifika inkomster eller resultat. Individuella resultat varierar beroende på insats, erfarenhet och genomförande.
        </p>
      </footer>


      {/* REGISTRATION MODAL */}
      {modalOpen &&
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "hsl(0 0% 0% / 0.7)" }}
        onClick={(e) => {if (e.target === e.currentTarget) setModalOpen(false);}}>

          <div
          className="w-full max-w-md rounded-2xl p-8 relative"
          style={{
            background: "hsl(var(--surface))",
            border: "1px solid hsl(var(--border))"
          }}>

            <button
            onClick={() => setModalOpen(false)}
            aria-label="Stäng"
            className="absolute top-4 right-4 p-1 rounded-full transition-colors"
            style={{ color: "hsl(var(--foreground))" }}>

              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6 whitespace-nowrap" style={{ color: "hsl(var(--foreground))", fontFamily: "sans-serif" }}>
              Säkra din kostnadsfria plats
            </h2>

            {submitted ?
          <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "hsl(var(--gold))" }} />
                <p className="font-bold" style={{ color: "hsl(var(--foreground))" }}>Du är anmäld!</p>
                <p className="text-sm mt-1" style={{ color: "hsl(var(--foreground))" }}>Vidarebefordrar dig till tacksidan…</p>
              </div> :

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on" name="registration">
                {UTM_KEYS.map((key) => (
                  <input key={key} type="hidden" name={key} value={tracking[key] || "direct"} readOnly />
                ))}
                <div>
                  <label htmlFor="modal-name" className="block text-sm mb-1.5 font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    Ditt namn
                  </label>
                  <input
                id="modal-name"
                className="input-dark"
                type="text"
                placeholder="Förnamn"
                autoComplete="given-name"
                name="given-name"
                autoCapitalize="words"
                enterKeyHint="next"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required />

                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-sm mb-1.5 font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    E-postadress
                  </label>
                  <input
                id="modal-email"
                className="input-dark"
                type="email"
                placeholder="din@epost.se"
                autoComplete="email"
                name="email"
                inputMode="email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="next"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required />

                </div>
                <div>
                  <label htmlFor="modal-phone" className="block text-sm mb-1.5 font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    Telefonnummer
                  </label>
                  <PhoneInput
                    id="modal-phone"
                    className="input-dark phone-input-dark"
                    international
                    defaultCountry="SE"
                    countryCallingCodeEditable={false}
                    placeholder="70 123 45 67"
                    autoComplete="tel"
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    enterKeyHint="done"
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                    required />
                </div>
                <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 flex items-center justify-center gap-3">
                  <Ticket className="w-5 h-5" />
                  <span className="flex flex-col items-center leading-tight">
                    <span className="font-bold tracking-wide" style={{ fontSize: "1rem" }}>{loading ? "REGISTRERAR…" : "SÄKRA MIN PLATS"}</span>
                    <span className="text-xs font-normal opacity-90">Kostnadsfri registrering</span>
                  </span>
                </button>
                <p className="text-xs text-center" style={{ color: "hsl(var(--foreground))" }}>
                  Genom att registrera dig så godkänner du att ta emot påminnelser. Vi skickar inget spam, avsluta när du vill.
                </p>
              </form>
          }
          </div>
        </div>
      }

      {/* STICKY BOTTOM CTA BAR */}
      <div
        className={`sticky-cta fixed bottom-0 left-0 right-0 z-50 px-4 py-2 ${stickyVisible ? "is-visible" : ""}`}
        style={{
          background: "hsl(var(--surface))",
          borderTop: "1px solid hsl(var(--border))",
          boxShadow: "0 -4px 16px hsl(0 0% 0% / 0.25)"
        }}>
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-1">
          <p className="text-sm font-bold font-sans text-center" style={{ color: "hsl(var(--foreground))" }}>
            Kostnadsfri digital föreläsning - 29:e juli 19:00
          </p>
          <p className="text-xs font-sans text-center" style={{ color: "hsl(var(--muted-foreground))" }}>
            Med Tomas Lydahl
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-gold px-5 py-2.5 inline-flex items-center justify-center gap-2 w-full max-w-md mt-1">
            <Ticket className="w-4 h-4" />
            <span className="flex flex-col items-start leading-tight">
              <span className="font-bold tracking-wide text-sm">SÄKRA MIN PLATS</span>
              <span className="text-[10px] font-normal opacity-90">Kostnadsfri registrering</span>
            </span>
          </button>
        </div>
      </div>
    </div>);

};

export default LandingPage;