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
import { Suspense } from "react";
import Loader from "~/app/_ui/Loader";
import { Skeleton } from "~/app/_components/ui/Skeleton";

function PlayerLayout({
  searchParams,
  params,
}: {
  params: { roomId: string; imdbId: string; type: string; instanceId: string };
  searchParams: { currentTab: "chat" | "episodes" | "streams" };
}) {
  const { currentTab } = searchParams;

  return (
    <PlayerPanel>
      <LeftPanel>
        <Player />
      </LeftPanel>
      <OpenRightPanelButton />
      <ResizableHandlePanel />
      <RightPanel
        Elements={[
          {
            key: "chat",
            JSX: (
              <Suspense fallback={<Loader />}>
                <Chat />
              </Suspense>
            ),
          },
          {
            key: "episodes",
            JSX: (
              <Suspense fallback={<Loader />}>
                <Episodes />
              </Suspense>
            ),
          },
          {
            key: "streams",
            JSX: (
              <Suspense fallback={<Loader />}>
                <StreamsServer roomId={params.roomId} />
              </Suspense>
            ),
          },
        ]}
      />
      {/* {currentTab === "chat" && (
          <Suspense fallback={<Loader />}>
            <Chat />
          </Suspense>
        )}
        {currentTab === "episodes" && (
          <Suspense fallback={<Loader />}>  
            <Episodes />
          </Suspense>
        )} */}
      {/* {currentTab === "streams" && (
        
        )} */}
    </PlayerPanel>
  );
}

export default PlayerLayout;
