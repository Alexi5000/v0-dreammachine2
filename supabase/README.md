# Supabase

This directory contains the SQL migrations that bootstrap the Nexus AI
schema: `profiles`, `projects`, `project_members`, `project_activity`,
`newsletter_signups`, plus the auth trigger that auto-provisions a profile
on sign-up.

## Apply locally

```bash
# One-time
npx supabase init

# Push migrations to a remote project (preferred)
npx supabase db push

# Or open the SQL editor in the Supabase dashboard and paste the contents
# of migrations/20260101000000_init.sql.
```

## Row Level Security

All tables ship with RLS enabled. The default posture is **deny**; explicit
policies grant access to:

- A user reading their own `profiles` row
- A user reading projects they own or are a member of
- An admin reading everything

Run the policies through `auth.uid()` rather than service-role bypass for
all user-driven queries — the service-role key should only be used by
trusted server code.
