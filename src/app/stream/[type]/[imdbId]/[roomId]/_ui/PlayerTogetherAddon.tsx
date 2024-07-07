import { type MediaPlayerInstance } from "@vidstack/react";
import { type RefObject } from "react";
import { useSocketListeners } from "~/app/_hooks/useSocketListeners";
import PlayerRemote from "./PlayerRemote";
import { useSocketSources } from "~/app/_hooks/useSocketSources";

function PlayerTogetherAddon({
  playerRef,
}: {
  playerRef: RefObject<MediaPlayerInstance>;
}) {
  useSocketListeners();
  return (
    <>
      <PlayerRemote playerRef={playerRef} />
    </>
  );
}

export default PlayerTogetherAddon;
