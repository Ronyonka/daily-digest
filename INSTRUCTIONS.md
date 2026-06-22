# INSTRUCTIONS.md

**Read this every session. These rules don't change as the build progresses.**

## What this project is

A 2-day proof-of-concept: a Next.js dashboard + Slack digest that consolidates mocked
calendar, email, time-tracking (Harvest), and client/matter data for a law firm. Built
to demo a product idea discussed in an interview. See `PRD.md` for full context.

## Non-negotiable scope boundaries

- **No real third-party auth.** Never attempt real Microsoft Graph OAuth, real Harvest
  API keys, or any real external account. All data sources are mocked JSON files.
- **No database.** Static JSON in `/data`, read server-side. Do not add Postgres,
  SQLite, Prisma, or any persistence layer, even if it seems "more correct."
- **No authentication/login.** This is a single shared demo view. Do not add NextAuth,
  Clerk, or any login flow.
- **Do not scope-creep.** If a task seems to need something not listed in `PRD.md` or
  `PROGRESS.md`, stop and flag it in `PROGRESS.md` under a "Questions/Flags" section
  rather than deciding unilaterally and building it.
- **Slack webhook URL is a secret.** Always read it from an environment variable
  (`SLACK_WEBHOOK_URL`), never hardcode it, never commit `.env.local`. Confirm
  `.env.local` is in `.gitignore` before first commit.

## Tech stack (fixed, do not substitute)

- Next.js App Router + TypeScript
- Tailwind CSS for styling
- Vercel for hosting + Vercel Cron for scheduling
- Native `fetch` for the Slack webhook POST (no axios/node-fetch)
- Zod for validating mock data shapes against expected types

## How to work each session

1. Read `PROGRESS.md` first. It tells you what's done, in progress, and next.
2. Read only the `PRD.md` sections relevant to the current task (don't re-read the
   whole file every time once you're past Day 1 setup).
3. Do the smallest coherent chunk of work that matches what `PROGRESS.md` lists as
   "Next." Don't jump ahead to later phases.
4. Before ending the session: update `PROGRESS.md` yourself (Done / In Progress /
   Next / Questions). This is mandatory, not optional.
5. If you hit an error, try to resolve it yourself by reading your own output
   (logs, terminal errors) rather than asking the user to paste things back to you.

## Code style expectations

- Clear, readable TypeScript. No clever one-liners that sacrifice readability.
- Every mock data file should be structurally close to what the real API
  (Graph API, Harvest API) would plausibly return, so the shape is realistic even
  though the data is fake.
- Components should be small and named by what they render (`CalendarCard.tsx`, not
  `Card1.tsx`).
- Add brief comments only where the "why" isn't obvious from the code itself.

## Honesty checkpoints (carry these into the README too)

- The README must clearly state which parts are mocked vs real (the pipeline,
  dashboard rendering, and Slack delivery mechanism are real; the underlying data
  and any "integration" with Graph/Harvest/practice-management systems is not).
- The Client/Matter Status section in particular is invented — there is no real
  system being represented. Mock data for it should read as plausible legal-practice
  status tracking, but must not be designed to imply familiarity with any specific
  real product's data model.

## What "done" looks like for this whole project

- Dashboard live on Vercel, all 4 sections rendering mock data
- Slack digest API route working, postable manually and via Vercel Cron
- Clean README explaining real vs mocked
- Nothing in the repo that looks unfinished (broken styles, console errors, TODOs
  left in committed code)
