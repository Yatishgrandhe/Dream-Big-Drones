# Dream Big Drones by RLM

Editorial one-page aerial portfolio with a Convex-backed project inquiry form and a private studio dashboard.

## Local development

```bash
npm install
npx convex dev
npm run dev
```

The Vite client reads `VITE_CONVEX_URL` from `.env.local`; the Convex CLI creates it when the project is linked.

## Admin setup

Choose a strong, unique password (at least 16 characters) and generate a Scrypt hash locally:

```bash
npm run admin:hash
npx convex env set ADMIN_PASSWORD_HASH '<paste-the-generated-hash>'
```

`ADMIN_EMAIL` is already restricted to the studio owner on the Convex development deployment. Use the unlisted setup URL formed by adding `/setup` to the private path in `.env.local` once, create the single account with that email and password, then use the private path itself to sign in.

## Free Resend notifications (no domain)

Create a free Resend account using `rmorrison339@gmail.com`, verify that inbox, and create an API key. During this domain-free stage, Resend sends only to that verified account from `Dream Big Drones <onboarding@resend.dev>`; it is ideal for owner notifications, not public email delivery.

```bash
npx convex env set RESEND_API_KEY 're_...'
npx convex env set NOTIFICATION_TO_EMAIL 'rmorrison339@gmail.com'
```

Every successful inquiry schedules a server-side notification. It is marked `notificationSent: true` only after Resend accepts it. If the key is absent or Resend is unavailable, the customer form still succeeds and the submission remains safely stored with `notificationSent: false`.

## Verification

```bash
npx tsc --noEmit -p convex/tsconfig.json
npm run build
npm run lint
```
