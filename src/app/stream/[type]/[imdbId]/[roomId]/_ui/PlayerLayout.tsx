import "@vidstack/react/player/styles/base.css";
import Player from "./Player";
import * as Buttons from "./Buttons";
import Chat from "./Chat";
import {
  LeftPanel,
  OpenRightPanelOpen,
  PlayerPanel,
  ResizableHandlePanel,
  RightPanel,
} from "./PlayerPanels";
import Episodes from "./Episodes";

function PlayerLayout({
  searchParams,
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
      <OpenRightPanelOpen />
      <ResizableHandlePanel />
      <RightPanel>
        {currentTab() === "chat" && <Chat />}
        {currentTab() === "episode" && <Episodes />}
        <RightPanelMenu />
      </RightPanel>
    </PlayerPanel>
  );
}

function RightPanelMenu() {
  return (
    <div className="absolute bottom-0 w-full border-t bg-background px-4 py-4">
      <div className="flex justify-between">
        <Buttons.Chat />
        <Buttons.Episodes tooltipPlacement="top" />
        <Buttons.Streams tooltipPlacement="top" />
      </div>
    </div>
  );
}

export default PlayerLayout;
