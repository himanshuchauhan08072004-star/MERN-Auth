export const SkeletonLine = ({ width = "w-full", height = "h-4" }) => (
  <div className={`${width} ${height} rounded-md bg-surface-border animate-pulse`} />
);

export const SkeletonCard = () => (
  <div className="rounded-xl border border-surface-border bg-surface-light/60 p-4 space-y-3">
    <div className="flex items-center justify-between">
      <SkeletonLine width="w-16" height="h-3" />
      <div className="h-7 w-7 rounded-lg bg-surface-border animate-pulse" />
    </div>
    <SkeletonLine width="w-20" height="h-5" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="max-w-5xl mx-auto mt-8 px-4 space-y-6">
    <div className="rounded-xl border border-surface-border bg-surface-light/60 p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-surface-border animate-pulse" />
        <div className="space-y-2">
          <SkeletonLine width="w-40" height="h-5" />
          <SkeletonLine width="w-56" height="h-3" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);
