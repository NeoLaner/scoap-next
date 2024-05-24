import { type ReactNode } from "react";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import PopularMedias from "~/app/_ui/PopularMedias";

async function page({
  children,
  params,
}: {
  children: ReactNode;
  params: { searchInput: string };
}) {
  const { searchInput } = params;
  const searchMovieData = await StremioService.searchMovies(searchInput);
  const searchSeriesData = await StremioService.searchSeries(searchInput);

  return (
    <div className="space-y-10">
      <PopularMedias items={searchMovieData} heading="Popular Movies" />
      <PopularMedias items={searchSeriesData} heading="Popular Series" />
    </div>
  );
}

export default page;
