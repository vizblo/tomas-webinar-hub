import { Link } from "react-router-dom";
import butterfly from "@/assets/precall/butterfly-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <img src={butterfly} alt="" width={40} height={40} loading="lazy" className="opacity-70" />
        <p className="font-serif text-lg text-foreground">Tomas Lydahl</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href="https://tomaslydahl.se"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            tomaslydahl.se
          </a>
          <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-gold">
            Integritetspolicy
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-gold">
            Användarvillkor
          </Link>
          <a
            href="mailto:tomas@tomaslydahl.se"
            className="text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            tomas@tomaslydahl.se
          </a>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tomas Lydahl · Alla rättigheter förbehållna
        </p>
      </div>
    </footer>
  );
}
