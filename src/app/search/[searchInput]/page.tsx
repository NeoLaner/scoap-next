import { Suspense } from "react";
import PopularMediasSkeleton from "~/app/_ui/PopularMediasSkeleton";
import PopularMovies from "../_ui/PopularMovies";
import PopularSeries from "../_ui/PopularSeries";

async function page({ params }: { params: { searchInput: string } }) {
  return (
    <div className="space-y-10">
      <Suspense fallback={<PopularMediasSkeleton />}>
        <PopularMovies params={params} />
      </Suspense>
      <Suspense fallback={<PopularMediasSkeleton />}>
        <PopularSeries params={params} />
      </Suspense>
    </div>
  );
}

export default page;
