import type { CalendarEvent } from "@/lib/schemas";
import { DashboardSection } from "@/components/DashboardSection";
import { EmptyState } from "@/components/EmptyState";

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(dateString));
}

export function CalendarCard({ events }: { events: CalendarEvent[] }) {
  return (
    <DashboardSection
      eyebrow="Calendar"
      title="Today's meetings"
      countLabel={`${events.length} items`}
    >
      {events.length === 0 ? (
        <EmptyState
          title="No meetings on the calendar."
          description="The dashboard is ready for a quiet day or a synced feed that has not populated yet."
        />
      ) : (
        <ul className="space-y-4">
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
      )}
    </DashboardSection>
  );
}
