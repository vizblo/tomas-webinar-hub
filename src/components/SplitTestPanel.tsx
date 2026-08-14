import { useMemo } from 'react';

type View = { session_id: string; variant: string | null };
type Reg = { session_id: string | null; variant: string | null };

const LABELS: Record<string, string> = { a: 'A (/)', b: 'B (/b)' };
const VARIANTS: Array<'a' | 'b'> = ['a', 'b'];

// Wilson score interval (95%)
function wilson(pos: number, n: number): [number, number] {
  if (n === 0) return [0, 0];
  const z = 1.96;
  const p = pos / n;
  const denom = 1 + (z * z) / n;
  const center = p + (z * z) / (2 * n);
  const margin = z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n);
  return [Math.max(0, (center - margin) / denom), Math.min(1, (center + margin) / denom)];
}

export function SplitTestPanel({ views, regs }: { views: View[]; regs: Reg[] }) {
  const stats = useMemo(
    () =>
      VARIANTS.map((v) => {
        const uniq = new Set(views.filter((x) => x.variant === v).map((x) => x.session_id)).size;
        const rSessions = regs.filter((r) => r.variant === v);
        const rCount = rSessions.length;
        const rUniq = new Set(rSessions.map((r) => r.session_id).filter(Boolean) as string[]).size;
        const rate = uniq > 0 ? rUniq / uniq : 0;
        const [lo, hi] = wilson(rUniq, uniq);
        return { variant: v, label: LABELS[v], uniq, rCount, rate, lo, hi };
      }),
    [views, regs]
  );

  const [a, b] = stats;
  let winner: 'a' | 'b' | null = null;
  const enoughData = a.rCount >= 30 && b.rCount >= 30;
  if (enoughData) {
    if (a.lo > b.hi) winner = 'a';
    else if (b.lo > a.hi) winner = 'b';
  }

  return (
    <section className="border border-border rounded-2xl p-4 bg-card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-muted-foreground">Split test · A vs B</h2>
        {winner ? (
          <span className="text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-500 border border-green-600/40">
            Vinnare: {LABELS[winner]} (95% konf.)
          </span>
        ) : enoughData ? (
          <span className="text-xs text-muted-foreground">Ingen tydlig vinnare ännu</span>
        ) : (
          <span className="text-xs text-muted-foreground">Samlar data…</span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((s) => (
          <div key={s.variant} className="border border-border rounded-xl p-4 bg-background/40">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Variant {s.label}</div>
            <div className="text-3xl font-semibold mt-1">{(s.rate * 100).toFixed(2)}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              95% CI: {(s.lo * 100).toFixed(2)}% – {(s.hi * 100).toFixed(2)}%
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">Besökare</div>
                <div className="font-medium">{s.uniq.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Registreringar</div>
                <div className="font-medium">{s.rCount.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-3">
        Varianten sätts av landningssidan besökaren kom in på och sparas per besökare.
      </p>
    </section>
  );
}
