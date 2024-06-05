import "@vidstack/react/player/styles/base.css";
import PlayerMedia from "./PlayerMedia";
import { api } from "~/trpc/server";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import EpisodesPanel from "./EpisodesPanel";
import { MetaInfo } from "~/app/_services/stremIo/types";

async function FilePlayer({
  params,
}: {
  params: { roomId: string; imdbId: string; type: string };
}) {
  const { roomId, imdbId, type } = params;
  const room = await api.room.get({ roomId });
  let metaInfo: MetaInfo;
  if (type === "series")
    metaInfo = await StremioService.getMetaSeries(room?.imdbId);
  if (type === "movie")
    metaInfo = await StremioService.getMetaMovie(room?.imdbId);

  console.log(metaInfo);
  return (
    <div className="flex">
      <PlayerMedia source={room?.source} metaInfo={metaInfo} />
      {/* Right Panel */}
      <div>
        <EpisodesPanel metaInfo={metaInfo} />
      </div>
    </div>
  );
}

export default FilePlayer;
