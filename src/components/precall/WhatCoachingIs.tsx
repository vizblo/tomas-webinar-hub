import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function WhatCoachingIs() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Vad coachningen är"
          title={
            <>
              En personlig resa <span className="text-gradient-gold">inåt</span>
            </>
          }
          subtitle={
            <>
              Det här är inte en app, en grupp eller ett färdigt program du klickar dig igenom.
              <br />
              Det är ett djupt 1:1-arbete mellan dig och mig.
            </>
          }
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-6 rounded-2xl border border-gold/30 bg-surface-elevated/40 p-8 sm:p-10 text-lg leading-relaxed text-foreground/90">
        <Reveal delay={80}>
          <p>
            Min coachning bygger på <strong>15+ års arbete</strong> med människor som fastnat
            i katastroftankar, oro, stress, självkritik och psykisk ohälsa. Det handlar inte om att lära dig
            nya tekniker att kämpa mot dina tankar, utan om att förändra din hela{" "}
            <span className="text-gold">relation</span> till dem.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p>
            Vi arbetar tillsammans i 1:1-samtal där du får utrymme att vara helt ärlig.
            Jag möter dig där du är, ser direkt vad det handlar om, och guidar dig steg
            för steg till verklig förändring.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p>
            Det är ett seriöst åtagande, både för dig som är redo att göra arbetet, och för
            mig som investerar mig själv fullt ut i varje klient jag tar in.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
