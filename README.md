# Tech Stack

- Environment: [NodeJs] [BunJs]
- Script: [Typescript]
- Database: [PostgreSQL]
- Framework: [Nextjs] [React]
- Architecture: [RSC]
- Custom Server: [Elysia]
- Runtime: [Edge] [Serverless]
- API & DAL: [SupabaseJS]

## Services & APIS

- Email: [Resend]
- API layer: [SupabaseAPI]
- Auth: [SupabaseAuth]
  Auth provider: [GoogleOAUTH], [EmailOTP], [Credentials]
- E2E Testing: [PlaywrightTesting]

## Typeset from supabase database - cli commands to generate types

supabase gen types typescript --schema event_booking --project-id ztyzupbkbbyqyhjkuauu> db.booking.types.ts
types % supabase gen types typescript --project-id ztyzupbkbbyqyhjkuauu> database.types.ts

## Testing Library - e2e tests with playwright

- [CLI]:
  - npx playwright test
  - npx playwright show-report
  - npx playwright test --ui

## Scafolded with T3 Stack

- [Repo](https://github.com/dijonmusters/subscription-starter-demo)

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
