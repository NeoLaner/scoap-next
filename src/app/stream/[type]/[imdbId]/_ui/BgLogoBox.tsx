import StremioService from "~/app/_services/stremIo/stremIoServices";
import BgLogo from "./BgLogo";

async function BgLogoBox({ imdbId, type }: { imdbId: string; type: string }) {
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>not found</div>;
  return (
    <div className="relative h-full">
      <BgLogo name={mediaData.name} logo={mediaData.logo} />
    </div>
  );
}

export default BgLogoBox;
