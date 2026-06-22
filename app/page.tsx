import { CalendarCard } from "@/components/CalendarCard";
import { EmailCard } from "@/components/EmailCard";
import { HarvestCard } from "@/components/HarvestCard";
import { MattersCard } from "@/components/MattersCard";
import { getDigestData } from "@/lib/aggregator";

function formatDashboardDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(date);
}

export default function Home() {
  const digest = getDigestData();
  const dayLabel = formatDashboardDate(new Date(digest.calendar[0].startTime));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_46%,#f8fafc_100%)] px-6 py-10 text-slate-900 sm:px-8 lg:px-12">
      <div className="absolute inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Lawyer Daily Digest
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            One place to see the day&apos;s work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A hosted mock dashboard that pulls calendar, email, Harvest, and
            client matter data through the shared aggregator, so the web view
            and the Slack digest always describe the same snapshot.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-slate-950 px-4 py-2 font-medium text-white">
              Dashboard snapshot
            </span>
            <span className="rounded-full bg-white/80 px-4 py-2 font-medium text-slate-700 ring-1 ring-slate-200">
              Mock data loaded from /data
            </span>
            <span className="rounded-full bg-white/80 px-4 py-2 font-medium text-slate-700 ring-1 ring-slate-200">
              {dayLabel}
            </span>
          </div>
        </header>

        <section className="mt-12 grid gap-6 xl:grid-cols-2">
          <CalendarCard events={digest.calendar} />
          <EmailCard emails={digest.email} />
          <HarvestCard projects={digest.harvest} />
          <MattersCard matters={digest.matters} />
        </section>
      </div>
    </main>
  );
}
