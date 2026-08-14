import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import liv from "@/assets/precall/testimonials/liv.png";
import sofia from "@/assets/precall/testimonials/sofia.png";
import anonym1 from "@/assets/precall/testimonials/anonym1.jpg";
import yvonne from "@/assets/precall/testimonials/yvonne.png";
import ingrid from "@/assets/precall/testimonials/ingrid.jpg";
import bettan from "@/assets/precall/testimonials/bettan.jpg";
import gunilla from "@/assets/precall/testimonials/gunilla.jpg";
import julhalsning from "@/assets/precall/testimonials/julhalsning.jpg";
import malin from "@/assets/precall/testimonials/malin.jpg";
import newMobileTestimonial from "@/assets/precall/testimonials/IMG_6403.jpg";

const interviews = [
  {
    name: "Fredrik",
    title: "INTERVJU · FREDRIK\n\nFredriks resa i hur han började njuta av livet igen",
    videoId: "bT_5xwpLDbs",
    url: "https://www.youtube.com/watch?v=bT_5xwpLDbs&t=432s",
  },
  {
    name: "Caroline",
    title: "INTERVJU · CAROLINE\n\nHur Tomas hjälpte Caroline ta sig ur negativa tankar",
    videoId: "_4r0nCWrCCw",
    url: "https://www.youtube.com/watch?v=_4r0nCWrCCw&t=247s",
  },
  {
    name: "Klas",
    title: "INTERVJU · KLAS\n\nHur coachningen hjälpte Klas finna harmoni",
    videoId: "bZ0jF2Ag7Mc",
    url: "https://www.youtube.com/watch?v=bZ0jF2Ag7Mc&t=1s",
  },
];

const screenshots = [
  { src: newMobileTestimonial, name: "Klient", mobileOnly: true },
  { src: liv, name: "Liv Alterskjaer" },
  { src: sofia, name: "Sofia Pihlsgård" },
  { src: yvonne, name: "Yvonne" },
  { src: ingrid, name: "Ingrid" },
  { src: bettan, name: '"Bettan" är borta' },
  { src: gunilla, name: "Gunilla" },
  { src: julhalsning, name: "Juläsning" },
  { src: anonym1, name: "Klient" },
  { src: malin, name: "Malin Nilsson", mobileOnly: true },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Vad andra säger"
          title={<>Intervjuer med <span className="text-gradient-gold">tidigare klienter</span></>}
        />
      </Reveal>

      {/* YouTube interviews */}
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {interviews.map((iv, i) => (
          <Reveal key={iv.name} delay={i * 90}>
            <a
              href={iv.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-surface-elevated/50 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface">
                <img
                  src={`https://img.youtube.com/vi/${iv.videoId}/hqdefault.jpg`}
                  alt={`Intervju med ${iv.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold transition-transform group-hover:scale-110"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-6 w-6">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="whitespace-pre-line font-serif text-lg leading-snug text-foreground">
                  {iv.title}
                </h3>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Written testimonials (screenshots) - packed masonry */}
      <Reveal delay={150}>
        <div className="mx-auto mt-20 max-w-7xl">
          <h3 className="mb-8 text-center font-serif text-2xl sm:text-3xl">
            Meddelanden från <span className="text-gradient-gold">tidigare klienter</span>
          </h3>
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {screenshots.map((s, i) => (
              <figure
                key={i}
                className={`mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-surface-elevated/40 p-2 transition-all hover:border-gold/40 ${s.mobileOnly ? "sm:hidden" : ""}`}
              >
                <img
                  src={s.src}
                  alt={`Testimonial från ${s.name}`}
                  loading="lazy"
                  className="w-full rounded-lg"
                />
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
