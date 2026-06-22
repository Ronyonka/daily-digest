# SKILLS.md

**Reference for specific implementation patterns used in this project. Consult the
relevant section when building that piece — don't read the whole file every time.**

---

## 1. Next.js App Router scaffolding + setup

Initialize with:

```bash
npx create-next-app@latest lawyer-daily-digest --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

- Choose App Router (not Pages Router)
- Choose Tailwind: yes
- Choose `src/` directory: no (keep `app/`, `lib/`, `components/`, `data/` at root)
- ESLint: yes, default config is fine

Immediately after scaffolding:

1. `git init`, commit the scaffold as-is before changing anything
2. Create `.env.local` with `SLACK_WEBHOOK_URL=` (placeholder), confirm `.gitignore`
   already excludes `.env*.local` (Next.js's default gitignore does this — verify it)
3. Push to a new GitHub repo
4. Connect the repo to Vercel and deploy immediately, even blank — this confirms
   hosting works before any real feature work begins

---

## 2. Next.js API Route pattern (App Router)

API routes live at `app/api/<name>/route.ts`. Example shape for the digest route:

```typescript
// app/api/digest/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // 1. load + aggregate mock data
  // 2. format into Slack Block Kit payload
  // 3. POST to SLACK_WEBHOOK_URL
  // 4. return a JSON response confirming success/failure
  return NextResponse.json({ ok: true });
}
```

Use `GET` so it can be triggered by a simple browser visit or curl during testing,
and so Vercel Cron (which makes GET requests) can call it directly.

---

## 3. Reading mock JSON server-side

Mock data lives in `/data/*.json`. Read it in server components or API routes with
Node's `fs`, not `fetch` (no need to fetch your own static files over HTTP):

```typescript
import fs from "fs";
import path from "path";

function loadMockData<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "data", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
```

---

## 4. Validating mock data with Zod

Define a schema per data source, validate on load so the rest of the app can trust
the shape:

```typescript
import { z } from "zod";

const CalendarEventSchema = z.object({
  title: z.string(),
  startTime: z.string(), // ISO string
  endTime: z.string(),
  attendees: z.array(z.string()),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

export function parseCalendarEvents(raw: unknown): CalendarEvent[] {
  return z.array(CalendarEventSchema).parse(raw);
}
```

Repeat this pattern for Email, Harvest, and Matters schemas.

---

## 5. Shared aggregator pattern

One function, used by both the dashboard page and the digest API route, so there is
a single source of truth for "what today's data looks like":

```typescript
// lib/aggregator.ts
export interface DigestData {
  calendar: CalendarEvent[];
  email: EmailItem[];
  harvest: HarvestItem[];
  matters: MatterItem[];
}

export function getTodaysDigest(): DigestData {
  return {
    calendar: parseCalendarEvents(loadMockData("calendar.json")),
    email: parseEmailItems(loadMockData("email.json")),
    harvest: parseHarvestItems(loadMockData("harvest.json")),
    matters: parseMatterItems(loadMockData("matters.json")),
  };
}
```

---

## 6. Slack Block Kit formatting

Block Kit is Slack's structured message format — use it instead of a plain text
string so the digest looks intentional, not like a dumped log:

```typescript
export function buildSlackBlocks(data: DigestData) {
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📋 Good morning — your daily digest",
        },
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*📅 Calendar*\n${data.calendar
            .map((e) => `• ${e.title} — ${e.startTime}`)
            .join("\n")}`,
        },
      },
      // repeat section blocks for email, harvest, matters
    ],
  };
}
```

Test formatting at https://app.slack.com/block-kit-builder before wiring up the real
POST, it's faster to iterate visually there first.

---

## 7. Posting to Slack via webhook

```typescript
export async function postToSlack(payload: unknown) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("SLACK_WEBHOOK_URL is not set");

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Slack webhook failed: ${res.status}`);
}
```

---

## 8. Creating your own Slack workspace + webhook (manual, one-time, not coding)

1. Go to slack.com, create a new free workspace (any name, e.g. "Ron Demo")
2. Create a channel, e.g. `#daily-digest`
3. Go to api.slack.com/apps → Create New App → From Scratch
4. Name it, select your workspace
5. Under "Incoming Webhooks," activate, then "Add New Webhook to Workspace"
6. Choose the `#daily-digest` channel, authorize
7. Copy the webhook URL into `.env.local` as `SLACK_WEBHOOK_URL`

---

## 9. Vercel Cron setup

In `vercel.json` at repo root:

```json
{
  "crons": [{ "path": "/api/digest", "schedule": "0 8 * * *" }]
}
```

This calls `/api/digest` daily at 08:00 UTC once deployed. Cron only runs on
deployed Vercel projects, not locally — for local/demo testing, just visit the
route directly or `curl localhost:3000/api/digest`.

---

## 10. Dashboard card component pattern

Keep each card a simple, self-contained component taking typed props:

```typescript
// components/CalendarCard.tsx
import { CalendarEvent } from "@/lib/schemas";

export function CalendarCard({ events }: { events: CalendarEvent[] }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">📅 Calendar</h2>
      <ul className="space-y-1">
        {events.map((e, i) => (
          <li key={i} className="text-sm text-gray-700">
            {e.title} — {e.startTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Repeat the pattern for Email, Harvest, and Matters cards. Keep visual style
consistent across all four (same border, padding, header style) so the dashboard
looks cohesive rather than four differently-styled widgets.
