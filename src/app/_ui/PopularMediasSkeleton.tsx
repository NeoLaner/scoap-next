import { cn } from "~/lib/utils";
import { Skeleton } from "../_components/ui/Skeleton";
import { SkeletonCard } from "./SkeletonCard";

function PopularMediasSkeleton({
  size,
  flexWrap = false,
  showHeading = true,
}: {
  size: number;
  flexWrap?: boolean;
  showHeading?: boolean;
}) {
  return (
    <section className="overflow-hidden">
      {showHeading && (
        <div className="mb-6 flex justify-between">
          <Skeleton className="h-6 w-32 rounded-xl" />
        </div>
      )}
      <>
        <div
          className={cn(
            "flex gap-4 ",
            flexWrap
              ? "min-w-0 shrink grow basis-0 flex-wrap gap-3 overflow-hidden pb-6"
              : "",
          )}
        >
          {<SkeletonCard length={size} />}
        </div>
      </>
    </section>
  );
}

export default PopularMediasSkeleton;
