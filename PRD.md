# Lawyer Daily Digest — Proof of Concept PRD (v2, Next.js)

## Context

Interview scenario with Mark: lawyers waste time hunting across multiple tabs (calendar, email, Harvest, client/matter status). Proposed direction: consolidate into one view AND push a daily summary into Slack, so the habit-forming delivery mechanism (Slack) and the richer reference surface (web dashboard) both exist, serving different moments — Slack for "glance and go," dashboard for "I need to dig in."

This version is scoped for a **2-day build**, hosted, forwardable, with room to extend.

## Day 3 — Refinement Based on Follow-Up Context

Follow-up conversation with the actual stakeholder clarified the real internal stack and the product shape we should be honest about going forward:

- **Harvest** is the time-tracking, client records, billing, and invoicing system. This is already represented in the build and should remain a first-class mocked source.
- **Fathom** is the AI meeting notetaker. It produces meeting notes, summaries, and action items from calls, and it is not currently represented anywhere in the build. The next version should add a mock Fathom section rather than pretending those outputs already exist elsewhere.
- **Jarvis** is their internal AI inference platform. This is infrastructure, not a dashboard data source, so it should not get its own section. It is worth mentioning in the README as something a real version would integrate with rather than duplicate.
- **Microsoft 365** covers calendar, contacts, and email, and is already represented.
- **Slack** is the current delivery surface for internal comms, and is already represented.

Two important scope corrections came out of the follow-up:

- The team wants updates **throughout the day**, not just a single morning digest. The current build is a one-shot morning cron job, which is a real architectural gap relative to what they actually want.
- They did **not** mention any standalone client/matter-tracking tool. The existing "Client/Matter Status" section in this build may not map to a real system they have, so we should be upfront that it is speculative rather than quietly presenting it as factual.

This Day 3 context does not expand the code scope in this session, but it does change how we should describe the product and what we should plan next.

## Goal

Prove, in a working hosted app, that:

1. Multiple data sources (calendar, email, time-tracking, client/matter status) can be aggregated and normalized
2. That data can be presented clearly in a web dashboard, organized by section
3. The same data can be condensed into a daily Slack digest, so lawyers don't have to open anything to get the headline view
4. The dashboard is shareable — Mark can send a link to colleagues without needing to explain how to run anything

## Explicit Non-Goals (state these clearly in the README and to Mark)

- No real Microsoft Graph API auth (no OAuth app registration / tenant access)
- No real Harvest API integration (no real API key/account)
- No real client/matter management system integration (no real practice management software access — this section is the most speculative since we don't know what system, if any, they use for this internally)
- No authentication/login system — this is a single shared demo view, not a real multi-tenant product
- No persistence/database — data is mocked and regenerated per load, or stored as static JSON committed to the repo
- No web scraping for industry news (still explicitly Phase 2/later, per the original interview discussion)

## Architecture

```
[Mock Data: JSON fixtures]
        ↓
[Aggregator/Normalizer (shared logic)]
        ↓
   ┌────┴─────┐
   ↓          ↓
[Next.js    [Slack Webhook
 Dashboard]  Digest Script]
```

Key design decision: **one shared aggregation/normalization module**, consumed by both the dashboard (via a Next.js API route or server component) and the Slack digest sender (a small script or a separate API route triggered on a schedule). This avoids duplicating logic and is the same pattern you'd use in production, one source of truth, multiple presentation layers.

## Sections / Data Types

1. **Calendar** — today's meetings (title, time, attendees)
2. **Email** — flagged/important emails needing response (subject, sender, snippet, urgency)
3. **Harvest** — project time/budget status (project name, hours logged vs budgeted, deadline)
4. **Client/Matter Status** — active matters with a status flag (e.g. "Awaiting client signature," "Filing due Friday," "Blocked on third party"). This is the most valuable section conceptually since it's specific to legal work, but also the most speculative — be upfront that this would need to map to whatever practice management tool they actually use internally (Clio, or an internal system) in a real version.

Each section: a card/panel in the dashboard, and a condensed bullet group in the Slack digest.

## Tech Stack

- **Next.js (App Router) + TypeScript** — matches their stated frontend flexibility, gives you SSR/hosting story for free
- **Tailwind CSS** — fast, clean styling without custom CSS overhead, looks intentional with minimal time spent
- **Vercel** — zero-config deploy from GitHub, free tier is enough
- **Mock data** — static JSON files in the repo (`/data/*.json`), read server-side
- **Slack delivery** — a Vercel Cron Job (Vercel supports this natively via `vercel.json`) hitting an API route that formats and POSTs to the Slack webhook. This means the "production-like" scheduling story is actually real and demoable, not just simulated.

## Page/Component Structure

```
app/
  page.tsx                 // main dashboard, server component, fetches all sections
  api/
    digest/route.ts        // formats + sends Slack digest (called by cron or manually)
data/
  calendar.json
  email.json
  harvest.json
  matters.json
lib/
  aggregator.ts            // shared normalization logic
  slack-formatter.ts        // builds Slack Block Kit payload
components/
  CalendarCard.tsx
  EmailCard.tsx
  HarvestCard.tsx
  MattersCard.tsx
vercel.json                 // cron schedule config
```

## 2-Day Build Plan

**Day 1**

- Scaffold Next.js + Tailwind, deploy a blank page to Vercel immediately (derisk hosting early)
- Build all 4 mock JSON fixtures, structured close to plausible real API shapes
- Build the shared aggregator/normalizer
- Build the dashboard UI: 4 cards/sections, clean layout, real data flowing in

**Day 2**

- Build the Slack formatter + webhook delivery (API route)
- Wire up Vercel Cron to call it on a schedule (e.g. daily 8am) — even if you trigger it manually for the demo, having the cron config in the repo proves you thought about production delivery
- Polish: empty states, loading states, a clean header/branding touch
- README: clearly states what's real vs mocked, and how a production version would integrate with real Graph API / Harvest / practice management system
- Record Loom: show the dashboard live (hosted URL), then trigger/show the Slack digest landing

## Deliverable

1. Hosted Vercel URL (shareable, forwardable — this is the whole point of going this route)
2. GitHub repo, clean README
3. Loom walkthrough (~90 sec–2 min): dashboard tour, then Slack digest landing
4. Short email to Mark with both links

## Suggested Email Framing (draft tone)

> "I wanted to make the dashboard idea tangible, so I put together a working prototype. [Vercel link] is live, feel free to forward it. It mocks the calendar/email/Harvest/matters data since I don't have access to your real systems, but the aggregation logic, the dashboard, and the Slack digest delivery (including a scheduled daily send) are all real and working. [Loom] walks through it in under 2 minutes. [Repo] has the code if useful."

## Honesty Checkpoints (keep coming back to these)

- Every mocked data source should be obviously labeled as such in the README, don't let polish accidentally imply real integration
- The Client/Matter section is the part most likely to misrepresent what's actually possible — be especially clear this would need real input from them on what system/data they actually have
- Don't let 2 days creep into "let's also add X" — the four sections + Slack + hosted dashboard is already a full scope for the time available
