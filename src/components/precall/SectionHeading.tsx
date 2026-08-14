interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-center font-semibold uppercase tracking-[0.25em] text-gold text-xl">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      <div className="gold-divider" />
      {subtitle && (
        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
