import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const count = async (variant: 'a' | 'b') => {
      const sessions = new Set<string>();
      let from = 0;
      while (from < 200000) {
        const { data, error } = await supabase
          .from('page_views')
          .select('session_id')
          .eq('variant', variant)
          .eq('is_bot', false)
          .range(from, from + 999);
        if (error) throw error;
        if (!data || data.length === 0) break;
        data.forEach((r: { session_id: string }) => sessions.add(r.session_id));
        if (data.length < 1000) break;
        from += 1000;
      }
      return sessions.size;
    };

    const [a, b] = await Promise.all([count('a'), count('b')]);
    // Push variant B exclusively until it has caught up with A, then 50/50.
    const variant = b < a ? 'b' : Math.random() < 0.5 ? 'a' : 'b';

    return new Response(JSON.stringify({ variant, a, b }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ variant: 'a', error: String((e as Error)?.message ?? e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
