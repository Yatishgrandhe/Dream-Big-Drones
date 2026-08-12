# Dream Big Drones by RLM

Editorial one-page aerial portfolio with a Supabase-backed inquiry form and a private studio dashboard.

## Local development

```bash
npm install
npm run dev
```

For local admin access, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to `.env.local`. Run local API routes with `vercel dev` when testing submissions.

The connected Supabase project URL and publishable key are configured in the local `.env.local`. For the Vercel API routes, set these server-only variables in the Vercel project environment (do not use a `VITE_` prefix):

```bash
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<Supabase secret or legacy service-role key>
ADMIN_EMAIL=<studio-owner-email>
```

## Admin setup

The private studio uses Supabase Auth. Create the owner account from the unlisted `/setup` admin route, confirm the email if Supabase requires it, then sign in from the private admin route. The Vercel server only permits the email in `ADMIN_EMAIL` to read or update inquiries.

## Resend notifications

Every successful inquiry is stored in the private Supabase `inquiries` table and then emailed to `dreambigdronesbyrlm@gmail.com`. The server uses `Dream Big Drones <onboarding@resend.dev>` until a verified sender domain is configured with `RESEND_FROM_EMAIL`.

See [Google Sheets setup](./docs/GOOGLE_SHEETS_SETUP.md) to enable a live inquiry sheet with a `Viewed` column.

## Verification

```bash
npm run build
npm run lint
```
