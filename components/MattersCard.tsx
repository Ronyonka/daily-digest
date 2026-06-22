import type { MatterItem } from "@/lib/schemas";

function formatDeadline(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(dateString));
}

function statusTone(status: string) {
  if (status.toLowerCase().includes("blocked")) {
    return "bg-rose-50 text-rose-700 ring-rose-200";
  }

  if (status.toLowerCase().includes("due")) {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-sky-50 text-sky-700 ring-sky-200";
}

export function MattersCard({ matters }: { matters: MatterItem[] }) {
  return (
    <section className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Client / Matter
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Matter status
          </h2>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
          {matters.length} matters
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {matters.map((matter) => (
          <li
            key={matter.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-950">
                  {matter.matterName}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {matter.clientName}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusTone(matter.status)}`}
              >
                {matter.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              Next: {matter.nextAction}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Deadline {formatDeadline(matter.deadline)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
