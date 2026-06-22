import type { MatterItem } from "@/lib/schemas";
import { DashboardSection } from "@/components/DashboardSection";
import { EmptyState } from "@/components/EmptyState";

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
    <DashboardSection
      eyebrow="Client / Matter"
      title="Matter status"
      countLabel={`${matters.length} matters`}
    >
      {matters.length === 0 ? (
        <EmptyState
          title="No active matters surfaced."
          description="This invented section still behaves like a real panel when the source data is empty."
        />
      ) : (
        <ul className="space-y-4">
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
      )}
    </DashboardSection>
  );
}
