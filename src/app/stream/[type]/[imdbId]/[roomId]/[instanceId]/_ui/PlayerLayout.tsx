import "@vidstack/react/player/styles/base.css";
import EpisodesPanel from "./EpisodesPanel";
import StreamsServer from "~/app/stream/[type]/[imdbId]/[roomId]/[instanceId]/_ui/StreamsServer";
import { getServerAuthSession } from "~/server/auth";
import Player from "./Player";

async function PlayerLayout({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  return (
    <div className="flex">
      <Player />
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
      {/* Socket */}
    </div>
  );
}

export default PlayerLayout;
