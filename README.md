# Dream Big Drones — Nesh edition

This is the production-ready Dream Big Drones site rebuilt inside `nesh`. It retains the Nesh visual and motion foundation while using Dream Big Drones branding, approved media, content, and Convex contact intake.

## Development

```bash
npm install
npx convex dev
npm run dev
```

`npx convex dev` writes the local deployment URL. Copy `VITE_CONVEX_URL` into `.env.local` if it was not added automatically.

## Required production configuration

Set `VITE_CONVEX_URL` in Vercel. Set these server-side on the Convex production deployment when applicable:

```bash
npx convex env set RESEND_API_KEY 're_...'
npx convex env set NOTIFICATION_TO_EMAIL 'owner@example.com'
npx convex env set ADMIN_EMAIL 'owner@example.com'
npx convex env set ADMIN_PASSWORD_HASH 'generated-scrypt-hash'
```

The public site submits real records to `contacts:submit`; it never claims a successful submission when Convex is unavailable.

## Verification

```bash
npm run typecheck
npm run build
npm run lint
```
