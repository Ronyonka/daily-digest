import type { EmailItem } from "@/lib/schemas";
import { DashboardSection } from "@/components/DashboardSection";
import { EmptyState } from "@/components/EmptyState";

const urgencyStyles: Record<EmailItem["urgency"], string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
};

function formatReceived(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(dateString));
}

export function EmailCard({ emails }: { emails: EmailItem[] }) {
  const flaggedEmails = emails.filter((email) => email.isFlagged);

  return (
    <DashboardSection
      eyebrow="Email"
      title="Flagged follow-ups"
      countLabel={`${flaggedEmails.length} flagged`}
    >
      {flaggedEmails.length === 0 ? (
        <EmptyState
          title="Nothing is flagged right now."
          description="Important messages still render here once they are marked for follow-up."
        />
      ) : (
        <ul className="space-y-4">
          {flaggedEmails.map((email) => (
            <li
              key={email.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    {email.subject}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{email.sender}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${urgencyStyles[email.urgency]}`}
                >
                  {email.urgency}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                {email.snippet}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Received {formatReceived(email.receivedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </DashboardSection>
  );
}
