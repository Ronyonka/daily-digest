# Lawyer Daily Digest

A Next.js proof of concept for a law-firm daily digest. It combines mocked
calendar, email, Fathom meeting notes, Harvest, and client/matter data into a
hosted dashboard and a Slack digest delivered through the same server-side
aggregation pipeline.

Live demo: https://daily-digest-tan.vercel.app

## What this proves

- One shared snapshot can power both a dashboard and a Slack summary
- Mocked legal-work data can still feel like a believable morning brief
- Yesterday's call summaries can be surfaced alongside today's action items
- The dashboard is shareable as a hosted link
- Slack delivery can be triggered manually or by Vercel Cron

## Real vs mocked

Real:

- Next.js App Router app
- Tailwind styling
- Server-side JSON loading and Zod validation
- Shared aggregation logic in `lib/aggregator.ts`
- Slack Block Kit formatting in `lib/slack-formatter.ts`
- Slack webhook posting in `lib/slack-client.ts`
- `/api/digest` for manual runs or cron-triggered runs
- Vercel hosting and cron configuration

Mocked:

- Calendar data
- Email data
- Fathom meeting summaries and action items
- Harvest data
- Client / matter status data
- Any live Microsoft Graph, Harvest, or practice-management integration

Important honesty note: there is no auth, no database, and no real third-party
account access behind the dashboard data. The client/matter section is
intentionally invented to represent the kind of legal-work status tracking a
real version could support, but it does not map to any specific real product.
It was built speculatively before confirming whether the firm has a dedicated
client/matter-tracking system or whether this information lives inside Harvest's
client records, so a real version would need that clarified before treating it
as a true data source.

## Repo structure

```text
app/
components/
data/
lib/
```

- `app/page.tsx` renders the dashboard
- `app/api/digest/route.ts` formats and sends the Slack digest
- `components/` contains the dashboard cards and shared UI helpers
- `data/` contains the mock JSON fixtures
- `lib/schemas.ts` defines the Zod schemas
- `lib/aggregator.ts` loads and validates the data server-side

## Run locally

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

`.env.local` is ignored by git. The Slack workspace and incoming webhook are
manual setup steps.

## Current status

This proof of concept is complete:

- The dashboard renders all four mocked sections
- Fathom appears as a first-class dashboard card for yesterday's calls
- The shared aggregator powers both the UI and the Slack digest route
- The Slack digest can be triggered manually and via cron
- The dashboard is deployed to Vercel
- The repo has loading and empty states, plus a consistent shared card shell

## Future Direction

This build intentionally stops at a single morning digest. A fuller version would
move from one cron-triggered snapshot to an event-driven or polling model that
can push incremental updates as they happen, such as a newly urgent email or a
meeting ending with action items from Fathom. Architecturally, that would mean
adding a continuous ingestion layer and an update dispatcher instead of relying
only on a once-a-day batch run.

## Notes

- The dashboard is meant to be forwardable as a demo, not treated as a live
  production app.
- Fathom is mocked on purpose, but the card is shaped to feel like a real
  morning handoff from yesterday's meetings.
- The client/matter section is the most speculative part of the concept and is
  clearly mocked here on purpose.
- The firm already runs an internal AI inference platform, so any real
  AI-generated content in a future version of this digest would likely route
  through that existing platform instead of introducing a separate one.
- If you want to adapt this into a real product, the next step would be wiring
  the mocked sources to actual systems and redoing the honesty copy for those
  integrations.
