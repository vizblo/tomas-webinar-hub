import butterfly from "@/assets/butterfly-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <img src={butterfly} alt="" width={40} height={40} className="opacity-70" />
        <p className="font-serif text-lg text-foreground">Tomas Lydahl</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tomas Lydahl · Alla rättigheter förbehållna
        </p>
      </div>
    </footer>
  );
}
