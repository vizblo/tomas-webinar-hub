import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    q: "Är samtalet verkligen kostnadsfritt?",
    a: "Ja. Samtalet är kostnadsfritt och utan förpliktelser. Det hjälper oss att förstå din situation och avgöra om vi är rätt match för ett fortsatt samarbete.",
  },
  {
    q: "Måste jag bestämma mig under samtalet?",
    a: "Nej, du kommer inte att pressas till ett beslut. Om vi ser att coachningen passar dig får du tydlig information om upplägg, investering och nästa steg så att du kan fatta ett informerat beslut.",
  },
  {
    q: "Vad kostar coachningen?",
    a: "Ett personligt coachningssamarbete innebär en investering som beror på vilket upplägg som passar dig bäst. Det exakta upplägget går vi igenom under samtalet – du får veta vad som ingår och vad investeringen blir innan du tar ställning.",
  },
  {
    q: "Hur skiljer sig coachning från terapi?",
    a: "Terapi fokuserar ofta på att förstå varför du mår som du mår. Coachningen fokuserar på din nuvarande förståelse, dina mönster och den förändring du vill skapa framåt. Den ersätter inte vård, psykoterapi eller behandling av psykisk sjukdom.",
  },
  {
    q: "Vad händer om vi inte är rätt match?",
    a: "Då säger jag det ärligt. Målet med samtalet är att hitta rätt väg för dig, inte att sälja coachning till varje person jag pratar med.",
  },
  {
    q: "Kan jag omboka samtalet?",
    a: "Absolut. Använd länken i din bokningsbekräftelse och meddela gärna minst 24 timmar i förväg så att tiden kan erbjudas någon annan.",
  },
];

export function FAQ() {
  return (
    <section className="px-4 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Vanliga frågor"
          title={<>Frågor som <span className="text-gradient-gold">brukar dyka upp</span></>}
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <AccordionItem
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-border bg-surface-elevated/40 px-5"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
