import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader({
  count = 6,
  className = "h-60 w-full",
  gridClassName,
  cardClassName = "w-full",
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${gridClassName}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`rounded-xl border p-4 space-y-4 bg-white ${cardClassName}`}
        >
          <Skeleton className={`${className} rounded-lg`} />

          <Skeleton className="h-6 w-3/4" />

          <Skeleton className="h-4 w-1/2" />

          <Skeleton className="h-4 w-full" />

          <Skeleton className="h-4 w-5/6" />

          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}