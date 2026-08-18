const PkLegalFooter = () => (
  <footer className="pk-theme relative z-10 border-t border-white/10 bg-black py-5 text-center text-xs text-white/60">
    <p className="mb-3">© {new Date().getFullYear()} Tomas Lydahl AB. Alla rättigheter förbehållna.</p>
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
      <a href="/privacy" className="transition-opacity hover:opacity-80 underline underline-offset-4">
        Integritetspolicy
      </a>
      <span className="opacity-40">·</span>
      <a href="/terms" className="transition-opacity hover:opacity-80 underline underline-offset-4">
        Användarvillkor
      </a>
    </p>
  </footer>
);

export default PkLegalFooter;
