import tomasPortrait from "@/assets/precall/tomas-portrait.jpg";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const stats = [
  { end: 15, suffix: "+", label: "Års erfarenhet" },
  { end: 1000, suffix: "+", label: "Hjälpta människor", format: true },
  { end: 500, suffix: "+", label: "Föreläsningar" },
];

export function AboutTomas() {
  return (
    <section className="section-y px-4">
      <Reveal>
        <SectionHeading
          eyebrow="Vem är jag?"
          title={<>En coach med <span className="text-gradient-gold">riktig erfarenhet</span></>}
        />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
        <Reveal variant="scale">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-gold/30 shadow-elevated">
            <img
              src={tomasPortrait}
              alt="Tomas Lydahl"
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent" />
          </div>
        </Reveal>

        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <Reveal delay={80}>
            <p>
              Mitt namn är Tomas och jag är en mental coach, författare och föreläsare med över <strong>15 års erfarenhet </strong>
              av att hjälpa människor ur katastroftankar, ångest, självkritik och psykisk ohälsa.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p>
              Jag har själv upplevt hur det är att vara fast i tankar och känslor som tar över
              livet. När jag väl insåg hur sinnet faktiskt fungerar, förändrades allting. Idag
              har jag hjälpt <strong>tusentals människor</strong> till samma genombrott.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="border-l-2 border-gold pl-5 font-serif text-xl italic text-foreground">
              “Min uppgift är inte att ge dig fler verktyg. Min uppgift är att hjälpa dig se det
              som redan finns där, under tankarna.”
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gold/20 pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl font-bold text-gold sm:text-4xl">
                    <CountUp end={s.end} suffix={s.suffix} format={s.format} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
