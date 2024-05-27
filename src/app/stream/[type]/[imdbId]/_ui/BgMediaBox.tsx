import StremioService from "~/app/_services/stremIo/stremIoServices";
import BgMedia from "./BgMedia";

async function BgMediaBox({ imdbId, type }: { imdbId: string; type: string }) {
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>Not found</div>;

  return (
    <div>
      <BgMedia background={mediaData.background} name={mediaData.name} />
    </div>
  );
}

export default BgMediaBox;
