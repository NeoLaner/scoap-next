import "@vidstack/react/player/styles/base.css";
import PlayerMedia from "./PlayerMedia";
import { api } from "~/trpc/server";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import EpisodesPanel from "./EpisodesPanel";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import StreamsServer from "~/app/_ui/StreamsServer";

async function FilePlayer({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string };
  searchParams: { season?: string; episode?: string };
}) {
  const { roomId, imdbId, type } = params;
  const room = await api.room.get({ roomId });
  let metaInfo: MetaInfo;
  if (type === "series")
    metaInfo = await StremioService.getMetaSeries(room?.imdbId);
  if (type === "movie")
    metaInfo = await StremioService.getMetaMovie(room?.imdbId);

  return (
    <div className="flex">
      <PlayerMedia source={room?.source} metaInfo={metaInfo} />
      {/* Right Panel */}
      <div>
        {/* just for series */}
        <EpisodesPanel metaInfo={metaInfo} />

        <StreamsServer
          name={metaInfo.name}
          params={params}
          searchParams={searchParams}
          className="absolute right-0 top-[0] z-30 h-full w-full bg-app-color-gray-1 md:w-[420px]"
        />
      </div>
    </div>
  );
}

export default FilePlayer;
