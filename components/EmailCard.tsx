import type { EmailItem } from "@/lib/schemas";

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
    <section className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Email
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Flagged follow-ups
          </h2>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
          {flaggedEmails.length} flagged
        </div>
      </div>

      <ul className="mt-6 space-y-4">
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
    </section>
  );
}
