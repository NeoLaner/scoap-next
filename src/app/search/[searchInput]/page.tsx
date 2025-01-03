import { Suspense } from "react";
import PopularMediasSkeleton from "~/app/_ui/PopularMediasSkeleton";
import PopularMovies from "../_ui/PopularMovies";
import PopularSeries from "../_ui/PopularSeries";

async function page(props: { params: Promise<{ searchInput: string }> }) {
  const params = await props.params;
  return (
    <div className="space-y-10">
      <Suspense fallback={<PopularMediasSkeleton size={20} />}>
        <PopularMovies params={params} />
      </Suspense>
      <Suspense fallback={<PopularMediasSkeleton size={20} />}>
        <PopularSeries params={params} />
      </Suspense>
    </div>
  );
}

export default page;
