const serve = (handler: (req: Request) => Response | Promise<Response>) => Deno.serve(handler);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SYSTEME_API_BASE = "https://api.systeme.io/api";
const WEBINAR_TAG = "Webinar registrerad - 29 juli 2026";

function normalizeSwedishPhone(raw: string): string {
  // Remove everything except digits and leading +
  let p = raw.replace(/[^\d+]/g, "");
  if (p.startsWith("+")) return p;
  if (p.startsWith("00")) return "+" + p.slice(2);
  if (p.startsWith("46")) return "+" + p;
  if (p.startsWith("0")) return "+46" + p.slice(1);
  if (p.length > 0) return "+46" + p;
  return raw;
}

async function patchContactPhoneAndCountry(apiKey: string, contactId: string, normalizedPhone: string): Promise<void> {
  if (!normalizedPhone) return;

  const patchRes = await fetch(`${SYSTEME_API_BASE}/contacts/${contactId}`, {
    method: "PATCH",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/merge-patch+json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      fields: [
        { slug: "phone_number", value: normalizedPhone },
        { slug: "country", value: "SE" },
      ],
    }),
  });

  if (!patchRes.ok) {
    const errText = await patchRes.text();
    console.error("Failed to patch phone/country:", patchRes.status, errText);
  } else {
    console.log("Phone/country patched on contact", contactId);
  }
}

async function getOrCreateContact(apiKey: string, email: string, firstName: string, phone?: string): Promise<string | null> {
  const normalizedPhone = phone ? normalizeSwedishPhone(phone) : "";

  // Try to fetch existing contact by email
  const searchRes = await fetch(`${SYSTEME_API_BASE}/contacts?email=${encodeURIComponent(email)}`, {
    headers: {
      "X-API-Key": apiKey,
      "Accept": "application/json",
    },
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.items && data.items.length > 0) {
      const existingContactId = String(data.items[0].id);
      await patchContactPhoneAndCountry(apiKey, existingContactId, normalizedPhone);
      return existingContactId;
    }
  }

  // Create new contact
  const body: Record<string, unknown> = { email, locale: "sv" };
  const fields: Array<{ slug: string; value: string }> = [
    { slug: "first_name", value: firstName },
    { slug: "country", value: "SE" },
  ];
  if (normalizedPhone) fields.push({ slug: "phone_number", value: normalizedPhone });
  body.fields = fields;

  console.log("Creating Systeme contact", { hasPhone: Boolean(normalizedPhone) });

  const createRes = await fetch(`${SYSTEME_API_BASE}/contacts`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  });

  const createBodyText = await createRes.text();
  if (!createRes.ok) {
    console.error("Failed to create contact:", createRes.status, createBodyText);
    return null;
  }
  console.log("Systeme contact created");

  let created: { id?: string } = {};
  try { created = JSON.parse(createBodyText); } catch (_) { /* ignore */ }
  const contactId = created.id ? String(created.id) : null;

  // If phone provided, also PATCH it onto the contact (some Systeme accounts ignore phone on create)
  if (contactId && normalizedPhone) {
    await patchContactPhoneAndCountry(apiKey, contactId, normalizedPhone);
  }

  return contactId;
}

async function findTagId(apiKey: string, tagName: string): Promise<number | null> {
  let startingAfter: number | null = null;
  const normalizedTarget = tagName.trim().toLocaleLowerCase("sv");

  // Systeme.io ignores the `name` query parameter and returns a paginated collection.
  // Walk every page so an existing tag is found even when it is not among the newest tags.
  for (let page = 0; page < 100; page += 1) {
    const params = new URLSearchParams({ limit: "100", order: "asc" });
    if (startingAfter !== null) params.set("startingAfter", String(startingAfter));

    const tagsRes = await fetch(`${SYSTEME_API_BASE}/tags?${params.toString()}`, {
      headers: { "X-API-Key": apiKey, "Accept": "application/json" },
    });

    if (!tagsRes.ok) {
      const errText = await tagsRes.text();
      throw new Error(`Could not list Systeme tags (${tagsRes.status}): ${errText}`);
    }

    const tagsData = await tagsRes.json();
    const items = Array.isArray(tagsData.items) ? tagsData.items : [];
    const exactMatch = items.find((tag: { id: number; name: string }) =>
      typeof tag.name === "string" && tag.name.trim().toLocaleLowerCase("sv") === normalizedTarget
    );
    if (exactMatch) return Number(exactMatch.id);
    if (items.length < 100) return null;

    const lastId = Number(items.at(-1)?.id);
    if (!Number.isFinite(lastId) || lastId === startingAfter) return null;
    startingAfter = lastId;
  }

  throw new Error("Could not finish searching Systeme tags");
}

async function addTagToContact(apiKey: string, contactId: string, tagName: string): Promise<void> {
  let tagId = await findTagId(apiKey, tagName);

  if (!tagId) {
    // Create tag if not found
    const createTagRes = await fetch(`${SYSTEME_API_BASE}/tags`, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name: tagName }),
    });

    if (createTagRes.ok) {
      const newTag = await createTagRes.json();
      tagId = newTag.id;
    } else {
      const errText = await createTagRes.text();
      // A concurrent request may have created the tag after our lookup.
      if (createTagRes.status === 422) tagId = await findTagId(apiKey, tagName);
      if (!tagId) throw new Error(`Could not create Systeme tag (${createTagRes.status}): ${errText}`);
    }
  }

  // Add tag to contact
  const addTagRes = await fetch(`${SYSTEME_API_BASE}/contacts/${contactId}/tags`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ tagId }),
  });

  if (!addTagRes.ok) {
    const errText = await addTagRes.text();
    throw new Error(`Could not add Systeme tag (${addTagRes.status}): ${errText}`);
  } else {
    console.log(`Tag "${tagName}" added to contact ${contactId}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SYSTEME_API_KEY = Deno.env.get("SYSTEME_API_KEY");
    if (!SYSTEME_API_KEY) {
      console.error("SYSTEME_API_KEY is not configured");
      return new Response(JSON.stringify({ success: false, error: "Registration failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ success: false, error: "Invalid request." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const type = typeof body.type === "string" ? body.type : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedTypes = ["webinar", "qa"];

    if (
      !email || !firstName ||
      email.length > 200 || firstName.length > 100 ||
      !emailRegex.test(email) ||
      (phone && phone.length > 30) ||
      (type && !allowedTypes.includes(type))
    ) {
      return new Response(JSON.stringify({ success: false, error: "Invalid input." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get or create contact in Systeme.io
    const contactId = await getOrCreateContact(SYSTEME_API_KEY, email, firstName, phone || undefined);

    if (!contactId) {
      console.error("Could not get or create contact in Systeme.io");
      return new Response(JSON.stringify({ success: false, error: "Registration failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Add tags based on registration type
    if (type === "webinar") {
      await addTagToContact(SYSTEME_API_KEY, contactId, WEBINAR_TAG);
    } else if (type === "qa") {
      await addTagToContact(SYSTEME_API_KEY, contactId, "Q&A - 2 april 2026");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in register-contact:", error);
    return new Response(JSON.stringify({ success: false, error: "Registration failed. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
