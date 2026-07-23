import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Integritetspolicy | Tomas Lydahl</title>
        <meta name="description" content="Integritetspolicy för tomaslydahl.se – hur Tomas Lydahl samlar in, använder och skyddar dina personuppgifter." />
      </Helmet>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <Link to="/" className="text-sm transition-colors hover:opacity-80" style={{ color: "hsl(var(--muted-foreground))" }}>
          ← Tillbaka till startsidan
        </Link>

        <h1 className="mt-6 text-3xl font-bold sm:text-4xl font-sans" style={{ color: "hsl(var(--foreground))" }}>
          Integritetspolicy
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Gäller från: 1 juli 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">1. Vem vi är</h2>
            <p>
              Denna webbplats drivs av <strong>Tomas Lydahl AB</strong> ("vi", "oss", "vår"). Du når oss på{" "}
              <a href="mailto:tomas@tomaslydahl.se" className="underline underline-offset-4 gold-text">
                tomas@tomaslydahl.se
              </a>.
            </p>
            <p>Webbplats: tomaslydahl.se</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">2. Information vi samlar in</h2>
            <p>
              När du anmäler dig till den kostnadsfria föreläsningen samlar vi in de uppgifter du lämnar i formuläret: förnamn, e-postadress och telefonnummer. Vi samlar även in grundläggande teknisk data som IP-adress, webbläsarinformation och marknadsföringsparametrar (t.ex. UTM-taggar och Meta-klick-ID) för att mäta hur våra annonser presterar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">3. Hur vi använder dina uppgifter</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>För att ge dig tillgång till föreläsningen du anmält dig till (rättslig grund: fullgörande av avtal).</li>
              <li>För att skicka påminnelser inför föreläsningen (rättslig grund: fullgörande av avtal).</li>
              <li>För att skicka transaktionella mejl som bekräftelser och kalenderlänkar (rättslig grund: fullgörande av avtal).</li>
              <li>För att skicka relaterat innehåll och erbjudanden via e-post, om du separat samtyckt till detta (rättslig grund: samtycke). Du kan återkalla samtycket när som helst.</li>
              <li>För att mäta och förbättra vår webbplats och våra annonser (rättslig grund: berättigat intresse).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">4. SMS / Text-message program</h2>
            <p>
              Genom att lämna ditt telefonnummer i vårt anmälningsformulär samtycker du till att ta emot SMS från Tomas Lydahl AB kopplade till den föreläsning du anmält dig till.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Syfte:</strong> Endast påminnelser inför föreläsningen.</li>
              <li><strong>Frekvens:</strong> Upp till 3 påminnelser inför din bokade föreläsning. Efter föreläsningen skickas inga fler SMS.</li>
              <li>
                <strong>Avregistrera:</strong> Svara <strong>STOP</strong> när som helst för att avregistrera dig. Svara <strong>HELP</strong> för hjälp, eller mejla{" "}
                <a href="mailto:tomas@tomaslydahl.se" className="underline underline-offset-4 gold-text">
                  tomas@tomaslydahl.se
                </a>.
              </li>
              <li>Meddelande- och datakostnader kan tillkomma.</li>
              <li>Mobiloperatörer ansvarar inte för försenade eller ej levererade meddelanden.</li>
              <li>Samtycke till SMS är inte ett villkor för något köp.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">5. Tredjepartsleverantörer</h2>
            <p>Vi använder betrodda tredjepartsleverantörer för att kunna leverera tjänsten:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Systeme.io</strong> – för att hantera anmälningar, e-postutskick och taggning av kontakter.</li>
              <li><strong>WebinarJam</strong> – för att leverera den digitala föreläsningen.</li>
              <li><strong>Meta (Facebook/Instagram)</strong> – för annonsmätning och attribution via Meta Pixel.</li>
              <li><strong>Zapier</strong> – för att koppla ihop anmälningar med våra övriga verktyg.</li>
              <li><strong>Calendly</strong> – för bokning av samtal och möten.</li>
              <li><strong>Stripe</strong> – för att processa betalningar vid köp.</li>
              <li><strong>Swish</strong> – för att processa betalningar vid köp.</li>
              <li>Backend- och databasleverantörer som används för att driva webbplatsen.</li>
            </ul>
            <p className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              Ingen mobilinformation (telefonnummer eller SMS-samtycke) delas med tredje part eller samarbetspartners för marknadsföringssyften. Övriga datakategorier exkluderar SMS-samtyckesdata; sådan information delas inte med någon tredje part.
            </p>
            <p>Vi säljer inte dina personuppgifter till någon.</p>
            <p>
              Vissa av dessa leverantörer (t.ex. Meta, Stripe, Zapier, Calendly) kan behandla uppgifter i länder utanför EU/EES, främst USA. I dessa fall säkerställer vi att överföringen sker med lagligt stöd, t.ex. genom EU-kommissionens standardavtalsklausuler (SCC) eller motsvarande skyddsåtgärder.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">6. Datasäkerhet</h2>
            <p>
              Vi tillämpar branschstandard för administrativa, tekniska och fysiska säkerhetsåtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förändring, spridning eller förstörelse. Det innefattar bland annat kryptering i överföring (HTTPS/TLS), begränsad åtkomst och regelbunden granskning av våra leverantörer. Ingen överföring över internet är helt säker, men vi arbetar löpande med att skydda dina uppgifter.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">7. Lagringstid &amp; dina rättigheter</h2>
            <p>
              Vi sparar dina uppgifter så länge det behövs för att leverera vår tjänst och uppfylla våra lagstadgade skyldigheter. Du har enligt GDPR rätt att begära tillgång till, rättelse eller radering av dina personuppgifter, samt att invända mot eller begränsa viss behandling. Kontakta oss på{" "}
              <a href="mailto:tomas@tomaslydahl.se" className="underline underline-offset-4 gold-text">
                tomas@tomaslydahl.se
              </a>{" "}
              så hjälper vi dig.
            </p>
            <p>
              Du har även rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY) om du anser att vi behandlar dina personuppgifter i strid med gällande dataskyddslagstiftning. Läs mer på{" "}
              <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 gold-text">
                imy.se
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">8. Cookies</h2>
            <p>
              Vi använder cookies och liknande tekniker, bland annat Meta Pixel, för att mäta och förbättra våra annonser och vår webbplats. Icke-nödvändiga cookies sätts endast efter ditt samtycke via vår cookie-banner. Du kan när som helst ändra dina cookie-inställningar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text font-sans">9. Uppdateringar av denna policy</h2>
            <p>
              Vi kan komma att uppdatera denna integritetspolicy. Den senaste versionen finns alltid publicerad på denna sida med ett uppdaterat datum.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;