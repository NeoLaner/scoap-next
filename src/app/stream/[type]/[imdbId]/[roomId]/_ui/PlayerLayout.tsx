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
import ChatFooter from "./ChatFooter";
import Subtitles from "./Subtitles";

function PlayerLayout({ roomId }: { roomId: string }) {
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
            JSXFooter: <ChatFooter />,
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
                <Streams roomId={roomId} />
              </Suspense>
            ),
            JSXHeader: <StreamsHeading />,
          },

          {
            key: "subtitles",
            JSXMain: (
              <Suspense fallback={<Loader />}>
                <Subtitles />
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
