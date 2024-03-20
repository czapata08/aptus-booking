<!-- prettier-ignore -->
# Status

- Production Domain Deployment [x]
- Webhook tock integration [x]
- Webhook data validation [x]
- Webhook jwt authorization strategy [x]
- Payments with stripe [x]
- Stripe embedded form [x]
- Stripe api keys - tested [x]
- CMS operational features
  -create: events management dashboard [x]
  -update: events management dashboard [x]
  -delete: events management dashboard [x]
  -read: public landing page, read from stripe
- Database: RBAC, RLS, Auth [x]
- API: DAL - functions [x]
- Auth:
  credentials [x]
  google - links to supabase account [x]
  otp [x]
- Middleware: cookies, public/private routes [x]
- Custom server with elysia [x]
- Eslint [x]
- Unit Test implementation [x]
- User Account UI
  Profile []
  Notifications & Emails []
  Account Information []

# Production Url

[status] === <Live>
https://www.beaptus.com
https://be-aptus.vercel.app

# Tech Stack

- Run Time: [NodeJs] [BunJs]
- Runtime Environment: [Edge] [Serverless]
- Script: [Typescript]
- Database: [PostgreSQL]
- Framework: [Nextjs] [React]
- Architecture: [RSC]
- Custom Server: [Elysia]
- API & DAL: [SupabaseJS]

## Services & APIS

- Email: [Resend]
- API layer: [SupabaseAPI]
- Storage: [SupabaseStorage]
- Auth: [SupabaseAuth]
  Auth provider: [GoogleOAUTH], [EmailOTP], [Credentials]
- E2E Testing: [PlaywrightTesting]
- Custom server: [Elysia]: tock webhook

## Typeset from supabase database - cli commands to generate types

supabase gen types typescript --schema event_booking --project-id ztyzupbkbbyqyhjkuauu> db.booking.types.ts
types % supabase gen types typescript --project-id ztyzupbkbbyqyhjkuauu> database.types.ts

## Testing Library - e2e tests with playwright

- [CLI]:
  - npx playwright test
  - npx playwright show-report
  - npx playwright test --ui

## Api documentation

- [T3 Documentation](https://create.t3.gg/)
- [Guide Repo Stripe Supabase Saas]: (https://github.com/dijonmusters/subscription-starter-demo)

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
