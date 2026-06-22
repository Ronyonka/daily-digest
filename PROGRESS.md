# PROGRESS.md

**Updated at the end of every session by whichever agent is working. This is the
single source of truth for what's done and what's next — read this before doing
anything else.**

---

## Day 1 — Setup, Data, Dashboard UI

### Done

- [ ] (nothing yet — this is the starting state)

### In Progress

- [ ] Nothing started

### Next (do these in order)

- [ ] Scaffold Next.js project per `SKILLS.md` section 1
- [ ] Init git, confirm `.env.local` is gitignored, create GitHub repo, push
- [ ] Connect repo to Vercel, deploy blank scaffold, confirm hosted URL works
- [ ] Create `data/calendar.json`, `data/email.json`, `data/harvest.json`,
      `data/matters.json` with realistic mock data (see `PRD.md` Sections section
      for what each should contain)
- [ ] Define Zod schemas for all four data shapes (`SKILLS.md` section 4)
- [ ] Build `lib/aggregator.ts` shared aggregation function (`SKILLS.md` section 5)
- [ ] Build the four card components (`SKILLS.md` section 10)
- [ ] Build `app/page.tsx` to render all four cards with real mock data flowing
      through the aggregator
- [ ] Deploy Day 1 progress to Vercel, confirm the live dashboard renders correctly

### Questions/Flags

- (none yet)

---

## Day 2 — Slack Digest, Cron, Polish

### Done

- [ ] (not started)

### In Progress

- [ ] Not started

### Next

- [ ] Build `lib/slack-formatter.ts` (`SKILLS.md` section 6)
- [ ] Build `lib/slack-client.ts` postToSlack function (`SKILLS.md` section 7)
- [ ] Build `app/api/digest/route.ts` tying aggregator + formatter + Slack post
      together (`SKILLS.md` section 2)
- [ ] Manually create Slack workspace + webhook (`SKILLS.md` section 8 — this is a
      manual step for the human, not the agent)
- [ ] Add `SLACK_WEBHOOK_URL` to Vercel project env vars (not just local `.env.local`)
- [ ] Add `vercel.json` cron config (`SKILLS.md` section 9)
- [ ] Test the digest route manually (visit `/api/digest` or curl it), confirm
      message lands correctly formatted in Slack
- [ ] Polish: loading states, empty states, consistent spacing/header styling
- [ ] Write README.md: clearly state what's real vs mocked (see `INSTRUCTIONS.md`
      "Honesty checkpoints")
- [ ] Final review pass: read through all generated code, fix anything sloppy,
      remove leftover TODOs/console.logs

### Questions/Flags

- (none yet)

---

## Notes for next session (free-form, update this each time)

- (nothing yet, this is the initial state of the file)
