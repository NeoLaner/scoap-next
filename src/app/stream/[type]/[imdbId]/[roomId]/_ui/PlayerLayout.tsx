import "@vidstack/react/player/styles/base.css";
import Player from "./Player";

import Chat from "./Chat";
import {
  LeftPanel,
  OpenRightPanelButton,
  PlayerPanel,
  ResizableHandlePanel,
  RightPanel,
} from "./PlayerPanels";
import Episodes from "./Episodes";
import StreamsServer from "./StreamsServer";

function PlayerLayout({
  searchParams,
  params,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { season?: string; episode?: string };
}) {
  const { season, episode } = searchParams;

  const currentTab = () => {
    if (season && episode) return "streams";
    if (season) return "episode";
    return "chat";
  };
  console.log("🍕🍕", season);

  return (
    <PlayerPanel>
      <LeftPanel>
        <Player />
      </LeftPanel>
      <OpenRightPanelButton />
      <ResizableHandlePanel />
      <RightPanel>
        {currentTab() === "chat" && <Chat />}
        {currentTab() === "episode" && <Episodes />}
        {currentTab() === "streams" && (
          <StreamsServer params={params} searchParams={searchParams} />
        )}
      </RightPanel>
    </PlayerPanel>
  );
}

export default PlayerLayout;
