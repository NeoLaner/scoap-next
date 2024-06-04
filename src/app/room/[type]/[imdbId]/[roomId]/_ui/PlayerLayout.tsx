import "@vidstack/react/player/styles/base.css";
import PlayerMedia from "./PlayerMedia";
import { api } from "~/trpc/server";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import EpisodesPanel from "./EpisodesPanel";

async function FilePlayer({
  params,
}: {
  params: { roomId: string; imdbId: string };
}) {
  const { roomId, imdbId } = params;
  const room = await api.room.get({ roomId });

  const metaInfo = await StremioService.getMetaSeries(room?.imdbId);

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
