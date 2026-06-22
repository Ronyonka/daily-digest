import type { ReactNode } from "react";

type DashboardSectionProps = {
  eyebrow: string;
  title: string;
  countLabel: string;
  children: ReactNode;
};

export function DashboardSection({
  eyebrow,
  title,
  countLabel,
  children,
}: DashboardSectionProps) {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {countLabel}
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}
