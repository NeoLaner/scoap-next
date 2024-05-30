import Streams from "~/app/_ui/Streams";
import BgLogoBox from "./_ui/BgLogoBox";
import BgMediaBox from "./_ui/BgMediaBox";
import Episodes from "./_ui/Episodes";
import StreamsServer from "~/app/_ui/StreamsServer";
import StremioService from "~/app/_services/stremIo/stremIoServices";

async function page({
  params,
}: {
  params: { imdbId: string; type: "movie" | "series" };
}) {
  const { type, imdbId } = params;
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>Not found</div>;

  return (
    <div className="w-full">
      <div className="relative h-full w-full ">
        <BgMediaBox background={mediaData.background} name={mediaData.name} />
        <BgLogoBox logo={mediaData.logo} name={mediaData.name} />
      </div>

      <div className="flex-1 overflow-y-auto md:flex-none">
        <StreamsServer params={{ imdbId, type }} />
      </div>

      {type === "series" && (
        <div className="flex-1 overflow-y-auto md:flex-none">
          <Episodes />
        </div>
      )}
    </div>
  );
}

export default page;
