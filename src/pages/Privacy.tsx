import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Integritetspolicy | Tomas Lydahl</title>
        <meta name="description" content="Integritetspolicy för tomaslydahlwebinars.com – hur Tomas Lydahl samlar in, använder och skyddar dina personuppgifter." />
      </Helmet>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <Link to="/" className="text-sm transition-colors hover:opacity-80" style={{ color: "hsl(var(--muted-foreground))" }}>
          ← Tillbaka till startsidan
        </Link>

        <h1 className="mt-6 text-3xl font-bold sm:text-4xl" style={{ color: "hsl(var(--foreground))" }}>
          Integritetspolicy
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Gäller från: 1 juli 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">1. Vem vi är</h2>
            <p>
              Denna webbplats drivs av <strong>Tomas Lydahl AB</strong> ("vi", "oss", "vår"). Du når oss på{" "}
              <a href="mailto:tomas@tomaslydahl.se" className="underline underline-offset-4 gold-text">
                tomas@tomaslydahl.se
              </a>.
            </p>
            <p>Webbplats: tomaslydahlwebinars.com</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">2. Information vi samlar in</h2>
            <p>
              När du anmäler dig till den kostnadsfria föreläsningen samlar vi in de uppgifter du lämnar i formuläret: förnamn, efternamn, e-postadress och telefonnummer. Vi samlar även in grundläggande teknisk data som IP-adress, webbläsarinformation och marknadsföringsparametrar (t.ex. UTM-taggar och Meta-klick-ID) för att mäta hur våra annonser presterar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">3. Hur vi använder dina uppgifter</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>För att ge dig tillgång till föreläsningen du anmält dig till.</li>
              <li>För att skicka påminnelser inför föreläsningen (e-post).</li>
              <li>För att skicka transaktionella mejl (bekräftelser, kalenderlänkar, ev. replay).</li>
              <li>För att då och då skicka relaterat innehåll och erbjudanden via e-post. Du kan avregistrera dig när du vill.</li>
              <li>För att mäta och förbättra vår webbplats och våra annonser.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">4. Tredjepartsleverantörer</h2>
            <p>Vi använder betrodda tredjepartsleverantörer för att kunna leverera tjänsten:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Systeme.io</strong> – för att hantera anmälningar, e-postutskick och taggning av kontakter.</li>
              <li><strong>WebinarJam</strong> – för att leverera den digitala föreläsningen.</li>
              <li><strong>Meta (Facebook/Instagram)</strong> – för annonsmätning och attribution via Meta Pixel.</li>
              <li>Backend- och databasleverantörer som används för att driva webbplatsen.</li>
            </ul>
            <p>Vi säljer inte dina personuppgifter till någon.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">5. Datasäkerhet</h2>
            <p>
              Vi tillämpar branschstandard för administrativa, tekniska och fysiska säkerhetsåtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förändring, spridning eller förstörelse. Det innefattar bland annat kryptering i överföring (HTTPS/TLS), begränsad åtkomst och regelbunden granskning av våra leverantörer. Ingen överföring över internet är helt säker, men vi arbetar löpande med att skydda dina uppgifter.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">6. Lagringstid &amp; dina rättigheter</h2>
            <p>
              Vi sparar dina uppgifter så länge det behövs för att leverera vår tjänst och uppfylla våra lagstadgade skyldigheter. Du har enligt GDPR rätt att begära tillgång till, rättelse eller radering av dina personuppgifter, samt att invända mot eller begränsa viss behandling. Kontakta oss på{" "}
              <a href="mailto:tomas@tomaslydahl.se" className="underline underline-offset-4 gold-text">
                tomas@tomaslydahl.se
              </a>{" "}
              så hjälper vi dig.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">7. Uppdateringar av denna policy</h2>
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