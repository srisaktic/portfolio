/*
# Create secure contact submissions

1. New Tables
- `contact_submissions`
- `id` (uuid, primary key)
- `name` (text, visitor name)
- `email` (text, visitor reply address)
- `message` (text, visitor message)
- `created_at` (timestamptz, submission time)

2. Security
- Enable row-level security on `contact_submissions`.
- No public read, update, or delete policies are created because these submissions are private.
- The server-side contact function writes submissions with its service role after validating the request.

3. Important Notes
- The table is intentionally private so visitors cannot read other people’s contact messages.
- Email delivery is handled by the server-side function and does not expose an email provider key to the browser.
*/

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.contact_submissions FROM anon, authenticated;
GRANT INSERT ON TABLE public.contact_submissions TO service_role;
