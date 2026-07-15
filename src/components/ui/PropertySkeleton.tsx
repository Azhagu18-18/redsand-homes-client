interface PropertySkeletonProps {
  count?: number;
}

export default function PropertySkeleton({
  count = 6,
}: PropertySkeletonProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-[#111111]"
        >
          <div className="h-64 w-full bg-gray-800" />

          <div className="space-y-4 p-6">
            <div className="h-6 w-2/3 rounded bg-gray-800" />
            <div className="h-4 w-1/2 rounded bg-gray-800" />
            <div className="h-8 w-1/3 rounded bg-gray-800" />

            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded bg-gray-800" />
              <div className="h-16 rounded bg-gray-800" />
              <div className="h-16 rounded bg-gray-800" />
            </div>

            <div className="h-12 rounded-xl bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}