import "@vidstack/react/player/styles/base.css";
import Player from "./Player";
import StreamsServer from "./StreamsServer";
import Episodes from "./Episodes";
import { useMetaData } from "~/app/_hooks/useMetaData";

function PlayerLayout({
  params,
  searchParams,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  const { season } = searchParams;
  console.log("🍕🍕", season);

  return (
    <div className="flex h-full">
      <Player />
      {/* Right Panel */}
      <div className="h-full">
        {/* just for series */}
        {season && <Episodes />}
        {/* <StreamsServer
          params={params}
          searchParams={searchParams}
          className="absolute right-0 top-[0] z-30 h-full w-full bg-background md:w-[420px]"
        /> */}
      </div>
    </div>
  );
}

export default PlayerLayout;
