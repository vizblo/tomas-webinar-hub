import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const topics = [
  "Vad du fastnar i just nu",
  "Hur det påverkar ditt liv",
  "Vad du redan har försökt göra",
  "Vad du egentligen längtar efter i stället",
];

export function CallDetails() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Innan vi pratar"
          title={
            <>
              Vårt samtal handlar om dig – inte om att <span className="text-gradient-gold">pressa fram ett beslut</span>
            </>
          }
          subtitle="Så här går samtalet till, så att du vet exakt vad du går in i."
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-6 rounded-2xl border border-gold/30 bg-surface-elevated/40 p-8 sm:p-10 text-lg leading-relaxed text-foreground/90">
        <Reveal delay={60}>
          <div>
            <p>Under samtalet tittar vi tillsammans på:</p>
            <ul className="mt-4 space-y-3">
              {topics.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 text-success">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p>
            Jag lyssnar, ställer frågor och hjälper dig få en tydligare bild av vad som håller dig
            tillbaka. Om jag bedömer att jag kan hjälpa dig berättar jag också hur ett personligt
            coachningssamarbete skulle kunna se ut – med upplägg, investering och nästa steg. Därefter
            känner vi båda efter om det är rätt väg framåt.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="border-l-2 border-gold pl-5 font-serif text-xl italic text-foreground">
            Om vi inte är rätt match säger jag det ärligt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
