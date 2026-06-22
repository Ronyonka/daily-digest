function SkeletonCard() {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-44 animate-pulse rounded-full bg-slate-200" />
        </div>
        <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="h-5 w-3/5 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-200" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-1/3 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </section>
  );
}

export function DashboardSkeleton() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_46%,#f8fafc_100%)] px-6 py-10 text-slate-900 sm:px-8 lg:px-12">
      <div className="absolute inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <div className="h-3 w-28 animate-pulse rounded-full bg-slate-200" />
            <div className="h-14 w-full max-w-3xl animate-pulse rounded-[1.5rem] bg-slate-200/70" />
            <div className="h-14 w-11/12 animate-pulse rounded-[1.5rem] bg-slate-200/70" />
            <div className="h-6 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:min-w-[23rem]">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 animate-pulse rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
                <div className="h-3 w-16 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="h-9 w-full animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </main>
  );
}
