CREATE TABLE public.ai_access_state (id text PRIMARY KEY, blocked boolean NOT NULL DEFAULT false, status integer NOT NULL DEFAULT 403, reason text NOT NULL DEFAULT '', updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.ai_access_state TO service_role;
REVOKE ALL ON public.ai_access_state FROM anon, authenticated;
ALTER TABLE public.ai_access_state ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ai_access_state IS 'Server-only AI access circuit breaker. Contains no visitor conversations. No client access policies intentionally.';