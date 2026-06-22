# Lawyer Daily Digest

A Next.js proof of concept for a law-firm daily digest. The app shows a hosted
dashboard with mocked calendar, email, Harvest, and client/matter data, all
loaded through a shared server-side aggregator. It also includes a Slack digest
route that formats the same snapshot into Block Kit and posts it to a webhook.

Live demo: https://daily-digest-tan.vercel.app

## What this project demonstrates

- A single dashboard view that combines four data sources into one snapshot
- Shared aggregation logic used by the dashboard and the Slack digest route
- A Slack-ready `/api/digest` route for manual runs and Vercel Cron
- Real Vercel hosting for the web app
- Mocked data stored in static JSON fixtures under `data/`

## What is real vs mocked

Real:

- Next.js App Router application
- Tailwind styling
- Server-side JSON loading and Zod validation
- Shared aggregation logic in `lib/aggregator.ts`
- Slack Block Kit formatting in `lib/slack-formatter.ts`
- Slack webhook posting in `lib/slack-client.ts`
- The `/api/digest` route that ties the digest pipeline together
- Deployed dashboard on Vercel

Mocked:

- Calendar data
- Email data
- Harvest data
- Client / matter status data
- Any notion of live integrations with Microsoft Graph, Harvest, or practice
  management software

Important: there is no real authentication, no database, and no third-party API
integration behind the dashboard data. The client/matter section is intentionally
invented to represent the kind of legal-work status tracking a real version
could support.

## Repo structure

```text
app/
components/
data/
lib/
```

- `app/page.tsx` renders the dashboard
- `components/` contains the four cards
- `data/` contains the mock JSON fixtures
- `lib/schemas.ts` defines the Zod schemas
- `lib/aggregator.ts` loads and validates the data server-side

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create a local `.env.local` file for the Slack webhook secret:

```bash
SLACK_WEBHOOK_URL=
```

`.env.local` is ignored by git. The Slack workspace and incoming webhook itself
are a manual one-time setup step that still needs to be completed before the
digest route can post successfully.

## Current status

Day 1 of the proof of concept is complete, and the Slack digest pipeline is in
place:

- Mock JSON fixtures exist for all four sections
- Zod schemas validate the data
- The dashboard cards are wired to the shared aggregator
- The dashboard is deployed to Vercel and renders real mock data
- The Slack formatter, webhook client, and `/api/digest` route are built

Remaining Day 2 work:

- Manually create the Slack workspace and incoming webhook
- Add `SLACK_WEBHOOK_URL` to the deployed Vercel project
- Add `vercel.json` cron config
- Test the digest route against the real webhook
- Polish any remaining UI rough edges

## Notes

- There is no real client data source behind the matter/status section.
- The dashboard is intended to be forwardable as a demo, not a production app.
- Slack delivery is wired in code, but the webhook must still be created and
  configured manually.
