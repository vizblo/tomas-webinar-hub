
// CORS headers for web requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const TAG_NAME = 'Webinar repris - 25 augusti 2026';
let cachedTagId: number | null = null;

async function getReplayTagId(apiKey: string): Promise<number> {
  if (cachedTagId) return cachedTagId;

  const res = await fetch(`https://api.systeme.io/api/tags?query=${encodeURIComponent(TAG_NAME)}&limit=100`, {
    headers: { 'X-API-Key': apiKey },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Could not fetch Systeme.io tags ${res.status}: ${body}`);
  }

  const data = await res.json();
  const tag = (data?.items ?? []).find((item: { id?: number; name?: string }) => item.name === TAG_NAME);

  if (!tag?.id) {
    throw new Error(`Systeme.io tag not found: ${TAG_NAME}`);
  }

  cachedTagId = tag.id;
  return tag.id;
}

async function addTagToContact(contactId: number, apiKey: string): Promise<void> {
  const tagId = await getReplayTagId(apiKey);
  const res = await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ tagId }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`addTagToContact ${contactId} failed ${res.status}: ${body}`);
  }
}

async function findContactByEmail(email: string, apiKey: string): Promise<number | null> {
  const res = await fetch(`https://api.systeme.io/api/contacts?email=${encodeURIComponent(email)}`, {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const items = data?.items ?? [];
  return items.length > 0 ? items[0].id : null;
}

// Serve function
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { name, email } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const SYSTEME_API_KEY = Deno.env.get('SYSTEME_API_KEY');
    if (!SYSTEME_API_KEY) {
      console.error('SYSTEME_API_KEY is not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const replayTagId = await getReplayTagId(SYSTEME_API_KEY);

    // Create contact with tag
    const response = await fetch('https://api.systeme.io/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': SYSTEME_API_KEY },
      body: JSON.stringify({
        email,
        given_name: name,
        tags: [{ id: replayTagId }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Systeme.io API error:', errorData);

      // Contact already exists – look up their ID and assign the tag
      if (errorData.includes('already used')) {
        const contactId = await findContactByEmail(email, SYSTEME_API_KEY);
        if (contactId) {
          await addTagToContact(contactId, SYSTEME_API_KEY);
          console.log(`Tag assigned to existing contact ${contactId}`);
        }
        return new Response(
          JSON.stringify({ success: true, message: 'Contact already registered, tag assigned' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: 'Failed to register contact' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    // Also assign tag via dedicated endpoint to ensure it's applied
    if (data?.id) {
      await addTagToContact(data.id, SYSTEME_API_KEY);
    }

    return new Response(
      JSON.stringify({ success: true, contact: data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in register-repris function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
