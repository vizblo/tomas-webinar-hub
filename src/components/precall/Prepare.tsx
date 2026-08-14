import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const reflect = [
  "Vad begränsar mig mest i mitt liv just nu?",
  "Hur länge har det varit så?",
  "Vad har jag redan försökt göra åt det?",
  "Hur påverkar det mina relationer, mitt arbete eller min vardag?",
  "Hur skulle livet kunna se ut om detta inte längre styrde mig?",
  "Om jag känner att hjälpen är rätt – är jag redo att prioritera en förändring nu?",
];

const steps = [
  {
    n: "01",
    title: "Ha tiden i din kalender",
    body: "Din bokningsbekräftelse och möteslänk finns i din e-post. Lägg in tiden i din kalender direkt via bekräftelsen, så att inget annat hamnar där.",
  },
  {
    n: "02",
    title: "Reflektera över din situation",
    body: "Skriv ner några korta tankar kring frågorna nedan. Du behöver inte skicka svaren till mig – de finns för att vi ska komma djupare snabbare när vi ses.",
  },
  {
    n: "03",
    title: "Hitta en lugn plats",
    body: "Säkerställ att du sitter ostört, med hörlurar, bra wifi och kameran på. Ha gärna ett glas vatten och något att skriva på i närheten.",
  },
  {
    n: "04",
    title: "Kom med ett öppet sinne",
    body: "Du behöver inte ha alla svar. Du behöver inte “prestera”. Det enda jag ber om är att du är ärlig, med mig och med dig själv.",
  },
];

export function Prepare() {
  return (
    <section className="section-y px-4">
      <Reveal>
        <SectionHeading
          eyebrow="Förbered dig inför samtalet"
          title={
            <>
              4 steg för att få <span className="text-gradient-gold">mest ut</span> av samtalet
            </>
          }
          subtitle="Gör det här innan vi pratar och du får mångdubbelt mer värde av vår tid tillsammans."
        />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 80}>
            <div className="h-full rounded-2xl border border-border bg-surface-elevated/40 p-6 transition-all hover:-translate-y-0.5 hover:border-gold/40 sm:p-7">
              <div className="flex items-baseline gap-4">
                <span aria-hidden className="font-serif text-3xl leading-none text-gold/70 sm:text-4xl">
                  {step.n}
                </span>
                <h3 className="text-lg sm:text-xl">{step.title}</h3>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-gold/30 bg-surface-elevated/40 p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Fundera gärna på detta före samtalet
          </p>
          <ol className="mx-auto mt-6 max-w-2xl space-y-3">
            {reflect.map((q, i) => (
              <li key={q} className="flex gap-3 text-foreground/90">
                <span className="font-serif text-gold">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
