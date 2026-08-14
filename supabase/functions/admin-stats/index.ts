import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const PAGE_SIZE = 1000;

async function fetchAll(query: (from: number, to: number) => any) {
  const all: any[] = [];
  let from = 0;
  while (from < 200000) {
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await query(from, to);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { range = '7d' } = await req.json().catch(() => ({}));

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const since = new Date();
    if (range === '24h') since.setHours(since.getHours() - 24);
    else if (range === '30d') since.setDate(since.getDate() - 30);
    else if (range === 'all') since.setFullYear(2020);
    else since.setDate(since.getDate() - 7);
    const startIso = since.toISOString();

    const [views, regs] = await Promise.all([
      fetchAll((from, to) =>
        supabase
          .from('page_views')
          .select('path,session_id,created_at,utm_source,utm_content,is_bot,variant')
          .gte('created_at', startIso)
          .eq('is_bot', false)
          .order('created_at', { ascending: true })
          .range(from, to)
      ),
      fetchAll((from, to) =>
        supabase
          .from('registrations')
          .select('session_id,landing_path,created_at,utm_source,utm_content,variant')
          .gte('created_at', startIso)
          .order('created_at', { ascending: true })
          .range(from, to)
      ),
    ]);

    return new Response(JSON.stringify({ views, regs }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error)?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
