import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function YouTubeLink() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Klar?"
          title={
            <>
              Utforska min <span className="text-gradient-gold">YouTube kanal</span>
            </>
          }
          subtitle=""
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center">
          <a
            href="https://www.youtube.com/@Tomas_Lydahl"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-xl border border-gold/40 bg-surface-elevated/60 px-7 py-4 text-base font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:shadow-gold"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gold">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Besök min YouTube-kanal
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
          </p>
        </div>
      </Reveal>
    </section>
  );
}
