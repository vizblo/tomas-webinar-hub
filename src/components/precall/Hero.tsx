export function Hero() {
  return (
    <section className="px-4 pt-6 pb-6 text-center">
      <h1 className="mx-auto max-w-4xl text-4xl leading-[1.15] sm:text-5xl md:text-6xl">
        Du har bokat ditt samtal!<br />
        <span className="text-gradient-gold italic">Här är vad som händer nu...</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Den här sidan är skapad för att hjälpa dig avgöra om personlig coachning med mig är
        rätt nästa steg, innan vi ens hörs på vår konsultation. Kika igenom sidan och 
        kom in i vårt samtal med en tydlig bild av vad du går in i.
      </p>
      <div className="gold-divider" />
    </section>
  );
}
