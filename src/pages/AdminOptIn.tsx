import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { SplitTestPanel } from '@/components/SplitTestPanel';

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
    [views, pathFilter]
  );
  const filteredRegs = useMemo(
    () => (pathFilter === 'all' ? regs : regs.filter((r) => (r.landing_path ?? '') === pathFilter)),
    [regs, pathFilter]
  );

  const uniqueVisitors = useMemo(() => new Set(filteredViews.map((v) => v.session_id)).size, [filteredViews]);
  const regCount = filteredRegs.length;
  const uniqueRegSessions = useMemo(
    () => new Set(filteredRegs.map((r) => r.session_id).filter(Boolean) as string[]).size,
    [filteredRegs]
  );
  const optInRate = uniqueVisitors > 0 ? (uniqueRegSessions / uniqueVisitors) * 100 : 0;

  const daily = useMemo(() => {
    const byDay = new Map<string, { date: string; views: Set<string>; regs: number }>();
    const ensure = (d: string) => {
      if (!byDay.has(d)) byDay.set(d, { date: d, views: new Set(), regs: 0 });
      return byDay.get(d)!;
    };
    filteredViews.forEach((v) => ensure(v.created_at.slice(0, 10)).views.add(v.session_id));
    filteredRegs.forEach((r) => (ensure(r.created_at.slice(0, 10)).regs += 1));
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
    filteredRegs.forEach((r) => (ensure(sourceLabel(r.utm_source, r.utm_content)).regs += 1));
    return Array.from(map.values())
      .map((x) => ({ source: x.source, views: x.views.size, regs: x.regs, rate: x.views.size ? (x.regs / x.views.size) * 100 : 0 }))
      .sort((a, b) => b.views - a.views);
  }, [filteredViews, filteredRegs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet><title>Opt-in rate · Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <header className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Opt-in rate</h1>
          <div className="flex gap-2 items-center">
            <Select value={range} onValueChange={(v) => setRange(v as Range)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Senaste 24h</SelectItem>
                <SelectItem value="7d">Senaste 7 dagarna</SelectItem>
                <SelectItem value="30d">Senaste 30 dagarna</SelectItem>
                <SelectItem value="all">All tid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={pathFilter} onValueChange={setPathFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla sidor</SelectItem>
                {paths.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </header>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card label="Unika besökare" value={uniqueVisitors.toLocaleString()} />
          <Card label="Registreringar" value={regCount.toLocaleString()} />
          <Card label="Opt-in rate" value={`${optInRate.toFixed(1)}%`} />
        </div>

        <SplitTestPanel views={views} regs={regs} />

        <section className="border border-border rounded-2xl p-4 bg-card">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">Besök vs registreringar per dag</h2>
          <div className="h-72">
            {loading ? <div className="text-muted-foreground">Laddar…</div> : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" name="Unika besökare" />
                  <Line type="monotone" dataKey="regs" stroke="#ef4444" name="Registreringar" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="border border-border rounded-2xl p-4 bg-card overflow-x-auto">
          <h2 className="text-sm font-medium mb-3 text-muted-foreground">Per källa (UTM)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Källa</th><th>Besökare</th><th>Registreringar</th><th>Opt-in</th>
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
              {bySource.length === 0 && <tr><td colSpan={4} className="py-4 text-muted-foreground">Ingen data än.</td></tr>}
            </tbody>
          </table>
        </section>

        <p className="text-xs text-muted-foreground">
          Statistiken startar när denna dashboard driftsattes. Trafik innan dess ingår inte.
        </p>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-2xl p-5 bg-card">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  );
}
