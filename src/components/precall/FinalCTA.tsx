import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const checklist = [
  "Avsätt hela den bokade tiden",
  "Sitt på en lugn plats där du kan prata ostört",
  "Använd gärna hörlurar och ha kameran på",
  "Ha något att anteckna med",
  "Kontrollera länken och tekniken i god tid",
  "Behöver du boka om använder du länken i din bokningsbekräftelse",
];

export function FinalCTA() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Nästa steg"
          title={<>Jag ser fram emot att <span className="text-gradient-gold">träffa dig</span></>}
          subtitle="Se videon, fundera på frågorna ovan – sedan tar vi resten tillsammans under vårt samtal."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gold/30 bg-surface-elevated/40 p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Kontrollera din inkorg
          </p>
          <p className="mt-4 text-center text-lg text-foreground/90">
            Din bokningsbekräftelse och möteslänk har skickats till din e-post. Kontrollera att du
            har fått den – där finns även länken om du behöver boka om.
          </p>

          <ul className="mx-auto mt-8 max-w-xl space-y-3 border-t border-gold/20 pt-6">
            {checklist.map((c) => (
              <li key={c} className="flex gap-3 text-foreground/90">
                <span className="mt-1 text-success">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center font-serif text-xl italic text-foreground">
            Vi hörs snart,<br />Tomas
          </p>
        </div>
      </Reveal>
    </section>
  );
}
