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
import { Suspense } from "react";
import Loader from "~/app/_ui/Loader";
import EpisodesHeading from "./EpisodesHeading";
import StreamsHeading from "./StreamsHeading";
import Streams from "./Streams";

function PlayerLayout() {
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
            JSXMain: (
              <Suspense fallback={<Loader />}>
                <Chat />
              </Suspense>
            ),
            JSXHeader: <div>Chat</div>,
          },
          {
            key: "episodes",
            JSXMain: (
              <Suspense fallback={<Loader />}>
                <Episodes />
              </Suspense>
            ),
            JSXHeader: <EpisodesHeading />,
          },
          {
            key: "streams",
            JSXMain: (
              <Suspense fallback={<Loader />}>
                <Streams torrentIoStreamsSorted={[]} />
              </Suspense>
            ),
            JSXHeader: <StreamsHeading />,
          },
        ]}
      />
    </PlayerPanel>
  );
}

export default PlayerLayout;
