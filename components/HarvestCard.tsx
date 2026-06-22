import type { HarvestItem } from "@/lib/schemas";

function formatDeadline(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(dateString));
}

export function HarvestCard({ projects }: { projects: HarvestItem[] }) {
  return (
    <section className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Harvest
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Time and budget
          </h2>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
          {projects.length} projects
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {projects.map((project) => {
          const percent = Math.min(
            100,
            Math.round((project.hoursLogged / project.budgetedHours) * 100)
          );

          return (
            <li
              key={project.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    {project.projectName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {project.clientName}
                  </p>
                </div>
                <div className="text-right text-sm font-semibold text-slate-950">
                  <p>
                    {project.hoursLogged.toFixed(1)} / {project.budgetedHours} hrs
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Due {formatDeadline(project.deadline)}
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    percent > 100
                      ? "bg-rose-500"
                      : percent > 85
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {project.status}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
