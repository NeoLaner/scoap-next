import Streams from "~/app/_ui/Streams";
import BgLogoBox from "./_ui/BgLogoBox";
import BgMediaBox from "./_ui/BgMediaBox";
import Episodes from "./_ui/Episodes";
import StreamsServer from "~/app/_ui/StreamsServer";
import StremioService from "~/app/_services/stremIo/stremIoServices";

async function page({
  params,
  searchParams,
}: {
  params: { imdbId: string; type: "movie" | "series" };
  searchParams?: { season?: string; episode?: string };
}) {
  const { type, imdbId } = params;
  let mediaData;
  if (type === "movie") mediaData = await StremioService.getMetaMovie(imdbId);
  if (type === "series") mediaData = await StremioService.getMetaSeries(imdbId);

  if (!mediaData) return <div>Not found</div>;

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full ">
        <BgMediaBox background={mediaData.background} name={mediaData.name} />
        <BgLogoBox logo={mediaData.logo} name={mediaData.name} />
      </div>

      <div className="overflow-y-auto md:flex-none">
        <StreamsServer
          name={mediaData.name}
          className="absolute right-0 top-[96px] z-30 h-full w-full bg-app-color-gray-1 md:w-[420px]"
          params={{ imdbId, type }}
          searchParams={{
            episode: searchParams?.episode,
            season: searchParams?.season,
          }}
        />
      </div>

      {type === "series" && (
        <Episodes
          videos={mediaData.videos}
          className="absolute right-0 top-[96px] flex-1 pb-[200px] md:w-[420px] md:flex-none"
        />
      )}
    </div>
  );
}

export default page;
