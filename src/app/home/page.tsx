import { Suspense } from "react";
import PopularMediasSkeleton from "../_ui/PopularMediasSkeleton";
import PopularMovies from "./_ui/PopularMovies";
import PopularSeries from "./_ui/PopularSeries";

export default async function Home() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<PopularMediasSkeleton size={20} />}>
        <PopularMovies />
      </Suspense>

      <Suspense fallback={<PopularMediasSkeleton size={20} />}>
        <PopularSeries />
      </Suspense>
    </div>
  );
}
