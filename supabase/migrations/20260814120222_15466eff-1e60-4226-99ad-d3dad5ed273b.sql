CREATE TABLE public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  session_id text not null,
  variant text,
  referrer text,
  is_bot boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamptz not null default now()
);

CREATE TABLE public.registrations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  phone text,
  country_code text,
  session_id text,
  landing_path text,
  variant text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamptz not null default now()
);

GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT ALL ON public.page_views TO service_role;
GRANT INSERT ON public.registrations TO anon, authenticated;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a page view" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can log a registration" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX page_views_created_at_idx ON public.page_views (created_at);
CREATE INDEX registrations_created_at_idx ON public.registrations (created_at);