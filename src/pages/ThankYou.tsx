import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Youtube, ArrowRight, Calendar as CalendarIcon, Clock, Copy, Check } from "lucide-react";
import googleCalendarIcon from "@/assets/google-calendar.svg";
import outlookIcon from "@/assets/outlook.png";
import outlookLogo from "@/assets/outlook-icon.png.asset.json";
import gmailLogo from "@/assets/gmail-v4.webp.asset.json";
import appleLogo from "@/assets/apple-v4.png.asset.json";
import tomasLaptop from "@/assets/tomas-laptop.webp";
import ebookCover from "@/assets/ebook-sjalvkansla.jpg";
import tomasYoutubeChannel from "@/assets/tomas-youtube-channel.png.asset.json";
import tomasMejl from "@/assets/tomas-mejl.png.asset.json";

const TOMAS_EMAIL = "tomas@tomaslydahl.se";

const ThankYou = () => {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TOMAS_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  useEffect(() => {
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "CompleteRegistration", {
        content_name: "Katastroftankar Webinar",
        value: 0,
        currency: "SEK",
      });
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
      "radial-gradient(ellipse at top, hsl(42 40% 14% / 0.7) 0%, hsl(var(--background)) 45%), radial-gradient(ellipse at bottom right, hsl(20 30% 12% / 0.5) 0%, hsl(var(--background)) 55%), radial-gradient(ellipse at bottom left, hsl(42 35% 10% / 0.4) 0%, transparent 50%)"
      }}>
      <Helmet>
        <title>Tack för din anmälan - Tomas Lydahl</title>
        <meta name="description" content="Bekräftelse på din anmälan till Tomas Lydahls digitala föreläsning. Följ stegen för att säkra din plats." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://tomaslydahlwebinars.com/tack" />
        <meta property="og:title" content="Tack för din anmälan - Tomas Lydahl" />
        <meta property="og:description" content="Följ stegen för att säkra din plats på den digitala föreläsningen." />
        <meta property="og:url" content="https://tomaslydahlwebinars.com/tack" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Top banner */}
      <div
        className="w-full py-3 text-center text-sm font-bold tracking-widest uppercase"
        style={{
          background: "hsl(var(--gold) / 0.12)",
          borderBottom: "1px solid hsl(var(--gold) / 0.3)",
          color: "hsl(var(--gold))",
          fontFamily: "'Source Sans 3', sans-serif",
          letterSpacing: "0.15em"
        }}>
        
        Stäng inte denna sida
      </div>

      {/* Progress bar */}
      <div
        className="w-full px-6 py-4"
        style={{
          background: "hsl(var(--surface) / 0.7)",
          borderBottom: "1px solid hsl(var(--border))"
        }}>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              
              Registrering slutförd
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "hsl(var(--gold))", fontFamily: "'Source Sans 3', sans-serif" }}>
              
              77%
            </span>
          </div>
          <div
            className="w-full rounded-full h-3"
            style={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))" }}>
            
            <div
              className="h-3 rounded-full transition-all duration-700"
              style={{ width: "77%", background: "linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)))" }} />
            
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-2xl md:text-3xl font-bold mb-4 whitespace-nowrap"
            style={{
              color: "hsl(var(--gold))",
              fontFamily: "'Source Sans 3', sans-serif",
              lineHeight: 1.2
            }}>
            Din registrering är nästan klar...
          </h1>
          <p
            className="text-lg"
            style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
            Följ instruktionerna nedan för att säkra din plats
          </p>
        </div>

        {/* Hero image */}
        <div
          className="rounded-lg mb-6 overflow-hidden"
          style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--surface))" }}>
          <img
            src={tomasLaptop}
            alt="Tomas Lydahl"
            className="w-full h-auto block" />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {/* Step 1: WhatsApp */}
          <div
            className="rounded-lg p-8 text-center"
            style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>

            <div className="flex justify-center mb-4">
              <span
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "hsl(var(--surface-elevated))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  fontFamily: "'Source Sans 3', sans-serif"
                }}>
                Steg 1
              </span>
            </div>
            <div className="flex justify-center mb-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "hsl(134 61% 41% / 0.15)", border: "1px solid hsl(134 61% 41% / 0.4)" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="hsl(134, 61%, 41%)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.529 5.845L.057 23.428a.5.5 0 00.611.628l5.701-1.494A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.528-5.198-1.443l-.373-.223-3.863 1.013 1.033-3.774-.241-.389A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              Gå med i WhatsApp-gruppen
            </h2>
            <p
              className="mb-5 text-base whitespace-pre-line"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              Gå med i min exklusiva WhatsApp-grupp inför föreläsningen.{"\n\n"}Där får du min e-bok "Låt din självkänsla träda fram" helt gratis!
            </p>

            {/* Lead magnet preview */}
            <div
              className="rounded-lg p-4 mb-6 flex items-center gap-4 text-left"
              style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.25)" }}>
              <img
                src={ebookCover}
                alt="E-bok: Låt din självkänsla träda fram"
                className="w-20 h-auto flex-shrink-0 rounded" />
              <div>
                <p className="text-sm uppercase tracking-widest font-bold mb-1" style={{ color: "hsl(var(--gold))", fontFamily: "'Source Sans 3', sans-serif" }}>
                  Din gratis bonus
                </p>
                <p className="text-lg font-bold mb-1" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                  Låt din självkänsla träda fram
                </p>
                <p className="text-sm" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                  174-sidors e-bok som endast dels i WhatsApp-gruppen.
                </p>
              </div>
            </div>

            <a
              href="https://chat.whatsapp.com/Fp5DOKnXjJtAqzxWPBToRu?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm inline-flex items-center gap-2 rounded-lg font-bold transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
              style={{
                background: "hsl(134 61% 41%)",
                color: "hsl(0 0% 100%)",
                fontFamily: "'Source Sans 3', sans-serif"
              }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.529 5.845L.057 23.428a.5.5 0 00.611.628l5.701-1.494A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.528-5.198-1.443l-.373-.223-3.863 1.013 1.033-3.774-.241-.389A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Gå med i WhatsApp-gruppen
            </a>
          </div>

          {/* Step 2: Calendar */}
          <div
            className="rounded-lg p-8 text-center"
            style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>

            <div className="flex justify-center mb-4">
              <span
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "hsl(var(--surface-elevated))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  fontFamily: "'Source Sans 3', sans-serif"
                }}>
                Steg 2
              </span>
            </div>
            <div className="flex justify-center mb-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.12)", border: "1px solid hsl(var(--gold) / 0.3)" }}>
                <CalendarIcon className="w-5 h-5" style={{ color: "hsl(var(--gold))" }} />
              </div>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              Lägg till föreläsningen i din kalender
            </h2>
            <p
              className="mb-5 text-base"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              Spara tid och datum i din kalender så att du inte missar föreläsningen.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "hsl(var(--surface-elevated))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "'Source Sans 3', sans-serif"
                }}>
                <CalendarIcon className="w-4 h-4" style={{ color: "hsl(var(--gold))" }} />
                15 juni 2026
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "hsl(var(--surface-elevated))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  fontFamily: "'Source Sans 3', sans-serif"
                }}>
                <Clock className="w-4 h-4" style={{ color: "hsl(var(--gold))" }} />
                Kl. 19:00
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Digital+f%C3%B6rel%C3%A4sning+-+Tomas+Lydahl&dates=20260615T170000Z%2F20260615T180000Z&details=G%C3%A5+med+p%C3%A5+f%C3%B6rel%C3%A4sningen+h%C3%A4r%3A+https%3A%2F%2Fevent.webinarjam.com%2Fllo91m%2Fgo%2Flive%2F4o84xrfgiksws6&location=https%3A%2F%2Fevent.webinarjam.com%2Fllo91m%2Fgo%2Flive%2F4o84xrfgiksws6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3 text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95">
                <img src={googleCalendarIcon} alt="Google Calendar" className="w-5 h-5" />
                Google Calendar
              </a>
              <a
                href="https://outlook.live.com/calendar/0/action/compose?subject=Digital+f%C3%B6rel%C3%A4sning+-+Tomas+Lydahl&startdt=2026-06-15T19%3A00%3A00&enddt=2026-06-15T20%3A00%3A00&location=https%3A%2F%2Fevent.webinarjam.com%2Fllo91m%2Fgo%2Flive%2F4o84xrfgiksws6&body=G%C3%A5+med+p%C3%A5+f%C3%B6rel%C3%A4sningen+h%C3%A4r%3A+https%3A%2F%2Fevent.webinarjam.com%2Fllo91m%2Fgo%2Flive%2F4o84xrfgiksws6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3 text-sm inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95">
                <img src={outlookIcon} alt="Outlook kalender" className="w-5 h-5" />
                Outlook Calendar
              </a>
            </div>
          </div>

          {/* Step 3: Check email */}
          <div
            className="rounded-lg p-8 text-center"
            style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
            
            <div className="flex justify-center mb-4">
              <span
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "hsl(var(--surface-elevated))",
                  color: "hsl(var(--foreground))",
                  border: "1px solid hsl(var(--border))",
                  fontFamily: "'Source Sans 3', sans-serif"
                }}>
                Steg 3
              </span>
            </div>
            <div className="flex justify-center mb-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.12)", border: "1px solid hsl(var(--gold) / 0.3)" }}>
                
                <Mail className="w-5 h-5" style={{ color: "hsl(var(--gold))" }} />
              </div>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              Kolla din e-post
            </h2>
            <p
              className="mb-6 text-base whitespace-pre-line"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              Du borde ha fått ett bekräftelsemejl med länk till föreläsningen.{"\n"}
              Om du inte hittar mejlet, så här hittar du det här 👇
            </p>

            {/* Email inbox mockup */}
            <div className="mb-6 rounded-lg overflow-hidden" style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-elevated))" }}>
              <img
                src={tomasMejl.url}
                alt="Så hittar du mejlet i Gmail under fliken Kampanjer eller i Outlook under fliken Övrigt"
                loading="lazy"
                className="w-full h-auto block" />
            </div>

            {/* Fallback: still can't find it */}
            <div
              className="rounded-lg p-6 text-left"
              style={{ background: "hsl(var(--surface-elevated) / 0.5)", border: "1px solid hsl(var(--border))" }}>
              <p className="text-lg font-bold mb-2 text-center" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                🔍 Hittar du fortfarande inte mejlet?
              </p>
              <p className="text-base mb-5 text-center" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                Lägg till <strong>{TOMAS_EMAIL}</strong> som kontakt redan nu, då hamnar framtida mejl med viktig info och länk till eventet direkt i din inkorg.
              </p>

              <div className="rounded-lg p-4 mb-4" style={{ background: "hsl(var(--gold) / 0.06)", border: "1px solid hsl(var(--gold) / 0.25)" }}>
              <p className="text-sm font-bold mb-2 text-center" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                Kopiera mejladressen nedan och lägg till den som kontakt:
              </p>
              <button
                onClick={copyEmail}
                className="w-full rounded-lg px-4 py-3 flex items-center justify-center gap-2 font-semibold transition-all hover:brightness-110"
                style={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
                {copied ? <Check className="w-4 h-4" style={{ color: "hsl(134 61% 50%)" }} /> : <Copy className="w-4 h-4" style={{ color: "hsl(var(--gold))" }} />}
                {copied ? "Kopierad!" : TOMAS_EMAIL}
              </button>
              </div>

              <p className="text-sm italic mb-4 text-center" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              📌 OBS: Välj den plattform du använde när du registrerade dig.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://contacts.google.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-5 py-3 inline-flex items-center justify-center gap-2 font-bold text-sm transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
                style={{ background: "hsl(4 90% 58%)", color: "hsl(0 0% 100%)", fontFamily: "'Source Sans 3', sans-serif" }}>
                <img src={gmailLogo.url} alt="" className="w-4 h-4" />
                Lägg till i Gmail-kontakter
              </a>
              <a
                href="https://outlook.live.com/people/0/new"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-5 py-3 inline-flex items-center justify-center gap-2 font-bold text-sm transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
                style={{ background: "hsl(207 90% 50%)", color: "hsl(0 0% 100%)", fontFamily: "'Source Sans 3', sans-serif" }}>
                <img src={outlookLogo.url} alt="" className="w-4 h-4" />
                Lägg till i Outlook-kontakter
              </a>
            </div>
            </div>

            <p className="text-base mt-6" style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              När du har hittat mejlet, svara gärna med en "👍" så att jag vet att du fått det!
            </p>
          </div>

          {/* YouTube - final CTA */}
          <div className="rounded-lg p-8 text-center" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
            
            <div className="flex justify-center mb-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--gold) / 0.12)", border: "1px solid hsl(var(--gold) / 0.3)" }}>
                
                <Youtube className="w-5 h-5" style={{ color: "hsl(var(--gold))" }} />
              </div>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              
              Klar med alla steg?
            </h2>
            <p
              className="mb-6 text-base"
              style={{ color: "hsl(var(--foreground))", fontFamily: "'Source Sans 3', sans-serif" }}>
              
              Kika på Tomas YouTube videor om inre välmående
            </p>
            <a
              href="https://www.youtube.com/@Tomas_Lydahl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3 text-sm inline-flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95">
              
              Utforska Tomas YouTube kanal<ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@Tomas_Lydahl"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.01] hover:brightness-110"
              style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--surface-elevated))" }}>
              <img
                src={tomasYoutubeChannel.url}
                alt="Tomas Lydahl YouTube-kanal"
                loading="lazy"
                className="w-full h-auto block" />
            </a>
          </div>
        </div>
      </main>
    </div>);

};

export default ThankYou;