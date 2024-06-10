import "@vidstack/react/player/styles/base.css";
import PlayerMedia from "./PlayerMedia";
import { api } from "~/trpc/server";
import StremioService from "~/app/_services/stremIo/stremIoServices";
import EpisodesPanel from "./EpisodesPanel";
import { type MetaInfo } from "~/app/_services/stremIo/types";
import StreamsServer from "~/app/stream/[type]/[imdbId]/[roomId]/[instanceId]/_ui/StreamsServer";

async function FilePlayer({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string };
  searchParams: { season?: string; episode?: string };
}) {
  return (
    <div className="flex">
      <PlayerMedia />
      {/* Right Panel */}
      <div>
        {/* just for series */}
        <EpisodesPanel />

        <StreamsServer
          params={params}
          searchParams={searchParams}
          className="absolute right-0 top-[0] z-30 h-full w-full bg-app-color-gray-1 md:w-[420px]"
        />
      </div>
    </div>
  );
}

export default FilePlayer;
