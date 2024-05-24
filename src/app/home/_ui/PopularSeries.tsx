import StremioService from "~/app/_services/stremIo/stremIoServices";
import PopularMedias from "~/app/_ui/PopularMedias";

async function PopularSeries() {
  const popularSeries = await StremioService.getPopularSeries();
  return <PopularMedias items={popularSeries} heading="Popular Series" />;
}

export default PopularSeries;
