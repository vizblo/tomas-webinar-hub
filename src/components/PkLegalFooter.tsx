const PkLegalFooter = ({ disclaimer }: { disclaimer?: string }) => (
  <footer className="pk-theme relative z-10 border-t border-white/10 bg-black pt-4 pb-2 text-center text-xs text-white/60">
    <p className="mb-2">© {new Date().getFullYear()} Tomas Lydahl AB. Alla rättigheter förbehållna.</p>
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
      <a href="/privacy" className="transition-opacity hover:opacity-80 underline underline-offset-4">
        Integritetspolicy
      </a>
      <span className="opacity-40">·</span>
      <a href="/terms" className="transition-opacity hover:opacity-80 underline underline-offset-4">
        Användarvillkor
      </a>
    </p>
    {disclaimer && (
      <p className="mx-auto mt-2 max-w-[720px] px-5 text-[11px] leading-relaxed text-white/40">
        {disclaimer}
      </p>
    )}
  </footer>
);

export default PkLegalFooter;
