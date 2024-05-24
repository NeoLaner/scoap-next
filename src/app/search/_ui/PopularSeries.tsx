import StremioService from "~/app/_services/stremIo/stremIoServices";
import PopularMedias from "~/app/_ui/PopularMedias";

async function PopularSeries({ params }: { params: { searchInput: string } }) {
  const { searchInput } = params;
  const searchSeriesData = await StremioService.searchSeries(searchInput);

  return <PopularMedias items={searchSeriesData} heading="Popular Series" />;
}

export default PopularSeries;
