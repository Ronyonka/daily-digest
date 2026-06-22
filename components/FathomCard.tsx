import type { FathomMeeting } from "@/lib/schemas";
import { DashboardSection } from "@/components/DashboardSection";
import { EmptyState } from "@/components/EmptyState";

function formatMeetingDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(`${dateString}T00:00:00+03:00`));
}

export function FathomCard({ meetings }: { meetings: FathomMeeting[] }) {
  return (
    <DashboardSection
      eyebrow="Fathom"
      title="From yesterday's calls"
      countLabel={`${meetings.length} meetings`}
    >
      {meetings.length === 0 ? (
        <EmptyState
          title="No call summaries surfaced."
          description="When Fathom has yesterday's meetings, the summary and action items will appear here."
        />
      ) : (
        <ul className="space-y-4">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    {meeting.meetingTitle}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {formatMeetingDate(meeting.meetingDate)}
                  </p>
                </div>
                <p className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                  {meeting.attendees.length} attendees
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {meeting.summary}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Action items
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                    {meeting.actionItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardSection>
  );
}
