import type { CalendarEvent } from "@/lib/schemas";

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(dateString));
}

export function CalendarCard({ events }: { events: CalendarEvent[] }) {
  return (
    <section className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Calendar
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Today&apos;s meetings
          </h2>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
          {events.length} items
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-950">
                  {event.title}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
              </div>
              {event.location ? (
                <p className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                  {event.location}
                </p>
              ) : null}
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              Attendees: {event.attendees.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
