import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { SplitTestPanel } from '@/components/admin/SplitTestPanel';

type Range = '24h' | '7d' | '30d' | 'all';
type PageView = { path: string; session_id: string; created_at: string; utm_source: string | null; utm_content?: string | null; is_bot: boolean; variant: string | null };
type Registration = { session_id: string | null; landing_path: string | null; created_at: string; utm_source: string | null; utm_content?: string | null; variant: string | null };

function sourceLabel(utm_source: string | null | undefined, utm_content: string | null | undefined): string {
  const s = (utm_source || '').toLowerCase();
  const isPaidSocial = s === 'fb' || s === 'ig' || s === 'facebook' || s === 'instagram' || s.includes('meta');
  if (isPaidSocial && utm_content) return `${utm_source} · ${utm_content}`;
  return utm_source || '(direct)';
}

export default function AdminOptIn() {
  const [range, setRange] = useState<Range>('7d');
  const [pathFilter, setPathFilter] = useState<string>('all');
  const [views, setViews] = useState<PageView[]>([]);
  const [regs, setRegs] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    document.title = 'Opt-in rate · Admin';
    const meta = document.querySelector('meta[name="robots"]');
    if (meta) meta.setAttribute('content', 'noindex');
    else {
      const m = document.createElement('meta');
      m.name = 'robots';
      m.content = 'noindex';
      document.head.appendChild(m);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase.functions.invoke('admin-stats', { body: { range } });
      if (cancelled) return;
      setLoading(false);
      if (error || (data as any)?.error) {
        setError((data as any)?.error || error?.message || 'Error');
        return;
      }
      setViews((data as any).views ?? []);
      setRegs((data as any).regs ?? []);
    })();
    return () => { cancelled = true; };
  }, [range]);

  const paths = useMemo(() => {
    const set = new Set<string>();
    views.forEach((v) => set.add(v.path));
    return Array.from(set).sort();
  }, [views]);

  const filteredViews = useMemo(
    () => (pathFilter === 'all' ? views : views.filter((v) => v.path === pathFilter)),
    [views, pathFilter],
  );
  const filteredRegs = useMemo(
    () => (pathFilter === 'all' ? regs : regs.filter((r) => (r.landing_path ?? '') === pathFilter)),
    [regs, pathFilter],
  );

  const uniqueVisitors = useMemo(() => new Set(filteredViews.map((v) => v.session_id)).size, [filteredViews]);
  const regCount = filteredRegs.length;
  const uniqueRegSessions = useMemo(
    () => new Set(filteredRegs.map((r) => r.session_id).filter(Boolean) as string[]).size,
    [filteredRegs],
  );
  const optInRate = uniqueVisitors > 0 ? (uniqueRegSessions / uniqueVisitors) * 100 : 0;

  const daily = useMemo(() => {
    const byDay = new Map<string, { date: string; views: Set<string>; regs: number }>();
    const ensure = (d: string) => {
      if (!byDay.has(d)) byDay.set(d, { date: d, views: new Set(), regs: 0 });
      return byDay.get(d)!;
    };
    filteredViews.forEach((v) => ensure(v.created_at.slice(0, 10)).views.add(v.session_id));
    filteredRegs.forEach((r) => ensure(r.created_at.slice(0, 10)).regs += 1);
    return Array.from(byDay.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((x) => ({ date: x.date, views: x.views.size, regs: x.regs }));
  }, [filteredViews, filteredRegs]);

  const bySource = useMemo(() => {
    const map = new Map<string, { source: string; views: Set<string>; regs: number }>();
    const ensure = (s: string) => {
      if (!map.has(s)) map.set(s, { source: s, views: new Set(), regs: 0 });
      return map.get(s)!;
    };
    filteredViews.forEach((v) => ensure(sourceLabel(v.utm_source, v.utm_content)).views.add(v.session_id));
    filteredRegs.forEach((r) => ensure(sourceLabel(r.utm_source, r.utm_content)).regs += 1);
    return Array.from(map.values())
      .map((x) => ({ source: x.source, views: x.views.size, regs: x.regs, rate: x.views.size ? (x.regs / x.views.size) * 100 : 0 }))
      .sort((a, b) => b.views - a.views);
  }, [filteredViews, filteredRegs]);

  const applyFunnel = useMemo(() => {
    const applySessions = new Set<string>();
    const confirmedSessions = new Set<string>();
    views.forEach((v) => {
      if (v.path === '/apply') applySessions.add(v.session_id);
      if (v.path === '/confirmed-a') confirmedSessions.add(v.session_id);
    });
    let converted = 0;
    applySessions.forEach((s) => { if (confirmedSessions.has(s)) converted += 1; });
    const rate = applySessions.size > 0 ? (converted / applySessions.size) * 100 : 0;
    return { apply: applySessions.size, converted, rate };
  }, [views]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Opt-in rate</h1>
          <div className="flex gap-2 items-center">
            <Select value={range} onValueChange={(v) => setRange(v as Range)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Select value={pathFilter} onValueChange={setPathFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All pages</SelectItem>
                {paths.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </header>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Unique visitors" value={uniqueVisitors.toLocaleString()} />
          <StatCard label="Registrations" value={regCount.toLocaleString()} />
          <StatCard label="Opt-in rate" value={`${optInRate.toFixed(1)}%`} />
        </div>

        <section className="border border-border rounded-2xl p-4 bg-card">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">/apply → /confirmed-a funnel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="/apply visitors" value={applyFunnel.apply.toLocaleString()} />
            <StatCard label="Reached /confirmed-a" value={applyFunnel.converted.toLocaleString()} />
            <StatCard label="Conversion rate" value={`${applyFunnel.rate.toFixed(1)}%`} />
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">
            Same session must view both pages. Ignores the page filter above.
          </p>
        </section>

        <SplitTestPanel views={views} regs={regs} />

        <section className="border border-border rounded-2xl p-4 bg-card">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">Daily views vs registrations</h2>
          <div className="h-72">
            {loading ? <div className="text-muted-foreground">Loading…</div> : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" name="Unique visitors" />
                  <Line type="monotone" dataKey="regs" stroke="#ef4444" name="Registrations" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="border border-border rounded-2xl p-4 bg-card overflow-x-auto">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">By source (UTM)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Source</th><th>Visitors</th><th>Registrations</th><th>Opt-in</th>
              </tr>
            </thead>
            <tbody>
              {bySource.map((row) => (
                <tr key={row.source} className="border-t border-border">
                  <td className="py-2">{row.source}</td>
                  <td>{row.views}</td>
                  <td>{row.regs}</td>
                  <td>{row.rate.toFixed(1)}%</td>
                </tr>
              ))}
              {bySource.length === 0 && <tr><td colSpan={4} className="py-4 text-muted-foreground">No data yet.</td></tr>}
            </tbody>
          </table>
        </section>

        <p className="text-xs text-muted-foreground">
          Tracking started when this dashboard was deployed. Historical traffic prior to deployment isn't included.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-2xl p-5 bg-card">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  );
}
