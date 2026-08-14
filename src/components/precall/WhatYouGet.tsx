import butterfly from "@/assets/precall/butterfly-logo.png";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    icon: "🧭",
    title: "En tydlig kartläggning",
    body: "Vi identifierar de tankemönster och föreställningar som håller dig tillbaka, och ser vad som behöver förändras. Inte generella råd, utan en glasklar bild av just dina mönster.",
  },

  {
    icon: "💬",
    title: "1:1-samtal med mig",
    body: "Personliga 1:1-samtal där vi tillsammans arbetar med just din situation, ditt tempo och dina mål, helt anpassat efter dig.",
  },
  {
    icon: "📚",
    title: "Beprövad strategi",
    body: "Konkreta verktyg från mina 15+ år av arbete med att hjälpa människor ut ur katastroftankar, oro och självkritik.",
  },
  {
    icon: "📱",
    title: "Direktkontakt mellan sessioner",
    body: "När det blir tufft i vardagen kan du nå mig direkt, så att du aldrig står ensam i en svår stund.",
  },
  {
    icon: "🎯",
    title: "En tydlig riktning framåt",
    body: "Du går från att kämpa med samma tankar om och om igen, till att veta exakt vad du gör och varför det fungerar.",
  },
  {
    icon: "🦋",
    title: "Bestående förändring",
    body: "Det här handlar inte om kortsiktiga lugnande knep. Det handlar om att förändra din relation till ditt eget sinne, för gott.",
    useButterfly: true,
  },
];

export function WhatYouGet() {
  return (
    <section className="section-y px-4">
      <Reveal>
        <SectionHeading
          eyebrow="Så fungerar coachningen"
          title={
            <>
              Det du får när du <span className="text-gradient-gold">jobbar med mig</span>
            </>
          }
          subtitle="Personlig 1:1-coachning byggd kring din situation, ditt tempo och dina mål."
        />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-elevated/40 p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold">
              {item.useButterfly ? (
                <img src={butterfly} alt="" className="h-9 w-9 opacity-90" />
              ) : (
                <div className="text-3xl">{item.icon}</div>
              )}
              <h3 className="mt-4 text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
