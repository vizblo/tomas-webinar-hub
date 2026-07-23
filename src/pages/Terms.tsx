import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Användarvillkor | Tomas Lydahl</title>
        <meta name="description" content="Användarvillkor för tomaslydahlwebinars.com – villkor för att använda webbplatsen och anmäla dig till Tomas Lydahls föreläsningar." />
      </Helmet>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <Link to="/" className="text-sm transition-colors hover:opacity-80" style={{ color: "hsl(var(--muted-foreground))" }}>
          ← Tillbaka till startsidan
        </Link>

        <h1 className="mt-6 text-3xl font-bold sm:text-4xl" style={{ color: "hsl(var(--foreground))" }}>
          Användarvillkor
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Gäller från: 1 juli 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">1. Godkännande av villkoren</h2>
            <p>
              Genom att besöka denna webbplats eller anmäla dig till den kostnadsfria föreläsningen godkänner du dessa användarvillkor. Om du inte godkänner villkoren ska du inte använda webbplatsen eller tjänsten. Villkoren gäller mellan dig och <strong>Tomas Lydahl AB</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">2. Tjänsten</h2>
            <p>
              Vi erbjuder en kostnadsfri, digital föreläsning samt tillhörande utbildningsinnehåll. Innehåll, tider och eventuella bonusar beskrivs på respektive anmälnings- eller köpsida vid tillfället för anmälan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">3. Immateriella rättigheter</h2>
            <p>
              Allt material – inklusive föreläsningar, inspelningar, mallar, e-böcker och bonusinnehåll – tillhör Tomas Lydahl AB och är endast licensierat till dig för personligt bruk. Du får inte sälja vidare, dela eller på annat sätt sprida innehållet till personer som inte anmält sig själva. Vi förbehåller oss rätten att återkalla åtkomst vid överträdelse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">4. Inga garantier om resultat</h2>
            <p>
              De referenser och exempel som visas på webbplatsen är verkliga men inte typiska. Individuella resultat beror på egen insats, erfarenhet, livssituation och andra faktorer utanför vår kontroll. Vi lämnar <strong>inga garantier</strong> om specifika resultat, förbättringar eller utfall av att delta i våra föreläsningar eller program.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">5. Ansvarsbegränsning</h2>
            <p>
              I den utsträckning som lagen tillåter ansvarar Tomas Lydahl AB inte för indirekta skador eller följdskador som uppstår i samband med användning av webbplatsen eller våra tjänster. Vårt totala ansvar är begränsat till det belopp du eventuellt har betalat oss under de senaste tolv månaderna.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">6. Tillämplig lag</h2>
            <p>
              Dessa villkor regleras av svensk rätt. Eventuella tvister ska i första hand lösas i samförstånd och i annat fall avgöras av svensk allmän domstol.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">7. Åldersgräns</h2>
            <p>
              Du måste vara minst <strong>18 år</strong> för att anmäla dig till föreläsningen. Genom att använda webbplatsen intygar du att du är 18 år eller äldre.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">8. Integritet</h2>
            <p>
              Din användning av webbplatsen omfattas även av vår{" "}
              <Link to="/privacy" className="underline underline-offset-4 gold-text">
                integritetspolicy
              </Link>{" "}
              som är en del av dessa villkor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold gold-text">9. Kontakt</h2>
            <p>
              Frågor om villkoren? Mejla{" "}
              <a href="mailto:tomas@tomaslydahl.se" className="underline underline-offset-4 gold-text">
                tomas@tomaslydahl.se
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;