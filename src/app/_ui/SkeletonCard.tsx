import { Skeleton } from "../_components/ui/Skeleton";

export function SkeletonCard({ length = 1 }: { length?: number }) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-4 rounded-xl">
          <Skeleton className="relative h-40 w-28 overflow-hidden rounded-lg md:h-52 md:w-36">
            <div style={{ objectFit: "cover", opacity: 0.9 }} />
          </Skeleton>
          <Skeleton className="h-4 w-16"></Skeleton>
        </div>
      ))}
    </>
  );
}
