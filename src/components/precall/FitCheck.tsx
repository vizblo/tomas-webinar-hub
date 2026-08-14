import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const forYou = [
  "Du känner att dina tankar eller känslor begränsar ditt liv",
  "Du är trött på att hamna i samma mönster om och om igen",
  "Du vill förstå problemet på djupet, inte bara lindra det för stunden",
  "Du är villig att vara öppen och delta aktivt i förändringen",
  "Du känner att det är dags att prioritera ditt välmående",
];

const notForYou = [
  "Du söker enbart ett snabbt knep som löser allt utan egen medverkan",
  "Du vill inte prata öppet om din situation",
  "Du har inte möjlighet eller vilja att prioritera ett coachningssamarbete",
  "Du behöver akut psykiatrisk eller medicinsk vård",
];

export function FitCheck() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Vem coachningen är för"
          title={<>Är detta <span className="text-gradient-gold">rätt</span> för dig?</>}
          subtitle="Jag tar bara emot ett begränsat antal klienter, och vill att de ska få verklig förändring. Här är ärligheten om vem coachningen passar bäst."
        />
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
        <Reveal delay={60}>
          <div className="h-full rounded-2xl border border-success/40 bg-surface-elevated/50 p-8">
            <h3 className="flex items-center gap-3 text-2xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success">
                ✓
              </span>
              Coachningen kan passa dig om…
            </h3>
            <ul className="mt-6 space-y-3">
              {forYou.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/90">
                  <span className="mt-1 text-success">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="h-full rounded-2xl border border-danger/30 bg-surface-elevated/50 p-8">
            <h3 className="flex items-center gap-3 text-2xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/15 text-danger">
                ✕
              </span>
              Det är sannolikt inte rätt just nu om…
            </h3>
            <ul className="mt-6 space-y-3">
              {notForYou.map((p) => (
                <li key={p} className="flex gap-3 text-foreground/80">
                  <span className="mt-1 text-danger">✕</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <p className="mx-auto mt-6 max-w-6xl text-center text-sm text-muted-foreground">
          Coachning ersätter inte medicinsk behandling, psykoterapi eller akut psykiatrisk vård.
        </p>
      </Reveal>
    </section>
  );
}
